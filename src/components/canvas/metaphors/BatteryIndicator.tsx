// Metaphor 3: Battery Indicator
import React from 'react';

export interface BatteryIndicatorProps {
  x: number;
  y: number;
  scale?: number;
  chargePercent?: number; // 0 to 100
  state?: 'empty' | 'charging' | 'full';
  glowing?: boolean;
  label?: string;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const BatteryIndicator: React.FC<BatteryIndicatorProps> = ({
  x,
  y,
  scale = 1.0,
  chargePercent = 20,
  state = 'empty',
  glowing = true,
  label = 'SOCIAL BATTERY',
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const percent = Math.max(0, Math.min(100, chargePercent));
  const isCritical = percent <= 20;

  // Flash / pulse if critical low
  const pulse = isCritical && glowing ? 1 + 0.08 * Math.sin(frame * 0.3) : 1;
  const fillColor = isCritical ? '#EF4444' : percent > 60 ? '#10B981' : '#FACC15';

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale * pulse})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-100}
          y={-65}
          width={200}
          height={140}
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
          x={-5}
          y={-30}
          fill="#F4F4F6"
          fontSize={15}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
          letterSpacing={1.2}
        >
          {label}
        </text>
      )}

      {/* Main battery body */}
      <rect
        x={-75}
        y={-18}
        width={130}
        height={60}
        rx={8}
        fill="#121316"
        stroke="#F4F4F6"
        strokeWidth={3.5}
      />

      {/* Battery positive terminal nub */}
      <rect
        x={58}
        y={0}
        width={10}
        height={24}
        rx={3}
        fill="#F4F4F6"
      />

      {/* Inner Charge Fill */}
      <rect
        x={-70}
        y={-13}
        width={Math.max(4, 120 * (percent / 100))}
        height={50}
        rx={5}
        fill={fillColor}
        opacity={0.9}
      />

      {/* Charging Lightning Bolt or Critical Exclamation */}
      {state === 'charging' ? (
        <path
          d="M -5 -25 L -18 8 L -4 8 L -14 35 L 12 0 L -2 0 Z"
          fill="#FACC15"
          stroke="#0C0C0E"
          strokeWidth={2}
        />
      ) : isCritical ? (
        <text
          x={-10}
          y={22}
          fill="#FFFFFF"
          fontSize={22}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
        >
          !
        </text>
      ) : (
        <text
          x={-10}
          y={20}
          fill="#0C0C0E"
          fontSize={16}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
        >
          {percent}%
        </text>
      )}
    </g>
  );
};
