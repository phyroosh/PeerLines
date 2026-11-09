// Asset Library Panel: 1-Click Poses & Metaphor Widgets Gallery
'use client';

import React from 'react';
import {
  UserPlus,
  Scale,
  Battery,
  Flame,
  Activity,
  Shield,
  Dna,
  Sprout,
  CheckSquare,
  MessageSquare,
  LayoutGrid,
  Plus,
} from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { ActorPose, MetaphorType } from '@/types/dsl';

export const AssetLibraryPanel: React.FC = () => {
  const { project, currentFrame, addActor, addMetaphor } = useStudioStore();

  const fps = project.meta.fps || 30;
  const currentTime = currentFrame / fps;

  const activeScene =
    project.scenes.find(
      (s) => currentTime >= s.startTime && currentTime < s.startTime + s.duration
    ) || project.scenes[0];

  const POSE_PRESETS: Array<{ pose: ActorPose; label: string; desc: string }> = [
    { pose: 'idle', label: 'Idle Neutral', desc: 'Standing relaxed' },
    { pose: 'folded-arms', label: 'Folded Arms', desc: 'Introspective / skeptic' },
    { pose: 'hands-on-hips', label: 'Hands on Hips', desc: 'Confident stance' },
    { pose: 'pointing', label: 'Pointing Target', desc: 'Directing attention' },
    { pose: 'waving', label: 'Waving Hand', desc: 'Friendly greeting' },
    { pose: 'walking', label: 'Walking Stride', desc: 'Active forward motion' },
    { pose: 'running', label: 'Running High-Pace', desc: 'Urgent surge' },
    { pose: 'holding-item', label: 'Holding Phone', desc: 'Digital connection' },
    { pose: 'sitting-bench', label: 'Sitting Peace', desc: 'Solitude & rest' },
    { pose: 'lying-down', label: 'Lying Down', desc: 'Exhausted on ground' },
  ];

  const METAPHOR_PRESETS: Array<{
    type: MetaphorType;
    label: string;
    icon: any;
    desc: string;
    defaults: Record<string, any>;
  }> = [
    {
      type: 'balance-scale',
      label: 'Balance Scale',
      icon: Scale,
      desc: 'Pivoting beam weighing two concepts',
      defaults: { tilt: -18, leftLabel: 'EFFORT', rightLabel: 'REWARD' },
    },
    {
      type: 'battery-indicator',
      label: 'Battery Indicator',
      icon: Battery,
      desc: 'Energy drain & critical alert',
      defaults: { chargePercent: 15, state: 'empty', glowing: true, label: 'ENERGY' },
    },
    {
      type: 'campfire',
      label: 'Campfire',
      icon: Flame,
      desc: 'Flickering logs with rising embers',
      defaults: { flameIntensity: 0.85, emberCount: 14, warmGlow: true },
    },
    {
      type: 'isolation-shield',
      label: 'Isolation Shield',
      icon: Shield,
      desc: 'Protective dome deflecting negativity',
      defaults: { radius: 175, glowColor: '#FACC15', label: 'BOUNDARIES' },
    },
    {
      type: 'metric-meter',
      label: 'Metric Meter',
      icon: Activity,
      desc: 'Vertical or horizontal gauge',
      defaults: { label: 'PAIN', level: 0.85, color: '#EF4444', type: 'vertical' },
    },
    {
      type: 'dna-helix',
      label: 'DNA Helix',
      icon: Dna,
      desc: 'Rotating double helix structure',
      defaults: { speed: 1.0, label: 'SURVIVAL BLUEPRINT' },
    },
    {
      type: 'plant-growth',
      label: 'Plant Growth',
      icon: Sprout,
      desc: 'Sprouting stem with blooming flower',
      defaults: { growthStage: 0.9, flowering: true, label: 'HEALING' },
    },
    {
      type: 'checklist',
      label: 'Checklist Board',
      icon: CheckSquare,
      desc: 'Discipline items with checkmarks',
      defaults: {
        title: 'SACRIFICES',
        items: [
          { text: 'Late Nights', checked: true },
          { text: 'Failure Embraced', checked: true },
          { text: 'Unbroken Focus', checked: true },
        ],
      },
    },
    {
      type: 'speech-bubble',
      label: 'Speech Bubble',
      icon: MessageSquare,
      desc: 'Hand-drawn chalkboard dialogue box',
      defaults: { text: 'PEACE IS A CHOICE', tailPosition: 'bottom-center' },
    },
    {
      type: 'framed-panels',
      label: 'Comparison Panels',
      icon: LayoutGrid,
      desc: 'Stacked split-screen contrast boxes',
      defaults: { topText: 'WHAT YOU SEE', bottomText: 'WHAT IT TOOK' },
    },
  ];

  const handleAddActorWithPose = (pose: ActorPose) => {
    if (!activeScene) return;
    addActor(activeScene.id, {
      pose,
      x: 540,
      y: 1100,
      scale: 1.0,
      expression: 'neutral',
      enter: { type: 'draw-in', duration: 0.5 },
    });
  };

  const handleAddMetaphor = (meta: (typeof METAPHOR_PRESETS)[0]) => {
    if (!activeScene) return;
    addMetaphor(activeScene.id, {
      type: meta.type,
      x: 540,
      y: 800,
      scale: 1.0,
      properties: meta.defaults,
    });
  };

  return (
    <div className="space-y-5 text-xs">
      {/* Stickman Poses Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-chalk-muted pb-1 border-b border-chalk-border/50">
          <span className="font-bold text-chalk-white uppercase tracking-wider">
            Stickman Poses
          </span>
          <span className="text-[11px] text-amber-400">1-Click Insert</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {POSE_PRESETS.map((p) => (
            <button
              key={p.pose}
              onClick={() => handleAddActorWithPose(p.pose)}
              className="flex flex-col items-start p-2 rounded-lg bg-chalk-bg hover:bg-chalk-card border border-chalk-border/70 hover:border-amber-400/50 transition-all text-left group"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-semibold text-chalk-white group-hover:text-amber-400 transition-colors">
                  {p.label}
                </span>
                <Plus className="w-3.5 h-3.5 text-chalk-muted group-hover:text-amber-400 transition-colors" />
              </div>
              <span className="text-[10px] text-chalk-muted line-clamp-1">
                {p.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Metaphor Primitives Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-chalk-muted pb-1 border-b border-chalk-border/50">
          <span className="font-bold text-chalk-white uppercase tracking-wider">
            Metaphor Primitives Library
          </span>
          <span className="text-[11px] text-cyan-400">10+ Widgets</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {METAPHOR_PRESETS.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.type}
                onClick={() => handleAddMetaphor(m)}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-chalk-bg hover:bg-chalk-card border border-chalk-border/70 hover:border-cyan-400/50 transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-chalk-white group-hover:text-cyan-400 transition-colors">
                    {m.label}
                  </div>
                  <div className="text-[11px] text-chalk-muted truncate">
                    {m.desc}
                  </div>
                </div>
                <Plus className="w-4 h-4 text-chalk-muted group-hover:text-cyan-400 transition-colors" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
