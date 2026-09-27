import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown,
  Volume2,
  VolumeX,
  FastForward,
  RotateCcw,
  Sparkles,
  Laptop as LaptopIcon,
  FolderOpen,
  ArrowRight,
} from 'lucide-react';
import { MacBook3D } from './MacBook3D';
import { PortfolioContent } from './PortfolioContent';
import { Project } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';

interface LaptopHeroScrollProps {
  onOpenTerminal: () => void;
  onSelectProject: (project: Project) => void;
}

export const LaptopHeroScroll: React.FC<LaptopHeroScrollProps> = ({
  onOpenTerminal,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullPortfolioRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const [hasOpenedAudio, setHasOpenedAudio] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  // Web Audio API synthesized warm chime
  const playStartupChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // F# Major chord / Apple-style chime frequencies: F#3, C#4, F#4, A#4, C#5
      const frequencies = [185, 277.18, 369.99, 466.16, 554.37];
      const now = ctx.currentTime;

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.08 / (idx + 1), now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.4);
      });
    } catch {
      // Audio context may require explicit user gesture; fail silently
    }
  }, [soundEnabled]);

  // Unified Section Navigation Handler (Works seamlessly from laptop stage or full screen)
  const handleNavigate = useCallback((targetId: string) => {
    // 1. If currently in 3D intro or opening phase, jump page immediately to full portfolio mode
    if (containerRef.current) {
      const targetY = containerRef.current.offsetHeight - window.innerHeight + 10;
      if (window.scrollY < targetY - 20) {
        window.scrollTo({ top: targetY, behavior: 'instant' });
      }
      targetProgressRef.current = 1;
      smoothProgressRef.current = 1;
      setScrollProgress(1);
    }

    // 2. Programmatically scroll to target element within the active portfolio container
    const performScroll = () => {
      const container = fullPortfolioRef.current;
      if (!container) return;

      if (targetId === 'hero') {
        container.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetEl = container.querySelector<HTMLElement>(`[data-section="${targetId}"], #${targetId}`);
      if (targetEl) {
        const targetRect = targetEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
        // 76px sticky header offset ensures section title is fully visible below navbar
        const stickyHeaderOffset = 76;
        container.scrollTo({ top: Math.max(0, relativeTop - stickyHeaderOffset), behavior: 'smooth' });
      }
    };

    if (smoothProgressRef.current >= 0.86) {
      requestAnimationFrame(performScroll);
    } else {
      setTimeout(performScroll, 75);
    }
  }, []);

  // Track window scroll progress with immediate response
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      targetProgressRef.current = rawProgress;

      // Trigger audio chime once when laptop starts opening (around 0.12)
      if (rawProgress >= 0.12 && !hasOpenedAudio) {
        playStartupChime();
        setHasOpenedAudio(true);
      } else if (rawProgress < 0.05 && hasOpenedAudio) {
        setHasOpenedAudio(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasOpenedAudio, playStartupChime]);

  // Silky 60/120fps RAF Physics Loop with Weighted Spring Damping
  useEffect(() => {
    let active = true;
    const updatePhysics = () => {
      if (!active) return;
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.0004) {
        // 0.18 lerp factor ensures rapid, responsive feel without input lag while absorbing notch jitter
        const next = current + delta * 0.18;
        smoothProgressRef.current = next;
        setScrollProgress(next);
      } else if (current !== target) {
        smoothProgressRef.current = target;
        setScrollProgress(target);
      }

      rafIdRef.current = requestAnimationFrame(updatePhysics);
    };

    rafIdRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Subtle mouse tilt for realistic 3D depth
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseTilt({
        x: normY * -3,
        y: normX * 4,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Jump helpers
  const jumpToPortfolio = () => {
    if (!containerRef.current) return;
    const targetY = containerRef.current.offsetHeight - window.innerHeight + 10;
    targetProgressRef.current = 1;
    smoothProgressRef.current = 1;
    setScrollProgress(1);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const jumpToStart = () => {
    targetProgressRef.current = 0;
    smoothProgressRef.current = 0;
    setScrollProgress(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLaptopSmoothly = () => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: 0.44 * totalScrollable, behavior: 'smooth' });
  };

  // 1. Text Opacity & Translation:
  // Starts at 1; smoothly fades out as laptop lid begins opening (0.01 to 0.18)
  const welcomeProgress = Math.min(1, Math.max(0, scrollProgress / 0.18));
  const welcomeOpacity = Math.max(0, 1 - welcomeProgress * 1.35);
  const welcomeTranslateY = -welcomeProgress * 60;
  const stageOffsetTop = welcomeOpacity * 60;

  // 2. Non-Linear Lid Opening Kinematics (0.03 to 0.46):
  // Non-linear easing curve (ease-out-cubic): f(t) = 1 - (1 - t)^3
  // Provides responsive initial lift right as scroll starts, followed by a smooth,
  // fluid deceleration as the lid glides gracefully to its full 104° open angle.
  const HINGE_START = 0.03;
  const HINGE_END = 0.46;
  const lidProgressNorm = Math.min(1, Math.max(0, (scrollProgress - HINGE_START) / (HINGE_END - HINGE_START)));
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  const easedLidProgress = easeOutCubic(lidProgressNorm);

  // Precise mapping of scroll progress to lid tilt angle (0° to 104°)
  const MAX_LID_ANGLE = 104;
  const lidAngle = easedLidProgress * MAX_LID_ANGLE;

  // Screen Backlight Glow: turns on gently as lid opens past 6 degrees
  const screenOpacity = Math.min(1, Math.max(0, (lidAngle - 6) / 28));

  // 3. Precision Dolly-Zoom towards Retina Display (0.46 to 0.86):
  const ZOOM_START = 0.46;
  const ZOOM_END = 0.86;
  const zoomProgress = Math.min(1, Math.max(0, (scrollProgress - ZOOM_START) / (ZOOM_END - ZOOM_START)));
  const easedZoomProgress = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);
  const zoomScale = 1.0 + easedZoomProgress * 2.85;

  // Coordinated Base & Camera Tilt:
  // Closed laptop sits at 13 deg pitch to showcase the silver metallic lid & chrome monogram.
  // As the lid opens, it smoothly relaxes to 2 deg eye-level pitch.
  // When zooming, tilt smoothly zeroes out for flat-screen takeover.
  const baseTiltX = (13 - easedLidProgress * 11) * (1 - easedZoomProgress) + mouseTilt.x * (1 - easedZoomProgress);
  const baseTiltY = mouseTilt.y * (1 - easedZoomProgress);

  // Vertical Screen Centering during zoom:
  const zoomOffsetY = easedZoomProgress * 36;

  // Full takeover flag
  const isFullyZoomed = scrollProgress >= 0.86;

  // Current visual phase description
  let currentStage = '1. Welcome';
  if (scrollProgress >= 0.85) currentStage = '4. Full Portfolio';
  else if (scrollProgress >= 0.46) currentStage = '3. Screen Zoom';
  else if (scrollProgress >= 0.03) currentStage = '2. Laptop Opening';

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505]">
      {/* Scroll track: 380vh tall for deliberate, cinematic scroll control */}
      <div className="h-[380vh] relative">
        {/* Sticky 100vh Stage Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#0a0a0f] via-[#08080c] to-[#050505]">
          {/* Ambient Cosmic Cyan, Sapphire & Electric Blue Atmosphere */}
          <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-cyan-500/15 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />

          {/* STAGE 1: MINIMAL OPENING GREETING WITH USER'S PHOTO */}
          <div
            className="absolute z-20 text-center px-4 transition-all duration-150 flex flex-col items-center pointer-events-none"
            style={{
              opacity: welcomeOpacity,
              transform: `translate3d(0, ${welcomeTranslateY}px, 0)`,
              display: welcomeOpacity <= 0.01 ? 'none' : 'flex',
              top: '5vh',
            }}
          >
            {/* User Profile Avatar with glowing rim */}
            <div className="mb-3 relative group pointer-events-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-indigo-400/80 p-0.5 bg-slate-900 shadow-xl shadow-indigo-500/20">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-light text-slate-200 tracking-tight font-display">
              Hi, Welcome.
            </h1>
            <div className="mt-1 space-y-1">
              <p className="text-lg sm:text-2xl font-bold text-white font-display">
                I'm Akash.
              </p>
              <p className="text-xs sm:text-sm text-cyan-300 font-mono tracking-wide font-medium">
                Computer Science Engineer · Data · Software · AI
              </p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed pt-1">
                I build data-driven applications, intelligent systems, and reliable software.
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 max-w-xl mx-auto leading-relaxed hidden sm:block">
                KL University CSE (2023–2027) · CGPA: 8.5/10 · Python · SQL · Java · Spring Boot · Power BI · Cloud · AI/ML
              </p>
            </div>

            {/* Scroll Indicator & Action Buttons */}
            <div className="mt-4 flex items-center gap-3 pointer-events-auto">
              <button
                onClick={openLaptopSmoothly}
                className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/25 flex items-center gap-1.5 transition-all"
              >
                <span>Open Laptop</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={jumpToPortfolio}
                className="px-3.5 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <span>Skip to Portfolio</span>
                <FastForward className="w-3 h-3 text-cyan-400" />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono animate-bounce">
              <span>Scroll down to open laptop</span>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>

          {/* STAGE 2, 3: THE 3D MACBOOK WITH HIGH-CONTRAST SPACE SILVER FINISH */}
          <div
            className={`w-full flex items-center justify-center transition-opacity duration-300 ${
              isFullyZoomed ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
            }`}
            style={{
              transform: `translate3d(0, ${stageOffsetTop}px, 0)`,
            }}
          >
            <MacBook3D
              lidAngle={lidAngle}
              zoomScale={zoomScale}
              translateY={zoomOffsetY}
              tiltX={baseTiltX}
              tiltY={baseTiltY}
              screenOpacity={screenOpacity}
            >
              {/* Portfolio inside Laptop Screen */}
              <PortfolioContent
                onOpenTerminal={onOpenTerminal}
                onSelectProject={onSelectProject}
                onNavigate={handleNavigate}
                isEmbeddedInLaptop={true}
              />
            </MacBook3D>
          </div>

          {/* STAGE 4: FULL-SCREEN TAKEOVER HANDOVER */}
          <div
            ref={fullPortfolioRef}
            className={`absolute inset-0 z-30 w-full h-full overflow-y-auto bg-[#050505] scroll-smooth transition-opacity duration-500 ${
              isFullyZoomed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <PortfolioContent
              onOpenTerminal={onOpenTerminal}
              onSelectProject={onSelectProject}
              onNavigate={handleNavigate}
              isEmbeddedInLaptop={false}
            />
          </div>

          {/* FLOATING INTERACTIVE HUD & STAGE CONTROLLER */}
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 p-1.5 rounded-full bg-[#0e1730]/90 border border-slate-700/80 backdrop-blur-md shadow-2xl text-xs font-mono text-slate-300">
            {/* Stage Indicator Pill */}
            <div className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 flex items-center gap-1.5 text-[11px] text-slate-300">
              <LaptopIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{currentStage}</span>
              <span className="sm:hidden">{Math.round(scrollProgress * 100)}%</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playStartupChime();
              }}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute startup sound' : 'Enable startup sound'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            </button>

            {/* Quick Open/Close / Jump to Portfolio */}
            {!isFullyZoomed ? (
              <button
                onClick={jumpToPortfolio}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-950 font-semibold hover:bg-slate-200 transition-colors shadow-sm"
                title="Skip directly to portfolio"
              >
                <span>View Portfolio</span>
                <FastForward className="w-3 h-3" />
              </button>
            ) : (
              <button
                onClick={jumpToStart}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                title="Replay 3D laptop animation"
              >
                <RotateCcw className="w-3 h-3 text-indigo-400" />
                <span>Replay Intro</span>
              </button>
            )}
          </div>

          {/* Interactive Scrub Slider (Bottom-left) */}
          <div className="fixed bottom-5 left-5 z-40 hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0e1730]/90 border border-slate-700/80 backdrop-blur-md shadow-xl text-xs font-mono text-slate-400">
            <span className="text-[10px] text-slate-400">Hinge / Scroll:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrollProgress}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (containerRef.current) {
                  const total = containerRef.current.offsetHeight - window.innerHeight;
                  window.scrollTo({ top: val * total, behavior: 'auto' });
                }
              }}
              className="w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[10px] text-cyan-400 w-8 tabular-nums">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
