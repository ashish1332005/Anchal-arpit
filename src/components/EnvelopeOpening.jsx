import React, { useEffect, useRef, useState } from 'react';
const FLOWER_COUNT = 56;
const seededRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

export default function EnvelopeOpening({ onComplete, guestName }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlooming, setIsBlooming] = useState(false);
  const [playError, setPlayError] = useState(false);

  useEffect(() => {
    if (!isBlooming) return undefined;
    const timeout = window.setTimeout(() => onComplete?.(), 1050);
    return () => window.clearTimeout(timeout);
  }, [isBlooming, onComplete]);

  const playInvitation = async () => {
    if (isPlaying || isBlooming || !videoRef.current) return;
    setPlayError(false);
    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      setPlayError(true);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsBlooming(true);
  };

  return (
    <div className="fixed inset-0 z-50 min-h-[100dvh] overflow-hidden bg-black text-center">
      <video
        ref={videoRef}
        src="/assets/WhatsApp%20Video%202026-10-10%20at%207.57.32%20PM.mp4"
        playsInline
        preload="metadata"
        onEnded={handleVideoEnded}
        onError={() => setPlayError(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {isPlaying && !isBlooming && (
      <header className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-4 pt-[max(4vh,20px)] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        <img
          src="/assets/couple_logo.png"
          alt="Arpit and Anchal"
          className="h-14 w-14 object-contain drop-shadow-lg sm:h-16 sm:w-16"
        />
        <h1 className="mt-1 font-cinzel text-lg font-bold tracking-[0.2em] sm:text-xl">ARPIT &amp; ANCHAL</h1>
        {guestName && (
          <p className="mt-2 font-cormorant text-sm font-semibold">
            Cordially invited: {guestName}
          </p>
        )}
      </header>
      )}

      <main className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5">
        {!isPlaying && !isBlooming && (
          <button
            type="button"
            onClick={playInvitation}
            className="rounded-full p-8 font-cinzel text-sm font-bold tracking-[0.24em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#D4AF37]"
            aria-label="Tap to open and play the wedding invitation"
          >
            TAP TO OPEN
          </button>
        )}
        {playError && (
          <button
            type="button"
            onClick={playInvitation}
            className="absolute bottom-10 rounded-full bg-[#5A121E]/90 px-4 py-2 font-cormorant text-sm font-bold text-white shadow-lg"
          >
            Tap to play the invitation
          </button>
        )}
      </main>

      {isBlooming && (
        <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden bg-[#FAF7F2]" aria-hidden="true">
          {Array.from({ length: FLOWER_COUNT }, (_, index) => (
            <img
              key={index}
              src="/assets/Isolated%20Cream%20Daisy%20Flower.png"
              alt=""
              className="absolute left-1/2 top-1/2 animate-flower-burst object-contain"
              style={{
                width: `clamp(96px, ${11 + seededRandom(index + 1) * 9}vw, 190px)`,
                '--flower-x': `${(seededRandom(index + 100) * 100) - 50}vw`,
                '--flower-y': `${(seededRandom(index + 200) * 100) - 50}vh`,
                '--flower-rotation': `${(seededRandom(index + 300) * 360) - 180}deg`,
                animationDelay: `${Math.floor(seededRandom(index + 400) * 120)}ms`,
                animationDuration: `${500 + (index % 5) * 40}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
