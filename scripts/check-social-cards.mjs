import assert from 'node:assert/strict'
import sharp from 'sharp'

const origin = new URL(process.argv[2] || 'http://localhost:3005')
const local = ['localhost', '127.0.0.1'].includes(origin.hostname)
const imageChecks = new Map()
const paths = [
  '/',
  '/projects',
  '/about',
  '/blogs',
  '/contact',
  '/blogs/bpe-merge-order',
  '/projects/gpt-2',
]

function getTags(html) {
  const head = html.split('</head>')[0]
  return [...head.matchAll(/<meta\s[^>]*>/g)].map(([tag]) =>
    Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [
        name,
        value.replaceAll('&amp;', '&'),
      ]),
    ),
  )
}

async function checkImage(url, userAgent) {
  const absolute = new URL(url)
  assert.ok(['https:', 'http:'].includes(absolute.protocol), `Invalid image URL: ${url}`)
  // Local builds can use a different metadataBase than the verification server.
  const target = local ? new URL(absolute.pathname + absolute.search, origin) : absolute
  if (!imageChecks.has(target.href)) {
    imageChecks.set(
      target.href,
      (async () => {
        const response = await fetch(target, { headers: { 'User-Agent': userAgent } })
        assert.equal(response.status, 200, `Image is unavailable: ${target}`)
        assert.match(response.headers.get('content-type') || '', /^image\/(png|jpeg|webp)/)
        const data = Buffer.from(await response.arrayBuffer())
        assert.ok(data.length < 5 * 1024 * 1024, 'Social image exceeds 5 MB')
        const metadata = await sharp(data).metadata()
        assert.ok(metadata.width >= 300 && metadata.height >= 157, `Image too small: ${target}`)
        return data
      })(),
    )
  }
  return imageChecks.get(target.href)
}

for (const userAgent of ['Twitterbot/1.0', 'Mozilla/5.0']) {
  for (const path of paths) {
    const response = await fetch(new URL(path, origin), { headers: { 'User-Agent': userAgent } })
    assert.equal(response.status, 200, `${path} is unavailable`)
    const tags = getTags(await response.text())
    const one = (key) => {
      const matches = tags.filter((tag) => tag.name === key || tag.property === key)
      assert.equal(matches.length, 1, `Expected one ${key} tag in the HTML head at ${path}`)
      return matches[0].content
    }
    assert.equal(one('twitter:card'), 'summary_large_image')
    const twitterImage = one('twitter:image')
    const ogImage = one('og:image')
    assert.equal(twitterImage, ogImage, `OG and Twitter images disagree at ${path}`)
    await checkImage(twitterImage, userAgent)
    assert.ok(one('twitter:title') && one('twitter:description'))
    if (path === '/') {
      assert.equal(new URL(twitterImage).pathname, '/social/portfolio-card-v2.png')
      assert.ok(one('twitter:image:alt'))
    }
    console.log(`${userAgent}: ${path} has a valid large image card`)
  }
}

const legacy = await fetch(new URL('/opengraph-image', origin), {
  headers: { 'User-Agent': 'Twitterbot/1.0' },
})
assert.equal(legacy.status, 200, 'The image URL in older cached cards must keep working')
assert.match(legacy.headers.get('content-type') || '', /^image\/png/)
const fallback = await checkImage(
  new URL('/social/portfolio-card-v2.png', origin).href,
  'Twitterbot/1.0',
)
assert.deepEqual(Buffer.from(await legacy.arrayBuffer()), fallback)
console.log('Legacy image URL also serves the correct PNG')
