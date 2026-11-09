// Modular SVG Stick Figure Rig with Emotional Faces, Poses, Accessories, and Aura
import React from 'react';
import {
  ActorPose,
  ActorExpression,
  ActorAccessory,
  ActorHoldingItem,
  ParticleType,
} from '@/types/dsl';

export interface StickFigureProps {
  x: number;
  y: number;
  scale?: number;
  pose?: ActorPose;
  expression?: ActorExpression;
  accessory?: ActorAccessory;
  holdingItem?: ActorHoldingItem;
  facing?: 'right' | 'left';
  glowHeart?: boolean;
  glowShield?: boolean;
  particles?: ParticleType;
  color?: string;
  strokeWidth?: number;
  lineBoil?: boolean;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const StickFigure: React.FC<StickFigureProps> = ({
  x,
  y,
  scale = 1.0,
  pose = 'idle',
  expression = 'neutral',
  accessory = 'none',
  holdingItem = 'none',
  facing = 'right',
  glowHeart = false,
  glowShield = false,
  particles = 'none',
  color = '#F4F4F6',
  strokeWidth = 3.5,
  lineBoil = true,
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  // Line boil organic jitter: 2-frame subtle cycle
  const jitterSeed = lineBoil ? (Math.floor(frame / 2) % 3) : 0;
  const jx = jitterSeed === 1 ? 0.6 : jitterSeed === 2 ? -0.6 : 0;
  const jy = jitterSeed === 1 ? -0.5 : jitterSeed === 2 ? 0.5 : 0;

  // Face rendering
  const renderFace = () => {
    switch (expression) {
      case 'happy':
        return (
          <>
            <circle cx={-10 + jx} cy={-5 + jy} r={3} fill={color} />
            <circle cx={10 + jx} cy={-5 + jy} r={3} fill={color} />
            <path
              d={`M ${-14 + jx} ${6 + jy} Q ${0 + jx} ${20 + jy} ${14 + jx} ${6 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'smug':
        return (
          <>
            <line
              x1={-15 + jx}
              y1={-12 + jy}
              x2={-6 + jx}
              y2={-8 + jy}
              stroke={color}
              strokeWidth={strokeWidth * 0.8}
              strokeLinecap="round"
            />
            <line
              x1={6 + jx}
              y1={-8 + jy}
              x2={15 + jx}
              y2={-12 + jy}
              stroke={color}
              strokeWidth={strokeWidth * 0.8}
              strokeLinecap="round"
            />
            <circle cx={-10 + jx} cy={-5 + jy} r={2.5} fill={color} />
            <circle cx={10 + jx} cy={-5 + jy} r={2.5} fill={color} />
            <path
              d={`M ${-8 + jx} ${12 + jy} Q ${4 + jx} ${15 + jy} ${13 + jx} ${7 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'sad':
        return (
          <>
            <circle cx={-10 + jx} cy={-4 + jy} r={3} fill={color} />
            <circle cx={10 + jx} cy={-4 + jy} r={3} fill={color} />
            <path
              d={`M ${-13 + jx} ${16 + jy} Q ${0 + jx} ${6 + jy} ${13 + jx} ${16 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'crying':
        return (
          <>
            <circle cx={-10 + jx} cy={-4 + jy} r={3} fill={color} />
            <circle cx={10 + jx} cy={-4 + jy} r={3} fill={color} />
            <path
              d={`M ${-12 + jx} ${16 + jy} Q ${0 + jx} ${6 + jy} ${12 + jx} ${16 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Tear streaks */}
            <path
              d={`M -10 1 Q -13 14 -11 24`}
              stroke="#38BDF8"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 10 1 Q 13 14 11 24`}
              stroke="#38BDF8"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'frowning':
      case 'angry':
        return (
          <>
            {/* Angled eyebrows */}
            <line
              x1={-16 + jx}
              y1={-14 + jy}
              x2={-5 + jx}
              y2={-7 + jy}
              stroke={color}
              strokeWidth={strokeWidth * 0.9}
              strokeLinecap="round"
            />
            <line
              x1={5 + jx}
              y1={-7 + jy}
              x2={16 + jx}
              y2={-14 + jy}
              stroke={color}
              strokeWidth={strokeWidth * 0.9}
              strokeLinecap="round"
            />
            <circle cx={-10 + jx} cy={-3 + jy} r={3} fill={color} />
            <circle cx={10 + jx} cy={-3 + jy} r={3} fill={color} />
            <line
              x1={-11 + jx}
              y1={12 + jy}
              x2={11 + jx}
              y2={12 + jy}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'peaceful':
        return (
          <>
            {/* Sleeping curved eyelids */}
            <path
              d={`M ${-15 + jx} ${-4 + jy} Q ${-10 + jx} ${-10 + jy} ${-5 + jx} ${-4 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth * 0.8}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M ${5 + jx} ${-4 + jy} Q ${10 + jx} ${-10 + jy} ${15 + jx} ${-4 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth * 0.8}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M ${-10 + jx} ${10 + jy} Q ${0 + jx} ${18 + jy} ${10 + jx} ${10 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'sick':
        return (
          <>
            {/* Cross 'X' eyes */}
            <line
              x1={-14 + jx}
              y1={-8 + jy}
              x2={-6 + jx}
              y2={0 + jy}
              stroke={color}
              strokeWidth={2.5}
            />
            <line
              x1={-6 + jx}
              y1={-8 + jy}
              x2={-14 + jx}
              y2={0 + jy}
              stroke={color}
              strokeWidth={2.5}
            />
            <line
              x1={6 + jx}
              y1={-8 + jy}
              x2={14 + jx}
              y2={0 + jy}
              stroke={color}
              strokeWidth={2.5}
            />
            <line
              x1={14 + jx}
              y1={-8 + jy}
              x2={6 + jx}
              y2={0 + jy}
              stroke={color}
              strokeWidth={2.5}
            />
            <path
              d={`M ${-10 + jx} ${12 + jy} Q ${-4 + jx} ${8 + jy} ${0 + jx} ${12 + jy} T ${10 + jx} ${12 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'surprised':
        return (
          <>
            <path
              d={`M ${-15 + jx} ${-12 + jy} Q ${-10 + jx} ${-18 + jy} ${-5 + jx} ${-12 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth * 0.8}
              fill="none"
            />
            <path
              d={`M ${5 + jx} ${-12 + jy} Q ${10 + jx} ${-18 + jy} ${15 + jx} ${-12 + jy}`}
              stroke={color}
              strokeWidth={strokeWidth * 0.8}
              fill="none"
            />
            <circle cx={-10 + jx} cy={-5 + jy} r={3} fill={color} />
            <circle cx={10 + jx} cy={-5 + jy} r={3} fill={color} />
            <ellipse
              cx={0 + jx}
              cy={12 + jy}
              rx={5}
              ry={8}
              stroke={color}
              strokeWidth={strokeWidth * 0.9}
              fill="none"
            />
          </>
        );

      case 'neutral':
      default:
        return (
          <>
            <circle cx={-10 + jx} cy={-5 + jy} r={3} fill={color} />
            <circle cx={10 + jx} cy={-5 + jy} r={3} fill={color} />
            <line
              x1={-10 + jx}
              y1={10 + jy}
              x2={10 + jx}
              y2={10 + jy}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );
    }
  };

  // Accessories
  const renderAccessory = () => {
    switch (accessory) {
      case 'helmet':
        return (
          <g>
            <path
              d="M -36 -6 Q 0 -45 36 -6 L 42 2 L -42 2 Z"
              fill="#2A2E33"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <line
              x1={-38}
              y1={2}
              x2={38}
              y2={2}
              stroke={color}
              strokeWidth={strokeWidth * 1.1}
              strokeLinecap="round"
            />
            {/* Chin strap */}
            <path
              d="M -26 2 Q -22 35 0 35 Q 22 35 26 2"
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeDasharray="3 3"
            />
          </g>
        );

      case 'long-hair':
        return (
          <path
            d="M -25 -20 Q -42 10 -35 60 Q -30 90 -22 110"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 1.1}
            strokeLinecap="round"
          />
        );

      case 'glasses':
        return (
          <g>
            <circle
              cx={-10}
              cy={-5}
              r={7}
              stroke={color}
              strokeWidth={2}
              fill="none"
            />
            <circle
              cx={10}
              cy={-5}
              r={7}
              stroke={color}
              strokeWidth={2}
              fill="none"
            />
            <line x1={-3} y1={-5} x2={3} y2={-5} stroke={color} strokeWidth={2} />
            <line x1={-17} y1={-5} x2={-28} y2={-9} stroke={color} strokeWidth={2} />
            <line x1={17} y1={-5} x2={28} y2={-9} stroke={color} strokeWidth={2} />
          </g>
        );

      case 'backpack':
        return (
          <rect
            x={-42}
            y={50}
            width={18}
            height={55}
            rx={5}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="#1E2024"
          />
        );

      case 'mask':
        return (
          <path
            d="M -22 0 Q 0 8 22 0 L 18 24 Q 0 32 -18 24 Z"
            fill="#1F242D"
            stroke={color}
            strokeWidth={2}
          />
        );

      default:
        return null;
    }
  };

  // Body & Limbs based on Pose
  const renderLimbsAndTorso = () => {
    const headRadius = 32;
    const neckY = headRadius;
    const hipY = 145;

    // Default spine line
    const spine = (
      <line
        x1={0 + jx}
        y1={neckY + jy}
        x2={0 + jx}
        y2={hipY + jy}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );

    // Dynamic limbs according to pose
    switch (pose) {
      case 'hands-on-hips':
        return (
          <>
            {spine}
            {/* Arms bent triangularly */}
            <path
              d={`M 0 55 L -42 95 L -14 135`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M 0 55 L 42 95 L 14 135`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Legs straight */}
            <line
              x1={0}
              y1={hipY}
              x2={-20}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={hipY}
              x2={20}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'folded-arms':
        return (
          <>
            {spine}
            {/* Folded arms across chest */}
            <path
              d={`M 0 55 L -26 80 L 22 84`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M 0 55 L 26 80 L -22 88`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Legs */}
            <line
              x1={0}
              y1={hipY}
              x2={-18}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={hipY}
              x2={18}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'pointing':
        return (
          <>
            {spine}
            {/* Left arm relaxed */}
            <path
              d={`M 0 55 L -24 100 L -22 145`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Right arm pointing up/outward */}
            <path
              d={`M 0 55 L 45 42 L 95 30`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Legs */}
            <line
              x1={0}
              y1={hipY}
              x2={-20}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={hipY}
              x2={22}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'waving':
        return (
          <>
            {spine}
            {/* Left arm relaxed */}
            <path
              d={`M 0 55 L -20 100 L -20 145`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Right arm waving up */}
            <path
              d={`M 0 55 L 35 15 L ${55 + (frame % 10 < 5 ? 8 : -8)} -30`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Legs */}
            <line
              x1={0}
              y1={hipY}
              x2={-18}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={hipY}
              x2={18}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'holding-item':
        return (
          <>
            {spine}
            {/* Arms holding item forward */}
            <path
              d={`M 0 55 L 25 80 L 45 80`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 0 55 L -10 90 L 35 85`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Item rendered in hand */}
            {renderHeldItem(48, 78)}
            {/* Legs */}
            <line
              x1={0}
              y1={hipY}
              x2={-18}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={hipY}
              x2={18}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'walking':
        const walkCycle = (frame % 20) / 20;
        const leftLegAngle = Math.sin(walkCycle * Math.PI * 2) * 28;
        const rightLegAngle = -leftLegAngle;
        return (
          <>
            {spine}
            {/* Arm swing */}
            <line
              x1={0}
              y1={55}
              x2={-25 + rightLegAngle * 0.5}
              y2={130}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={55}
              x2={25 + leftLegAngle * 0.5}
              y2={130}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Legs alternating */}
            <line
              x1={0}
              y1={hipY}
              x2={-10 + leftLegAngle}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={hipY}
              x2={10 + rightLegAngle}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );

      case 'running':
        const runCycle = (frame % 14) / 14;
        const runSwing = Math.sin(runCycle * Math.PI * 2) * 45;
        return (
          <g transform="rotate(12 0 140)">
            {spine}
            {/* Pumping arms */}
            <path
              d={`M 0 55 L ${-25 - runSwing * 0.5} 85 L ${-10 - runSwing * 0.8} 115`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 0 55 L ${25 + runSwing * 0.5} 85 L ${40 + runSwing * 0.8} 70`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* High stride legs */}
            <path
              d={`M 0 ${hipY} L ${-30 + runSwing} 195 L ${-45 + runSwing * 1.1} 260`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 0 ${hipY} L ${30 - runSwing} 190 L ${45 - runSwing * 1.1} 260`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );

      case 'sitting-bench':
        return (
          <>
            {/* Spine */}
            <line
              x1={0}
              y1={neckY}
              x2={0}
              y2={155}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Resting hands on knees */}
            <path
              d={`M 0 55 L 25 105 L 45 155`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Legs bent 90 degrees sitting */}
            <path
              d={`M 0 155 L 50 155 L 50 260`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Simple bench chalk line */}
            <line
              x1={-30}
              y1={160}
              x2={65}
              y2={160}
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <line
              x1={-15}
              y1={160}
              x2={-15}
              y2={260}
              stroke={color}
              strokeWidth={2.5}
            />
          </>
        );

      case 'lying-down':
        return (
          <g transform="rotate(85 0 200)">
            {spine}
            <line
              x1={0}
              y1={hipY}
              x2={-12}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={hipY}
              x2={12}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </g>
        );

      case 'idle':
      default:
        return (
          <>
            {spine}
            {/* Arms at sides */}
            <path
              d={`M 0 55 L -22 105 L -20 150`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 0 55 L 22 105 L 20 150`}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Legs down */}
            <line
              x1={0}
              y1={hipY}
              x2={-18}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <line
              x1={0}
              y1={hipY}
              x2={18}
              y2={260}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          </>
        );
    }
  };

  // Held Item graphics
  const renderHeldItem = (hx: number, hy: number) => {
    switch (holdingItem) {
      case 'phone':
        return (
          <g transform={`translate(${hx}, ${hy - 25})`}>
            {/* Smartphone body (like in inspiration video!) */}
            <rect
              x={0}
              y={0}
              width={26}
              height={46}
              rx={4}
              stroke={color}
              strokeWidth={2.5}
              fill="#181920"
            />
            {/* Phone screen glow */}
            <rect
              x={3}
              y={5}
              width={20}
              height={32}
              rx={2}
              fill="#38BDF8"
              opacity={0.3}
            />
            <line x1={8} y1={41} x2={18} y2={41} stroke={color} strokeWidth={2} />
          </g>
        );

      case 'scissors':
        return (
          <g transform={`translate(${hx}, ${hy}) scale(0.9)`}>
            <circle
              cx={-8}
              cy={12}
              r={6}
              stroke="#EF4444"
              strokeWidth={2}
              fill="none"
            />
            <circle
              cx={8}
              cy={12}
              r={6}
              stroke="#EF4444"
              strokeWidth={2}
              fill="none"
            />
            <line
              x1={-6}
              y1={8}
              x2={14}
              y2={-14}
              stroke={color}
              strokeWidth={2.5}
            />
            <line
              x1={6}
              y1={8}
              x2={-14}
              y2={-14}
              stroke={color}
              strokeWidth={2.5}
            />
            <circle cx={0} cy={-2} r={2} fill="#EF4444" />
          </g>
        );

      case 'heart':
        return (
          <path
            d="M 0 -8 C -6 -18 -22 -14 -22 2 C -22 14 0 24 0 28 C 0 24 22 14 22 2 C 22 -14 6 -18 0 -8 Z"
            fill="#FB7185"
            stroke={color}
            strokeWidth={2}
            transform={`translate(${hx + 10}, ${hy}) scale(0.6)`}
          />
        );

      case 'sword':
        return (
          <g transform={`translate(${hx}, ${hy}) rotate(35)`}>
            <line x1={0} y1={-45} x2={0} y2={10} stroke={color} strokeWidth={3} />
            <line x1={-10} y1={0} x2={10} y2={0} stroke={color} strokeWidth={3} />
            <line x1={0} y1={10} x2={0} y2={20} stroke={color} strokeWidth={4} />
          </g>
        );

      default:
        return null;
    }
  };

  // Glowing heart in chest
  const renderGlowHeart = () => {
    if (!glowHeart) return null;
    const pulse = 1 + 0.12 * Math.sin(frame * 0.25);
    return (
      <g transform={`translate(0, 85) scale(${pulse})`}>
        <circle cx={0} cy={0} r={16} fill="#FB7185" opacity={0.35} />
        <path
          d="M 0 -5 C -4 -12 -14 -9 -14 1 C -14 9 0 16 0 18 C 0 16 14 9 14 1 C 14 -9 4 -12 0 -5 Z"
          fill="#FB7185"
          stroke="#FACC15"
          strokeWidth={1.5}
        />
      </g>
    );
  };

  // Isolation Shield
  const renderGlowShield = () => {
    if (!glowShield) return null;
    return (
      <g>
        <circle
          cx={0}
          cy={110}
          r={170}
          stroke="#FACC15"
          strokeWidth={3}
          strokeDasharray="8 6"
          fill="rgba(250, 204, 21, 0.05)"
          opacity={0.85 + 0.15 * Math.sin(frame * 0.1)}
        />
      </g>
    );
  };

  // Floating particles
  const renderParticles = () => {
    if (particles === 'none') return null;

    switch (particles) {
      case 'hearts':
        return (
          <g>
            {[
              { x: -28, y: -50, s: 0.5, delay: 0 },
              { x: 24, y: -65, s: 0.65, delay: 5 },
              { x: 38, y: -95, s: 0.8, delay: 10 },
              { x: -10, y: -110, s: 0.7, delay: 15 },
            ].map((p, idx) => {
              const floatY = p.y - ((frame + p.delay * 2) % 60) * 1.5;
              const opacity = Math.max(0, 1 - ((frame + p.delay * 2) % 60) / 60);
              return (
                <path
                  key={idx}
                  d="M 0 -4 C -3 -9 -10 -7 -10 1 C -10 7 0 12 0 14 C 0 12 10 7 10 1 C 10 -7 3 -9 0 -4 Z"
                  fill="#FB7185"
                  opacity={opacity}
                  transform={`translate(${p.x}, ${floatY}) scale(${p.s})`}
                />
              );
            })}
          </g>
        );

      case 'question-marks':
        return (
          <g>
            {[
              { x: -50, y: -55, size: 28 },
              { x: 0, y: -75, size: 32 },
              { x: 55, y: -50, size: 28 },
            ].map((q, idx) => {
              const bob = Math.sin((frame + idx * 10) * 0.15) * 6;
              return (
                <text
                  key={idx}
                  x={q.x}
                  y={q.y + bob}
                  fill={color}
                  fontSize={q.size}
                  fontFamily="'Caveat', cursive, sans-serif"
                  fontWeight="bold"
                  textAnchor="middle"
                  opacity={0.9}
                >
                  ?
                </text>
              );
            })}
          </g>
        );

      case 'sweat-drops':
        return (
          <g>
            <path
              d="M 36 -10 C 36 -10 44 2 40 8 C 36 14 30 10 32 4 Z"
              fill="#38BDF8"
              opacity={0.8}
            />
          </g>
        );

      case 'lightning':
        return (
          <g>
            <path
              d="M 40 -60 L 25 -30 L 35 -30 L 20 0"
              stroke="#FACC15"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M -35 -40 L -45 -15 L -38 -15 L -48 10"
              stroke="#FACC15"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );

      default:
        return null;
    }
  };

  const flipTransform = facing === 'left' ? 'scale(-1, 1)' : '';

  return (
    <g
      transform={`translate(${x}, ${y - 260}) scale(${scale})`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className="transition-transform duration-75 select-none"
    >
      {/* Selection bounding box indicator */}
      {isSelected && (
        <rect
          x={-60}
          y={-120}
          width={120}
          height={390}
          fill="rgba(250, 204, 21, 0.08)"
          stroke="#FACC15"
          strokeWidth={2}
          strokeDasharray="6 4"
          rx={8}
        />
      )}

      {/* Protective Shield if enabled */}
      {renderGlowShield()}

      {/* Floating particles */}
      {renderParticles()}

      {/* Flipped container for facing direction */}
      <g transform={flipTransform}>
        {/* Head */}
        <circle
          cx={0 + jx}
          cy={0 + jy}
          r={32}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="#0C0C0E"
        />

        {/* Dynamic Face */}
        {renderFace()}

        {/* Optional Accessory */}
        {renderAccessory()}

        {/* Glowing Heart */}
        {renderGlowHeart()}

        {/* Torso & Limbs */}
        {renderLimbsAndTorso()}
      </g>
    </g>
  );
};
