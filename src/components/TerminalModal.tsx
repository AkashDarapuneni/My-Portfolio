import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-semibold">AkashOS Interactive Shell v2.4 (x86_64-darapuneni-cse)</p>
          <p className="text-xs text-slate-400">Type <span className="text-indigo-400 font-mono">help</span> to list available commands, or try <span className="text-amber-400 font-mono">sudo hire</span>.</p>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 py-1">
            <div><span className="text-indigo-400 font-mono font-medium">bio</span> : Summary & background</div>
            <div><span className="text-cyan-400 font-mono font-medium">skills</span> : Technical capabilities</div>
            <div><span className="text-indigo-400 font-mono font-medium">projects</span> : Key engineering builds</div>
            <div><span className="text-indigo-400 font-mono font-medium">contact</span> : Email & direct reachout</div>
            <div><span className="text-amber-400 font-mono font-medium">sudo hire</span> : Launch recruiter celebration</div>
            <div><span className="text-slate-400 font-mono font-medium">clear</span> : Clear terminal output</div>
            <div><span className="text-slate-400 font-mono font-medium">exit</span> : Close shell</div>
          </div>
        );
        break;

      case 'bio':
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-white">{PERSONAL_INFO.name} — {PERSONAL_INFO.tagline}</p>
            <p>{PERSONAL_INFO.subTagline}</p>
            <p className="text-slate-400">{PERSONAL_INFO.supportingLine}</p>
            <p className="text-emerald-400 font-mono text-[11px] mt-1">Status: Open to 2026/2027 Roles · CGPA: 8.5/10</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-xs space-y-1 text-slate-300">
            <p className="text-cyan-300 font-medium">Data & Analytics: Python (Pandas, NumPy), SQL, Power BI, Tableau, Excel, EDA</p>
            <p className="text-indigo-300 font-medium">Software: Java, Spring Boot, React, REST APIs, MySQL, Git</p>
            <p className="text-emerald-300 font-medium">AI & ML: Machine Learning, OpenCV, Vosk Speech, Simulation, Raspberry Pi</p>
            <p className="text-amber-300 font-medium">Cloud/DevOps: Docker, Kubernetes, CI/CD, AWS CCP, Linux</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            {PROJECTS.map((p) => (
              <div key={p.id} className="border-l-2 border-indigo-500/40 pl-2">
                <span className="text-white font-medium">{p.title}</span>
                <span className="text-slate-400 block text-[11px]">{p.description}</span>
                <span className="text-cyan-400 font-mono text-[10px]">{p.tags.slice(0, 5).join(' · ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p>Direct Email: <span className="text-emerald-400 font-mono">{PERSONAL_INFO.email}</span></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-indigo-400 underline">linkedin.com/in/akash-darapuneni</a></p>
            <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-indigo-400 underline">github.com/akashdarapuneni</a></p>
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6677FF', '#00D9FF', '#00E5A0', '#F59E0B'],
        });
        output = (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs space-y-1.5 text-emerald-200">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Permission granted: Role match confirmed!</span>
            </div>
            <p className="text-slate-300">
              Thank you for considering Akash Darapuneni. Let's arrange a conversation to discuss how he can contribute across Data Analytics, Software Engineering, or AI/ML.
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(PERSONAL_INFO.email);
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
              }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-[11px] font-mono text-emerald-300 transition-colors border border-emerald-700/60 mt-1"
            >
              {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : null}
              <span>{copiedEmail ? 'Copied to clipboard!' : `Copy Email (${PERSONAL_INFO.email})`}</span>
            </button>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = (
          <div className="text-xs text-rose-400 font-mono">
            command not found: {cmd}. Type <span className="text-slate-200">help</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInput('');
    setHistoryIndex(-1);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#090d16] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs text-slate-200"
        onClick={(e) => e.stopPropagation()}
        style={{ minHeight: '400px', maxHeight: '80vh' }}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0c1220] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-slate-400 text-[11px]">akash@darapuneni-cse: ~</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-bold">akash@work:~$</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form onSubmit={handleCommand} className="p-3 bg-[#0c1220] border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">akash@work:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'bio', 'projects', or 'sudo hire'..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs placeholder-slate-600"
            autoFocus
          />
          <button type="submit" className="text-slate-400 hover:text-indigo-400">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
