import { useMemo, useState, type PointerEvent } from 'react';
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
  const interests = ['Psychology', 'Theatre', 'Mime & street play', 'Piano & music', 'Sound', 'Video editing', 'Scriptwriting', 'Direction'];
  const tools = ['Adobe Premiere Pro', 'Adobe Audition', 'After Effects'];
  return <main className="wrap main-content about-page" id="main-content" data-testid="page-about">
    <header className="page-intro about-intro">
      <div className="kicker">03 / ABOUT — THE PERSON BEHIND THE WORK</div>
      <h1 className="page-title">Hi, I'm Ashley. I like stories, people, and figuring out what makes an idea stick.</h1>
      <p>I'm a third-year B.Sc. Psychology student at CHRIST, with one foot in the world of human behaviour and the other usually somewhere around a rehearsal room, a script or an editing timeline.</p>
    </header>

    <section className="about-positioning">
      <div className="about-positioning-label kicker">A LITTLE CONTEXT</div>
      <p>I didn't arrive at creative work through one neat route. Psychology made me curious about people; theatre gave me a place to turn that curiosity into something other people could experience.</p>
    </section>

    <section className="about-layout section">
      <div className="about-block"><div className="kicker">THE THINGS THAT SHAPE ME</div><h2>Curiosity in the classroom. Creativity everywhere else.</h2></div>
      <div className="about-story">
        <p className="about-copy">Psychology is the part of my life that keeps me asking questions. I'm interested in how people think, feel, make decisions and relate to the world around them — from everyday social behaviour to the way people respond to brands and stories.</p>
        <p>Outside lectures, theatre has become a big part of my university experience. I started out performing and gradually found myself wanting to be involved in more of the process: writing, directing, working with sound and lights, and figuring out how all the pieces fit together. Mime and street theatre have been especially fun because they make you communicate an entire idea with movement, timing, expression and whatever the audience brings into the moment.</p>
        <p>I also spent five weeks interning at Mona Remedial Educational Centre, where I supported remedial educators, helped prepare teaching aids and assisted with classroom activities. It was a different kind of learning experience — one that involved paying attention, adapting how information was presented and understanding the value of patient, practical support.</p>
        <p>I'm still figuring out exactly where all these interests will take me. I know I want to keep working where psychology and creative storytelling can inform each other — especially in advertising, film and other forms of communication.</p>
      </div>
    </section>

    <section className="about-theatre section">
      <div className="section-head">
        <div><div className="kicker">OFFSTAGE, TOO</div><h2>Some of the things I keep coming back to.</h2></div>
        <p className="section-note">Not everything I enjoy making fits neatly into a project title or a role description.</p>
      </div>
      <div className="about-theatre-grid about-personal-grid">
        <article><span className="mono">01 / MUSIC</span><h3>Piano, playlists &amp; sound</h3><p>I play piano, enjoy exploring music, and like thinking about how sound changes the mood and rhythm of a performance.</p></article>
        <article><span className="mono">02 / MAKING</span><h3>Editing &amp; experimenting</h3><p>I enjoy working with video and audio — shaping a sequence, finding its pace, and seeing how small editing choices change the way a story feels.</p></article>
        <article><span className="mono">03 / PEOPLE</span><h3>Stories, perspectives &amp; conversations</h3><p>I'm drawn to stories that make me look at familiar things differently, and to creative spaces where people bring very different ideas to the same table.</p></article>
      </div>
    </section>

    <section className="about-personal-footer">
      <div className="about-personal-note">
        <span className="kicker">CURRENTLY EXPLORING</span>
        <p>How an observation about people can turn into a concept, a script, a performance, a film — or an idea that takes a completely different shape.</p>
      </div>
      <div className="about-personal-skills">
        <div className="kicker">A FEW INTERESTS &amp; TOOLS</div>
        <div className="skills" data-testid="list-skills">{interests.map((item) => <span key={item}>{item}</span>)}{tools.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </section>

    <div className="about-bottom-link">
      <span className="kicker">WHEN YOU'RE READY</span>
      <Link href="/work" className="about-journey-link" data-testid="link-about-full-archive">Have a look at what I've been making <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </main>;
}

export function ContactPage() {
  const topics = [
    {
      title: 'Creative concepts & scripts',
      tag: '01 / THE IDEA',
      copy: 'A campaign thought, a story, a script, or the creative direction that gives it shape.',
      starter: "I'm reaching out about a creative idea for [brand / project]. The audience I'm thinking about is [audience], and the thought I'd like to explore is [idea].",
    },
    {
      title: 'Direction & production',
      tag: '02 / THE MAKING',
      copy: 'Performance-led storytelling, short-form video, production, or making an idea work on screen.',
      starter: "I'm getting in touch about a [film / video / production] project. The format and brief are [details], and I'm looking to discuss [role / collaboration].",
    },
    {
      title: 'Consumer insight & research',
      tag: '03 / THE WHY',
      copy: 'Audience behaviour, consumer psychology, research questions, and insight-led creative work.',
      starter: "I'd like to discuss a consumer insight or research question around [audience / behaviour]. The context is [details], and the question I'm exploring is [question].",
    },
    {
      title: 'Something else',
      tag: '04 / THE UNEXPECTED',
      copy: 'An opportunity, a collaboration, a question, or simply a conversation worth starting.',
      starter: "I came across your portfolio and wanted to connect about [opportunity / idea]. A little context: [details].",
    },
  ];
  const [activeTopic, setActiveTopic] = useState(0);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const starter = `Hi Ashley,\n\n${topics[activeTopic].starter}\n\nWould you be open to a conversation?\n\n[Your name]`;

  const copyStarter = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(starter);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  };

  return <main className="wrap main-content contact-page" id="main-content" data-testid="page-contact">
    <section className="contact-page-hero">
      <div className="contact-page-hero-copy">
        <div className="kicker">04 / CONTACT — OPEN INVITATION</div>
        <h1>The next good idea could start <em>here.</em></h1>
        <p>I'm interested in the space between understanding people and making things that connect with them. That's where psychology, storytelling and creative work meet.</p>
        <div className="contact-hero-tags"><span>PSYCHOLOGY</span><i>×</i><span>CREATIVE PRACTICE</span></div>
      </div>
      <div className="contact-page-art" aria-hidden="true">
        <div className="contact-art-orbit contact-art-orbit-one" />
        <div className="contact-art-orbit contact-art-orbit-two" />
        <div className="contact-art-sticker"><span>GOOD IDEAS</span><strong>START<br />WITH<br />PEOPLE.</strong><i>✳</i></div>
        <span className="contact-art-side-note">NOTICE<br />CONNECT<br />CREATE</span>
      </div>
      <span className="contact-page-index" aria-hidden="true">LET'S TALK / 04</span>
    </section>

    <section className="contact-conversation" aria-labelledby="contact-conversation-title">
      <div className="contact-section-heading">
        <div className="kicker">A PLACE TO BEGIN</div>
        <h2 id="contact-conversation-title">What are you thinking about?</h2>
        <p>Choose the closest starting point. No perfectly formed brief required.</p>
      </div>
      <div className="contact-conversation-grid">
        <div className="contact-topic-list" role="group" aria-label="Choose a conversation topic">
          {topics.map((topic, index) => <button
            key={topic.title}
            type="button"
            className={`contact-topic${activeTopic === index ? ' is-active' : ''}`}
            aria-pressed={activeTopic === index}
            onClick={() => { setActiveTopic(index); setCopyState('idle'); }}
            data-testid={`button-contact-topic-${index + 1}`}
          >
            <span className="contact-topic-tag">{topic.tag}</span>
            <strong>{topic.title}</strong>
            <span className="contact-topic-arrow" aria-hidden="true">↗</span>
          </button>)}
        </div>
        <div className="contact-starter-card" aria-live="polite">
          <div className="contact-starter-topline"><span className="kicker">A USEFUL FIRST MESSAGE</span><span className="contact-starter-number">0{activeTopic + 1} / 04</span></div>
          <h3>{topics[activeTopic].title}</h3>
          <p>{topics[activeTopic].copy}</p>
          <div className="contact-starter-message">{starter}</div>
          <button className="contact-copy-button" type="button" onClick={copyStarter} data-testid="button-copy-contact-starter">
            {copyState === 'copied' ? 'Copied to clipboard ✓' : copyState === 'error' ? 'Copy unavailable — select the text above' : 'Copy message starter ↗'}
          </button>
        </div>
      </div>
    </section>

    <section className="contact-next-step" aria-label="Explore the portfolio">
      <div>
        <div className="kicker">WANT A LITTLE MORE CONTEXT?</div>
        <h2>Take a look around first.</h2>
        <p>See the projects, the thinking behind them, and the creative direction I'm interested in exploring.</p>
      </div>
      <div className="contact-next-links">
        <Link href="/work" className="contact-next-link" data-testid="link-contact-work"><span>01 / SELECTED WORK</span><strong>Explore the archive ↗</strong></Link>
        <Link href="/thinking" className="contact-next-link" data-testid="link-contact-thinking"><span>02 / THE THINKING</span><strong>Explore psychology ↗</strong></Link>
      </div>
    </section>

    <section className="contact-direct-links-original" aria-label="Contact details">
      <div><span className="kicker">PREFER TO REACH ME DIRECTLY?</span><p>Your project can start with a message, a call or a connection.</p></div>
      <div className="contact-direct-links-original-grid">
        <a href="mailto:ashleydmello412@gmail.com"><span>EMAIL</span><strong>ashleydmello412@gmail.com ↗</strong></a>
        <a href="tel:+919653281997"><span>PHONE</span><strong>+91 96532 81997 ↗</strong></a>
        <a href="https://www.linkedin.com/in/ashley-d-mello-a48072341" target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>Connect with me ↗</strong></a>
      </div>
    </section>
  </main>;
}


export function NotFoundPage() {
  return <main className="wrap not-found" id="main-content" data-testid="page-not-found"><div className="kicker">404 / OUT OF FRAME</div><h1>That page isn't in this archive.</h1><Link href="/" className="button" data-testid="link-home-from-404">Back to the archive <ArrowRight size={16} /></Link></main>;
}
