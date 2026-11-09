// Metaphor 5: Severed Connection & Broken Ties
import React from 'react';

export interface SeveredConnectionProps {
  x: number;
  y: number;
  scale?: number;
  cutState?: 'connected' | 'snapping' | 'cut';
  hasScissors?: boolean;
  label?: string;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const SeveredConnection: React.FC<SeveredConnectionProps> = ({
  x,
  y,
  scale = 1.0,
  cutState = 'snapping',
  hasScissors = true,
  label = 'SEVERED CONNECTION',
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const isCut = cutState === 'cut' || cutState === 'snapping';
  const snapGap = isCut ? Math.min(45, 15 + (frame % 30) * 1.2) : 0;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-200}
          y={-90}
          width={400}
          height={180}
          fill="rgba(250, 204, 21, 0.06)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {/* Label */}
      {label && (
        <text
          x={0}
          y={-50}
          fill="#EF4444"
          fontSize={15}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
          letterSpacing={1.2}
        >
          {label}
        </text>
      )}

      {/* Left node */}
      <circle cx={-160} cy={0} r={8} fill="#F4F4F6" />

      {/* Right node */}
      <circle cx={160} cy={0} r={8} fill="#F4F4F6" />

      {!isCut ? (
        // Intact connected thread
        <line
          x1={-160}
          y1={0}
          x2={160}
          y2={0}
          stroke="#F4F4F6"
          strokeWidth={3.5}
        />
      ) : (
        // Severed Cord with Frayed Ends
        <g>
          {/* Left half snapping back */}
          <path
            d={`M -160 0 Q ${-80 - snapGap * 0.5} ${-10} ${-10 - snapGap} ${-5}`}
            stroke="#F4F4F6"
            strokeWidth={3.5}
            fill="none"
            strokeLinecap="round"
          />
          {/* Frayed left strands */}
          <line
            x1={-10 - snapGap}
            y1={-5}
            x2={-2 - snapGap}
            y2={-14}
            stroke="#EF4444"
            strokeWidth={2}
          />
          <line
            x1={-10 - snapGap}
            y1={-5}
            x2={-1 - snapGap}
            y2={6}
            stroke="#EF4444"
            strokeWidth={2}
          />

          {/* Right half snapping back */}
          <path
            d={`M 160 0 Q ${80 + snapGap * 0.5} ${10} ${10 + snapGap} ${5}`}
            stroke="#F4F4F6"
            strokeWidth={3.5}
            fill="none"
            strokeLinecap="round"
          />
          {/* Frayed right strands */}
          <line
            x1={10 + snapGap}
            y1={5}
            x2={2 + snapGap}
            y2={-6}
            stroke="#EF4444"
            strokeWidth={2}
          />
          <line
            x1={10 + snapGap}
            y1={5}
            x2={3 + snapGap}
            y2={15}
            stroke="#EF4444"
            strokeWidth={2}
          />

          {/* Snapping spark burst */}
          <g transform="translate(0, 0)">
            <circle cx={0} cy={0} r={3} fill="#EF4444" />
            <line x1={-6} y1={-8} x2={-14} y2={-18} stroke="#FACC15" strokeWidth={2} />
            <line x1={6} y1={-8} x2={14} y2={-18} stroke="#FACC15" strokeWidth={2} />
            <line x1={0} y1={10} x2={0} y2={20} stroke="#FACC15" strokeWidth={2} />
          </g>
        </g>
      )}

      {/* Animated Scissors */}
      {hasScissors && (
        <g transform="translate(0, -22) scale(1.1)">
          <circle cx={-12} cy={22} r={8} stroke="#EF4444" strokeWidth={2.5} fill="none" />
          <circle cx={12} cy={22} r={8} stroke="#EF4444" strokeWidth={2.5} fill="none" />
          <line x1={-9} y1={16} x2={16} y2={-18} stroke="#F4F4F6" strokeWidth={3} strokeLinecap="round" />
          <line x1={9} y1={16} x2={-16} y2={-18} stroke="#F4F4F6" strokeWidth={3} strokeLinecap="round" />
          <circle cx={0} cy={0} r={3} fill="#EF4444" />
        </g>
      )}
    </g>
  );
};
