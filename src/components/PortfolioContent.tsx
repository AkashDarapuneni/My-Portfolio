import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  Copy,
  Check,
  Send,
  ExternalLink,
  ChevronDown,
  Layers,
  Code2,
  Cpu,
  Database,
  Award,
  Sparkles,
  BarChart3,
  Search,
  CheckCircle2,
  Activity,
  ArrowRight,
  BookOpen,
  Cloud,
  ShieldAlert,
  Bot,
  SlidersHorizontal,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
  ROLE_FIT_CARDS,
  EXPERIENCES,
  CERTIFICATIONS,
  EDUCATION_INFO,
  HOW_I_WORK_STEPS,
} from '../data/portfolioData';
import { Project, ProjectCategory } from '../types/portfolio';
import { ResumeModal } from './ResumeModal';
import { CardTilt3D } from './CardTilt3D';
import { LiveEngineeringPlayground } from './LiveEngineeringPlayground';

interface PortfolioContentProps {
  onOpenTerminal: () => void;
  onSelectProject: (project: Project) => void;
  onNavigate?: (sectionId: string) => void;
  isEmbeddedInLaptop?: boolean;
}

export const PortfolioContent: React.FC<PortfolioContentProps> = ({
  onOpenTerminal,
  onSelectProject,
  onNavigate,
  isEmbeddedInLaptop = false,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedResumeRole, setSelectedResumeRole] = useState<string>('data-analyst');
  const [formState, setFormState] = useState({ name: '', email: '', roleTarget: 'Data Analyst', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [activeTab, setActiveTab] = useState<string>('about');

  const NAV_ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'playground', label: 'Lab', isPill: true },
    { id: 'how-i-work', label: 'How I Work' },
    { id: 'toolkit', label: 'Toolkit' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'resumes', label: 'Resumes' },
    { id: 'contact', label: 'Contact' },
  ];

  // Smooth programmatic navigation handler
  const handleNavClick = (targetId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveTab(targetId);
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = rootRef.current?.querySelector<HTMLElement>(`[data-section="${targetId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Scroll spy to dynamically highlight currently visible section
  useEffect(() => {
    const scrollParent = rootRef.current?.parentElement || window;
    const handleScrollDetect = () => {
      if (!rootRef.current) return;
      const sectionIds = ['hero', 'about', 'projects', 'playground', 'how-i-work', 'toolkit', 'experience', 'education', 'resumes', 'contact'];
      const parentRect = rootRef.current.parentElement?.getBoundingClientRect();

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = rootRef.current.querySelector<HTMLElement>(`[data-section="${id}"]`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const relativeTop = parentRect ? rect.top - parentRect.top : rect.top;
          if (relativeTop <= 160 && (rect.bottom >= (parentRect ? parentRect.top + 80 : 80))) {
            setActiveTab(id === 'hero' ? 'about' : id);
            break;
          }
        }
      }
    };

    scrollParent.addEventListener('scroll', handleScrollDetect, { passive: true });
    return () => scrollParent.removeEventListener('scroll', handleScrollDetect);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleOpenResume = (roleId: string) => {
    setSelectedResumeRole(roleId);
    setIsResumeModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setFormState({ name: '', email: '', roleTarget: 'Data Analyst', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 700);
  };

  // Filter projects based on active tab
  const filteredProjects = selectedCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => {
        if (selectedCategory === 'DATA') return p.category === 'Data Analytics';
        if (selectedCategory === 'SOFTWARE') return p.category === 'Software';
        if (selectedCategory === 'AI / ML') return p.category === 'AI / ML';
        if (selectedCategory === 'CLOUD') return p.tags.includes('Docker') || p.tags.includes('Kubernetes') || p.category === 'Cloud & DevOps';
        if (selectedCategory === 'AUTOMATION') return p.category === 'Automation';
        return true;
      });

  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const otherProjects = filteredProjects.filter((p) => selectedCategory === 'ALL' ? !p.featured : true);

  return (
    <div ref={rootRef} className={`w-full bg-[#050505] text-slate-100 selection:bg-indigo-500/30 ${isEmbeddedInLaptop ? 'text-[13px]' : ''}`}>
      {/* 1. TOP BAR NAVIGATION WITH ACTIVE TAB HIGHLIGHTING */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0c162c]/90 border-b border-cyan-500/20 px-6 sm:px-10 py-3 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Wordmark & Role pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => handleNavClick('hero', e)}
              className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors font-display"
            >
              {PERSONAL_INFO.name}
            </button>
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-[11px] font-mono text-indigo-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to Roles (2027)
            </span>
          </div>

          {/* Navigation Links with Interactive Active State */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-mono">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(item.id, e)}
                  data-cursor={item.label.toUpperCase()}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/30 via-cyan-500/25 to-blue-500/30 text-white border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.isPill && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-300' : 'bg-cyan-400 animate-pulse'}`} />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenTerminal}
              data-cursor="TERMINAL"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/60 hover:text-white text-xs font-mono text-slate-300 transition-all shadow-sm"
              title="Open Interactive Terminal (Cmd+K)"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Shell</span>
              <kbd className="hidden sm:inline-block text-[10px] px-1 bg-slate-800 rounded border border-slate-700 text-slate-400">⌘K</kbd>
            </button>

            <button
              onClick={(e) => handleNavClick('contact', e)}
              data-cursor="CONNECT"
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm ${
                activeTab === 'contact'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-500/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              <span>Let's Connect</span>
            </button>
          </div>
        </div>

        {/* Mobile horizontal scroll navigation tabs */}
        <div className="md:hidden flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar text-xs font-mono">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(item.id, e)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
                activeTab === item.id
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id={isEmbeddedInLaptop ? 'embed-hero' : 'hero'} data-section="hero" className="relative px-6 sm:px-10 pt-10 sm:pt-16 pb-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            {/* Status & Degree Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                KL University · B.Tech CSE (2023–2027)
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
                CGPA 8.5 / 10
              </span>
              <span className="px-2.5 py-1 rounded bg-indigo-500/15 border border-indigo-400/30 text-indigo-300">
                Data · Software · AI
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
              Building data-driven software, intelligent systems & practical applications.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Computer Science Engineering student with hands-on experience in <span className="text-white font-medium">Python, SQL, Java, Spring Boot, Power BI</span>, cloud technologies, data analysis, and AI/ML projects.
            </p>

            {/* Actions & Email Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={(e) => handleNavClick('projects', e)}
                data-cursor="PROJECTS"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-lg shadow-indigo-600/30 flex items-center gap-2"
              >
                <span>Explore Selected Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleOpenResume('data-analyst')}
                data-cursor="RESUMES"
                className="px-4 py-2.5 rounded-lg bg-[#0e172e] hover:bg-[#152342] text-slate-200 border border-slate-700/80 font-mono text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Role Resumes</span>
              </button>

              <button
                onClick={handleCopyEmail}
                data-cursor="COPY EMAIL"
                className="px-4 py-2.5 rounded-lg bg-[#0e172e]/90 hover:bg-[#152342] text-slate-300 border border-slate-700/80 font-mono text-xs transition-colors flex items-center gap-2"
                title="Click to copy email address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span className="hidden sm:inline">{PERSONAL_INFO.email}</span>
                <span className="sm:hidden">{copiedEmail ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* User Profile Card with Avatar Image & 3D Cursor Tilt */}
          <div className="w-full sm:w-auto flex items-center sm:justify-end">
            <CardTilt3D maxTilt={10} scale={1.03} dataCursor="AKASH">
              <div className="relative p-3 rounded-2xl bg-gradient-to-b from-[#162342] via-[#101b33] to-[#0c1426] border border-cyan-500/30 shadow-2xl flex flex-col items-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden border border-cyan-400/40 shadow-inner bg-[#0a1122]">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-50" />
                </div>
                <div className="mt-3 text-center">
                  <div className="text-sm font-bold text-white font-display flex items-center justify-center gap-1.5">
                    <span>{PERSONAL_INFO.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400 font-semibold">CSE (2023–2027) · 8.5 CGPA</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">KL University · Hyderabad, India</div>
                </div>
              </div>
            </CardTilt3D>
          </div>
        </div>

        {/* Factual Portfolio Metrics Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#111c34]/90 border border-slate-700/80 shadow-xl backdrop-blur-md">
          {PERSONAL_INFO.portfolioMetrics.map((item, idx) => (
            <div key={idx} className="p-3 text-center sm:text-left border-r last:border-r-0 border-slate-700/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">{item.label}</div>
              <div className="text-[11px] text-cyan-300/80 font-mono">{item.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Core Technology Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#0e172e]/80 border border-slate-700/70 text-xs font-mono text-slate-400">
          <span className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
            Target Core Stack:
          </span>
          <div className="flex flex-wrap gap-2">
            {PERSONAL_INFO.techStrip.map((tech, i) => (
              <span key={i} className="px-2.5 py-1 rounded bg-[#152342] text-slate-200 border border-slate-600/70 shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION 01 — PROFILE / WHAT I BUILD */}
      <section id={isEmbeddedInLaptop ? 'embed-about' : 'about'} data-section="about" className="px-6 sm:px-10 py-16 border-t border-slate-800/80 max-w-7xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-2">
          01. PROFILE
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-4">
          Building software, data products and intelligent systems.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 leading-relaxed mb-8">
          <p>
            I'm <span className="text-white font-semibold">Akash Darapuneni</span>, a Computer Science Engineering student at KL University focused on building practical technology across data analytics, software engineering, and AI/ML.
          </p>
          <p>
            I enjoy turning raw data into useful insights, building APIs and applications with Java and Python, and experimenting with intelligent systems that solve real-world problems.
          </p>
        </div>

        {/* Three Core Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Data & Analytics */}
          <CardTilt3D maxTilt={7} scale={1.02} dataCursor="DATA">
            <div className="h-full p-6 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 hover:border-cyan-400/60 transition-all flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-1">
                  DATA & ANALYTICS
                </h3>
                <p className="text-xs font-mono text-cyan-300 mb-3">
                  Python • SQL • Power BI • Tableau
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Data cleaning, exploratory data analysis (EDA), automated KPI reporting, and interactive visual dashboards.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-700/60">
                <button
                  onClick={() => setSelectedCategory('DATA')}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <span>Filter Data Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </CardTilt3D>

          {/* Card 2: Software Engineering */}
          <CardTilt3D maxTilt={7} scale={1.02} dataCursor="SOFTWARE">
            <div className="h-full p-6 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 hover:border-indigo-400/60 transition-all flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-400/40 flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-1">
                  SOFTWARE ENGINEERING
                </h3>
                <p className="text-xs font-mono text-indigo-300 mb-3">
                  Java • Spring Boot • REST APIs
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Full-stack business applications, Spring Boot microservices, React interfaces, Docker containerization & Kubernetes CI/CD.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-700/60">
                <button
                  onClick={() => setSelectedCategory('SOFTWARE')}
                  className="text-xs font-mono text-indigo-300 hover:text-indigo-200 flex items-center gap-1 font-semibold"
                >
                  <span>Filter Software Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </CardTilt3D>

          {/* Card 3: AI & Intelligent Systems */}
          <CardTilt3D maxTilt={7} scale={1.02} dataCursor="AI / ML">
            <div className="h-full p-6 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 hover:border-emerald-400/60 transition-all flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-1">
                  AI & INTELLIGENT SYSTEMS
                </h3>
                <p className="text-xs font-mono text-emerald-300 mb-3">
                  Python • ML • Computer Vision
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Traffic flow simulations, offline voice recognition on Raspberry Pi, OCR document automation bots & AI experimentation.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setSelectedCategory('AI / ML')}
                  className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                >
                  <span>Filter AI / ML Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </CardTilt3D>
        </div>
      </section>

      {/* 4. SECTION 02 — SELECTED WORK (THE CENTERPIECE) */}
      <section id={isEmbeddedInLaptop ? 'embed-projects' : 'projects'} data-section="projects" className="px-6 sm:px-10 py-16 border-t border-slate-800/80 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
              02. SELECTED WORK
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display">
              Projects built to solve practical problems.
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              A collection of data, software, AI, and cloud projects developed through academic, personal, and hands-on work.
            </p>
          </div>

          {/* Role Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            {['ALL', 'DATA', 'SOFTWARE', 'AI / ML', 'CLOUD', 'AUTOMATION'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedCategory === tab
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED PROJECT: UPI Transaction & Sales Analytics (Only shown when relevant) */}
        {(selectedCategory === 'ALL' || selectedCategory === 'DATA') && (
          <div className="mb-10 rounded-2xl bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] border-2 border-cyan-500/40 shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-400/40 text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                    FEATURED CASE STUDY · DATA ANALYTICS
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    CGI / Blinkit / Analytics Alignment
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {featuredProject.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {featuredProject.description}
                </p>

                {/* 5-Step Animated Data Pipeline */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Data Lifecycle Pipeline
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    {featuredProject.pipeline?.map((p, i) => (
                      <div key={i} className="p-2 rounded bg-slate-800/80 border border-slate-700/80">
                        <span className="text-[9px] font-mono text-indigo-300 font-bold block">
                          0{i + 1}
                        </span>
                        <span className="text-[11px] font-bold text-white block">{p.step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredProject.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectProject(featuredProject)}
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <span>View Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-colors flex items-center gap-1.5"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Media Preview */}
              <div
                onClick={() => onSelectProject(featuredProject)}
                className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl cursor-pointer group"
              >
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-cyan-400 font-semibold">Live Visual Report</span>
                  <span>Click to Inspect ↗</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OTHER PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <CardTilt3D key={project.id} maxTilt={6} scale={1.02} dataCursor="INSPECT">
              <div className="h-full p-5 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 hover:border-indigo-400/60 transition-all flex flex-col justify-between group shadow-xl">
                <div>
                  {/* Image Banner */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative h-44 rounded-xl overflow-hidden mb-4 border border-slate-700/70 cursor-pointer bg-[#0e172e]"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#050505]/90 backdrop-blur-sm text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                        {project.category}
                      </span>
                      {project.adminDemoUrl && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 backdrop-blur-sm text-[10px] font-mono text-emerald-300 border border-emerald-400/40">
                          Dual Live Portals
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <h4
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-display cursor-pointer"
                  >
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#0e172e] text-[11px] font-mono text-slate-300 border border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-[#0e172e] text-[10px] font-mono text-slate-400">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer with Dual Portal links for Kavach or standard demo */}
                <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-mono text-indigo-300 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {/* Prominent Live Links: if project has Admin and User portals */}
                    {project.adminDemoUrl && project.userDemoUrl ? (
                      <div className="flex items-center gap-1">
                        <a
                          href={project.adminDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-400/40 text-[10px] font-mono flex items-center gap-1 transition-all"
                          title="Open Kavach Admin Portal"
                        >
                          <span>Admin</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        <a
                          href={project.userDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-400/40 text-[10px] font-mono flex items-center gap-1 transition-all"
                          title="Open Kavach User Dashboard"
                        >
                          <span>User</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    ) : project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                        title="Demo / Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardTilt3D>
          ))}
        </div>
      </section>

      {/* 5. SECTION 03 — LIVE ENGINEERING PLAYGROUND */}
      <section id={isEmbeddedInLaptop ? 'embed-playground' : 'playground'} data-section="playground" className="px-6 sm:px-10 py-16 border-t border-slate-800/80 max-w-7xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>03. INTERACTIVE LAB</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-2">
          Live Engineering Playground
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mb-8">
          Test real-time UPI transaction failure mitigation, execute verified SQL queries on simulated datasets, and inspect production backend services.
        </p>

        <LiveEngineeringPlayground />
      </section>

      {/* 6. SECTION 04 — HOW I WORK */}
      <section id={isEmbeddedInLaptop ? 'embed-how-i-work' : 'how-i-work'} data-section="how-i-work" className="px-6 sm:px-10 py-16 border-t border-slate-700/60 max-w-7xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2">
          04. HOW I WORK
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-2">
          From messy problem to working solution.
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mb-8">
          A disciplined engineering approach applied uniformly across data analysis, software engineering, and AI projects.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOW_I_WORK_STEPS.map((step) => (
            <CardTilt3D key={step.step} maxTilt={6} scale={1.02} dataCursor={`STEP ${step.step}`}>
              <div className="h-full p-5 rounded-xl bg-[#121c34]/90 border border-slate-700/70 hover:border-emerald-400/50 transition-all flex flex-col justify-between shadow-lg">
                <div>
                  <span className="text-xl font-extrabold text-cyan-400 font-mono">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-white font-display mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300/80 mb-3">{step.subtitle}</p>
                  <ul className="space-y-1.5">
                    {step.points.map((pt, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">▸</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardTilt3D>
          ))}
        </div>
      </section>

      {/* 7. SECTION 05 — TOOLKIT (SKILLS) */}
      <section id={isEmbeddedInLaptop ? 'embed-toolkit' : 'toolkit'} data-section="toolkit" className="px-6 sm:px-10 py-16 border-t border-slate-700/60 max-w-7xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-2">
          05. TOOLKIT
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-2">
          Technical Skills & Technologies
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mb-8">
          Hands-on tools, frameworks, and libraries with verifiable practical project application.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <CardTilt3D key={idx} maxTilt={5} scale={1.01} dataCursor={cat.title.toUpperCase()}>
              <div className="h-full p-6 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 hover:border-indigo-400/50 transition-all shadow-xl">
                <h3 className="text-lg font-bold text-white font-display mb-1 flex items-center justify-between">
                  <span>{cat.title}</span>
                </h3>
                <p className="text-xs text-slate-300 mb-4">{cat.description}</p>

                <div className="space-y-3">
                  {cat.skills.map((skill, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#0e172e]/90 border border-slate-700/60">
                      <div className="text-xs font-mono font-semibold text-white">
                        {skill.name}
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        {skill.highlight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardTilt3D>
          ))}
        </div>
      </section>

      {/* 8. SECTION 06 — WHAT I BUILD (ROLE FIT MATRIX) */}
      <section className="px-6 sm:px-10 py-16 border-t border-slate-700/60 max-w-7xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
          06. ROLE ALIGNMENT
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-2">
          Tailored Fit Across Multiple Hiring Tracks
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mb-8">
          Whether you are recruiting for Data Analytics, Software Engineering, AI/ML, or DevOps, click below to see how my portfolio aligns with your requirements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROLE_FIT_CARDS.map((card, idx) => (
            <CardTilt3D key={idx} maxTilt={8} scale={1.02} dataCursor={card.role}>
              <div className="h-full p-5 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 hover:border-slate-600 transition-all flex flex-col justify-between shadow-xl">
                <div>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider mb-3"
                    style={{ backgroundColor: `${card.color}20`, color: card.color, border: `1px solid ${card.color}50` }}
                  >
                    {card.role}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed mb-4">
                    {card.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {card.skills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#0e172e] text-[10px] font-mono text-slate-300 border border-slate-700/60">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-700/60">
                  <button
                    onClick={() => setSelectedCategory(card.filterCategory)}
                    className="text-xs font-mono font-semibold flex items-center gap-1"
                    style={{ color: card.color }}
                  >
                    <span>{card.cta}</span>
                  </button>
                </div>
              </div>
            </CardTilt3D>
          ))}
        </div>
      </section>

      {/* 8. SECTION 06 — EXPERIENCE */}
      <section id={isEmbeddedInLaptop ? 'embed-experience' : 'experience'} data-section="experience" className="px-6 sm:px-10 py-16 border-t border-slate-700/60 max-w-7xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-2">
          06. EXPERIENCE
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-8">
          Work & Project Experience
        </h2>

        <div className="space-y-6 max-w-4xl">
          {EXPERIENCES.map((exp, idx) => (
            <CardTilt3D key={idx} maxTilt={4} scale={1.01} dataCursor={exp.role.toUpperCase()}>
              <div className="p-6 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 hover:border-slate-600 transition-all shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-lg font-bold text-white font-display">
                    {exp.role} · <span className="text-indigo-400">{exp.organization}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-300 bg-[#0e172e] px-2.5 py-1 rounded border border-slate-700/70">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-4">{exp.description}</p>
                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#0e172e] text-xs font-mono text-indigo-300 border border-slate-700/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </CardTilt3D>
          ))}
        </div>
      </section>

      {/* 9. SECTION 08 — CERTIFICATIONS & EDUCATION */}
      <section id={isEmbeddedInLaptop ? 'embed-education' : 'education'} data-section="education" className="px-6 sm:px-10 py-16 border-t border-slate-700/60 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* CERTIFICATIONS */}
          <CardTilt3D maxTilt={5} scale={1.01} dataCursor="CREDENTIALS">
            <div className="h-full p-6 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 flex flex-col justify-between shadow-xl">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                  08. CERTIFICATIONS
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mb-6">
                  Cloud & Technical Credentials
                </h2>

                <div className="space-y-4">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#0e172e]/90 border border-slate-700/70 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                        <p className="text-xs text-slate-300 font-mono mt-0.5">{cert.issuer}</p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 px-2 py-1 rounded bg-[#0a1122] border border-slate-700/70">
                        {cert.issueDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardTilt3D>

          {/* EDUCATION */}
          <CardTilt3D maxTilt={5} scale={1.01} dataCursor="EDUCATION">
            <div className="h-full p-6 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 space-y-4 shadow-xl">
              <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-2">
                08. EDUCATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mb-6">
                Academic Foundation
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h4 className="text-lg font-bold text-white font-display">
                  {EDUCATION_INFO.institution}
                </h4>
                <span className="text-xs font-mono text-indigo-400 font-semibold">
                  {EDUCATION_INFO.period}
                </span>
              </div>
              <p className="text-sm text-slate-300">{EDUCATION_INFO.degree}</p>
              <div className="inline-block px-3 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-semibold">
                CGPA: {EDUCATION_INFO.cgpa}
              </div>

              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Relevant Foundation Coursework:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {EDUCATION_INFO.coursework.map((course, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardTilt3D>
        </div>
      </section>

      {/* 10. SECTION 09 — RESUMES (ROLE-SPECIFIC HUB) */}
      <section id={isEmbeddedInLaptop ? 'embed-resumes' : 'resumes'} data-section="resumes" className="px-6 sm:px-10 py-16 border-t border-slate-700/60 max-w-7xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-2">
          09. RESUME HUB
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-display mb-2">
          One Portfolio, Targeted Role Resumes
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mb-8">
          Choose your opening track to preview and download my tailored resume.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardTilt3D maxTilt={7} scale={1.03} dataCursor="RESUME">
            <button
              onClick={() => handleOpenResume('data-analyst')}
              className="w-full h-full p-5 rounded-2xl bg-[#121c34]/90 border border-cyan-500/30 hover:border-cyan-400 text-left transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                  ROLE 01
                </span>
                <h4 className="text-base font-bold text-white font-display group-hover:text-cyan-300">
                  DATA ANALYST
                </h4>
                <p className="text-xs text-slate-300 mt-1">Data · BI · Analytics · SQL · Python</p>
              </div>
              <div className="mt-4 text-xs font-mono text-cyan-400 flex items-center gap-1 font-semibold">
                <span>View Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </CardTilt3D>

          <CardTilt3D maxTilt={7} scale={1.03} dataCursor="RESUME">
            <button
              onClick={() => handleOpenResume('software-engineer')}
              className="w-full h-full p-5 rounded-2xl bg-[#121c34]/90 border border-indigo-500/30 hover:border-indigo-400 text-left transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-1">
                  ROLE 02
                </span>
                <h4 className="text-base font-bold text-white font-display group-hover:text-indigo-300">
                  SOFTWARE ENGINEER
                </h4>
                <p className="text-xs text-slate-300 mt-1">Java · Spring Boot · Backend · MySQL</p>
              </div>
              <div className="mt-4 text-xs font-mono text-indigo-400 flex items-center gap-1 font-semibold">
                <span>View Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </CardTilt3D>

          <CardTilt3D maxTilt={7} scale={1.03} dataCursor="RESUME">
            <button
              onClick={() => handleOpenResume('ai-ml')}
              className="w-full h-full p-5 rounded-2xl bg-[#121c34]/90 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                  ROLE 03
                </span>
                <h4 className="text-base font-bold text-white font-display group-hover:text-emerald-300">
                  AI / ML ENGINEER
                </h4>
                <p className="text-xs text-slate-300 mt-1">Python · ML · Computer Vision · Edge AI</p>
              </div>
              <div className="mt-4 text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                <span>View Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </CardTilt3D>

          <CardTilt3D maxTilt={7} scale={1.03} dataCursor="RESUME">
            <button
              onClick={() => handleOpenResume('general-software')}
              className="w-full h-full p-5 rounded-2xl bg-[#121c34]/90 border border-amber-500/30 hover:border-amber-400 text-left transition-all group flex flex-col justify-between shadow-xl"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  ROLE 04
                </span>
                <h4 className="text-base font-bold text-white font-display group-hover:text-amber-300">
                  GENERAL SOFTWARE
                </h4>
                <p className="text-xs text-slate-400 mt-1">Full Stack · Cloud · CS Fundamentals</p>
              </div>
              <div className="mt-4 text-xs font-mono text-amber-400 flex items-center gap-1 font-semibold">
                <span>View Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </CardTilt3D>
        </div>
      </section>

      {/* 11. SECTION 10 — LET'S BUILD SOMETHING (CONTACT) */}
      <section id={isEmbeddedInLaptop ? 'embed-contact' : 'contact'} data-section="contact" className="px-6 sm:px-10 py-20 border-t border-slate-700/60 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              10. LET'S BUILD SOMETHING
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Open to Opportunities.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              I'm actively looking for internships and engineering opportunities where I can contribute across Data Analytics, Software Engineering, or AI/ML.
            </p>

            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for 2026/2027 Campus & Fresher Recruitment</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400" />
                <button onClick={handleCopyEmail} className="hover:text-cyan-300 underline underline-offset-4">
                  {PERSONAL_INFO.email}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#0e172e] border border-slate-700/70 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#0e172e] border border-slate-700/70 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-[#0e172e] border border-slate-700/70 text-xs font-mono text-amber-400 hover:border-amber-400/50 transition-colors"
                title="LeetCode Profile"
              >
                LeetCode ↗
              </a>
            </div>
          </div>

          {/* Quick Direct Message Form */}
          <div className="lg:col-span-6">
            <CardTilt3D maxTilt={4} scale={1.01} dataCursor="MESSAGE">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#121c34]/90 border border-slate-700/70 shadow-2xl">
                <h3 className="text-lg font-bold text-white font-display mb-1">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-300 mb-4 font-mono">
                  Delivered directly to {PERSONAL_INFO.email}
                </p>

                {formStatus === 'sent' ? (
                  <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Message Sent Successfully!</h4>
                    <p className="text-xs text-slate-300">
                      Thank you for reaching out. I will respond to your email promptly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Recruiter or Hiring Team"
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0e172e] border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Work Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="recruiter@company.com"
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0e172e] border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Target Role Category</label>
                      <select
                        value={formState.roleTarget}
                        onChange={(e) => setFormState({ ...formState, roleTarget: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0e172e] border border-slate-700/80 text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Data Analyst">Data Analyst (Python, SQL, Power BI)</option>
                        <option value="Software Engineer">Software Engineer (Java, Spring Boot, React)</option>
                        <option value="AI / ML Engineer">AI / ML Engineer (Python, Machine Learning)</option>
                        <option value="DevOps / QA">DevOps / QA / Testing</option>
                        <option value="General Fresher">General Engineering Fresher</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Message</label>
                      <textarea
                        rows={3}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Hi Akash, we'd like to discuss an opportunity..."
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0e172e] border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 disabled:opacity-50"
                    >
                      {formStatus === 'sending' ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </CardTilt3D>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-16 pt-6 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-3">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, TypeScript & Tailwind CSS.
          </div>
          <div>
            KL University · B.Tech CSE (2023–2027)
          </div>
        </div>
      </section>

      {/* Role-Specific Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        initialRoleId={selectedResumeRole}
      />
    </div>
  );
};
