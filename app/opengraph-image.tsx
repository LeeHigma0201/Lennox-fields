import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'Lennox Fields Clinical Mental Health Services — Tamara Walls, LPCA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const cwd = process.cwd()

  // Load assets in parallel
  const [logoData, playfairFont, interFont] = await Promise.all([
    readFile(join(cwd, 'public/images/LFLogo.jpeg')),
    readFile(join(cwd, 'public/fonts/PlayfairDisplay-SemiBold.ttf')),
    readFile(join(cwd, 'public/fonts/Inter-Regular.ttf')),
  ])

  const logoSrc = `data:image/jpeg;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #faf9f7 0%, #f5efe9 30%, #ede3da 55%, #f0e8e0 75%, #faf9f7 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Soft organic glows for depth and calm ── */}

        {/* Rose glow — top right */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-60px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192, 145, 145, 0.22) 0%, transparent 70%)',
          }}
        />

        {/* Sage glow — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-180px',
            left: '-80px',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(117, 133, 111, 0.18) 0%, transparent 70%)',
          }}
        />

        {/* Warm sand glow — center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(180, 154, 131, 0.12) 0%, transparent 65%)',
          }}
        />

        {/* Rose accent — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            right: '180px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192, 145, 145, 0.16) 0%, transparent 70%)',
          }}
        />

        {/* Sage accent — top left */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '160px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(117, 133, 111, 0.12) 0%, transparent 70%)',
          }}
        />

        {/* Golden glow behind logo */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(155, 140, 90, 0.1) 0%, transparent 60%)',
          }}
        />

        {/* ── Elegant border lines ── */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '50px',
            right: '50px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(180, 154, 131, 0.3) 20%, rgba(180, 154, 131, 0.3) 80%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50px',
            right: '50px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(180, 154, 131, 0.3) 20%, rgba(180, 154, 131, 0.3) 80%, transparent 100%)',
          }}
        />

        {/* ── Corner accents ── */}
        <div style={{ position: 'absolute', top: '36px', left: '56px', width: '32px', height: '1px', background: 'rgba(180, 154, 131, 0.25)' }} />
        <div style={{ position: 'absolute', top: '36px', left: '56px', width: '1px', height: '32px', background: 'rgba(180, 154, 131, 0.25)' }} />
        <div style={{ position: 'absolute', top: '36px', right: '56px', width: '32px', height: '1px', background: 'rgba(180, 154, 131, 0.25)' }} />
        <div style={{ position: 'absolute', top: '36px', right: '56px', width: '1px', height: '32px', background: 'rgba(180, 154, 131, 0.25)' }} />
        <div style={{ position: 'absolute', bottom: '36px', left: '56px', width: '32px', height: '1px', background: 'rgba(180, 154, 131, 0.25)' }} />
        <div style={{ position: 'absolute', bottom: '36px', left: '56px', width: '1px', height: '32px', background: 'rgba(180, 154, 131, 0.25)' }} />
        <div style={{ position: 'absolute', bottom: '36px', right: '56px', width: '32px', height: '1px', background: 'rgba(180, 154, 131, 0.25)' }} />
        <div style={{ position: 'absolute', bottom: '36px', right: '56px', width: '1px', height: '32px', background: 'rgba(180, 154, 131, 0.25)' }} />

        {/* ── Floating particles for depth ── */}
        <div style={{ position: 'absolute', top: '90px', left: '130px', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(192, 145, 145, 0.15)' }} />
        <div style={{ position: 'absolute', top: '160px', right: '210px', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(117, 133, 111, 0.15)' }} />
        <div style={{ position: 'absolute', bottom: '130px', left: '310px', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(180, 154, 131, 0.12)' }} />
        <div style={{ position: 'absolute', top: '210px', left: '90px', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(192, 145, 145, 0.14)' }} />
        <div style={{ position: 'absolute', bottom: '90px', right: '160px', width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(117, 133, 111, 0.15)' }} />
        <div style={{ position: 'absolute', top: '110px', right: '400px', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(180, 154, 131, 0.1)' }} />
        <div style={{ position: 'absolute', bottom: '200px', right: '100px', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(192, 145, 145, 0.12)' }} />
        <div style={{ position: 'absolute', top: '320px', left: '180px', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(117, 133, 111, 0.1)' }} />

        {/* ── Main content ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <img
            src={logoSrc}
            width={180}
            height={180}
            style={{ objectFit: 'contain', marginBottom: '14px' }}
          />

          {/* Business name */}
          <div
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: '50px',
              fontWeight: 600,
              color: '#8a7a5a',
              letterSpacing: '6px',
              lineHeight: 1.15,
              textAlign: 'center',
            }}
          >
            LENNOX FIELDS
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily: '"Inter"',
              fontSize: '16px',
              fontWeight: 400,
              color: '#75856f',
              letterSpacing: '5px',
              marginTop: '8px',
              textAlign: 'center',
            }}
          >
            CLINICAL MENTAL HEALTH SERVICES
          </div>

          {/* Divider */}
          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #b49a83, transparent)',
              marginTop: '18px',
            }}
          />

          {/* Subtext */}
          <div
            style={{
              fontFamily: '"Inter"',
              fontSize: '14px',
              fontWeight: 400,
              color: '#A39690',
              letterSpacing: '2px',
              marginTop: '14px',
              textAlign: 'center',
            }}
          >
            Evidence-Based Care with Compassion
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Playfair Display',
          data: playfairFont,
          style: 'normal' as const,
          weight: 600 as const,
        },
        {
          name: 'Inter',
          data: interFont,
          style: 'normal' as const,
          weight: 400 as const,
        },
      ],
    }
  )
}
