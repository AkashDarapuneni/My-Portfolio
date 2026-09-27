import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tiltAngle, setTiltAngle] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device supports touch only
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Calculate movement angle and velocity for subtle cursor tilt
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      prevMousePos.current = { x: e.clientX, y: e.clientY };

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setTiltAngle(angle * 0.15); // subtle angle deflection
      }

      // Check for interactive targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]');
      if (cursorEl) {
        setLabel(cursorEl.getAttribute('data-cursor') || null);
        setIsHovered(true);
      } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
        setLabel(null);
        setIsHovered(true);
      } else {
        setLabel(null);
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Smooth position lerp animation loop
  useEffect(() => {
    if (isTouchDevice) return;
    let animId: number;

    const lerp = () => {
      setPos((prev) => ({
        x: prev.x + (mousePos.current.x - prev.x) * 0.24,
        y: prev.y + (mousePos.current.y - prev.y) * 0.24,
      }));
      animId = requestAnimationFrame(lerp);
    };

    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${tiltAngle}deg)`,
        opacity: pos.x > 0 ? 1 : 0,
      }}
    >
      {/* Outer fluid aura / badge */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-150 ease-out ${
          label
            ? 'px-3 py-1.5 rounded-full bg-slate-900/95 text-cyan-300 text-[10px] font-mono font-bold tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-400/50 backdrop-blur-md scale-100 gap-1'
            : isHovered
            ? `w-11 h-11 rounded-full border border-cyan-400/80 bg-cyan-500/10 backdrop-blur-[2px] ${isClicking ? 'scale-90 bg-cyan-400/25' : 'scale-100'}`
            : `w-7 h-7 rounded-full border border-slate-400/40 bg-white/[0.03] ${isClicking ? 'scale-75' : 'scale-100'}`
        }`}
      >
        {label ? (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="uppercase">{label}</span>
          </>
        ) : null}
      </div>

      {/* Center sharp glowing pinpoint */}
      {!label && (
        <div
          className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ${
            isHovered ? 'w-2 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]' : 'w-1.5 h-1.5 bg-white shadow-sm'
          } ${isClicking ? 'scale-150' : 'scale-100'}`}
        />
      )}
    </div>
  );
};
