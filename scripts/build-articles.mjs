import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'

// This deliberately supports only the Markdown used in content/articles:
// paragraphs, h2 headings, inline code, links, and fenced code blocks.
const directory = new URL('../content/articles/', import.meta.url)
const manifest = JSON.parse(await readFile(new URL('manifest.json', directory), 'utf8'))
const timestamp = '2026-10-11T00:00:00.000Z'
const text = (value, format = 0) => ({
  type: 'text', version: 1, text: value, format, mode: 'normal', style: '', detail: 0,
})
const element = (type, children, extra = {}) => ({
  type, version: 1, children, direction: 'ltr', format: '', indent: 0, ...extra,
})
function inline(value) {
  const nodes = []
  const pattern = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g
  let offset = 0
  for (const match of value.matchAll(pattern)) {
    if (match.index > offset) nodes.push(text(value.slice(offset, match.index)))
    if (match[1]) nodes.push(text(match[1], 16))
    else {
      assert.match(match[3], /^(https:\/\/|\/)/)
      nodes.push(element('link', [text(match[2])], {
        fields: { linkType: 'custom', url: match[3], newTab: false },
      }))
    }
    offset = match.index + match[0].length
  }
  if (offset < value.length) nodes.push(text(value.slice(offset)))
  return nodes
}
function lexical(markdown) {
  const children = []
  const parts = markdown.split(/(```[^\n]*\n[\s\S]*?\n```)/g)
  for (const part of parts) {
    if (part.startsWith('```')) {
      const [, language, code] = part.match(/^```([^\n]*)\n([\s\S]*)\n```$/)
      assert.ok(['python', 'javascript', 'json'].includes(language))
      children.push({ type: 'block', version: 2, format: '', fields: { blockType: 'code', language, code } })
    } else {
      for (const paragraph of part.trim().split(/\n\s*\n/).filter(Boolean)) {
        if (paragraph.startsWith('# ')) continue
        if (paragraph.startsWith('## ')) {
          children.push(element('heading', inline(paragraph.slice(3)), { tag: 'h2' }))
        } else {
          assert.ok(!paragraph.startsWith('#'), 'Unsupported heading')
          children.push(element('paragraph', inline(paragraph.replace(/\n/g, ' ')), { textFormat: 0, textStyle: '' }))
        }
      }
    }
  }
  return { root: element('root', children) }
}
const posts = []
for (const entry of manifest) {
  const markdown = await readFile(new URL(`${entry.slug}.md`, directory), 'utf8')
  assert.ok(markdown.startsWith(`# ${entry.title}\n`))
  assert.ok(!/[\u2013\u2014]/.test(markdown), `${entry.slug}: dash style`)
  const wordCount = markdown.split(/\s+/).length
  assert.ok(wordCount >= 450 && wordCount <= 700, `${entry.slug}: ${wordCount} words`)
  const image = {
    id: `article-cover-${entry.slug}`, alt: entry.alt,
    url: `/images/articles/${entry.image}`, filename: entry.image,
    mimeType: 'image/webp', width: 1536, height: 1024,
    createdAt: timestamp, updatedAt: timestamp,
  }
  await readFile(new URL(`../public${image.url}`, import.meta.url))
  posts.push({
    id: `article-${entry.slug}`, title: entry.title, slug: entry.slug,
    description: entry.description, content: lexical(markdown), heroImage: image,
    categories: [{ id: entry.category, title: entry.category, createdAt: timestamp, updatedAt: timestamp }],
    meta: { title: entry.title, description: entry.description, image },
    populatedAuthors: [{ name: 'Muhammad Hassan' }],
    publishedAt: timestamp, createdAt: timestamp, updatedAt: timestamp, _status: 'published',
  })
  console.log(`${entry.slug}: ${wordCount} words`)
}
assert.equal(new Set(posts.map(post => post.slug)).size, posts.length)
const output = JSON.stringify(posts, null, 2) + '\n'
const destination = new URL('../src/content/articles.json', import.meta.url)
if (process.argv.includes('--check')) {
  assert.equal(await readFile(destination, 'utf8'), output, 'Run npm run articles:build to update generated content')
} else {
  await writeFile(destination, output)
}
