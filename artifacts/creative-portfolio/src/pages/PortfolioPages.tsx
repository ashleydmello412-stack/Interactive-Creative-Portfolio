import { useMemo, useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { categories, collectionChecklist, projects } from '../data/projects';

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <Link href={`/work/${project.slug}`} className="project-card" data-testid={`link-project-${project.slug}`}>
      <div className={`project-top ${project.tone}`}>
        <span className="mono">{project.number}</span>
        <h3>{project.title}</h3>
      </div>
      <div className="project-body">
        <div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <p>{project.summary}</p>
        <div className="card-foot"><span className="text-link">View project checklist <span aria-hidden="true">↗</span></span><span className="status">In progress</span></div>
      </div>
      <span className="sr-only">{`Project ${index + 1}: ${project.title}`}</span>
    </Link>
  );
}

export function HomePage() {
  return (
    <main id="main-content" className="main-content">
      <section className="wrap hero reveal" data-testid="section-home-hero">
        <div className="eyebrow">Psychology × storytelling × production</div>
        <h1>I STUDY PEOPLE.<span>I MAKE IDEAS MOVE.</span></h1>
        <p className="intro">I'm interested in why people think, feel and choose — and how creative work can turn an idea into something people can see, hear and remember.</p>
        <div className="hero-bottom">
          <Link className="button" href="/work" data-testid="link-explore-work">Explore the work <ArrowDownRight size={17} aria-hidden="true" /></Link>
          <Link className="hero-secondary" href="/about" data-testid="link-home-about">A little about me <ArrowRight size={16} aria-hidden="true" /></Link>
          <span className="hero-meta">B.Sc. Psychology · Creative practice</span>
        </div>
        <div className="hero-sticker" aria-label="Think, make, move">THINK<br />MAKE<br />MOVE</div>
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
            <p>Coursework and research connected to consumer behaviour, perception and the questions behind decisions.</p>
            <span className="home-destination-cta">Explore the research <span aria-hidden="true">↗</span></span>
          </Link>

          <Link href="/about" className="home-destination tone-blue" data-testid="home-destination-about">
            <span className="mono">03 / THE PERSON</span>
            <div className="home-destination-title"><h3>About</h3><ArrowUpRight size={24} aria-hidden="true" /></div>
            <p>The interests, tools and experiences shaping a creative practice across psychology and storytelling.</p>
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
    const queryMatch = `${project.title} ${project.tags.join(' ')} ${project.summary}`.toLowerCase().includes(query.toLowerCase().trim());
    return categoryMatch && queryMatch;
  }), [filter, query]);
  return (
    <main className="main-content wrap" id="main-content">
      <header className="page-intro">
        <div className="kicker">THE ARCHIVE / 06 PROJECTS</div>
        <h1 className="page-title">Work, in progress.</h1>
        <p>Performance and production projects. Some details and supporting material are still being collected; open a card to see what needs to be added.</p>
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
      <section className={`detail-hero ${project.tone}`}><span className="mono">{project.number} / IN PROGRESS</span><h1>{project.title}</h1><div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></section>
      <section className="detail-layout">
        <div className="detail-copy"><div className="kicker">CURRENTLY VERIFIED</div><p>{project.summary}</p><p>{project.detail}</p><p>Only add details you can verify. You can publish a simple project card while you continue collecting evidence.</p></div>
        <aside className="detail-aside"><div className="kicker">PROJECT NOTES / TO COLLECT</div><h2>Look for</h2><ul className="checklist">{collectionChecklist.map((item) => <li key={item}>{item}</li>)}</ul></aside>
      </section>
    </main>
  );
}

export function ThinkingPage() {
  return <main className="wrap main-content" id="main-content" data-testid="page-thinking">
    <header className="page-intro"><div className="kicker">02 / HOW I THINK</div><h1 className="page-title">Curiosity, with a question mark.</h1><p>Research and coursework that may inform future creative strategy and consumer-insight projects.</p></header>
    <section className="thinking-card"><div className="mono">RESEARCH PROJECT / ACADEMIC WORK · DETAILS TO ADD</div><h2>Greenwashing &amp; consumer behaviour</h2><p>A coursework project involving data collection and analysis on greenwashing awareness and consumer behaviour. The research question, methods, findings and visuals will be added after checking the original assignment.</p>
      <div className="thinking-footnote"><strong>Still checking the source.</strong><br />Research question, methods, findings and visuals are not published until the original assignment has been checked.</div>
    </section>
    <section className="section"><div className="kicker">A NOTE ON THE ARCHIVE</div><h2>Accuracy before polish.</h2><p className="section-note" style={{ marginTop: 14 }}>This space is for coursework that may inform future creative strategy and consumer-insight projects. The project details will be added after checking the original assignment.</p></section>
  </main>;
}

export function AboutPage() {
  const skills = ['Psychology', 'Storytelling', 'Performance', 'Scriptwriting', 'Adobe Premiere Pro', 'Adobe Audition', 'After Effects'];
  return <main className="wrap main-content" id="main-content" data-testid="page-about">
    <header className="page-intro"><div className="kicker">03 / ABOUT</div><h1 className="page-title">A practice still taking shape.</h1></header>
    <section className="about-layout section" style={{ paddingTop: 20 }}>
      <div className="about-block"><div className="kicker">THE THROUGH-LINE</div><h2>Curious about people. Serious about ideas.</h2></div>
      <div><p className="about-copy">I'm a third-year B.Sc. Psychology student interested in the intersection of consumer behaviour, advertising, performance and audiovisual storytelling.</p><p>My experience includes theatre and performance projects, and I'm building my practice in creative strategy, scriptwriting, directing, editing and sound design. This portfolio documents work I've done and the creative skills I'm developing.</p>
        <div className="kicker" style={{ marginTop: 27 }}>TOOLS &amp; INTERESTS</div><div className="skills" data-testid="list-skills">{skills.map((skill) => <span key={skill} data-testid={`skill-${skill.toLowerCase().replaceAll(' ', '-')}`}>{skill}</span>)}</div>
        <p className="status" style={{ marginTop: 20 }}>Project roles and descriptions will be expanded as original materials and credits are verified.</p>
      </div>
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
