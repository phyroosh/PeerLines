// Preset Projects for PeerLines Playground
import { PeerLinesProject } from '@/types/dsl';
import { generateWordTimestamps } from '@/lib/audio/audioAligner';

const SCRIPT_1 =
  "Ever notice how some people quietly distance themselves? It isn't coldness or arrogance... their social battery simply reached zero. When solitude is chosen, it isn't loneliness... it's peace.";

const SCRIPT_2 =
  "In extreme danger, why don't injured soldiers feel pain immediately? The brain floods the nervous system with massive adrenaline, completely gating pain receptors. Survival comes first... pain can wait.";

const SCRIPT_3 =
  "Every time you scroll, your brain receives a micro-burst of dopamine. But endless stimulation desensitizes your receptors, leaving you chronically exhausted. Disconnect to let your mind heal and grow.";

const SCRIPT_4 =
  "People only celebrate the 10 percent above the surface: the awards, the applause, the breakthrough. But underneath lies the massive unseen iceberg: thousands of hours of quiet discipline and failure.";

const SCRIPT_5 =
  "When you are the only one holding the connection together, the scale collapses. True relationships require equal investment. Sometimes cutting a toxic tie is the only way to save your own peace.";

export const SCRIPT_LONELINESS =
  "We have thousands of digital friends, yet we are the loneliest generation in human history. Social media replaced vulnerability with broadcasting. When everyone applauds your avatar... your real self remains completely unseen.";

export const PRESET_PROJECTS: Record<string, PeerLinesProject> = {
  introvert: {
    meta: {
      title: "Why Introverts Distance Themselves",
      description: "A viral micro-explainer on social exhaustion vs emotional peace",
      durationSeconds: 15.0,
      theme: "dark-chalk",
      fps: 30,
      width: 1080,
      height: 1920,
      strokeWidth: 3.5,
      lineBoil: true,
    },
    audio: {
      script: SCRIPT_1,
      voiceStyleRecommendation: "Marcus / Adam - Calm, deep philosophical cadence, 120 wpm",
      voiceId: "alloy",
      source: "mock",
      subtitles: generateWordTimestamps(SCRIPT_1, 15.0),
    },
    scenes: [
      {
        id: "introvert_scene_1",
        title: "The Quiet Step Back",
        visualSummary: "Hero stickman standing thoughtfully as questions float by",
        startTime: 0.0,
        duration: 4.8,
        actors: [
          {
            id: "hero",
            name: "The Introvert",
            x: 540,
            y: 1100,
            scale: 1.05,
            pose: "folded-arms",
            expression: "neutral",
            glowHeart: false,
            particles: "question-marks",
            enter: { type: "draw-in", duration: 0.6 },
          },
        ],
        metaphors: [
          {
            id: "meta_panels",
            type: "framed-panels",
            x: 540,
            y: 480,
            scale: 1.0,
            properties: {
              topText: "COLD & DISTANT?",
              bottomText: "OR JUST PROTECTING ENERGY?",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "introvert_scene_2",
        title: "The Social Battery Drain",
        visualSummary: "Battery drains to 10% red with exhaustion expression",
        startTime: 4.8,
        duration: 5.2,
        actors: [
          {
            id: "hero",
            name: "The Introvert",
            x: 420,
            y: 1100,
            scale: 1.0,
            pose: "hands-on-hips",
            expression: "sad",
            particles: "sweat-drops",
          },
        ],
        metaphors: [
          {
            id: "meta_battery",
            type: "battery-indicator",
            x: 720,
            y: 820,
            scale: 1.2,
            properties: {
              chargePercent: 12,
              state: "empty",
              glowing: true,
              label: "SOCIAL BATTERY",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "introvert_scene_3",
        title: "Peace in Solitude",
        visualSummary: "Hero sitting peacefully beside a warm campfire with glowing heart",
        startTime: 10.0,
        duration: 5.0,
        actors: [
          {
            id: "hero",
            name: "The Introvert",
            x: 420,
            y: 1100,
            scale: 1.0,
            pose: "sitting-bench",
            expression: "peaceful",
            glowHeart: true,
            accessory: "none",
          },
        ],
        metaphors: [
          {
            id: "meta_campfire",
            type: "campfire",
            x: 680,
            y: 1100,
            scale: 1.1,
            properties: {
              flameIntensity: 0.85,
              emberCount: 16,
              warmGlow: true,
            },
          },
          {
            id: "meta_shield",
            type: "isolation-shield",
            x: 420,
            y: 1020,
            scale: 1.0,
            properties: {
              radius: 170,
              glowColor: "#FACC15",
              label: "PEACE",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
    ],
  },

  soldier: {
    meta: {
      title: "Why Soldiers Don't Feel Pain Immediately",
      description: "Biological micro-explainer on stress-induced analgesia and survival reflex",
      durationSeconds: 15.0,
      theme: "dark-chalk",
      fps: 30,
      width: 1080,
      height: 1920,
      strokeWidth: 3.5,
      lineBoil: true,
    },
    audio: {
      script: SCRIPT_2,
      voiceStyleRecommendation: "Rachel / George - Punchy, clinical, high-stakes documentary pacing",
      voiceId: "onyx",
      source: "mock",
      subtitles: generateWordTimestamps(SCRIPT_2, 15.0),
    },
    scenes: [
      {
        id: "soldier_scene_1",
        title: "The Critical Impact",
        visualSummary: "Soldier with combat helmet standing firm under extreme pressure",
        startTime: 0.0,
        duration: 4.5,
        actors: [
          {
            id: "soldier_1",
            name: "Soldier",
            x: 540,
            y: 1100,
            scale: 1.1,
            pose: "pointing",
            expression: "angry",
            accessory: "helmet",
            enter: { type: "draw-in", duration: 0.5 },
          },
        ],
        metaphors: [
          {
            id: "meter_pain",
            type: "metric-meter",
            x: 820,
            y: 650,
            scale: 1.0,
            properties: {
              label: "PAIN SENSATION",
              level: 0.05,
              color: "#EF4444",
              type: "vertical",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "soldier_scene_2",
        title: "The Adrenaline Gate",
        visualSummary: "Adrenaline surging through the biological system",
        startTime: 4.5,
        duration: 5.5,
        actors: [
          {
            id: "soldier_1",
            name: "Soldier",
            x: 380,
            y: 1100,
            scale: 1.05,
            pose: "running",
            expression: "frowning",
            accessory: "helmet",
            glowHeart: true,
            particles: "lightning",
          },
        ],
        metaphors: [
          {
            id: "meter_adrenaline",
            type: "metric-meter",
            x: 750,
            y: 680,
            scale: 1.1,
            properties: {
              label: "ADRENALINE SHIELD",
              level: 0.98,
              color: "#FACC15",
              type: "vertical",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "soldier_scene_3",
        title: "Survival Over Pain",
        visualSummary: "DNA and biological survival mechanism taking absolute priority",
        startTime: 10.0,
        duration: 5.0,
        actors: [
          {
            id: "soldier_1",
            name: "Soldier",
            x: 400,
            y: 1100,
            scale: 1.0,
            pose: "hands-on-hips",
            expression: "neutral",
            accessory: "helmet",
          },
        ],
        metaphors: [
          {
            id: "meta_dna",
            type: "dna-helix",
            x: 720,
            y: 750,
            scale: 1.2,
            properties: {
              speed: 1.2,
              label: "EVOLUTIONARY SURVIVAL",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
    ],
  },

  dopamine: {
    meta: {
      title: "The Dopamine Detox Trap",
      description: "How constant micro-stimulation exhausts your nervous system",
      durationSeconds: 15.0,
      theme: "dark-chalk",
      fps: 30,
      width: 1080,
      height: 1920,
      strokeWidth: 3.5,
      lineBoil: true,
    },
    audio: {
      script: SCRIPT_3,
      voiceStyleRecommendation: "Adam / Nicole - Fast-paced modern narrator, analytical, 135 wpm",
      voiceId: "nova",
      source: "mock",
      subtitles: generateWordTimestamps(SCRIPT_3, 15.0),
    },
    scenes: [
      {
        id: "dopamine_scene_1",
        title: "The Scrolling Trance",
        visualSummary: "Stick figure glued to glowing smartphone with floating hearts",
        startTime: 0.0,
        duration: 5.0,
        actors: [
          {
            id: "scroller",
            name: "Scroller",
            x: 540,
            y: 1100,
            scale: 1.1,
            pose: "holding-item",
            holdingItem: "phone",
            expression: "happy",
            particles: "hearts",
          },
        ],
        metaphors: [
          {
            id: "meter_dopamine",
            type: "metric-meter",
            x: 540,
            y: 420,
            scale: 1.0,
            properties: {
              label: "DOPAMINE SPIKE",
              level: 0.95,
              color: "#FB7185",
              type: "horizontal",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "dopamine_scene_2",
        title: "The Receptor Crash",
        visualSummary: "Empty battery and deadpan stickman after dopamine desensitization",
        startTime: 5.0,
        duration: 5.0,
        actors: [
          {
            id: "scroller",
            name: "Scroller",
            x: 420,
            y: 1100,
            scale: 1.05,
            pose: "folded-arms",
            expression: "sick",
            particles: "sweat-drops",
          },
        ],
        metaphors: [
          {
            id: "crash_battery",
            type: "battery-indicator",
            x: 740,
            y: 800,
            scale: 1.2,
            properties: {
              chargePercent: 4,
              state: "empty",
              glowing: true,
              label: "BRAIN RECEPTORS",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "dopamine_scene_3",
        title: "Organic Healing",
        visualSummary: "Plant sprouting fresh green growth on the chalk ground line",
        startTime: 10.0,
        duration: 5.0,
        actors: [
          {
            id: "scroller",
            name: "Scroller",
            x: 380,
            y: 1100,
            scale: 1.0,
            pose: "waving",
            expression: "peaceful",
            glowHeart: true,
          },
        ],
        metaphors: [
          {
            id: "meta_plant",
            type: "plant-growth",
            x: 720,
            y: 1100,
            scale: 1.2,
            properties: {
              growthStage: 0.9,
              flowering: true,
              label: "RESTORATION",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
    ],
  },

  iceberg: {
    meta: {
      title: "The Iceberg of Success",
      description: "Visualizing the massive unseen sacrifice beneath visible achievements",
      durationSeconds: 15.0,
      theme: "dark-chalk",
      fps: 30,
      width: 1080,
      height: 1920,
      strokeWidth: 3.5,
      lineBoil: true,
    },
    audio: {
      script: SCRIPT_4,
      voiceStyleRecommendation: "Marcus - Deep, contemplative, inspiring",
      voiceId: "alloy",
      source: "mock",
      subtitles: generateWordTimestamps(SCRIPT_4, 15.0),
    },
    scenes: [
      {
        id: "iceberg_scene_1",
        title: "The Visible 10%",
        visualSummary: "Iceberg tip visible above water with stickman cheering",
        startTime: 0.0,
        duration: 5.0,
        actors: [
          {
            id: "achiever",
            name: "Achiever",
            x: 350,
            y: 620,
            scale: 0.85,
            pose: "waving",
            expression: "happy",
          },
        ],
        metaphors: [
          {
            id: "iceberg_widget",
            type: "iceberg",
            x: 540,
            y: 750,
            scale: 1.15,
            properties: {
              tipLabel: "WHAT THEY SEE (10%)",
              underwaterLabel: "THE SACRIFICE (90%)",
              waterLineY: 650,
            },
          },
        ],
        groundLine: { enabled: false, y: 1100, style: "clean" },
      },
      {
        id: "iceberg_scene_2",
        title: "The Underwater Crucible",
        visualSummary: "Checklist of lonely nights, failures, and constant persistence",
        startTime: 5.0,
        duration: 5.0,
        actors: [
          {
            id: "achiever",
            name: "Achiever",
            x: 320,
            y: 1150,
            scale: 0.95,
            pose: "folded-arms",
            expression: "frowning",
          },
        ],
        metaphors: [
          {
            id: "sacrifices_checklist",
            type: "checklist",
            x: 650,
            y: 1050,
            scale: 1.1,
            properties: {
              items: [
                { text: "1,000 Failed Attempts", checked: true },
                { text: "4:00 AM Solitude", checked: true },
                { text: "Self-Doubt Overcome", checked: true },
                { text: "Unwavering Focus", checked: true },
              ],
            },
          },
        ],
        groundLine: { enabled: true, y: 1150, style: "chalk" },
      },
      {
        id: "iceberg_scene_3",
        title: "The Mastery",
        visualSummary: "Stickman standing proudly atop the summit",
        startTime: 10.0,
        duration: 5.0,
        actors: [
          {
            id: "achiever",
            name: "Achiever",
            x: 540,
            y: 1100,
            scale: 1.1,
            pose: "hands-on-hips",
            expression: "smug",
            glowHeart: true,
          },
        ],
        metaphors: [
          {
            id: "mastery_bubble",
            type: "speech-bubble",
            x: 540,
            y: 650,
            scale: 1.1,
            properties: {
              text: "DISCIPLINE IS FREEDOM",
              tailPosition: "bottom-center",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
    ],
  },

  toxic_scale: {
    meta: {
      title: "The Weight of One-Sided Bonds",
      description: "Visualizing unequal balance scales and the courage to sever toxic ties",
      durationSeconds: 15.0,
      theme: "dark-chalk",
      fps: 30,
      width: 1080,
      height: 1920,
      strokeWidth: 3.5,
      lineBoil: true,
    },
    audio: {
      script: SCRIPT_5,
      voiceStyleRecommendation: "George - Firm, empathetic, resonant life advice",
      voiceId: "fable",
      source: "mock",
      subtitles: generateWordTimestamps(SCRIPT_5, 15.0),
    },
    scenes: [
      {
        id: "toxic_scene_1",
        title: "The Imbalanced Scale",
        visualSummary: "Balance scale heavily tilted with all effort placed on one side",
        startTime: 0.0,
        duration: 5.0,
        actors: [
          {
            id: "giver",
            name: "The Giver",
            x: 280,
            y: 1100,
            scale: 1.0,
            pose: "pointing",
            expression: "sad",
          },
        ],
        metaphors: [
          {
            id: "scale_widget",
            type: "balance-scale",
            x: 620,
            y: 800,
            scale: 1.2,
            properties: {
              leftLabel: "YOUR EFFORT (100%)",
              rightLabel: "THEIR EFFORT (0%)",
              tilt: -22,
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "toxic_scene_2",
        title: "Cutting the Cord",
        visualSummary: "Severed connection snapping with scissors",
        startTime: 5.0,
        duration: 5.0,
        actors: [
          {
            id: "personA",
            name: "Person A",
            x: 260,
            y: 1100,
            scale: 1.0,
            pose: "holding-item",
            holdingItem: "scissors",
            expression: "frowning",
          },
          {
            id: "personB",
            name: "Person B",
            x: 820,
            y: 1100,
            scale: 1.0,
            pose: "folded-arms",
            expression: "neutral",
            facing: "left",
          },
        ],
        metaphors: [
          {
            id: "severed_cord",
            type: "severed-connection",
            x: 540,
            y: 950,
            scale: 1.1,
            properties: {
              cutState: "snapping",
              hasScissors: true,
              label: "ATTACHMENT BROKEN",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "toxic_scene_3",
        title: "Protected Peace",
        visualSummary: "Hero surrounded by glowing protective shield, moving forward",
        startTime: 10.0,
        duration: 5.0,
        actors: [
          {
            id: "hero",
            name: "Free Soul",
            x: 540,
            y: 1100,
            scale: 1.05,
            pose: "walking",
            expression: "happy",
            glowHeart: true,
            particles: "hearts",
          },
        ],
        metaphors: [
          {
            id: "protective_shield",
            type: "isolation-shield",
            x: 540,
            y: 1000,
            scale: 1.1,
            properties: {
              radius: 180,
              glowColor: "#10B981",
              label: "SELF RESPECT",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
    ],
  },
  modern_loneliness: {
    meta: {
      title: "The Loneliness Paradox",
      description: "Why the modern generation is lonely despite having the best social media apps",
      durationSeconds: 15.0,
      theme: "dark-chalk",
      fps: 30,
      width: 1080,
      height: 1920,
      strokeWidth: 3.5,
      lineBoil: true,
    },
    audio: {
      script: SCRIPT_LONELINESS,
      voiceStyleRecommendation: "Andrew / Christopher — Deep philosophical cadence, reflective, 120 wpm",
      voiceId: "en-US-AndrewMultilingualNeural",
      audioUrl: "/audio/modern_loneliness.mp3",
      audioDurationSeconds: 14.9,
      source: "elevenlabs-manual",
      subtitles: generateWordTimestamps(SCRIPT_LONELINESS, 15.0),
    },
    scenes: [
      {
        id: "loneliness_scene_1",
        title: "The Illusion of Connection",
        visualSummary: "Stick figure staring at phone with floating hearts while feeling completely isolated",
        startTime: 0.0,
        duration: 5.0,
        actors: [
          {
            id: "hero",
            name: "Digital Native",
            x: 540,
            y: 1100,
            scale: 1.05,
            pose: "holding-item",
            holdingItem: "phone",
            expression: "neutral",
            accessory: "glasses",
            particles: "hearts",
            enter: { type: "draw-in", duration: 0.5 },
          },
        ],
        metaphors: [
          {
            id: "panels_contrast",
            type: "framed-panels",
            x: 540,
            y: 450,
            scale: 1.0,
            properties: {
              topText: "10,000 DIGITAL FOLLOWERS",
              bottomText: "ZERO AUTHENTIC CONNECTIONS",
            },
          },
          {
            id: "meter_intimacy",
            type: "metric-meter",
            x: 540,
            y: 720,
            scale: 0.95,
            properties: {
              label: "REAL INTIMACY LEVEL",
              level: 0.08,
              color: "#EF4444",
              type: "horizontal",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "loneliness_scene_2",
        title: "Broadcasting vs Vulnerability",
        visualSummary: "Tilted scale comparing digital validation against real vulnerability with drained emotional battery",
        startTime: 5.0,
        duration: 5.0,
        actors: [
          {
            id: "hero",
            name: "Digital Native",
            x: 320,
            y: 1100,
            scale: 1.0,
            pose: "folded-arms",
            expression: "sad",
            accessory: "mask",
            particles: "sweat-drops",
          },
        ],
        metaphors: [
          {
            id: "validation_scale",
            type: "balance-scale",
            x: 680,
            y: 750,
            scale: 1.15,
            properties: {
              tilt: -22,
              leftLabel: "BROADCAST LIKES (100%)",
              rightLabel: "VULNERABILITY (0%)",
            },
          },
          {
            id: "emotional_battery",
            type: "battery-indicator",
            x: 740,
            y: 1000,
            scale: 1.1,
            properties: {
              chargePercent: 6,
              state: "empty",
              glowing: true,
              label: "EMOTIONAL BATTERY",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
      {
        id: "loneliness_scene_3",
        title: "The Antidote: True Presence",
        visualSummary: "Hero peacefully resting by a warm campfire with glowing heart within protective isolation shield",
        startTime: 10.0,
        duration: 5.0,
        actors: [
          {
            id: "hero",
            name: "Digital Native",
            x: 420,
            y: 1100,
            scale: 1.05,
            pose: "sitting-bench",
            expression: "peaceful",
            accessory: "none",
            glowHeart: true,
          },
        ],
        metaphors: [
          {
            id: "meta_campfire",
            type: "campfire",
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
            id: "meta_shield",
            type: "isolation-shield",
            x: 420,
            y: 1020,
            scale: 1.05,
            properties: {
              radius: 175,
              glowColor: "#FACC15",
              label: "AUTHENTIC PRESENCE",
            },
          },
        ],
        groundLine: { enabled: true, y: 1100, style: "chalk" },
      },
    ],
  },
};

export const DEFAULT_PROJECT = PRESET_PROJECTS.introvert;
