export type Project = {
  slug: string;
  title: string;
  number: string;
  tags: string[];
  summary: string;
  detail: string;
  tone: string;
};

export const projects: Project[] = [
  {
    slug: 'time-wrath',
    title: 'Time Wrath',
    number: 'PROJECT 01',
    tags: ['Performance', 'Acting'],
    summary: 'Acting / performance. Further production details are being verified.',
    detail: 'Confirmed role: acting / performance. Add the event, year, performance details and any available visual evidence.',
    tone: 'tone-lime',
  },
  {
    slug: 'hari-patang',
    title: 'Hari Patang',
    number: 'PROJECT 02',
    tags: ['Multiple roles', 'Production'],
    summary: 'Multiple roles confirmed at a broad level. Specific responsibilities need documenting.',
    detail: 'Confirmed at a broad level: multiple roles. Specify which roles you performed and gather evidence for each contribution.',
    tone: 'tone-coral',
  },
  {
    slug: 'the-mommy',
    title: 'The Mommy',
    number: 'PROJECT 03',
    tags: ['Multiple roles'],
    summary: 'Multiple roles confirmed at a broad level. Exact credits and evidence are being collected.',
    detail: 'Confirmed at a broad level: multiple roles. Verify the exact production, event, year and individual responsibilities.',
    tone: 'tone-blue',
  },
  {
    slug: 'ek-tha-raja',
    title: 'Ek Tha Raja',
    number: 'PROJECT 04',
    tags: ['Performance', 'Acting'],
    summary: 'Acting / performance. Event, year and supporting material still need confirmation.',
    detail: 'Confirmed role: acting / performance. Add the event, year, production synopsis and any available photographs or video.',
    tone: 'tone-pink',
  },
  {
    slug: 'knock-knock',
    title: 'Knock Knock',
    number: 'PROJECT 05',
    tags: ['Performance', 'Acting'],
    summary: 'Acting / performance. Production context and available evidence still need confirmation.',
    detail: 'Confirmed role: acting / performance. Verify the production context and collect any programme, script, images or recording.',
    tone: 'tone-cream',
  },
  {
    slug: 'ek-anokhi-bhasha',
    title: 'Ek Anokhi Bhasha',
    number: 'PROJECT 06',
    tags: ['Multiple roles', 'Creative work'],
    summary: 'Multiple roles confirmed at a broad level. Writing, acting or direction credits need clarification.',
    detail: 'Confirmed at a broad level: multiple roles. Identify the specific roles and collect supporting production material.',
    tone: 'tone-dark',
  },
];

export const categories = ['All work', 'Performance', 'Acting', 'Production', 'Multiple roles', 'Creative work'];
export const collectionChecklist = [
  'Photos or a short video excerpt',
  'Event or production name and year',
  'Exact role and responsibilities',
  'Poster, programme, script or synopsis if available',
  'A short note about your contribution',
];
