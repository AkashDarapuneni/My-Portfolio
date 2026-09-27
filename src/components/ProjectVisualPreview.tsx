import React from 'react';
import { Project } from '../types/portfolio';
import {
  TrendingUp,
  BarChart2,
  Server,
  Cpu,
  Bot,
  Layers,
  Radio,
  Workflow,
  CheckCircle2,
} from 'lucide-react';

interface ProjectVisualPreviewProps {
  project: Project;
}

export const ProjectVisualPreview: React.FC<ProjectVisualPreviewProps> = ({ project }) => {
  switch (project.visualType) {
    case 'data-dashboard':
      return (
        <div className="w-full h-full bg-[#080a0f] p-4 flex flex-col justify-between font-mono select-none overflow-hidden relative border-b border-white/[0.06]">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid-subtle opacity-25 pointer-events-none" />

          {/* Top Bar Mockup */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/[0.08] pb-2 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold">UPI_TRANSACTIONS_EDA.tbl</span>
            </div>
            <span className="text-indigo-400">TABLEAU_LIVE_KPI</span>
          </div>

          {/* Metric KPIs */}
          <div className="grid grid-cols-3 gap-2 my-2 z-10">
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-center">
              <span className="text-[9px] text-slate-400 block">50K+ RECORDS</span>
              <span className="text-xs font-bold text-emerald-400">92.4% SUCCESS</span>
            </div>
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-center">
              <span className="text-[9px] text-slate-400 block">AVG VALUE</span>
              <span className="text-xs font-bold text-white">₹480 INR</span>
            </div>
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] text-center">
              <span className="text-[9px] text-slate-400 block">KPIS BUILT</span>
              <span className="text-xs font-bold text-indigo-400">14 METRICS</span>
            </div>
          </div>

          {/* Mini Bar Chart Mockup */}
          <div className="flex items-end justify-between gap-1.5 h-14 pt-2 px-2 bg-black/40 rounded border border-white/[0.04] z-10">
            {[45, 68, 92, 58, 84, 98, 76, 88, 64, 90, 82, 95].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-indigo-600 to-cyan-400"
                  style={{ height: `${val}%` }}
                />
              </div>
            ))}
          </div>

          {/* Footer status */}
          <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 z-10">
            <span>Pipeline: Pandas → EDA → Tableau</span>
            <span className="text-emerald-400">● Normalized</span>
          </div>
        </div>
      );

    case 'fullstack-app':
      return (
        <div className="w-full h-full bg-[#090b10] p-4 flex flex-col justify-between font-mono select-none overflow-hidden relative border-b border-white/[0.06]">
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-indigo-500/30 text-indigo-400 flex items-center justify-center text-[8px] font-bold">
                ERP
              </span>
              <span className="text-white font-semibold">FERTILIZER RETAIL SUITE</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Spring Boot + React
            </span>
          </div>

          {/* POS Counter Billing simulation */}
          <div className="space-y-1.5 my-2">
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Farmer: R. V. Sharma (#F-104)</span>
              <span className="text-emerald-400">Active Credit: ₹1,200</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/[0.04] flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Urea 45kg Bags (x4)</span>
                <span className="text-slate-500">In-Stock: 86</span>
              </div>
              <span className="text-indigo-300 font-bold">₹1,068.00</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-white/[0.05]">
            <span>18 REST Endpoints · Atomic Inventory Decrement</span>
            <span className="text-indigo-400">PostgreSQL</span>
          </div>
        </div>
      );

    case 'devops-arch':
      return (
        <div className="w-full h-full bg-[#08090d] p-4 flex flex-col justify-between font-mono select-none overflow-hidden relative border-b border-white/[0.06]">
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-white font-semibold">K8S CLUSTER DEPLOYMENT</span>
            </div>
            <span className="text-emerald-400 text-[9px]">● Rolling Updates Active</span>
          </div>

          {/* Architecture flow */}
          <div className="grid grid-cols-4 gap-1.5 my-2 text-center text-[9px]">
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.08]">
              <span className="text-slate-400 block">1. GitHub</span>
              <span className="text-indigo-300">Push Hook</span>
            </div>
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.08]">
              <span className="text-slate-400 block">2. Actions</span>
              <span className="text-emerald-400">CI Build</span>
            </div>
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.08]">
              <span className="text-slate-400 block">3. Docker</span>
              <span className="text-cyan-300">Alpine Img</span>
            </div>
            <div className="p-1.5 rounded bg-indigo-950/40 border border-indigo-500/30">
              <span className="text-indigo-200 block">4. Pods</span>
              <span className="text-white font-bold">K8s Multi</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-white/[0.05]">
            <span>Spring Boot Java 17 + React Nginx Pods</span>
            <span className="text-slate-400">Zero-Downtime</span>
          </div>
        </div>
      );

    case 'ai-simulation':
      return (
        <div className="w-full h-full bg-[#090b10] p-4 flex flex-col justify-between font-mono select-none overflow-hidden relative border-b border-white/[0.06]">
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-white font-semibold">4-WAY TRAFFIC SIMULATION</span>
            </div>
            <span className="text-indigo-400 text-[9px]">Google Colab</span>
          </div>

          {/* 4-way intersection grid visual */}
          <div className="my-2 p-2 rounded bg-black/40 border border-white/[0.05] flex items-center justify-around text-center text-[10px]">
            <div>
              <span className="text-slate-500 block text-[8px]">NORTH</span>
              <span className="text-emerald-400 font-bold">GREEN (24s)</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <span className="text-slate-500 block text-[8px]">SOUTH</span>
              <span className="text-emerald-400 font-bold">GREEN (24s)</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <span className="text-slate-500 block text-[8px]">EAST/WEST</span>
              <span className="text-rose-400 font-bold">HOLD (Queue: 8)</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-white/[0.05]">
            <span>Dynamic Queue Pressure Logic</span>
            <span className="text-cyan-400">Experimental Analysis</span>
          </div>
        </div>
      );

    case 'automation-flow':
      return (
        <div className="w-full h-full bg-[#08090e] p-4 flex flex-col justify-between font-mono select-none overflow-hidden relative border-b border-white/[0.06]">
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-white font-semibold">TELEGRAM BOT AUTOMATION</span>
            </div>
            <span className="text-emerald-400 text-[9px]">● Online</span>
          </div>

          {/* Bot Chat simulation */}
          <div className="space-y-1.5 my-2 text-[10px]">
            <div className="p-1.5 rounded bg-white/[0.03] text-slate-300">
              <span className="text-indigo-400 font-semibold">User:</span> /find CSE 3-1 syllabus pdf
            </div>
            <div className="p-1.5 rounded bg-indigo-950/30 border border-indigo-500/20 text-indigo-200 flex items-center justify-between">
              <span>
                <strong className="text-white">Bot:</strong> Found via OCR index in 1.4s
              </span>
              <span className="text-[8px] bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-300">
                SENT PDF
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-white/[0.05]">
            <span>Python · Poppler OCR · Telegram Bot API</span>
            <span className="text-slate-400">Zero Manual Search</span>
          </div>
        </div>
      );

    case 'iot-embedded':
      return (
        <div className="w-full h-full bg-[#08090d] p-4 flex flex-col justify-between font-mono select-none overflow-hidden relative border-b border-white/[0.06]">
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-white font-semibold">EMBEDDED HARDWARE TELEMETRY</span>
            </div>
            <span className="text-amber-400 text-[9px]">GPIO Connected</span>
          </div>

          {/* Sensor readings simulation */}
          <div className="grid grid-cols-3 gap-2 my-2 text-center">
            <div className="p-1.5 rounded bg-black/40 border border-white/[0.06]">
              <span className="text-[8px] text-slate-400 block">VOLTAGE</span>
              <span className="text-xs font-bold text-white">12.6 V</span>
            </div>
            <div className="p-1.5 rounded bg-black/40 border border-white/[0.06]">
              <span className="text-[8px] text-slate-400 block">CURRENT</span>
              <span className="text-xs font-bold text-cyan-300">1.84 A</span>
            </div>
            <div className="p-1.5 rounded bg-black/40 border border-white/[0.06]">
              <span className="text-[8px] text-slate-400 block">TEMP</span>
              <span className="text-xs font-bold text-emerald-400">31.2°C</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-white/[0.05]">
            <span>I2C LCD · Offline Vosk / Sensors · Relay Cutoff</span>
            <span className="text-emerald-400">100% Offline</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
