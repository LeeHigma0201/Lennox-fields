// Worksheets content for /resources/worksheets
// Interactive worksheets live in /tools/* — PDFs live in /public/worksheets/*

export type Worksheet = {
  title: string
  description: string
  category: string
  href?: string // for interactive worksheets
  pdf?: string // for downloadable PDFs (path relative to /public)
  icon: string // lucide-react icon name (resolved in page)
  interactive?: boolean
}

export type WorksheetSection = {
  id: string
  title: string
  intro: string
  accent: string // tailwind bg color class for section dot
  worksheets: Worksheet[]
}

const interactiveWorksheets: Worksheet[] = [
  {
    title: 'CBT Thought Record',
    description:
      'Identify, challenge, and reframe negative automatic thoughts using this structured cognitive behavioral therapy worksheet.',
    href: '/tools/cbt-thought-record',
    category: 'Cognitive Behavioral Therapy',
    icon: 'Brain',
    interactive: true,
  },
  {
    title: 'Safety Plan',
    description:
      'Create a personalized safety plan with warning signs, coping strategies, and emergency contacts for difficult moments.',
    href: '/tools/safety-planning',
    category: 'Crisis Planning',
    icon: 'Shield',
    interactive: true,
  },
  {
    title: 'DEARMAN Skills',
    description:
      'Practice DBT interpersonal effectiveness using the DEARMAN, GIVE, and FAST frameworks for assertive communication.',
    pdf: '/DEARMAN Skills - Lennox Fields.pdf',
    category: 'DBT Skills',
    icon: 'Users',
  },
]

const neurodivergentWorksheets: Worksheet[] = [
  {
    title: 'Sensory Toolkit Builder',
    description:
      'Build a personalized regulation toolkit by mapping the touch, sound, visual, movement, and scent inputs that help your nervous system feel safe.',
    pdf: '/worksheets/neurodivergent/LF_02_Sensory_Toolkit_Builder.pdf',
    category: 'Sensory & Regulation',
    icon: 'Sparkles',
  },
  {
    title: 'Masking Inventory & Cost Assessment',
    description:
      'Identify where you mask in daily life and assess the energetic, emotional, and physical cost of those adaptations.',
    pdf: '/worksheets/neurodivergent/LF_03_Masking_Inventory_Cost_Assessment.pdf',
    category: 'Masking & Identity',
    icon: 'Eye',
  },
  {
    title: 'Unmasking Safety Planning',
    description:
      'Plan small, safe steps toward unmasking by identifying low-risk relationships, environments, and practices.',
    pdf: '/worksheets/neurodivergent/LF_04_Unmasking_Safety_Planning.pdf',
    category: 'Masking & Identity',
    icon: 'Shield',
  },
  {
    title: 'Autistic Burnout Warning Signs Tracker',
    description:
      'Track early warning signs across cognition, sensory tolerance, social capacity, and emotional regulation to catch burnout earlier.',
    pdf: '/worksheets/neurodivergent/LF_05_Autistic_Burnout_Warning_Signs_Tracker.pdf',
    category: 'Burnout Recovery',
    icon: 'AlertTriangle',
  },
  {
    title: 'Burnout Recovery Planning Guide',
    description:
      'A structured guide to recovering from autistic burnout — reducing demands, restoring resources, and rebuilding capacity.',
    pdf: '/worksheets/neurodivergent/LF_06_Burnout_Recovery_Planning_Guide.pdf',
    category: 'Burnout Recovery',
    icon: 'Compass',
  },
  {
    title: 'ADHD Executive Function Daily Planner',
    description:
      'A planner designed around how ADHD brains actually work — energy, interest, urgency, and novelty rather than rigid time blocks.',
    pdf: '/worksheets/neurodivergent/LF_07_ADHD_Executive_Function_Daily_Planner.pdf',
    category: 'ADHD & Executive Function',
    icon: 'Calendar',
  },
  {
    title: 'Task Initiation Strategies Menu',
    description:
      'A menu of evidence-based strategies for starting tasks when executive function is offline — pick the one that fits the moment.',
    pdf: '/worksheets/neurodivergent/LF_08_Task_Initiation_Strategies_Menu.pdf',
    category: 'ADHD & Executive Function',
    icon: 'Zap',
  },
  {
    title: 'Rejection Sensitive Dysphoria Coping Plan',
    description:
      'Recognize the spike of RSD, separate the feeling from the facts, and apply grounding strategies that work for you.',
    pdf: '/worksheets/neurodivergent/LF_09_Rejection_Sensitive_Dysphoria_Coping_Plan.pdf',
    category: 'Emotional Regulation',
    icon: 'Heart',
  },
  {
    title: 'Emotional Intensity Mapping Tool',
    description:
      'Map the intensity, body location, and trajectory of strong emotions so you can intervene earlier with the right tool.',
    pdf: '/worksheets/neurodivergent/LF_10_Emotional_Intensity_Mapping_Tool.pdf',
    category: 'Emotional Regulation',
    icon: 'Activity',
  },
  {
    title: 'Hyperfocus Inventory',
    description:
      'Catalog your hyperfocus patterns — what triggers them, what they cost, and how to use them as a strength rather than a trap.',
    pdf: '/worksheets/neurodivergent/LF_11_Hyperfocus_Inventory.pdf',
    category: 'ADHD & Executive Function',
    icon: 'Target',
  },
  {
    title: 'Body Doubling Accountability Planner',
    description:
      'Plan body doubling sessions — in person or virtual — to make hard tasks easier through co-regulated focus.',
    pdf: '/worksheets/neurodivergent/LF_12_Body_Doubling_Accountability_Planner.pdf',
    category: 'ADHD & Executive Function',
    icon: 'Users',
  },
  {
    title: 'AuDHD Relationship Needs Communicator',
    description:
      'Translate AuDHD needs into clear language partners, friends, and family can understand and respond to.',
    pdf: '/worksheets/neurodivergent/LF_13_AuDHD_Relationship_Needs_Communicator.pdf',
    category: 'Relationships',
    icon: 'MessageCircle',
  },
  {
    title: 'Stimming Awareness & Acceptance Log',
    description:
      'Notice your stims without judgment, identify what each one regulates, and build acceptance for the body wisdom they represent.',
    pdf: '/worksheets/neurodivergent/LF_14_Stimming_Awareness_Acceptance_Log.pdf',
    category: 'Sensory & Regulation',
    icon: 'Sparkles',
  },
  {
    title: 'Interoception Body Check-In',
    description:
      'Build interoceptive awareness — tuning into hunger, thirst, fatigue, temperature, and emotion signals from inside the body.',
    pdf: '/worksheets/neurodivergent/LF_15_Interoception_Body_Check_In.pdf',
    category: 'Sensory & Regulation',
    icon: 'Heart',
  },
  {
    title: 'Alexithymia Emotion Identification Guide',
    description:
      'A scaffold for identifying emotions when the words do not come easily — body sensations, situations, and emotion families.',
    pdf: '/worksheets/neurodivergent/LF_16_Alexithymia_Emotion_Identification_Guide.pdf',
    category: 'Emotional Regulation',
    icon: 'Compass',
  },
  {
    title: 'Demand Avoidance Pattern Recognition',
    description:
      'Recognize your demand-avoidance patterns and the underlying nervous system signals driving them.',
    pdf: '/worksheets/neurodivergent/LF_17_Demand_Avoidance_Pattern_Recognition.pdf',
    category: 'PDA Profile',
    icon: 'AlertTriangle',
  },
  {
    title: 'PDA Profile Collaborative Goals Sheet',
    description:
      'Set goals collaboratively in a way that respects autonomy, reduces demand pressure, and uses indirect language.',
    pdf: '/worksheets/neurodivergent/LF_18_PDA_Profile_Collaborative_Goals_Sheet.pdf',
    category: 'PDA Profile',
    icon: 'Target',
  },
  {
    title: 'Neurodivergent Identity Affirmation Journal',
    description:
      'Daily prompts for affirming your neurodivergent identity, releasing internalized ableism, and celebrating your wiring.',
    pdf: '/worksheets/neurodivergent/LF_19_Neurodivergent_Identity_Affirmation_Journal.pdf',
    category: 'Identity & Joy',
    icon: 'BookOpen',
  },
  {
    title: 'Late Diagnosis Grief Processing',
    description:
      'A guided worksheet for processing the grief, anger, and relief that often follows a late autism or ADHD diagnosis.',
    pdf: '/worksheets/neurodivergent/LF_20_Late_Diagnosis_Grief_Processing.pdf',
    category: 'Identity & Joy',
    icon: 'Heart',
  },
  {
    title: 'AuDHD Parenting Strengths Inventory',
    description:
      'Identify the unique strengths AuDHD parents bring — empathy, creativity, hyperfocus on care — and the supports that protect them.',
    pdf: '/worksheets/neurodivergent/LF_21_AuDHD_Parenting_Strengths_Inventory.pdf',
    category: 'Family & Parenting',
    icon: 'Users',
  },
  {
    title: 'Twice-Exceptional Student Support Planner',
    description:
      'Plan supports for 2e students whose giftedness and learning differences both need accommodating in school and at home.',
    pdf: '/worksheets/neurodivergent/LF_22_Twice_Exceptional_Student_Support_Planner.pdf',
    category: 'School & Learning',
    icon: 'BookOpen',
  },
  {
    title: 'Neurodivergent Communication Preferences Card',
    description:
      'A printable card to share with employers, partners, and providers that explains your communication needs and access requirements.',
    pdf: '/worksheets/neurodivergent/LF_23_Neurodivergent_Communication_Preferences_Card.pdf',
    category: 'Relationships',
    icon: 'MessageCircle',
  },
  {
    title: 'Energy Accounting Daily Tracker',
    description:
      'Track energy in and energy out across the day so you can spot the patterns that drain you and the ones that restore you.',
    pdf: '/worksheets/neurodivergent/LF_24_Energy_Accounting_Daily_Tracker.pdf',
    category: 'Burnout Recovery',
    icon: 'Activity',
  },
  {
    title: 'Autistic Joy Inventory',
    description:
      'Catalog the special interests, sensory pleasures, and stims that bring you joy — and protect them as a daily practice.',
    pdf: '/worksheets/neurodivergent/LF_25_Autistic_Joy_Inventory.pdf',
    category: 'Identity & Joy',
    icon: 'Sparkles',
  },
]

const familyParentingWorksheets: Worksheet[] = [
  {
    title: 'Family Roles Mapping Worksheet',
    description:
      'Map the explicit and implicit roles each family member carries — caregiver, peacemaker, scapegoat, hero — and how they shape the system.',
    pdf: '/worksheets/family-parenting/LF_51_Family_Roles_Mapping_Worksheet.pdf',
    category: 'Family Systems',
    icon: 'Users',
  },
  {
    title: 'Genogram Guided Reflection',
    description:
      'Build a multi-generational family map and reflect on the patterns, relationships, and stories that shape who you are today.',
    pdf: '/worksheets/family-parenting/LF_52_Genogram_Guided_Reflection.pdf',
    category: 'Family Systems',
    icon: 'BookOpen',
  },
  {
    title: 'Intergenerational Patterns Identifier',
    description:
      'Identify the patterns — communication, attachment, conflict, money, addiction — that cycle across generations in your family.',
    pdf: '/worksheets/family-parenting/LF_53_Intergenerational_Patterns_Identifier.pdf',
    category: 'Family Systems',
    icon: 'Compass',
  },
  {
    title: 'Parenting Triggers & Responses Log',
    description:
      'Track the moments your child triggers your nervous system, what gets activated, and how you want to respond next time.',
    pdf: '/worksheets/family-parenting/LF_54_Parenting_Triggers_Responses_Log.pdf',
    category: 'Conscious Parenting',
    icon: 'Activity',
  },
  {
    title: 'Neurodivergent Parenting Accommodation Planner',
    description:
      'Design accommodations that fit your neurodivergent child — sensory, executive function, communication, and emotional regulation.',
    pdf: '/worksheets/family-parenting/LF_55_Neurodivergent_Parenting_Accommodation_Planner.pdf',
    category: 'Neurodivergent Family',
    icon: 'Sparkles',
  },
  {
    title: 'Co-Parenting Communication Agreement',
    description:
      'A template for building a clear, consistent co-parenting communication agreement — channels, response times, and conflict protocols.',
    pdf: '/worksheets/family-parenting/LF_56_Co_Parenting_Communication_Agreement.pdf',
    category: 'Co-Parenting & Divorce',
    icon: 'MessageCircle',
  },
  {
    title: 'Divorce Psychoeducation for Parents',
    description:
      'Evidence-based guidance on what kids need from parents during and after divorce — by developmental stage and temperament.',
    pdf: '/worksheets/family-parenting/LF_57_Divorce_Psychoeducation_for_Parents.pdf',
    category: 'Co-Parenting & Divorce',
    icon: 'BookOpen',
  },
  {
    title: 'Helping Kids Understand Big Feelings',
    description:
      'Scripts, visuals, and language for helping young children name, locate, and ride out big emotions without shame.',
    pdf: '/worksheets/family-parenting/LF_58_Helping_Kids_Understand_Big_Feelings.pdf',
    category: 'Child Emotional Skills',
    icon: 'Heart',
  },
  {
    title: 'Family Meeting Structure Template',
    description:
      'A simple, repeatable structure for weekly family meetings — appreciations, logistics, problem-solving, and connection.',
    pdf: '/worksheets/family-parenting/LF_59_Family_Meeting_Structure_Template.pdf',
    category: 'Family Systems',
    icon: 'Calendar',
  },
  {
    title: 'Parent Burnout Assessment',
    description:
      'A self-assessment for parental burnout — exhaustion, emotional distancing, and loss of efficacy — with recovery starting points.',
    pdf: '/worksheets/family-parenting/LF_60_Parent_Burnout_Assessment.pdf',
    category: 'Caregiver Wellbeing',
    icon: 'AlertTriangle',
  },
  {
    title: 'Parenting Values Clarification Worksheet',
    description:
      'Clarify the values you want to parent from — the kind of parent you want to be when no one is watching and everything is hard.',
    pdf: '/worksheets/family-parenting/LF_61_Parenting_Values_Clarification_Worksheet.pdf',
    category: 'Conscious Parenting',
    icon: 'Compass',
  },
  {
    title: 'Rupture & Repair Practice Guide',
    description:
      'A practice guide for repairing after parenting ruptures — owning impact, modeling repair, and rebuilding trust with your child.',
    pdf: '/worksheets/family-parenting/LF_62_Rupture_Repair_Practice_Guide.pdf',
    category: 'Conscious Parenting',
    icon: 'Heart',
  },
  {
    title: 'Sibling Conflict Resolution Framework',
    description:
      'A step-by-step framework for de-escalating sibling conflict and coaching kids through repair without taking sides.',
    pdf: '/worksheets/family-parenting/LF_63_Sibling_Conflict_Resolution_Framework.pdf',
    category: 'Child Emotional Skills',
    icon: 'Users',
  },
  {
    title: 'Parenting a Neurodivergent Child: Grief & Acceptance',
    description:
      'A worksheet for processing the grief and arriving at the acceptance that often comes with parenting a neurodivergent child.',
    pdf: '/worksheets/family-parenting/LF_64_Parenting_Neurodivergent_Child_Grief_Acceptance.pdf',
    category: 'Neurodivergent Family',
    icon: 'Heart',
  },
  {
    title: 'IEP / 504 Advocacy Prep Worksheet',
    description:
      'Prepare for an IEP or 504 meeting — strengths, concerns, accommodations to request, and questions to ask the school team.',
    pdf: '/worksheets/family-parenting/LF_65_IEP_504_Advocacy_Prep_Worksheet.pdf',
    category: 'School Advocacy',
    icon: 'Target',
  },
  {
    title: 'School Communication Documentation Log',
    description:
      'A structured log for documenting all school communications — calls, emails, meetings — for IEP, 504, or behavioral concerns.',
    pdf: '/worksheets/family-parenting/LF_66_School_Communication_Documentation_Log.pdf',
    category: 'School Advocacy',
    icon: 'BookOpen',
  },
  {
    title: 'Sensory-Friendly Home Environment Checklist',
    description:
      'A room-by-room checklist for designing a sensory-friendly home that supports regulation for the whole family.',
    pdf: '/worksheets/family-parenting/LF_67_Sensory_Friendly_Home_Environment_Checklist.pdf',
    category: 'Neurodivergent Family',
    icon: 'Sparkles',
  },
  {
    title: 'Bedtime Routine Builder for Neurodivergent Kids',
    description:
      'Build a predictable, sensory-aware bedtime routine that works with — not against — your neurodivergent child\'s wiring.',
    pdf: '/worksheets/family-parenting/LF_68_Bedtime_Routine_Builder_Neurodivergent_Kids.pdf',
    category: 'Neurodivergent Family',
    icon: 'Calendar',
  },
  {
    title: 'Meltdown vs. Tantrum Psychoeducation',
    description:
      'Learn the neurological difference between meltdowns and tantrums — and the very different responses each one needs.',
    pdf: '/worksheets/family-parenting/LF_69_Meltdown_vs_Tantrum_Psychoeducation.pdf',
    category: 'Child Emotional Skills',
    icon: 'AlertTriangle',
  },
  {
    title: 'Co-Regulation Strategies for Caregivers',
    description:
      'A menu of co-regulation strategies — voice, body, breath, presence — for grounding your child by first grounding yourself.',
    pdf: '/worksheets/family-parenting/LF_70_Co_Regulation_Strategies_for_Caregivers.pdf',
    category: 'Conscious Parenting',
    icon: 'Heart',
  },
  {
    title: 'Family Strengths Inventory',
    description:
      'Identify the strengths, resources, and protective factors your family already carries — and how to build on them intentionally.',
    pdf: '/worksheets/family-parenting/LF_71_Family_Strengths_Inventory.pdf',
    category: 'Family Systems',
    icon: 'Sparkles',
  },
  {
    title: 'Boundaries in Family Systems',
    description:
      'Map the boundaries in your family system — too rigid, too diffuse, healthy — and where adjustments would protect everyone.',
    pdf: '/worksheets/family-parenting/LF_72_Boundaries_in_Family_Systems.pdf',
    category: 'Family Systems',
    icon: 'Shield',
  },
  {
    title: 'Estranged Family Relationship Processing Guide',
    description:
      'A guide for processing the complex grief, relief, and ambiguity that comes with family estrangement.',
    pdf: '/worksheets/family-parenting/LF_73_Estranged_Family_Relationship_Processing_Guide.pdf',
    category: 'Family Systems',
    icon: 'Compass',
  },
  {
    title: 'Blended Family Transition Planner',
    description:
      'Plan the transition into a blended family — roles, routines, names, expectations, and the time it really takes to belong.',
    pdf: '/worksheets/family-parenting/LF_74_Blended_Family_Transition_Planner.pdf',
    category: 'Co-Parenting & Divorce',
    icon: 'Users',
  },
  {
    title: 'Caregiver Compassion Fatigue Assessment',
    description:
      'A self-assessment for compassion fatigue and secondary traumatic stress — for parents, partners, and professional caregivers.',
    pdf: '/worksheets/family-parenting/LF_75_Caregiver_Compassion_Fatigue_Assessment.pdf',
    category: 'Caregiver Wellbeing',
    icon: 'Activity',
  },
]

export const worksheetSections: WorksheetSection[] = [
  {
    id: 'interactive',
    title: 'Interactive Tools',
    intro:
      'Fillable, evidence-based worksheets you can complete right in your browser. Nothing is saved or sent — your responses stay private.',
    accent: 'bg-primary-sage',
    worksheets: interactiveWorksheets,
  },
  {
    id: 'neurodivergent',
    title: 'Neurodivergent Support',
    intro:
      'Affirming worksheets for autistic, ADHD, AuDHD, and PDA-profile adults — built around how your brain actually works, not how it is supposed to.',
    accent: 'bg-soft-rose',
    worksheets: neurodivergentWorksheets,
  },
  {
    id: 'family-parenting',
    title: 'Family & Parenting',
    intro:
      'Tools for parents, co-parents, and caregivers — including specialized resources for raising neurodivergent kids and navigating family systems.',
    accent: 'bg-warm-sand',
    worksheets: familyParentingWorksheets,
  },
]

export const worksheetCounts = {
  interactive: interactiveWorksheets.length,
  neurodivergent: neurodivergentWorksheets.length,
  familyParenting: familyParentingWorksheets.length,
  total:
    interactiveWorksheets.length +
    neurodivergentWorksheets.length +
    familyParentingWorksheets.length,
}
