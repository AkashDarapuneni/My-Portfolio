import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Activity, Layers, ArrowRight, ShieldCheck, Database } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#0c1220] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Media Banner */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-900 border-b border-slate-800">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.classList.add('bg-gradient-to-tr', 'from-slate-950', 'via-indigo-950', 'to-slate-900');
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-[#0c1220]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors border border-white/20"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Content */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-2.5 py-1 rounded bg-indigo-500/20 border border-indigo-400/40 text-[11px] font-mono font-semibold text-indigo-300 uppercase tracking-wider mb-2">
              {project.category}
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-white font-display">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Metrics Ribbon */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="text-base sm:text-2xl font-bold text-white font-mono">
                  {metric.value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* 5-Step Pipeline (if available, e.g. for UPI Analytics or Traffic Simulation) */}
          {project.pipeline && project.pipeline.length > 0 && (
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30">
              <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                End-to-End Execution Pipeline
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {project.pipeline.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-cyan-400 font-bold block mb-1">
                        STAGE 0{idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-white mb-1">{p.step}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Executive Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Project Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Problem Statement */}
          {project.problemSolved && (
            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Problem It Solves
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {project.problemSolved}
              </p>
            </div>
          )}

          {/* Key Technical Work */}
          {project.keyTechnicalWork && project.keyTechnicalWork.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Key Technical Work
              </h3>
              <ul className="space-y-2">
                {project.keyTechnicalWork.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-indigo-400 font-mono mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture Highlights */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Architecture & System Flow
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.architectureHighlights.map((arch, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Links */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#090e1a] flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            Akash Darapuneni · Portfolio Case Study
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-850 hover:bg-slate-700/80 text-xs font-mono text-slate-200 transition-colors border border-slate-700"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            {/* If project has explicit dual Admin & User links */}
            {project.adminDemoUrl && (
              <a
                href={project.adminDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all shadow-md shadow-indigo-600/20"
                title="Launch Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                <span>Admin Portal</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}

            {project.userDemoUrl && (
              <a
                href={project.userDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-all shadow-md shadow-cyan-600/20"
                title="Launch User Dashboard"
              >
                <Activity className="w-3.5 h-3.5 text-indigo-200" />
                <span>User Dashboard</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}

            {!project.adminDemoUrl && !project.userDemoUrl && project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors shadow-sm"
              >
                <span>Live View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
