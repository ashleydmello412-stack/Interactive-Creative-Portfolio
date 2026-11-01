import { useMemo, useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { categories, collectionChecklist, projects } from '../data/projects';

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <Link href={`/work/${project.slug}`} className={`project-card project-card-${project.slug}`} data-testid={`link-project-${project.slug}`}>
      <div className={`project-top ${project.tone}`}>
        <div className="project-topline">
          <span className="mono">{project.number}</span>
          <span className="project-top-label">CREATIVE ARCHIVE</span>
        </div>
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
        </div>
        <span className="project-index-mark" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-body">
        <div className="project-role-label kicker">MY CONTRIBUTION</div>
        <div className="project-credit-list">{project.roles.map((role) => <span className="project-credit" key={role}>{role}</span>)}</div>
        <p>{project.summary}</p>
        {project.recognition?.[0] && <div className="project-recognition"><span>NOTABLE RESULT</span><strong>{project.recognition[0]}</strong></div>}
        <div className="project-card-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <div className="card-foot"><span className="text-link">Read project details <span aria-hidden="true">↗</span></span><span className="status">{project.period ?? 'Credits in progress'}</span></div>
      </div>
      <span className="sr-only">{`Project ${index + 1}: ${project.title}`}</span>
    </Link>
  );
}

export function HomePage() {
  return (
    <main id="main-content" className="main-content">
      <section className="wrap hero reveal" data-testid="section-home-hero">
        <div className="eyebrow">Psychology-led thinking × creative execution</div>
        <h1>I STUDY PEOPLE.<span>I TURN INSIGHT INTO IDEAS.</span></h1>
        <p className="intro">I want to bring psychology and creative practice together to build advertising that earns attention, creates emotion, persuades with purpose and stays in memory. It starts with understanding what a brand stands for — and the people it hopes to reach.</p>
        <div className="hero-bottom">
          <Link className="button" href="/work" data-testid="link-explore-work">Explore the work <ArrowDownRight size={17} aria-hidden="true" /></Link>
          <Link className="hero-secondary" href="/about" data-testid="link-home-about">A little about me <ArrowRight size={16} aria-hidden="true" /></Link>
          <span className="hero-meta">B.Sc. Psychology · Creative practice</span>
        </div>
        <div className="hero-sticker" aria-label="Brand, people, ideas">BRAND<br />PEOPLE<br />IDEAS</div>
      </section>

      <section className="wrap home-destinations section" aria-labelledby="home-destinations-title" data-testid="section-home-destinations">
        <div className="home-destinations-heading">
          <div>
            <div className="kicker">THE CREATIVE ARCHIVE / START HERE</div>
            <h2 id="home-destinations-title">Explore the different sides of my work.</h2>
          </div>
          <p>Psychology gives me questions. Creative practice gives me ways to explore them.</p>
        </div>

        <div className="home-destinations-grid">
          <Link href="/work" className="home-destination tone-lime" data-testid="home-destination-work">
            <span className="mono">01 / THE ARCHIVE</span>
            <div className="home-destination-title"><h3>Work</h3><ArrowUpRight size={24} aria-hidden="true" /></div>
            <p>Theatre, performance and production projects, with roles and details kept to what can be verified.</p>
            <span className="home-destination-cta">Explore projects <span aria-hidden="true">↗</span></span>
          </Link>

          <Link href="/thinking" className="home-destination tone-coral" data-testid="home-destination-thinking">
            <span className="mono">02 / THE THINKING</span>
            <div className="home-destination-title"><h3>Psychology</h3><ArrowUpRight size={24} aria-hidden="true" /></div>
            <p>How I bring attention, emotion, persuasion and memory into a brand-first approach to advertising.</p>
            <span className="home-destination-cta">Explore the research <span aria-hidden="true">↗</span></span>
          </Link>

          <Link href="/about" className="home-destination tone-blue" data-testid="home-destination-about">
            <span className="mono">03 / THE PERSON</span>
            <div className="home-destination-title"><h3>About</h3><ArrowUpRight size={24} aria-hidden="true" /></div>
            <p>The psychology behind my thinking, and the theatre and production experience that shapes how I tell stories.</p>
            <span className="home-destination-cta">Get to know me <span aria-hidden="true">↗</span></span>
          </Link>

          <Link href="/contact" className="home-destination tone-dark" data-testid="home-destination-contact">
            <span className="mono">04 / THE NEXT THING</span>
            <div className="home-destination-title"><h3>Contact</h3><ArrowUpRight size={24} aria-hidden="true" /></div>
            <p>For conversations around creative advertising, consumer insights and production opportunities.</p>
            <span className="home-destination-cta">Start a conversation <span aria-hidden="true">↗</span></span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export function WorkPage() {
  const [filter, setFilter] = useState('All work');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => projects.filter((project) => {
    const categoryMatch = filter === 'All work' || project.tags.includes(filter);
    const searchableText = [
      project.title,
      project.period ?? '',
      project.tags.join(' '),
      project.roles.join(' '),
      project.summary,
      project.detail,
      project.recognition?.join(' ') ?? '',
    ].join(' ');
    const queryMatch = searchableText.toLowerCase().includes(query.toLowerCase().trim());
    return categoryMatch && queryMatch;
  }), [filter, query]);
  return (
    <main className="main-content wrap" id="main-content">
      <header className="page-intro work-intro">
        <div className="kicker">CREATIVE ARCHIVE / SELECTED WORK</div>
        <h1 className="page-title">A closer look at the work.</h1>
        <p>A collection of performance and production projects, with the roles, contributions and materials documented as they are verified.</p>
        <div className="work-intro-meta">
          <span><strong>06</strong> PROJECTS</span>
          <span>PERFORMANCE · PRODUCTION · CREATIVE PRACTICE</span>
        </div>
      </header>
      <div className="archive-toolbar" data-testid="work-toolbar">
        <label className="search-wrap">
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the archive" aria-label="Search projects" data-testid="input-project-search" />
        </label>
        <div className="filter-list" role="group" aria-label="Filter projects">
          {categories.map((category) => <button key={category} type="button" className="filter-button" aria-pressed={filter === category} onClick={() => setFilter(category)} data-testid={`filter-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}
        </div>
      </div>
      <p className="status" aria-live="polite" data-testid="text-project-count">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'} shown</p>
      {filtered.length ? <div className="project-grid" data-testid="grid-projects">{filtered.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div> : <div className="empty-results" data-testid="empty-project-results"><strong>No projects match that search.</strong><p style={{ margin: '8px 0 0' }}>Try a different word or clear the filters.</p><button className="button" type="button" onClick={() => { setFilter('All work'); setQuery(''); }} data-testid="button-clear-filters" style={{ marginTop: 16 }}>Clear filters</button></div>}
    </main>
  );
}

export function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) return <main className="wrap not-found" id="main-content"><div className="kicker">ARCHIVE / NOT FOUND</div><h1>This project isn't in the archive.</h1><Link href="/work" className="button" data-testid="link-back-to-archive">Back to the archive <ArrowLeft size={16} /></Link></main>;
  return (
    <main className="wrap main-content" id="main-content" data-testid={`project-detail-${project.slug}`}>
      <Link href="/work" className="back-link" data-testid="link-back-work"><ArrowLeft size={16} /> Back to all work</Link>
      <section className={`detail-hero ${project.tone}`}>
        <div className="detail-hero-meta"><span className="mono">{project.number}</span><span className="mono">{project.period ?? 'PROJECT NOTES'}</span></div>
        <h1>{project.title}</h1>
        <div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      </section>
      <section className="detail-layout">
        <div className="detail-main">
          <section className="detail-section">
            <div className="kicker">01 / PROJECT OVERVIEW</div>
            <p className="detail-lead">{project.summary}</p>
            <p>{project.detail}</p>
          </section>
          <section className="detail-section">
            <div className="kicker">02 / MY CONTRIBUTION</div>
            <div className="detail-roles">{project.roles.map((role) => <span className="detail-role" key={role}>{role}</span>)}</div>
          </section>
          <section className="detail-section">
            <div className="kicker">03 / RECOGNITION &amp; OUTCOMES</div>
            {project.recognition?.length ? (
              <ul className="recognition-list">{project.recognition.map((item) => <li key={item}>{item}</li>)}</ul>
            ) : (
              <p className="detail-muted">No competition results or outcomes have been added to this project entry yet.</p>
            )}
          </section>
          {project.slug === 'hari-patang' && (
            <section className="detail-section hari-patang-insight">
              <div className="kicker">04 / A CREATIVE CHOICE</div>
              <p className="detail-lead">Turn an explanation into a moment of audience discovery.</p>
              <p>One interactive element in <em>Hari Patang</em> invited the audience to recognise the difference between the recycling symbol and the resin identification symbol used on plastics. Rather than leaving the distinction as information delivered from the stage, the performance made space for the audience to engage with it.</p>
              <p>This reflects the kind of communication I want to create: ideas that give people something to notice, think about and take away. In advertising, that could mean turning a product truth or social message into an experience the audience actively connects with.</p>
            </section>
          )}
        </div>
        <aside className="detail-aside">
          <div className="kicker">PROJECT NOTES / TO COMPLETE</div>
          <h2>Build out this entry</h2>
          <p className="detail-aside-copy">The next useful details are about the work itself and your contribution.</p>
          <ul className="checklist">{collectionChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
        </aside>
      </section>
    </main>
  );
}

export function ThinkingPage() {
  const lenses = [
    { number: '01', title: 'Attention', copy: 'What makes someone notice, pause or look twice?' },
    { number: '02', title: 'Emotion', copy: 'What feeling does the idea create, and why might it matter to the audience?' },
    { number: '03', title: 'Persuasion', copy: 'What gives the message relevance, credibility and a reason to act?' },
    { number: '04', title: 'Memory', copy: 'What makes the idea distinctive enough to stay with someone?' },
  ];
  const methods = ['Psychological research', 'Consumer research', 'Social & cultural psychology', 'Creative experimentation'];
  return <main className="wrap main-content" id="main-content" data-testid="page-thinking">
    <header className="page-intro thinking-intro">
      <div className="kicker">02 / THE THINKING</div>
      <h1 className="page-title">Start with the brand. Understand the people. Then make the idea.</h1>
      <p>I see psychology as a way to make creative decisions more informed — not as a formula to make every campaign look or sound the same.</p>
    </header>

    <section className="thinking-principle">
      <div className="kicker">MY STARTING POINT</div>
      <p className="thinking-principle-lead">Before I think about an advertisement, I want to understand what the brand stands for — and what it needs the campaign to achieve.</p>
      <p>That objective shapes the approach. A brand may need to build awareness, change a perception, create a new association or strengthen an existing one. I don't believe one creative formula should be applied to all of them.</p>
    </section>

    <section className="section thinking-lenses" aria-labelledby="lenses-title">
      <div className="section-head">
        <div><div className="kicker">THE HUMAN RESPONSE</div><h2 id="lenses-title">Four questions I keep coming back to.</h2></div>
        <p className="section-note">The psychological lenses I want to bring into the development of an idea.</p>
      </div>
      <div className="thinking-lens-grid">
        {lenses.map((lens) => <article className="thinking-lens" key={lens.number}>
          <span className="mono">{lens.number} / LENS</span>
          <h3>{lens.title}</h3>
          <p>{lens.copy}</p>
        </article>)}
      </div>
    </section>

    <section className="thinking-method section" aria-labelledby="method-title">
      <div className="kicker">HOW I WANT TO WORK</div>
      <h2 id="method-title">From brand meaning to creative execution.</h2>
      <div className="thinking-steps">
        <article><span>01</span><div><h3>Understand the brand</h3><p>Its identity, values, promise, audience and the objective of the campaign.</p></div></article>
        <article><span>02</span><div><h3>Understand the audience</h3><p>Their needs, motivations, habits, social context and relationship with the category.</p></div></article>
        <article><span>03</span><div><h3>Find the human insight</h3><p>Use research and psychological thinking to identify a tension, behaviour or feeling worth building around.</p></div></article>
        <article><span>04</span><div><h3>Build the creative idea</h3><p>Translate the insight into a concept, script, story, visual device or participatory experience that fits the brand.</p></div></article>
        <article><span>05</span><div><h3>Experiment and refine</h3><p>Explore different executions and test whether they serve the campaign objective and connect with the intended audience.</p></div></article>
      </div>
      <div className="thinking-methods">
        <div className="kicker">TOOLS I WANT TO BRING TO THE PROCESS</div>
        <div className="skills">{methods.map((method) => <span key={method}>{method}</span>)}</div>
      </div>
    </section>

    <section className="thinking-references section">
      <div className="section-head">
        <div><div className="kicker">CREATIVE REFERENCES</div><h2>Ideas that understand their audience.</h2></div>
        <p className="section-note">Work I return to for its clarity, cultural relevance and ability to make a brand memorable.</p>
      </div>
      <div className="reference-grid">
        <article><span className="mono">HUMOUR / PRODUCT TRUTH</span><h3>Fevicol advertising</h3><p>Turning a simple product promise into a memorable visual idea, often through exaggeration and humour.</p></article>
        <article><span className="mono">CULTURE / TOPICALITY</span><h3>Amul topical campaigns</h3><p>Using current context, shared references and concise wit to create a sense of collective recognition.</p></article>
        <article><span className="mono">BRAND / EVERYDAY LANGUAGE</span><h3>“Thanda Matlab Coca-Cola”</h3><p>Making a brand association feel familiar by connecting it to an everyday expression and cultural context.</p></article>
      </div>
    </section>

    <section className="thinking-card">
      <div className="mono">ACADEMIC WORK / CONSUMER BEHAVIOUR</div>
      <h2>Greenwashing &amp; consumer behaviour</h2>
      <p>A coursework project involving data collection and analysis on greenwashing awareness and consumer behaviour. The original research question, method and findings will be written up once the assignment is reviewed.</p>
      <div className="thinking-footnote"><strong>Research details are being checked.</strong><br />No findings or conclusions are being claimed on this page yet.</div>
    </section>
  </main>;
}

export function AboutPage() {
  const skills = ['Psychology', 'Consumer behaviour', 'Storytelling', 'Acting', 'Direction', 'Scriptwriting', 'Adobe Premiere Pro', 'Adobe Audition', 'After Effects'];
  return <main className="wrap main-content" id="main-content" data-testid="page-about">
    <header className="page-intro about-intro">
      <div className="kicker">03 / ABOUT</div>
      <h1 className="page-title">Psychology shapes my thinking. Creative practice shapes how I tell stories.</h1>
      <p>I'm interested in using an understanding of people to develop advertising that feels relevant, emotionally resonant and worth remembering.</p>
    </header>

    <section className="about-positioning">
      <div className="about-positioning-label kicker">THE THROUGH-LINE</div>
      <p>I want to connect the study of human behaviour with the craft of creative communication — from the first insight to the final execution.</p>
    </section>

    <section className="about-layout section">
      <div className="about-block"><div className="kicker">PSYCHOLOGY × CREATIVITY</div><h2>Understand people. Give ideas a form.</h2></div>
      <div className="about-story">
        <p className="about-copy">I'm a third-year B.Sc. Psychology student interested in consumer behaviour, advertising and the ways people respond to stories, symbols and shared cultural references.</p>
        <p>My starting point is the brand: what it stands for, what it wants to communicate and what it needs to achieve. From there, I want to understand the people it is speaking to — what catches their attention, moves them emotionally, persuades them and stays in their memory.</p>
        <p>My experience in theatre gives me a practical foundation for thinking about how an idea reaches an audience. Through acting, direction and scriptwriting, I've worked with dialogue, timing, satire and audience engagement. I've also explored breaking the fourth wall and involving spectators in a performance, alongside theatrical influences such as Poor Theatre and the Theatre of Cruelty.</p>
        <p>I'm interested in carrying that experience into advertising: developing the thinking behind a campaign and understanding how it can become a script, a story, a performance or a wider brand experience.</p>
      </div>
    </section>

    <section className="about-theatre section">
      <div className="section-head">
        <div><div className="kicker">WHAT THEATRE HAS TAUGHT ME</div><h2>An audience is part of the experience.</h2></div>
        <p className="section-note">My creative background has made me attentive to how people receive, interpret and participate in a story.</p>
      </div>
      <div className="about-theatre-grid">
        <article><span className="mono">01 / ENGAGEMENT</span><h3>Break the fourth wall</h3><p>Addressing the audience directly and challenging the boundary between performer and spectator.</p></article>
        <article><span className="mono">02 / PARTICIPATION</span><h3>Bring people into the scene</h3><p>Creating moments where spectators do more than watch — they become part of the communication.</p></article>
        <article><span className="mono">03 / VOICE</span><h3>Use satire and dialogue</h3><p>Using humour, irony and social observation to make an idea land with an audience.</p></article>
      </div>
    </section>

    <section className="about-tools">
      <div className="kicker">TOOLS &amp; AREAS OF INTEREST</div>
      <div className="skills" data-testid="list-skills">{skills.map((skill) => <span key={skill} data-testid={`skill-${skill.toLowerCase().replaceAll(' ', '-')}`}>{skill}</span>)}</div>
    </section>
  </main>;
}

export function ContactPage() {
  return <main className="wrap main-content" id="main-content" data-testid="page-contact">
    <section className="contact-panel">
      <div><div className="kicker">04 / CONTACT</div><h1>Have a project in mind?</h1><p>I'm interested in creative advertising, consumer insights and production opportunities.</p></div>
      <div><span className="disabled-contact" aria-disabled="true" data-testid="status-email-unavailable">Add email address to activate <span aria-hidden="true">↗</span></span><p className="contact-note">Replace this prompt with your preferred contact link before publishing.</p></div>
    </section>
  </main>;
}

export function NotFoundPage() {
  return <main className="wrap not-found" id="main-content" data-testid="page-not-found"><div className="kicker">404 / OUT OF FRAME</div><h1>That page isn't in this archive.</h1><Link href="/" className="button" data-testid="link-home-from-404">Back to the archive <ArrowRight size={16} /></Link></main>;
}
