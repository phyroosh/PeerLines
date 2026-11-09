// Element & Scene Inspector Panel with Live Property Controls
'use client';

import React from 'react';
import {
  Trash2,
  Smile,
  Activity,
  Layers,
  Sparkles,
  Sliders,
  Move,
  Shield,
  Heart,
  Palette,
} from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import {
  ActorPose,
  ActorExpression,
  ActorAccessory,
  ActorHoldingItem,
  ParticleType,
} from '@/types/dsl';

export const InspectorPanel: React.FC = () => {
  const {
    project,
    currentFrame,
    selectedElement,
    updateActor,
    removeActor,
    updateMetaphor,
    removeMetaphor,
    updateScene,
    updateMeta,
    selectElement,
  } = useStudioStore();

  const fps = project.meta.fps || 30;
  const currentTime = currentFrame / fps;

  // Find active scene
  const activeScene =
    project.scenes.find(
      (s) => currentTime >= s.startTime && currentTime < s.startTime + s.duration
    ) || project.scenes[0];

  // Selected Actor or Metaphor
  const selectedActor =
    selectedElement?.type === 'actor'
      ? activeScene?.actors.find((a) => a.id === selectedElement.id)
      : null;

  const selectedMetaphor =
    selectedElement?.type === 'metaphor'
      ? activeScene?.metaphors.find((m) => m.id === selectedElement.id)
      : null;

  if (selectedActor && activeScene) {
    return (
      <div className="space-y-4 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-chalk-border">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="font-bold text-chalk-white uppercase tracking-wider">
              Stick Figure Actor
            </span>
          </div>
          <button
            onClick={() => removeActor(activeScene.id, selectedActor.id)}
            className="p-1 rounded hover:bg-rose-500/20 text-chalk-muted hover:text-rose-400 transition-colors"
            title="Delete Actor"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-chalk-muted font-medium">Actor Label</label>
          <input
            type="text"
            value={selectedActor.name || ''}
            onChange={(e) =>
              updateActor(activeScene.id, selectedActor.id, {
                name: e.target.value,
              })
            }
            className="w-full bg-chalk-bg border border-chalk-border rounded px-2.5 py-1.5 text-chalk-white focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Coordinates X / Y & Scale */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="text-chalk-muted font-mono">X Pos</label>
            <input
              type="number"
              value={selectedActor.x}
              onChange={(e) =>
                updateActor(activeScene.id, selectedActor.id, {
                  x: Number(e.target.value),
                })
              }
              className="w-full bg-chalk-bg border border-chalk-border rounded px-2 py-1 text-chalk-white font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-chalk-muted font-mono">Y Pos</label>
            <input
              type="number"
              value={selectedActor.y}
              onChange={(e) =>
                updateActor(activeScene.id, selectedActor.id, {
                  y: Number(e.target.value),
                })
              }
              className="w-full bg-chalk-bg border border-chalk-border rounded px-2 py-1 text-chalk-white font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-chalk-muted font-mono">Scale</label>
            <input
              type="number"
              step="0.1"
              value={selectedActor.scale}
              onChange={(e) =>
                updateActor(activeScene.id, selectedActor.id, {
                  scale: Number(e.target.value),
                })
              }
              className="w-full bg-chalk-bg border border-chalk-border rounded px-2 py-1 text-chalk-white font-mono"
            />
          </div>
        </div>

        {/* Pose Dropdown */}
        <div className="space-y-1">
          <label className="text-chalk-muted font-medium flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Character Pose</span>
          </label>
          <select
            value={selectedActor.pose}
            onChange={(e) =>
              updateActor(activeScene.id, selectedActor.id, {
                pose: e.target.value as ActorPose,
              })
            }
            className="w-full bg-chalk-bg border border-chalk-border rounded px-2.5 py-1.5 text-chalk-white focus:outline-none focus:border-amber-400"
          >
            <option value="idle">Idle / Relaxed</option>
            <option value="folded-arms">Folded Arms (Introspective / Skeptical)</option>
            <option value="hands-on-hips">Hands on Hips (Confident / Conflicted)</option>
            <option value="pointing">Pointing (Explaining / Directing)</option>
            <option value="waving">Waving (Friendly / Greeting)</option>
            <option value="holding-item">Holding Item (Phone / Scissors)</option>
            <option value="walking">Walking (In Motion)</option>
            <option value="running">Running (Urgent / High Energy)</option>
            <option value="sitting-bench">Sitting (Quiet Solitude)</option>
            <option value="lying-down">Lying Down (Exhausted / Fallen)</option>
          </select>
        </div>

        {/* Facial Expression Dropdown */}
        <div className="space-y-1">
          <label className="text-chalk-muted font-medium flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-amber-400" />
            <span>Facial Expression</span>
          </label>
          <select
            value={selectedActor.expression}
            onChange={(e) =>
              updateActor(activeScene.id, selectedActor.id, {
                expression: e.target.value as ActorExpression,
              })
            }
            className="w-full bg-chalk-bg border border-chalk-border rounded px-2.5 py-1.5 text-chalk-white focus:outline-none focus:border-amber-400"
          >
            <option value="neutral">Neutral (Stoic)</option>
            <option value="happy">Happy (Smiling)</option>
            <option value="smug">Smug (Confident Smirk)</option>
            <option value="sad">Sad (Downcast)</option>
            <option value="crying">Crying (Tears Streaming)</option>
            <option value="frowning">Frowning / Confused</option>
            <option value="angry">Angry / Determined</option>
            <option value="peaceful">Peaceful (Closed Eyes)</option>
            <option value="sick">Sick / Deadpan (X_X)</option>
            <option value="surprised">Surprised (:O)</option>
          </select>
        </div>

        {/* Accessories & Held Item */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-chalk-muted font-medium">Accessory</label>
            <select
              value={selectedActor.accessory || 'none'}
              onChange={(e) =>
                updateActor(activeScene.id, selectedActor.id, {
                  accessory: e.target.value as ActorAccessory,
                })
              }
              className="w-full bg-chalk-bg border border-chalk-border rounded px-2 py-1.5 text-chalk-white focus:outline-none text-[11px]"
            >
              <option value="none">None</option>
              <option value="helmet">Soldier Helmet</option>
              <option value="long-hair">Long Hair</option>
              <option value="backpack">Backpack</option>
              <option value="glasses">Glasses</option>
              <option value="mask">Face Mask</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-chalk-muted font-medium">Held Item</label>
            <select
              value={selectedActor.holdingItem || 'none'}
              onChange={(e) =>
                updateActor(activeScene.id, selectedActor.id, {
                  holdingItem: e.target.value as ActorHoldingItem,
                })
              }
              className="w-full bg-chalk-bg border border-chalk-border rounded px-2 py-1.5 text-chalk-white focus:outline-none text-[11px]"
            >
              <option value="none">None</option>
              <option value="phone">Smartphone</option>
              <option value="scissors">Scissors</option>
              <option value="heart">Heart</option>
              <option value="sword">Sword</option>
            </select>
          </div>
        </div>

        {/* Facing Direction */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-chalk-muted font-medium">Facing Direction</span>
          <div className="flex items-center bg-chalk-bg border border-chalk-border rounded overflow-hidden">
            <button
              onClick={() =>
                updateActor(activeScene.id, selectedActor.id, { facing: 'left' })
              }
              className={`px-3 py-1 text-[11px] font-medium ${
                selectedActor.facing === 'left'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-chalk-muted hover:text-chalk-white'
              }`}
            >
              Left
            </button>
            <button
              onClick={() =>
                updateActor(activeScene.id, selectedActor.id, { facing: 'right' })
              }
              className={`px-3 py-1 text-[11px] font-medium ${
                selectedActor.facing !== 'left'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'text-chalk-muted hover:text-chalk-white'
              }`}
            >
              Right
            </button>
          </div>
        </div>

        {/* Aura & Particles */}
        <div className="space-y-2 pt-2 border-t border-chalk-border/50">
          <label className="text-chalk-muted font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Aura & Core FX</span>
          </label>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                updateActor(activeScene.id, selectedActor.id, {
                  glowHeart: !selectedActor.glowHeart,
                })
              }
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded border text-[11px] transition-colors ${
                selectedActor.glowHeart
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-chalk-bg text-chalk-muted border-chalk-border'
              }`}
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Glow Heart</span>
            </button>

            <button
              onClick={() =>
                updateActor(activeScene.id, selectedActor.id, {
                  glowShield: !selectedActor.glowShield,
                })
              }
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded border text-[11px] transition-colors ${
                selectedActor.glowShield
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-chalk-bg text-chalk-muted border-chalk-border'
              }`}
            >
              <Shield className="w-3 h-3 fill-current" />
              <span>Glow Shield</span>
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-chalk-muted text-[11px]">Floating Particles</label>
            <select
              value={selectedActor.particles || 'none'}
              onChange={(e) =>
                updateActor(activeScene.id, selectedActor.id, {
                  particles: e.target.value as ParticleType,
                })
              }
              className="w-full bg-chalk-bg border border-chalk-border rounded px-2 py-1 text-chalk-white text-[11px]"
            >
              <option value="none">None</option>
              <option value="hearts">Floating Hearts</option>
              <option value="question-marks">Question Marks (???)</option>
              <option value="sweat-drops">Sweat / Stress Drops</option>
              <option value="lightning">Lightning / Surge Sparks</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMetaphor && activeScene) {
    return (
      <div className="space-y-4 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-chalk-border">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="font-bold text-chalk-white uppercase tracking-wider">
              {selectedMetaphor.type.replace('-', ' ')}
            </span>
          </div>
          <button
            onClick={() => removeMetaphor(activeScene.id, selectedMetaphor.id)}
            className="p-1 rounded hover:bg-rose-500/20 text-chalk-muted hover:text-rose-400 transition-colors"
            title="Delete Metaphor"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Coordinates X / Y & Scale */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="text-chalk-muted font-mono">X Pos</label>
            <input
              type="number"
              value={selectedMetaphor.x}
              onChange={(e) =>
                updateMetaphor(activeScene.id, selectedMetaphor.id, {
                  x: Number(e.target.value),
                })
              }
              className="w-full bg-chalk-bg border border-chalk-border rounded px-2 py-1 text-chalk-white font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-chalk-muted font-mono">Y Pos</label>
            <input
              type="number"
              value={selectedMetaphor.y}
              onChange={(e) =>
                updateMetaphor(activeScene.id, selectedMetaphor.id, {
                  y: Number(e.target.value),
                })
              }
              className="w-full bg-chalk-bg border border-chalk-border rounded px-2 py-1 text-chalk-white font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-chalk-muted font-mono">Scale</label>
            <input
              type="number"
              step="0.1"
              value={selectedMetaphor.scale || 1.0}
              onChange={(e) =>
                updateMetaphor(activeScene.id, selectedMetaphor.id, {
                  scale: Number(e.target.value),
                })
              }
              className="w-full bg-chalk-bg border border-chalk-border rounded px-2 py-1 text-chalk-white font-mono"
            />
          </div>
        </div>

        {/* Dynamic Properties based on Metaphor Type */}
        <div className="space-y-2 pt-2 border-t border-chalk-border/50">
          <label className="text-chalk-muted font-medium">Metaphor Properties</label>

          {selectedMetaphor.type === 'balance-scale' && (
            <div className="space-y-2">
              <div>
                <label className="text-chalk-muted text-[11px]">Tilt Angle ({selectedMetaphor.properties.tilt || -15}°)</label>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={selectedMetaphor.properties.tilt || -15}
                  onChange={(e) =>
                    updateMetaphor(activeScene.id, selectedMetaphor.id, {
                      properties: { tilt: Number(e.target.value) },
                    })
                  }
                  className="w-full accent-amber-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Left Label"
                  value={selectedMetaphor.properties.leftLabel || ''}
                  onChange={(e) =>
                    updateMetaphor(activeScene.id, selectedMetaphor.id, {
                      properties: { leftLabel: e.target.value },
                    })
                  }
                  className="bg-chalk-bg border border-chalk-border rounded p-1.5 text-chalk-white text-[11px]"
                />
                <input
                  type="text"
                  placeholder="Right Label"
                  value={selectedMetaphor.properties.rightLabel || ''}
                  onChange={(e) =>
                    updateMetaphor(activeScene.id, selectedMetaphor.id, {
                      properties: { rightLabel: e.target.value },
                    })
                  }
                  className="bg-chalk-bg border border-chalk-border rounded p-1.5 text-chalk-white text-[11px]"
                />
              </div>
            </div>
          )}

          {selectedMetaphor.type === 'metric-meter' && (
            <div className="space-y-2">
              <div>
                <label className="text-chalk-muted text-[11px]">
                  Fill Level ({Math.round((selectedMetaphor.properties.level ?? 0.8) * 100)}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={selectedMetaphor.properties.level ?? 0.8}
                  onChange={(e) =>
                    updateMetaphor(activeScene.id, selectedMetaphor.id, {
                      properties: { level: Number(e.target.value) },
                    })
                  }
                  className="w-full accent-amber-400"
                />
              </div>
              <input
                type="text"
                placeholder="Label"
                value={selectedMetaphor.properties.label || ''}
                onChange={(e) =>
                  updateMetaphor(activeScene.id, selectedMetaphor.id, {
                    properties: { label: e.target.value },
                  })
                }
                className="w-full bg-chalk-bg border border-chalk-border rounded p-1.5 text-chalk-white text-[11px]"
              />
            </div>
          )}

          {selectedMetaphor.type === 'battery-indicator' && (
            <div className="space-y-2">
              <div>
                <label className="text-chalk-muted text-[11px]">
                  Charge Percentage ({selectedMetaphor.properties.chargePercent ?? 20}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedMetaphor.properties.chargePercent ?? 20}
                  onChange={(e) =>
                    updateMetaphor(activeScene.id, selectedMetaphor.id, {
                      properties: { chargePercent: Number(e.target.value) },
                    })
                  }
                  className="w-full accent-amber-400"
                />
              </div>
            </div>
          )}

          {selectedMetaphor.type === 'iceberg' && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Top Label"
                value={selectedMetaphor.properties.tipLabel || ''}
                onChange={(e) =>
                  updateMetaphor(activeScene.id, selectedMetaphor.id, {
                    properties: { tipLabel: e.target.value },
                  })
                }
                className="w-full bg-chalk-bg border border-chalk-border rounded p-1.5 text-chalk-white text-[11px]"
              />
              <input
                type="text"
                placeholder="Underwater Label"
                value={selectedMetaphor.properties.underwaterLabel || ''}
                onChange={(e) =>
                  updateMetaphor(activeScene.id, selectedMetaphor.id, {
                    properties: { underwaterLabel: e.target.value },
                  })
                }
                className="w-full bg-chalk-bg border border-chalk-border rounded p-1.5 text-chalk-white text-[11px]"
              />
            </div>
          )}

          {selectedMetaphor.type === 'speech-bubble' && (
            <div className="space-y-1">
              <label className="text-chalk-muted text-[11px]">Bubble Text</label>
              <input
                type="text"
                value={selectedMetaphor.properties.text || ''}
                onChange={(e) =>
                  updateMetaphor(activeScene.id, selectedMetaphor.id, {
                    properties: { text: e.target.value },
                  })
                }
                className="w-full bg-chalk-bg border border-chalk-border rounded p-1.5 text-chalk-white text-[11px]"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Global Stage Settings if nothing selected
  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center gap-2 pb-2 border-b border-chalk-border">
        <Sliders className="w-4 h-4 text-amber-400" />
        <span className="font-bold text-chalk-white uppercase tracking-wider">
          Stage & Scene Settings
        </span>
      </div>

      {/* Active Scene Information */}
      {activeScene && (
        <div className="space-y-2 bg-chalk-card p-3 rounded-lg border border-chalk-border">
          <div className="flex items-center justify-between text-chalk-muted">
            <span className="font-medium text-chalk-white">Current Scene</span>
            <span className="font-mono text-amber-400">
              {activeScene.duration}s duration
            </span>
          </div>

          <input
            type="text"
            value={activeScene.title}
            onChange={(e) =>
              updateScene(activeScene.id, { title: e.target.value })
            }
            className="w-full bg-chalk-bg border border-chalk-border rounded px-2.5 py-1 text-chalk-white font-medium"
            placeholder="Scene Title"
          />

          <textarea
            value={activeScene.visualSummary || ''}
            onChange={(e) =>
              updateScene(activeScene.id, { visualSummary: e.target.value })
            }
            rows={2}
            className="w-full bg-chalk-bg border border-chalk-border rounded p-2 text-[11px] text-chalk-muted resize-none focus:outline-none"
            placeholder="Visual beat description..."
          />
        </div>
      )}

      {/* Ground Line Y Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-chalk-muted">
          <span>Ground Line Anchor (Y)</span>
          <span className="font-mono text-chalk-white">
            {activeScene?.groundLine?.y || 1100}px
          </span>
        </div>
        <input
          type="range"
          min="900"
          max="1400"
          value={activeScene?.groundLine?.y || 1100}
          onChange={(e) => {
            if (activeScene) {
              updateScene(activeScene.id, {
                groundLine: {
                  enabled: true,
                  y: Number(e.target.value),
                  style: activeScene.groundLine?.style || 'chalk',
                },
              });
            }
          }}
          className="w-full accent-amber-400"
        />
      </div>

      {/* Chalk Line Boil Toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-chalk-border/50">
        <div>
          <div className="text-chalk-white font-medium">Chalk Line Boil</div>
          <div className="text-[11px] text-chalk-muted">
            Organic 2-frame hand-drawn stroke jitter
          </div>
        </div>
        <button
          onClick={() =>
            updateMeta({ lineBoil: !project.meta.lineBoil })
          }
          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
            project.meta.lineBoil
              ? 'bg-amber-500 text-black'
              : 'bg-chalk-bg text-chalk-muted border border-chalk-border'
          }`}
        >
          {project.meta.lineBoil ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Stroke Width Slider */}
      <div className="space-y-1.5 pt-2">
        <div className="flex justify-between text-chalk-muted">
          <span>Chalk Stroke Thickness</span>
          <span className="font-mono text-chalk-white">
            {project.meta.strokeWidth || 3.5}px
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="6"
          step="0.5"
          value={project.meta.strokeWidth || 3.5}
          onChange={(e) =>
            updateMeta({ strokeWidth: Number(e.target.value) })
          }
          className="w-full accent-amber-400"
        />
      </div>
    </div>
  );
};
