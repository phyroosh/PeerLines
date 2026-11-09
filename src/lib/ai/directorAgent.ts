// AI Director Multi-Phase Pipeline (Director -> Storyboarder -> Scene Graph Generator -> Validator)
import { PeerLinesProject, Scene, SubtitleWord } from '@/types/dsl';
import { generateWordTimestamps } from '@/lib/audio/audioAligner';

export interface GenerateAnimationRequest {
  prompt: string;
  targetDurationSeconds?: number;
  apiKey?: string;
  modelProvider?: 'gemini' | 'openai';
}

/**
 * Intelligent Heuristic Generation Engine (Deterministic Offline Mode & Live LLM Fallback)
 * Analyzes semantic intent and produces a complete, viral PeerLinesDSL project.
 */
export function generateHeuristicProject(prompt: string, targetDuration = 15.0): PeerLinesProject {
  const p = prompt.toLowerCase();

  let title = 'The Hidden Mechanism';
  let script = '';
  let voiceRecommendation = 'Marcus / Adam — Deep philosophical tone, calm, 120 wpm';
  let scenes: Scene[] = [];

  if (p.includes('pain') || p.includes('soldier') || p.includes('injury') || p.includes('danger')) {
    title = "Why In Danger, You Don't Feel Pain";
    script =
      "In extreme crisis, your body experiences stress-induced analgesia. Massive endorphins flood the nervous system... completely muting pain receptors. Your brain has one absolute rule: survival comes first, pain can wait.";
    voiceRecommendation = 'Rachel / George — Punchy, high-stakes clinical documentary pacing';
    scenes = [
      {
        id: 'scene_1',
        title: 'THE CRISIS IMPACT',
        visualSummary: 'Soldier in combat stance standing firm under intense pressure',
        startTime: 0.0,
        duration: targetDuration * 0.33,
        actors: [
          {
            id: 'actor_soldier',
            name: 'Soldier',
            x: 540,
            y: 1100,
            scale: 1.1,
            pose: 'pointing',
            expression: 'angry',
            accessory: 'helmet',
            enter: { type: 'draw-in', duration: 0.5 },
          },
        ],
        metaphors: [
          {
            id: 'meta_pain',
            type: 'metric-meter',
            x: 820,
            y: 650,
            scale: 1.0,
            properties: { label: 'PAIN SENSATION', level: 0.05, color: '#EF4444', type: 'vertical' },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
      {
        id: 'scene_2',
        title: 'THE SURGE',
        visualSummary: 'Adrenaline and endorphins surging through the system',
        startTime: targetDuration * 0.33,
        duration: targetDuration * 0.34,
        actors: [
          {
            id: 'actor_soldier',
            name: 'Soldier',
            x: 380,
            y: 1100,
            scale: 1.05,
            pose: 'running',
            expression: 'frowning',
            accessory: 'helmet',
            glowHeart: true,
            particles: 'lightning',
          },
        ],
        metaphors: [
          {
            id: 'meta_adren',
            type: 'metric-meter',
            x: 750,
            y: 680,
            scale: 1.1,
            properties: { label: 'ADRENALINE SHIELD', level: 0.98, color: '#FACC15', type: 'vertical' },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
      {
        id: 'scene_3',
        title: 'SURVIVAL FIRST',
        visualSummary: 'Evolutionary survival blueprint dominating biological response',
        startTime: targetDuration * 0.67,
        duration: targetDuration * 0.33,
        actors: [
          {
            id: 'actor_soldier',
            name: 'Soldier',
            x: 400,
            y: 1100,
            scale: 1.0,
            pose: 'hands-on-hips',
            expression: 'neutral',
            accessory: 'helmet',
          },
        ],
        metaphors: [
          {
            id: 'meta_dna',
            type: 'dna-helix',
            x: 720,
            y: 750,
            scale: 1.2,
            properties: { speed: 1.2, label: 'SURVIVAL IMPERATIVE' },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
    ];
  } else if (p.includes('lonel') || p.includes('isolat') || p.includes('modern generation') || (p.includes('social media') && p.includes('app'))) {
    title = 'The Loneliness Paradox';
    script =
      'We have thousands of digital friends, yet we are the loneliest generation in human history. Social media replaced vulnerability with broadcasting. When everyone applauds your avatar... your real self remains completely unseen.';
    voiceRecommendation = 'Andrew / Christopher — Deep philosophical cadence, reflective, 120 wpm';
    scenes = [
      {
        id: 'scene_1',
        title: 'THE ILLUSION OF CONNECTION',
        visualSummary: 'Stick figure staring at phone with floating hearts while feeling completely isolated',
        startTime: 0.0,
        duration: targetDuration * 0.33,
        actors: [
          {
            id: 'actor_hero',
            name: 'Digital Native',
            x: 540,
            y: 1100,
            scale: 1.05,
            pose: 'holding-item',
            holdingItem: 'phone',
            expression: 'neutral',
            accessory: 'glasses',
            particles: 'hearts',
            enter: { type: 'draw-in', duration: 0.5 },
          },
        ],
        metaphors: [
          {
            id: 'meta_panels',
            type: 'framed-panels',
            x: 540,
            y: 450,
            scale: 1.0,
            properties: {
              topText: '10,000 DIGITAL FOLLOWERS',
              bottomText: 'ZERO AUTHENTIC CONNECTIONS',
            },
          },
          {
            id: 'meta_meter',
            type: 'metric-meter',
            x: 540,
            y: 720,
            scale: 0.95,
            properties: {
              label: 'REAL INTIMACY LEVEL',
              level: 0.08,
              color: '#EF4444',
              type: 'horizontal',
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
      {
        id: 'scene_2',
        title: 'BROADCASTING VS VULNERABILITY',
        visualSummary: 'Tilted scale comparing digital validation against real vulnerability with drained emotional battery',
        startTime: targetDuration * 0.33,
        duration: targetDuration * 0.34,
        actors: [
          {
            id: 'actor_hero',
            name: 'Digital Native',
            x: 320,
            y: 1100,
            scale: 1.0,
            pose: 'folded-arms',
            expression: 'sad',
            accessory: 'mask',
            particles: 'sweat-drops',
          },
        ],
        metaphors: [
          {
            id: 'meta_scale',
            type: 'balance-scale',
            x: 680,
            y: 750,
            scale: 1.15,
            properties: {
              tilt: -22,
              leftLabel: 'BROADCAST LIKES (100%)',
              rightLabel: 'VULNERABILITY (0%)',
            },
          },
          {
            id: 'meta_battery',
            type: 'battery-indicator',
            x: 740,
            y: 1000,
            scale: 1.1,
            properties: {
              chargePercent: 6,
              state: 'empty',
              glowing: true,
              label: 'EMOTIONAL BATTERY',
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
      {
        id: 'scene_3',
        title: 'THE ANTIDOTE: TRUE PRESENCE',
        visualSummary: 'Hero peacefully resting by a warm campfire with glowing heart within protective isolation shield',
        startTime: targetDuration * 0.67,
        duration: targetDuration * 0.33,
        actors: [
          {
            id: 'actor_hero',
            name: 'Digital Native',
            x: 420,
            y: 1100,
            scale: 1.05,
            pose: 'sitting-bench',
            expression: 'peaceful',
            accessory: 'none',
            glowHeart: true,
          },
        ],
        metaphors: [
          {
            id: 'meta_camp',
            type: 'campfire',
            x: 680,
            y: 1100,
            scale: 1.15,
            properties: {
              flameIntensity: 0.9,
              emberCount: 16,
              warmGlow: true,
            },
          },
          {
            id: 'meta_shield',
            type: 'isolation-shield',
            x: 420,
            y: 1020,
            scale: 1.05,
            properties: {
              radius: 175,
              glowColor: '#FACC15',
              label: 'AUTHENTIC PRESENCE',
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
    ];
  } else if (p.includes('dopamine') || p.includes('scroll') || p.includes('phone') || p.includes('social media') || p.includes('focus')) {
    title = 'The Dopamine Exhaustion Loop';
    script =
      'Every endless scroll feeds your mind a cheap burst of dopamine. But rapid overstimulation fries your receptors... leaving you chronically drained. Unplug your attention to allow genuine focus to regrow.';
    voiceRecommendation = 'Adam / Nicole — Fast-paced modern narrator, analytical, 135 wpm';
    scenes = [
      {
        id: 'scene_1',
        title: 'THE INFINITE FEED',
        visualSummary: 'Stick figure mesmerized by smartphone with floating hearts',
        startTime: 0.0,
        duration: targetDuration * 0.33,
        actors: [
          {
            id: 'actor_scroller',
            name: 'Scroller',
            x: 540,
            y: 1100,
            scale: 1.1,
            pose: 'holding-item',
            holdingItem: 'phone',
            expression: 'happy',
            particles: 'hearts',
          },
        ],
        metaphors: [
          {
            id: 'meta_meter',
            type: 'metric-meter',
            x: 540,
            y: 420,
            scale: 1.0,
            properties: { label: 'DOPAMINE SPIKE', level: 0.95, color: '#FB7185', type: 'horizontal' },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
      {
        id: 'scene_2',
        title: 'THE ENERGY CRASH',
        visualSummary: 'Deadpan exhaustion as neural energy depletes to empty',
        startTime: targetDuration * 0.33,
        duration: targetDuration * 0.34,
        actors: [
          {
            id: 'actor_scroller',
            name: 'Scroller',
            x: 420,
            y: 1100,
            scale: 1.05,
            pose: 'folded-arms',
            expression: 'sick',
            particles: 'sweat-drops',
          },
        ],
        metaphors: [
          {
            id: 'meta_batt',
            type: 'battery-indicator',
            x: 740,
            y: 800,
            scale: 1.2,
            properties: { chargePercent: 5, state: 'empty', glowing: true, label: 'NEURAL ENERGY' },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
      {
        id: 'scene_3',
        title: 'ORGANIC RECOVERY',
        visualSummary: 'Plant sprouting on the ground line as natural focus restores',
        startTime: targetDuration * 0.67,
        duration: targetDuration * 0.33,
        actors: [
          {
            id: 'actor_scroller',
            name: 'Scroller',
            x: 380,
            y: 1100,
            scale: 1.0,
            pose: 'peaceful' as any,
            expression: 'peaceful',
            glowHeart: true,
          },
        ],
        metaphors: [
          {
            id: 'meta_plant',
            type: 'plant-growth',
            x: 720,
            y: 1100,
            scale: 1.2,
            properties: { growthStage: 0.9, flowering: true, label: 'RECLAIMED PEACE' },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
    ];
  } else {
    // Universal psychological/philosophical explainer
    const capitalizedPrompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);
    title = `The Truth About: ${capitalizedPrompt.slice(0, 32)}`;
    script = `We often mistake quiet boundaries for disconnection. But protecting your inner peace is not selfish... it's essential. When you establish real balance, clarity naturally returns.`;
    voiceRecommendation = 'Marcus / Adam — Deep philosophical tone, calm, 120 wpm';
    scenes = [
      {
        id: 'scene_1',
        title: 'THE QUESTION',
        visualSummary: 'Stick figure introspecting questions and contrasting perspectives',
        startTime: 0.0,
        duration: targetDuration * 0.33,
        actors: [
          {
            id: 'actor_hero',
            name: 'Hero',
            x: 540,
            y: 1100,
            scale: 1.05,
            pose: 'folded-arms',
            expression: 'neutral',
            particles: 'question-marks',
            enter: { type: 'draw-in', duration: 0.5 },
          },
        ],
        metaphors: [
          {
            id: 'meta_panels',
            type: 'framed-panels',
            x: 540,
            y: 480,
            scale: 1.0,
            properties: { topText: 'SURFACE ASSUMPTION', bottomText: 'UNDERLYING REALITY' },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
      {
        id: 'scene_2',
        title: 'THE REBALANCING',
        visualSummary: 'Pivoting balance scale restoring equilibrium',
        startTime: targetDuration * 0.33,
        duration: targetDuration * 0.34,
        actors: [
          {
            id: 'actor_hero',
            name: 'Hero',
            x: 350,
            y: 1100,
            scale: 1.0,
            pose: 'pointing',
            expression: 'happy',
          },
        ],
        metaphors: [
          {
            id: 'meta_scale',
            type: 'balance-scale',
            x: 680,
            y: 800,
            scale: 1.15,
            properties: { tilt: 0, leftLabel: 'INTERNAL PEACE', rightLabel: 'EXTERNAL DEMANDS' },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
      {
        id: 'scene_3',
        title: 'TRUE PEACE',
        visualSummary: 'Hero resting beside glowing campfire with protective isolation shield',
        startTime: targetDuration * 0.67,
        duration: targetDuration * 0.33,
        actors: [
          {
            id: 'actor_hero',
            name: 'Hero',
            x: 420,
            y: 1100,
            scale: 1.0,
            pose: 'sitting-bench',
            expression: 'peaceful',
            glowHeart: true,
          },
        ],
        metaphors: [
          {
            id: 'meta_camp',
            type: 'campfire',
            x: 680,
            y: 1100,
            scale: 1.1,
            properties: { flameIntensity: 0.85, emberCount: 14, warmGlow: true },
          },
          {
            id: 'meta_shield',
            type: 'isolation-shield',
            x: 420,
            y: 1020,
            scale: 1.0,
            properties: { radius: 175, glowColor: '#FACC15', label: 'PROTECTED CLARITY' },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: 'chalk' },
      },
    ];
  }

  // Generate word-level timestamps for karaoke captions
  const subtitles = generateWordTimestamps(script, targetDuration);

  return {
    meta: {
      title,
      description: `Generated PeerLines animation for: ${prompt}`,
      durationSeconds: targetDuration,
      theme: 'dark-chalk',
      fps: 30,
      width: 1080,
      height: 1920,
      strokeWidth: 3.5,
      lineBoil: true,
    },
    audio: {
      script,
      voiceStyleRecommendation: voiceRecommendation,
      voiceId: 'alloy',
      source: 'mock',
      subtitles,
    },
    scenes,
  };
}
