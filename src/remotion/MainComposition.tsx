// Remotion Main Composition (1080x1920 9:16 Vertical Video Engine)
import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
import { PeerLinesProject, Scene } from '@/types/dsl';
import { SceneRenderer } from './SceneRenderer';
import { KineticCaptions } from '@/components/canvas/KineticCaptions';

export interface MainCompositionProps {
  project: PeerLinesProject;
  selectedElementId?: string | null;
  onSelectElement?: (type: 'actor' | 'metaphor', id: string) => void;
}

export const MainComposition: React.FC<MainCompositionProps> = ({
  project,
  selectedElementId,
  onSelectElement,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const currentTime = frame / fps;

  // Determine current active scene
  const activeSceneIndex = useMemo(() => {
    const idx = project.scenes.findIndex(
      (s) => currentTime >= s.startTime && currentTime < s.startTime + s.duration
    );
    if (idx !== -1) return idx;
    // Fallback to last scene if time exceeded
    return Math.max(0, project.scenes.length - 1);
  }, [project.scenes, currentTime]);

  const currentScene = project.scenes[activeSceneIndex];
  const sceneLocalFrame = Math.max(
    0,
    Math.round((currentTime - (currentScene?.startTime || 0)) * fps)
  );

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#0C0C0E',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Optional Audio Track */}
      {project.audio?.audioUrl && (
        <Audio
          src={
            project.audio.audioUrl.startsWith('http://') ||
            project.audio.audioUrl.startsWith('https://') ||
            project.audio.audioUrl.startsWith('blob:') ||
            project.audio.audioUrl.startsWith('data:')
              ? project.audio.audioUrl
              : staticFile(
                  project.audio.audioUrl.startsWith('/')
                    ? project.audio.audioUrl.slice(1)
                    : project.audio.audioUrl
                )
          }
        />
      )}

      {/* Active Scene Visuals */}
      {currentScene && (
        <SceneRenderer
          scene={currentScene}
          frame={frame}
          fps={fps}
          sceneLocalFrame={sceneLocalFrame}
          lineBoil={project.meta.lineBoil}
          selectedElementId={selectedElementId}
          onSelectElement={onSelectElement}
        />
      )}

      {/* Kinetic Karaoke Captions at Lower Third (y = 1350) */}
      {project.audio?.subtitles && (
        <KineticCaptions
          subtitles={project.audio.subtitles}
          currentTime={currentTime}
          y={1350}
          accentColor="#FACC15"
          frame={frame}
        />
      )}
    </div>
  );
};
