// Audio & Voiceover Panel: ElevenLabs Teleprompter, Audio Ingestion Dropzone, and Auto-Aligner
'use client';

import React, { useState, useRef } from 'react';
import {
  Copy,
  Check,
  UploadCloud,
  FileAudio,
  Sparkles,
  Play,
  Square,
  Volume2,
  RefreshCw,
  Info,
} from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import {
  decodeAudioFile,
  generateWordTimestamps,
  autoFitScenesToAudio,
  parseElevenLabsAlignment,
} from '@/lib/audio/audioAligner';
import { BrowserTTSEngine } from '@/lib/audio/ttsEngine';

export const AudioVoiceoverPanel: React.FC = () => {
  const {
    project,
    audioFileName,
    audioBuffer,
    updateAudio,
    setAudioBuffer,
    syncAudioDuration,
  } = useStudioStore();

  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ttsCancelRef = useRef<(() => void) | null>(null);

  const script = project.audio?.script || '';
  const recommendation =
    project.audio?.voiceStyleRecommendation ||
    'Marcus / Adam — Deep philosophical tone, calm, 120 wpm';

  // Copy script for ElevenLabs
  const handleCopyScript = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Process dropped or selected audio file
  const processAudioFile = async (file: File) => {
    setErrorMsg(null);
    if (!file.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) {
      setErrorMsg('Please upload a valid audio file (.mp3, .wav, .ogg, .m4a)');
      return;
    }

    try {
      setIsDecoding(true);
      const { duration, audioBuffer } = await decodeAudioFile(file);
      const objectUrl = URL.createObjectURL(file);

      setAudioBuffer(audioBuffer, file.name);

      // Auto-align words and fit scenes
      const totalDuration = Math.round(duration * 10) / 10;
      const newSubtitles = generateWordTimestamps(script, totalDuration, audioBuffer);
      const newScenes = autoFitScenesToAudio(project.scenes, totalDuration);

      updateAudio({
        audioUrl: objectUrl,
        audioDurationSeconds: totalDuration,
        subtitles: newSubtitles,
        source: 'elevenlabs-manual',
      });

      // Update store scene timings & project duration
      syncAudioDuration(totalDuration);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to decode audio file');
    } finally {
      setIsDecoding(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAudioFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processAudioFile(e.target.files[0]);
    }
  };

  // Preview with Browser Web Speech API
  const handleToggleBrowserTTS = () => {
    if (isSpeaking) {
      ttsCancelRef.current?.();
      BrowserTTSEngine.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const { cancel } = BrowserTTSEngine.speakWithWordTracking(
        script,
        () => {},
        () => setIsSpeaking(false)
      );
      ttsCancelRef.current = cancel;
    }
  };

  // Manual Auto-Sync trigger
  const handleManualAutoSync = () => {
    const duration = project.audio?.audioDurationSeconds || project.meta.durationSeconds;
    syncAudioDuration(duration);
  };

  // Apply ElevenLabs Alignment JSON
  const handleApplyJsonAlignment = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const subtitles = parseElevenLabsAlignment(parsed);
      if (subtitles && subtitles.length > 0) {
        updateAudio({ subtitles });
        setShowJsonModal(false);
        setJsonInput('');
      } else {
        setErrorMsg('Could not find word timestamps in JSON.');
      }
    } catch {
      setErrorMsg('Invalid JSON format.');
    }
  };

  return (
    <div className="space-y-5 text-sm">
      {/* Header Badge */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Manual ElevenLabs Voiceover & Audio Ingestion</span>
        </div>
        <p className="text-xs text-chalk-muted">
          Generate or edit your script, copy it directly into ElevenLabs, and drop the resulting .mp3 or .wav file below for automated word-level subtitle alignment.
        </p>
      </div>

      {/* Recommended Voice Style */}
      <div className="bg-chalk-card border border-chalk-border rounded-lg p-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-chalk-muted">
          <span className="font-medium text-chalk-white">Recommended Voice Profile</span>
          <span className="px-2 py-0.5 rounded bg-chalk-bg text-amber-400 border border-amber-500/20 text-[11px]">
            AI Curated
          </span>
        </div>
        <div className="text-xs font-mono text-amber-300 bg-black/40 p-2 rounded border border-chalk-border/50">
          {recommendation}
        </div>
      </div>

      {/* Voiceover Script & Teleprompter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-chalk-white uppercase tracking-wider">
            Script & Teleprompter
          </label>
          <button
            onClick={handleCopyScript}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-all shadow-sm active:scale-95"
            title="Copy entire script formatted for ElevenLabs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy for ElevenLabs'}</span>
          </button>
        </div>

        <textarea
          value={script}
          onChange={(e) => updateAudio({ script: e.target.value })}
          rows={5}
          className="w-full bg-chalk-bg border border-chalk-border rounded-lg p-3 text-chalk-white text-xs leading-relaxed font-sans focus:outline-none focus:border-amber-400 transition-colors resize-none"
          placeholder="Enter the voiceover script here. Use '...' for natural conversational pauses."
        />

        {/* Word count & Estimated duration */}
        <div className="flex items-center justify-between text-[11px] text-chalk-muted px-1">
          <span>{script.trim().split(/\s+/).filter(Boolean).length} words</span>
          <span>
            Est. spoken time: ~{Math.round((script.trim().split(/\s+/).filter(Boolean).length / 2.3))}s (at 130 wpm)
          </span>
        </div>
      </div>

      {/* Audio File Dropzone */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-chalk-white uppercase tracking-wider">
          Audio File Ingestion
        </label>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-amber-400 bg-amber-500/10'
              : audioFileName
              ? 'border-emerald-500/50 bg-emerald-500/5'
              : 'border-chalk-border hover:border-chalk-muted bg-chalk-card/60'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".mp3,.wav,.ogg,.m4a,.aac"
            className="hidden"
          />

          {isDecoding ? (
            <div className="flex flex-col items-center gap-2 text-amber-400 py-2">
              <RefreshCw className="w-7 h-7 animate-spin" />
              <span className="text-xs font-medium">Decoding audio buffer & aligning words...</span>
            </div>
          ) : audioFileName ? (
            <div className="flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FileAudio className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-chalk-white truncate max-w-[200px]">
                    {audioFileName}
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    Duration: {project.audio?.audioDurationSeconds || 0}s • Decoded
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-chalk-muted underline hover:text-chalk-white">
                Replace
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-chalk-muted py-2">
              <UploadCloud className="w-8 h-8 text-amber-400/80" />
              <div className="text-xs font-medium text-chalk-white">
                Drag & Drop ElevenLabs <span className="text-amber-400 font-mono">.mp3</span> or <span className="text-amber-400 font-mono">.wav</span>
              </div>
              <div className="text-[11px] text-chalk-muted">
                or click to browse from your computer
              </div>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded p-2">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Sync Actions & Fallback Preview */}
      <div className="pt-1 space-y-2">
        <button
          onClick={handleManualAutoSync}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-chalk-card hover:bg-chalk-border/70 text-chalk-white text-xs font-semibold border border-chalk-border transition-colors active:scale-98"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
          <span>Auto-Sync Subtitles & Scenes to Audio</span>
        </button>

        {/* Fallback Preview with Browser Web Speech API */}
        <button
          onClick={handleToggleBrowserTTS}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium border transition-colors ${
            isSpeaking
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
              : 'bg-chalk-bg hover:bg-chalk-card text-chalk-muted hover:text-chalk-white border-chalk-border'
          }`}
        >
          {isSpeaking ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop Browser TTS Speech</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Instant Preview with Browser TTS</span>
            </>
          )}
        </button>
      </div>

      {/* Advanced: Optional ElevenLabs Timestamp JSON paste */}
      <div className="pt-2 border-t border-chalk-border/50">
        <button
          onClick={() => setShowJsonModal(!showJsonModal)}
          className="flex items-center gap-1.5 text-[11px] text-chalk-muted hover:text-amber-400 transition-colors"
        >
          <Info className="w-3 h-3" />
          <span>Paste ElevenLabs Timestamp JSON (Optional)</span>
        </button>

        {showJsonModal && (
          <div className="mt-2 space-y-2 p-3 bg-black/50 border border-chalk-border rounded-lg">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste ElevenLabs character or word alignment JSON here..."
              rows={4}
              className="w-full bg-chalk-bg border border-chalk-border rounded p-2 text-[11px] font-mono text-chalk-white focus:outline-none"
            />
            <button
              onClick={handleApplyJsonAlignment}
              className="px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded hover:bg-amber-400"
            >
              Apply Alignment JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
