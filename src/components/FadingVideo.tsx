import { useEffect, useRef, useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import Hls from 'hls.js';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: CSSProperties;
}

export function FadingVideo({ src, className = '', style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sources = Array.isArray(src) ? src : [src];
  const [sourceIndex, setSourceIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const hlsRef = useRef<Hls | null>(null);

  const currentSrc = sources[sourceIndex] || sources[0];

  const handleNextSource = useCallback(() => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex(prev => prev + 1);
    }
  }, [sourceIndex, sources.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentSrc) return;

    // React's JSX muted prop doesn't always set the underlying DOM property.
    // Setting muted directly on the DOM node is required for autoplay in Chrome, Safari, etc.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');

    let destroyed = false;

    const playVideo = () => {
      if (destroyed || !video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!destroyed) setIsLoaded(true);
          })
          .catch((err) => {
            console.warn('Video play interrupted or waiting for user interaction:', err);
            if (!destroyed && video.readyState >= 2) {
              setIsLoaded(true);
            }
          });
      }
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      playVideo();
    };

    const handleError = () => {
      console.warn(`Video failed to load from: ${currentSrc}`);
      handleNextSource();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', () => {
      if (!destroyed) setIsLoaded(true);
    });
    video.addEventListener('error', handleError);

    // If video is already ready (e.g. cached or fast load)
    if (video.readyState >= 2) {
      setIsLoaded(true);
      playVideo();
    }

    // HLS Support
    if (currentSrc.endsWith('.m3u8') && Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      const hls = new Hls({
        enableWorker: false,
        lowLatencyMode: false,
      });

      hls.loadSource(currentSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        playVideo();
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          console.warn('Fatal HLS error, attempting fallback source:', data.type);
          hls.destroy();
          hlsRef.current = null;
          handleNextSource();
        }
      });

      hlsRef.current = hls;
    } else {
      video.src = currentSrc;
      video.load();
      playVideo();
    }

    // Resume playing if tab was hidden and becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      destroyed = true;
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentSrc, handleNextSource]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={{
        ...style,
        opacity: isLoaded ? undefined : 0,
        transition: 'opacity 0.6s ease-in-out',
      }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
