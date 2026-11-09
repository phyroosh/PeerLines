// Metaphor 10: Checklist & Discipline Board
import React from 'react';

export interface ChecklistItem {
  text: string;
  checked: boolean;
}

export interface ChecklistProps {
  x: number;
  y: number;
  scale?: number;
  items?: ChecklistItem[];
  title?: string;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const Checklist: React.FC<ChecklistProps> = ({
  x,
  y,
  scale = 1.0,
  items = [
    { text: 'Daily Discipline', checked: true },
    { text: 'Overcome Rejection', checked: true },
    { text: 'Protect Focus', checked: true },
  ],
  title = 'THE CRUCIBLE',
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const boxWidth = 260;
  const boxHeight = 40 + items.length * 36;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="select-none"
    >
      {isSelected && (
        <rect
          x={-boxWidth / 2 - 20}
          y={-boxHeight / 2 - 20}
          width={boxWidth + 40}
          height={boxHeight + 40}
          fill="rgba(250, 204, 21, 0.06)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {/* Board Background */}
      <rect
        x={-boxWidth / 2}
        y={-boxHeight / 2}
        width={boxWidth}
        height={boxHeight}
        rx={10}
        fill="#141418"
        stroke="#F4F4F6"
        strokeWidth={3}
      />

      {/* Top Clip */}
      <rect
        x={-35}
        y={-boxHeight / 2 - 12}
        width={70}
        height={18}
        rx={4}
        fill="#26262E"
        stroke="#F4F4F6"
        strokeWidth={2}
      />

      {/* Title */}
      {title && (
        <text
          x={0}
          y={-boxHeight / 2 + 24}
          fill="#FACC15"
          fontSize={13}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
          letterSpacing={1.2}
        >
          {title}
        </text>
      )}

      {/* Items list */}
      {items.map((item, idx) => {
        const itemY = -boxHeight / 2 + 54 + idx * 36;
        return (
          <g key={idx} transform={`translate(${-boxWidth / 2 + 20}, ${itemY})`}>
            {/* Checkbox square */}
            <rect
              x={0}
              y={-14}
              width={18}
              height={18}
              rx={3}
              fill="#1C1D22"
              stroke="#F4F4F6"
              strokeWidth={2}
            />

            {/* Checkmark */}
            {item.checked && (
              <polyline
                points="3,-5 7,0 15,-10"
                stroke="#10B981"
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Item text */}
            <text
              x={28}
              y={0}
              fill={item.checked ? '#F4F4F6' : '#9CA3AF'}
              fontSize={14}
              fontFamily="'Inter', sans-serif"
              fontWeight={item.checked ? '600' : 'normal'}
            >
              {item.text}
            </text>
          </g>
        );
      })}
    </g>
  );
};
