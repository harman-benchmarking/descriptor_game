import type { ReactNode } from "react";
import { Pause, Play, RotateCcw, SlidersHorizontal, Volume2, Waves } from "lucide-react";
import type { TrackDefinition } from "../../data/tracks";
import { intensityRange, type PlaybackMode } from "../../persistence/saveData";

type Props = {
  audioReady: boolean;
  playing: boolean;
  playbackMode: PlaybackMode;
  selectedTrackId: string;
  tracks: TrackDefinition[];
  intensity: number;
  primaryActionSlot?: ReactNode;
  showIntensityControl?: boolean;
  showClearButton?: boolean;
  onStart: () => void;
  onTogglePlay: () => void;
  onPlaybackMode: (mode: PlaybackMode) => void;
  onTrackChange: (id: string) => void;
  onIntensityChange: (value: number) => void;
  onClear: () => void;
  t: (key: string) => string;
};

export function PlaybackControls({
  audioReady,
  playing,
  playbackMode,
  selectedTrackId,
  tracks,
  intensity,
  primaryActionSlot,
  showIntensityControl = true,
  showClearButton = true,
  onStart,
  onTogglePlay,
  onPlaybackMode,
  onTrackChange,
  onIntensityChange,
  onClear,
  t
}: Props) {
  return (
    <div className="playback-panel">
      {primaryActionSlot ?? (
        <button className="icon-button primary" type="button" onClick={audioReady ? onTogglePlay : onStart} title={audioReady ? t("action.play") : t("action.startAudio")}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          <span>{audioReady ? (playing ? t("action.pause") : t("action.play")) : t("action.startAudio")}</span>
        </button>
      )}

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

      {showIntensityControl ? (
        <label className="range-control">
          <SlidersHorizontal aria-hidden="true" />
          <span>{Math.round(intensity * 100)}%</span>
          <input
            min={intensityRange.min}
            max={intensityRange.max}
            step={intensityRange.step}
            type="range"
            value={intensity}
            onChange={(event) => onIntensityChange(Number(event.target.value))}
          />
        </label>
      ) : null}

      <label className="track-control">
        <span>{t("track.selector")}</span>
        <select value={selectedTrackId} onChange={(event) => onTrackChange(event.target.value)}>
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>
              {t(track.labelKey)}
            </option>
          ))}
        </select>
      </label>

      {showClearButton ? (
        <button className="icon-button" type="button" onClick={onClear} title={t("action.clear")}>
          <RotateCcw aria-hidden="true" />
          <span>{t("action.clear")}</span>
        </button>
      ) : null}
    </div>
  );
}
