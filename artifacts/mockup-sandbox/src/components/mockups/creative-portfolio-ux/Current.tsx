import { useState } from 'react';
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react';
import './_group.css';

const projects = [
  {
    slug: 'time-wrath',
    title: 'Time Wrath',
    number: 'PROJECT 01',
    tags: ['Performance', 'Acting'],
    summary: 'Acting / performance. Further production details are being verified.',
    tone: 'tone-lime',
  },
  {
    slug: 'hari-patang',
    title: 'Hari Patang',
    number: 'PROJECT 02',
    tags: ['Multiple roles', 'Production'],
    summary: 'Multiple roles confirmed at a broad level. Specific responsibilities need documenting.',
    tone: 'tone-coral',
  },
  {
    slug: 'the-mommy',
    title: 'The Mommy',
    number: 'PROJECT 03',
    tags: ['Multiple roles'],
    summary: 'Multiple roles confirmed at a broad level. Exact credits and evidence are being collected.',
    tone: 'tone-blue',
  },
  {
    slug: 'ek-tha-raja',
    title: 'Ek Tha Raja',
    number: 'PROJECT 04',
    tags: ['Performance', 'Acting'],
    summary: 'Acting / performance. Event, year and supporting material still need confirmation.',
    tone: 'tone-pink',
  },
  {
    slug: 'knock-knock',
    title: 'Knock Knock',
    number: 'PROJECT 05',
    tags: ['Performance', 'Acting'],
    summary: 'Acting / performance. Production context and available evidence still need confirmation.',
    tone: 'tone-cream',
  },
  {
    slug: 'ek-anokhi-bhasha',
    title: 'Ek Anokhi Bhasha',
    number: 'PROJECT 06',
    tags: ['Multiple roles', 'Creative work'],
    summary: 'Multiple roles confirmed at a broad level. Writing, acting or direction credits need clarification.',
    tone: 'tone-dark',
  },
];

const navItems = [
  { href: '#page-top', label: 'Home' },
  { href: '#my-work', label: 'Work' },
  { href: '#thinking-teaser', label: 'Psychology' },
  { href: '#about-me', label: 'About' },
  { href: '#contact-teaser', label: 'Contact' },
];

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <a href="#my-work" className="project-card" data-testid={`link-project-${project.slug}`}>
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
    </a>
  );
}

export function Current() {
  const [menuOpen, setMenuOpen] = useState(false);
  const skills = ['Psychology', 'Storytelling', 'Performance', 'Scriptwriting', 'Adobe Premiere Pro', 'Adobe Audition', 'After Effects'];

  return (
    <div className="creative-portfolio-ux">
      <a className="skip-link" href="#main-content" data-testid="link-skip-content">Skip to content</a>
      <header className="site-header wrap" id="page-top">
        <div className="nav-row">
          <a href="#page-top" className="brand" aria-label="Creative Archive home" data-testid="link-brand">Creative Archive<span className="brand-mark" aria-hidden="true">·</span></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)} data-testid="button-menu-toggle">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav id="main-navigation" className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item, index) => (
              <a key={item.label} href={item.href} className={`nav-link${index === 0 ? ' active' : ''}`} aria-current={index === 0 ? 'page' : undefined} onClick={() => setMenuOpen(false)} data-testid={`nav-${item.label.toLowerCase()}`}>{item.label}</a>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content" className="main-content">
        <section className="wrap hero reveal" data-testid="section-home-hero">
          <div className="eyebrow">Psychology × storytelling × production</div>
          <h1>I STUDY PEOPLE.<span>I MAKE IDEAS MOVE.</span></h1>
          <p className="intro">A growing archive of performance, creative production and psychology-led thinking. I'm interested in how people respond to stories — and how ideas become something people can see, hear and remember.</p>
          <div className="hero-bottom">
            <a className="button" href="#my-work" data-testid="link-explore-work">Explore selected work <ArrowDownRight size={17} aria-hidden="true" /></a>
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
              <a className="text-link" href="#about-me" data-testid="link-home-about-details">More about this practice <span aria-hidden="true">↗</span></a>
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
            <a className="button button-dark" href="#my-work" data-testid="link-full-archive">Open the full archive <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </section>
        <section className="wrap section" id="thinking-teaser" data-testid="section-thinking-teaser">
          <div className="section-head">
            <div><div className="kicker">04 / How I think</div><h2>Psychology meets creativity.</h2></div>
            <p className="section-note">Research and coursework that may inform future creative strategy and consumer-insight projects.</p>
          </div>
          <a href="#thinking-teaser" className="project-card" data-testid="link-thinking-project">
            <div className="project-top tone-coral"><span className="mono">RESEARCH PROJECT</span><h3>Greenwashing &amp; consumer behaviour</h3></div>
            <div className="project-body"><p>A coursework project involving data collection and analysis on greenwashing awareness and consumer behaviour. The research question, methods, findings and visuals will be added after checking the original assignment.</p><div className="card-foot"><span className="status">Academic work · details to add</span><span aria-hidden="true">↗</span></div></div>
          </a>
        </section>
        <section className="wrap" id="contact-teaser" data-testid="section-contact-teaser">
          <div className="callout"><div><div className="kicker">05 / Contact</div><h2>Have a project in mind?</h2><p>I'm interested in creative advertising, consumer insights and production opportunities.</p></div><a className="button button-dark" href="#contact-teaser" data-testid="link-contact">Contact details <ArrowRight size={16} aria-hidden="true" /></a></div>
        </section>
      </main>
      <footer className="site-footer wrap" data-testid="site-footer">
        <span>Creative Archive · Portfolio in progress</span>
        <a href="#page-top" data-testid="link-footer-home">Back to top ↑</a>
        <span>© <span>{new Date().getFullYear()}</span></span>
      </footer>
    </div>
  );
}
