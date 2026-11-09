// Dynamic Kinetic Captions (Word-by-word Karaoke Subtitles with Dynamic Underline & Accent Pop)
import React, { useMemo } from 'react';
import { SubtitleWord } from '@/types/dsl';

export interface KineticCaptionsProps {
  subtitles: SubtitleWord[];
  currentTime: number; // in seconds
  y?: number; // default 1350
  accentColor?: string; // default #FACC15
  frame?: number;
}

export const KineticCaptions: React.FC<KineticCaptionsProps> = ({
  subtitles,
  currentTime,
  y = 1350,
  accentColor = '#FACC15',
  frame = 0,
}) => {
  // Find current active word index
  const activeIndex = useMemo(() => {
    return subtitles.findIndex(
      (w) => currentTime >= w.start && currentTime <= w.end
    );
  }, [subtitles, currentTime]);

  // If no word is currently active, find the closest past word or upcoming word
  const displayIndex = useMemo(() => {
    if (activeIndex !== -1) return activeIndex;
    // Find the latest word that has ended within 1.2 seconds
    for (let i = subtitles.length - 1; i >= 0; i--) {
      if (currentTime >= subtitles[i].end && currentTime - subtitles[i].end < 1.2) {
        return i;
      }
    }
    // Find the next upcoming word if it's within 0.4 seconds
    const nextIdx = subtitles.findIndex((w) => w.start > currentTime);
    if (nextIdx !== -1 && subtitles[nextIdx].start - currentTime < 0.4) {
      return nextIdx;
    }
    return -1;
  }, [subtitles, currentTime, activeIndex]);

  // Group into short punchy viral phrases (typically 4-6 words)
  const currentChunk = useMemo(() => {
    if (displayIndex === -1 || subtitles.length === 0) return [];

    const chunkSize = 5;
    const chunkStart = Math.floor(displayIndex / chunkSize) * chunkSize;
    const chunkEnd = Math.min(subtitles.length, chunkStart + chunkSize);

    return subtitles.slice(chunkStart, chunkEnd);
  }, [subtitles, displayIndex]);

  if (currentChunk.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        padding: '0 40px',
        zIndex: 40,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'baseline',
          columnGap: '16px',
          rowGap: '10px',
          fontFamily: "'Caveat', 'Architects Daughter', cursive, sans-serif",
          fontSize: '48px',
          fontWeight: '700',
          fontStyle: 'italic',
          textAlign: 'center',
          textShadow: '0 4px 16px rgba(0,0,0,0.85)',
          maxWidth: '900px',
        }}
      >
        {currentChunk.map((sub, idx) => {
          const isActive =
            currentTime >= sub.start && currentTime <= sub.end;
          const isPast = currentTime > sub.end;

          // Underline progress for active word
          const progress = isActive
            ? Math.min(1, Math.max(0, (currentTime - sub.start) / Math.max(0.1, sub.end - sub.start)))
            : isPast
            ? 1
            : 0;

          return (
            <span
              key={`${sub.word}-${idx}`}
              style={{
                position: 'relative',
                display: 'inline-block',
                color: isActive ? accentColor : isPast ? '#E5E7EB' : '#9CA3AF',
                transform: isActive ? 'scale(1.08)' : 'scale(1.0)',
                transition: 'transform 0.08s ease-out, color 0.1s ease-out',
                letterSpacing: '0.5px',
              }}
            >
              {sub.word}

              {/* Dynamic Animated Underline Stroke for Active Word */}
              {isActive && (
                <svg
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: '-8px',
                    width: '100%',
                    height: '10px',
                    overflow: 'visible',
                  }}
                >
                  <path
                    d={`M 0 4 Q ${sub.word.length * 6} ${6 + Math.sin(frame * 0.4) * 1.5} ${sub.word.length * 15 * progress} 4`}
                    stroke={accentColor}
                    strokeWidth={4}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};
