import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    // Text fade in
    tl.to(textRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
      // Ring rotation
      .to(
        ringRef.current,
        {
          rotation: 720,
          duration: 2,
          ease: 'linear',
        },
        '-=0.3'
      )
      // Slide up and disappear
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power2.inOut',
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black dot-pattern flex items-center justify-center"
    >
      <div className="relative">
        {/* Rotating Ring */}
        <div
          ref={ringRef}
          className="absolute inset-0 w-40 h-40 -m-4"
        >
          <div className="w-full h-full rounded-full border-2 border-brand-orange border-t-transparent" />
        </div>

        {/* Logo Text */}
        <div
          ref={textRef}
          className="opacity-0 text-center"
        >
          <h1 className="text-5xl font-black text-white tracking-[0.3em]">
            سلطان استور
          </h1>
          <p className="text-brand-orange text-sm mt-2 tracking-widest font-light">
            أجهزة الكمبيوتر
          </p>
        </div>
      </div>
    </div>
  );
}
