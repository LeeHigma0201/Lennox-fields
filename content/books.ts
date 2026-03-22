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
    id: 'what-is-a-divorce',
    title: 'What Is a Divorce',
    ageRange: '',
    series: 'Tough Topics for Kids',
    topics: ['Children', 'Bibliotherapy', 'Divorce', 'Family Changes'],
    description:
      'A gentle story that helps children navigate the difficult and often confusing topic of parental separation — reminding them that even when a family\'s shape changes, the love inside it remains just as strong.',
    amazonUrl: 'https://a.co/d/0fnWatag',
    format: ['Kindle', 'Paperback'],
    coverColor: 'bg-soft-rose',
    coverImage: '/images/books/what-is-a-divorce.jpg',
  },
  {
    id: 'brave-hearts',
    title: 'Brave Hearts & Helping Hands',
    ageRange: '',
    series: 'Tough Topics for Kids',
    topics: ['Children', 'Bibliotherapy', 'Addiction', 'Family Support'],
    description:
      'A gentle story that helps children understand that family addiction is never their fault — introducing healthy coping strategies and a story of hope and healing.',
    amazonUrl: 'https://a.co/d/00QUHTXT',
    format: ['Kindle', 'Paperback'],
    coverColor: 'bg-primary-sage',
    coverImage: '/images/books/brave-hearts.jpg',
  },
  {
    id: 'when-a-pet-is-sick',
    title: 'When a Pet Is Sick',
    ageRange: '',
    series: 'Tough Topics for Kids',
    topics: ['Children', 'Bibliotherapy', 'Pet Illness', 'Grief', 'Coping'],
    description:
      'A gentle story that helps children understand how to hold several big feelings at once and how to cope through tough times with a pet — honoring love and building resilience.',
    amazonUrl: 'https://a.co/d/0iBxath4',
    format: ['Kindle', 'Paperback'],
    coverColor: 'bg-accent-gold',
    coverImage: '/images/books/when-a-pet-is-sick.jpg',
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
