// ============================================================
// ABOUT PAGE CONTENT
// Edit this file to update your bio, credentials, training,
// and clinical approach sections.
// ============================================================

// --- Page Header ---
export const aboutHeader = {
  title: 'Meet Tamara Walls, LPCA',
  subtitle: 'Founder of Lennox Fields Clinical Mental Health Services',
  intro:
    "Evidence-based mental health care delivered with clinical precision and genuine respect for each client's history. My approach combines structured, measurable treatment with the therapeutic relationship that makes change possible.",
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
    title: 'Licensed Professional Counselor Associate (LPCA)',
    subtitle: 'Licensed in Kentucky',
    description:
      'Active licensure in good standing, providing evidence-based counseling services.',
  },
  {
    title: 'Certified in Dialectical Behavior Therapy (C-DBT)',
    subtitle: 'Specialized Training',
    description:
      'Advanced certification in DBT for treating complex trauma, emotional dysregulation, and interpersonal challenges.',
  },
  {
    title: 'Trauma-Conscious Model (TCM)',
    subtitle: 'Program Builder & Practitioner',
    description:
      'Developed and implemented TCM programs integrating trauma-informed and neurodiversity-affirming approaches.',
  },
]

// --- Specialized Training ---
// The "icon" field accepts: "Brain", "Heart", "Users", "Target", "Lightbulb"
export const specializedTraining = [
  {
    icon: 'Brain' as const,
    title: 'Dialectical Behavior Therapy (DBT)',
    description: 'Certified DBT practitioner — emotional regulation, distress tolerance, and interpersonal effectiveness',
  },
  {
    icon: 'Heart' as const,
    title: 'Trauma-Conscious Model (TCM)',
    description: 'Built and implemented TCM programs for complex trauma processing',
  },
  {
    icon: 'Lightbulb' as const,
    title: 'ADHD & Autism Support',
    description: 'Neurodiversity-affirming clinical work for Attention-Deficit/Hyperactivity Disorder (ADHD) and Autism Spectrum Disorder (ASD), including late-diagnosis identity, masking, and burnout',
  },
  {
    icon: 'Target' as const,
    title: 'Complex PTSD',
    description: 'Specialized approaches for Complex Post-Traumatic Stress Disorder (C-PTSD), including developmental and chronic trauma',
  },
  {
    icon: 'Users' as const,
    title: 'Couples & Family Systems',
    description: 'Systemic approaches to relationship and family counseling',
  },
  {
    icon: 'Brain' as const,
    title: 'Career Counseling',
    description: 'Career development, assessment, and transition support',
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
        'I integrate multiple modalities — Dialectical Behavior Therapy (DBT), Trauma-Focused Cognitive Behavioral Therapy (TF-CBT), Solution-Focused Brief Therapy (SFBT), Emotionally Focused Therapy (EFT), and Internal Family Systems (IFS)-informed parts work — sequenced to clinical presentation and treatment goals. Research consistently identifies the therapeutic relationship as one of the strongest predictors of outcome; building that relationship is foundational to the work.',
    },
    {
      title: 'Strength-Based & Culturally Sensitive',
      description:
        'I believe in identifying and building on your existing strengths while being mindful of cultural, social, and systemic factors that impact mental health. Your identity, background, and values are integral to the therapeutic process.',
    },
    {
      title: 'Goal-Oriented & Measurable',
      description:
        'Treatment establishes clear, measurable goals and reviews progress at regular intervals. Therapy should produce tangible improvements; modalities and cadence are adjusted as clinical needs change.',
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
  title: 'Meet Tamara Walls, LPCA',
  paragraphs: [
    "I'm a Licensed Professional Counselor Associate, Certified DBT practitioner, children's bibliotherapy author, and an avid advocate for vulnerable populations. My work is deep, and it's personal.",
    "I specialize in Attention-Deficit/Hyperactivity Disorder (ADHD), Autism Spectrum Disorder (ASD), and Complex Post-Traumatic Stress Disorder (C-PTSD), working with adults, couples, and families. I built TCM programs, I write therapeutic books for kids, and I've been creating clinical tools and resources for over a decade. Lennox Fields is where all of that lives.",
  ],
  credentials: [
    { label: 'LPCA', detail: 'Licensed in Kentucky' },
    { label: 'C-DBT', detail: 'Certified DBT Practitioner' },
    { label: 'TCM', detail: 'Program Builder' },
  ],
  approachTitle: 'My Approach',
  approachText:
    'Therapy proceeds as a collaborative partnership. Treatment identifies clear goals, builds on existing strengths, and develops practical strategies for lasting change. You are the expert on your life; I bring clinical training, evidence-based tools, and the structure to make progress measurable.',
  trainingList: [
    'Dialectical Behavior Therapy (DBT)',
    'Trauma-Conscious Model (TCM)',
    'ADHD & Autism Assessment and Support',
    'Complex PTSD and Trauma Processing',
    'Career Development and Counseling',
  ],
}
