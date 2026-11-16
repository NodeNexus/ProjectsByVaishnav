import { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentSrc) return;

    let destroyed = false;

    // Direct DOM property enforcement for autoplay policy
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');

    const safePlay = () => {
      if (destroyed || !video) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!destroyed) setIsLoaded(true);
          })
          .catch((err) => {
            console.warn('Autoplay prevented or waiting for interaction:', err);
            if (!destroyed) setIsLoaded(true);
          });
      }
    };

    const handleCanPlay = () => {
      if (!destroyed) setIsLoaded(true);
      safePlay();
    };

    const handleLoadedData = () => {
      if (!destroyed) setIsLoaded(true);
      safePlay();
    };

    const handleError = () => {
      console.warn(`Video error loading: ${currentSrc}`);
      if (sourceIndex < sources.length - 1) {
        setSourceIndex(prev => prev + 1);
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('playing', () => {
      if (!destroyed) setIsLoaded(true);
    });
    video.addEventListener('error', handleError);

    // If video is already ready
    if (video.readyState >= 2) {
      setIsLoaded(true);
      safePlay();
    }

    // Clean up previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (currentSrc.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: false,
          lowLatencyMode: false,
        });
        hls.loadSource(currentSrc);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          safePlay();
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal || data.details === 'manifestLoadError') {
            console.warn('HLS stream error:', data.type, data.details);
            hls.destroy();
            hlsRef.current = null;
            if (sourceIndex < sources.length - 1) {
              setSourceIndex(prev => prev + 1);
            }
          }
        });

        hlsRef.current = hls;
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = currentSrc;
        video.load();
        safePlay();
      } else {
        video.src = currentSrc;
        video.load();
        safePlay();
      }
    } else {
      video.src = currentSrc;
      video.load();
      safePlay();
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        safePlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      destroyed = true;
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentSrc, sourceIndex, sources.length]);

  const targetOpacity = style?.opacity !== undefined ? style.opacity : undefined;

  return (
    <video
      ref={videoRef}
      className={className}
      style={{
        ...style,
        opacity: isLoaded ? targetOpacity : 0,
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
