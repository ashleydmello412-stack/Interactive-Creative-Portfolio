import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Route,
  Switch,
  Link,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { Menu, X } from 'lucide-react';
import {
  AboutPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  ProjectDetailPage,
  ThinkingPage,
  WorkPage,
} from './pages/PortfolioPages';
import { projects } from './data/projects';

const queryClient = new QueryClient();

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Creative Portfolio — Psychology & Performance',
    description:
      'A growing portfolio of performance, creative production, and psychology-led thinking by a B.Sc. Psychology student.',
  },
  '/work': {
    title: 'Creative Work & Performance Projects',
    description:
      'Explore performance and production projects, search the archive, and review verified roles and details still being collected.',
  },
  '/thinking': {
    title: 'Psychology-led Creative Thinking & Advertising',
    description:
      'A brand-first approach to advertising informed by psychology, consumer research, cultural context and qualitative research into bilingual identity.',
  },
  '/about': {
    title: 'About — Psychology-led Creative Practice',
    description:
      'A psychology student connecting human behaviour with theatre, storytelling, audience engagement and creative advertising.',
  },
  '/contact': {
    title: 'Contact — Creative Archive',
    description:
      'Portfolio contact information for creative advertising, consumer insights, and production opportunities.',
  },
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/thinking', label: 'Psychology' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    const project = location.startsWith('/work/')
      ? projects.find((item) => item.slug === location.slice('/work/'.length))
      : undefined;
    const metadata =
      pageMetadata[location] ??
      (project
        ? {
            title: `${project.title} — Creative Portfolio`,
            description: `${project.summary} View the project's verified details and materials still to collect.`,
          }
        : {
            title: 'Page not found — Creative Archive',
            description: 'This page is not in the Creative Archive portfolio.',
          });
    document.title = metadata.title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', metadata.description);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:title"]')
      ?.setAttribute('content', metadata.title);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:description"]')
      ?.setAttribute('content', metadata.description);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:url"]')
      ?.setAttribute('content', `${window.location.origin}${location}`);
    document
      .querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
      ?.setAttribute('content', metadata.title);
    document
      .querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
      ?.setAttribute('content', metadata.description);
  }, [location]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const selector = [
        '#main-content .page-intro',
        '#main-content .hero',
        '#main-content .section',
        '#main-content .home-destination',
        '#main-content .project-card',
        '#main-content .archive-range',
        '#main-content .thinking-principle',
        '#main-content .thinking-lens',
        '#main-content .thinking-step-strip article',
        '#main-content .reference-grid article',
        '#main-content .research-proposal-card',
        '#main-content .research-secondary-card',
        '#main-content .about-positioning',
        '#main-content .about-block',
        '#main-content .about-theatre-grid article',
        '#main-content .contact-panel',
        '#main-content .bhasha-scene-card',
        '#main-content .hari-scene-card',
      ].join(',');
      const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      targets.forEach((element, index) => {
        element.classList.add('motion-ready');
        element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 75}ms`);
      });

      if (reduceMotion || !('IntersectionObserver' in window)) {
        targets.forEach((element) => element.classList.add('is-visible'));
        return;
      }

      observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            activeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

      targets.forEach((element) => observer?.observe(element));
    });
    let observer: IntersectionObserver | undefined;

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [location]);

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>('.scroll-progress');
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      progress?.style.setProperty('--scroll-scale', String(Math.min(1, Math.max(0, ratio))));
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content" data-testid="link-skip-content">Skip to content</a>
      <header className="site-header wrap" id="page-top">
        <div className="scroll-progress" aria-hidden="true" />
        <div className="nav-row">
          <Link href="/" className="brand" aria-label="Creative Archive home" data-testid="link-brand">Creative Archive<span className="brand-mark" aria-hidden="true">·</span></Link>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)} data-testid="button-menu-toggle">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav id="main-navigation" className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? location === '/' : location === item.href || (item.href === '/work' && location.startsWith('/work/'));
              return <Link key={item.href} href={item.href} className={`nav-link${isActive ? ' active' : ''}`} aria-current={isActive ? 'page' : undefined} onClick={() => setMenuOpen(false)} data-testid={`nav-${item.label.toLowerCase()}`}>{item.label}</Link>;
            })}
          </nav>
        </div>
      </header>
      <div className="route-stage" key={location}>{children}</div>
      <footer className="site-footer wrap" data-testid="site-footer">
        <span>Creative Archive · Portfolio in progress</span>
        <a href="#page-top" data-testid="link-footer-home">Back to top ↑</a>
        <span>© <span>{new Date().getFullYear()}</span></span>
      </footer>
    </>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <RoutedErrorBoundary resetKey={location}>
      <Shell>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/work" component={WorkPage} />
          <Route path="/work/:slug" component={ProjectDetailPage} />
          <Route path="/thinking" component={ThinkingPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Shell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children, resetKey }: { children: ReactNode; resetKey: string }) {
  return <ErrorBoundary resetKey={resetKey}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
