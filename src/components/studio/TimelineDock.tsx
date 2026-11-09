// Multi-Track Timeline Dock with Scene Beats, Subtitle Markers, and Waveform
'use client';

import React, { useRef } from 'react';
import { Layers, Type, Volume2, Clock, Sparkles } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { WaveformTrack } from './WaveformTrack';

export const TimelineDock: React.FC = () => {
  const {
    project,
    currentFrame,
    setCurrentFrame,
    updateScene,
  } = useStudioStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const fps = project.meta.fps || 30;
  const totalDuration = project.meta.durationSeconds || 15;
  const currentTime = currentFrame / fps;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current && e.type !== 'pointerdown') return;
    const container = containerRef.current;
    if (!container || totalDuration <= 0) return;

    const rect = container.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const targetTime = (clickX / rect.width) * totalDuration;
    setCurrentFrame(Math.round(targetTime * fps));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const playheadPercent =
    totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="h-44 bg-chalk-card/90 border-t border-chalk-border/60 flex flex-col z-20 select-none">
      {/* Top Ruler / Timecode Scale */}
      <div className="h-6 bg-black/40 border-b border-chalk-border/40 px-3 flex items-center justify-between text-[10px] font-mono text-chalk-muted">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-amber-400" />
          <span className="font-semibold text-chalk-white">Timeline</span>
        </div>

        {/* Time Increments */}
        <div className="flex items-center gap-8 text-[9px] text-chalk-muted">
          {Array.from({ length: Math.ceil(totalDuration / 2) + 1 }).map((_, i) => (
            <span key={i}>{i * 2}s</span>
          ))}
        </div>

        <span className="text-amber-400 font-bold">
          {currentTime.toFixed(2)}s / {totalDuration.toFixed(1)}s
        </span>
      </div>

      {/* Main Multi-Track Canvas Area */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="flex-1 relative p-2.5 space-y-2 overflow-hidden cursor-pointer"
      >
        {/* Playhead Vertical Line */}
        <div
          style={{ left: `${playheadPercent}%` }}
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-30 pointer-events-none transition-all duration-75"
        >
          <div className="absolute -top-1 -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-lg" />
        </div>

        {/* Track 1: Visual Scene Beats */}
        <div className="h-8 flex items-center gap-1 w-full bg-chalk-bg rounded-lg p-1 border border-chalk-border/40">
          {project.scenes.map((scene, idx) => {
            const widthPercent = (scene.duration / totalDuration) * 100;
            const isActive =
              currentTime >= scene.startTime &&
              currentTime < scene.startTime + scene.duration;

            return (
              <div
                key={scene.id}
                style={{ width: `${widthPercent}%` }}
                className={`h-full rounded-md px-2 flex items-center justify-between text-[10px] font-bold truncate transition-all border ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-chalk-card text-chalk-muted border-chalk-border/60 hover:text-chalk-white'
                }`}
              >
                <span className="truncate">
                  {idx + 1}. {scene.title}
                </span>
                <span className="font-mono text-[9px] opacity-75">
                  {scene.duration}s
                </span>
              </div>
            );
          })}
        </div>

        {/* Track 2: Subtitles Track */}
        <div className="h-6 relative w-full bg-chalk-bg rounded-md p-0.5 border border-chalk-border/40 overflow-hidden flex items-center">
          {project.audio?.subtitles?.map((w, idx) => {
            const leftPct = (w.start / totalDuration) * 100;
            const widthPct = Math.max(1, ((w.end - w.start) / totalDuration) * 100);
            const isActive = currentTime >= w.start && currentTime <= w.end;

            return (
              <div
                key={idx}
                style={{
                  left: `${leftPct}%`,
                  width: `${widthPct}%`,
                }}
                className={`absolute top-1 bottom-1 rounded-sm text-[8px] font-mono px-0.5 truncate transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-chalk-card text-chalk-muted/80'
                }`}
                title={`${w.word} (${w.start}s - ${w.end}s)`}
              >
                {w.word}
              </div>
            );
          })}
        </div>

        {/* Track 3: Voiceover Waveform Track */}
        <div className="w-full">
          <WaveformTrack
            totalDuration={totalDuration}
            currentTime={currentTime}
            onScrub={(time) => setCurrentFrame(Math.round(time * fps))}
          />
        </div>
      </div>
    </div>
  );
};
