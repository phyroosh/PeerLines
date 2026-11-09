// Metaphor 6: Isolation / Protection Shield
import React from 'react';

export interface IsolationShieldProps {
  x: number;
  y: number;
  scale?: number;
  radius?: number;
  glowColor?: string;
  label?: string;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const IsolationShield: React.FC<IsolationShieldProps> = ({
  x,
  y,
  scale = 1.0,
  radius = 180,
  glowColor = '#FACC15',
  label = 'PEACE',
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const pulse = 1 + 0.03 * Math.sin(frame * 0.12);
  const r = radius * pulse;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-r - 30}
          y={-r - 50}
          width={(r + 30) * 2}
          height={(r + 40) * 2}
          fill="rgba(250, 204, 21, 0.06)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {/* Subtle translucent shield core glow */}
      <circle
        cx={0}
        cy={0}
        r={r}
        fill={glowColor}
        opacity={0.06}
      />

      {/* Outer shield boundary stroke */}
      <circle
        cx={0}
        cy={0}
        r={r}
        stroke={glowColor}
        strokeWidth={3.5}
        strokeDasharray="14 8"
        fill="none"
      />

      {/* Second concentric wave */}
      <circle
        cx={0}
        cy={0}
        r={r - 12}
        stroke={glowColor}
        strokeWidth={1.5}
        strokeDasharray="6 6"
        fill="none"
        opacity={0.5}
      />

      {/* Deflected hostile arrows / noise */}
      {[
        { angle: -45, dist: r + 35 },
        { angle: -135, dist: r + 40 },
        { angle: 30, dist: r + 45 },
      ].map((arr, idx) => {
        const rad = (arr.angle * Math.PI) / 180;
        const ax = Math.cos(rad) * arr.dist;
        const ay = Math.sin(rad) * arr.dist;
        return (
          <g key={idx} transform={`translate(${ax}, ${ay}) rotate(${arr.angle + 180})`}>
            {/* Deflected Arrow */}
            <line x1={-30} y1={0} x2={0} y2={0} stroke="#EF4444" strokeWidth={2.5} />
            <polyline points="-10,-8 0,0 -10,8" stroke="#EF4444" strokeWidth={2.5} fill="none" />
            {/* Impact spark */}
            <circle cx={4} cy={0} r={3} fill="#FACC15" />
          </g>
        );
      })}

      {/* Shield Label Badge at top */}
      {label && (
        <g transform={`translate(0, ${-r - 15})`}>
          <rect
            x={-55}
            y={-14}
            width={110}
            height={28}
            rx={14}
            fill="#0C0C0E"
            stroke={glowColor}
            strokeWidth={2}
          />
          <text
            x={0}
            y={5}
            fill={glowColor}
            fontSize={13}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
            textAnchor="middle"
            letterSpacing={1.2}
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};
