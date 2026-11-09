// Ground Line Component with Hand-Drawn Monoline Chalk Aesthetic
import React from 'react';
import { GroundLineConfig } from '@/types/dsl';

export interface GroundLineProps {
  config?: GroundLineConfig;
  frame?: number;
  width?: number;
  lineBoil?: boolean;
}

export const GroundLine: React.FC<GroundLineProps> = ({
  config,
  frame = 0,
  width = 1080,
  lineBoil = true,
}) => {
  if (!config || config.enabled === false) return null;

  const y = config.y || 1100;
  const jitter = lineBoil ? (Math.floor(frame / 2) % 3 === 1 ? 0.7 : -0.7) : 0;

  // Hand-drawn slightly wavy path to match chalkboard aesthetic
  const d = `M 40 ${y + jitter} Q ${width * 0.25} ${y - 1.5 + jitter} ${width * 0.5} ${y + 1 + jitter} T ${width - 40} ${y + jitter}`;

  return (
    <g className="pointer-events-none select-none">
      {/* Optional faint perspective grid lines */}
      {config.showPerspectiveGrid && (
        <g stroke="#26262E" strokeWidth={1.5} opacity={0.4}>
          <line x1={0} y1={y + 80} x2={width} y2={y + 80} />
          <line x1={0} y1={y + 200} x2={width} y2={y + 200} />
          <line x1={width * 0.3} y1={y} x2={width * 0.15} y2={1920} />
          <line x1={width * 0.7} y1={y} x2={width * 0.85} y2={1920} />
        </g>
      )}

      {/* Main Ground Line */}
      <path
        d={d}
        stroke="#F4F4F6"
        strokeWidth={3.5}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={config.style === 'dashed' ? '12 8' : undefined}
      />
    </g>
  );
};
