import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import './_group.css';
import './_refresh.css';

const projects = [
  {
    slug: 'time-wrath',
    title: 'Time Wrath',
    number: '01',
    tags: ['Performance', 'Acting'],
    summary: 'Acting / performance. Further production details are being verified.',
    tone: 'lime',
  },
  {
    slug: 'hari-patang',
    title: 'Hari Patang',
    number: '02',
    tags: ['Multiple roles', 'Production'],
    summary: 'Multiple roles confirmed at a broad level. Specific responsibilities need documenting.',
    tone: 'coral',
  },
  {
    slug: 'the-mommy',
    title: 'The Mommy',
    number: '03',
    tags: ['Multiple roles'],
    summary: 'Multiple roles confirmed at a broad level. Exact credits and evidence are being collected.',
    tone: 'blue',
  },
  {
    slug: 'ek-tha-raja',
    title: 'Ek Tha Raja',
    number: '04',
    tags: ['Performance', 'Acting'],
    summary: 'Acting / performance. Event, year and supporting material still need confirmation.',
    tone: 'pink',
  },
  {
    slug: 'knock-knock',
    title: 'Knock Knock',
    number: '05',
    tags: ['Performance', 'Acting'],
    summary: 'Acting / performance. Production context and available evidence still need confirmation.',
    tone: 'cream',
  },
  {
    slug: 'ek-anokhi-bhasha',
    title: 'Ek Anokhi Bhasha',
    number: '06',
    tags: ['Multiple roles', 'Creative work'],
    summary: 'Multiple roles confirmed at a broad level. Writing, acting or direction credits need clarification.',
    tone: 'ink',
  },
];

const navItems = [
  { href: '#page-top', label: 'Home' },
  { href: '#my-work', label: 'Work' },
  { href: '#thinking-teaser', label: 'Psychology' },
  { href: '#about-me', label: 'About' },
  { href: '#contact-teaser', label: 'Contact' },
];

const skills = [
  'Psychology',
  'Storytelling',
  'Performance',
  'Scriptwriting',
  'Adobe Premiere Pro',
  'Adobe Audition',
  'After Effects',
];

function ProjectEntry({ project }: { project: (typeof projects)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`refresh-project refresh-project--${project.tone}`} id={`project-${project.slug}`}>
      <div className="refresh-project__top">
        <span className="refresh-project__number">ENTRY {project.number}</span>
        <span className="refresh-project__arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
        <h3>{project.title}</h3>
      </div>
      <div className="refresh-project__body">
        <div className="refresh-tags" aria-label="Project categories">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <p>{project.summary}</p>
        <div className="refresh-project__foot">
          <button
            className="refresh-text-button"
            type="button"
            aria-expanded={open}
            aria-controls={`note-${project.slug}`}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close project note' : 'Project note'}
            <span aria-hidden="true">{open ? '−' : '+'}</span>
          </button>
          <span className="refresh-status"><i aria-hidden="true" />In progress</span>
        </div>
        {open && (
          <div className="refresh-project__note" id={`note-${project.slug}`}>
            <span className="refresh-micro-label">CURRENT RECORD</span>
            <p>{project.summary}</p>
            <a href="#contact-teaser">Ask about this project <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        )}
      </div>
    </article>
  );
}

export function Refreshed() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <div className="creative-portfolio-ux refreshed-portfolio">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="refresh-header" id="page-top">
        <div className="refresh-wrap refresh-header__inner">
          <a href="#page-top" className="refresh-brand" aria-label="Creative Archive home">
            <span className="refresh-brand__mark" aria-hidden="true">CA</span>
            <span>Creative Archive<span className="refresh-brand__dot">.</span></span>
          </a>
          <button
            className="refresh-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="refresh-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav id="refresh-navigation" className={`refresh-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={index === 0 ? 'is-current' : ''}
                aria-current={index === 0 ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a className="refresh-nav__contact" href="#contact-teaser" onClick={() => setMenuOpen(false)}>
              Say hello <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="refresh-wrap refresh-hero" aria-labelledby="hero-title">
          <div className="refresh-hero__topline">
            <span className="refresh-eyebrow"><span className="refresh-live-dot" />Psychology × storytelling × production</span>
            <span className="refresh-issue">PERSONAL ARCHIVE <span>—</span> WORK IN PROGRESS</span>
          </div>
          <div className="refresh-hero__main">
            <div className="refresh-hero__copy">
              <p className="refresh-overline">A practice in progress, collected here.</p>
              <h1 id="hero-title">I study<br />people.<br /><em>I make ideas<br className="desktop-break" /> move.</em></h1>
              <p className="refresh-intro">A growing archive of performance, creative production and psychology-led thinking. I'm interested in how people respond to stories — and how ideas become something people can see, hear and remember.</p>
              <div className="refresh-hero__actions">
                <a className="refresh-button refresh-button--lime" href="#my-work">Explore selected work <ArrowDownRight size={18} aria-hidden="true" /></a>
                <span className="refresh-meta">B.Sc. Psychology <i /> Creative practice</span>
              </div>
            </div>
            <aside className="refresh-hero-art" aria-label="Archive index, six entries in progress">
              <div className="refresh-hero-art__orbit refresh-hero-art__orbit--outer" />
              <div className="refresh-hero-art__orbit refresh-hero-art__orbit--inner" />
              <span className="refresh-hero-art__index">ARCHIVE<br />INDEX</span>
              <strong>06</strong>
              <span className="refresh-hero-art__caption">entries in progress</span>
              <span className="refresh-hero-art__stamp">IDEAS<br />IN<br />PROGRESS</span>
            </aside>
          </div>
          <div className="refresh-hero__bottomline">
            <span>Curiosity, with a point of view.</span>
            <a href="#about-me">A little about me <ArrowDownRight size={15} aria-hidden="true" /></a>
          </div>
        </section>

        <nav className="refresh-wrap refresh-section-nav" aria-label="Homepage sections">
          <span className="refresh-section-nav__label">IN THIS ARCHIVE</span>
          <a href="#about-me"><span>01</span> About Me <ArrowDownRight size={15} aria-hidden="true" /></a>
          <a href="#spec-campaigns"><span>02</span> Spec Campaigns <ArrowDownRight size={15} aria-hidden="true" /></a>
          <a href="#my-work"><span>03</span> My Work <ArrowDownRight size={15} aria-hidden="true" /></a>
        </nav>

        <section className="refresh-wrap refresh-section refresh-about" id="about-me" aria-labelledby="about-me-title">
          <div className="refresh-about__index">
            <span className="refresh-kicker">01 / ABOUT ME</span>
            <div className="refresh-about__shape" aria-hidden="true">A.</div>
          </div>
          <div className="refresh-about__content">
            <h2 id="about-me-title">Curious about people.<br /><span>Serious about ideas.</span></h2>
            <div className="refresh-about__copy">
              <p className="refresh-lead">I'm a third-year B.Sc. Psychology student interested in the intersection of consumer behaviour, advertising, performance and audiovisual storytelling.</p>
              <p>My experience includes theatre and performance projects, and I'm building my practice in creative strategy, scriptwriting, directing, editing and sound design. This portfolio documents work I've done and the creative skills I'm developing.</p>
            </div>
            <div className="refresh-tools">
              <span className="refresh-kicker">TOOLS &amp; INTERESTS</span>
              <div className="refresh-skills">
                {skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
            <div className="refresh-about__note">
              <span className="refresh-note-mark" aria-hidden="true">i</span>
              <p>Project roles and descriptions will be expanded as original materials and credits are verified.</p>
            </div>
            <a className="refresh-inline-link" href="#about-me">More about this practice <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="refresh-section refresh-campaigns" id="spec-campaigns" aria-labelledby="spec-campaigns-title">
          <div className="refresh-wrap">
            <div className="refresh-section-head">
              <div>
                <span className="refresh-kicker">02 / SPEC CAMPAIGNS</span>
                <h2 id="spec-campaigns-title">Concepts, when<br />they’re ready.</h2>
              </div>
              <p>A space for independent campaign concepts. Nothing to show just yet.</p>
            </div>
            <div className="refresh-empty" aria-label="No spec campaigns published">
              <span className="refresh-empty__index">SPEC / 00</span>
              <div className="refresh-empty__center">
                <span className="refresh-empty__symbol" aria-hidden="true">+</span>
                <div>
                  <h3>Campaign concepts will be added later.</h3>
                  <p>No concepts are published here yet. This section will grow when original work is ready to share.</p>
                </div>
              </div>
              <span className="refresh-empty__status">NOT YET IN THE ARCHIVE</span>
            </div>
          </div>
        </section>

        <section className="refresh-wrap refresh-section refresh-work" id="my-work" aria-labelledby="my-work-title">
          <div className="refresh-section-head refresh-work__head">
            <div>
              <span className="refresh-kicker">03 / THE ARCHIVE</span>
              <h2 id="my-work-title">My Work<span className="refresh-period">.</span></h2>
            </div>
            <p>Six performance and production projects. Some details and supporting material are still being collected; open a card to see what needs to be added.</p>
          </div>
          <div className="refresh-project-toolbar">
            <span><span className="refresh-live-dot" />6 ENTRIES</span>
            <span>PERFORMANCE &amp; PRODUCTION <i /> DETAILS IN PROGRESS</span>
          </div>
          <div className="refresh-project-grid">
            {projects.map((project) => <ProjectEntry project={project} key={project.slug} />)}
          </div>
          <div className="refresh-work__end">
            <span>THE ARCHIVE IS GROWING, NOT FINISHED.</span>
            <a className="refresh-button refresh-button--dark" href="#my-work">Open the full archive <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="refresh-wrap refresh-section refresh-thinking" id="thinking-teaser" aria-labelledby="thinking-title">
          <div className="refresh-section-head">
            <div>
              <span className="refresh-kicker">04 / HOW I THINK</span>
              <h2 id="thinking-title">Psychology meets<br /><span>creativity.</span></h2>
            </div>
            <p>Research and coursework that may inform future creative strategy and consumer-insight projects.</p>
          </div>
          <article className="refresh-research">
            <div className="refresh-research__flag"><span>RESEARCH PROJECT</span><span>ACADEMIC WORK · DETAILS TO ADD</span></div>
            <div className="refresh-research__body">
              <span className="refresh-research__number">04—A</span>
              <div>
                <h3>Greenwashing &amp;<br />consumer behaviour</h3>
                <p>A coursework project involving data collection and analysis on greenwashing awareness and consumer behaviour. The research question, methods, findings and visuals will be added after checking the original assignment.</p>
              </div>
              <a href="#contact-teaser" aria-label="Ask about the research project"><ArrowUpRight size={20} /></a>
            </div>
          </article>
        </section>

        <section className="refresh-wrap refresh-contact" id="contact-teaser" aria-labelledby="contact-title">
          <div className="refresh-contact__number" aria-hidden="true">05</div>
          <div className="refresh-contact__copy">
            <span className="refresh-kicker">05 / CONTACT</span>
            <h2 id="contact-title">Have a project<br />in mind?</h2>
            <p>I'm interested in creative advertising, consumer insights and production opportunities.</p>
          </div>
          <a className="refresh-button refresh-button--dark" href="#contact-teaser">Contact details <ArrowRight size={16} aria-hidden="true" /></a>
        </section>
      </main>

      <footer className="refresh-footer">
        <div className="refresh-wrap refresh-footer__inner">
          <a className="refresh-brand refresh-brand--footer" href="#page-top">
            <span className="refresh-brand__mark" aria-hidden="true">CA</span>
            <span>Creative Archive<span className="refresh-brand__dot">.</span></span>
          </a>
          <span>Portfolio in progress</span>
          <a href="#page-top">Back to top <ArrowUpRight size={14} aria-hidden="true" /></a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
