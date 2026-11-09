// Canvas-based Audio Waveform Track Synced with Playhead & Scene Markers
'use client';

import React, { useRef, useEffect } from 'react';
import { useStudioStore } from '@/store/studioStore';

export interface WaveformTrackProps {
  totalDuration: number; // in seconds
  currentTime: number; // in seconds
  onScrub: (time: number) => void;
}

export const WaveformTrack: React.FC<WaveformTrackProps> = ({
  totalDuration,
  currentTime,
  onScrub,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const { audioBuffer, project } = useStudioStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const width = canvas.parentElement?.clientWidth || 800;
    const height = 48;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Number of vertical bars to render
    const barCount = Math.floor(width / 3.5);
    const barWidth = 2;
    const barSpacing = 1.5;

    // Center horizontal guideline
    ctx.strokeStyle = '#26262E';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    const progressRatio = totalDuration > 0 ? currentTime / totalDuration : 0;
    const activePixelX = progressRatio * width;

    // 1. Render Waveform Bars
    if (audioBuffer) {
      // Real PCM data from decoded audio file
      const rawData = audioBuffer.getChannelData(0);
      const blockSize = Math.floor(rawData.length / barCount);

      for (let i = 0; i < barCount; i++) {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(rawData[i * blockSize + j]);
        }
        const avg = sum / blockSize;
        const barHeight = Math.max(3, Math.min(height - 6, avg * height * 2.8));
        const bx = i * (barWidth + barSpacing);
        const isPast = bx <= activePixelX;

        ctx.fillStyle = isPast ? '#FACC15' : '#4B5563';
        ctx.fillRect(bx, (height - barHeight) / 2, barWidth, barHeight);
      }
    } else {
      // Procedural synthetic waveform based on words and cadence
      const subtitles = project.audio?.subtitles || [];
      for (let i = 0; i < barCount; i++) {
        const bx = i * (barWidth + barSpacing);
        const timeAtBar = (i / barCount) * totalDuration;

        // Check if there is an active word at this time
        const hasWord = subtitles.some(
          (w) => timeAtBar >= w.start && timeAtBar <= w.end
        );

        let barHeight = 4;
        if (hasWord) {
          // Dynamic organic amplitude
          barHeight =
            12 + Math.abs(Math.sin(i * 0.45) * 16) + Math.cos(i * 0.2) * 8;
        }

        const isPast = bx <= activePixelX;
        ctx.fillStyle = isPast ? '#FACC15' : '#374151';
        ctx.fillRect(bx, (height - barHeight) / 2, barWidth, barHeight);
      }
    }

    // 2. Render Scene Cut Boundary Markers
    project.scenes.forEach((scene) => {
      if (scene.startTime > 0 && totalDuration > 0) {
        const sx = (scene.startTime / totalDuration) * width;
        ctx.strokeStyle = '#60A5FA';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx, height);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // 3. Render Current Playhead Line
    ctx.strokeStyle = '#FACC15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(activePixelX, 0);
    ctx.lineTo(activePixelX, height);
    ctx.stroke();

    // Playhead top bead
    ctx.fillStyle = '#FACC15';
    ctx.beginPath();
    ctx.arc(activePixelX, 4, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [audioBuffer, project, totalDuration, currentTime]);

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
    onScrub(targetTime);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full h-12 bg-black/40 rounded-lg border border-chalk-border/60 overflow-hidden cursor-crosshair select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />

      {/* Track Label */}
      <div className="absolute top-1 left-2 pointer-events-none text-[10px] font-mono font-medium text-chalk-muted/80 tracking-wider">
        VOICEOVER WAVEFORM {audioBuffer ? '• 44.1kHz PCM' : '• SYNTHETIC PREVIEW'}
      </div>
    </div>
  );
};
