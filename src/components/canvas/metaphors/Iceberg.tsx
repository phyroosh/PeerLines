// Metaphor 4: Iceberg of Reality / Success
import React from 'react';

export interface IcebergProps {
  x: number;
  y: number;
  scale?: number;
  tipLabel?: string;
  underwaterLabel?: string;
  waterLineY?: number;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const Iceberg: React.FC<IcebergProps> = ({
  x,
  y,
  scale = 1.0,
  tipLabel = 'WHAT YOU SEE',
  underwaterLabel = 'THE SACRIFICE',
  waterLineY = 0,
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const waveJitter = Math.sin(frame * 0.1) * 3;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-220}
          y={-180}
          width={440}
          height={400}
          fill="rgba(250, 204, 21, 0.06)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {/* Underwater Tint Zone */}
      <rect
        x={-210}
        y={waterLineY}
        width={420}
        height={210}
        fill="rgba(56, 189, 248, 0.04)"
      />

      {/* Massive Underwater Iceberg Structure */}
      <polygon
        points="-120,0 -185,160 -40,195 80,185 175,130 90,0"
        fill="#12161E"
        stroke="#F4F4F6"
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      {/* Underwater Facet lines */}
      <line x1={-30} y1={0} x2={-40} y2={195} stroke="#38BDF8" strokeWidth={2} opacity={0.6} />
      <line x1={40} y1={0} x2={80} y2={185} stroke="#38BDF8" strokeWidth={2} opacity={0.6} />

      {/* Visible Iceberg Peak Above Water */}
      <polygon
        points="-75,0 -15,-110 30,-90 65,0"
        fill="#1E2430"
        stroke="#F4F4F6"
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <line x1={-15} y1={-110} x2={5} y2={0} stroke="#F4F4F6" strokeWidth={2.5} />

      {/* Water Surface Line with Hand-Drawn Ripple */}
      <path
        d={`M -210 ${waterLineY + waveJitter} Q -100 ${waterLineY - 4 - waveJitter} 0 ${waterLineY + waveJitter} T 210 ${waterLineY - waveJitter}`}
        stroke="#38BDF8"
        strokeWidth={3.5}
        strokeDasharray="10 6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Surface Tip Label */}
      {tipLabel && (
        <g transform="translate(95, -70)">
          <line x1={-25} y1={0} x2={-5} y2={0} stroke="#FACC15" strokeWidth={2} />
          <text
            x={0}
            y={5}
            fill="#FACC15"
            fontSize={15}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
          >
            {tipLabel}
          </text>
        </g>
      )}

      {/* Massive Underwater Label */}
      {underwaterLabel && (
        <g transform="translate(0, 100)">
          <rect
            x={-100}
            y={-18}
            width={200}
            height={36}
            rx={6}
            fill="#0C0C0E"
            stroke="#9CA3AF"
            strokeWidth={1.5}
          />
          <text
            x={0}
            y={6}
            fill="#F4F4F6"
            fontSize={14}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
            textAnchor="middle"
            letterSpacing={1.2}
          >
            {underwaterLabel}
          </text>
        </g>
      )}
    </g>
  );
};
