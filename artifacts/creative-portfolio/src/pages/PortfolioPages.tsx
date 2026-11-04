import { useEffect, useMemo, useState, type PointerEvent } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { categories, projects } from '../data/projects';

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${(y * -3.5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x * 3.5).toFixed(2)}deg`);
  };
  const resetPointer = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <Link href={`/work/${project.slug}`} className={`project-card project-card-${project.slug}`} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} data-testid={`link-project-${project.slug}`}>
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
  const heroQuestions = [
    <>What makes <em>people</em> feel something?</>,
    <>What earns a <em>second look?</em></>,
    <>What makes an idea <em>stay?</em></>,
  ];
  const [heroQuestion, setHeroQuestion] = useState(0);

  const handleHeroPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--hero-shift-x', `${(x * 12).toFixed(1)}px`);
    event.currentTarget.style.setProperty('--hero-shift-y', `${(y * 10).toFixed(1)}px`);
  };

  const resetHeroPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--hero-shift-x', '0px');
    event.currentTarget.style.setProperty('--hero-shift-y', '0px');
  };

  return (
    <main id="main-content" className="main-content">
      <section className="wrap hero reveal" onPointerMove={handleHeroPointer} onPointerLeave={resetHeroPointer} data-testid="section-home-hero">
        <div className="eyebrow">Psychology-led thinking × creative execution</div>
        <h1><span className="hero-line hero-line-one">I STUDY <em>PEOPLE.</em></span><span className="hero-line hero-line-two">I TURN INSIGHT</span><span className="hero-line hero-line-three"><em>INTO IDEAS.</em></span></h1>
        <p className="intro">I want to bring psychology and creative practice together to build advertising that earns attention, creates emotion, persuades with purpose and stays in memory. It starts with understanding what a brand stands for — and the people it hopes to reach.</p>
        <div className="hero-visual">
          <div className="hero-visual-orbit hero-visual-orbit-one" />
          <div className="hero-visual-orbit hero-visual-orbit-two" />
          <div className="hero-visual-card hero-visual-card-back">
            <span className="hero-visual-card-label">THE PROCESS</span>
            <strong>Notice.<br />Connect.<br />Create.</strong>
            <small>PEOPLE / CULTURE / IDEAS</small>
          </div>
          <div className="hero-visual-card hero-visual-card-main">
            <span className="hero-visual-card-label">START WITH A QUESTION</span>
            <strong>{heroQuestions[heroQuestion]}</strong>
            <div className="hero-visual-card-foot"><span>HUMAN INSIGHT</span><button type="button" aria-label="Show another creative question" onClick={() => setHeroQuestion((current) => (current + 1) % heroQuestions.length)}>↻</button></div>
          </div>
          <span className="hero-visual-spark hero-visual-spark-one">✳</span>
          <span className="hero-visual-spark hero-visual-spark-two">•</span>
        </div>
        <div className="hero-bottom">
          <Link className="button" href="/work" data-testid="link-explore-work">Explore the work <ArrowDownRight size={17} aria-hidden="true" /></Link>
          <Link className="hero-secondary" href="/about" data-testid="link-home-about">A little about me <ArrowRight size={16} aria-hidden="true" /></Link>
          <span className="hero-meta">B.Sc. Psychology · Creative practice</span>
        </div>
        <div className="hero-sticker" aria-label="Brand, people, ideas">BRAND<br />PEOPLE<br />IDEAS</div>
      </section>

      <div className="home-ticker" aria-label="Psychology, culture, storytelling, people and ideas">
        <div className="home-ticker-track" aria-hidden="true">
          {Array.from({ length: 2 }).map((_, index) => (
            <span className="home-ticker-set" key={index}>
              <b>PSYCHOLOGY</b><i>✳</i><b>CULTURE</b><i>✳</i><b>STORYTELLING</b><i>✳</i><b>PEOPLE</b><i>✳</i><b>IDEAS</b><i>✳</i>
            </span>
          ))}
        </div>
      </div>

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
      <section className="archive-range" aria-labelledby="archive-range-title">
        <div className="kicker">ACROSS THE ARCHIVE</div>
        <h2 id="archive-range-title">Different roles. One interest in how a story reaches people.</h2>
        <div className="archive-range-grid">
          <article>
            <span className="mono">01 / PERFORMANCE</span>
            <h3>Being in the story</h3>
            <p>Mime, theatre and short-film work, including lead performance in <em>Time Wrath</em> and acting in <em>Knock Knock</em>.</p>
          </article>
          <article>
            <span className="mono">02 / DEVELOPMENT</span>
            <h3>Shaping the story</h3>
            <p>Acting alongside direction and scriptwriting in <em>Hari Patang</em> — experience across both developing and performing an idea.</p>
          </article>
          <article>
            <span className="mono">03 / TECHNICAL</span>
            <h3>Working behind the stage</h3>
            <p>Lights handling in <em>Ek Tha Raja</em>, alongside my contribution as a performer.</p>
          </article>
        </div>
        <Link href="/thinking" className="archive-range-link">See how I connect creative practice with psychology <ArrowRight size={16} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}

export function ProjectDetailPage() {
  const [activeScene, setActiveScene] = useState(0);
  const params = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) return <main className="wrap not-found" id="main-content"><div className="kicker">ARCHIVE / NOT FOUND</div><h1>This project isn't in the archive.</h1><Link href="/work" className="button" data-testid="link-back-to-archive">Back to the archive <ArrowLeft size={16} /></Link></main>;




  if (project.slug === 'time-wrath') {
    const beats = [
      {
        number: '01',
        label: 'THE VOYAGE',
        title: 'Two adventurers. One treasure.',
        description: 'The story begins with two adventurers setting out by ship, travelling across the world in search of a treasure. The voyage establishes the scale of the journey and the partnership at its centre.',
      },
      {
        number: '02',
        label: 'THE ENCOUNTER',
        title: 'A destination, and its people.',
        description: 'When the adventurers reach their destination, they encounter the Indigenous people of that place. The expedition moves from travel into confrontation.',
      },
      {
        number: '03',
        label: 'THE BETRAYAL',
        title: 'The partnership breaks.',
        description: 'During the encounter, Ashley’s character is betrayed by the other adventurer. The search for treasure becomes a story of broken trust.',
      },
      {
        number: '04',
        label: 'THE FINAL TRAP',
        title: 'The journey ends behind bars.',
        description: 'The other adventurer eventually reaches the destination, only to end up trapped in a cell-like enclosure. The final image turns the expected reward of the expedition into confinement.',
      },
    ];

    return (
      <main className="wrap main-content time-wrath-page" id="main-content" data-testid="project-detail-time-wrath">
        <Link href="/work" className="back-link time-wrath-back-link" data-testid="link-back-work"><ArrowLeft size={16} /> Back to all work</Link>

        <section className="time-wrath-hero">
          <div className="time-wrath-hero-meta">
            <span>LIVE ILLUSION PRODUCTIONS <i>/</i> MIME PERFORMANCE</span>
            <span>2024—2025</span>
          </div>
          <div className="time-wrath-hero-grid">
            <div className="time-wrath-hero-copy">
              <p className="time-wrath-eyebrow">A TREASURE HUNT / A STORY OF TRUST &amp; BETRAYAL</p>
              <h1>TIME <em>WRATH</em></h1>
              <p className="time-wrath-summary">Two adventurers cross the world by ship in search of treasure. At their destination, an encounter with its Indigenous people sets a journey of betrayal and entrapment in motion.</p>
              <div className="time-wrath-tags"><span>MIME</span><span>ADVENTURE</span><span>LEAD PERFORMANCE</span></div>
            </div>
            <div className="time-wrath-map" aria-hidden="true">
              <div className="time-wrath-map-ring time-wrath-map-ring-one" />
              <div className="time-wrath-map-ring time-wrath-map-ring-two" />
              <div className="time-wrath-map-route" />
              <span className="time-wrath-map-point time-wrath-map-point-one"><b>01</b><i>DEPARTURE</i></span>
              <span className="time-wrath-map-point time-wrath-map-point-two"><b>02</b><i>ENCOUNTER</i></span>
              <span className="time-wrath-map-point time-wrath-map-point-three"><b>03</b><i>BETRAYAL</i></span>
              <span className="time-wrath-map-point time-wrath-map-point-four"><b>04</b><i>THE TRAP</i></span>
              <span className="time-wrath-map-centre">THE<br />TREASURE<br />ROUTE</span>
              <span className="time-wrath-map-caption">A STORY IN FOUR MOVEMENTS</span>
            </div>
          </div>
          <div className="time-wrath-hero-bottom"><span>VOYAGE</span><span>CONFRONTATION</span><span>BETRAYAL</span><span>CONFINEMENT</span></div>
        </section>

        <section className="time-wrath-statbar" aria-label="Project at a glance">
          <div><strong>01</strong><span>LEAD PERFORMER</span></div>
          <div><strong>04</strong><span>COMPETITION RESULTS</span></div>
          <div><strong>2024–25</strong><span>PERFORMANCE PERIOD</span></div>
        </section>

        <section className="time-wrath-story" aria-labelledby="time-wrath-story-title">
          <div className="time-wrath-section-heading">
            <div><div className="kicker">01 / THE STORY</div><h2 id="time-wrath-story-title">A voyage with an unexpected end.</h2></div>
            <p>Explore the plot in sequence. Each beat changes the relationship between the two adventurers and moves the story towards its final image.</p>
          </div>
          <div className="time-wrath-story-explorer">
            <div className="time-wrath-story-tabs" role="tablist" aria-label="Explore the story of Time Wrath">
              {beats.map((beat, index) => <button
                type="button"
                role="tab"
                id={`time-wrath-tab-${index}`}
                aria-selected={activeScene === index}
                aria-controls="time-wrath-beat-panel"
                className={activeScene === index ? 'is-active' : ''}
                key={beat.number}
                onClick={() => setActiveScene(index)}
                data-testid={`button-time-wrath-beat-${index + 1}`}
              >
                <span>{beat.number}</span><strong>{beat.label}</strong><b>↗</b>
              </button>)}
            </div>
            <article className="time-wrath-beat-panel" id="time-wrath-beat-panel" role="tabpanel" aria-labelledby={`time-wrath-tab-${activeScene}`} key={activeScene}>
              <div className="time-wrath-beat-index">STORY BEAT / {beats[activeScene].number} OF 04</div>
              <p>{beats[activeScene].label}</p>
              <h3>{beats[activeScene].title}</h3>
              <div className="time-wrath-beat-description">{beats[activeScene].description}</div>
              <div className="time-wrath-beat-controls">
                <span>{beats[activeScene].number} — 04</span>
                <div>
                  <button type="button" aria-label="Previous story beat" disabled={activeScene === 0} onClick={() => setActiveScene((current) => Math.max(0, current - 1))}>←</button>
                  <button type="button" aria-label="Next story beat" disabled={activeScene === beats.length - 1} onClick={() => setActiveScene((current) => Math.min(beats.length - 1, current + 1))}>→</button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="time-wrath-contribution">
          <article className="time-wrath-role-card">
            <span className="kicker">02 / MY CONTRIBUTION</span>
            <strong>Lead performer.</strong>
            <p>I performed one of the lead roles: the adventurer who is betrayed during the encounter at the destination.</p>
            <span className="time-wrath-role-foot">PERFORMANCE / MIME</span>
          </article>
          <article className="time-wrath-recognition-card">
            <span className="kicker">03 / COMPETITION RECOGNITION</span>
            <h2>Award-winning<br />performance.</h2>
            <ul>
              {project.recognition?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </section>

        <section className="time-wrath-reflection">
          <div className="kicker">04 / THE PERFORMANCE LANGUAGE</div>
          <h2>A story told through <em>physical action.</em></h2>
          <p>Time Wrath moves through a sequence of recognisable story shifts: departure, encounter, betrayal and confinement. In mime, those changes have to be communicated through the performers’ bodies, movement and interaction rather than spoken explanation. The precise staging, transitions and visual devices will be added after reviewing the performance footage.</p>
          <div className="time-wrath-reflection-note"><span>VISUAL ARCHIVE</span><strong>Performance footage and scene stills to be added after review.</strong></div>
        </section>

        <div className="time-wrath-end-links">
          <Link href="/work" className="archive-range-link"><ArrowLeft size={16} aria-hidden="true" /> Back to the creative archive</Link>
          <Link href="/work/hari-patang" className="archive-range-link">Next project: Hari Patang <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </main>
    );
  }

  if (project.slug === 'ek-anokhi-bhasha' && project.caseStudy) {
    const caseStudy = project.caseStudy;
    const devices = [
      { number: '01', title: 'Multilingual sound', copy: 'Greetings from different languages open the play; “Aeiiioa” returns as a shared ensemble sound.' },
      { number: '02', title: 'Satire & reversal', copy: 'The Netaji interview turns the language test back on those demanding linguistic conformity.' },
      { number: '03', title: 'Visual metaphor', copy: 'The weighing machine becomes “the weight of the nation”.' },
      { number: '04', title: 'A changing refrain', copy: '“Saare Jahan Se Achha” shifts from a familiar refrain to an uneasy counterpoint as the stakes rise.' },
    ];

    return (
      <main className="wrap main-content bhasha-page bhasha-page-compact" id="main-content" data-testid="project-detail-ek-anokhi-bhasha">
        <Link href="/work" className="back-link bhasha-back-link" data-testid="link-back-work"><ArrowLeft size={16} /> Back to all work</Link>

        <section className="bhasha-hero">
          <div className="bhasha-hero-topline">
            <span>LIVE ILLUSION PRODUCTIONS <i>/</i> NUKKAD NAATAK</span>
            <span>CREATIVE ARCHIVE / 06</span>
          </div>
          <div className="bhasha-hero-grid">
            <div className="bhasha-hero-copy">
              <p className="bhasha-eyebrow">A STREET PLAY ABOUT LANGUAGE &amp; BELONGING</p>
              <h1>EK ANOKHI <em>BHASHA</em></h1>
              <p className="bhasha-hero-summary">A multilingual street play about who gets to belong — and what happens when language becomes a boundary.</p>
              <div className="bhasha-hero-tags"><span>STREET THEATRE</span><span>LANGUAGE &amp; IDENTITY</span><span>SOCIAL SATIRE</span></div>
            </div>
            <div className="bhasha-hero-art" aria-label="A visual metaphor for many languages sharing one space">
              <div className="bhasha-word-orbit bhasha-word-orbit-one">HELLO</div>
              <div className="bhasha-word-orbit bhasha-word-orbit-two">KEMCHO</div>
              <div className="bhasha-word-orbit bhasha-word-orbit-three">VANAKKAM</div>
              <div className="bhasha-word-orbit bhasha-word-orbit-four">NAMASKARA</div>
              <div className="bhasha-speech-core"><span>एक</span><strong>ONE</strong></div>
              <div className="bhasha-art-footer">MANY VOICES<br />ONE SHARED SPACE</div>
              <span className="bhasha-art-sound">AEIIIOA</span>
            </div>
          </div>
          <div className="bhasha-hero-bottom"><span>LANGUAGE</span><span>IDENTITY</span><span>ACCEPTANCE</span><span className="bhasha-hero-arrow">↓</span></div>
        </section>

        <section className="bhasha-statbar" aria-label="Project at a glance">
          <div><strong>04</strong><span>SCENES</span></div>
          <div><strong>02</strong><span>CONTRIBUTION AREAS</span></div>
          <div className="bhasha-stat-note"><span>RECOGNITION</span><strong>1st place · Blossoms ’26</strong></div>
        </section>

        <section className="bhasha-scenes-section bhasha-scenes-compact">
          <div className="bhasha-section-heading">
            <div><div className="bhasha-section-index">01 <span>/ THE STORY</span></div><h2>Four scenes.<br /><em>One idea.</em></h2></div>
            <p>{caseStudy.premise}</p>
          </div>
          <div className="story-explorer bhasha-story-explorer">
            <div className="story-tabs" role="tablist" aria-label="Explore the four scenes">
              {caseStudy.scenes.map((scene, index) => (
                <button type="button" role="tab" key={scene.title} id={`bhasha-scene-tab-${index}`} aria-selected={activeScene === index} aria-controls="bhasha-scene-panel" onClick={() => setActiveScene(index)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{scene.title.split(' / ').slice(1).join(' / ')}
                </button>
              ))}
            </div>
            <article className="story-feature" id="bhasha-scene-panel" role="tabpanel" aria-labelledby={`bhasha-scene-tab-${activeScene}`} key={activeScene}>
              <div className="story-feature-index">SCENE {String(activeScene + 1).padStart(2, '0')} / 04</div>
              <p className="story-feature-kicker">{['THE SATIRE', 'THE QUESTION', 'THE CONSEQUENCE', 'THE RESPONSE'][activeScene]}</p>
              <h3>{caseStudy.scenes[activeScene].title.split(' / ').slice(1).join(' / ')}</h3>
              <p>{caseStudy.scenes[activeScene].description}</p>
              <div className="story-feature-controls">
                <span>{activeScene + 1} OF {caseStudy.scenes.length}</span>
                <div>
                  <button type="button" aria-label="Previous scene" disabled={activeScene === 0} onClick={() => setActiveScene((current) => Math.max(0, current - 1))}>←</button>
                  <button type="button" aria-label="Next scene" disabled={activeScene === caseStudy.scenes.length - 1} onClick={() => setActiveScene((current) => Math.min(caseStudy.scenes.length - 1, current + 1))}>→</button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="bhasha-devices-section bhasha-devices-compact">
          <div className="bhasha-section-heading">
            <div><div className="bhasha-section-index">02 <span>/ THE CREATIVE LANGUAGE</span></div><h2>How the message<br /><em>reaches the audience.</em></h2></div>
            <p>Sound, satire and a strong visual metaphor carry the idea without over-explaining it.</p>
          </div>
          <div className="bhasha-devices-grid">
            {devices.map((device) => (
              <article className={'bhasha-device-card bhasha-device-card-' + Number(device.number)} key={device.number}>
                <span>{device.number}</span><h3>{device.title}</h3><p>{device.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bhasha-contribution-section bhasha-contribution-compact">
          <div className="bhasha-section-heading">
            <div><div className="bhasha-section-index">03 <span>/ MY CONTRIBUTION</span></div><h2>On stage.<br /><em>And off it.</em></h2></div>
            <p>Street Play Sub-Head and ensemble performer across the production.</p>
          </div>
          <div className="bhasha-contribution-grid">
            <article className="bhasha-role-card bhasha-role-card-stage">
              <div className="bhasha-role-index">PERFORMANCE</div>
              <h3>Ensemble + Netaji</h3>
              <p>Performed across the scenes, with a named character credit as Netaji in Scene 1.</p>
            </article>
            <article className="bhasha-role-card bhasha-role-card-team">
              <div className="bhasha-role-index">PRODUCTION</div>
              <h3>Street Play Sub-Head</h3>
              <p>Supported coordination and management wherever needed.</p>
            </article>
          </div>
        </section>

        <section className="bhasha-ending-section bhasha-ending-compact">
          <div className="bhasha-ending-heading">
            <span>04 / THE CLOSING IDEA</span>
            <h2>One.<br /><em>Unique. Language.</em></h2>
          </div>
          <div className="bhasha-ending-steps">
            <article><small>ONE</small><strong>Realisation</strong></article>
            <article><small>UNIQUENESS</small><strong>Acceptance</strong></article>
            <article><small>LANGUAGE</small><strong>Action</strong></article>
          </div>
        </section>

        <section className="bhasha-recognition-compact">
          <span>RECOGNITION</span>
          <strong>1st place · Blossoms ’26</strong>
        </section>
      </main>
    );
  }

  if (project.slug === 'hari-patang' && project.caseStudy) {
    const caseStudy = project.caseStudy;
    const devices = [
      { number: '01', title: 'Satire & sales language', copy: 'The mock green coupon and marketplace pitches turn familiar advertising language into something the audience can question.' },
      { number: '02', title: 'Visual metaphor', copy: 'Traffic lights frame the opening. Blindfolds and the Dhritrashtra sequence make selective blindness visible.' },
      { number: '03', title: 'Audience participation', copy: 'Chants, call-and-response and the recycling-symbol interaction ask the crowd to notice, answer and think along.' },
      { number: '04', title: 'Music & cultural reference', copy: 'Jingles, familiar tunes, wordplay and a news-desk format keep a complex subject accessible in a street-play setting.' },
    ];

    return (
      <main className="wrap main-content hari-patang-page" id="main-content" data-testid="project-detail-hari-patang">
        <Link href="/work" className="back-link hari-back-link" data-testid="link-back-work"><ArrowLeft size={16} /> Back to all work</Link>

        <section className="hari-hero">
          <div className="hari-hero-topline">
            <span>LIVE ILLUSION PRODUCTIONS <i> / </i> CREATIVE ARCHIVE</span>
            <span>2025—2026</span>
          </div>
          <div className="hari-hero-grid">
            <div className="hari-hero-copy">
              <p className="hari-eyebrow">A STREET PLAY ABOUT GREENWASHING</p>
              <h1><span>HARI</span><em>PATANG</em></h1>
              <p className="hari-hero-summary">When everything claims to be green, how do we know what is actually good?</p>
              <div className="hari-hero-tags"><span>STREET THEATRE</span><span>CONSUMER AWARENESS</span><span>ENVIRONMENT</span></div>
            </div>
            <div className="hari-kite-stage" aria-hidden="true">
              <div className="hari-kite-orbit"></div>
              <div className="hari-kite-stamp">ONE KITE<br />ONE IDEA</div>
              <svg className="hari-kite-art" viewBox="0 0 360 420" role="presentation">
                <path className="hari-kite-string" d="M183 315 C220 355 128 365 185 405" />
                <path className="hari-kite-tail" d="M183 315 C220 355 128 365 185 405" />
                <path className="hari-kite-ribbon" d="M174 355 l-20 9 22 9 18 -9z M165 383 l-18 8 22 8 17 -9z" />
                <polygon className="hari-kite-panel hari-kite-panel-a" points="180,25 315,170 180,170" />
                <polygon className="hari-kite-panel hari-kite-panel-b" points="315,170 180,315 180,170" />
                <polygon className="hari-kite-panel hari-kite-panel-c" points="180,315 45,170 180,170" />
                <polygon className="hari-kite-panel hari-kite-panel-d" points="45,170 180,25 180,170" />
                <path className="hari-kite-frame" d="M180 25 L315 170 L180 315 L45 170 Z M45 170 H315 M180 25 V315" />
                <circle className="hari-kite-knot" cx="180" cy="170" r="7" />
              </svg>
              <span className="hari-kite-caption">EK PATANG<br />EK DOR<br />EK AASMAAN<br />EK SOCH</span>
            </div>
          </div>
          <div className="hari-hero-bottom"><span>THE STORY</span><span>THE PEOPLE</span><span>THE PROOF</span><span className="hari-hero-arrow">↓</span></div>
        </section>

        <section className="hari-statbar" aria-label="Project at a glance">
          <div className="hari-stat"><strong>05</strong><span>SCENES</span></div>
          <div className="hari-stat"><strong>03</strong><span>CORE CREATIVE ROLES</span></div>
          <div className="hari-stat"><strong>02</strong><span>COMPETITION RESULTS</span></div>
          <div className="hari-stat-award"><span>RECOGNITION</span><strong>1st — Darpan</strong><strong>2nd — Mood Indigo prelims</strong></div>
        </section>

        <section className="hari-question-section">
          <div className="hari-section-index">01 <span>/ THE CENTRAL QUESTION</span></div>
          <div className="hari-question-grid">
            <h2>Green on the label.<br /><em>But what’s behind it?</em></h2>
            <div className="hari-question-copy">
              <p>{caseStudy.premise}</p>
              <span className="hari-question-note">A PLAY ABOUT LOOKING BEYOND THE CLAIM.</span>
            </div>
          </div>
        </section>

        <section className="hari-scenes-section">
          <div className="hari-section-heading">
            <div><div className="hari-section-index">02 <span>/ THE STORYLINE</span></div><h2>Five scenes.<br /><em>One unfolding argument.</em></h2></div>
            <p>The play moves from the attraction of green claims to the responsibility of questioning them — and finally, to what an audience can do next.</p>
          </div>
          <div className="story-explorer hari-story-explorer">
            <div className="story-tabs" role="tablist" aria-label="Explore the five scenes">
              {caseStudy.scenes.map((scene, index) => (
                <button type="button" role="tab" key={scene.title} id={`hari-scene-tab-${index}`} aria-selected={activeScene === index} aria-controls="hari-scene-panel" onClick={() => setActiveScene(index)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{scene.title.replace(/^\d+\s*\/\s*/, '')}
                </button>
              ))}
            </div>
            <article className="story-feature hari-story-feature" id="hari-scene-panel" role="tabpanel" aria-labelledby={`hari-scene-tab-${activeScene}`} key={activeScene}>
              <div className="story-feature-index">SCENE {String(activeScene + 1).padStart(2, '0')} / 05</div>
              <p className="story-feature-kicker">{['THE HOOK', 'THE CONFLICT', 'THE SATIRE', 'THE REVEAL', 'THE RESPONSE'][activeScene]}</p>
              <h3>{caseStudy.scenes[activeScene].title.replace(/^\d+\s*\/\s*/, '')}</h3>
              <p>{caseStudy.scenes[activeScene].description}</p>
              <div className="story-feature-controls">
                <span>{activeScene + 1} OF {caseStudy.scenes.length}</span>
                <div>
                  <button type="button" aria-label="Previous scene" disabled={activeScene === 0} onClick={() => setActiveScene((current) => Math.max(0, current - 1))}>←</button>
                  <button type="button" aria-label="Next scene" disabled={activeScene === caseStudy.scenes.length - 1} onClick={() => setActiveScene((current) => Math.min(caseStudy.scenes.length - 1, current + 1))}>→</button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="hari-devices-section">
          <div className="hari-section-heading hari-devices-heading">
            <div><div className="hari-section-index">03 <span>/ THE CREATIVE LANGUAGE</span></div><h2>Making the message<br /><em>feel like a performance.</em></h2></div>
            <p>The play doesn't rely on explanation alone. It uses the grammar of street theatre to make the subject visible, memorable and participatory.</p>
          </div>
          <div className="hari-devices-grid">
            {devices.map((device, index) => (
              <article className={`hari-device-card hari-device-card-${index + 1}`} key={device.number}>
                <span className="hari-device-number">{device.number}</span>
                <h3>{device.title}</h3>
                <p>{device.copy}</p>
              </article>
            ))}
          </div>
          <div className="hari-symbol-note">
            <span className="hari-symbol-mark">↗</span>
            <div><span>AN INTERACTIVE DETAIL</span><p>The audience was invited to distinguish the recycling symbol from the resin identification symbol used on plastics — turning a small piece of information into a moment of discovery.</p></div>
          </div>
        </section>

        <section className="hari-contribution-section">
          <div className="hari-section-heading">
            <div><div className="hari-section-index">04 <span>/ MY CONTRIBUTION</span></div><h2>On stage, in the script<br /><em>and in the direction.</em></h2></div>
            <p>My contribution crossed performance and the development of the production, with one solution segment delivered directly to the audience.</p>
          </div>
          <div className="hari-roles-grid">
            <article><span>01 / PERFORMANCE</span><h3>Red Light</h3><p>Scene 1 — part of the traffic-light opening that introduces the play’s environmental theme.</p></article>
            <article><span>02 / PERFORMANCE</span><h3>Dhritrashtra</h3><p>Scene 4 — the central character in the blindfold sequence about failing to see the difference between claims and reality.</p></article>
            <article><span>03 / DIRECTION & SCRIPT</span><h3>Shaping the play</h3><p>Worked across direction and scriptwriting to build the journey from the opening pitch to the closing solutions.</p></article>
            <article><span>04 / AUDIENCE ADDRESS</span><h3>Consumer tools</h3><p>Presented the first solution block, introducing Good On You, Ecolabel Index and EarthHero as tools named in the script.</p></article>
          </div>
        </section>

        <section className="hari-results-section">
          <div><div className="hari-section-index">05 <span>/ RECOGNITION</span></div><h2>The work travelled.<br /><em>The message stayed.</em></h2></div>
          <div className="hari-awards">
            <div className="hari-award"><span>01</span><strong>1st PLACE</strong><small>DARPAN</small></div>
            <div className="hari-award"><span>02</span><strong>2nd PLACE</strong><small>MOOD INDIGO PRELIMS</small></div>
          </div>
        </section>

        <section className="hari-takeaway">
          <span className="hari-takeaway-label">WHAT I TAKE FROM HARI PATANG</span>
          <p>Move people from <em>noticing</em> a problem to <em>knowing what to do</em> about it.</p>
          <div className="hari-takeaway-footer"><span>LIVE ILLUSION PRODUCTIONS</span><span>HARI PATANG / 2025—26</span><span>↗</span></div>
        </section>
      </main>
    );
  }

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
          {project.practiceNote && (
            <section className="detail-section project-practice-note">
              <div className="kicker">04 / WHAT I TAKE FROM THIS</div>
              <p className="detail-lead">{project.practiceNote.title}</p>
              <p>{project.practiceNote.body}</p>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

export function ThinkingPage() {
  const [activeLens, setActiveLens] = useState(0);
  const [activeObjective, setActiveObjective] = useState(0);
  const [brandName, setBrandName] = useState('');
  const [audience, setAudience] = useState('Students & young adults');
  const [tone, setTone] = useState('Playful');
  const [showDirection, setShowDirection] = useState(false);
  const [routeIndex, setRouteIndex] = useState(0);
  const lenses = [
    { number: '01', title: 'Attention', copy: 'Earn the first few seconds.', detail: 'Look at the context people are already paying attention to. The creative challenge is to make the brand relevant enough to earn a pause, not simply louder than everything around it.', question: 'What would make this worth a second look?', signals: ['A distinctive visual or verbal cue', 'Immediate relevance to the audience', 'A clear first impression'], creative: 'Make the opening do some work. Use a surprising visual, a recognisable situation or a sharp first line to interrupt the usual category pattern — while keeping the brand recognisable.' },
    { number: '02', title: 'Emotion', copy: 'Give the message a human reason to matter.', detail: 'Decide what the audience should feel, then look for a human situation that can carry that feeling. Tone, character and tension can make an abstract promise feel personal.', question: 'What feeling should the idea leave behind?', signals: ['A recognisable human tension', 'Tone and atmosphere', 'A point of connection'], creative: 'Move from describing a product benefit to showing what that benefit means in someone’s life. Character, performance, music and a specific everyday moment can carry the emotion.' },
    { number: '03', title: 'Persuasion', copy: 'Give people a reason to believe.', detail: 'A persuasive idea gives people a reason to believe the message. The promise, proof and next step should work together rather than relying on a clever line alone.', question: 'What would make the promise believable?', signals: ['A credible reason to believe', 'A clear value exchange', 'A useful next step'], creative: 'Let the idea demonstrate its promise. Show how something works, make the evidence easy to understand, or put the claim into a situation where the audience can judge it.' },
    { number: '04', title: 'Memory', copy: 'Build a cue people can carry with them.', detail: 'Look for a recognisable device that can connect the message to an everyday moment. A repeated phrase, image or sound can help make a brand easier to retrieve later.', question: 'What could people remember or repeat?', signals: ['A distinctive recurring cue', 'A repeatable phrase, image or sound', 'A meaningful brand link'], creative: 'Give the campaign a device that can return in different forms: a phrase, sound, character, gesture or visual pattern. Repetition works best when it is tied to the brand’s meaning.' },
  ];
  const objectives = [
    { title: 'Awareness', label: 'Get noticed', prompt: 'What would make this brand earn attention in a space already crowded with messages?', tension: 'People may not notice the brand or understand why it is different from the alternatives around it.', lens: 'ATTENTION', lensIndex: 0, routes: ['Open with a visual interruption that makes the category feel familiar — then gives the audience one unexpected detail to notice.', 'Turn the brand’s most distinctive feature into a simple, recognisable demonstration that works even before the full message is explained.'] },
    { title: 'Perception', label: 'Change the view', prompt: 'Which existing belief about the brand needs to be challenged, softened or reframed?', tension: 'An existing impression may be narrowing what people expect from the brand.', lens: 'EMOTION + PERSUASION', lensIndex: 1, routes: ['Place the brand in a situation that challenges the audience’s usual assumption about it, then let the story reveal the difference.', 'Use a character-led moment to make a new side of the brand feel relatable rather than simply announcing a change in positioning.'] },
    { title: 'Association', label: 'Own a meaning', prompt: 'What everyday moment, cultural cue or feeling should people connect with this brand?', tension: 'The brand needs a clearer connection to a moment, value or feeling that matters to its audience.', lens: 'MEMORY', lensIndex: 3, routes: ['Build a repeatable ritual around a moment the audience already recognises, allowing the brand to become part of that experience.', 'Create a verbal or visual cue that links the brand to one clear feeling — something people can recognise across different executions.'] },
    { title: 'Loyalty', label: 'Build a reason to return', prompt: 'What experience would make choosing this brand feel worthwhile again?', tension: 'A repeat choice needs to feel meaningful beyond habit, convenience or a one-time offer.', lens: 'PERSUASION + MEMORY', lensIndex: 2, routes: ['Make returning customers feel recognised through a small, consistent experience that demonstrates the value of the relationship.', 'Show the benefit of coming back through a story that builds on familiarity and gives the audience a reason to continue the relationship.'] },
  ];
  const steps = [
    ['01', 'Understand the brand'],
    ['02', 'Understand the audience'],
    ['03', 'Find the human insight'],
    ['04', 'Make the creative idea'],
    ['05', 'Experiment & refine'],
  ];
  return <main className="wrap main-content thinking-page-compact" id="main-content" data-testid="page-thinking">
    <header className="page-intro thinking-intro thinking-compact-intro">
      <div className="kicker">02 / THE THINKING</div>
      <h1 className="page-title">Psychology, people<br />&amp; the ideas between.</h1>
      <p>I use psychology to ask better questions about people — then bring those questions into creative storytelling and advertising.</p>
    </header>

    <section className="thinking-principle thinking-principle-compact">
      <div className="kicker">MY STARTING POINT</div>
      <h2>Start with the brand.<br /><em>Then understand the people.</em></h2>
      <p>A campaign should respond to what a brand needs to achieve — whether that is awareness, a shift in perception, a new association or stronger loyalty. There is no one formula for every brief.</p>
    </section>

    <section className="thinking-lenses thinking-compact-section" aria-labelledby="lenses-title">
      <div className="thinking-compact-heading">
        <div><div className="kicker">THE HUMAN RESPONSE</div><h2 id="lenses-title">Four lenses I return to.</h2></div>
        <p>Questions that help me think through how an idea reaches people.</p>
      </div>
      <div className="thinking-lens-grid" role="tablist" aria-label="Choose a psychology lens">
        {lenses.map((lens, index) => <button type="button" role="tab" aria-selected={activeLens === index} aria-controls="lens-detail-panel" className={`thinking-lens${activeLens === index ? ' is-active' : ''}`} key={lens.number} onClick={() => setActiveLens(index)}>
          <span className="mono">{lens.number} / LENS</span>
          <h3>{lens.title}</h3>
          <p>{lens.copy}</p>
          <span className="thinking-lens-action">{activeLens === index ? 'SELECTED' : 'EXPLORE'} <b>↗</b></span>
        </button>)}
      </div>
      <article className="lens-detail-panel" id="lens-detail-panel" role="tabpanel" key={activeLens}>
        <div className="lens-detail-index">LENS {lenses[activeLens].number} / FROM PSYCHOLOGY TO CREATIVE CHOICE</div>
        <div className="lens-detail-content">
          <div className="lens-detail-main">
            <h3>{lenses[activeLens].question}</h3>
            <p>{lenses[activeLens].detail}</p>
            <div className="lens-creative-translation"><span>WHAT THIS COULD CHANGE IN THE CREATIVE</span><p>{lenses[activeLens].creative}</p></div>
          </div>
          <div className="lens-signal-list"><span>THINGS TO LOOK FOR</span>{lenses[activeLens].signals.map((signal) => <b key={signal}>{signal}</b>)}</div>
        </div>
      </article>
    </section>

    <section className="brief-playground thinking-compact-section" aria-labelledby="brief-playground-title">
      <div className="thinking-compact-heading">
        <div><div className="kicker">INTERACTIVE / BUILD A STARTING BRIEF</div><h2 id="brief-playground-title">A brief is a starting point.<br />Make a direction from it.</h2></div>
        <p>Try different objectives and audiences to see how the creative question changes. This is a thinking exercise, not a finished campaign recommendation.</p>
      </div>
      <div className="brief-builder">
        <div className="brief-builder-controls">
          <div className="brief-builder-step"><span>01</span><strong>SET THE CONTEXT</strong></div>
          <label className="brief-field">
            <span>BRAND / PRODUCT / SERVICE</span>
            <input type="text" value={brandName} maxLength={60} placeholder="e.g. A neighbourhood café" onChange={(event) => { setBrandName(event.target.value); setShowDirection(false); }} />
          </label>
          <label className="brief-field">
            <span>WHO ARE YOU SPEAKING TO?</span>
            <select value={audience} onChange={(event) => { setAudience(event.target.value); setShowDirection(false); }}>
              <option>Students &amp; young adults</option>
              <option>First-time buyers</option>
              <option>Existing customers</option>
              <option>Price-conscious shoppers</option>
              <option>Busy working professionals</option>
              <option>A broad everyday audience</option>
            </select>
          </label>
          <div className="brief-builder-step brief-objective-heading"><span>02</span><strong>CHOOSE THE OBJECTIVE</strong></div>
          <div className="brief-objectives" role="group" aria-label="Choose a campaign objective">
            {objectives.map((objective, index) => <button type="button" className={activeObjective === index ? 'is-active' : ''} aria-pressed={activeObjective === index} onClick={() => { setActiveObjective(index); setRouteIndex(0); setShowDirection(false); }} key={objective.title}>
              <span>0{index + 1}</span><strong>{objective.title}</strong><small>{objective.label}</small><b>↗</b>
            </button>)}
          </div>
          <div className="brief-builder-step brief-tone-heading"><span>03</span><strong>CHOOSE A TONE</strong></div>
          <div className="brief-tone-options" role="group" aria-label="Choose a creative tone">
            {['Playful', 'Warm', 'Bold', 'Thoughtful'].map((option) => <button type="button" key={option} aria-pressed={tone === option} className={tone === option ? 'is-active' : ''} onClick={() => { setTone(option); setShowDirection(false); }}>{option}</button>)}
          </div>
          <button type="button" className="brief-build-button" onClick={() => { setRouteIndex(0); setShowDirection(true); }}>Build my direction <span>↗</span></button>
        </div>
        <article className={'brief-output brief-output-builder' + (showDirection ? ' has-direction' : '')} aria-live="polite" key={(showDirection ? activeObjective : 'empty') + '-' + routeIndex}>
          {!showDirection ? <>
            <div className="brief-output-index">YOUR CREATIVE WORKSPACE</div>
            <div className="brief-empty-graphic" aria-hidden="true"><span>?</span><i></i><b></b></div>
            <div className="brief-empty-copy"><h3>Start with the job the brand needs to do.</h3><p>Add a brand and audience, choose an objective and tone, then build a starting direction.</p></div>
            <div className="brief-output-foot"><span>READY WHEN YOU ARE</span><strong>01 / 04 OBJECTIVES</strong></div>
          </> : <>
            <div className="brief-output-index">YOUR STARTING DIRECTION <span>NOT A FINISHED CAMPAIGN</span></div>
            <div className="brief-built-summary">
              <div><span>THE BRAND</span><strong>{brandName.trim() || 'Your brand'}</strong></div>
              <div><span>THE AUDIENCE</span><strong>{audience}</strong></div>
              <div><span>THE OBJECTIVE</span><strong>{objectives[activeObjective].title}</strong></div>
              <div><span>THE TONE</span><strong>{tone}</strong></div>
            </div>
            <div className="brief-insight-block"><span>THE TENSION TO INVESTIGATE</span><p>{objectives[activeObjective].tension}</p></div>
            <div className="brief-route-block">
              <span>POSSIBLE CREATIVE ROUTE / 0{routeIndex + 1}</span>
              <p>{objectives[activeObjective].routes[routeIndex]}</p>
              <small>Try a {tone.toLowerCase()} tone for {audience.toLowerCase()} — then test whether the idea feels relevant to them.</small>
            </div>
            <div className="brief-output-footer">
              <div className="brief-output-lens-link">
                <span>STARTING PSYCHOLOGY LENS</span><strong>{objectives[activeObjective].lens}</strong>
                <button type="button" onClick={() => { setActiveLens(objectives[activeObjective].lensIndex); document.getElementById('lenses-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>Explore this lens ↗</button>
              </div>
              <button type="button" onClick={() => setRouteIndex((current) => (current + 1) % objectives[activeObjective].routes.length)}>Try another route <b>↻</b></button>
            </div>
          </>}
        </article>
      </div>
    </section>

    <section className="thinking-method-compact thinking-compact-section" aria-labelledby="method-title">
      <div className="thinking-compact-heading">
        <div><div className="kicker">FROM INSIGHT TO EXECUTION</div><h2 id="method-title">How I want to work.</h2></div>
        <p>Research and creative experimentation inform each stage.</p>
      </div>
      <div className="thinking-step-strip">
        {steps.map(([number,title]) => <article key={number}>
          <span>{number}</span><h3>{title}</h3>
        </article>)}
      </div>
      <div className="thinking-tool-line"><strong>Methods I want to bring in:</strong> psychological research · consumer research · social and cultural psychology · creative testing</div>
    </section>

    <section className="thinking-references-compact thinking-compact-section" aria-labelledby="references-title">
      <div className="thinking-compact-heading">
        <div><div className="kicker">CREATIVE REFERENCES</div><h2 id="references-title">Work I keep coming back to.</h2></div>
      </div>
      <div className="reference-grid">
        <article><span className="mono">HUMOUR / PRODUCT TRUTH</span><h3>Fevicol</h3><p>A simple product promise turned into a memorable visual idea.</p></article>
        <article><span className="mono">CULTURE / TOPICALITY</span><h3>Amul</h3><p>Shared references and topical wit that invite collective recognition.</p></article>
        <article><span className="mono">BRAND / EVERYDAY LANGUAGE</span><h3>Thanda Matlab Coca-Cola</h3><p>A brand association woven into an everyday expression.</p></article>
      </div>
    </section>

    <section className="thinking-research-compact thinking-compact-section" aria-labelledby="research-work-title">
      <div className="thinking-compact-heading">
        <div><div className="kicker">RESEARCH &amp; COURSEWORK</div><h2 id="research-work-title">The questions behind the work.</h2></div>
        <p>Academic work that shows how I approach behaviour, meaning and evidence.</p>
      </div>
      <article className="research-proposal-card">
        <div className="research-proposal-card-meta"><span>QUALITATIVE RESEARCH METHODS · CIA 3</span><span>RESEARCH PROPOSAL</span></div>
        <div className="research-proposal-card-main">
          <div>
            <h3>Shifting Tongues,<br /><em>Shifting Selves.</em></h3>
            <p>Language choice and identity negotiation among bilingual young adults.</p>
          </div>
          <div className="research-card-question">
            <span>THE RESEARCH QUESTION</span>
            <p>How do bilingual young adults change language preference between family, peer and academic environments — and what does this say about identity?</p>
          </div>
        </div>
        <div className="research-proposal-card-footer">
          <div className="research-card-tags"><span>IPA</span><span>Interviews</span><span>14-day language diaries</span><span>6–10 proposed participants</span></div>
          <a href={`${import.meta.env.BASE_URL}research/shifting-tongues-proposal.html`} target="_blank" rel="noreferrer" className="research-open-document">Read the full proposal <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </article>

      <article className="research-secondary-card japan-culture-coursework">
        <div><span className="mono">COURSEWORK / GLOBAL LEADERSHIP &amp; CULTURE · BS1412</span><h3>Cultural Foundations of Business Practices in Japan</h3></div>
        <p>An academic paper examining how religious traditions and cultural values — including Shintoism, Buddhism and wa (harmony) — relate to Japanese social life. It also considers communication norms, senpai-kōhai relationships, social stratification and gender roles, alongside business practices such as nemawashi and the lifetime employment system.</p>
      </article>

      <article className="research-secondary-card">
        <div><span className="mono">COURSEWORK / CONSUMER BEHAVIOUR</span><h3>Greenwashing awareness &amp; consumer behaviour</h3></div>
        <p>Data collection and analysis exploring awareness of greenwashing and consumer behaviour. The research question, method and findings still need to be documented before making claims about the results.</p>
      </article>
    </section>
  </main>;
}

export function AboutPage() {
  const [activeSide, setActiveSide] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeInterest, setActiveInterest] = useState('Piano & music');
  const [heroNoteIndex, setHeroNoteIndex] = useState(0);
  const [activeQuickFact, setActiveQuickFact] = useState(0);

  const sides = [
    {
      label: '01 / THE CLASSROOM',
      title: 'Asking why.',
      copy: 'Psychology keeps me curious about behaviour, relationships, attention and the choices people make. Consumer psychology is where a lot of those questions meet my creative interests.',
      foot: 'READ · QUESTION · CONNECT',
      extra: 'I like looking beyond what people say they do and asking what might be shaping the decision: context, habits, emotion, social influence or the way information is presented.',
      tone: 'about-world-study',
      doodle: '?',
    },
    {
      label: '02 / THE REHEARSAL ROOM',
      title: 'Making a scene.',
      copy: 'Mime and street theatre taught me to tell stories with movement, timing and expression. Acting led me into writing and directing — and made collaboration a big part of the fun.',
      foot: 'ACT · WRITE · DIRECT',
      extra: 'I enjoy the collective process: taking a script or a loose idea into rehearsal, trying things out, changing what does not work and finding the moment when a scene finally clicks.',
      tone: 'about-world-stage',
      doodle: '✳',
    },
    {
      label: '03 / THE EDITING TIMELINE',
      title: 'Playing with the details.',
      copy: 'I enjoy piano, music, audio and video editing. A sound cue, a cut or a pause can completely change the rhythm of a story — I like experimenting with those details.',
      foot: 'LISTEN · CUT · REFINE',
      extra: 'I work with Adobe Premiere Pro, Audition and After Effects, and have also sound-designed the InBlooms Mime Duo performance.',
      tone: 'about-world-edit',
      doodle: '〰',
    },
  ];

  const chapters = [
    {
      period: '2024—25',
      title: 'The start: learning to tell stories on stage.',
      copy: 'I began with mime and street theatre. Time Wrath was my first mime, where I played the lead. I also performed in Why So Serious? and The Perfect Crime, then started taking on more of the making.',
      projects: [
        'Time Wrath — lead performer; 1st at Darpan ’24, Mood Indigo ’24 and VIT; 2nd at Enact.',
        'InBlooms Mime Duo — acted, directed, scripted and sound-designed; placed 2nd.',
        'One Two Ka Four — acted, directed and scripted for Blossoms ’25.',
        'Blossoms Procession — POC for the opening act.',
      ],
    },
    {
      period: '2025—26',
      title: 'The next chapter: taking on more roles.',
      copy: 'I started moving between performance, direction, writing and technical work — sometimes within the same production.',
      projects: [
        'Hari Patang — acting, direction and scriptwriting; played Red Light and Dhritrashtra.',
        'Ek Tha Raja — acting and lights handling.',
        'Ek Anokhi Bhasha — Street Play Sub-Head; ensemble performer and Netaji in Scene 1.',
        'Knock Knock — acting in the short film.',
      ],
    },
  ];

  const interests = [
    { name: 'Psychology', detail: 'Third-year B.Sc. Psychology student at CHRIST. I am especially curious about consumer behaviour and how people interpret messages, form impressions and make choices.' },
    { name: 'Theatre & mime', detail: 'A big part of my university life. I have worked across acting, mime, street play, direction and scriptwriting.' },
    { name: 'Piano & music', detail: 'I play piano and enjoy exploring music. Sound is one of the details I notice when thinking about the mood and rhythm of a performance.' },
    { name: 'Sound design', detail: 'I sound-designed the InBlooms Mime Duo performance, and enjoy how music and sound can help shape a live story.' },
    { name: 'Video editing', detail: 'I work with Premiere Pro and After Effects, and enjoy shaping the pace and flow of a visual story.' },
    { name: 'Audio editing', detail: 'Adobe Audition is part of my toolkit for working with sound and audio.' },
  ];
  const selectedInterest = interests.find((item) => item.name === activeInterest) ?? interests[0];

  const heroNotes = [
    { eyebrow: 'THE HUMAN BEING BEHIND THE WORK', mark: 'A.', caption: 'A WORK IN PROGRESS — IN A GOOD WAY.' },
    { eyebrow: 'CURRENT STATUS: CURIOUS', mark: '?', caption: 'ASK / WONDER / REPEAT.' },
    { eyebrow: 'OFTEN FOUND SOMEWHERE BETWEEN', mark: '✳', caption: 'STAGE / SCREEN / SOUND.' },
  ];

  const quickFacts = [
    { question: 'What was my first mime?', answer: 'Time Wrath. I played the lead, and it became one of the first big milestones in my theatre journey.' },
    { question: 'What do I do offstage?', answer: 'Piano, music, audio and video editing. I like having something creative to tinker with even when there is no rehearsal.' },
    { question: 'A different kind of experience?', answer: 'A five-week internship at Mona Remedial Educational Centre, where I supported remedial educators, prepared teaching aids and assisted with classroom activities.' },
    { question: 'What happens behind the scenes?', answer: 'Alongside acting, I have worked on direction, scriptwriting, sound design and lights — depending on what the production needed.' },
  ];

  return <main className="wrap main-content about-page about-vibrant" id="main-content" data-testid="page-about">
    <header className="about-vibrant-hero">
      <div className="about-vibrant-copy">
        <div className="kicker">03 / ABOUT — A LITTLE MORE PERSONAL</div>
        <h1>I like figuring people out. <em>And making a bit of a scene.</em></h1>
        <p>I'm Ashley D'Mello — a psychology student, theatre person, occasional pianist and enthusiastic creative dabbler. Most of my interests come back to the same thing: people, stories, and why one tiny detail can change the way something feels.</p>
        <div className="about-vibrant-signoff"><span>CURIOUS BY DEFAULT</span><span>MAKING THINGS AS I GO ↘</span></div>
      </div>
      <div className="about-vibrant-collage" aria-label="A playful typographic collage representing psychology and creative practice">
        <div className="about-collage-orbit"></div>
        <div className="about-collage-card about-collage-card-back"><span>NOTES FROM THE PROCESS</span><strong>observe<br/>wonder<br/>repeat.</strong></div>
        <button type="button" className="about-collage-card about-collage-card-front about-collage-card-interactive" onClick={() => setHeroNoteIndex((current) => (current + 1) % heroNotes.length)} aria-label="Shuffle the collage note">
          <span>{heroNotes[heroNoteIndex].eyebrow}</span><strong>{heroNotes[heroNoteIndex].mark}</strong><i>✳</i><small>CLICK TO SHUFFLE ↻</small>
        </button>
        <span className="about-collage-tag about-collage-tag-one">PSYCH STUDENT</span>
        <span className="about-collage-tag about-collage-tag-two">THEATRE KID(ISH)</span>
        <span className="about-collage-caption">{heroNotes[heroNoteIndex].caption}</span>
      </div>
    </header>

    <section className="about-vibrant-intro">
      <div className="about-vibrant-side-label"><span className="kicker">THE SHORT STORY</span><span className="about-vibrant-side-number">01 / 04</span></div>
      <div className="about-vibrant-intro-copy">
        <p className="about-vibrant-lead">Somewhere between a psychology lecture and a theatre rehearsal, I realised I really like understanding how people tick — and then finding creative ways to communicate with them.</p>
        <div className="about-vibrant-paragraphs">
          <p>I'm in my third year of B.Sc. Psychology at CHRIST. I like the questions psychology opens up: what people notice, what they remember, what influences a decision, and how the same message can mean different things to different people.</p>
          <p>Outside class, I've spent a lot of time around theatre. I began with acting and mime, then gradually got pulled into scripting, direction and the behind-the-scenes details that make a performance work. I like that theatre is equal parts planning and improvising — you can prepare everything, and an audience will still surprise you.</p>
        </div>
      </div>
    </section>

    <section className="about-vibrant-worlds">
      <div className="about-vibrant-section-head">
        <div><span className="kicker">THREE PLACES YOU'LL FIND ME</span><h2>Different rooms.<br/><em>Same curiosity.</em></h2></div>
        <p>Pick a room. There's a little more behind each one.</p>
      </div>
      <div className="about-vibrant-world-grid" role="group" aria-label="Explore different sides of Ashley">
        {sides.map((side,index) => <button
          type="button"
          key={side.label}
          className={`about-vibrant-world ${side.tone} ${activeSide===index?'is-selected':''}`}
          aria-pressed={activeSide===index}
          onClick={() => setActiveSide(index)}
        >
          <span className="about-vibrant-world-index">{side.label}</span>
          <span className={`about-world-doodle about-world-doodle-${index===0?'study':index===1?'stage':'edit'}`} aria-hidden="true">{side.doodle}</span>
          <strong className="about-vibrant-world-title">{side.title}</strong>
          <span className="about-vibrant-world-summary">{side.copy}</span>
          <span className="about-vibrant-world-foot">{side.foot}<b>{activeSide===index?'SELECTED ✓':'OPEN THIS ↗'}</b></span>
        </button>)}
      </div>
      <article className="about-world-detail" aria-live="polite" key={activeSide}>
        <div><span className="kicker">A LITTLE MORE ABOUT THIS SIDE</span><h3>{sides[activeSide].title}</h3></div>
        <p>{sides[activeSide].extra}</p>
      </article>
    </section>

    <section className="about-vibrant-detour">
      <div className="about-detour-stamp">A DIFFERENT<br/>KIND OF<br/><strong>LEARNING</strong></div>
      <div className="about-detour-copy">
        <span className="kicker">A FIVE-WEEK DETOUR / MONA REMEDIAL EDUCATIONAL CENTRE</span>
        <h2>Learning to pay attention in a different way.</h2>
        <p>During my internship at Mona Remedial Educational Centre, I supported remedial educators, helped prepare teaching aids and assisted with classroom activities. I also got to observe and assist the wider team. It was a practical reminder that communication is never one-size-fits-all — you have to pay attention to the person in front of you.</p>
      </div>
    </section>

    <section className="about-vibrant-timeline">
      <div className="about-vibrant-section-head">
        <div><span className="kicker">A QUICK LOOK BACK</span><h2>How it all<br/><em>started to stack up.</em></h2></div>
        <p>Choose a chapter to see how the work evolved.</p>
      </div>
      <div className="about-timeline-tabs" role="tablist" aria-label="Creative timeline">
        {chapters.map((chapter,index)=><button type="button" role="tab" aria-selected={activeChapter===index} aria-controls="about-timeline-panel" className={activeChapter===index?'is-active':''} onClick={()=>setActiveChapter(index)} key={chapter.period}>{chapter.period}<span>{index===0?'THE START':'MORE TO MAKE'}</span></button>)}
      </div>
      <article className="about-timeline-panel" id="about-timeline-panel" role="tabpanel" aria-live="polite" key={activeChapter}>
        <div className="about-timeline-panel-heading"><span className="kicker">{chapters[activeChapter].period}</span><h3>{chapters[activeChapter].title}</h3><p>{chapters[activeChapter].copy}</p></div>
        <ul>{chapters[activeChapter].projects.map((project)=><li key={project}>{project}</li>)}</ul>
      </article>
      <Link href="/work" className="about-vibrant-work-link" data-testid="link-about-full-archive">The projects have their own stories. Take a look <ArrowRight size={16} aria-hidden="true" /></Link>
    </section>

    <section className="about-quickfire">
      <div className="about-vibrant-section-head">
        <div><span className="kicker">QUICK-FIRE / NO REHEARSALS</span><h2>A few things you<br/><em>could ask me.</em></h2></div>
        <p>Pick a question. I'll give you the short version.</p>
      </div>
      <div className="about-quickfire-layout">
        <div className="about-quickfire-questions" role="group" aria-label="Quick questions about Ashley">
          {quickFacts.map((fact,index)=><button type="button" key={fact.question} className={activeQuickFact===index?'is-active':''} aria-pressed={activeQuickFact===index} onClick={()=>setActiveQuickFact(index)}>
            <span>0{index+1}</span><strong>{fact.question}</strong><b>{activeQuickFact===index?'−':'+'}</b>
          </button>)}
        </div>
        <article className="about-quickfire-answer" aria-live="polite" key={activeQuickFact}>
          <span className="kicker">THE SHORT ANSWER / 0{activeQuickFact+1}</span>
          <p>{quickFacts[activeQuickFact].answer}</p>
          <span className="about-quickfire-doodle" aria-hidden="true">✳</span>
        </article>
      </div>
    </section>

    <section className="about-vibrant-bottom">
      <div className="about-bottom-quote"><span className="kicker">CURRENTLY COLLECTING</span><p>Interesting people. Unexpected stories. New ways to make an idea land.</p><span className="about-bottom-quote-mark">✳</span></div>
      <div className="about-bottom-list">
        <div><span className="kicker">PICK A RABBIT HOLE</span><div className="about-bottom-chip-heading"><span>CHOOSE ONE</span><button type="button" onClick={() => setActiveInterest((current) => interests[(interests.findIndex((item)=>item.name===current)+1)%interests.length].name)}>SURPRISE ME ↗</button></div><div className="about-bottom-chips" role="group" aria-label="Explore personal interests">{interests.map((item)=><button type="button" key={item.name} aria-pressed={activeInterest===item.name} className={activeInterest===item.name?'is-active':''} onClick={()=>setActiveInterest(item.name)}>{item.name}</button>)}</div>
          <article className="about-interest-detail" aria-live="polite" key={selectedInterest.name}><span className="kicker">CURRENTLY INTO / {selectedInterest.name.toUpperCase()}</span><p>{selectedInterest.detail}</p></article>
        </div>
        <div><span className="kicker">TOOLS I PLAY WITH</span><div className="about-bottom-chips about-tool-chips"><span>Premiere Pro</span><span>Audition</span><span>After Effects</span></div></div>
      </div>
    </section>
  </main>;
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brand, setBrand] = useState('');
  const [offering, setOffering] = useState('');
  const [audience, setAudience] = useState('');
  const [objective, setObjective] = useState('Build awareness');
  const [support, setSupport] = useState('Creative concept & script');
  const [tone, setTone] = useState('Open to ideas');
  const [timeline, setTimeline] = useState('Flexible / to be discussed');
  const [context, setContext] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const supportOptions = [
    { title: 'Creative concept & script', tag: '01 / THE IDEA', description: 'Campaign concepts, story routes, scripts and creative direction.' },
    { title: 'Direction & production', tag: '02 / THE MAKING', description: 'Performance-led storytelling, short-form video and production.' },
    { title: 'Consumer insight & research', tag: '03 / THE WHY', description: 'Audience behaviour, consumer psychology and research.' },
    { title: 'A bit of everything', tag: '04 / THE FULL PICTURE', description: 'Taking an idea from the first brief towards its final execution.' },
    { title: 'Something else', tag: '05 / THE UNEXPECTED', description: 'A collaboration, opportunity or idea that does not fit a neat category.' },
  ];

  const briefLines = [
    `Name: ${name.trim() || 'Not provided'}`,
    `Email: ${email.trim() || 'Not provided'}`,
    `Brand / organisation: ${brand.trim() || 'Not provided'}`,
    `Product / service: ${offering.trim() || 'Not provided'}`,
    `Audience: ${audience.trim() || 'Still to be defined'}`,
    `Objective: ${objective}`,
    `Looking for: ${support}`,
    `Desired feel: ${tone}`,
    `Timeline: ${timeline}`,
    context.trim() ? `Additional context: ${context.trim()}` : '',
  ].filter(Boolean);

  const subject = brand.trim() ? `A project idea for ${brand.trim()}` : 'A project idea / collaboration';
  const emailBody = `Hi Ashley,\n\nI'd like to get a conversation started. Here's a little about what I'm thinking:\n\n${briefLines.join('\n')}\n\nLooking forward to hearing from you.\n\n${name.trim() || '[Your name]'}`;
  const mailtoHref = `mailto:ashleydmello412@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  const copyBrief = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${emailBody}`);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  };
  const resetBrief = () => {
    setName(''); setEmail(''); setBrand(''); setOffering(''); setAudience('');
    setObjective('Build awareness'); setSupport('Creative concept & script');
    setTone('Open to ideas'); setTimeline('Flexible / to be discussed');
    setContext(''); setCopyState('idle');
  };

  return <main className="wrap main-content contact-page contact-builder-page" id="main-content" data-testid="page-contact">
    <header className="contact-builder-header">
      <div className="kicker">04 / CONTACT — LET'S GET INTO THE DETAILS</div>
      <h1>Every good project<br/>starts <em>somewhere.</em></h1>
      <div className="contact-builder-header-bottom">
        <p>Got a brand, a brief, a half-formed idea or just a question? Put a few details down. You don't need to have everything figured out before getting in touch.</p>
        <span className="contact-builder-header-note">NO PERFECT BRIEF REQUIRED <b>✳</b></span>
      </div>
    </header>

    <section className="contact-builder-shell" aria-label="Build a project enquiry">
      <div className="contact-builder-form">
        <div className="contact-builder-form-top">
          <span className="kicker">THE PROJECT STARTER</span>
          <button type="button" onClick={resetBrief} className="contact-reset-button">RESET ↺</button>
        </div>
        <div className="contact-builder-step-title"><span>01</span><h2>First, the basics.</h2><small>ABOUT THE PROJECT</small></div>
        <div className="contact-builder-fields contact-builder-fields-two">
          <label className="contact-builder-field">
            <span>YOUR NAME</span>
            <input value={name} maxLength={70} onChange={(event)=>{setName(event.target.value);setCopyState('idle');}} placeholder="What should I call you?" autoComplete="name"/>
          </label>
          <label className="contact-builder-field">
            <span>YOUR EMAIL</span>
            <input type="email" value={email} maxLength={120} onChange={(event)=>{setEmail(event.target.value);setCopyState('idle');}} placeholder="Where can I reach you?" autoComplete="email"/>
          </label>
          <label className="contact-builder-field">
            <span>BRAND / ORGANISATION</span>
            <input value={brand} maxLength={90} onChange={(event)=>{setBrand(event.target.value);setCopyState('idle');}} placeholder="e.g. A neighbourhood café"/>
          </label>
          <label className="contact-builder-field">
            <span>PRODUCT / SERVICE</span>
            <input value={offering} maxLength={110} onChange={(event)=>{setOffering(event.target.value);setCopyState('idle');}} placeholder="What are we talking about?"/>
          </label>
          <label className="contact-builder-field contact-builder-field-wide">
            <span>WHO ARE YOU TRYING TO REACH?</span>
            <input value={audience} maxLength={140} onChange={(event)=>{setAudience(event.target.value);setCopyState('idle');}} placeholder="e.g. First-time buyers, students, working parents..."/>
          </label>
        </div>

        <div className="contact-builder-step-title contact-builder-step-spaced"><span>02</span><h2>What's the job to be done?</h2><small>THE OBJECTIVE</small></div>
        <div className="contact-objective-grid" role="group" aria-label="Choose the project objective">
          {[
            ['Build awareness','Get noticed'],
            ['Change brand perception','Shift the impression'],
            ['Launch a product or service','Make an entrance'],
            ['Build an emotional connection','Make it matter'],
            ['Encourage trial or purchase','Move to action'],
            ['Explore an idea','Still figuring it out'],
          ].map(([value,label],index)=><button type="button" key={value} className={objective===value?'is-active':''} aria-pressed={objective===value} onClick={()=>{setObjective(value);setCopyState('idle');}}>
            <span>0{index+1}</span><strong>{value}</strong><small>{label}</small><b>{objective===value?'✓':'↗'}</b>
          </button>)}
        </div>

        <div className="contact-builder-step-title contact-builder-step-spaced"><span>03</span><h2>Where could I come in?</h2><small>THE COLLABORATION</small></div>
        <div className="contact-support-list" role="group" aria-label="Choose the kind of support">
          {supportOptions.map((option)=><button type="button" key={option.title} className={support===option.title?'is-active':''} aria-pressed={support===option.title} onClick={()=>{setSupport(option.title);setCopyState('idle');}}>
            <span>{option.tag}</span><strong>{option.title}</strong><small>{option.description}</small><b>{support===option.title?'✓':'+'}</b>
          </button>)}
        </div>

        <div className="contact-builder-fields contact-builder-fields-two contact-builder-fields-lower">
          <label className="contact-builder-field">
            <span>THE FEEL / TONE YOU HAVE IN MIND</span>
            <select value={tone} onChange={(event)=>{setTone(event.target.value);setCopyState('idle');}}>
              <option>Open to ideas</option><option>Playful</option><option>Warm &amp; human</option><option>Bold &amp; disruptive</option><option>Thoughtful</option><option>Premium / understated</option>
            </select>
          </label>
          <label className="contact-builder-field">
            <span>WHEN ARE YOU THINKING?</span>
            <select value={timeline} onChange={(event)=>{setTimeline(event.target.value);setCopyState('idle');}}>
              <option>Flexible / to be discussed</option><option>As soon as possible</option><option>Within the next few weeks</option><option>Next 1–3 months</option><option>Just exploring for now</option>
            </select>
          </label>
          <label className="contact-builder-field contact-builder-field-wide">
            <span>ANYTHING ELSE? (OPTIONAL)</span>
            <textarea rows={4} maxLength={900} value={context} onChange={(event)=>{setContext(event.target.value);setCopyState('idle');}} placeholder="A challenge you're facing, a reference you love, a deadline, a rough thought — anything you'd like me to know."/>
          </label>
        </div>
      </div>

      <aside className="contact-live-preview" aria-live="polite">
        <div className="contact-live-preview-top"><span className="kicker">LIVE BRIEF PREVIEW</span><span>UPDATING AS YOU TYPE <i>●</i></span></div>
        <div className="contact-live-preview-stamp">LET'S<br/>MAKE<br/><strong>IT.</strong></div>
        <div className="contact-live-preview-brand"><span>THE BRAND</span><strong>{brand.trim() || 'Your brand goes here'}</strong><small>{offering.trim() || 'Product / service'}</small></div>
        <div className="contact-live-preview-details">
          <div><span>THE AUDIENCE</span><strong>{audience.trim() || 'To be defined'}</strong></div>
          <div><span>THE OBJECTIVE</span><strong>{objective}</strong></div>
          <div><span>THE COLLABORATION</span><strong>{support}</strong></div>
          <div><span>THE FEEL</span><strong>{tone}</strong></div>
          <div><span>THE TIMELINE</span><strong>{timeline}</strong></div>
        </div>
        <div className="contact-live-preview-note"><span>ONE LAST THING</span><p>{context.trim() || 'Add a little context on the left. Or leave it blank — we can work it out together.'}</p></div>
        <div className="contact-live-preview-actions">
          <a className="contact-send-button" href={mailtoHref}>Send this my way <ArrowUpRight size={17} aria-hidden="true"/></a>
          <button type="button" className="contact-copy-brief-button" onClick={copyBrief}>{copyState==='copied'?'Copied ✓':copyState==='error'?'Copy unavailable':'Copy brief ↗'}</button>
        </div>
        <p className="contact-live-preview-foot">THIS OPENS YOUR EMAIL APP WITH A DRAFT. REVIEW IT, EDIT IT, THEN SEND.</p>
      </aside>
    </section>

    <section className="contact-bottom-row">
      <div><span className="kicker">NOT A FORM PERSON?</span><h2>Skip the brief. Just say hello.</h2><p>You can reach me directly, too.</p></div>
      <div className="contact-bottom-links">
        <a href="mailto:ashleydmello412@gmail.com"><span>EMAIL</span><strong>ashleydmello412@gmail.com ↗</strong></a>
        <a href="tel:+919653281997"><span>PHONE</span><strong>+91 96532 81997 ↗</strong></a>
        <a href="https://www.linkedin.com/in/ashley-d-mello-a48072341" target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>Connect with me ↗</strong></a>
      </div>
    </section>
  </main>;
}


type SpecAdDraft = {
  id: string;
  title: string;
  brand: string;
  format: string;
  audience: string;
  objective: string;
  insight: string;
  idea: string;
  contribution: string;
  fileName: string;
  mediaType: string;
  media: Blob;
  createdAt: number;
};

function openSpecAdsDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('This browser does not support local draft storage.'));
      return;
    }
    const request = window.indexedDB.open('creative-archive-spec-ads', 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains('drafts')) {
        database.createObjectStore('drafts', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Could not open local draft storage.'));
  });
}

async function readSpecAdDrafts(): Promise<SpecAdDraft[]> {
  const database = await openSpecAdsDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction('drafts', 'readonly').objectStore('drafts').getAll();
    request.onsuccess = () => {
      database.close();
      resolve((request.result as SpecAdDraft[]).sort((a, b) => b.createdAt - a.createdAt));
    };
    request.onerror = () => {
      database.close();
      reject(request.error ?? new Error('Could not read saved drafts.'));
    };
  });
}

async function saveSpecAdDraft(draft: SpecAdDraft): Promise<void> {
  const database = await openSpecAdsDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('drafts', 'readwrite');
    transaction.objectStore('drafts').put(draft);
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = () => { database.close(); reject(transaction.error ?? new Error('Could not save this draft.')); };
    transaction.onabort = () => { database.close(); reject(transaction.error ?? new Error('Saving this draft was cancelled.')); };
  });
}

async function removeSpecAdDraft(id: string): Promise<void> {
  const database = await openSpecAdsDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('drafts', 'readwrite');
    transaction.objectStore('drafts').delete(id);
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = () => { database.close(); reject(transaction.error ?? new Error('Could not delete this draft.')); };
  });
}

export function SpecAdsPage() {
  const [drafts, setDrafts] = useState<SpecAdDraft[]>([]);
  const [databaseStatus, setDatabaseStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [format, setFormat] = useState('Video ad');
  const [audience, setAudience] = useState('');
  const [objective, setObjective] = useState('Build awareness');
  const [insight, setInsight] = useState('');
  const [idea, setIdea] = useState('');
  const [contribution, setContribution] = useState('Concept, script & direction');
  const [draftUrls, setDraftUrls] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;
    readSpecAdDrafts().then((items) => {
      if (!active) return;
      setDrafts(items);
      setDatabaseStatus('ready');
    }).catch(() => {
      if (!active) return;
      setDatabaseStatus('unavailable');
      setNotice('Local draft storage is unavailable in this browser. You can still preview a file, but cannot save it here.');
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setSelectedPreview('');
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setSelectedPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    const next: Record<string, string> = {};
    drafts.forEach((draft) => { next[draft.id] = URL.createObjectURL(draft.media); });
    setDraftUrls(next);
    return () => Object.values(next).forEach((url) => URL.revokeObjectURL(url));
  }, [drafts]);

  const acceptFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setNotice('Please choose an image or video file.');
      return;
    }
    if (file.size > 250 * 1024 * 1024) {
      setNotice('That file is over 250 MB. Please choose a smaller export.');
      return;
    }
    setSelectedFile(file);
    setNotice('');
    if (file.type.startsWith('video/')) setFormat('Video ad');
    else setFormat('Static / print ad');
    if (!title.trim()) setTitle(file.name.replace(/\\.[^.]+$/, '').replace(/[-_]+/g, ' '));
  };

  const saveDraft = async () => {
    if (!selectedFile) {
      setNotice('Add an image or video first so the draft has something to show.');
      return;
    }
    if (databaseStatus !== 'ready') {
      setNotice('Draft storage is not available. Try another browser or save the file locally for now.');
      return;
    }
    setIsSaving(true);
    setNotice('');
    const draft: SpecAdDraft = {
      id: `spec-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim() || selectedFile.name,
      brand: brand.trim() || 'Unbranded concept',
      format,
      audience: audience.trim() || 'Not specified',
      objective,
      insight: insight.trim() || 'Not added yet',
      idea: idea.trim() || 'Not added yet',
      contribution: contribution.trim(),
      fileName: selectedFile.name,
      mediaType: selectedFile.type,
      media: selectedFile,
      createdAt: Date.now(),
    };
    try {
      await saveSpecAdDraft(draft);
      setDrafts((current) => [draft, ...current]);
      setSelectedFile(null);
      setTitle(''); setBrand(''); setAudience(''); setInsight(''); setIdea('');
      setObjective('Build awareness'); setFormat('Video ad'); setContribution('Concept, script & direction');
      setNotice('Saved to your local Spec Ads studio.');
    } catch {
      setNotice('Could not save this draft. Check available browser storage and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteDraft = async (id: string) => {
    try {
      await removeSpecAdDraft(id);
      setDrafts((current) => current.filter((item) => item.id !== id));
      setNotice('Draft removed from this browser.');
    } catch {
      setNotice('Could not remove this draft.');
    }
  };

  const copyDraftDetails = async (draft: SpecAdDraft) => {
    const text = [
      draft.title,
      `Brand: ${draft.brand}`,
      `Format: ${draft.format}`,
      `Audience: ${draft.audience}`,
      `Objective: ${draft.objective}`,
      `Insight: ${draft.insight}`,
      `Creative idea: ${draft.idea}`,
      `My contribution: ${draft.contribution}`,
      `Asset: ${draft.fileName}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setNotice('Spec ad details copied.');
    } catch {
      setNotice('Clipboard access is unavailable in this browser.');
    }
  };

  return <main className="wrap main-content spec-ads-page" id="main-content" data-testid="page-spec-ads">
    <header className="spec-ads-hero">
      <div className="kicker">05 / SPEC ADS — THE SELF-INITIATED SIDE</div>
      <h1>No client brief.<br/><em>No problem.</em></h1>
      <div className="spec-ads-hero-bottom">
        <p>A space for ideas I wanted to make anyway. Campaign concepts, experiments, scripts and ads built around brands, audiences and observations that caught my attention.</p>
        <div className="spec-ads-hero-sticker"><span>MADE JUST<br/>BECAUSE</span><strong>✳</strong></div>
      </div>
      <div className="spec-ads-hero-meta"><span>SELF-INITIATED CONCEPTS</span><span>IDEA → EXECUTION</span><span>NOT COMMISSIONED WORK</span></div>
    </header>

    <section className="spec-ads-empty-showcase">
      <div>
        <span className="kicker">THE SPEC AD SHELF</span>
        <h2>Your next idea<br/><em>goes here.</em></h2>
        <p>Published spec ads will appear here as a curated gallery. Start by adding your first concept to the studio below.</p>
        <button type="button" onClick={() => document.getElementById('spec-ad-studio')?.scrollIntoView({behavior:'smooth',block:'start'})}>Add a spec ad <ArrowDownRight size={17} aria-hidden="true"/></button>
      </div>
      <div className="spec-ads-empty-art" aria-hidden="true">
        <span className="spec-empty-frame spec-empty-frame-one">THE IDEA</span>
        <span className="spec-empty-frame spec-empty-frame-two">THE AD</span>
        <span className="spec-empty-centre">?</span>
      </div>
    </section>

    <section className="spec-ad-studio" id="spec-ad-studio">
      <div className="spec-ad-studio-heading">
        <div><span className="kicker">THE UPLOAD DESK / 01</span><h2>Put an idea<br/><em>on the table.</em></h2></div>
        <p>Add the actual creative, then give it enough context for someone to understand the thinking behind it.</p>
      </div>

      <div className="spec-ad-studio-grid">
        <div className="spec-ad-editor">
          <div className="spec-ad-editor-top"><span>01 / CREATIVE FILE</span><span>IMAGE OR VIDEO · MAX 250 MB</span></div>
          <label className={`spec-ad-dropzone${isDragging?' is-dragging':''}`} onDragOver={(event)=>{event.preventDefault();setIsDragging(true);}} onDragLeave={()=>setIsDragging(false)} onDrop={(event)=>{event.preventDefault();setIsDragging(false);acceptFile(event.dataTransfer.files[0]);}}>
            <input type="file" accept="image/*,video/mp4,video/webm,video/quicktime" onChange={(event)=>acceptFile(event.target.files?.[0])}/>
            {selectedPreview ? <div className="spec-ad-selected-preview">
              {selectedFile?.type.startsWith('video/') ? <video src={selectedPreview} controls /> : <img src={selectedPreview} alt="Selected spec ad preview"/>}
              <span className="spec-ad-file-chip">{selectedFile?.name}</span>
            </div> : <div className="spec-ad-drop-prompt"><span className="spec-ad-upload-icon"><FileUp size={24}/></span><strong>Drop your ad here.</strong><span>Or browse your files to upload a preview.</span><small>MP4 · MOV · WEBM · JPG · PNG · WEBP</small></div>}
          </label>
          <div className="spec-ad-file-actions">
            <label className="spec-ad-browse-button">Browse files<input type="file" accept="image/*,video/mp4,video/webm,video/quicktime" onChange={(event)=>acceptFile(event.target.files?.[0])}/></label>
            {selectedFile && <button type="button" onClick={()=>setSelectedFile(null)} className="spec-ad-clear-file">Remove file <X size={14}/></button>}
          </div>

          <div className="spec-ad-editor-top spec-ad-details-top"><span>02 / THE THINKING</span><span>GIVE THE IDEA A BACKSTORY</span></div>
          <div className="spec-ad-fields">
            <label><span>PROJECT / CAMPAIGN NAME</span><input value={title} onChange={(event)=>setTitle(event.target.value)} placeholder="e.g. The Other Side of the Label"/></label>
            <label><span>BRAND</span><input value={brand} onChange={(event)=>setBrand(event.target.value)} placeholder="The brand this concept is for"/></label>
            <label><span>FORMAT</span><select value={format} onChange={(event)=>setFormat(event.target.value)}><option>Video ad</option><option>Static / print ad</option><option>Social media campaign</option><option>Audio ad</option><option>Campaign concept</option><option>Other</option></select></label>
            <label><span>TARGET AUDIENCE</span><input value={audience} onChange={(event)=>setAudience(event.target.value)} placeholder="Who is this speaking to?"/></label>
            <label className="spec-ad-field-wide"><span>OBJECTIVE</span><select value={objective} onChange={(event)=>setObjective(event.target.value)}><option>Build awareness</option><option>Change brand perception</option><option>Launch a product or service</option><option>Build an emotional connection</option><option>Encourage trial or purchase</option><option>Strengthen brand association</option><option>Other / exploratory</option></select></label>
            <label className="spec-ad-field-wide"><span>THE INSIGHT / OBSERVATION</span><textarea rows={3} value={insight} onChange={(event)=>setInsight(event.target.value)} placeholder="What human behaviour, tension or observation started this idea?"/></label>
            <label className="spec-ad-field-wide"><span>THE CREATIVE IDEA</span><textarea rows={4} value={idea} onChange={(event)=>setIdea(event.target.value)} placeholder="What's the central thought? How does the ad bring it to life?"/></label>
            <label className="spec-ad-field-wide"><span>MY CONTRIBUTION</span><input value={contribution} onChange={(event)=>setContribution(event.target.value)} placeholder="Concept, script, direction, editing, production..."/></label>
          </div>
          <button type="button" className="spec-ad-save-button" onClick={saveDraft} disabled={isSaving || databaseStatus==='loading' || databaseStatus==='unavailable'}>{isSaving?'Saving draft…':'Save to my Spec Ads studio'} <ArrowUpRight size={17}/></button>
          {notice && <p className="spec-ad-notice" role="status">{notice}</p>}
        </div>

        <aside className="spec-ad-studio-aside">
          <div className="spec-ad-studio-aside-top"><span className="kicker">A NOTE ABOUT UPLOADS</span><span className="spec-ad-local-label"><i/> LOCAL STUDIO</span></div>
          <h3>Your work stays yours.</h3>
          <p>This page saves drafts in this browser on this device. Files are not sent to a server and are not visible to public visitors.</p>
          <div className="spec-ad-steps">
            <div><b>01</b><span>Choose an image or video file.</span></div>
            <div><b>02</b><span>Add the brand, audience and thinking behind it.</span></div>
            <div><b>03</b><span>Save it here as a local draft.</span></div>
            <div><b>04</b><span>When ready, add the approved asset to the live portfolio repository to publish it.</span></div>
          </div>
          <div className="spec-ad-storage-status">{databaseStatus==='loading'?'CHECKING LOCAL STORAGE…':databaseStatus==='ready'?'BROWSER STORAGE READY':'BROWSER STORAGE UNAVAILABLE'}</div>
        </aside>
      </div>
    </section>

    <section className="spec-ad-drafts">
      <div className="spec-ad-drafts-heading"><div><span className="kicker">YOUR WORKSPACE / 02</span><h2>Saved <em>drafts.</em></h2></div><span>{drafts.length.toString().padStart(2,'0')} {drafts.length===1?'DRAFT':'DRAFTS'}</span></div>
      {drafts.length===0 ? <div className="spec-ad-drafts-empty"><span>✳</span><p>No drafts yet. Your first upload will show up here.</p></div> :
        <div className="spec-ad-draft-grid">
          {drafts.map((draft)=><article className="spec-ad-draft-card" key={draft.id}>
            <div className="spec-ad-draft-media">
              {draft.mediaType.startsWith('video/') ? <video src={draftUrls[draft.id]} controls preload="metadata"/> : <img src={draftUrls[draft.id]} alt={draft.title}/>}
              <span>LOCAL DRAFT</span>
            </div>
            <div className="spec-ad-draft-body">
              <div className="spec-ad-draft-meta"><span>{draft.format}</span><span>{new Date(draft.createdAt).toLocaleDateString()}</span></div>
              <h3>{draft.title}</h3>
              <p>{draft.brand} · {draft.objective}</p>
              <div className="spec-ad-draft-actions">
                <a href={draftUrls[draft.id]} download={draft.fileName}><Download size={14}/> Asset</a>
                <button type="button" onClick={()=>copyDraftDetails(draft)}>Copy details</button>
                <button type="button" onClick={()=>deleteDraft(draft.id)} aria-label={`Delete ${draft.title}`}><Trash2 size={14}/> Delete</button>
              </div>
            </div>
          </article>)}
        </div>}
    </section>
  </main>;
}

export function NotFoundPage() {
  return <main className="wrap not-found" id="main-content" data-testid="page-not-found"><div className="kicker">404 / OUT OF FRAME</div><h1>That page isn't in this archive.</h1><Link href="/" className="button" data-testid="link-home-from-404">Back to the archive <ArrowRight size={16} /></Link></main>;
}
