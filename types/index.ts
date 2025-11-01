// Core type definitions for Lennox Fields

export interface ClientData {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: Date
  address?: string
}

export interface TreatmentGoal {
  id: string
  description: string
  targetDate?: Date
  status: 'active' | 'achieved' | 'revised' | 'discontinued'
  progress: number // 0-100
}

export interface Intervention {
  id: string
  name: string
  description: string
  frequency: string
  modality: string
}

export interface AssessmentScore {
  total: number
  subscales?: Record<string, number>
  interpretation: string
  severity?: 'minimal' | 'mild' | 'moderate' | 'severe'
  recommendations?: string[]
}

export interface ScreeningQuestion {
  id: string
  text: string
  type: 'likert' | 'yes-no' | 'multiple-choice' | 'scale'
  options?: string[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: { min: string; max: string }
}

export interface AssessmentResult {
  assessmentType: string
  completedAt: Date
  score: AssessmentScore
  responses: Record<string, any>
}

export interface BookData {
  id: string
  title: string
  description: string
  ageRange: string
  topics: string[]
  coverImageUrl?: string
  price: number
  previewUrl?: string
}

export interface SupervisionLogEntry {
  id: string
  date: Date
  hours: number
  type: 'individual' | 'group' | 'triadic'
  supervisee: string
  notes?: string
  signatureUrl?: string
}

export interface ResourceItem {
  id: string
  title: string
  description: string
  category: string
  type: 'pdf' | 'interactive' | 'template' | 'guide'
  isPremium: boolean
  filePath?: string
}

export interface PortalUser {
  id: string
  email: string
  role: 'client' | 'therapist' | 'admin'
  name: string
  profileComplete: boolean
}

export interface SessionData {
  id: string
  date: Date
  type: string
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled'
  therapist: string
  notes?: string
}
