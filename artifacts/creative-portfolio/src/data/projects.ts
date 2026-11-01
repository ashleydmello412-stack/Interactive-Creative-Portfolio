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
    tags: ['Multiple roles', 'Production'],
    roles: ['Acting', 'Direction', 'Scriptwriting'],
    summary: 'A theatre project where I worked across acting, direction and scriptwriting.',
    detail: 'My confirmed contributions to Hari Patang included performing, directing and scripting. The project gave me experience across both the performance and development sides of a production.',
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
