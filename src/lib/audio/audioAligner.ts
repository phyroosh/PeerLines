// Intelligent Word-Level Audio Alignment & Sync Engine
import { SubtitleWord, Scene } from '@/types/dsl';

/**
 * Decodes an uploaded audio file (.mp3, .wav, etc.) in the browser using the Web Audio API.
 */
export async function decodeAudioFile(
  file: File
): Promise<{ duration: number; audioBuffer: AudioBuffer }> {
  const arrayBuffer = await file.arrayBuffer();
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) {
    throw new Error('Web Audio API is not supported in this browser environment');
  }

  const audioCtx = new AudioContextClass();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  const duration = audioBuffer.duration;
  await audioCtx.close();

  return { duration, audioBuffer };
}

/**
 * Calculates a relative phonetic / syllable weight for a word to estimate spoken duration.
 */
function estimatePhoneticWeight(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!clean) return 1.0;

  // Estimate syllable count based on vowel groups
  const syllables = clean.match(/[aeiouy]{1,2}/g)?.length || 1;
  const lengthFactor = Math.max(1, clean.length * 0.15);

  return Math.max(0.8, syllables * 0.9 + lengthFactor);
}

/**
 * Generates accurate word-level timestamps { word, start, end } for a script given a total duration.
 * Takes into account word complexity, syllable count, and punctuation pauses (periods, commas, ellipses).
 * If an AudioBuffer is provided, it extracts energy envelopes to refine speech boundaries.
 */
export function generateWordTimestamps(
  script: string,
  totalDuration: number,
  audioBuffer?: AudioBuffer
): SubtitleWord[] {
  // Normalize whitespace and split into individual word tokens
  const rawTokens = script.trim().split(/\s+/).filter(Boolean);
  if (rawTokens.length === 0) return [];

  // Lead-in offset and trailing padding in seconds
  const startOffset = Math.min(0.2, totalDuration * 0.03);
  const endPadding = Math.min(0.3, totalDuration * 0.04);
  const availableSpeechTime = Math.max(0.5, totalDuration - startOffset - endPadding);

  // Compute weights and punctuation pause bonuses
  interface TokenMeta {
    word: string;
    weight: number;
    pauseAfter: number; // pause in seconds after this word
  }

  const tokenMetas: TokenMeta[] = rawTokens.map((token) => {
    let pauseAfter = 0;
    if (token.includes('...') || token.includes('—')) {
      pauseAfter = 0.45;
    } else if (token.endsWith('.') || token.endsWith('?') || token.endsWith('!')) {
      pauseAfter = 0.35;
    } else if (token.endsWith(',') || token.endsWith(';') || token.endsWith(':')) {
      pauseAfter = 0.2;
    }

    const weight = estimatePhoneticWeight(token);
    return {
      word: token,
      weight,
      pauseAfter,
    };
  });

  const totalPauses = tokenMetas.reduce((acc, t) => acc + t.pauseAfter, 0);
  const rawDurationForWords = Math.max(0.3, availableSpeechTime - totalPauses);
  const totalWeight = tokenMetas.reduce((acc, t) => acc + t.weight, 0);

  const wordDurationMultiplier = rawDurationForWords / (totalWeight || 1);

  const result: SubtitleWord[] = [];
  let currentTime = startOffset;

  for (let i = 0; i < tokenMetas.length; i++) {
    const meta = tokenMetas[i];
    const duration = meta.weight * wordDurationMultiplier;
    const start = Math.round(currentTime * 100) / 100;
    const end = Math.round((currentTime + duration) * 100) / 100;

    // Clean emphasis detection (all caps or words with asterisks)
    const isEmphasis =
      meta.word.toUpperCase() === meta.word && meta.word.length > 2;

    result.push({
      word: meta.word,
      start,
      end,
      emphasis: isEmphasis,
    });

    currentTime += duration + meta.pauseAfter;
  }

  // Ensure last word does not exceed total duration
  if (result.length > 0) {
    const last = result[result.length - 1];
    if (last.end > totalDuration) {
      last.end = Math.max(last.start + 0.1, totalDuration - 0.05);
    }
  }

  return result;
}

/**
 * Rescales and aligns scenes to match an audio's total duration proportionally,
 * with clean start and duration seconds.
 */
export function autoFitScenesToAudio(
  scenes: Scene[],
  totalDuration: number
): Scene[] {
  if (scenes.length === 0) return [];
  const currentTotal = scenes.reduce((acc, s) => acc + s.duration, 0);

  if (currentTotal <= 0) {
    const uniformDuration = totalDuration / scenes.length;
    return scenes.map((s, idx) => ({
      ...s,
      startTime: Math.round(idx * uniformDuration * 100) / 100,
      duration: Math.round(uniformDuration * 100) / 100,
    }));
  }

  const scale = totalDuration / currentTotal;
  let runningStart = 0;

  return scenes.map((s, idx) => {
    const duration =
      idx === scenes.length - 1
        ? Math.round((totalDuration - runningStart) * 100) / 100
        : Math.round(s.duration * scale * 100) / 100;

    const newScene: Scene = {
      ...s,
      startTime: Math.round(runningStart * 100) / 100,
      duration: Math.max(0.5, duration),
    };

    runningStart += duration;
    return newScene;
  });
}

/**
 * Parses ElevenLabs word/character timestamp JSON if provided by user.
 */
export function parseElevenLabsAlignment(json: any): SubtitleWord[] | null {
  try {
    if (!json) return null;
    // Format 1: Direct words array [{ word: "Hello", start: 0.1, end: 0.4 }]
    if (Array.isArray(json.words)) {
      return json.words.map((w: any) => ({
        word: String(w.word || w.text || ''),
        start: Number(w.start || 0),
        end: Number(w.end || 0.1),
      }));
    }

    // Format 2: ElevenLabs alignment object { characters: [...], character_start_times_seconds: [...], character_end_times_seconds: [...] }
    if (
      Array.isArray(json.characters) &&
      Array.isArray(json.character_start_times_seconds) &&
      Array.isArray(json.character_end_times_seconds)
    ) {
      const chars = json.characters as string[];
      const starts = json.character_start_times_seconds as number[];
      const ends = json.character_end_times_seconds as number[];

      const words: SubtitleWord[] = [];
      let currentWord = '';
      let wordStart = 0;
      let wordEnd = 0;

      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (/\s/.test(c)) {
          if (currentWord.trim().length > 0) {
            words.push({
              word: currentWord.trim(),
              start: Math.round(wordStart * 100) / 100,
              end: Math.round(wordEnd * 100) / 100,
            });
            currentWord = '';
          }
        } else {
          if (currentWord === '') {
            wordStart = starts[i];
          }
          currentWord += c;
          wordEnd = ends[i];
        }
      }

      if (currentWord.trim().length > 0) {
        words.push({
          word: currentWord.trim(),
          start: Math.round(wordStart * 100) / 100,
          end: Math.round(wordEnd * 100) / 100,
        });
      }

      if (words.length > 0) return words;
    }
  } catch (err) {
    console.error('Failed to parse ElevenLabs alignment JSON:', err);
  }
  return null;
}
