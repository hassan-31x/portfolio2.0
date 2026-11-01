import { createElement as h } from 'react'
import { ImageResponse } from 'next/og.js'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { socialImage } from '../src/constants/social-image.ts'

const fontRoot = new URL('../node_modules/geist/dist/fonts/geist-sans/', import.meta.url)
const [regular, bold, logo] = await Promise.all([
  readFile(new URL('Geist-Regular.ttf', fontRoot)),
  readFile(new URL('Geist-Bold.ttf', fontRoot)),
  readFile(new URL('../public/favicon.svg', import.meta.url)),
])

const image = new ImageResponse(
  h(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '72px 80px',
        background: '#0c0d0e',
        color: '#f5f5f4',
        fontFamily: 'Geist',
      },
    },
    h('img', {
      src: `data:image/svg+xml;base64,${logo.toString('base64')}`,
      width: 72,
      height: 72,
      alt: '',
      style: { marginBottom: 32 },
    }),
    h(
      'div',
      { style: { fontSize: 68, fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.1 } },
      'Muhammad Hassan',
    ),
    h('div', { style: { fontSize: 34, marginTop: 18 } }, 'AI Product Engineer'),
    h(
      'div',
      { style: { fontSize: 25, color: '#a3a3a3', marginTop: 16 } },
      'Agentic systems · Multimodal AI · Model engineering',
    ),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', marginTop: 48, gap: 12 } },
      h('div', { style: { width: 8, height: 8, borderRadius: 4, background: '#22c55e' } }),
      h('div', { style: { fontSize: 22, color: '#a3a3a3' } }, 'mhassandev.vercel.app'),
    ),
  ),
  {
    width: socialImage.width,
    height: socialImage.height,
    fonts: [
      { name: 'Geist', data: regular, weight: 400, style: 'normal' },
      { name: 'Geist', data: bold, weight: 700, style: 'normal' },
    ],
  },
)

const output = `public${socialImage.url}`
await mkdir(dirname(output), { recursive: true })
await writeFile(output, Buffer.from(await image.arrayBuffer()))
console.log(`Saved ${output} (${socialImage.width} × ${socialImage.height})`)
