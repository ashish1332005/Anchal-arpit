import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

export default function Envelope({ onOpen, lang, dict }) {
  const [guestName, setGuestName] = useState('');
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Parse URL query parameter e.g., ?guest=Sharma+Family
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest') || params.get('to') || params.get('name');
    if (guestParam) {
      setGuestName(guestParam.replace(/\+/g, ' '));
    }
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Trigger golden sparkle confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FCF6BA', '#AA771C', '#E11D48', '#FAF7F2']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A0E13]/95 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl text-center">
        {/* Religious Invocations Header */}
        <div className="flex items-center justify-center gap-6 mb-6 animate-pulse-subtle">
          <div className="flex flex-col items-center">
            <img src="/assets/ganesh.png" alt="Lord Ganesha" className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <span className="font-cinzel text-[10px] tracking-widest text-[#D4AF37] mt-1 font-semibold">|| श्री गणेशाय नमः ||</span>
          </div>
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-60" />
          <div className="flex flex-col items-center">
            <img src="/assets/mahaveer.png" alt="Lord Mahavir" className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <span className="font-cinzel text-[10px] tracking-widest text-[#D4AF37] mt-1 font-semibold">|| श्री महावीराय नमः ||</span>
          </div>
        </div>

        {/* Dynamic Guest Greeting Banner */}
        {guestName && (
          <div className="mb-4 inline-block px-6 py-2 rounded-full glass-royal border border-[#D4AF37]/40 royal-card-shadow animate-bounce">
            <p className="font-cormorant italic text-lg sm:text-xl text-[#6A1B29]">
              {lang === 'hi' ? `सादर निमंत्रण: ${guestName}` : `Cordially Invited: ${guestName}`}
            </p>
          </div>
        )}

        {/* 3D Envelope Card Container */}
        <div
          onClick={handleOpen}
          className={`group relative cursor-pointer mx-auto w-full aspect-[4/3] max-w-md bg-gradient-to-br from-[#FAF7F2] via-[#F4ECE1] to-[#E8DCB8] rounded-2xl p-6 royal-card-shadow border-2 border-[#D4AF37]/60 transition-all duration-700 transform hover:scale-[1.02] ${
            isOpening ? 'scale-110 opacity-0 rotate-12 -translate-y-20' : ''
          }`}
        >
          {/* Royal Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

          {/* Envelope Body Layout */}
          <div className="h-full flex flex-col justify-between items-center py-4 px-2 border border-[#D4AF37]/30 rounded-xl bg-[#FAF7F2]/60 backdrop-blur-sm">
            <div>
              <p className="font-cinzel tracking-widest text-xs uppercase text-[#6A1B29] font-bold">
                {dict.invitationHeader}
              </p>
              <h1 className="font-allura text-4xl sm:text-5xl text-gold-gradient my-2">
                Shreyansh & Aditi
              </h1>
              <p className="font-cinzel text-xs tracking-wider text-[#6A1B29]/80">
                {dict.saveTheDate} • 21 & 22 July 2026
              </p>
            </div>

            {/* Gold Wax Seal Stamp Badge */}
            <div className="relative my-2 group-hover:scale-110 transition-transform duration-300">
              <img
                src="/assets/gold-wax-seal.png"
                alt="Gold Wax Seal"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_10px_20px_rgba(106,27,41,0.3)] animate-pulse-subtle"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white opacity-90 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            {/* Tap to Reveal Prompt */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5A121E] via-[#800020] to-[#5A121E] border-2 border-[#D4AF37] shadow-[0_4px_15px_rgba(90,18,30,0.4)] text-[#F7D070] font-cinzel text-xs uppercase tracking-widest font-extrabold hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 fill-[#F7D070] text-[#F7D070] animate-pulse" />
              <span>{dict.tapToOpen}</span>
              <Heart className="w-4 h-4 fill-[#F7D070] text-[#F7D070] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Helper Note */}
        <p className="mt-4 font-cormorant text-sm italic text-[#FAF7F2]/80">
          {lang === 'hi' ? 'मंत्रमुग्ध कर देने वाले अनुभव के लिए साउंड ऑन रखें' : 'Turn sound on for an enchanting royal experience'}
        </p>
      </div>
    </div>
  );
}
