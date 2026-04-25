/**
 * Tests for /api/contact route handler
 *
 * Mocks the Resend SDK so no real emails are sent.
 * Asserts that the handler calls Resend with the correct arguments
 * and falls back to logged-only mode when RESEND_API_KEY is absent.
 */

// ── Mock Resend before any imports that load the module ───────────────────
const mockSendEmail = jest.fn()

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: mockSendEmail,
      },
    })),
  }
})

// ── Mock Next.js server primitives ───────────────────────────────────────
// The route uses NextRequest / NextResponse; we need light stubs.
jest.mock('next/server', () => {
  class NextRequest {
    private _body: string
    constructor(_url: string, init: { method: string; body: string }) {
      this._body = init.body
    }
    async json() {
      return JSON.parse(this._body)
    }
  }

  class NextResponse {
    static json(body: unknown, init?: { status?: number }) {
      return { body, status: init?.status ?? 200 }
    }
  }

  return { NextRequest, NextResponse }
})

// ── Import after mocks are in place ──────────────────────────────────────
import { POST } from '../app/api/contact/route'
import { NextRequest } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────
function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  }) as unknown as NextRequest
}

const VALID_BODY = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '555-555-5555',
  service: 'individual',
  message: 'I would like to schedule a consultation.',
}

// ─────────────────────────────────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────────────────────────────────

describe('POST /api/contact', () => {
  const originalApiKey = process.env.RESEND_API_KEY
  const originalToEmail = process.env.CONTACT_TO_EMAIL

  beforeEach(() => {
    jest.clearAllMocks()
    // Successful send by default
    mockSendEmail.mockResolvedValue({ data: { id: 'test-id' }, error: null })
  })

  afterEach(() => {
    // Restore env vars
    if (originalApiKey === undefined) {
      delete process.env.RESEND_API_KEY
    } else {
      process.env.RESEND_API_KEY = originalApiKey
    }
    if (originalToEmail === undefined) {
      delete process.env.CONTACT_TO_EMAIL
    } else {
      process.env.CONTACT_TO_EMAIL = originalToEmail
    }
  })

  // ── Validation ──────────────────────────────────────────────────────────

  it('returns 400 when required fields are missing', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    const res = await POST(makeRequest({ name: 'Jane', email: 'jane@example.com' })) as unknown as { status: number; body: { error: string } }
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/message are required/i)
  })

  it('returns 400 for invalid email format', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    const res = await POST(makeRequest({ ...VALID_BODY, email: 'not-an-email' })) as unknown as { status: number; body: { error: string } }
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/valid email/i)
  })

  // ── Happy path (RESEND_API_KEY set) ─────────────────────────────────────

  it('sends notification email to Tamara with correct fields', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.CONTACT_TO_EMAIL = 'tamara@lennoxfields.com'

    const res = await POST(makeRequest(VALID_BODY)) as unknown as { status: number; body: { success: boolean; method: string } }

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.method).toBe('email')

    // Two sends: notification + confirmation
    expect(mockSendEmail).toHaveBeenCalledTimes(2)

    // First call — notification to Tamara
    const notificationCall = mockSendEmail.mock.calls[0][0]
    expect(notificationCall.to).toBe('tamara@lennoxfields.com')
    expect(notificationCall.replyTo).toBe(VALID_BODY.email)
    expect(notificationCall.subject).toContain(VALID_BODY.name)
    expect(notificationCall.subject).toContain(VALID_BODY.service)

    // Second call — confirmation to submitter
    const confirmationCall = mockSendEmail.mock.calls[1][0]
    expect(confirmationCall.to).toBe(VALID_BODY.email)
    expect(confirmationCall.subject).toMatch(/received/i)
  })

  it('uses default CONTACT_TO_EMAIL when env var is not set', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    delete process.env.CONTACT_TO_EMAIL

    await POST(makeRequest(VALID_BODY))

    const notificationCall = mockSendEmail.mock.calls[0][0]
    expect(notificationCall.to).toBe('tamara@lennoxfields.com')
  })

  // ── Fallback when RESEND_API_KEY is missing ──────────────────────────────

  it('returns logged_only (not an error) when RESEND_API_KEY is absent', async () => {
    delete process.env.RESEND_API_KEY

    const res = await POST(makeRequest(VALID_BODY)) as unknown as { status: number; body: { success: boolean; method: string } }

    // Should still succeed (submission logged) but NOT send email
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.method).toBe('logged_only')
    expect(mockSendEmail).not.toHaveBeenCalled()
  })

  // ── Resend API error (non-silent) ────────────────────────────────────────

  it('returns logged_only when Resend returns an API error', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    mockSendEmail.mockResolvedValue({ data: null, error: { name: 'validation_error', message: 'Invalid from address' } })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const res = await POST(makeRequest(VALID_BODY)) as unknown as { status: number; body: { success: boolean; method: string } }

    // Should not silently drop — must log the error
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('CONTACT FORM ERROR'),
      expect.anything()
    )
    // Still returns 200 (submission was logged to Vercel as backup)
    expect(res.status).toBe(200)
    expect(res.body.method).toBe('logged_only')

    consoleSpy.mockRestore()
  })

  // ── Resend throws exception (non-silent) ─────────────────────────────────

  it('returns logged_only and logs error when Resend throws', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    mockSendEmail.mockRejectedValue(new Error('Network failure'))

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const res = await POST(makeRequest(VALID_BODY)) as unknown as { status: number; body: { success: boolean; method: string } }

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('CONTACT FORM ERROR'),
      expect.any(Error)
    )
    expect(res.status).toBe(200)
    expect(res.body.method).toBe('logged_only')

    consoleSpy.mockRestore()
  })
})
