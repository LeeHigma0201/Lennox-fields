// ============================================================
// BOOKS
// Edit this file to update your children's book catalog.
// To add a new book, copy one of the existing entries and
// change the values.
// ============================================================

export const booksPageHeader = {
  title: "Children's Mental Health Books",
  subtitle:
    'Therapeutic books that help children understand tough topics, process emotions, and build resilience. Perfect for parents, therapists, and educators.',
}

// --- Book Catalog ---
// coverColor options: 'bg-soft-rose', 'bg-clinical-blue', 'bg-accent-gold', 'bg-primary-sage', 'bg-earth-green'
export const books = [
  {
    id: 'tough-topics-kids',
    title: 'Tough Topics for Kids: Understanding Big Feelings',
    ageRange: '4-8 years',
    topics: ['Emotions', 'Coping Skills', 'Self-Regulation'],
    description:
      'Help children understand and express their emotions in healthy ways. This engaging book introduces age-appropriate concepts about feelings, validation, and coping strategies.',
    price: 14.99,
    format: ['Paperback', 'eBook'],
    coverColor: 'bg-soft-rose',
  },
  {
    id: 'when-families-change',
    title: 'When Families Change: Navigating Transitions',
    ageRange: '6-10 years',
    topics: ['Divorce', 'Family Changes', 'Resilience'],
    description:
      'A compassionate guide for children experiencing family transitions. Addresses divorce, remarriage, moving, and other major changes with sensitivity and hope.',
    price: 14.99,
    format: ['Paperback', 'eBook'],
    coverColor: 'bg-clinical-blue',
  },
  {
    id: 'worry-warrior',
    title: "The Worry Warrior: A Kid's Guide to Anxiety",
    ageRange: '7-12 years',
    topics: ['Anxiety', 'Worry', 'Mindfulness', 'CBT'],
    description:
      'Empowering children to understand and manage anxiety through simple CBT techniques, breathing exercises, and positive self-talk.',
    price: 16.99,
    format: ['Paperback', 'eBook'],
    coverColor: 'bg-accent-gold',
  },
]

// --- "For Therapists & Educators" section ---
export const therapeuticTools = [
  'Evidence-based concepts',
  'Age-appropriate language',
  'Inclusive illustrations',
  'Practical coping strategies',
]

export const companionResources = [
  'Parent discussion guides',
  'Activity worksheets',
  'Therapist implementation notes',
  'Classroom lesson plans',
]

// --- "How to Use These Books" steps ---
export const howToUse = [
  {
    audience: 'For Parents',
    description:
      "Read together with your child in a calm, comfortable setting. Use the discussion questions to open conversations about their feelings and experiences. The books normalize difficult emotions and provide vocabulary for expression.",
  },
  {
    audience: 'For Therapists',
    description:
      'Incorporate into play therapy, bibliotherapy, or traditional talk therapy sessions. Use the activities to process emotions, teach coping skills, and build therapeutic rapport. Perfect for individual or group therapy.',
  },
  {
    audience: 'For Educators',
    description:
      'Use in social-emotional learning (SEL) curriculum, classroom discussions, or individual support for struggling students. The books help create emotionally safe classrooms where feelings are validated.',
  },
]
