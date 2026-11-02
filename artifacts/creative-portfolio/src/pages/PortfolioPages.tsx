import { useMemo, useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { categories, projects } from '../data/projects';

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
  const params = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) return <main className="wrap not-found" id="main-content"><div className="kicker">ARCHIVE / NOT FOUND</div><h1>This project isn't in the archive.</h1><Link href="/work" className="button" data-testid="link-back-to-archive">Back to the archive <ArrowLeft size={16} /></Link></main>;



  if (project.slug === 'ek-anokhi-bhasha' && project.caseStudy) {
    const caseStudy = project.caseStudy;
    const devices = [
      { number: '01', title: 'Multilingual sound', copy: 'The opening greeting moves across languages, while “Aeiiioa” gives the ensemble a shared sound that does not depend on one language.' },
      { number: '02', title: 'Satire & reversal', copy: 'The interview with Netaji turns the language test back on the people who claim to defend culture, exposing the contradictions in the scene.' },
      { number: '03', title: 'The weighing scale', copy: 'The kabadiwala’s weighing machine becomes “the weight of the nation” — a visual anchor for the news stories and their escalating consequences.' },
      { number: '04', title: 'Refrain & tonal shift', copy: '“Saare Jahan Se Achha” returns across the weighing-scale sequence, changing in meaning as the scenes move from comedy towards grief.' },
    ];

    return (
      <main className="wrap main-content bhasha-page" id="main-content" data-testid="project-detail-ek-anokhi-bhasha">
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
              <p className="bhasha-hero-summary">One. Unique. Language. A story about the things that make us different — and the ways we can still understand one another.</p>
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
          <div><strong>01</strong><span>CONFIRMED SCRIPT CREDIT</span></div>
          <div><strong>03</strong><span>STAGES OF THE CLOSING IDEA</span></div>
          <div className="bhasha-stat-note"><span>THE CENTRAL QUESTION</span><strong>Who gets to belong?</strong></div>
        </section>

        <section className="bhasha-question-section">
          <div className="bhasha-section-index">01 <span>/ THE CENTRAL QUESTION</span></div>
          <div className="bhasha-question-grid">
            <h2>When language<br /><em>becomes a boundary.</em></h2>
            <div>
              <p>{caseStudy.premise}</p>
              <span className="bhasha-note">A PLAY ABOUT THE DIFFERENCE BETWEEN SPEAKING DIFFERENTLY AND BELONGING LESS.</span>
            </div>
          </div>
        </section>

        <section className="bhasha-scenes-section">
          <div className="bhasha-section-heading">
            <div><div className="bhasha-section-index">02 <span>/ THE STORYLINE</span></div><h2>Four scenes.<br /><em>A change in tone.</em></h2></div>
            <p>The play moves from satire and classroom debate to a sequence of human consequences, before arriving at a shared language of acceptance.</p>
          </div>
          <div className="bhasha-scenes-grid">
            {caseStudy.scenes.map((scene, index) => (
              <article className={'bhasha-scene-card bhasha-scene-card-' + (index + 1)} key={scene.title}>
                <div className="bhasha-scene-top"><span>{String(index + 1).padStart(2, '0')}</span><i></i></div>
                <p className="bhasha-scene-kicker">{['THE SATIRE', 'THE QUESTION', 'THE CONSEQUENCE', 'THE RESPONSE'][index]}</p>
                <h3>{scene.title.split(' / ').slice(1).join(' / ')}</h3>
                <p>{scene.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bhasha-devices-section">
          <div className="bhasha-section-heading">
            <div><div className="bhasha-section-index">03 <span>/ THE PERFORMANCE LANGUAGE</span></div><h2>Not one language.<br /><em>Many ways to be heard.</em></h2></div>
            <p>The script returns to sounds, props and refrains to help the audience recognise how the meaning of a scene changes.</p>
          </div>
          <div className="bhasha-devices-grid">
            {devices.map((device) => (
              <article className={'bhasha-device-card bhasha-device-card-' + Number(device.number)} key={device.number}>
                <span>{device.number}</span><h3>{device.title}</h3><p>{device.copy}</p>
              </article>
            ))}
          </div>
          <div className="bhasha-language-strip">
            <div><span>THE SOUND THAT CONNECTS THE PLAY</span><strong>AEIIIOA</strong></div>
            <p>The opening sound returns at the end. It becomes a theatrical shorthand for communication that is not restricted to a single recognised language.</p>
          </div>
        </section>

        <section className="bhasha-contribution-section">
          <div className="bhasha-section-heading">
            <div><div className="bhasha-section-index">04 <span>/ MY CONTRIBUTION</span></div><h2>A character in<br /><em>the opening argument.</em></h2></div>
            <p>The script names me in the opening media-interview sequence, where the play first introduces its questions about language and power.</p>
          </div>
          <div className="bhasha-role-card">
            <div className="bhasha-role-index">01 / CONFIRMED PERFORMANCE CREDIT</div>
            <h3>Netaji</h3>
            <p>Scene 1 — the political figure questioned by reporters about protecting regional languages, education and respect for other languages. The scene uses the character to set up the play’s satire around public claims and cultural identity.</p>
            <span>CAST CREDIT IN THE UPLOADED SCRIPT: ASHLEY</span>
          </div>
        </section>

        <section className="bhasha-ending-section">
          <div className="bhasha-ending-heading">
            <span>05 / THE CLOSING IDEA</span>
            <h2>From one.<br /><em>To understanding.</em></h2>
            <p>The final sequence builds its response in three steps, keeping the play’s message direct and memorable.</p>
          </div>
          <div className="bhasha-ending-steps">
            <article><span>01</span><small>ONE</small><strong>Realisation</strong><p>Recognising that a shared identity need not erase difference.</p></article>
            <article><span>02</span><small>UNIQUENESS</small><strong>Acceptance</strong><p>Every human voice and every language carries its own identity.</p></article>
            <article><span>03</span><small>LANGUAGE</small><strong>Action</strong><p>Turning recognition and acceptance into the way we treat one another.</p></article>
          </div>
        </section>

        <section className="bhasha-takeaway">
          <span>WHAT I TAKE FROM EK ANOKHI BHASHA</span>
          <p>Language should help us <em>understand one another</em> — not decide who deserves to belong.</p>
          <div className="bhasha-takeaway-footer"><span>EK ANOKHI BHASHA</span><span>NUKKAD NAATAK / BHASHAVAAD</span><span>↗</span></div>
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
          <div className="hari-scenes-grid">
            {caseStudy.scenes.map((scene, index) => (
              <article className={`hari-scene-card hari-scene-card-${index + 1}`} key={scene.title}>
                <div className="hari-scene-card-top"><span className="hari-scene-number">{String(index + 1).padStart(2, '0')}</span><span className="hari-scene-dash"></span></div>
                <p className="hari-scene-kicker">{index === 0 ? 'THE HOOK' : index === 1 ? 'THE CONFLICT' : index === 2 ? 'THE SATIRE' : index === 3 ? 'THE REVEAL' : 'THE RESPONSE'}</p>
                <h3>{scene.title.replace(/^\d+\s*\/\s*/, '')}</h3>
                <p className="hari-scene-description">{scene.description}</p>
              </article>
            ))}
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
  const lenses = [
    { number: '01', title: 'Attention', copy: 'What makes someone notice?' },
    { number: '02', title: 'Emotion', copy: 'What makes the message matter?' },
    { number: '03', title: 'Persuasion', copy: 'What gives someone a reason to act?' },
    { number: '04', title: 'Memory', copy: 'What makes the idea stay?' },
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
      <div className="thinking-lens-grid">
        {lenses.map((lens) => <article className="thinking-lens" key={lens.number}>
          <span className="mono">{lens.number} / LENS</span>
          <h3>{lens.title}</h3>
          <p>{lens.copy}</p>
        </article>)}
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
