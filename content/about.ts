// ============================================================
// ABOUT PAGE CONTENT
// Edit this file to update your bio, credentials, training,
// and clinical approach sections.
// ============================================================

// --- Page Header ---
export const aboutHeader = {
  title: 'Meet Tamara Walls, M.Ed, LPCA',
  subtitle: 'Founder of Lennox Fields Clinical Mental Health Services',
  intro:
    'I believe that everyone deserves access to compassionate, effective mental health care that honors their unique journey. My approach combines evidence-based practices with genuine warmth to create a safe space for healing and growth.',
}

// --- My Story / Journey Section ---
// Each paragraph is a separate string in the array.
export const myStory = {
  title: 'My Journey to Mental Health Counseling',
  paragraphs: [
    "My path to becoming a mental health counselor wasn't a straight line—it was shaped by personal experiences, a deep curiosity about human resilience, and a desire to make mental health support accessible and effective.",
    'After earning my Master of Education in Clinical Mental Health Counseling, I became passionate not just about providing therapy, but about creating resources that could support people at every stage of their mental health journey. This vision led to the creation of Lennox Fields—a practice that goes beyond traditional therapy to offer comprehensive tools, assessments, and educational materials.',
    "I've worked with individuals, couples, and families facing a wide range of challenges: anxiety, depression, trauma, relationship difficulties, career transitions, and substance use concerns. Each person I work with teaches me something new about resilience, courage, and the human capacity for change.",
    "Beyond clinical work, I'm an author of children's mental health books and a resource developer for mental health professionals. I believe that by making quality tools and education accessible, we can support better mental health outcomes for everyone.",
  ],
}

// --- Credentials ---
export const credentials = [
  {
    title: 'Master of Education (M.Ed)',
    subtitle: 'Clinical Mental Health Counseling',
    description:
      'Comprehensive training in evidence-based therapeutic approaches, clinical assessment, diagnosis, and treatment planning.',
  },
  {
    title: 'Licensed Professional Counselor Associate (LPCA)',
    subtitle: 'Licensed in North Carolina & Indiana',
    description:
      'Active licensure in good standing, working toward full Licensed Professional Counselor (LPC) status.',
  },
]

// --- Specialized Training ---
// The "icon" field accepts: "Brain", "Heart", "Users", "Target", "Lightbulb"
export const specializedTraining = [
  {
    icon: 'Brain' as const,
    title: 'Cognitive Behavioral Therapy (CBT)',
    description: 'Evidence-based treatment for anxiety, depression, and trauma',
  },
  {
    icon: 'Heart' as const,
    title: 'EMDR Therapy',
    description: 'Eye Movement Desensitization and Reprocessing for trauma',
  },
  {
    icon: 'Users' as const,
    title: 'Couples & Family Systems',
    description: 'Systemic approaches to relationship and family therapy',
  },
  {
    icon: 'Target' as const,
    title: 'Career Counseling',
    description: 'Career development, assessment, and transition support',
  },
  {
    icon: 'Lightbulb' as const,
    title: 'Trauma-Informed Care',
    description: 'Understanding and addressing the impact of trauma',
  },
  {
    icon: 'Heart' as const,
    title: 'Substance Use Treatment',
    description: 'ASAM criteria and evidence-based addiction treatment',
  },
]

// --- Clinical Approach ---
export const clinicalApproach = {
  title: 'My Clinical Approach',
  approaches: [
    {
      title: 'Collaborative & Person-Centered',
      description:
        "You are the expert on your own life. My role is to provide support, guidance, and evidence-based tools while honoring your autonomy and unique experiences. Therapy is a partnership where we work together toward your goals.",
    },
    {
      title: 'Evidence-Based & Flexible',
      description:
        "I integrate multiple therapeutic approaches—including CBT, EMDR, and mindfulness-based interventions—tailoring treatment to what works best for you. Research shows that the therapeutic relationship is one of the strongest predictors of positive outcomes, so building trust and rapport is always my first priority.",
    },
    {
      title: 'Strength-Based & Culturally Sensitive',
      description:
        'I believe in identifying and building on your existing strengths while being mindful of cultural, social, and systemic factors that impact mental health. Your identity, background, and values are integral to the therapeutic process.',
    },
    {
      title: 'Goal-Oriented & Measurable',
      description:
        "We'll establish clear, achievable goals and regularly assess progress. Therapy should lead to tangible improvements in your life, and I'm committed to helping you see and measure that change.",
    },
  ],
}

// --- Beyond Clinical Practice ---
export const beyondClinical = [
  {
    title: 'Author & Publisher',
    description:
      "I write therapeutic children's books that help young people understand and cope with tough topics. These books serve as bridges between parents, educators, and children, making difficult conversations more accessible.",
    linkText: 'Explore My Books',
    linkHref: '/books',
  },
  {
    title: 'Professional Resource Development',
    description:
      'I create tools and resources for mental health professionals, including treatment plan generators, assessment tools, and licensing guides. Making professional resources accessible helps improve care quality across the field.',
    linkText: 'Professional Tools',
    linkHref: '/professional',
  },
]

// --- About Preview on Home Page ---
export const aboutPreview = {
  title: 'Meet Tamara Walls, M.Ed, LPCA',
  paragraphs: [
    'My journey into mental health counseling began with a deep belief that everyone deserves compassionate, effective support during life\'s challenges. With a Master of Education in Clinical Mental Health Counseling and licensure as a Professional Counselor Associate, I bring both expertise and heart to every session.',
    "I specialize in helping individuals, couples, and families navigate anxiety, depression, relationship challenges, career transitions, and trauma. Beyond traditional therapy, I'm passionate about making mental health resources accessible to everyone—which is why Lennox Fields offers a comprehensive library of tools, assessments, and educational materials.",
  ],
  credentials: [
    { label: 'M.Ed', detail: 'Clinical Mental Health Counseling' },
    { label: 'LPCA', detail: 'Licensed in NC & IN' },
    { label: 'Specialized', detail: 'CBT, EMDR, Career' },
  ],
  approachTitle: 'My Approach',
  approachText:
    "I believe therapy should be a collaborative partnership. Together, we'll identify your goals, build on your strengths, and develop practical strategies for lasting change. You're the expert on your life—I'm here to provide guidance, support, and evidence-based tools.",
  trainingList: [
    'Cognitive Behavioral Therapy (CBT)',
    'Eye Movement Desensitization and Reprocessing (EMDR)',
    'Couples and Family Systems Therapy',
    'Career Development and Counseling',
    'Trauma-Informed Care',
  ],
}
