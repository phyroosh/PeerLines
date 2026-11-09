// Main Studio Layout Component: Full-Screen PeerLines Creative Suite
'use client';

import React, { useState } from 'react';
import { HeaderBar } from './HeaderBar';
import { DirectorPanel } from './DirectorPanel';
import { CanvasStage } from './CanvasStage';
import { InspectorPanel } from './InspectorPanel';
import { AssetLibraryPanel } from './AssetLibraryPanel';
import { AudioVoiceoverPanel } from './AudioVoiceoverPanel';
import { TimelineDock } from './TimelineDock';
import { ExportModal } from './ExportModal';
import { useStudioStore } from '@/store/studioStore';

export const StudioLayout: React.FC = () => {
  const { activeTab } = useStudioStore();
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0C0C0E] text-chalk-white overflow-hidden font-sans">
      {/* Top Header */}
      <HeaderBar onOpenExport={() => setIsExportOpen(true)} />

      {/* Center 3-Column Studio Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: AI Director & Script Editor */}
        <DirectorPanel />

        {/* Center Panel: 9:16 Interactive Canvas Stage */}
        <CanvasStage />

        {/* Right Panel: Inspector, Asset Library, or Audio Voiceover */}
        <div className="w-80 h-full bg-chalk-card/70 border-l border-chalk-border/60 flex flex-col z-10 select-none">
          <div className="p-3.5 border-b border-chalk-border/60 flex items-center justify-between text-xs">
            <span className="font-bold text-chalk-white uppercase tracking-wider">
              {activeTab === 'inspector' && 'Element Inspector'}
              {activeTab === 'metaphors' && 'Metaphor Primitives'}
              {activeTab === 'poses' && 'Stickman Poses'}
              {activeTab === 'audio' && 'ElevenLabs & Audio'}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'inspector' && <InspectorPanel />}
            {(activeTab === 'metaphors' || activeTab === 'poses') && (
              <AssetLibraryPanel />
            )}
            {activeTab === 'audio' && <AudioVoiceoverPanel />}
          </div>
        </div>
      </div>

      {/* Bottom Dock: Multi-Track Timeline & Waveform */}
      <TimelineDock />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};
