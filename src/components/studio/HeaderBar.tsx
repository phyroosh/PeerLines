// Studio Header Bar with Title, Presets, Undo/Redo, and Export Triggers
'use client';

import React from 'react';
import {
  Film,
  RotateCcw,
  RotateCw,
  Download,
  Sliders,
  Sparkles,
  Volume2,
  FolderOpen,
  Layout,
  Plus,
} from 'lucide-react';
import { useStudioStore, StudioTab } from '@/store/studioStore';
import { PRESET_PROJECTS } from '@/constants/presets';

export interface HeaderBarProps {
  onOpenExport: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ onOpenExport }) => {
  const {
    project,
    activeTab,
    historyIndex,
    history,
    updateMeta,
    loadPreset,
    setActiveTab,
    undo,
    redo,
  } = useStudioStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <header className="h-14 bg-chalk-card border-b border-chalk-border/80 px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & Project Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center font-black text-sm shadow-md">
            PL
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-chalk-white tracking-tight">
                PeerLines
              </span>
              <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Playground
              </span>
            </div>
            <div className="text-[10px] text-chalk-muted font-medium">
              Viral 9:16 Minimalist Explainer Studio
            </div>
          </div>
        </div>

        {/* Project Title Input */}
        <div className="h-5 w-px bg-chalk-border mx-1" />
        <input
          type="text"
          value={project.meta.title}
          onChange={(e) => updateMeta({ title: e.target.value })}
          className="bg-transparent hover:bg-chalk-bg/60 focus:bg-chalk-bg border border-transparent hover:border-chalk-border/50 focus:border-amber-400 rounded px-2.5 py-1 text-xs font-semibold text-chalk-white max-w-xs transition-colors focus:outline-none"
        />
      </div>

      {/* Preset Selector Dropdown */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-chalk-bg border border-chalk-border rounded-lg px-2 py-1 text-xs">
          <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-chalk-muted text-[11px]">Preset:</span>
          <select
            onChange={(e) => loadPreset(e.target.value)}
            defaultValue="introvert"
            className="bg-transparent text-chalk-white font-medium focus:outline-none cursor-pointer text-xs"
          >
            <option value="modern_loneliness">The Loneliness Paradox</option>
            <option value="introvert">Introverts Distance</option>
            <option value="soldier">Soldier Pain Analgesia</option>
            <option value="dopamine">Dopamine Detox Trap</option>
            <option value="iceberg">The Success Iceberg</option>
            <option value="toxic_scale">Toxic Bond Scale</option>
          </select>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center bg-chalk-bg border border-chalk-border rounded-lg overflow-hidden">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-1.5 text-chalk-muted hover:text-chalk-white disabled:opacity-30 transition-colors"
            title="Undo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-chalk-border" />
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-1.5 text-chalk-muted hover:text-chalk-white disabled:opacity-30 transition-colors"
            title="Redo"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right Controls & Export */}
      <div className="flex items-center gap-3">
        {/* Right Panel Tab Switcher */}
        <div className="flex items-center bg-chalk-bg border border-chalk-border rounded-lg p-0.5 text-xs">
          {[
            { id: 'inspector', label: 'Inspector', icon: Sliders },
            { id: 'metaphors', label: 'Metaphors', icon: Layout },
            { id: 'poses', label: 'Poses', icon: Sparkles },
            { id: 'audio', label: 'Voiceover & Audio', icon: Volume2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as StudioTab)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'text-chalk-muted hover:text-chalk-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Export Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Video</span>
        </button>
      </div>
    </header>
  );
};
