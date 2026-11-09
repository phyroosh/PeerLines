// Metaphor 1: Balance Scale
import React from 'react';

export interface BalanceScaleProps {
  x: number;
  y: number;
  scale?: number;
  tilt?: number; // degrees, e.g. -20 to +20
  leftLabel?: string;
  rightLabel?: string;
  frame?: number;
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const BalanceScale: React.FC<BalanceScaleProps> = ({
  x,
  y,
  scale = 1.0,
  tilt = -15,
  leftLabel = 'EFFORT',
  rightLabel = 'REWARD',
  frame = 0,
  color = '#F4F4F6',
  isSelected = false,
  onClick,
}) => {
  // Slight organic wobble around tilt angle
  const wobble = Math.sin(frame * 0.08) * 1.5;
  const currentTilt = tilt + wobble;

  const beamLength = 180;
  const rad = (currentTilt * Math.PI) / 180;
  const lx = -beamLength * Math.cos(rad);
  const ly = -beamLength * Math.sin(rad);
  const rx = beamLength * Math.cos(rad);
  const ry = beamLength * Math.sin(rad);

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-240}
          y={-140}
          width={480}
          height={280}
          fill="rgba(250, 204, 21, 0.06)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {/* Triangular Fulcrum Base */}
      <polygon
        points="0,-40 -35,50 35,50"
        fill="#141418"
        stroke={color}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <circle cx={0} cy={-40} r={6} fill={color} />

      {/* Horizontal / Tilted Beam */}
      <line
        x1={lx}
        y1={-40 + ly}
        x2={rx}
        y2={-40 + ry}
        stroke={color}
        strokeWidth={4.5}
        strokeLinecap="round"
      />

      {/* Left Pan */}
      <g transform={`translate(${lx}, ${-40 + ly})`}>
        {/* Suspension strings */}
        <line x1={0} y1={0} x2={-40} y2={60} stroke={color} strokeWidth={2} />
        <line x1={0} y1={0} x2={40} y2={60} stroke={color} strokeWidth={2} />
        {/* Pan dish */}
        <path
          d="M -50 60 Q 0 85 50 60 Z"
          fill="#1C1D22"
          stroke={color}
          strokeWidth={3}
        />
        {/* Left Label */}
        {leftLabel && (
          <text
            x={0}
            y={110}
            fill="#FACC15"
            fontSize={16}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
            textAnchor="middle"
          >
            {leftLabel}
          </text>
        )}
      </g>

      {/* Right Pan */}
      <g transform={`translate(${rx}, ${-40 + ry})`}>
        {/* Suspension strings */}
        <line x1={0} y1={0} x2={-40} y2={60} stroke={color} strokeWidth={2} />
        <line x1={0} y1={0} x2={40} y2={60} stroke={color} strokeWidth={2} />
        {/* Pan dish */}
        <path
          d="M -50 60 Q 0 85 50 60 Z"
          fill="#1C1D22"
          stroke={color}
          strokeWidth={3}
        />
        {/* Right Label */}
        {rightLabel && (
          <text
            x={0}
            y={110}
            fill="#9CA3AF"
            fontSize={16}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
            textAnchor="middle"
          >
            {rightLabel}
          </text>
        )}
      </g>
    </g>
  );
};
