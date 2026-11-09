// Metaphor 2: Metric Meter (Vertical or Horizontal Gauge)
import React from 'react';

export interface MetricMeterProps {
  x: number;
  y: number;
  scale?: number;
  label?: string;
  level?: number; // 0.0 to 1.0
  color?: string; // e.g. #EF4444 or #FACC15
  type?: 'vertical' | 'horizontal';
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const MetricMeter: React.FC<MetricMeterProps> = ({
  x,
  y,
  scale = 1.0,
  label = 'PAIN',
  level = 0.8,
  color = '#EF4444',
  type = 'vertical',
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const clamped = Math.max(0, Math.min(1, level));
  const isVertical = type === 'vertical';

  // Pulsing glow when level > 0.7
  const pulse = clamped > 0.7 ? 1 + 0.08 * Math.sin(frame * 0.25) : 1;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale * pulse})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={isVertical ? -65 : -140}
          y={isVertical ? -180 : -50}
          width={isVertical ? 130 : 280}
          height={isVertical ? 240 : 100}
          fill="rgba(250, 204, 21, 0.06)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {isVertical ? (
        // Vertical Meter (like a medical / adrenaline thermometer)
        <g>
          {/* Label */}
          <text
            x={0}
            y={-140}
            fill="#F4F4F6"
            fontSize={17}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
            textAnchor="middle"
            letterSpacing={1.5}
          >
            {label}
          </text>

          {/* Tube casing */}
          <rect
            x={-18}
            y={-120}
            width={36}
            height={160}
            rx={18}
            fill="#121316"
            stroke="#F4F4F6"
            strokeWidth={3}
          />

          {/* Fluid fill from bottom */}
          <rect
            x={-14}
            y={40 - 150 * clamped}
            width={28}
            height={150 * clamped}
            rx={14}
            fill={color}
          />

          {/* Glowing bottom reservoir bulb */}
          <circle
            cx={0}
            cy={45}
            r={24}
            fill={color}
            stroke="#F4F4F6"
            strokeWidth={3}
          />

          {/* Level Percentage */}
          <text
            x={0}
            y={50}
            fill="#0C0C0E"
            fontSize={13}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
            textAnchor="middle"
          >
            {Math.round(clamped * 100)}%
          </text>

          {/* Tick marks */}
          {[0.25, 0.5, 0.75].map((t, idx) => (
            <line
              key={idx}
              x1={22}
              y1={-120 + 160 * (1 - t)}
              x2={32}
              y2={-120 + 160 * (1 - t)}
              stroke="#9CA3AF"
              strokeWidth={2}
            />
          ))}
        </g>
      ) : (
        // Horizontal Meter
        <g>
          <text
            x={-110}
            y={-15}
            fill="#F4F4F6"
            fontSize={16}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
            letterSpacing={1.2}
          >
            {label}
          </text>
          <text
            x={110}
            y={-15}
            fill={color}
            fontSize={16}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
            textAnchor="end"
          >
            {Math.round(clamped * 100)}%
          </text>

          {/* Outer bar */}
          <rect
            x={-110}
            y={0}
            width={220}
            height={26}
            rx={13}
            fill="#121316"
            stroke="#F4F4F6"
            strokeWidth={3}
          />
          {/* Inner fill */}
          <rect
            x={-107}
            y={3}
            width={214 * clamped}
            height={20}
            rx={10}
            fill={color}
          />
        </g>
      )}
    </g>
  );
};
