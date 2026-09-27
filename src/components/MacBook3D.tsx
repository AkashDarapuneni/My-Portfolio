import React from 'react';

interface MacBook3DProps {
  lidAngle: number; // 0 (closed) to 105 (fully open)
  zoomScale: number; // 1 (normal) to 4+ (fullscreen zoom)
  translateY: number; // vertical offset
  tiltX: number; // slight 3D perspective tilt
  tiltY: number; // subtle mouse parallax tilt
  screenOpacity: number; // screen glow opacity
  children: React.ReactNode;
}

export const MacBook3D: React.FC<MacBook3DProps> = ({
  lidAngle,
  zoomScale,
  translateY,
  tiltX,
  tiltY,
  screenOpacity,
  children,
}) => {
  // Normalize opening progress from 0 (closed) to 1 (fully open at 104 deg)
  const openProgress = Math.min(Math.max(lidAngle / 104, 0), 1);

  // Physically accurate hinge kinematics:
  // Base slopes forward from hinge at 58deg.
  // When closed (openProgress = 0): Lid is folded down flat onto the base at 122deg.
  // When fully open (openProgress = 1): Lid opens up and back to -12deg (104 deg relative to base).
  // When zoomed in: lid straightens to 0deg for flat screen takeover.
  const baseAngle = 58;
  const closedAngle = 180 - baseAngle; // 122deg
  const openAngle = -12;
  const rawLidRotateX = closedAngle - openProgress * (closedAngle - openAngle);

  // When zooming into the screen, blend lidRotateX smoothly towards 0deg
  const zoomFactor = Math.min(Math.max((zoomScale - 1) / 2.2, 0), 1);
  const lidRotateX = rawLidRotateX * (1 - zoomFactor);

  // Base tilt adjusts smoothly: closed laptop is tilted slightly to show off the silver top lid and emblem
  const laptopTiltX = tiltX * (1 - zoomFactor * 0.95);
  const laptopTiltY = tiltY * (1 - zoomFactor);

  // Smooth origin shift towards screen center during dolly-zoom
  const originY = 50 - zoomFactor * 32;

  // Dynamic floor shadow opacity
  const shadowOpacity = Math.max(0.35, Math.min(0.85, 0.4 + openProgress * 0.4));

  return (
    <div
      className="relative flex items-center justify-center pointer-events-auto transition-transform duration-75 ease-out select-none"
      style={{
        perspective: '1600px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Complete Laptop Unit with Zoom, Tilt & Translation */}
      <div
        className="relative transition-transform duration-75 ease-out"
        style={{
          transformOrigin: `50% ${originY}%`,
          transform: `translate3d(0, ${translateY}px, 0) rotateX(${laptopTiltX}deg) rotateY(${laptopTiltY}deg) scale(${zoomScale})`,
          transformStyle: 'preserve-3d',
          width: 'min(90vw, 920px)',
          height: 'min(58vw, 580px)',
        }}
      >
        {/* Soft Ambient Shadow on the surface beneath the laptop */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] h-[60%] rounded-[100%] bg-black/60 blur-3xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: shadowOpacity,
            transform: 'translate(-50%, 60%) translateZ(-40px)',
          }}
        />

        {/* Ambient Cyan/Electric Glow under the chassis */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[35%] rounded-full bg-cyan-500/15 blur-3xl pointer-events-none transition-opacity duration-500"
          style={{
            opacity: openProgress > 0.2 ? 0.6 : 0.1,
            transform: 'translate(-50%, 65%) translateZ(-30px)',
          }}
        />

        {/* 1. KEYBOARD BASE (LOWER CHASSIS) - LIQUID SILVER & TITANIUM ALUMINUM */}
        {/* Anchored at top center (hinge line) and extends forward and down */}
        <div
          className="absolute left-0 right-0 h-[88%] rounded-b-2xl rounded-t-sm shadow-2xl transition-all"
          style={{
            top: '50%',
            transformOrigin: 'top center',
            transform: `rotateX(${baseAngle}deg) translateZ(-1px)`,
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 20%, #e2e8f0 45%, #cbd5e1 70%, #94a3b8 100%)',
            boxShadow:
              '0 35px 75px -15px rgba(0, 0, 0, 0.9), 0 0 0 1.5px rgba(255, 255, 255, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -2px 6px rgba(100, 116, 139, 0.4)',
          }}
        >
          {/* Silver Chamfered Rim Highlight */}
          <div className="absolute inset-0 rounded-b-2xl border-t border-white/90 pointer-events-none" />

          {/* Front thumb recess for opening */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2.5 bg-[#cbd5e1] rounded-t-md border-t border-x border-slate-400/60 shadow-inner" />

          {/* Precision Laser-Milled Speaker Grilles (Left & Right) */}
          <div className="absolute top-8 left-4 w-6 h-36 opacity-40 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:3px_3px] hidden sm:block" />
          <div className="absolute top-8 right-4 w-6 h-36 opacity-40 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:3px_3px] hidden sm:block" />

          {/* Keyboard Well / Inset Tray (Anodized Dark Space Gray with Backlit Keys) */}
          <div className="mx-auto mt-6 w-[86%] h-[58%] bg-[#0f172a] rounded-xl p-2 border border-slate-600/70 shadow-[inset_0_3px_10px_rgba(0,0,0,0.9)] flex flex-col justify-between">
            {/* Function Row */}
            <div className="grid grid-cols-14 gap-1 h-[14%]">
              {['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'pwr'].map((key, i) => (
                <div
                  key={i}
                  className="bg-[#1e293b] rounded-[2px] border-b border-slate-950 shadow-sm flex items-center justify-center hover:bg-[#334155] transition-colors"
                >
                  <span className="text-[6px] text-slate-300 font-mono hidden sm:inline">{key}</span>
                </div>
              ))}
            </div>

            {/* Number Row */}
            <div className="grid grid-cols-14 gap-1 h-[18%]">
              {['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'del'].map((k, i) => (
                <div key={i} className="bg-[#1e293b] rounded-[3px] border-b border-slate-950 flex items-center justify-center shadow-sm">
                  <span className="text-[7px] text-slate-200 font-mono hidden sm:inline">{k}</span>
                </div>
              ))}
            </div>

            {/* QWERTY Row */}
            <div className="grid grid-cols-14 gap-1 h-[18%]">
              {['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((k, i) => (
                <div key={i} className="bg-[#1e293b] rounded-[3px] border-b border-slate-950 flex items-center justify-center shadow-sm">
                  <span className="text-[7px] text-slate-200 font-mono hidden sm:inline">{k}</span>
                </div>
              ))}
            </div>

            {/* ASDF Row */}
            <div className="grid grid-cols-13 gap-1 h-[18%]">
              {['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'return'].map((k, i) => (
                <div key={i} className="bg-[#1e293b] rounded-[3px] border-b border-slate-950 flex items-center justify-center shadow-sm">
                  <span className="text-[7px] text-slate-200 font-mono hidden sm:inline">{k}</span>
                </div>
              ))}
            </div>

            {/* Spacebar Row */}
            <div className="flex gap-1 h-[20%]">
              <div className="w-[12%] bg-[#1e293b] rounded-[3px] flex items-center justify-center">
                <span className="text-[7px] text-slate-300 font-mono hidden sm:inline">ctrl</span>
              </div>
              <div className="w-[10%] bg-[#1e293b] rounded-[3px] flex items-center justify-center">
                <span className="text-[7px] text-slate-300 font-mono hidden sm:inline">opt</span>
              </div>
              <div className="w-[11%] bg-[#1e293b] rounded-[3px] flex items-center justify-center">
                <span className="text-[7px] text-slate-300 font-mono hidden sm:inline">cmd</span>
              </div>
              <div className="flex-1 bg-[#243044] rounded-[3px] border-b border-slate-950 shadow-inner flex items-center justify-center">
                <span className="text-[7px] text-slate-400 font-mono tracking-widest">AKASH DARAPUNENI</span>
              </div>
              <div className="w-[11%] bg-[#1e293b] rounded-[3px] flex items-center justify-center">
                <span className="text-[7px] text-slate-300 font-mono hidden sm:inline">cmd</span>
              </div>
              <div className="w-[10%] bg-[#1e293b] rounded-[3px] flex items-center justify-center">
                <span className="text-[7px] text-slate-300 font-mono hidden sm:inline">opt</span>
              </div>
            </div>
          </div>

          {/* Large Force Touch Glass Trackpad with Fine Silver Bevel */}
          <div className="mx-auto mt-3.5 w-[38%] h-[28%] bg-[#e2e8f0]/90 rounded-xl border border-slate-400/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(255,255,255,0.8)] backdrop-blur-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400/40" />
          </div>
        </div>

        {/* 2. SOLID SILVER/TITANIUM CYLINDRICAL HINGE BARREL */}
        {/* Sits right at the center line (50%) where lid and base meet */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-4 rounded-full border border-slate-400/80 shadow-lg z-20"
          style={{
            transform: 'translate(-50%, -50%) translateZ(4px)',
            background: 'linear-gradient(90deg, #475569 0%, #cbd5e1 15%, #ffffff 48%, #cbd5e1 78%, #475569 100%)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
          }}
        />

        {/* 3. DISPLAY LID (UPPER CHASSIS WITH SMOOTH HINGE ROTATION) */}
        {/* Anchored at bottom center (hinge line) and extends upward */}
        <div
          className="absolute left-0 right-0 h-[92%] rounded-2xl transition-all ease-out"
          style={{
            bottom: '50%',
            transformOrigin: 'bottom center',
            transform: `rotateX(${lidRotateX}deg)`,
            transformStyle: 'preserve-3d',
            boxShadow: openProgress < 0.2
              ? 'none'
              : '0 30px 80px -20px rgba(0, 0, 0, 0.95), 0 0 0 1.5px rgba(255, 255, 255, 0.6)',
          }}
        >
          {/* --- A. BACK OF THE LID (TOP ALUMINUM COVER - Visible when laptop is closed) --- */}
          {/* Facing backward in local 3D space, with translateZ(-2px) so it never clips with screen */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-white/80 shadow-2xl overflow-hidden"
            style={{
              transform: 'translateZ(-2px) rotateY(180deg)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 18%, #e2e8f0 40%, #cbd5e1 65%, #94a3b8 85%, #f8fafc 100%)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Anisotropic brushed aluminum grain & light beam */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Apple-style Polished Chrome AD Monogram Emblem with soft halo */}
            <div className="relative w-24 h-24 rounded-full border-2 border-white flex items-center justify-center bg-white/40 backdrop-blur-md shadow-2xl group">
              <span className="text-slate-900 font-mono font-extrabold text-2xl tracking-widest drop-shadow-sm">
                AD
              </span>
              <div className="absolute -bottom-1.5 w-8 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
            </div>

            {/* Laser Inscription */}
            <div className="absolute bottom-6 text-center pointer-events-none">
              <span className="text-[12px] font-mono tracking-widest text-slate-800 font-bold uppercase drop-shadow-sm">
                MacBook Pro · Akash Darapuneni
              </span>
              <p className="text-[10px] font-mono text-slate-600 mt-0.5">
                B.Tech CSE (2023–2027) · KL University
              </p>
            </div>

            {/* Subtle hinge shadow indicator at the bottom edge */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-400/40 to-transparent pointer-events-none" />
          </div>

          {/* --- B. FRONT OF THE LID (SILVER METAL BEZEL & HIGH-RES DISPLAY) --- */}
          {/* Facing forward in local 3D space, with translateZ(2px) */}
          <div
            className="absolute inset-0 bg-[#050505] p-2.5 sm:p-3 flex flex-col rounded-2xl overflow-hidden border-2 border-slate-300/90 shadow-2xl"
            style={{
              transform: 'translateZ(2px)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Top Bezel with Camera Notch & TrueTone Sensor */}
            <div className="relative h-4 w-full flex items-center justify-center pointer-events-none z-30">
              <div className="w-24 h-3.5 bg-black rounded-b-lg border-b border-x border-slate-700/60 flex items-center justify-center gap-2 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600" />
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
              </div>
            </div>

            {/* SCREEN DISPLAY VIEWPORT */}
            <div
              className="relative flex-1 w-full bg-[#050505] rounded-lg overflow-hidden border border-cyan-500/30 shadow-2xl"
              style={{
                opacity: screenOpacity,
              }}
            >
              {/* Screen Ambient Rim Glow */}
              <div
                className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(6, 182, 212, 0.25)',
                  opacity: openProgress > 0.15 ? 1 : 0,
                }}
              />

              {/* Glass Diagonal Reflection */}
              <div
                className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent"
                style={{ opacity: openProgress > 0.15 ? 0.7 : 0 }}
              />

              {/* Screen Content: Live Interactive Portfolio */}
              <div className="w-full h-full overflow-y-auto overflow-x-hidden relative">
                {children}
              </div>
            </div>

            {/* Bottom Bezel with MacBook Pro label in crisp silver */}
            <div className="h-3.5 w-full flex items-center justify-center pointer-events-none">
              <span className="text-[9px] font-mono tracking-widest text-slate-300 font-semibold drop-shadow-sm">
                MacBook Pro
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
