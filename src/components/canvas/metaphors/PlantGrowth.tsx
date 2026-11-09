// Metaphor 9: Plant Growth & Healing
import React from 'react';

export interface PlantGrowthProps {
  x: number;
  y: number;
  scale?: number;
  growthStage?: number; // 0.0 to 1.0
  flowering?: boolean;
  label?: string;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const PlantGrowth: React.FC<PlantGrowthProps> = ({
  x,
  y,
  scale = 1.0,
  growthStage = 0.9,
  flowering = true,
  label = 'RESTORATION',
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const g = Math.max(0.1, Math.min(1.0, growthStage));
  const stemHeight = 120 * g;
  const sway = Math.sin(frame * 0.1) * 3;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-70}
          y={-170}
          width={140}
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
          y={-stemHeight - 40}
          fill="#10B981"
          fontSize={14}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
          letterSpacing={1.2}
        >
          {label}
        </text>
      )}

      {/* Small ground soil mound */}
      <path d="M -25 0 Q 0 -8 25 0 Z" fill="#1C1D22" stroke="#F4F4F6" strokeWidth={2} />

      {/* Growing Curving Stem */}
      <path
        d={`M 0 0 Q ${-10 + sway} ${-stemHeight * 0.5} ${0 + sway} ${-stemHeight}`}
        stroke="#10B981"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
      />

      {/* Leaves unfurled along stem */}
      {g > 0.3 && (
        <path
          d={`M ${-4 + sway * 0.3} ${-stemHeight * 0.4} Q -28 ${-stemHeight * 0.5} -32 ${-stemHeight * 0.35} Q -16 ${-stemHeight * 0.3} ${-4 + sway * 0.3} ${-stemHeight * 0.4}`}
          fill="#10B981"
          stroke="#F4F4F6"
          strokeWidth={1.5}
        />
      )}

      {g > 0.6 && (
        <path
          d={`M ${2 + sway * 0.6} ${-stemHeight * 0.7} Q 26 ${-stemHeight * 0.8} 30 ${-stemHeight * 0.65} Q 14 ${-stemHeight * 0.6} ${2 + sway * 0.6} ${-stemHeight * 0.7}`}
          fill="#10B981"
          stroke="#F4F4F6"
          strokeWidth={1.5}
        />
      )}

      {/* Blooming Flower on top */}
      {flowering && g > 0.8 && (
        <g transform={`translate(${sway}, ${-stemHeight - 12}) scale(${Math.min(1, (g - 0.7) * 3.3)})`}>
          {/* Flower Petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
            <ellipse
              key={idx}
              cx={0}
              cy={-10}
              rx={6}
              ry={11}
              fill="#FB7185"
              stroke="#F4F4F6"
              strokeWidth={1.5}
              transform={`rotate(${angle})`}
            />
          ))}
          {/* Center yellow pistil */}
          <circle cx={0} cy={0} r={6} fill="#FACC15" />
        </g>
      )}
    </g>
  );
};
