// Metaphor 7: Campfire & Warmth
import React from 'react';

export interface CampfireProps {
  x: number;
  y: number;
  scale?: number;
  flameIntensity?: number; // 0.0 to 1.0
  emberCount?: number;
  warmGlow?: boolean;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const Campfire: React.FC<CampfireProps> = ({
  x,
  y,
  scale = 1.0,
  flameIntensity = 0.8,
  emberCount = 12,
  warmGlow = true,
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  // Flickering wave
  const flick1 = Math.sin(frame * 0.3) * 6;
  const flick2 = Math.cos(frame * 0.25) * 8;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-80}
          y={-140}
          width={160}
          height={160}
          fill="rgba(250, 204, 21, 0.06)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {/* Warm Ambient Glow circle behind fire */}
      {warmGlow && (
        <circle
          cx={0}
          cy={-45}
          r={75 * flameIntensity}
          fill="rgba(249, 115, 22, 0.12)"
        />
      )}

      {/* Cross-stacked Wooden Logs */}
      <line x1={-45} y1={5} x2={45} y2={-10} stroke="#78350F" strokeWidth={7} strokeLinecap="round" />
      <line x1={-40} y1={-10} x2={40} y2={5} stroke="#9A3412" strokeWidth={7} strokeLinecap="round" />
      <line x1={-30} y1={2} x2={30} y2={2} stroke="#F4F4F6" strokeWidth={3} strokeLinecap="round" />

      {/* Outer Orange Flame */}
      <path
        d={`M -25 -5 Q ${-35 + flick1} -45 ${0 + flick2} -90 Q ${35 - flick1} -45 25 -5 Z`}
        fill="#F97316"
        opacity={0.85}
      />

      {/* Inner Yellow Core Flame */}
      <path
        d={`M -15 -5 Q ${-20 + flick2} -35 ${0 + flick1} -65 Q ${20 - flick2} -35 15 -5 Z`}
        fill="#FACC15"
      />

      {/* Hot White Heart */}
      <path
        d="M -7 -5 Q -10 -20 0 -35 Q 10 -20 7 -5 Z"
        fill="#FFFFFF"
        opacity={0.9}
      />

      {/* Rising Embers */}
      {Array.from({ length: Math.min(16, emberCount) }).map((_, idx) => {
        const offset = (frame * 1.5 + idx * 18) % 90;
        const ex = Math.sin(idx * 2 + frame * 0.1) * (15 + idx * 2);
        const ey = -50 - offset;
        const opacity = Math.max(0, 1 - offset / 90);
        return (
          <circle
            key={idx}
            cx={ex}
            cy={ey}
            r={1.5 + (idx % 2)}
            fill="#FACC15"
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};
