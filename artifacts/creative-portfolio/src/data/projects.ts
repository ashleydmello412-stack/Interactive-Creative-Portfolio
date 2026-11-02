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
    summary: 'A mime performance in which I played one of the lead roles.',
    detail: 'Time Wrath was an early mime performance and one of the first major projects in my theatre journey. My confirmed contribution was as a lead performer.',
    practiceNote: {
      title: 'Making meaning without dialogue',
      body: 'Mime relies on the audience reading physical expression, movement and timing rather than spoken explanation. Performing in this form made visual communication central to the work. It is a useful perspective to carry into advertising, where an idea may need to be understood before a single line is read.',
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
    tags: ['Multiple roles', 'Creative work'],
    roles: ['Multiple roles — exact credits being documented'],
    summary: 'A creative project involving multiple roles; specific responsibilities still need clarification.',
    detail: 'Multiple roles are confirmed at a broad level. The specific writing, performance, direction or production responsibilities need to be identified before they are listed as individual credits.',
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
