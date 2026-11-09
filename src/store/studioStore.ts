// Zustand Studio Store for PeerLines Playground
import { create } from 'zustand';
import {
  PeerLinesProject,
  PeerLinesMeta,
  PeerLinesAudio,
  Scene,
  Actor,
  MetaphorConfig,
} from '@/types/dsl';
import { PRESET_PROJECTS, DEFAULT_PROJECT } from '@/constants/presets';
import {
  generateWordTimestamps,
  autoFitScenesToAudio,
} from '@/lib/audio/audioAligner';

export type StudioTab = 'inspector' | 'metaphors' | 'poses' | 'audio';

export interface SelectedElement {
  type: 'actor' | 'metaphor';
  id: string;
}

export interface StudioState {
  project: PeerLinesProject;
  history: PeerLinesProject[];
  historyIndex: number;
  currentFrame: number;
  isPlaying: boolean;
  selectedElement: SelectedElement | null;
  activeTab: StudioTab;
  zoom: number; // 0.5, 0.75, 1.0, 0 = 'fit'
  showSafeZones: boolean;
  audioBuffer: AudioBuffer | null;
  audioFileName: string | null;

  // Actions
  setProject: (project: PeerLinesProject) => void;
  loadPreset: (presetKey: string) => void;
  updateMeta: (partial: Partial<PeerLinesMeta>) => void;
  updateAudio: (partial: Partial<PeerLinesAudio>) => void;
  updateScene: (sceneId: string, partial: Partial<Scene>) => void;
  addScene: (newScene?: Partial<Scene>) => void;
  removeScene: (sceneId: string) => void;
  updateActor: (sceneId: string, actorId: string, partial: Partial<Actor>) => void;
  addActor: (sceneId: string, actor?: Partial<Actor>) => void;
  removeActor: (sceneId: string, actorId: string) => void;
  updateMetaphor: (
    sceneId: string,
    metaphorId: string,
    partial: Partial<MetaphorConfig>
  ) => void;
  addMetaphor: (sceneId: string, metaphor: Partial<MetaphorConfig>) => void;
  removeMetaphor: (sceneId: string, metaphorId: string) => void;
  setCurrentFrame: (frame: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  selectElement: (type: 'actor' | 'metaphor' | null, id: string | null) => void;
  setActiveTab: (tab: StudioTab) => void;
  setZoom: (zoom: number) => void;
  toggleSafeZones: () => void;
  setAudioBuffer: (buffer: AudioBuffer | null, fileName: string | null) => void;
  syncAudioDuration: (totalDuration: number) => void;
  undo: () => void;
  redo: () => void;
}

const saveToHistory = (
  state: StudioState,
  newProject: PeerLinesProject
): Partial<StudioState> => {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(JSON.parse(JSON.stringify(newProject)));
  if (newHistory.length > 30) newHistory.shift();

  return {
    project: newProject,
    history: newHistory,
    historyIndex: newHistory.length - 1,
  };
};

export const useStudioStore = create<StudioState>((set, get) => ({
  project: DEFAULT_PROJECT,
  history: [JSON.parse(JSON.stringify(DEFAULT_PROJECT))],
  historyIndex: 0,
  currentFrame: 0,
  isPlaying: false,
  selectedElement: null,
  activeTab: 'inspector',
  zoom: 0, // 0 = fit
  showSafeZones: false,
  audioBuffer: null,
  audioFileName: null,

  setProject: (project) =>
    set((state) => saveToHistory(state, project)),

  loadPreset: (presetKey) => {
    const preset = PRESET_PROJECTS[presetKey];
    if (preset) {
      set((state) => ({
        ...saveToHistory(state, preset),
        currentFrame: 0,
        selectedElement: null,
      }));
    }
  },

  updateMeta: (partial) => {
    const state = get();
    const newProject: PeerLinesProject = {
      ...state.project,
      meta: { ...state.project.meta, ...partial },
    };
    set(saveToHistory(state, newProject));
  },

  updateAudio: (partial) => {
    const state = get();
    const newProject: PeerLinesProject = {
      ...state.project,
      audio: { ...state.project.audio, ...partial },
    };
    set(saveToHistory(state, newProject));
  },

  updateScene: (sceneId, partial) => {
    const state = get();
    const newScenes = state.project.scenes.map((s) =>
      s.id === sceneId ? { ...s, ...partial } : s
    );
    const newProject: PeerLinesProject = {
      ...state.project,
      scenes: newScenes,
    };
    set(saveToHistory(state, newProject));
  },

  addScene: (newScene) => {
    const state = get();
    const lastScene = state.project.scenes[state.project.scenes.length - 1];
    const startTime = lastScene ? lastScene.startTime + lastScene.duration : 0;
    const duration = 4.5;

    const createdScene: Scene = {
      id: `scene_${Date.now()}`,
      title: 'New Scene Beat',
      visualSummary: 'Hero stickman enters with explanation',
      startTime,
      duration,
      actors: [
        {
          id: `actor_${Date.now()}`,
          name: 'Hero',
          x: 540,
          y: 1100,
          scale: 1.0,
          pose: 'idle',
          expression: 'neutral',
          enter: { type: 'draw-in', duration: 0.5 },
        },
      ],
      metaphors: [],
      groundLine: { enabled: true, y: 1100, style: 'chalk' },
      ...newScene,
    };

    const newScenes = [...state.project.scenes, createdScene];
    const newTotalDuration = newScenes.reduce((acc, s) => acc + s.duration, 0);

    const newProject: PeerLinesProject = {
      ...state.project,
      meta: { ...state.project.meta, durationSeconds: newTotalDuration },
      scenes: newScenes,
    };
    set(saveToHistory(state, newProject));
  },

  removeScene: (sceneId) => {
    const state = get();
    if (state.project.scenes.length <= 1) return; // Keep at least one scene

    const newScenes = state.project.scenes.filter((s) => s.id !== sceneId);
    let runningStart = 0;
    const reindexedScenes = newScenes.map((s) => {
      const updated = { ...s, startTime: runningStart };
      runningStart += s.duration;
      return updated;
    });

    const newTotalDuration = reindexedScenes.reduce((acc, s) => acc + s.duration, 0);
    const newProject: PeerLinesProject = {
      ...state.project,
      meta: { ...state.project.meta, durationSeconds: newTotalDuration },
      scenes: reindexedScenes,
    };
    set(saveToHistory(state, newProject));
  },

  updateActor: (sceneId, actorId, partial) => {
    const state = get();
    const newScenes = state.project.scenes.map((s) => {
      if (s.id !== sceneId) return s;
      return {
        ...s,
        actors: s.actors.map((a) => (a.id === actorId ? { ...a, ...partial } : a)),
      };
    });

    const newProject: PeerLinesProject = {
      ...state.project,
      scenes: newScenes,
    };
    set(saveToHistory(state, newProject));
  },

  addActor: (sceneId, actor) => {
    const state = get();
    const newActor: Actor = {
      id: `actor_${Date.now()}`,
      name: 'Character',
      x: 540,
      y: 1100,
      scale: 1.0,
      pose: 'idle',
      expression: 'neutral',
      ...actor,
    };

    const newScenes = state.project.scenes.map((s) => {
      if (s.id !== sceneId) return s;
      return {
        ...s,
        actors: [...s.actors, newActor],
      };
    });

    const newProject: PeerLinesProject = {
      ...state.project,
      scenes: newScenes,
    };
    set({
      ...saveToHistory(state, newProject),
      selectedElement: { type: 'actor', id: newActor.id },
      activeTab: 'inspector',
    });
  },

  removeActor: (sceneId, actorId) => {
    const state = get();
    const newScenes = state.project.scenes.map((s) => {
      if (s.id !== sceneId) return s;
      return {
        ...s,
        actors: s.actors.filter((a) => a.id !== actorId),
      };
    });

    const newProject: PeerLinesProject = {
      ...state.project,
      scenes: newScenes,
    };
    set({
      ...saveToHistory(state, newProject),
      selectedElement: null,
    });
  },

  updateMetaphor: (sceneId, metaphorId, partial) => {
    const state = get();
    const newScenes = state.project.scenes.map((s) => {
      if (s.id !== sceneId) return s;
      return {
        ...s,
        metaphors: s.metaphors.map((m) =>
          m.id === metaphorId
            ? {
                ...m,
                ...partial,
                properties: {
                  ...m.properties,
                  ...(partial.properties || {}),
                },
              }
            : m
        ),
      };
    });

    const newProject: PeerLinesProject = {
      ...state.project,
      scenes: newScenes,
    };
    set(saveToHistory(state, newProject));
  },

  addMetaphor: (sceneId, metaphor) => {
    const state = get();
    const newMetaphor: MetaphorConfig = {
      id: `meta_${Date.now()}`,
      type: metaphor.type || 'balance-scale',
      x: metaphor.x || 540,
      y: metaphor.y || 800,
      scale: metaphor.scale || 1.0,
      properties: metaphor.properties || {},
      ...metaphor,
    };

    const newScenes = state.project.scenes.map((s) => {
      if (s.id !== sceneId) return s;
      return {
        ...s,
        metaphors: [...s.metaphors, newMetaphor],
      };
    });

    const newProject: PeerLinesProject = {
      ...state.project,
      scenes: newScenes,
    };
    set({
      ...saveToHistory(state, newProject),
      selectedElement: { type: 'metaphor', id: newMetaphor.id },
      activeTab: 'inspector',
    });
  },

  removeMetaphor: (sceneId, metaphorId) => {
    const state = get();
    const newScenes = state.project.scenes.map((s) => {
      if (s.id !== sceneId) return s;
      return {
        ...s,
        metaphors: s.metaphors.filter((m) => m.id !== metaphorId),
      };
    });

    const newProject: PeerLinesProject = {
      ...state.project,
      scenes: newScenes,
    };
    set({
      ...saveToHistory(state, newProject),
      selectedElement: null,
    });
  },

  setCurrentFrame: (frame) => set({ currentFrame: frame }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  selectElement: (type, id) => {
    if (!type || !id) {
      set({ selectedElement: null });
    } else {
      set({ selectedElement: { type, id }, activeTab: 'inspector' });
    }
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setZoom: (zoom) => set({ zoom }),
  toggleSafeZones: () => set((state) => ({ showSafeZones: !state.showSafeZones })),

  setAudioBuffer: (buffer, fileName) =>
    set({ audioBuffer: buffer, audioFileName: fileName }),

  syncAudioDuration: (totalDuration) => {
    const state = get();
    const newSubtitles = generateWordTimestamps(
      state.project.audio.script,
      totalDuration,
      state.audioBuffer || undefined
    );

    const fittedScenes = autoFitScenesToAudio(
      state.project.scenes,
      totalDuration
    );

    const newProject: PeerLinesProject = {
      ...state.project,
      meta: { ...state.project.meta, durationSeconds: totalDuration },
      audio: {
        ...state.project.audio,
        audioDurationSeconds: totalDuration,
        subtitles: newSubtitles,
      },
      scenes: fittedScenes,
    };

    set(saveToHistory(state, newProject));
  },

  undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      set({
        project: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      set({
        project: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
      });
    }
  },
}));
