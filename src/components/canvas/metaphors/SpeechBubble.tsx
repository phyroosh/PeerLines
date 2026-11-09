// Metaphor 11: Speech / Thought Bubble
import React from 'react';

export interface SpeechBubbleProps {
  x: number;
  y: number;
  scale?: number;
  text?: string;
  tailPosition?: 'bottom-left' | 'bottom-center' | 'bottom-right';
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  x,
  y,
  scale = 1.0,
  text = 'DISCIPLINE IS FREEDOM',
  tailPosition = 'bottom-center',
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const width = Math.max(160, text.length * 11 + 40);
  const height = 65;

  let tailPoints = '0,32 -12,50 12,32';
  if (tailPosition === 'bottom-left') tailPoints = '-40,32 -60,50 -25,32';
  if (tailPosition === 'bottom-right') tailPoints = '25,32 60,50 40,32';

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-width / 2 - 15}
          y={-height / 2 - 15}
          width={width + 30}
          height={height + 55}
          fill="rgba(250, 204, 21, 0.06)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {/* Bubble Body */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx={16}
        fill="#141418"
        stroke="#F4F4F6"
        strokeWidth={3}
      />

      {/* Tail pointer */}
      <polygon points={tailPoints} fill="#141418" stroke="#F4F4F6" strokeWidth={3} strokeLinejoin="round" />

      {/* Text inside */}
      <text
        x={0}
        y={6}
        fill="#F4F4F6"
        fontSize={16}
        fontWeight="bold"
        fontFamily="'Inter', sans-serif"
        textAnchor="middle"
        letterSpacing={1.1}
      >
        {text}
      </text>
    </g>
  );
};
