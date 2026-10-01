import { useRef, useState } from "react";
import { VideoControls } from "tensile";

export function VideoControlsDemo() {
  const video = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState("");
  async function changePlaying(next: boolean) {
    if (!next) {
      video.current!.pause();
      return;
    }
    try {
      await video.current!.play();
      setError("");
    } catch {
      setError("Playback could not start. Try again.");
    }
  }

  return (
    <div className="grid w-full max-w-xl gap-3">
      <video
        ref={video}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        preload="metadata"
        playsInline
        aria-label="Flowers moving in the wind"
        className="aspect-video w-full rounded-card bg-ink"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onVolumeChange={(event) => setVolume(event.currentTarget.volume)}
        onError={() => setError("The sample video could not be loaded.")}
      />
      {duration > 0 && (
        <VideoControls
          duration={duration}
          playing={playing}
          onPlayingChange={changePlaying}
          currentTime={currentTime}
          onCurrentTimeChange={(time) => {
            video.current!.currentTime = time;
            setCurrentTime(time);
          }}
          volume={volume}
          onVolumeChange={(value) => {
            video.current!.volume = value;
          }}
        />
      )}
      <p role="status" className="text-label text-muted">
        {error}
      </p>
    </div>
  );
}
