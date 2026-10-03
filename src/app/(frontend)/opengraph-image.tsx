import { ImageResponse } from 'next/og'

export const alt = 'Muhammad Hassan, AI Engineer specializing in agentic and multimodal systems'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '88px',
          background: '#0c0d0e',
          color: '#f5f5f4',
        }}
      >
        <div style={{ width: 56, height: 4, background: '#22c55e', marginBottom: 28 }} />
        <div style={{ fontSize: 62, fontWeight: 700 }}>Muhammad Hassan</div>
        <div style={{ fontSize: 32, marginTop: 24 }}>AI Engineer</div>
        <div style={{ fontSize: 28, color: '#a3a3a3', marginTop: 16 }}>
          Agentic and multimodal systems
        </div>
        <div style={{ fontSize: 20, color: '#a3a3a3', marginTop: 32 }}>
          github.com/hassan-31x
        </div>
      </div>
    ),
    size,
  )
}
