// Browser Web Speech API Preview & TTS Fallback Engine
import { SubtitleWord } from '@/types/dsl';

export class BrowserTTSEngine {
  private static synth: SpeechSynthesis | null = null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  private static getSynth(): SpeechSynthesis | null {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis;
    }
    return null;
  }

  /**
   * Speaks the script using the browser's best English voice and captures live word boundaries.
   */
  public static speakWithWordTracking(
    script: string,
    onWord: (index: number, charIndex: number) => void,
    onEnd: () => void,
    rate: number = 0.95
  ): { cancel: () => void } {
    const synth = this.getSynth();
    if (!synth) {
      console.warn('SpeechSynthesis is not available');
      onEnd();
      return { cancel: () => {} };
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = rate;
    utterance.pitch = 0.95;

    // Pick a natural sounding voice if available
    const voices = synth.getVoices();
    const naturalVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel'))
      ) || voices.find((v) => v.lang.startsWith('en'));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    let wordCount = 0;
    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        onWord(wordCount++, e.charIndex);
      }
    };

    utterance.onend = () => {
      onEnd();
    };

    utterance.onerror = (e) => {
      console.error('SpeechSynthesis error:', e);
      onEnd();
    };

    this.currentUtterance = utterance;
    synth.speak(utterance);

    return {
      cancel: () => {
        synth.cancel();
      },
    };
  }

  public static stop(): void {
    const synth = this.getSynth();
    if (synth) {
      synth.cancel();
    }
  }
}
