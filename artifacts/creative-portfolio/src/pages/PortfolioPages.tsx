import { useMemo, useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowDownRight, ArrowLeft, ArrowRight, Search } from 'lucide-react';
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
  const skills = ['Psychology', 'Storytelling', 'Performance', 'Scriptwriting', 'Adobe Premiere Pro', 'Adobe Audition', 'After Effects'];
  return (
    <main id="main-content" className="main-content">
      <section className="wrap hero reveal" data-testid="section-home-hero">
        <div className="eyebrow">Psychology × storytelling × production</div>
        <h1>I STUDY PEOPLE.<span>I MAKE IDEAS MOVE.</span></h1>
        <p className="intro">A growing archive of performance, creative production and psychology-led thinking. I'm interested in how people respond to stories — and how ideas become something people can see, hear and remember.</p>
        <div className="hero-bottom">
          <Link className="button" href="/work" data-testid="link-explore-work">Explore selected work <ArrowDownRight size={17} aria-hidden="true" /></Link>
          <span className="hero-meta">B.Sc. Psychology · Creative practice</span>
        </div>
        <div className="hero-sticker" aria-label="Ideas in progress">IDEAS<br />IN<br />PROGRESS</div>
      </section>
      <nav className="wrap home-section-nav" aria-label="Homepage sections" data-testid="navigation-home-sections">
        <a href="#about-me" data-testid="link-home-about">About Me <span aria-hidden="true">↘</span></a>
        <a href="#spec-campaigns" data-testid="link-home-campaigns">Spec Campaigns <span aria-hidden="true">↘</span></a>
        <a href="#my-work" data-testid="link-home-work">My Work <span aria-hidden="true">↘</span></a>
      </nav>
      <section className="wrap section home-about-section" id="about-me" aria-labelledby="about-me-title" data-testid="section-about-me">
        <div className="about-layout">
          <div className="about-block"><div className="kicker">01 / About Me</div><h2 id="about-me-title">Curious about people. Serious about ideas.</h2></div>
          <div>
            <p className="about-copy">I'm a third-year B.Sc. Psychology student interested in the intersection of consumer behaviour, advertising, performance and audiovisual storytelling.</p>
            <p>My experience includes theatre and performance projects, and I'm building my practice in creative strategy, scriptwriting, directing, editing and sound design. This portfolio documents work I've done and the creative skills I'm developing.</p>
            <div className="kicker" style={{ marginTop: 27 }}>TOOLS &amp; INTERESTS</div>
            <div className="skills" data-testid="list-home-skills">{skills.map((skill) => <span key={skill} data-testid={`home-skill-${skill.toLowerCase().replaceAll(' ', '-')}`}>{skill}</span>)}</div>
            <p className="status" style={{ marginTop: 20 }}>Project roles and descriptions will be expanded as original materials and credits are verified.</p>
            <Link className="text-link" href="/about" data-testid="link-home-about-details">More about this practice <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
      <section className="wrap section" id="spec-campaigns" aria-labelledby="spec-campaigns-title" data-testid="section-spec-campaigns">
        <div className="section-head">
          <div><div className="kicker">02 / Spec Campaigns</div><h2 id="spec-campaigns-title">Concepts, when they’re ready.</h2></div>
          <p className="section-note">A space for independent campaign concepts. Nothing to show just yet.</p>
        </div>
        <div className="campaign-empty" data-testid="empty-spec-campaigns">
          <span className="campaign-index mono">SPEC / 00</span>
          <div className="campaign-empty-copy">
            <span className="campaign-mark" aria-hidden="true">+</span>
            <h3>Campaign concepts will be added later.</h3>
            <p>No concepts are published here yet. This section will grow when original work is ready to share.</p>
          </div>
          <span className="campaign-status">NOT YET IN THE ARCHIVE</span>
        </div>
      </section>
      <section className="wrap section" id="my-work" aria-labelledby="my-work-title" data-testid="section-my-work">
        <div className="section-head">
          <div><div className="kicker">03 / The archive</div><h2 id="my-work-title">My Work.</h2></div>
          <p className="section-note">Six performance and production projects. Some details and supporting material are still being collected; open a card to see what needs to be added.</p>
        </div>
        <div className="project-grid" data-testid="grid-home-projects">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
          <Link className="button button-dark" href="/work" data-testid="link-full-archive">Open the full archive <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className="wrap section" data-testid="section-thinking-teaser">
        <div className="section-head">
          <div><div className="kicker">04 / How I think</div><h2>Psychology meets creativity.</h2></div>
          <p className="section-note">Research and coursework that may inform future creative strategy and consumer-insight projects.</p>
        </div>
        <Link href="/thinking" className="project-card" data-testid="link-thinking-project">
          <div className="project-top tone-coral"><span className="mono">RESEARCH PROJECT</span><h3>Greenwashing &amp; consumer behaviour</h3></div>
          <div className="project-body"><p>A coursework project involving data collection and analysis on greenwashing awareness and consumer behaviour. The research question, methods, findings and visuals will be added after checking the original assignment.</p><div className="card-foot"><span className="status">Academic work · details to add</span><span aria-hidden="true">↗</span></div></div>
        </Link>
      </section>
      <section className="wrap" data-testid="section-contact-teaser">
        <div className="callout"><div><div className="kicker">05 / Contact</div><h2>Have a project in mind?</h2><p>I'm interested in creative advertising, consumer insights and production opportunities.</p></div><Link className="button button-dark" href="/contact" data-testid="link-contact">Contact details <ArrowRight size={16} aria-hidden="true" /></Link></div>
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
