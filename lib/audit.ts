/**
 * HIPAA Audit Logging
 *
 * All access to PHI must be logged per HIPAA requirements
 */

import prisma from './prisma'

interface AuditLogData {
  userId: string
  action: string
  resourceType: string
  resourceId?: string
  ipAddress?: string
  userAgent?: string
}

export async function logAudit(data: AuditLogData): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        resourceType: data.resourceType,
        resourceId: data.resourceId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    })
  } catch (error) {
    console.error('Failed to create audit log:', error)
    // In production, this should trigger an alert
  }
}

export async function logClientAccess(
  userId: string,
  clientId: string,
  action: 'VIEW' | 'UPDATE' | 'CREATE' | 'DELETE',
  request?: Request
): Promise<void> {
  await logAudit({
    userId,
    action: `CLIENT_${action}`,
    resourceType: 'CLIENT',
    resourceId: clientId,
    ipAddress: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip') || undefined,
    userAgent: request?.headers.get('user-agent') || undefined,
  })
}

export async function logSessionAccess(
  userId: string,
  sessionId: string,
  action: 'VIEW' | 'UPDATE' | 'CREATE' | 'DELETE',
  request?: Request
): Promise<void> {
  await logAudit({
    userId,
    action: `SESSION_${action}`,
    resourceType: 'SESSION',
    resourceId: sessionId,
    ipAddress: request?.headers.get('x-forwarded-for') || undefined,
    userAgent: request?.headers.get('user-agent') || undefined,
  })
}
