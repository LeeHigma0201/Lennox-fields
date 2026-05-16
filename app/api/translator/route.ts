import { NextRequest, NextResponse } from 'next/server'
import { MODEL_ID } from '@/app/translator/constants'

// ---------------------------------------------------------------------------
// Anthropic API proxy for the Feelings Translator.
// Private side project — used only by Jason and Tamara. Requires ANTHROPIC_API_KEY
// in Vercel env. Returns the model's raw text response so the client can run
// the same parseJsonish strip that the HTML artifact uses.
// ---------------------------------------------------------------------------

export const runtime = 'nodejs'

type Body = {
  prompt?: unknown
  maxTokens?: unknown
}

export async function POST(req: NextRequest) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt : ''
  if (!prompt.trim()) {
    return NextResponse.json({ error: 'Missing prompt.' }, { status: 400 })
  }
  if (prompt.length > 16000) {
    return NextResponse.json({ error: 'Prompt too long.' }, { status: 400 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'ANTHROPIC_API_KEY is not set. Add it in Vercel env (Project → Settings → Environment Variables) and redeploy.',
      },
      { status: 503 }
    )
  }

  const maxTokens =
    typeof body.maxTokens === 'number' && body.maxTokens > 0 && body.maxTokens <= 4096
      ? body.maxTokens
      : 1024

  let upstream: Response
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL_ID,
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Could not reach Anthropic.', detail: String(err) },
      { status: 502 }
    )
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => '')
    return NextResponse.json(
      { error: `Anthropic returned ${upstream.status}.`, detail: detail.slice(0, 500) },
      { status: 502 }
    )
  }

  const data = (await upstream.json()) as {
    content?: Array<{ type: string; text?: string }>
  }
  const text =
    (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text || '')
      .join('') || ''

  return NextResponse.json({ text })
}
