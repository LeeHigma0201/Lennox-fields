// ============================================================
// ICON MAPPING (internal - no need to edit this file)
// Maps icon name strings from config files to actual components.
// ============================================================

import {
  Heart,
  Users,
  Home,
  Sprout,
  Briefcase,
  Brain,
  Shield,
  Stethoscope,
  FileText,
  CheckSquare,
  BookOpen,
  Target,
  Lightbulb,
} from 'lucide-react'

export const iconMap = {
  Heart,
  Users,
  Home,
  Sprout,
  Briefcase,
  Brain,
  Shield,
  Stethoscope,
  FileText,
  CheckSquare,
  BookOpen,
  Target,
  Lightbulb,
} as const

export type IconName = keyof typeof iconMap
