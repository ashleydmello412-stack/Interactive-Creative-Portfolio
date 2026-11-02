export type Project = {
  slug: string;
  title: string;
  number: string;
  period?: string;
  tags: string[];
  roles: string[];
  summary: string;
  detail: string;
  practiceNote?: {
    title: string;
    body: string;
  };
  caseStudy?: {
    premise: string;
    scenes: { title: string; description: string }[];
    contribution: string;
    reflection: string;
  };
  recognition?: string[];
  tone: string;
};

export const projects: Project[] = [
  {
    slug: 'time-wrath',
    title: 'Time Wrath',
    number: 'PROJECT 01',
    period: '2024–2025',
    tags: ['Performance', 'Acting'],
    roles: ['Lead performer'],
    summary: 'A mime adventure following two treasure-seeking travellers across the world by ship — from an encounter at their destination to betrayal and a final trap.',
    detail: 'Two adventurers travel by ship in search of a treasure. At their destination, they encounter the Indigenous people of the place. During the encounter, Ashley’s character is betrayed by the other adventurer; the other adventurer eventually reaches the destination, only to end up trapped in a cell-like enclosure. This account follows the plot as currently recalled, with staging and transitions to be checked against the performance footage.',
    practiceNote: {
      title: 'A journey told through physical storytelling',
      body: 'The story moves through distinct changes in place and relationship: a voyage, an encounter, a betrayal and an ending built around confinement. As a mime performance, those shifts depend on physical action and the performers’ interaction to make the plot legible without dialogue. The precise gestures, transitions and stage pictures will be documented after reviewing the video.',
    },
    recognition: [
      '1st place — Darpan ’24',
      '1st place — Mood Indigo ’24',
      '1st place — VIT',
      '2nd place — Enact',
    ],
    tone: 'tone-lime',
  },
  {
    slug: 'hari-patang',
    title: 'Hari Patang',
    number: 'PROJECT 02',
    period: '2025–2026',
    tags: ['Street Play', 'Greenwashing', 'Acting', 'Direction', 'Scriptwriting'],
    roles: ['Acting — Red Light and Dhritrashtra', 'Direction', 'Scriptwriting', 'Presented the consumer-tools solution segment'],
    summary: 'A street play about greenwashing: how environmental claims shape consumer choices, how misleading claims go unnoticed, and how people can respond.',
    detail: 'Hari Patang uses a comic, satirical street-play format to unpack the gap between the language of sustainability and the evidence behind it. The story moves from a marketplace full of competing “green” promises to a media sequence, a Dhritrashtra allegory about selective blindness, and a final set of practical responses.',
    caseStudy: {
      premise: 'How do people distinguish genuine environmental responsibility from marketing that simply sounds sustainable? Hari Patang turns that question into a public-facing performance, using familiar settings, humour, music, audience call-and-response and a mythological reference to make greenwashing easier to recognise.',
      scenes: [
        { title: '01 / The green pitch', description: 'The opening uses a traffic-light formation and a mock promotional pitch to introduce the language of cleanliness, green choices and environmental responsibility. The sudden coupon offer adds a deliberately commercial twist to the promise of going green.' },
        { title: '02 / The marketplace', description: 'A confused customer is pulled between “green” and non-green groups while trying to make ordinary purchases. The scene uses crowd movement, banter and a comic “all is well” refrain to show how sustainability labels can make choices feel reassuring without explaining what is actually different.' },
        { title: '03 / The news desk', description: 'A reporter sequence uses jokes, wordplay and familiar cultural references to question how environmental stories and claims are covered — and what goes unexamined when the media does not give them attention.' },
        { title: '04 / The blindfold', description: 'The play shifts into a timeline and a Dhritrashtra sequence. Blindfolds become a visual metaphor for failing to notice the gap between sustainability promises and evidence, before the characters confront examples of vague claims, unsupported labels and distant targets.' },
        { title: '05 / The way forward', description: 'The closing kite sequence moves from exposing the problem to practical responses: using consumer-facing information tools, demanding laws and transparency, building eco-literacy and scanning a QR code for further information.' },
      ],
      contribution: 'I worked across acting, direction and scriptwriting. In the performance, I played the Red Light in the opening and Dhritrashtra in the fourth scene. I also presented the first solution segment, introducing consumer-facing tools. The script places these roles within a larger structure that moves from satire and confusion towards awareness and action.',
      reflection: 'The project brought together several ways of communicating with a live audience: character, humour, rhythm, familiar references, visual formations and direct address. It also made me think about how to move an audience from recognising a problem to having something practical to do next. That is a structure I would like to carry into campaign development: establish the tension, make the message understandable, and give people a clear next step.',
    },
    recognition: [
      '1st place — Darpan',
      '2nd place — Mood Indigo prelims',
    ],
    tone: 'tone-coral',
  },
  {
    slug: 'the-mommy',
    title: 'The Mommy',
    number: 'PROJECT 03',
    tags: ['Multiple roles'],
    roles: ['Multiple roles — exact credits being documented'],
    summary: 'A performance project with multiple contributions; individual responsibilities are still being mapped.',
    detail: 'Multiple roles are confirmed at a broad level. The exact production context, responsibilities and individual credits still need to be documented before this page can describe them accurately.',
    tone: 'tone-blue',
  },
  {
    slug: 'ek-tha-raja',
    title: 'Ek Tha Raja',
    number: 'PROJECT 04',
    period: '2025–2026',
    tags: ['Performance', 'Acting', 'Production'],
    roles: ['Acting', 'Lights handling'],
    summary: 'A production where I contributed as a performer and also worked on lights.',
    detail: 'My confirmed contributions included acting and lights handling. The performance placements and technical participation are listed separately below.',
    practiceNote: {
      title: 'Seeing a production from two sides',
      body: 'Working as both a performer and a lights handler meant contributing onstage as well as from the technical side of a production. That combination has helped me value not only the performance itself, but also the coordination that supports what an audience finally experiences.',
    },
    recognition: [
      '1st place — Unmaad',
      '2nd place — Darpan (acting)',
      '2nd place — VIT (acting)',
      'Participated at Waves — lights handling',
    ],
    tone: 'tone-pink',
  },
  {
    slug: 'knock-knock',
    title: 'Knock Knock',
    number: 'PROJECT 05',
    period: '2025–2026',
    tags: ['Performance', 'Acting'],
    roles: ['Acting — short film'],
    summary: 'A short film in which I contributed as an actor.',
    detail: 'My confirmed contribution to Knock Knock was acting in the short film. Further production details can be added when the project credits and context are documented.',
    recognition: [
      '1st place — Darpan',
    ],
    tone: 'tone-cream',
  },
  {
    slug: 'ek-anokhi-bhasha',
    title: 'Ek Anokhi Bhasha',
    number: 'PROJECT 06',
    tags: ['Performance', 'Acting', 'Street Play', 'Language & Identity', 'Creative work'],
    roles: ['Street Play Sub-Head', 'Ensemble performance across the play', 'Acting — Netaji (Scene 1)'],
    summary: 'A multilingual street play about language, identity and belonging — and what happens when difference becomes a reason to exclude.',
    detail: 'Through political satire, a classroom debate and a weighing-scale sequence, the play moves from everyday language prejudice to its human consequences — then towards realisation, acceptance and action.',
    caseStudy: {
      premise: 'What happens when language becomes a test of who belongs? The play traces that question from everyday prejudice to its human consequences, then turns towards understanding across difference.',
      scenes: [
        {
          title: '01 / The language of power',
          description: 'A media interview exposes the gap between public claims and actions. When the reporters cannot understand the leader’s language, the test is turned back on them — a comic reversal that questions who gets to define cultural loyalty.',
        },
        {
          title: '02 / The classroom',
          description: 'A classroom debate about accents and the idea of a national language leads into a rewritten pledge. Each added condition shows how easily shared belonging can be narrowed by linguistic identity.',
        },
        {
          title: '03 / The weighing scale',
          description: 'A kabadiwala’s weighing machine becomes “the weight of the nation”. News-like incidents escalate from jokes to discrimination and tragedy, while “Saare Jahan Se Achha” shifts from a familiar refrain to an uneasy counterpoint.',
        },
        {
          title: '04 / Ek Anokhi Bhasha',
          description: 'The final sequence moves from one to realisation, uniqueness to acceptance, and language to action. The multilingual greeting and “Aeiiioa” return to close the play on connection.',
        },
      ],
      contribution: 'Street Play Sub-Head; supported coordination and management wherever needed. Performed across the production as part of the ensemble, with a named credit as Netaji in Scene 1.',
      reflection: 'The play’s progression — from exaggerated comedy to a painful human consequence, then towards a collective response — shows how street theatre can make a social issue felt as well as discussed. The weighing scale, recurring refrain, multilingual greetings and shared invented sound give the audience recurring images and sounds to follow. The closing sequence turns the argument into a simple progression: realisation, acceptance and action.',
    },
    recognition: [
      '1st place — Blossoms ’26 (pre-finals)',
    ],
    tone: 'tone-dark',
  },

];

export const categories = ['All work', 'Performance', 'Acting', 'Production', 'Multiple roles', 'Creative work'];
export const collectionChecklist = [
  'Confirm the production or event name and year',
  'Write a concise synopsis of the work',
  'Clarify the exact role and responsibilities',
  'Document the creative process and key decisions',
  'Add collaborator and credit information',
  'Record the outcome or key learning',
];
