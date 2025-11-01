/**
 * HIPAA-Compliant Encryption Utilities
 *
 * This module provides AES-256 encryption for Protected Health Information (PHI)
 * All client data must be encrypted at rest and in transit
 */

import CryptoJS from 'crypto-js'

const MASTER_KEY = process.env.MASTER_ENCRYPTION_KEY || 'development-key-change-in-production'
const PHI_KEY = process.env.PHI_ENCRYPTION_KEY || 'development-phi-key-change-in-production'

/**
 * Encrypt Protected Health Information (PHI)
 */
export function encryptPHI(data: string | object): string {
  const stringData = typeof data === 'string' ? data : JSON.stringify(data)
  return CryptoJS.AES.encrypt(stringData, PHI_KEY).toString()
}

/**
 * Decrypt Protected Health Information (PHI)
 */
export function decryptPHI<T = string>(encryptedData: string): T {
  const bytes = CryptoJS.AES.decrypt(encryptedData, PHI_KEY)
  const decrypted = bytes.toString(CryptoJS.enc.Utf8)

  try {
    return JSON.parse(decrypted) as T
  } catch {
    return decrypted as T
  }
}

/**
 * Encrypt general sensitive data
 */
export function encrypt(data: string | object): string {
  const stringData = typeof data === 'string' ? data : JSON.stringify(data)
  return CryptoJS.AES.encrypt(stringData, MASTER_KEY).toString()
}

/**
 * Decrypt general sensitive data
 */
export function decrypt<T = string>(encryptedData: string): T {
  const bytes = CryptoJS.AES.decrypt(encryptedData, MASTER_KEY)
  const decrypted = bytes.toString(CryptoJS.enc.Utf8)

  try {
    return JSON.parse(decrypted) as T
  } catch {
    return decrypted as T
  }
}

/**
 * Hash sensitive data (one-way, for storage)
 */
export function hashData(data: string): string {
  return CryptoJS.SHA256(data).toString()
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return CryptoJS.lib.WordArray.random(length).toString()
}
