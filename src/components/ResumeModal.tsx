import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, Briefcase, Award, ExternalLink, Sparkles } from 'lucide-react';
import { ROLE_RESUMES, PERSONAL_INFO, EDUCATION_INFO } from '../data/portfolioData';
import { RoleResume } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoleId?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  initialRoleId = 'data-analyst',
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(initialRoleId);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentResume: RoleResume =
    ROLE_RESUMES.find((r) => r.id === selectedRoleId) || ROLE_RESUMES[0];

  const handleCopyText = () => {
    const resumeText = `
${PERSONAL_INFO.name.toUpperCase()} - ${currentResume.roleTitle.toUpperCase()}
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | Location: ${PERSONAL_INFO.location}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

PROFESSIONAL SUMMARY:
${currentResume.summary}

KEY TECHNICAL FOCUS:
${currentResume.skillsFocus.join(' • ')}

RELEVANT HIGHLIGHTS:
${currentResume.highlights.map((h) => `• ${h}`).join('\n')}

SELECTED PROJECTS:
${currentResume.keyProjects.map((p) => `• ${p}`).join('\n')}

EDUCATION:
${EDUCATION_INFO.degree}
${EDUCATION_INFO.institution} (2023 - 2027) | CGPA: ${EDUCATION_INFO.cgpa}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c1220] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-200">
        {/* Header with Role Selector */}
        <div className="p-5 border-b border-slate-800 bg-[#090e1a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white font-display">
                Role-Specific Resume Selector
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your hiring target to view customized credentials & project focus.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors border border-slate-700"
              title="Copy plain text formatted resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors shadow-sm"
              title="Print / Save as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role Tabs */}
        <div className="flex items-center gap-2 px-5 py-3 bg-[#0a0f1d] border-b border-slate-800/80 overflow-x-auto scrollbar-none">
          {ROLE_RESUMES.map((r) => {
            const isActive = r.id === selectedRoleId;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRoleId(r.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500/80 text-white font-semibold shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {r.roleTitle.replace(' Resume', '')}
              </button>
            );
          })}
        </div>

        {/* Resume Preview Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#070b14]">
          {/* Candidate Header */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight font-display">
                {PERSONAL_INFO.name}
              </h1>
              <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                {currentResume.subtitle}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
              <span>{PERSONAL_INFO.email}</span>
              <span>•</span>
              <span>{PERSONAL_INFO.phone}</span>
              <span>•</span>
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Targeted Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Role Profile Summary
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/60">
              {currentResume.summary}
            </p>
          </div>

          {/* Focused Skills */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Core Skills & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentResume.skillsFocus.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Key Role Highlights */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              Key Role Strengths
            </h3>
            <ul className="space-y-1.5">
              {currentResume.highlights.map((h, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tailored Projects */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Relevant Project Contributions
            </h3>
            <div className="space-y-2.5">
              {currentResume.keyProjects.map((p, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300">
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="pt-2 border-t border-slate-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Education
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
              <div>
                <span className="font-semibold text-white">{EDUCATION_INFO.degree}</span>
                <span className="text-slate-400 block sm:inline sm:ml-2">({EDUCATION_INFO.institution})</span>
              </div>
              <div className="font-mono text-emerald-400 mt-1 sm:mt-0 font-semibold">
                CGPA: {EDUCATION_INFO.cgpa} · Class of 2027
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
