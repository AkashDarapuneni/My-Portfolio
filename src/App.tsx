/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LaptopHeroScroll } from './components/LaptopHeroScroll';
import { TerminalModal } from './components/TerminalModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CustomCursor } from './components/CustomCursor';
import { Project } from './types/portfolio';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K to open interactive terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F8FAFC] relative">
      {/* Luxury custom cursor */}
      <CustomCursor />

      {/* Main Cinematic 3D Laptop Scroll Experience */}
      <main>
        <LaptopHeroScroll
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      </main>

      {/* Interactive Terminal Modal (Cmd+K) */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Deep-Dive Project Architecture Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
