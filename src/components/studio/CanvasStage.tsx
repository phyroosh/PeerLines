// Interactive Canvas Stage Hosting Remotion Player with Safe Zones and On-Canvas Selection
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Maximize2,
  ZoomIn,
  Layers,
  Eye,
  Crosshair,
  Volume2,
} from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { MainComposition } from '@/remotion/MainComposition';

export const CanvasStage: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    project,
    currentFrame,
    isPlaying,
    selectedElement,
    zoom,
    showSafeZones,
    setCurrentFrame,
    setIsPlaying,
    selectElement,
    setZoom,
    toggleSafeZones,
  } = useStudioStore();

  const [containerScale, setContainerScale] = useState(0.42);

  const fps = project.meta.fps || 30;
  const totalFrames = Math.max(
    1,
    Math.round(project.meta.durationSeconds * fps)
  );

  // Auto-fit scale calculation
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const targetAspect = 1080 / 1920;
      const padding = 60; // headroom

      const availHeight = clientHeight - padding;
      const availWidth = clientWidth - padding;

      let fitScale = Math.min(availWidth / 1080, availHeight / 1920);

      if (zoom === 0.5) fitScale = 0.5;
      else if (zoom === 0.75) fitScale = 0.75;
      else if (zoom === 1.0) fitScale = 1.0;

      setContainerScale(Math.max(0.2, Math.min(1.2, fitScale)));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [zoom]);

  // Sync player play/pause state
  const handleTogglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (playerRef.current.isPlaying()) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  }, [setIsPlaying]);

  // Frame steppers
  const handleStepFrame = (delta: number) => {
    if (!playerRef.current) return;
    playerRef.current.pause();
    setIsPlaying(false);
    const newFrame = Math.max(0, Math.min(totalFrames - 1, currentFrame + delta));
    playerRef.current.seekTo(newFrame);
    setCurrentFrame(newFrame);
  };

  // Keep store frame in sync with Remotion player
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onFrameUpdate = (e: { detail: { frame: number } }) => {
      setCurrentFrame(e.detail.frame);
    };

    player.addEventListener('frameupdate', onFrameUpdate);
    return () => {
      player.removeEventListener('frameupdate', onFrameUpdate);
    };
  }, [setCurrentFrame]);

  // Format timecode (e.g. 00:04.12)
  const formatTimecode = (frame: number) => {
    const totalSecs = frame / fps;
    const mins = Math.floor(totalSecs / 60);
    const secs = Math.floor(totalSecs % 60);
    const millis = Math.floor((totalSecs % 1) * 100);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(millis).padStart(2, '0')}`;
  };

  return (
    <div className="relative flex-1 flex flex-col h-full bg-[#08080A] overflow-hidden select-none">
      {/* Top Canvas Bar */}
      <div className="h-12 border-b border-chalk-border/60 bg-chalk-card/40 backdrop-blur px-4 flex items-center justify-between text-xs text-chalk-muted z-20">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-chalk-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            9:16 Canvas Stage
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-chalk-bg border border-chalk-border font-mono">
            1080 × 1920
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-chalk-bg border border-chalk-border font-mono text-amber-400">
            {fps} FPS
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Safe Zones Toggle */}
          <button
            onClick={toggleSafeZones}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
              showSafeZones
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-chalk-bg text-chalk-muted border-chalk-border hover:text-chalk-white'
            }`}
            title="Toggle Shorts & TikTok UI overlay guides"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Safe Zones</span>
          </button>

          {/* Zoom Selector */}
          <div className="flex items-center bg-chalk-bg border border-chalk-border rounded-lg overflow-hidden">
            {[
              { label: 'Fit', val: 0 },
              { label: '50%', val: 0.5 },
              { label: '75%', val: 0.75 },
              { label: '100%', val: 1.0 },
            ].map((z) => (
              <button
                key={z.label}
                onClick={() => setZoom(z.val)}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  zoom === z.val
                    ? 'bg-chalk-card text-chalk-white font-bold'
                    : 'text-chalk-muted hover:text-chalk-white'
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Viewport Workspace */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center p-4 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #15151A 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      >
        {/* Scaled 9:16 Canvas Wrapper */}
        <div
          style={{
            width: '1080px',
            height: '1920px',
            transform: `scale(${containerScale})`,
            transformOrigin: 'center center',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px #26262E',
            position: 'relative',
          }}
          className="rounded-xl overflow-hidden bg-[#0C0C0E]"
        >
          {/* Remotion Player */}
          <Player
            ref={playerRef}
            component={MainComposition as any}
            durationInFrames={totalFrames}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={fps}
            style={{
              width: '100%',
              height: '100%',
            }}
            inputProps={{
              project,
              selectedElementId: selectedElement?.id,
              onSelectElement: (type: 'actor' | 'metaphor', id: string) => {
                selectElement(type, id);
              },
            }}
            loop
          />

          {/* Social Media Safe Zones Overlay (Shorts / Reels / TikTok) */}
          {showSafeZones && (
            <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-8 text-white font-sans">
              {/* Top Bar Safe Margin */}
              <div className="h-28 border-b-2 border-dashed border-rose-500/40 bg-rose-500/5 rounded-t-lg flex items-center justify-between px-6">
                <span className="text-sm font-semibold tracking-wider text-rose-400">
                  TOP UI (CHANNELS & SEARCH)
                </span>
              </div>

              {/* Center Safe Canvas */}
              <div className="flex-1 flex items-center justify-between px-6 border-x-2 border-dashed border-emerald-500/30">
                <span className="text-xs text-emerald-400/50 rotate-90">SAFE MARGIN</span>
                <span className="text-xs text-emerald-400/50 -rotate-90">SAFE MARGIN</span>
              </div>

              {/* Right Side Social Actions Column (Like, Share, Sound) */}
              <div className="absolute right-6 bottom-48 w-28 h-96 border-2 border-dashed border-amber-500/50 bg-amber-500/5 rounded-lg flex flex-col items-center justify-center gap-4 text-center p-2">
                <span className="text-xs font-bold text-amber-400">
                  SHORTS / REELS BUTTONS
                </span>
                <div className="space-y-2 text-[10px] text-amber-300/80">
                  <div>[Like]</div>
                  <div>[Comments]</div>
                  <div>[Share]</div>
                  <div>[Sound]</div>
                </div>
              </div>

              {/* Bottom Caption & Title Overlay Margin */}
              <div className="h-56 border-t-2 border-dashed border-rose-500/40 bg-rose-500/5 rounded-b-lg flex flex-col justify-end p-6">
                <span className="text-sm font-semibold tracking-wider text-rose-400">
                  BOTTOM UI (DESCRIPTION & SOUND MARGIN)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating Scrubber Control Bar */}
      <div className="h-14 border-t border-chalk-border/60 bg-chalk-card/80 backdrop-blur px-6 flex items-center justify-between z-20">
        {/* Play / Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStepFrame(-1)}
            className="w-8 h-8 rounded-lg bg-chalk-bg border border-chalk-border hover:bg-chalk-card text-chalk-muted hover:text-chalk-white flex items-center justify-center transition-colors active:scale-95"
            title="Step Back 1 Frame"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-all shadow-md active:scale-95"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => handleStepFrame(1)}
            className="w-8 h-8 rounded-lg bg-chalk-bg border border-chalk-border hover:bg-chalk-card text-chalk-muted hover:text-chalk-white flex items-center justify-center transition-colors active:scale-95"
            title="Step Forward 1 Frame"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Timecode & Frame Indicator */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-chalk-white font-bold tracking-wider">
            {formatTimecode(currentFrame)}
          </span>
          <span className="text-chalk-muted">/</span>
          <span className="text-chalk-muted">
            {formatTimecode(totalFrames)}
          </span>
          <span className="px-2 py-0.5 rounded bg-black/40 border border-chalk-border text-[11px] text-amber-400">
            F: {currentFrame} / {totalFrames}
          </span>
        </div>

        {/* Selected Element Quick Badge */}
        <div className="flex items-center gap-2 text-xs">
          {selectedElement ? (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Crosshair className="w-3.5 h-3.5" />
              <span className="font-medium capitalize">
                Selected: {selectedElement.type} ({selectedElement.id})
              </span>
            </div>
          ) : (
            <span className="text-chalk-muted text-[11px]">
              Click any stick figure or widget on canvas to inspect
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
