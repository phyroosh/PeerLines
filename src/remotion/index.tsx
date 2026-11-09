import React from 'react';
import { registerRoot, Composition } from 'remotion';
import { MainComposition } from './MainComposition';
import { DEFAULT_PROJECT, PRESET_PROJECTS } from '@/constants/presets';

export const RemotionRoot: React.FC = () => {
  const lonelinessProject = PRESET_PROJECTS.modern_loneliness || DEFAULT_PROJECT;

  return (
    <>
      <Composition
        id="MainComposition"
        component={MainComposition as any}
        durationInFrames={Math.round(DEFAULT_PROJECT.meta.durationSeconds * DEFAULT_PROJECT.meta.fps)}
        fps={DEFAULT_PROJECT.meta.fps}
        width={DEFAULT_PROJECT.meta.width}
        height={DEFAULT_PROJECT.meta.height}
        defaultProps={{
          project: DEFAULT_PROJECT,
        }}
      />
      <Composition
        id="ModernLoneliness"
        component={MainComposition as any}
        durationInFrames={Math.round(lonelinessProject.meta.durationSeconds * lonelinessProject.meta.fps)}
        fps={lonelinessProject.meta.fps}
        width={lonelinessProject.meta.width}
        height={lonelinessProject.meta.height}
        defaultProps={{
          project: lonelinessProject,
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
