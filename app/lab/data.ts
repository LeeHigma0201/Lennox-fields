// THE LAB v2 — content registries
// All copy, framework citations, and clinical content live here.
// Tamara reviews this file directly before ship.

export type ActiveIngredient = 'slowing' | 'softening' | 'understanding'

export type Station = {
  id: string
  number: string
  name: string
  framework: string
  journey: Journey
  ingredients: ActiveIngredient[]
  estMinutes: number
  contraindicationKey?: ContraindicationKey
  honestyClaim: string
  honestyDetail: string
  introCopy: string
}

export type Journey =
  | 'foundation'
  | 'rituals'
  | 'mapping'
  | 'vulnerability'
  | 'communication'
  | 'repair'
  | 'generative'

export const journeys: Record<Journey, { title: string; subtitle: string; color: string }> = {
  foundation: {
    title: 'Foundation',
    subtitle: 'Regulating before we go deeper',
    color: '#75856f',
  },
  rituals: {
    title: 'Connection rituals',
    subtitle: 'Small daily and weekly habits',
    color: '#6B8E4E',
  },
  mapping: {
    title: 'Mapping our system',
    subtitle: 'Patterns under stress',
    color: '#C5A87D',
  },
  vulnerability: {
    title: 'Vulnerability',
    subtitle: "What's underneath the reaction",
    color: '#C09191',
  },
  communication: {
    title: 'Communication',
    subtitle: 'When something needs to be said',
    color: '#7A6E44',
  },
  repair: {
    title: 'Repair',
    subtitle: 'After a rupture',
    color: '#8a7362',
  },
  generative: {
    title: 'Generative',
    subtitle: "What we're building together",
    color: '#4A90A4',
  },
}

export type ContraindicationKey =
  | 'eft-safety'
  | 'gottman-contempt'
  | 'reach-ongoing-harm'
  | 'apology-betrayal'
  | 'erotic-coercion'
  | 'body-trauma'
  | 'imago-contempt'
  | 'ifs-trauma'
  | 'gridlock-contempt'
  | 'grief-complicated'

export const contraindications: Record<
  ContraindicationKey,
  { title: string; questions: { id: string; q: string; blocksOn: 'yes' | 'no' }[]; redirectCopy: string }
> = {
  'eft-safety': {
    title: 'A check before we start',
    questions: [
      { id: 'affair', q: 'Is there an active untreated affair right now?', blocksOn: 'yes' },
      { id: 'dv', q: 'Is anyone being hurt physically, sexually, or financially?', blocksOn: 'yes' },
      { id: 'addiction', q: 'Is either of you in active addiction without treatment support?', blocksOn: 'yes' },
      { id: 'willing', q: 'Are both of you choosing to be here?', blocksOn: 'no' },
    ],
    redirectCopy:
      "EFT's stance — and ours — is that safety has to come first. This particular exercise asks you to drop into vulnerable feelings, which isn't safe ground if any of the above is true. A therapist can help create a container for this work.",
  },
  'gottman-contempt': {
    title: 'A check before we start',
    questions: [
      {
        id: 'contempt',
        q: 'Is there active contempt — eye rolls, name-calling, sarcasm meant to wound — happening right now?',
        blocksOn: 'yes',
      },
    ],
    redirectCopy:
      "Gentle startup fails when one or both partners are flooded or contemptuous. The Gottmans are explicit that this exercise needs a calmer baseline. Please consider doing this with a therapist first.",
  },
  'reach-ongoing-harm': {
    title: 'A check before we start',
    questions: [
      { id: 'ongoing', q: 'Is the offense ongoing or repeating right now?', blocksOn: 'yes' },
      {
        id: 'attachment-injury',
        q: 'Is this rooted in a major attachment injury (affair, abandonment in crisis, betrayal of core trust)?',
        blocksOn: 'yes',
      },
    ],
    redirectCopy:
      "Worthington is explicit: forgiveness work pre-supposes the offense has stopped. And forgiveness is not the same as reconciliation. Doing this work for an active or attachment-deep injury without a therapist often retraumatizes. Please reach out for support.",
  },
  'apology-betrayal': {
    title: 'A check before we start',
    questions: [
      { id: 'betrayal', q: 'Is this apology for a betrayal-level injury (affair, lie about something foundational)?', blocksOn: 'yes' },
    ],
    redirectCopy:
      "A structured apology can re-injure when the wound is deep and the receiver hasn't had containment for what came up. Please consider doing this with a therapist who can hold both of you.",
  },
  'erotic-coercion': {
    title: 'A check before we start',
    questions: [
      {
        id: 'coercion',
        q: 'Has there been pressure, coercion, or unwanted sexual contact in this relationship?',
        blocksOn: 'yes',
      },
      { id: 'untreated-trauma', q: 'Is there untreated sexual trauma that this conversation might surface?', blocksOn: 'yes' },
    ],
    redirectCopy:
      "Erotic disclosure exercises assume a baseline of sexual safety and informed consent. If either of those is in question, this is therapist territory. AASECT-certified sex therapists work specifically with this.",
  },
  'body-trauma': {
    title: 'A note before we start',
    questions: [
      {
        id: 'dissociation',
        q: 'Do you have a history of dissociation or trauma where body-focus has felt destabilizing?',
        blocksOn: 'yes',
      },
    ],
    redirectCopy:
      "Body-focused exercises can be destabilizing when there's a trauma history. You're welcome to skip this one, do as much as feels okay, or save it for a session with your therapist. There's no wrong choice.",
  },
  'imago-contempt': {
    title: 'A check before we start',
    questions: [
      { id: 'flooded', q: "Is either of you currently flooded or in fight-or-flight?", blocksOn: 'yes' },
      { id: 'contempt2', q: 'Is contempt active in the relationship right now?', blocksOn: 'yes' },
    ],
    redirectCopy:
      "Imago dialogue is meant to slow couples down — it requires both of you to be regulated enough to listen. If you're flooded or contemptuous, this collapses into rebuttal-rehearsal. Try the Foundation journey first, or reach out to a therapist.",
  },
  'ifs-trauma': {
    title: 'A note before we start',
    questions: [
      { id: 'cptsd', q: 'Do you have complex trauma (CPTSD) that you typically work on with a therapist?', blocksOn: 'yes' },
    ],
    redirectCopy:
      "Schwartz is cautious about parts work outside therapy, especially with exiles. You're welcome to do this exercise at the mapping/identification level only. We won't ask you to unburden anything here — that's therapist territory.",
  },
  'gridlock-contempt': {
    title: 'A check before we start',
    questions: [
      {
        id: 'severe-gridlock',
        q: 'Has this conflict been gridlocked for more than a year, with contempt or stonewalling?',
        blocksOn: 'yes',
      },
    ],
    redirectCopy:
      "When dream-work is layered on top of severe gridlock, it can deepen the despair before it lifts. A Gottman-trained therapist can hold both dreams and the gridlock at once. Please consider reaching out.",
  },
  'grief-complicated': {
    title: 'A note before we start',
    questions: [
      {
        id: 'complicated-grief',
        q: 'Is your grief complicated by suicidality, severe depression, or trauma that has felt unmanageable?',
        blocksOn: 'yes',
      },
    ],
    redirectCopy:
      "Some grief asks for more containment than a structured exercise can offer. Please reach out — the Lennox Fields team and the resources below can help.",
  },
}

// Safety gate — five questions before any station entry
export const safetyGate = {
  questions: [
    {
      id: 'safety',
      q: 'Is anyone being hurt — physically, sexually, financially, or by ongoing threat?',
      blocksOn: 'yes' as const,
    },
    {
      id: 'affair',
      q: 'Is there an active untreated affair right now?',
      blocksOn: 'yes' as const,
    },
    {
      id: 'crisis',
      q: 'Is either of you in active mental health crisis (suicidality, recent hospitalization, severe untreated illness)?',
      blocksOn: 'yes' as const,
    },
    {
      id: 'addiction',
      q: 'Is either of you in active addiction without treatment support?',
      blocksOn: 'yes' as const,
    },
    {
      id: 'willing',
      q: 'Are both of you choosing — freely — to be here right now?',
      blocksOn: 'no' as const,
    },
  ],
  blockedCopy:
    "We're going to ask you to step away from this for now. The exercises here are for couples in a basically safe, basically regulated, mutually willing place — and from what you've told us, this isn't that, right now. That's not a judgment. It's the most honest thing structured exercises can do: know their limit. Below are real resources, including a path to a therapist who can hold what these exercises can't.",
}

// Station registry — all 24

export const stations: Station[] = [
  {
    id: 'state-of-union',
    number: '01',
    name: 'State of the Union',
    framework: 'Gottman — Six Magic Hours, 6th hour',
    journey: 'rituals',
    ingredients: ['understanding', 'slowing'],
    estMinutes: 25,
    contraindicationKey: 'gottman-contempt',
    honestyClaim: "Gottman's behavioral patterns replicate. The 94% prediction figure does not.",
    honestyDetail:
      "John Gottman's longitudinal Love Lab work identified the patterns this exercise scaffolds — the Four Horsemen, gentle startup, the 5:1 ratio, repair attempts. Those replicate well. The famous 94%/96% divorce-prediction figures, on the other hand, were credibly criticized by Heyman & Slep (2001) as postdiction on the same dataset; cross-validated accuracy dropped substantially. We're not claiming prediction. We're using the structure that works: 5 specific appreciations, one gentle-startup concern, one repair request, one thing to look forward to.",
    introCopy:
      "A weekly ritual. Five appreciations, one concern (gently), one repair you're asking for, one thing to anticipate together. The order matters. The shape matters more than the words.",
  },
  {
    id: 'stress-reducing',
    number: '02',
    name: 'Stress-Reducing Conversation',
    framework: 'Gottman — daily reunion',
    journey: 'rituals',
    ingredients: ['understanding', 'slowing'],
    estMinutes: 15,
    honestyClaim: 'Structured supportive listening. Low clinical risk.',
    honestyDetail:
      "This is the daily-reunion ritual from The Seven Principles. It's deliberately about external stressors — work, family-of-origin, the world — not about the relationship itself. The Gottmans are explicit: the format collapses if you try to use it for relationship grievances. The receiver follows six rules drawn directly from their work: show interest, communicate understanding, take their side, frame as we-against-the-world, express affection, validate emotions. No advice unless the sender asks for it.",
    introCopy:
      "Tell your partner about something stressful from outside the relationship. They'll listen — without trying to fix it — using a structure designed to leave you feeling understood, not solved.",
  },
  {
    id: 'hold-me-tight',
    number: '03',
    name: 'Hold Me Tight',
    framework: 'Sue Johnson — EFT attachment dialogue',
    journey: 'vulnerability',
    ingredients: ['softening', 'understanding'],
    estMinutes: 30,
    contraindicationKey: 'eft-safety',
    honestyClaim: '30+ years of research. ~70% of distressed couples recover. This is not therapy.',
    honestyDetail:
      "Emotionally Focused Therapy is among the most empirically supported couples therapies in existence. Multiple meta-analyses show large effect sizes; Johnson and colleagues' Attachment Injury Resolution Model (Makinen & Johnson, 2006) shows maintained gains at three-year follow-up; Johnson's 2013 fMRI study showed EFT changes how partner contact mediates threat response in the brain. This station is the educational adaptation from Hold Me Tight (2008), not an EFT therapy session. If something deep surfaces, we'll point you to an EFT-trained therapist.",
    introCopy:
      "Each of you finds the layer underneath the reactive layer. The trigger, what shows on the surface, what's underneath that, the attachment fear, and the longing. Then you read each other's.",
  },
  {
    id: 'ifs-parts',
    number: '04',
    name: 'Parts Mapping',
    framework: 'Schwartz — Internal Family Systems / IFIO',
    journey: 'vulnerability',
    ingredients: ['softening', 'slowing'],
    estMinutes: 25,
    contraindicationKey: 'ifs-trauma',
    honestyClaim: 'IFS is on SAMHSA registry (2015). Evidence is weaker than EFT — face validity is high.',
    honestyDetail:
      "IFS was added to SAMHSA's National Registry of Evidence-Based Programs in 2015. A 2025 scoping review catalogued 27 studies — mostly case studies and quasi-experimental, with two RCTs. The methodological evidence is real but thinner than EFT or Gottman. Clinically and in couple work (Toni Herbine-Blank's IFIO), the framework consistently helps people externalize internal conflict. We keep this exercise at the mapping level — identifying which part showed up, what it's protecting. We do not ask you to unburden exiles here. Schwartz himself is cautious about that outside therapy.",
    introCopy:
      "A recent fight wasn't really between the two of you. It was between two protective parts. This exercise helps each of you name which part showed up — and what it's been carrying.",
  },
  {
    id: 'nvc',
    number: '05',
    name: 'NVC — Need Underneath',
    framework: 'Marshall Rosenberg — Nonviolent Communication',
    journey: 'communication',
    ingredients: ['slowing', 'understanding'],
    estMinutes: 20,
    honestyClaim: 'Thinner RCT base than Gottman or EFT. Mechanism (need-naming) is well-supported elsewhere.',
    honestyDetail:
      "NVC is more practitioner-validated than RCT-validated — Bonnell, Li & van Lingen (2017) showed positive organizational outcomes; the framework's logic is consonant with broader research on I-statements, need-naming, and reducing reactive defensiveness. The active move — separating observation from evaluation, naming need rather than strategy — has independent support. We're scaffolding it strictly: a fact a video camera would record, a feeling-word from the canonical list, a universal need (not a strategy), and a request that's specific, present, and refusable.",
    introCopy:
      "Four fields. What happened (camera-fact). What you felt. What you needed. What you're requesting — specific, doable, and refusable.",
  },
  {
    id: 'attachment-map',
    number: '06',
    name: 'The Attachment Map',
    framework: 'Brennan/Clark/Shaver — ECR-S (Wei et al., 2007)',
    journey: 'mapping',
    ingredients: ['understanding'],
    estMinutes: 12,
    honestyClaim: 'Dimensional, not categorical. Attachment is malleable — this is a snapshot.',
    honestyDetail:
      "The Experiences in Close Relationships scale is the gold-standard self-report measure of adult romantic attachment. The 12-item short form by Wei et al. (2007) and related brief versions have hundreds of validation studies. Two important framings: first, the model is dimensional — anxiety and avoidance — not a four-type taxonomy, even though the quadrants are useful as a visualization. Second, attachment is not destiny. Research on 'earned secure' attachment is robust: internal working models change in response to corrective relational experience. Don't read your result as an identity. Read it as where you are right now under stress.",
    introCopy:
      "Twelve items, two minutes. You'll each see where you sit on two dimensions — anxiety and avoidance — and how your placements relate to each other.",
  },
  {
    id: 'thirty-six',
    number: '07',
    name: 'The 36 Questions',
    framework: 'Aron et al. (1997) — escalating self-disclosure',
    journey: 'generative',
    ingredients: ['softening', 'understanding'],
    estMinutes: 45,
    honestyClaim: 'Lab-measurable closeness in 45 minutes. Not designed to make couples fall in love.',
    honestyDetail:
      "The original Aron, Melinat et al. (1997) procedure showed escalating reciprocal self-disclosure, paired with sustained mutual eye contact, created lab-measurable closeness in strangers. Replications include cross-race pairs (Page-Gould lab, with biomarker reductions) and prejudice-reduction work in Hungary. Elaine Aron's own caveat: this was not designed to make people fall in love, and was not validated longitudinally. For long-tenure couples we substitute Aron's self-expansion questions, which were developed specifically for established couples to rekindle novelty-driven closeness.",
    introCopy:
      "Three sets of twelve. Each more revealing than the last. Both of you answer each one before the next is unlocked. End with four minutes of eye contact in person, if you're up for it.",
  },
  {
    id: 'appreciation',
    number: '08',
    name: 'Appreciation — Find/Remind/Bind',
    framework: 'Sara Algoe — gratitude as relationship glue',
    journey: 'rituals',
    ingredients: ['understanding'],
    estMinutes: 8,
    honestyClaim: 'Other-praising is the active ingredient. Generic "thanks for X" doesn\'t do it.',
    honestyDetail:
      "Algoe's find-remind-bind theory of gratitude (2012) and her work with Fredrickson on other-praising behavior (PMC4988174) show gratitude functions relationally — it signals communal-norm engagement, prompts upward spirals of mutual responsiveness, and predicts relationship maintenance. The active ingredient is naming the partner's qualities, not just the act. Lambert et al. (2010) found expressing gratitude to a partner increased the expresser's perception of communal strength. We force the three-part form because that's what the data supports.",
    introCopy:
      "One appreciation, three parts. The specific behavior. What it cost or took from them. And — this is the part that binds — what it revealed about who they are.",
  },
  {
    id: 'reach',
    number: '09',
    name: 'REACH Forgiveness',
    framework: 'Everett Worthington — REACH protocol',
    journey: 'repair',
    ingredients: ['softening'],
    estMinutes: 35,
    contraindicationKey: 'reach-ongoing-harm',
    honestyClaim: 'Wade et al. 2014 meta-analysis: d≈0.56. Less effective in couples than individuals.',
    honestyDetail:
      "Wade, Hoyt, Kidwell & Worthington's 2014 meta-analysis of 54 studies in the Journal of Consulting and Clinical Psychology found significant effects (d≈0.56 vs. no-treatment) for forgiveness interventions. Worthington's 2024 narrative review of 24 REACH studies found mean effect per hour of about d=0.089. Crucial framing: forgiveness is intrapersonal; reconciliation is interpersonal. They're not the same. This exercise does not obligate you to reconcile. And — Worthington is explicit — forgiveness work pre-supposes the offense has stopped.",
    introCopy:
      "Five steps. Recall the hurt. Empathize with the offender. Consider the altruistic gift. Commit to your forgiveness. And hold on when doubt returns.",
  },
  {
    id: 'apology',
    number: '10',
    name: 'The Apology Architecture',
    framework: 'Schumann (2018) + Lazare (2004) + Gottman repair work',
    journey: 'repair',
    ingredients: ['understanding'],
    estMinutes: 20,
    contraindicationKey: 'apology-betrayal',
    honestyClaim: 'Most apologies fail on impact and behavior change. This forces both.',
    honestyDetail:
      "Schumann's 2018 Current Directions paper catalogues eight elements of comprehensive apologies; effective apologies contain more elements. Gottman's repair-attempt research shows effective repair predicts marital stability above and beyond the four horsemen — 84% of newlyweds high on horsemen but high on repair were stable six years later (Gottman 1999). The two elements apologies most commonly skip are acknowledgment of impact and concrete behavior change. We force differentiation between explanation and excuse — that's the linchpin.",
    introCopy:
      "Eight elements. The apologizer fills each one. The receiver rates each — did this land, or didn't it. The omissions speak.",
  },
  {
    id: 'shared-meaning',
    number: '11',
    name: 'Shared Meaning',
    framework: 'Gottman — Sound Relationship House, top floor',
    journey: 'mapping',
    ingredients: ['understanding'],
    estMinutes: 25,
    honestyClaim: 'We-narrative predicts long-term satisfaction. Buehlman/Gottman/Katz oral history work.',
    honestyDetail:
      "The Sound Relationship House model places shared meaning at the top — the rituals, roles, goals, and symbols that build a we-narrative. Buehlman, Gottman & Katz (1992) coded oral histories of couples and found we-narrative coding predicted divorce three years out with substantial accuracy. Fiese's work on family rituals and child adjustment supports the broader claim that ritual structure is a real ingredient in family functioning, not decoration.",
    introCopy:
      "Four quadrants. The rituals you keep, the roles you each play, the goals you're moving toward, the symbols that mean us. You fill them privately. Then you see the overlap and the gaps.",
  },
  {
    id: 'differentiation',
    number: '12',
    name: 'Differentiation Check-in',
    framework: 'David Schnarch — Crucible Differentiation Scale',
    journey: 'mapping',
    ingredients: ['slowing'],
    estMinutes: 18,
    honestyClaim: 'CDS is psychometrically validated. Schnarch\'s broader desire claims are less RCT-tested.',
    honestyDetail:
      "Schnarch & Regas (2012) validated the 63-item Crucible Differentiation Scale on 4,169 participants — solid psychometrics for the four points of balance: solid flexible self, quiet mind/calm heart, grounded responding, meaningful endurance. Schnarch's broader theoretical claims, particularly that desire decline in long-term couples is a differentiation problem rather than a familiarity problem, are theoretically rich but less RCT-tested. He sits in tension with Sue Johnson — Schnarch emphasizes self-soothing and 'holding onto yourself,' Johnson emphasizes co-regulation and reaching for the other. Both are partially right; healthy couples need both.",
    introCopy:
      "Four questions about you, not about your partner. The point isn't to win — it's to notice what self-regulation looks like in your week, and to name where you held your own.",
  },
  {
    id: 'erotic-self',
    number: '13',
    name: 'Erotic Self + Yes/No/Maybe',
    framework: 'Esther Perel + AASECT-derived list',
    journey: 'generative',
    ingredients: ['softening'],
    estMinutes: 30,
    contraindicationKey: 'erotic-coercion',
    honestyClaim: "Perel is synthesis, not RCT. Sexual self-disclosure → satisfaction is well-supported.",
    honestyDetail:
      "Esther Perel's writing is clinical observation, not experimental research. The underlying claims, though, have research support: MacNeil & Byers (2009) and Mark & Jozkowski (2013) on sexual communication and sexual satisfaction. Sexual self-disclosure consistently predicts both sexual and relationship satisfaction. Yes/no/maybe lists themselves don't have efficacy trials, but they're widely used in AASECT-certified sex therapy as a structured communication tool. This is for couples already in a basically safe sexual rapport who want more language.",
    introCopy:
      "Two parts. Six prompts about what desire actually looks like for you. Then a curated list — yes, no, or maybe — answered separately, revealed together. The maybes are where conversation begins.",
  },
  {
    id: 'body-map',
    number: '14',
    name: 'Body Map',
    framework: 'Nummenmaa et al. (2014) — bodily maps of emotions',
    journey: 'foundation',
    ingredients: ['slowing'],
    estMinutes: 12,
    contraindicationKey: 'body-trauma',
    honestyClaim: 'Cross-cultural replication. Interoception is trainable. Not somatic experiencing.',
    honestyDetail:
      "Nummenmaa et al.'s 2014 PNAS paper established that emotions have reliable somatotopic patterns across cultures — fear lights up the chest and head, sadness drains energy from the limbs, love spreads warmth. Khalsa et al.'s 2018 review documents that interoceptive accuracy (the ability to feel what's happening inside) is trainable and is associated with emotion regulation. This exercise is interoception practice, not somatic experiencing, not trauma processing. If something difficult comes up, please reach out.",
    introCopy:
      "An outline of your body. Pick what you're carrying right now, then color the regions where you feel it — warm or cool, expanding or contracting, dense or diffuse. One sentence to describe the texture.",
  },
  {
    id: 'values',
    number: '15',
    name: 'Values Card Sort',
    framework: 'ACT (Hayes/Strosahl/Wilson) + MI tradition',
    journey: 'mapping',
    ingredients: ['understanding'],
    estMinutes: 18,
    honestyClaim: 'ACT has hundreds of RCTs. Values card sort is a standard ACT clinical procedure.',
    honestyDetail:
      "Acceptance and Commitment Therapy has hundreds of randomized controlled trials across mental health conditions. Values clarification specifically is a core ACT procedure associated with committed action and meaning-making. Miller and Rollnick adopted the card sort into Motivational Interviewing. Different values aren't a problem to solve. They're a shape to live with.",
    introCopy:
      "Sort about fifty value words into three buckets — very important, important, not important. Then force a top five. You'll see your top five next to your partner's.",
  },
  {
    id: 'future-self',
    number: '16',
    name: 'Letter From Your 80-Year-Old Self',
    framework: 'Hershfield — future-self continuity',
    journey: 'generative',
    ingredients: ['understanding'],
    estMinutes: 20,
    honestyClaim: 'Future-self continuity (Hershfield, NeuroImage 2009) → better long-term decisions.',
    honestyDetail:
      "Hal Hershfield's 2009 NeuroImage study and subsequent work shows greater future-self continuity — feeling connected to your future self as the same person — predicts better long-term decision-making, more saving, healthier behavior. Adapting it for couples isn't formally RCT'd, but the mechanism (perspective shift, narrative integration) is well-supported. What does your 80-year-old self want this relationship to have been?",
    introCopy:
      "Write a letter from your 80-year-old self to the two of you today. What do they want you to know? What are they grateful you did? What are they wishing you'd done sooner?",
  },
  {
    id: 'granularity',
    number: '17',
    name: 'Emotion Granularity',
    framework: 'Lisa Feldman Barrett — emotional granularity research',
    journey: 'communication',
    ingredients: ['understanding'],
    estMinutes: 10,
    honestyClaim: 'Granularity → better regulation, less aggression, less neural reactivity to rejection.',
    honestyDetail:
      "Kashdan, Barrett & McKnight (2015, Current Directions in Psychological Science) summarized a body of research showing that higher emotional granularity — using more precise emotion words — predicts better regulation, less alcohol misuse, less aggression, and reduced neural reactivity to social rejection. Naming a precise feeling is itself a regulation move. This is a quick partner exercise: name precisely, justify, and guess each other.",
    introCopy:
      "Pick the precise emotion word for a recent moment. Justify it. Then guess your partner's word for a moment of theirs. The match — or the miss — opens a conversation.",
  },
  {
    id: 'hidden-dream',
    number: '18',
    name: 'The Hidden Dream',
    framework: 'Gottman — gridlock and dream work',
    journey: 'repair',
    ingredients: ['softening', 'understanding'],
    estMinutes: 25,
    contraindicationKey: 'gridlock-contempt',
    honestyClaim: '69% of couple conflicts are perpetual. The pivot is from positions to dreams.',
    honestyDetail:
      "Gottman's research on perpetual problems estimates that 69% of couple conflicts are not resolvable in the traditional sense — they're rooted in differences of personality, history, or values. The clinical move with these is not to solve, but to surface the dream within the conflict. Each partner's position usually masks a deeper hope, fear, value, or family-of-origin pattern. Dream work shifts the conversation from positions to longings, which is where movement actually happens.",
    introCopy:
      "Pick a fight you keep having. Each of you finds the dream underneath your position — the deeper hope, the older fear, the family-of-origin pattern. Then you read each other's dreams, and the conflict has somewhere new to go.",
  },
  {
    id: 'conflict-style',
    number: '19',
    name: 'Conflict Style + Signal',
    framework: 'Gottman conflict typology + Stan Tatkin (Wired for Love)',
    journey: 'mapping',
    ingredients: ['slowing'],
    estMinutes: 15,
    honestyClaim: "Gottman's typology is observational. Tatkin draws on attachment + Schore's affect regulation.",
    honestyDetail:
      "Gottman's typology of stable conflict styles — validating, volatile, conflict-avoiding — comes from his observational research and is descriptive, not predictive of dysfunction. Stan Tatkin's couple bubble work in Wired for Love draws on attachment theory and Allan Schore's right-brain affect regulation research. The actual product of this exercise is small but real: a co-created de-escalation signal both of you commit to honoring. Behavioral commitment, not therapy.",
    introCopy:
      "First, each of you names your stress style — validating, volatile, or avoiding. Then together you co-create one signal — a word, gesture, or written cue — that means slow down. Both of you commit to honoring it.",
  },
  {
    id: 'grief',
    number: '20',
    name: 'Grief Ritual',
    framework: 'Worden tasks of mourning + Bonanno on grief trajectories',
    journey: 'repair',
    ingredients: ['softening', 'understanding'],
    estMinutes: 25,
    contraindicationKey: 'grief-complicated',
    honestyClaim: 'Worden\'s tasks are clinically standard. Bonanno\'s research challenges stage models — grief isn\'t linear.',
    honestyDetail:
      "William Worden's tasks of mourning (accept the reality, process the pain, adjust to a world without, find an enduring connection while moving forward) are widely used clinical scaffolding for grief work. George Bonanno's research, especially The Other Side of Sadness, challenges stage models — most people don't move through linear stages, and resilience is more common than 'grief work' frameworks predicted. We're using Worden's tasks because they're useful, not because they're stages.",
    introCopy:
      "For something you're carrying together — a loss, a miscarriage, a parent's death, a dream that didn't happen. Four prompts each. Then together, you co-author one small ritual.",
  },
  {
    id: 'acr',
    number: '21',
    name: 'Active-Constructive Responding',
    framework: 'Gable, Reis, Impett & Asher (2004)',
    journey: 'rituals',
    ingredients: ['understanding'],
    estMinutes: 5,
    honestyClaim: 'How you respond to good news predicts satisfaction more than support during bad times.',
    honestyDetail:
      "Gable et al. (2004) in JPSP showed that active-constructive responding to a partner's positive event — showing genuine interest, asking questions, expressing enthusiasm — predicts relationship satisfaction more strongly than support during bad times. The four response styles (active-constructive, passive-constructive, active-destructive, passive-destructive) are well-replicated. Five-minute training studies have moved daily satisfaction.",
    introCopy:
      "A scenario. Your partner just shared a small win. You'll draft your response, then see which of the four ACR styles it lands in — and what would shift it toward active-constructive.",
  },
  {
    id: 'mirror',
    number: '22',
    name: 'The Mirror — Imago Dialogue',
    framework: 'Harville Hendrix — full Imago Couples Dialogue',
    journey: 'communication',
    ingredients: ['slowing', 'understanding'],
    estMinutes: 35,
    contraindicationKey: 'imago-contempt',
    honestyClaim: 'Active ingredients are validated even where Imago-as-a-whole has small-study support.',
    honestyDetail:
      "Imago has weaker empirical backing than EFT or Gottman methods. Hannah, Luquet & Hendrix (1997) showed pre-post improvements in 22 couples; Schmidt, Luquet & Gehlert (2016) found workshop satisfaction improvements. There are no large RCTs. But the dialogue's active ingredients — careful active listening, accurate empathic understanding (Rogers, Truax & Carkhuff; Elliott et al. 2018 meta-analysis r≈.28 with therapy outcome), softening (EFT), repair attempts (Gottman) — are extensively validated independently. We use the full seven-step protocol with explicit copy on common pitfalls (mirroring is paraphrase, not parrot; validation isn't agreement; 'is there more?' is the underrated step).",
    introCopy:
      "The full seven steps. Request, send, mirror, 'is there more?', summary, validate, empathize. It's slow on purpose. The slowness is the work.",
  },
  {
    id: 'resonance',
    number: '23',
    name: 'Resonance',
    framework: 'Psychoacoustic + prosody research (Porges, Juslin & Västfjäll)',
    journey: 'foundation',
    ingredients: ['slowing'],
    estMinutes: 8,
    honestyClaim: 'Solfeggio frequencies are not validated. We use sound as attention anchor, not prescription.',
    honestyDetail:
      "We have to be careful here. The popular wellness internet has badly overclaimed sound-frequency effects. Solfeggio frequencies — the 528 Hz / 396 Hz / 432 Hz set — trace to Joseph Puleo and Leonard Horowitz's 1999 derivation from Pythagorean numerology. There is no validated mechanism by which a specific Hz value has specific health effects. Vibroacoustic therapy is real but is a tactile-acoustic intervention (typically 30–120 Hz applied to the body), not a tonal-frequency-as-information one. The polyvagal prosody finding — that mid-range modulated human voice activates the social engagement system — has empirical support; the broader 'ladder' model is more clinical metaphor than tested neuroscience (see Grossman & Taylor 2007, Grossman 2023). What we offer here is sound as an attention anchor and a felt-sense matching exercise. No frequency claims.",
    introCopy:
      "Pick the tone whose body-feel right now most matches what's already in your body. There's no right answer. We're using sound as a way to listen to yourself.",
  },
  {
    id: 'what-i-see',
    number: '24',
    name: 'What I See',
    framework: 'Co-construction of meaning (not Rorschach)',
    journey: 'generative',
    ingredients: ['understanding'],
    estMinutes: 12,
    honestyClaim: "We don't claim this is a personality test. The Rorschach as diagnostic has serious validity problems.",
    honestyDetail:
      "Wood, Nezworski, Lilienfeld & Garb's What's Wrong with the Rorschach? (2003) is the canonical critique — many Comprehensive System scoring claims didn't replicate; the test pathologized non-patients on several scales. The 2013 Mihura et al. monograph found about 13 of 65 Rorschach variables had decent validity, most weak or mixed. We drop projective framing entirely. What this exercise is: ambiguous-stimulus shared meaning-making. Karan, Rosenthal & Robbins (2019) found we-talk in couples predicts relationship outcomes. Rorschach himself called it a Form Interpretation Test and warned against psychoanalytic over-reading.",
    introCopy:
      "There's no right answer to what this is. The point isn't what we see — it's what each of us makes of ambiguity, and what happens when we put those side by side.",
  },
  {
    id: 'sentence-stems',
    number: '25',
    name: 'Sentence Stems',
    framework: 'Sacks-Levy SSCT + Loevinger WUSCT + Imago/EFT/IFS prompts',
    journey: 'vulnerability',
    ingredients: ['softening', 'understanding'],
    estMinutes: 20,
    honestyClaim: "Validity is use-dependent. We're using these as semi-structured self-disclosure prompts, not personality tests.",
    honestyDetail:
      "Sentence completion has a research history (Sacks-Levy SSCT, Loevinger's WUSCT, Rotter's Incomplete Sentences Blank) as a semi-structured self-disclosure method. The original idea — that completion bypasses censorship via pre-conscious associative networks — is more carefully framed today as: these prompts elicit material more spontaneously than free-form questions. Validity depends on what stems you use and how you use them. We're not scoring; we're surfacing. Each set draws from clinical traditions (attachment, family-of-origin work, Imago, IFS, NVC needs literature, Gottman dream-work).",
    introCopy:
      "Pick a theme that matches where you are. Both of you complete the same set, then read each other's. The second answer is often deeper than the first — that's why we ask 'is there more?'",
  },
]

// Sentence stems by theme — used in the Sentence Stems station + composed into others
export const sentenceStems = {
  attachment: {
    label: 'Attachment & longing',
    stems: [
      'When I imagine reaching for you and you not being there, I…',
      'The thing I most want to be true of us is…',
      "What I'm afraid to need from you is…",
      "When I feel close to you, the part of me that's surprised says…",
      'The version of love I learned first was…',
      "If I really let myself be held by you, I'd have to give up…",
    ],
  },
  family: {
    label: 'Family of origin',
    stems: [
      'The thing my mother taught me about love (without saying it) was…',
      'The thing my father taught me about love (without saying it) was…',
      'In my family, anger was…',
      'In my family, sadness was…',
      'The role I played in my family was…',
      'Something I swore I would never do that I sometimes do is…',
      "I'm still trying to earn approval from…",
      "The part of my family I haven't told you about is…",
    ],
  },
  shadow: {
    label: 'Shadow & unmet needs',
    stems: [
      "What I haven't said because I'm afraid of how you'd take it is…",
      'The story I tell myself when I feel small is…',
      "The resentment I'm still carrying is…",
      "What I want and don't ask for is…",
      'The part of me I hide from you is…',
      "I'm jealous of…",
      "Lately I've been carrying…",
      'I feel most invisible when…',
    ],
  },
  future: {
    label: 'Future & vision',
    stems: [
      'Five years from now, I want us to be…',
      "Something I want to do before I die that I haven't told anyone is…",
      "The version of myself I'm trying to become is…",
      "The future I'm afraid of is…",
      'If we had more courage together, we would…',
    ],
  },
  body: {
    label: 'Body & sexuality',
    stems: [
      'What I want to be touched like is…',
      "Something my body knows that my words don't is…",
      'When you look at me, I want to see…',
      'I feel most desired when…',
      'What I learned about my body growing up was…',
      'The story my body tells when we fight is…',
    ],
  },
  repair: {
    label: 'Repair & longing for repair',
    stems: [
      'What I most want you to know about that fight is…',
      'What I owe you an apology for is…',
      "The repair I haven't been able to make is…",
      "What I'd need to hear from you to feel safe again is…",
      "Something I'm holding against myself is…",
    ],
  },
  gratitude: {
    label: 'Gratitude & appreciation',
    stems: [
      "The thing about you I'm most quietly grateful for is…",
      'A moment with you I keep returning to is…',
      "What you do that I don't say I notice is…",
      'The version of you I love most is…',
    ],
  },
  grief: {
    label: 'Grief & change',
    stems: [
      "What I've lost that I haven't grieved is…",
      "The thing I'm watching change in me is…",
      "What I'm afraid to lose is…",
      "Something I'm letting go of is…",
    ],
  },
  self: {
    label: 'Self-knowledge',
    stems: [
      "The thing about me I'm just starting to understand is…",
      "The lie I've been telling myself is…",
      "What I'm tired of pretending is…",
      "The part of me I'm proud of that no one knows about is…",
    ],
  },
} as const

// 12-item ECR-S (Wei et al. 2007). Likert 1–7. Higher = more of that dimension.
// Items marked R are reverse-scored.
export const ecrS = [
  { id: 1, text: "It helps to turn to my partner in times of need.", dim: 'avoidance', reverse: true },
  { id: 2, text: 'I need a lot of reassurance that I am loved by my partner.', dim: 'anxiety', reverse: false },
  { id: 3, text: 'I want to get close to my partner, but I keep pulling back.', dim: 'avoidance', reverse: false },
  { id: 4, text: 'I find that my partner(s) don’t want to get as close as I would like.', dim: 'anxiety', reverse: false },
  { id: 5, text: 'I turn to my partner for many things, including comfort and reassurance.', dim: 'avoidance', reverse: true },
  { id: 6, text: 'My desire to be very close sometimes scares people away.', dim: 'anxiety', reverse: false },
  { id: 7, text: 'I try to avoid getting too close to my partner.', dim: 'avoidance', reverse: false },
  { id: 8, text: 'I do not often worry about being abandoned.', dim: 'anxiety', reverse: true },
  { id: 9, text: 'I usually discuss my problems and concerns with my partner.', dim: 'avoidance', reverse: true },
  { id: 10, text: 'I get frustrated if my partner is not available when I need them.', dim: 'anxiety', reverse: false },
  { id: 11, text: 'I am nervous when partners get too close to me.', dim: 'avoidance', reverse: false },
  { id: 12, text: 'I worry that partners won’t care about me as much as I care about them.', dim: 'anxiety', reverse: false },
] as const

// NVC feelings (when needs are met / not met) and universal needs
export const nvcFeelingsMet = [
  'engaged', 'curious', 'absorbed', 'alive', 'energetic', 'invigorated',
  'amazed', 'awed', 'inspired', 'wonder',
  'confident', 'safe', 'secure', 'open',
  'grateful', 'moved', 'touched', 'tender',
  'hopeful', 'optimistic', 'expectant',
  'joyful', 'amused', 'delighted', 'glad', 'pleased',
  'peaceful', 'calm', 'centered', 'relaxed', 'content',
  'refreshed', 'rested', 'restored',
]

export const nvcFeelingsUnmet = [
  'afraid', 'apprehensive', 'dread', 'panicked', 'scared', 'terrified', 'worried',
  'annoyed', 'frustrated', 'impatient', 'irritated',
  'angry', 'enraged', 'furious', 'incensed', 'resentful',
  'disconnected', 'alienated', 'aloof', 'detached', 'distant', 'numb',
  'embarrassed', 'ashamed', 'self-conscious', 'guilty',
  'fatigued', 'depleted', 'exhausted', 'tired', 'weary',
  'pain', 'agony', 'anguished', 'devastated', 'heartbroken', 'lonely',
  'sad', 'depressed', 'discouraged', 'disheartened', 'gloomy',
  'tense', 'anxious', 'distressed', 'edgy', 'overwhelmed', 'restless',
  'vulnerable', 'fragile', 'helpless', 'insecure',
  'yearning', 'longing', 'envious', 'jealous', 'nostalgic', 'pining',
]

export const nvcNeeds = [
  'connection', 'closeness', 'companionship', 'intimacy',
  'belonging', 'inclusion', 'community',
  'acceptance', 'appreciation', 'respect', 'to be seen', 'to matter', 'to be known',
  'autonomy', 'choice', 'freedom', 'independence', 'space',
  'safety', 'predictability', 'stability', 'security', 'protection',
  'trust', 'honesty', 'transparency', 'integrity',
  'understanding', 'empathy', 'to be heard', 'consideration',
  'support', 'help', 'partnership', 'cooperation',
  'rest', 'ease', 'comfort', 'play',
  'meaning', 'purpose', 'contribution', 'to be useful', 'creativity',
  'growth', 'learning', 'challenge',
  'beauty', 'order', 'harmony',
  'love', 'affection', 'warmth', 'tenderness',
]

// ACT values for card sort
export const valueWords = [
  'Acceptance', 'Adventure', 'Authenticity', 'Autonomy', 'Beauty', 'Belonging',
  'Care', 'Challenge', 'Compassion', 'Connection', 'Contribution', 'Cooperation',
  'Courage', 'Creativity', 'Curiosity', 'Dignity', 'Discipline', 'Diversity',
  'Equality', 'Excellence', 'Excitement', 'Faith', 'Family', 'Forgiveness',
  'Freedom', 'Friendship', 'Fun', 'Generosity', 'Gratitude', 'Growth',
  'Health', 'Honesty', 'Humor', 'Independence', 'Integrity', 'Intimacy',
  'Justice', 'Kindness', 'Knowledge', 'Leadership', 'Learning', 'Love',
  'Loyalty', 'Mastery', 'Nature', 'Order', 'Partnership', 'Patience',
  'Peace', 'Perseverance', 'Play', 'Power', 'Privacy', 'Recognition',
  'Reliability', 'Respect', 'Responsibility', 'Safety', 'Self-respect', 'Service',
  'Simplicity', 'Solitude', 'Spirituality', 'Stability', 'Tradition', 'Trust',
  'Understanding', 'Vitality', 'Wealth', 'Wisdom',
]

// Curated, tasteful Yes/No/Maybe list for Erotic Self station
// Skewed toward connection/intimacy invitations rather than acts.
export const yesNoMaybeItems = [
  { id: 'eye-contact', label: 'Sustained eye contact during sex' },
  { id: 'slow', label: 'Sex that is intentionally slow' },
  { id: 'morning', label: 'Morning intimacy' },
  { id: 'afternoon', label: 'Afternoon intimacy (no kids around)' },
  { id: 'planned', label: 'Planning a date specifically for intimacy' },
  { id: 'fully-clothed', label: 'Fully clothed making out' },
  { id: 'undressing', label: 'Undressing each other slowly' },
  { id: 'massage-give', label: 'Giving a non-sexual massage' },
  { id: 'massage-receive', label: 'Receiving a non-sexual massage' },
  { id: 'reading-aloud', label: 'Reading something erotic aloud together' },
  { id: 'shared-bath', label: 'A shared bath or shower' },
  { id: 'lights-on', label: 'Sex with the lights on' },
  { id: 'lights-off', label: 'Sex with the lights off' },
  { id: 'mirror', label: 'Watching ourselves in a mirror' },
  { id: 'spoken-desire', label: 'Telling each other what we want during sex' },
  { id: 'compliments', label: 'Spoken compliments about my body during sex' },
  { id: 'silence', label: 'Sex in mostly silence' },
  { id: 'music', label: 'Sex with music we both chose' },
  { id: 'extended-kissing', label: 'Long kissing sessions with no expectation of more' },
  { id: 'cuddling-after', label: 'Extended cuddling afterward' },
  { id: 'check-in', label: 'A spoken check-in halfway through' },
  { id: 'aftercare', label: 'A snack-and-talk afterward' },
  { id: 'getaway', label: 'An overnight getaway focused on us' },
  { id: 'fantasy-sharing', label: 'Sharing a fantasy out loud' },
  { id: 'role-play', label: 'Light role-play' },
  { id: 'toys', label: 'Introducing a toy together' },
  { id: 'reading-together', label: 'Reading a sex-positive book together' },
  { id: 'therapy', label: 'Going to a sex-positive therapist together' },
]

// Schumann's 8 elements of comprehensive apologies
export const apologyElements = [
  {
    id: 'naming',
    title: 'Specific naming of what I did',
    helper: 'Concrete behavior. Not "what happened" or "the situation." What I did.',
  },
  {
    id: 'impact',
    title: 'Acknowledgment of impact',
    helper: 'I see that you felt ___. (This is the element apologies most often skip.)',
  },
  {
    id: 'responsibility',
    title: 'Acceptance of responsibility',
    helper: 'No "but." No "you also." Just: this was mine.',
  },
  {
    id: 'cost',
    title: 'What you lost or had to carry',
    helper: 'The downstream effect on you. The thing you have been carrying since.',
  },
  {
    id: 'explanation',
    title: 'Explanation — not excuse',
    helper: 'What was happening in me. Not to defend, but so you understand.',
  },
  {
    id: 'change',
    title: 'What I will do differently — and how you will be able to tell',
    helper: 'A behavior, not a feeling. Specific enough to be verifiable.',
  },
  {
    id: 'request',
    title: 'What I am asking of you',
    helper: 'Maybe nothing. Maybe time. Maybe a conversation. Be honest about it.',
  },
  {
    id: 'repair',
    title: 'The repair offer',
    helper: 'A concrete thing I am offering — to you, or to us — to begin to make this right.',
  },
] as const

// Emotion granularity word menu — Russell circumplex (valence × arousal)
export const emotionGranularity = {
  highValenceHighArousal: ['ecstatic', 'elated', 'exhilarated', 'thrilled', 'euphoric', 'jubilant', 'invigorated', 'amazed'],
  highValenceLowArousal: ['content', 'serene', 'tender', 'cozy', 'calm', 'tranquil', 'satisfied', 'reverent'],
  lowValenceHighArousal: ['furious', 'panicked', 'enraged', 'terrified', 'anguished', 'mortified', 'frantic', 'incensed'],
  lowValenceLowArousal: ['despondent', 'numb', 'forlorn', 'depleted', 'hollow', 'resigned', 'morose', 'flat'],
  ambivalent: ['nostalgic', 'wistful', 'bittersweet', 'melancholy', 'pensive', 'restless', 'longing', 'unsettled'],
}

// Tone bands — Resonance station. Hz ranges with somatic descriptors. NO Solfeggio claims.
export const toneBands = [
  {
    id: 'low',
    hz: 80,
    label: 'Low — weight & ground',
    description: 'Felt as density, pressure, in-the-pelvis. Some people experience this as grounding, others as heavy or withdrawal-feeling.',
  },
  {
    id: 'mid-low',
    hz: 200,
    label: 'Mid-low — chest & voice',
    description: 'The lower range of human voice. Often felt in the chest. "In the body."',
  },
  {
    id: 'mid',
    hz: 500,
    label: 'Mid — social engagement range',
    description: 'The range of modulated human voice. Polyvagal prosody research suggests this preferentially activates the social engagement system.',
  },
  {
    id: 'higher',
    hz: 1200,
    label: 'Higher — alert & lift',
    description: 'Often experienced as activating, alert, sometimes anxious or overstimulating.',
  },
] as const

// What I See — ambiguous SVG stimuli (we'll generate a few; user picks one per session)
export const ambiguousShapeIds = ['shape-a', 'shape-b', 'shape-c'] as const

// IFS parts taxonomy
export const ifsParts = {
  manager: {
    label: 'Manager (the one in charge)',
    examples: 'controller / pleaser / inner critic / perfectionist / planner',
    role: 'Tries to keep things from going wrong. Anticipates threat.',
  },
  firefighter: {
    label: 'Firefighter (the one that puts out fires)',
    examples: 'withdrawer / numb-out / rage / shutdown / scrolling / distraction-seeker',
    role: 'Activates when something painful is breaking through. Stops the pain however it can.',
  },
  exile: {
    label: 'Exile (the young hurt one)',
    examples: 'the young me who was alone / not chosen / shamed / unsafe',
    role: 'Carries the original pain. Usually banished by the Managers and Firefighters because they think they\'re protecting it.',
  },
} as const

// Therapist / crisis resources — referenced from OffRamp
export const offRampResources = [
  {
    label: 'Lennox Fields — Tamara Walls, LPCA',
    detail: 'Couples and individual therapy in Kentucky. Neurodiversity-affirming.',
    href: '/contact',
    primary: true,
  },
  {
    label: 'Find an EFT therapist',
    detail: 'International Centre for Excellence in Emotionally Focused Therapy (ICEEFT) directory.',
    href: 'https://iceeft.com/find-a-therapist/',
    primary: false,
  },
  {
    label: 'Find a Gottman-trained therapist',
    detail: 'Gottman Institute referral network.',
    href: 'https://www.gottman.com/couples/private-therapy/',
    primary: false,
  },
  {
    label: 'Find an AASECT-certified sex therapist',
    detail: 'For erotic, sexual, or intimacy issues.',
    href: 'https://www.aasect.org/referral-directory',
    primary: false,
  },
  {
    label: 'Psychology Today — therapist directory',
    detail: 'Filter by location, insurance, and specialty.',
    href: 'https://www.psychologytoday.com/us/therapists',
    primary: false,
  },
  {
    label: '988 — Suicide & Crisis Lifeline',
    detail: 'Call or text 988. Free, confidential, 24/7.',
    href: 'tel:988',
    primary: false,
  },
  {
    label: 'National Domestic Violence Hotline',
    detail: '1-800-799-7233. Free, confidential, 24/7.',
    href: 'tel:18007997233',
    primary: false,
  },
]

// Source bibliography — every citation that appears anywhere in the Lab
export const bibliography = [
  { id: 'gottman-1999', cite: 'Gottman, J. M., & Silver, N. (1999). The Seven Principles for Making Marriage Work. Crown.' },
  { id: 'heyman-slep-2001', cite: 'Heyman, R. E., & Slep, A. M. S. (2001). The hazards of predicting divorce without crossvalidation. Journal of Marriage and Family, 63(2), 473–479.' },
  { id: 'johnson-2008', cite: 'Johnson, S. M. (2008). Hold Me Tight: Seven Conversations for a Lifetime of Love. Little, Brown.' },
  { id: 'makinen-johnson-2006', cite: 'Makinen, J. A., & Johnson, S. M. (2006). Resolving attachment injuries in couples using EFT: Steps toward a mini-theory of forgiveness. Journal of Marital and Family Therapy, 32(1), 55–77.' },
  { id: 'johnson-2013', cite: 'Johnson, S. M., Moser, M. B., Beckes, L., Smith, A., Dalgleish, T., Halchuk, R., et al. (2013). Soothing the threatened brain: Leveraging contact comfort with EFT. PLOS ONE, 8(11): e79314.' },
  { id: 'schwartz-2008', cite: "Schwartz, R. C. (2008). You Are the One You've Been Waiting For: Bringing Courageous Love to Intimate Relationships. Trailheads." },
  { id: 'rosenberg-2003', cite: 'Rosenberg, M. B. (2003). Nonviolent Communication: A Language of Life. PuddleDancer Press.' },
  { id: 'wei-2007', cite: 'Wei, M., Russell, D. W., Mallinckrodt, B., & Vogel, D. L. (2007). The Experiences in Close Relationship Scale (ECR)–Short Form. Journal of Personality Assessment, 88(2), 187–204.' },
  { id: 'aron-1997', cite: 'Aron, A., Melinat, E., Aron, E. N., Vallone, R. D., & Bator, R. J. (1997). The experimental generation of interpersonal closeness. Personality and Social Psychology Bulletin, 23(4), 363–377.' },
  { id: 'algoe-2012', cite: 'Algoe, S. B. (2012). Find, remind, and bind: The functions of gratitude in everyday relationships. Social and Personality Psychology Compass, 6(6), 455–469.' },
  { id: 'wade-2014', cite: 'Wade, N. G., Hoyt, W. T., Kidwell, J. E., & Worthington, E. L. (2014). Efficacy of psychotherapeutic interventions to promote forgiveness: A meta-analysis. Journal of Consulting and Clinical Psychology, 82(1), 154–170.' },
  { id: 'schumann-2018', cite: 'Schumann, K. (2018). The psychology of offering an apology: Understanding the barriers to apologizing and how to overcome them. Current Directions in Psychological Science, 27(2), 74–78.' },
  { id: 'schnarch-regas-2012', cite: 'Schnarch, D., & Regas, S. (2012). The Crucible Differentiation Scale: Assessing differentiation in human relationships. Journal of Marital and Family Therapy, 38(4), 639–652.' },
  { id: 'macneil-byers-2009', cite: 'MacNeil, S., & Byers, E. S. (2009). Role of sexual self-disclosure in the sexual satisfaction of long-term heterosexual couples. Journal of Sex Research, 46(1), 3–14.' },
  { id: 'nummenmaa-2014', cite: 'Nummenmaa, L., Glerean, E., Hari, R., & Hietanen, J. K. (2014). Bodily maps of emotions. PNAS, 111(2), 646–651.' },
  { id: 'khalsa-2018', cite: 'Khalsa, S. S., Adolphs, R., Cameron, O. G., Critchley, H. D., Davenport, P. W., Feinstein, J. S., et al. (2018). Interoception and mental health: A roadmap. Biological Psychiatry: Cognitive Neuroscience and Neuroimaging, 3(6), 501–513.' },
  { id: 'hayes-1999', cite: 'Hayes, S. C., Strosahl, K. D., & Wilson, K. G. (1999). Acceptance and Commitment Therapy. Guilford Press.' },
  { id: 'hershfield-2009', cite: 'Hershfield, H. E., Wimmer, G. E., & Knutson, B. (2009). Saving for the future self: Neural measures of future self-continuity predict temporal discounting. Social Cognitive and Affective Neuroscience, 4(1), 85–92.' },
  { id: 'kashdan-2015', cite: 'Kashdan, T. B., Barrett, L. F., & McKnight, P. E. (2015). Unpacking emotion differentiation: Transforming unpleasant experience by perceiving distinctions in negativity. Current Directions in Psychological Science, 24(1), 10–16.' },
  { id: 'gable-2004', cite: 'Gable, S. L., Reis, H. T., Impett, E. A., & Asher, E. R. (2004). What do you do when things go right? The intrapersonal and interpersonal benefits of sharing positive events. Journal of Personality and Social Psychology, 87(2), 228–245.' },
  { id: 'hannah-1997', cite: 'Hannah, M. T., Luquet, W., & Hendrix, H. (1997). Brief report: Imago Relationship Therapy outcomes. Journal of Imago Relationship Therapy, 2(2), 55–62.' },
  { id: 'elliott-2018', cite: 'Elliott, R., Bohart, A. C., Watson, J. C., & Murphy, D. (2018). Therapist empathy and client outcome: An updated meta-analysis. Psychotherapy, 55(4), 399–410.' },
  { id: 'porges-2011', cite: 'Porges, S. W. (2011). The Polyvagal Theory: Neurophysiological foundations of emotions, attachment, communication, and self-regulation. Norton.' },
  { id: 'grossman-2007', cite: 'Grossman, P., & Taylor, E. W. (2007). Toward understanding respiratory sinus arrhythmia: Relations to cardiac vagal tone, evolution, and biobehavioral functions. Biological Psychology, 74(2), 263–285.' },
  { id: 'wood-2003', cite: "Wood, J. M., Nezworski, M. T., Lilienfeld, S. O., & Garb, H. N. (2003). What's Wrong with the Rorschach? Jossey-Bass." },
  { id: 'mihura-2013', cite: 'Mihura, J. L., Meyer, G. J., Dumitrascu, N., & Bombel, G. (2013). The validity of individual Rorschach variables: Systematic reviews and meta-analyses of the Comprehensive System. Psychological Bulletin, 139(3), 548–605.' },
  { id: 'karan-2019', cite: 'Karan, A., Rosenthal, R., & Robbins, M. L. (2019). Meta-analytic evidence that we-talk predicts relationship and personal functioning in romantic couples. Journal of Social and Personal Relationships, 36(9), 2624–2651.' },
  { id: 'aicken-2025', cite: 'Aicken, C. R. H., Gabb, J., Di Martino, S., Witney, T., & Lucassen, M. F. G. (2025). A relationship-focused mobile application: Mixed-methods evaluation of the Paired app. JMIR mHealth and uHealth.' },
  { id: 'finkel-2013', cite: 'Finkel, E. J., Slotter, E. B., Luchies, L. B., Walton, G. M., & Gross, J. J. (2013). A brief intervention to promote conflict reappraisal preserves marital quality over time. Psychological Science, 24(8), 1595–1601.' },
]
