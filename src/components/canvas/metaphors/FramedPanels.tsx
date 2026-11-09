// Metaphor 12: Framed Split-Screen Comparison Panels (from inspiration videos)
import React from 'react';

export interface FramedPanelsProps {
  x: number;
  y: number;
  scale?: number;
  topText?: string;
  bottomText?: string;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const FramedPanels: React.FC<FramedPanelsProps> = ({
  x,
  y,
  scale = 1.0,
  topText = "DOESN'T CARE?",
  bottomText = 'NOT ATTRACTED?',
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const panelWidth = 360;
  const panelHeight = 55;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-panelWidth / 2 - 15}
          y={-panelHeight - 35}
          width={panelWidth + 30}
          height={panelHeight * 2 + 55}
          fill="rgba(250, 204, 21, 0.06)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {/* Top Panel Box */}
      <g transform={`translate(0, ${-panelHeight / 2 - 10})`}>
        <rect
          x={-panelWidth / 2}
          y={-panelHeight / 2}
          width={panelWidth}
          height={panelHeight}
          rx={6}
          fill="#141418"
          stroke="#F4F4F6"
          strokeWidth={3}
        />
        <text
          x={0}
          y={6}
          fill="#F4F4F6"
          fontSize={16}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
          letterSpacing={1.5}
        >
          {topText}
        </text>
      </g>

      {/* Bottom Panel Box */}
      <g transform={`translate(0, ${panelHeight / 2 + 10})`}>
        <rect
          x={-panelWidth / 2}
          y={-panelHeight / 2}
          width={panelWidth}
          height={panelHeight}
          rx={6}
          fill="#141418"
          stroke="#F4F4F6"
          strokeWidth={3}
        />
        <text
          x={0}
          y={6}
          fill="#FACC15"
          fontSize={16}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
          letterSpacing={1.5}
        >
          {bottomText}
        </text>
      </g>
    </g>
  );
};
