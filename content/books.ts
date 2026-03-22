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
    id: 'brave-hearts',
    title: 'Brave Hearts and Helping Hands',
    ageRange: '',
    topics: ['Children', 'Bibliotherapy', 'Resilience', 'Empathy'],
    description:
      'A heartfelt story about courage and kindness — helping children learn that brave hearts and helping hands can make a real difference in the world around them.',
    amazonUrl: 'https://a.co/d/0fnWatag',
    format: ['Kindle', 'Paperback'],
    coverColor: 'bg-soft-rose',
    coverImage: '/images/tamara/brave-hearts-cover.jpg',
  },
  {
    id: 'book-2',
    title: 'Book 2',
    ageRange: '',
    topics: ['Children', 'Bibliotherapy'],
    description:
      'Another engaging therapeutic book designed to help children process emotions and build resilience through age-appropriate narratives.',
    amazonUrl: 'https://a.co/d/00QUHTXT',
    format: ['Kindle', 'Paperback'],
    coverColor: 'bg-primary-sage',
    coverImage: '',
  },
  {
    id: 'when-a-pet-is-sick',
    title: 'When a Pet Is Sick',
    ageRange: '',
    topics: ['Children', 'Bibliotherapy', 'Pet Loss', 'Grief'],
    description:
      'A compassionate story helping children understand and process the experience of having a sick pet — navigating worry, grief, and hope.',
    amazonUrl: 'https://a.co/d/0iBxath4',
    format: ['Kindle', 'Paperback'],
    coverColor: 'bg-accent-gold',
    coverImage: '',
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
