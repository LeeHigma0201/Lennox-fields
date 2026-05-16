import { NextRequest, NextResponse } from 'next/server'
import { MODEL_ID } from '@/app/translator/constants'

// ---------------------------------------------------------------------------
// Gemini proxy for the Feelings Translator.
//
// Why Gemini: Jason's Anthropic Startup Program application was rejected
// (see reference_accounts_map.md), and he already uses Google AI Studio in
// ChargeRight + InspectRight production. Same env var name (`GOOGLE_API_KEY`)
// so it slots into Vercel without inventing a new convention.
//
// Returns the model's raw text response so the client's parseJsonish strip
// keeps working unchanged. We also pass `responseMimeType: application/json`
// so Gemini emits JSON without code fences in the first place.
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

  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'GOOGLE_API_KEY is not set. Add it in Vercel env (Project → Settings → Environment Variables) — same key Jason already uses for ChargeRight/InspectRight.',
      },
      { status: 503 }
    )
  }

  const maxTokens =
    typeof body.maxTokens === 'number' && body.maxTokens > 0 && body.maxTokens <= 4096
      ? body.maxTokens
      : 1024

  const model = process.env.GEMINI_MODEL || MODEL_ID

  let upstream: Response
  try {
    upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            maxOutputTokens: maxTokens,
            temperature: 0.7,
          },
        }),
      }
    )
  } catch (err) {
    return NextResponse.json(
      { error: 'Could not reach Gemini.', detail: String(err) },
      { status: 502 }
    )
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => '')
    return NextResponse.json(
      { error: `Gemini returned ${upstream.status}.`, detail: detail.slice(0, 500) },
      { status: 502 }
    )
  }

  const data = (await upstream.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> }
      finishReason?: string
    }>
    promptFeedback?: { blockReason?: string }
  }

  if (data.promptFeedback?.blockReason) {
    return NextResponse.json(
      { error: `Gemini blocked the prompt: ${data.promptFeedback.blockReason}` },
      { status: 502 }
    )
  }

  const text =
    (data.candidates?.[0]?.content?.parts || [])
      .map((p) => p.text || '')
      .join('') || ''

  return NextResponse.json({ text })
}
