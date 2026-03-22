import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'Lennox Fields Clinical Mental Health Services — Tamara Walls, LPCA | ADHD, Autism, CPTSD, Trauma Therapy in Kentucky'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const cwd = process.cwd()

  const [logoData, photoData, playfairFont, interFont] = await Promise.all([
    readFile(join(cwd, 'public/images/LFLogo.jpeg')),
    readFile(join(cwd, 'public/images/tamara/casual-sunglasses.jpg')),
    readFile(join(cwd, 'public/fonts/PlayfairDisplay-SemiBold.ttf')),
    readFile(join(cwd, 'public/fonts/Inter-Regular.ttf')),
  ])

  const logoSrc = `data:image/jpeg;base64,${logoData.toString('base64')}`
  const photoSrc = `data:image/jpeg;base64,${photoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#faf9f7',
        }}
      >
        {/* ── Left: Tam's photo ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '480px',
            height: '100%',
            display: 'flex',
            filter: 'grayscale(100%) contrast(1.1)',
          }}
        >
          <img
            src={photoSrc}
            width={480}
            height={630}
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </div>

        {/* ── Gradient fade from photo to background ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '320px',
            width: '240px',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, #faf9f7 100%)',
          }}
        />

        {/* ── Soft ambient glows ── */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-40px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192, 145, 145, 0.18) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '200px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(117, 133, 111, 0.14) 0%, transparent 70%)',
          }}
        />

        {/* ── Top & bottom border lines ── */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '500px',
            right: '40px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(180, 154, 131, 0.35) 30%, rgba(180, 154, 131, 0.35) 70%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '500px',
            right: '40px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(180, 154, 131, 0.35) 30%, rgba(180, 154, 131, 0.35) 70%, transparent 100%)',
          }}
        />

        {/* ── Right: Brand content ── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '700px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '40px',
            paddingRight: '60px',
          }}
        >
          {/* Logo */}
          <img
            src={logoSrc}
            width={140}
            height={140}
            style={{ objectFit: 'contain', marginBottom: '12px' }}
          />

          {/* Business name */}
          <div
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: '46px',
              fontWeight: 600,
              color: '#8a7a5a',
              letterSpacing: '5px',
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
              fontSize: '13px',
              fontWeight: 400,
              color: '#75856f',
              letterSpacing: '4.5px',
              marginTop: '6px',
              textAlign: 'center',
            }}
          >
            CLINICAL MENTAL HEALTH SERVICES
          </div>

          {/* Divider */}
          <div
            style={{
              width: '50px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #C09191, transparent)',
              marginTop: '20px',
            }}
          />

          {/* Therapist name */}
          <div
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: '20px',
              fontWeight: 600,
              color: '#6b5e4f',
              letterSpacing: '1.5px',
              marginTop: '18px',
              textAlign: 'center',
            }}
          >
            Tamara Walls, LPCA
          </div>

          {/* Specialties */}
          <div
            style={{
              fontFamily: '"Inter"',
              fontSize: '12px',
              fontWeight: 400,
              color: '#A39690',
              letterSpacing: '2px',
              marginTop: '8px',
              textAlign: 'center',
            }}
          >
            ADHD  ·  AUTISM  ·  CPTSD  ·  TRAUMA
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
