// PeerLines Declarative Scene Graph Schema (PeerLinesDSL)

export type ActorPose =
  | 'idle'
  | 'hands-on-hips'
  | 'folded-arms'
  | 'pointing'
  | 'waving'
  | 'holding-item'
  | 'walking'
  | 'running'
  | 'lying-down'
  | 'sitting-bench'
  | 'holding-hands';

export type ActorExpression =
  | 'neutral'
  | 'happy'
  | 'smug'
  | 'sad'
  | 'crying'
  | 'frowning'
  | 'angry'
  | 'peaceful'
  | 'sick'
  | 'surprised';

export type ActorAccessory =
  | 'none'
  | 'helmet'
  | 'long-hair'
  | 'backpack'
  | 'glasses'
  | 'mask'
  | 'smartphone'
  | 'scissors'
  | 'sword'
  | 'book';

export type ActorHoldingItem =
  | 'none'
  | 'phone'
  | 'sign'
  | 'heart'
  | 'scissors'
  | 'coffee'
  | 'sword'
  | 'book';

export type ParticleType =
  | 'none'
  | 'hearts'
  | 'question-marks'
  | 'tears'
  | 'sweat-drops'
  | 'lightning'
  | 'dopamine-sparks'
  | 'embers';

export interface ActorEnterAnimation {
  type: 'none' | 'draw-in' | 'fade-in' | 'pop-in' | 'slide-up' | 'slide-left';
  duration: number; // in seconds
}

export interface Actor {
  id: string;
  name?: string;
  x: number; // 0 to 1080 (canvas width)
  y: number; // 0 to 1920 (canvas height, ground line typically 1100-1200)
  scale: number; // 1.0 default
  pose: ActorPose;
  expression: ActorExpression;
  accessory?: ActorAccessory;
  holdingItem?: ActorHoldingItem;
  facing?: 'right' | 'left';
  glowHeart?: boolean;
  glowShield?: boolean;
  particles?: ParticleType;
  enter?: ActorEnterAnimation;
  customColor?: string; // default white #F4F4F6
}

export type MetaphorType =
  | 'balance-scale'
  | 'metric-meter'
  | 'battery-indicator'
  | 'iceberg'
  | 'severed-connection'
  | 'isolation-shield'
  | 'campfire'
  | 'dna-helix'
  | 'plant-growth'
  | 'checklist'
  | 'speech-bubble'
  | 'framed-panels';

export interface MetaphorConfig {
  id: string;
  type: MetaphorType;
  x: number;
  y: number;
  scale?: number;
  properties: Record<string, any>;
  enter?: {
    type: 'draw-in' | 'fade-in' | 'pop-in';
    duration: number;
  };
}

export interface GroundLineConfig {
  enabled: boolean;
  y: number; // default 1100
  style: 'clean' | 'chalk' | 'dashed';
  showPerspectiveGrid?: boolean;
}

export interface Scene {
  id: string;
  title: string;
  visualSummary?: string;
  startTime: number; // in seconds
  duration: number; // in seconds
  actors: Actor[];
  metaphors: MetaphorConfig[];
  groundLine?: GroundLineConfig;
  floatingText?: {
    text: string;
    x: number;
    y: number;
    style?: 'chalk-box' | 'subtle' | 'warning';
  }[];
  transition?: 'cut' | 'fade' | 'slide';
}

export interface SubtitleWord {
  word: string;
  start: number; // in seconds
  end: number; // in seconds
  emphasis?: boolean;
}

export interface PeerLinesAudio {
  script: string;
  voiceId?: string;
  audioUrl?: string; // Blob URL, local file path, or remote URL
  audioDurationSeconds?: number;
  voiceStyleRecommendation?: string; // e.g. "Marcus/Adam - Deep philosophical tone, calm, 125 wpm"
  subtitles: SubtitleWord[];
  source: 'elevenlabs-manual' | 'browser-tts' | 'mock';
}

export interface PeerLinesMeta {
  title: string;
  description?: string;
  author?: string;
  durationSeconds: number;
  theme: 'dark-chalk' | 'blueprint' | 'minimal-white';
  fps: number; // default 30
  width: number; // default 1080
  height: number; // default 1920
  strokeWidth: number; // default 3.5
  lineBoil: boolean; // default true (organic jitter)
}

export interface PeerLinesProject {
  meta: PeerLinesMeta;
  audio: PeerLinesAudio;
  scenes: Scene[];
}
