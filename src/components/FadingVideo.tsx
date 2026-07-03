import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Hls from 'hls.js';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: CSSProperties;
}

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSrc = Array.isArray(src) ? src[currentIndex] : src;

  // Track fading state so we don't restart animations unnecessarily
  const isFadingIn = useRef(false);
  const isFadingOut = useRef(false);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Helper for rAF based fade
    const fade = (
      startOp: number,
      endOp: number,
      duration: number,
      onComplete?: () => void
    ) => {
      const startTime = performance.now();
      
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentOp = startOp + (endOp - startOp) * progress;
        
        if (video) {
          video.style.opacity = currentOp.toString();
        }
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          if (onComplete) onComplete();
        }
      };
      
      requestAnimationFrame(step);
    };

    const handleLoadedData = () => {
      if (isFadingIn.current) return;
      isFadingIn.current = true;
      isFadingOut.current = false;
      fade(0, 1, 500);
      video.play().catch(e => console.error("Auto-play prevented", e));
    };

    const handleTimeUpdate = () => {
      if (!video.duration || isFadingOut.current) return;
      const remainingTime = video.duration - video.currentTime;
      if (remainingTime <= 0.55) {
        isFadingOut.current = true;
        isFadingIn.current = false;
        fade(1, 0, 550);
      }
    };

    const handleEnded = () => {
      if (Array.isArray(src)) {
        setCurrentIndex((prev) => (prev + 1) % src.length);
      } else {
        video.currentTime = 0;
        video.play().catch(e => console.error("Auto-play prevented", e));
        isFadingIn.current = false;
        handleLoadedData(); // Trigger fade in again
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Setup HLS or native playback
    if (currentSrc.endsWith('.m3u8') && Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(currentSrc);
      hls.attachMedia(video);
      hlsRef.current = hls;
    } else {
      video.src = currentSrc;
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, currentSrc]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ ...style, opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
