import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import { marked } from 'marked'
import katex from 'katex'
import sharp from 'sharp'

const directory = new URL('../content/articles/', import.meta.url)
const manifest = JSON.parse(await readFile(new URL('manifest.json', directory), 'utf8'))
const originalDate = '2026-10-11T00:00:00.000Z'
const text = (value, format = 0) => ({
  type: 'text',
  version: 1,
  text: value,
  format,
  mode: 'normal',
  style: '',
  detail: 0,
})
const element = (type, children, extra = {}) => ({
  type,
  version: 1,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  ...extra,
})
const block = (fields) => ({ type: 'block', version: 2, format: '', fields })
const validLink = (value) => assert.match(value, /^(https:\/\/|\/(?!\/))/)

function inline(tokens, format = 0) {
  return tokens.flatMap((token) => {
    switch (token.type) {
      case 'text':
        return token.tokens ? inline(token.tokens, format) : [text(token.text, format)]
      case 'escape':
        return [text(token.text, format)]
      case 'codespan':
        return [text(token.text, format | 16)]
      case 'strong':
        return inline(token.tokens, format | 1)
      case 'em':
        return inline(token.tokens, format | 2)
      case 'link':
        validLink(token.href)
        return [
          element('link', inline(token.tokens, format), {
            fields: { linkType: 'custom', url: token.href, newTab: false },
          }),
        ]
      case 'br':
        return [{ type: 'linebreak', version: 1 }]
      default:
        throw new Error(`Unsupported inline Markdown: ${token.type}`)
    }
  })
}

async function media(url, alt, caption, timestamp) {
  assert.ok(url.startsWith('/images/') && !url.includes('..'), `Invalid figure path: ${url}`)
  assert.ok(alt.trim(), `Missing image alt text: ${url}`)
  const bytes = await readFile(new URL(`../public${url}`, import.meta.url))
  const { width, height, format } = await sharp(bytes).metadata()
  return {
    id: `article-image-${url}`,
    alt,
    url,
    filename: url.split('/').pop(),
    mimeType: `image/${format}`,
    width,
    height,
    ...(caption
      ? { caption: { root: element('root', [element('paragraph', [text(caption)])]) } }
      : {}),
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

async function lexical(tokens, timestamp) {
  const children = []
  for (const token of tokens) {
    switch (token.type) {
      case 'space':
        break
      case 'heading':
        if (token.depth > 1)
          children.push(element('heading', inline(token.tokens), { tag: `h${token.depth}` }))
        break
      case 'paragraph':
      case 'text': {
        if (token.tokens?.length === 1 && token.tokens[0].type === 'image') {
          const image = token.tokens[0]
          children.push(
            block({
              blockType: 'mediaBlock',
              media: await media(image.href, image.text, image.title, timestamp),
            }),
          )
        } else
          children.push(
            element('paragraph', inline(token.tokens || [{ type: 'text', text: token.text }]), {
              textFormat: 0,
              textStyle: '',
            }),
          )
        break
      }
      case 'code':
        if (token.lang === 'math') {
          const html = katex.renderToString(token.text, {
            displayMode: true,
            throwOnError: true,
            strict: 'error',
            trust: false,
            output: 'htmlAndMathml',
          })
          children.push(block({ blockType: 'articleMath', source: token.text, html }))
        } else {
          assert.ok(
            ['python', 'javascript', 'json', 'bash', 'text'].includes(token.lang),
            `Unsupported code language: ${token.lang}`,
          )
          children.push(block({ blockType: 'code', language: token.lang, code: token.text }))
        }
        break
      case 'table':
        children.push(
          block({
            blockType: 'articleTable',
            headers: token.header.map((cell) => cell.text),
            rows: token.rows.map((row) => row.map((cell) => cell.text)),
          }),
        )
        break
      case 'list':
        children.push(
          element(
            'list',
            await Promise.all(
              token.items.map(async (item, index) =>
                element('listitem', await lexical(item.tokens, timestamp), {
                  value: token.ordered ? token.start + index : index + 1,
                }),
              ),
            ),
            {
              listType: token.ordered ? 'number' : 'bullet',
              start: token.start || 1,
              tag: token.ordered ? 'ol' : 'ul',
            },
          ),
        )
        break
      case 'blockquote':
        children.push(element('quote', await lexical(token.tokens, timestamp)))
        break
      default:
        throw new Error(`Unsupported block Markdown: ${token.type}`)
    }
  }
  return children
}

const posts = []
for (const entry of manifest) {
  const markdown = await readFile(new URL(`${entry.slug}.md`, directory), 'utf8')
  assert.ok(markdown.startsWith(`# ${entry.title}\n`), `${entry.slug}: title mismatch`)
  const wordCount = markdown.split(/\s+/).length
  assert.ok(
    wordCount >= (entry.minWords || 450) && wordCount <= 4500,
    `${entry.slug}: ${wordCount} words`,
  )
  const publishedAt = entry.publishedAt || originalDate
  const updatedAt = entry.updatedAt || publishedAt
  assert.ok(Number.isFinite(Date.parse(publishedAt)), `${entry.slug}: invalid date`)
  const imageURL = entry.image.startsWith('/') ? entry.image : `/images/articles/${entry.image}`
  const image = await media(imageURL, entry.alt, null, updatedAt)
  const content = { root: element('root', await lexical(marked.lexer(markdown), updatedAt)) }
  posts.push({
    id: `article-${entry.slug}`,
    title: entry.title,
    slug: entry.slug,
    description: entry.description,
    content,
    heroImage: image,
    categories: [{ id: entry.category, title: entry.category, createdAt: publishedAt, updatedAt }],
    meta: { title: entry.title, description: entry.description, image },
    populatedAuthors: [{ name: 'Muhammad Hassan' }],
    publishedAt,
    createdAt: publishedAt,
    updatedAt,
    _status: 'published',
  })
  console.log(`${entry.slug}: ${wordCount} words`)
}
assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length)
const output = JSON.stringify(posts, null, 2) + '\n'
const destination = new URL('../src/content/articles.json', import.meta.url)
if (process.argv.includes('--check'))
  assert.equal(
    await readFile(destination, 'utf8'),
    output,
    'Run npm run articles:build to update generated content',
  )
else await writeFile(destination, output)
