// Left Panel: AI Director & Multi-Beat Script Editor
'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  Plus,
  Trash2,
  Clock,
  Layers,
  ChevronRight,
  Film,
  Send,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { Scene } from '@/types/dsl';

export const DirectorPanel: React.FC = () => {
  const {
    project,
    currentFrame,
    setProject,
    updateScene,
    addScene,
    removeScene,
    setCurrentFrame,
  } = useStudioStore();

  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);

  const fps = project.meta.fps || 30;
  const currentTime = currentFrame / fps;

  const PROMPT_SUGGESTIONS = [
    'Why soldiers don’t feel pain immediately in combat',
    'Why scrolling through social media exhausts your dopamine',
    'Why introverts quietly distance themselves',
    'The unseen 90% iceberg of true mastery',
    'When to sever a one-sided toxic relationship',
  ];

  const handleGenerate = async (customPrompt?: string) => {
    const query = customPrompt || prompt;
    if (!query.trim()) return;

    try {
      setIsGenerating(true);
      const res = await fetch('/api/director', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await res.json();
      if (data.success && data.project) {
        setProject(data.project);
        setCurrentFrame(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleJumpToScene = (startTime: number) => {
    setCurrentFrame(Math.round(startTime * fps));
  };

  return (
    <div className="w-80 h-full bg-chalk-card/70 border-r border-chalk-border/60 flex flex-col text-xs z-10 select-none">
      {/* Top Header */}
      <div className="p-3.5 border-b border-chalk-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-chalk-white uppercase tracking-wider">
          <Wand2 className="w-4 h-4 text-amber-400" />
          <span>AI Director & Script</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
          Agentic
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {/* Prompt Input Box */}
        <div className="space-y-2">
          <label className="text-chalk-muted font-semibold flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate New Concept</span>
          </label>

          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Why soldiers don't feel pain immediately in danger..."
              rows={3}
              className="w-full bg-chalk-bg border border-chalk-border rounded-lg p-2.5 text-chalk-white text-xs placeholder:text-chalk-muted/60 focus:outline-none focus:border-amber-400 resize-none transition-colors"
            />
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !prompt.trim()}
              className="absolute right-2 bottom-2 p-1.5 rounded-md bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold transition-all active:scale-95 shadow-sm"
              title="Direct Animation"
            >
              {isGenerating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Quick Suggestion Pills */}
          <div className="space-y-1">
            <span className="text-[10px] text-chalk-muted">Suggested prompts:</span>
            <div className="flex flex-col gap-1">
              {PROMPT_SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(s);
                    handleGenerate(s);
                  }}
                  className="text-left text-[11px] text-chalk-muted hover:text-amber-300 px-2 py-1 rounded bg-chalk-bg/80 hover:bg-chalk-bg border border-chalk-border/50 truncate transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Multi-Beat Script Breakdown */}
        <div className="space-y-2 pt-2 border-t border-chalk-border/50">
          <div className="flex items-center justify-between text-chalk-muted pb-1">
            <span className="font-semibold text-chalk-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Story Beats ({project.scenes.length})</span>
            </span>
            <button
              onClick={() => addScene()}
              className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Add Beat</span>
            </button>
          </div>

          {/* Scene Cards List */}
          <div className="space-y-2.5">
            {project.scenes.map((scene: Scene, idx: number) => {
              const isActive =
                currentTime >= scene.startTime &&
                currentTime < scene.startTime + scene.duration;

              return (
                <div
                  key={scene.id}
                  onClick={() => handleJumpToScene(scene.startTime)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/10 border-amber-500/60 shadow-md'
                      : 'bg-chalk-bg/70 hover:bg-chalk-bg border-chalk-border/60 hover:border-chalk-muted'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-chalk-card border border-chalk-border text-[11px] font-bold text-amber-400 flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-chalk-white truncate max-w-[140px]">
                        {scene.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-chalk-muted flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {scene.duration}s
                      </span>
                      {project.scenes.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeScene(scene.id);
                          }}
                          className="text-chalk-muted hover:text-rose-400 p-0.5 rounded transition-colors"
                          title="Remove Scene"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Visual Summary */}
                  {scene.visualSummary && (
                    <p className="text-[11px] text-chalk-muted line-clamp-2 mb-2 leading-relaxed">
                      {scene.visualSummary}
                    </p>
                  )}

                  {/* Character & Metaphor Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-chalk-border/40 text-[10px]">
                    {scene.actors.map((actor) => (
                      <span
                        key={actor.id}
                        className="px-1.5 py-0.5 rounded bg-chalk-card border border-chalk-border text-chalk-white font-mono"
                      >
                        🧍 {actor.pose}
                      </span>
                    ))}
                    {scene.metaphors.map((meta) => (
                      <span
                        key={meta.id}
                        className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono"
                      >
                        ⚡ {meta.type.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
