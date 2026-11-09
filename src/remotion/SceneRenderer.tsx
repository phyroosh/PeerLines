// Remotion Scene Renderer with Layered Actors, Metaphors, Ground Line, and Floating Text
import React from 'react';
import { Scene, Actor, MetaphorConfig } from '@/types/dsl';
import { StickFigure } from '@/components/canvas/StickFigure';
import { GroundLine } from '@/components/canvas/GroundLine';
import { MetaphorRenderer } from '@/components/canvas/metaphors';

export interface SceneRendererProps {
  scene: Scene;
  frame: number;
  fps: number;
  sceneLocalFrame: number;
  lineBoil?: boolean;
  selectedElementId?: string | null;
  onSelectElement?: (type: 'actor' | 'metaphor', id: string) => void;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  frame,
  fps,
  sceneLocalFrame,
  lineBoil = true,
  selectedElementId,
  onSelectElement,
}) => {
  const sceneProgress = sceneLocalFrame / (scene.duration * fps);

  return (
    <svg
      viewBox="0 0 1080 1920"
      width="100%"
      height="100%"
      className="overflow-visible select-none"
    >
      {/* Background Subtle Radial Gradient Mask */}
      <defs>
        <radialGradient id="stageGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#1E2028" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0C0C0E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill="url(#stageGlow)" />

      {/* Floating Scene Title / Category Header */}
      {scene.title && (
        <text
          x={540}
          y={180}
          fill="#9CA3AF"
          fontSize={22}
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
          textAnchor="middle"
          letterSpacing={3.5}
          opacity={0.7}
        >
          {scene.title.toUpperCase()}
        </text>
      )}

      {/* Ground Line */}
      <GroundLine
        config={scene.groundLine}
        frame={frame}
        width={1080}
        lineBoil={lineBoil}
      />

      {/* Metaphor Primitives Layer */}
      {scene.metaphors.map((meta: MetaphorConfig) => {
        // Entrance animation calculation
        let enterScale = 1.0;
        let enterOpacity = 1.0;
        if (meta.enter) {
          const enterDurationFrames = Math.max(1, meta.enter.duration * fps);
          const progress = Math.min(1, sceneLocalFrame / enterDurationFrames);
          if (meta.enter.type === 'pop-in') {
            enterScale = progress < 1 ? 0.2 + progress * 0.8 : 1.0;
          } else if (meta.enter.type === 'fade-in') {
            enterOpacity = progress;
          }
        }

        return (
          <g
            key={meta.id}
            opacity={enterOpacity}
            transform={`scale(${enterScale})`}
            transform-origin={`${meta.x}px ${meta.y}px`}
          >
            <MetaphorRenderer
              config={meta}
              frame={frame}
              isSelected={selectedElementId === meta.id}
              onClick={() => onSelectElement?.('metaphor', meta.id)}
            />
          </g>
        );
      })}

      {/* Stick Figure Actors Layer */}
      {scene.actors.map((actor: Actor) => {
        // Actor Entrance animation
        let actorScale = actor.scale || 1.0;
        let actorOpacity = 1.0;
        let actorSlideY = 0;

        if (actor.enter) {
          const enterDurationFrames = Math.max(1, actor.enter.duration * fps);
          const progress = Math.min(1, sceneLocalFrame / enterDurationFrames);

          if (actor.enter.type === 'pop-in') {
            actorScale *= Math.min(1, 0.4 + progress * 0.6);
          } else if (actor.enter.type === 'fade-in' || actor.enter.type === 'draw-in') {
            actorOpacity = progress;
          } else if (actor.enter.type === 'slide-up') {
            actorSlideY = (1 - progress) * 120;
            actorOpacity = progress;
          }
        }

        return (
          <g
            key={actor.id}
            opacity={actorOpacity}
            transform={`translate(0, ${actorSlideY})`}
          >
            <StickFigure
              x={actor.x}
              y={actor.y}
              scale={actorScale}
              pose={actor.pose}
              expression={actor.expression}
              accessory={actor.accessory}
              holdingItem={actor.holdingItem}
              facing={actor.facing}
              glowHeart={actor.glowHeart}
              glowShield={actor.glowShield}
              particles={actor.particles}
              color={actor.customColor || '#F4F4F6'}
              strokeWidth={3.5}
              lineBoil={lineBoil}
              frame={frame}
              isSelected={selectedElementId === actor.id}
              onClick={() => onSelectElement?.('actor', actor.id)}
            />
          </g>
        );
      })}

      {/* Optional Floating Text / Annotations */}
      {scene.floatingText?.map((item, idx) => (
        <g key={idx} transform={`translate(${item.x}, ${item.y})`}>
          <rect
            x={-120}
            y={-22}
            width={240}
            height={44}
            rx={8}
            fill="#121316"
            stroke="#F4F4F6"
            strokeWidth={2}
          />
          <text
            x={0}
            y={6}
            fill="#F4F4F6"
            fontSize={16}
            fontWeight="bold"
            fontFamily="'Inter', sans-serif"
            textAnchor="middle"
          >
            {item.text}
          </text>
        </g>
      ))}
    </svg>
  );
};
