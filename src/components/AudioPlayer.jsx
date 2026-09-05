import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ autoPlayTrigger, lang, dict }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay blocked by browser policy:', err));
    }
  }, [autoPlayTrigger]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Error playing audio:', err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/assets/wedding-song.mp3" loop />
      <button
        onClick={toggleAudio}
        title={isPlaying ? dict.musicPause : dict.musicPlay}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full glass-royal border border-[#D4AF37]/50 royal-card-shadow hover:scale-105 transition-all duration-300 active:scale-95 text-[#6A1B29]"
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-1 h-5 w-5">
              <span className="w-1 bg-[#6A1B29] rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-1 bg-[#D4AF37] rounded-full animate-[bounce_1s_infinite_300ms] h-3/4" />
              <span className="w-1 bg-[#6A1B29] rounded-full animate-[bounce_1s_infinite_200ms] h-1/2" />
            </div>
          ) : (
            <Music className="w-5 h-5 text-[#6A1B29]" />
          )}
        </div>

        <span className="font-cinzel text-xs tracking-wider uppercase font-semibold text-[#6A1B29] hidden sm:inline">
          {isPlaying ? (lang === 'hi' ? 'संगीत ऑन' : 'Music On') : (lang === 'hi' ? 'संगीत प्ले' : 'Play Music')}
        </span>

        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#D4AF37]" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </div>
  );
}
