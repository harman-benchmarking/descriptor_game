import { Pause, Play, RotateCcw, SlidersHorizontal, Volume2, Waves } from "lucide-react";
import type { IntensityMode, PlaybackMode } from "../../persistence/saveData";

type Props = {
  audioReady: boolean;
  playing: boolean;
  playbackMode: PlaybackMode;
  intensityMode: IntensityMode;
  intensity: number;
  onStart: () => void;
  onTogglePlay: () => void;
  onPlaybackMode: (mode: PlaybackMode) => void;
  onIntensityMode: (mode: IntensityMode) => void;
  onIntensityChange: (value: number) => void;
  onClear: () => void;
  t: (key: string) => string;
};

export function PlaybackControls({
  audioReady,
  playing,
  playbackMode,
  intensityMode,
  intensity,
  onStart,
  onTogglePlay,
  onPlaybackMode,
  onIntensityMode,
  onIntensityChange,
  onClear,
  t
}: Props) {
  return (
    <div className="playback-strip">
      <button className="icon-button primary" type="button" onClick={audioReady ? onTogglePlay : onStart} title={audioReady ? t("action.play") : t("action.startAudio")}>
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        <span>{audioReady ? (playing ? t("action.pause") : t("action.play")) : t("action.startAudio")}</span>
      </button>

      <div className="segmented" aria-label="Playback mode">
        <button className={playbackMode === "flat" ? "is-selected" : ""} type="button" onClick={() => onPlaybackMode("flat")}>
          <Volume2 aria-hidden="true" />
          <span>{t("action.flat")}</span>
        </button>
        <button className={playbackMode === "processed" ? "is-selected" : ""} type="button" onClick={() => onPlaybackMode("processed")}>
          <Waves aria-hidden="true" />
          <span>{t("action.processed")}</span>
        </button>
      </div>

      <div className="segmented" aria-label="Intensity mode">
        <button className={intensityMode === "practice" ? "is-selected" : ""} type="button" onClick={() => onIntensityMode("practice")}>
          {t("mode.practice")}
        </button>
        <button className={intensityMode === "rating" ? "is-selected" : ""} type="button" onClick={() => onIntensityMode("rating")}>
          {t("mode.rating")}
        </button>
      </div>

      <label className="range-control">
        <SlidersHorizontal aria-hidden="true" />
        <span>{Math.round(intensity * 100)}%</span>
        <input min="0.5" max="2.2" step="0.05" type="range" value={intensity} onChange={(event) => onIntensityChange(Number(event.target.value))} />
      </label>

      <button className="icon-button" type="button" onClick={onClear} title={t("action.clear")}>
        <RotateCcw aria-hidden="true" />
        <span>{t("action.clear")}</span>
      </button>
    </div>
  );
}
