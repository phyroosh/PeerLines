// Metaphor 8: DNA Helix & Genetic Blueprint
import React from 'react';

export interface DnaHelixProps {
  x: number;
  y: number;
  scale?: number;
  speed?: number;
  label?: string;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const DnaHelix: React.FC<DnaHelixProps> = ({
  x,
  y,
  scale = 1.0,
  speed = 1.0,
  label = 'EVOLUTIONARY SURVIVAL',
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const steps = 9;
  const height = 180;
  const width = 45;
  const phase = (frame * 0.08 * speed) % (Math.PI * 2);

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-90}
          y={-height / 2 - 40}
          width={180}
          height={height + 80}
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
          y={-height / 2 - 15}
          fill="#38BDF8"
          fontSize={14}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
          letterSpacing={1.2}
        >
          {label}
        </text>
      )}

      {/* Base pair rungs and backbone nodes */}
      {Array.from({ length: steps }).map((_, i) => {
        const py = -height / 2 + (i / (steps - 1)) * height;
        const currentAngle = phase + (i / steps) * Math.PI * 2.5;
        const x1 = Math.sin(currentAngle) * width;
        const x2 = -x1;
        const depth = Math.cos(currentAngle);
        const opacity = 0.4 + 0.6 * ((depth + 1) / 2);

        return (
          <g key={i}>
            {/* Connecting base pair rung */}
            <line
              x1={x1}
              y1={py}
              x2={x2}
              y2={py}
              stroke="#F4F4F6"
              strokeWidth={2}
              opacity={opacity}
            />

            {/* Left Strand Node */}
            <circle
              cx={x1}
              cy={py}
              r={4}
              fill="#38BDF8"
              stroke="#F4F4F6"
              strokeWidth={1.5}
            />

            {/* Right Strand Node */}
            <circle
              cx={x2}
              cy={py}
              r={4}
              fill="#FACC15"
              stroke="#F4F4F6"
              strokeWidth={1.5}
            />
          </g>
        );
      })}
    </g>
  );
};
