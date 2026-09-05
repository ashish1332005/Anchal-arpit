import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

export default function EnvelopeOpening({ onComplete, guestName, lang }) {
  // Step sequence:
  // 0: Idle closed envelope on table
  // 1: Envelope lifts slightly & flap rotates open 180deg
  // 2: Card physically slides UP out of the pocket slot
  // 3: Card floats up, tilts slightly, centers over screen
  // 4: Card expands into full-screen main invitation deck
  const [step, setStep] = useState(0);

  // Background floating dust particles
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate static random positions for 18 ambient gold sparkles
    const pts = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 20 + Math.random() * 70,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 4,
    }));
    setParticles(pts);
  }, []);

  const handleTapToOpen = () => {
    if (step > 0) return;

    // STEP 1: Lift Envelope & Rotate Flap Open
    setStep(1);

    // Golden & Royal Rose Confetti Sparkle Burst
    const count = 180;
    const defaults = {
      origin: { y: 0.55 },
      colors: ['#D4AF37', '#FCF6BA', '#F3E9D9', '#AA771C', '#E11D48']
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

    // STEP 2: Card slowly slides UP out of the pocket
    setTimeout(() => {
      setStep(2);
    }, 750);

    // STEP 3: Card floats clear of envelope, tilts slightly & moves center
    setTimeout(() => {
      setStep(3);
    }, 2200);

    // STEP 4: Card opens / expands into main invitation deck
    setTimeout(() => {
      setStep(4);
    }, 3200);

    // Trigger parent complete callback to reveal full wedding website
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 3900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#FAF6EE]">
      {/* ======================================================== */}
      {/* 1. LUXURY BACKGROUND SCENE (Cream Paper, Golden Ambient Light) */}
      {/* ======================================================== */}
      <div 
        className="absolute inset-0 bg-[#FAF6EE] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 45%, rgba(255, 253, 248, 1) 0%, rgba(246, 237, 223, 1) 45%, rgba(228, 214, 194, 1) 100%)
          `
        }}
      >
        {/* Very Subtle Luxury Indian Wedding Watermark Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035] bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%3B8B6508' fill-opacity='1'%3E%3Cpath d='M40 0l10 20-10 20-10-20zM0 40l20-10 20 10-20 10zM40 40l10 20-10 20-10-20zM40 40l20-10 20 10-20 10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}
        />

        {/* Ambient Golden Light Spotlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#D4AF37]/15 via-[#FCF6BA]/25 to-transparent blur-3xl" />

        {/* Floating Minimal Gold Sparkle Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FCF6BA] shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ======================================================== */}
      {/* 2. GUEST GREETING BADGE (Top Center) */}
      {/* ======================================================== */}
      {guestName && (
        <div className={`absolute top-6 z-40 text-center transition-all duration-700 ${step >= 3 ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6508]" />
            <p className="font-cormorant italic text-sm text-[#6A1B29] font-bold tracking-wide">
              {lang === 'hi' ? `सादर निमंत्रण: ${guestName}` : `Cordially Invited: ${guestName}`}
            </p>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. 3D STAGE & ENVELOPE CONTAINER */}
      {/* ======================================================== */}
      <div className="relative w-full max-w-[460px] h-[100dvh] flex flex-col items-center justify-center px-4 perspective-1400">
        
        {/* Soft Ambient Table Surface Shadow Underneath Envelope */}
        <div 
          className={`absolute bottom-[16%] left-1/2 -translate-x-1/2 rounded-full bg-[#3D2518]/30 blur-2xl transition-all duration-700 pointer-events-none ${
            step === 0 ? 'w-[75%] h-10 opacity-70' :
            step === 1 ? 'w-[85%] h-12 opacity-90 scale-105' :
            step === 2 ? 'w-[80%] h-10 opacity-60' :
            'w-[60%] h-8 opacity-20'
          }`}
        />

        {/* 3D Envelope Main Box */}
        <div 
          onClick={handleTapToOpen}
          className={`relative w-[330px] sm:w-[380px] h-[460px] sm:h-[520px] preserve-3d cursor-pointer transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1) ${
            step === 0 ? 'hover:scale-[1.02] [transform:rotateX(2deg)_translateZ(0px)]' :
            step === 1 ? '[transform:rotateX(0deg)_translateZ(30px)_scale(1.03)]' :
            step === 2 ? '[transform:rotateX(0deg)_translateZ(20px)_scale(1.01)]' :
            step === 3 ? '[transform:rotateX(0deg)_translateZ(0px)_translateY(40px)_scale(0.96)]' :
            '[transform:rotateX(0deg)_translateZ(-50px)_translateY(120px)_scale(0.9)] opacity-0'
          }`}
        >

          {/* ---------------------------------------------------- */}
          {/* LAYER 1: ENVELOPE INTERIOR BACKING & LINING (z-10) */}
          {/* ---------------------------------------------------- */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-[#F5EFE4] border border-[#D4AF37]/50 z-10">
            {/* Interior Gold Lattice Pattern Asset / Texture */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-90"
              style={{ 
                backgroundImage: "url('/assets/envelope_back_inside.png')",
                backgroundColor: '#FAF5EA'
              }}
            />

            {/* Inner Shadow at top of interior pocket */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#2C1810]/40 via-[#2C1810]/15 to-transparent pointer-events-none z-10" />
          </div>

          {/* ---------------------------------------------------- */}
          {/* LAYER 2: THE INVITATION CARD (z-20 inside pocket -> z-50 when extracted!) */}
          {/* ---------------------------------------------------- */}
          <div 
            className={`absolute left-[4%] right-[4%] top-[3%] bottom-[3%] rounded-xl shadow-2xl transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) bg-[#FAF7F2] border-2 border-[#D4AF37] overflow-hidden flex flex-col justify-between ${
              step === 0 ? 'z-20 translate-y-[2%] scale-[0.98]' :
              step === 1 ? 'z-20 translate-y-[1%] scale-[0.99]' :
              step === 2 ? 'z-20 -translate-y-[72%] rotate-[-1deg] scale-[1.01]' :
              step === 3 ? 'z-50 -translate-y-[92%] rotate-[-1.5deg] scale-[1.05] shadow-[0_25px_50px_rgba(60,20,10,0.35)]' :
              'z-50 -translate-y-[110%] scale-[1.12] opacity-0 shadow-[0_30px_60px_rgba(60,20,10,0.4)]'
            }`}
            style={{
              backgroundImage: "url('/assets/welcomeslider.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Card Content Layout */}
            <div className="h-full flex flex-col justify-between p-5 text-center bg-[#FAF7F2]/80 backdrop-blur-[2px]">
              
              {/* Top Icons Header */}
              <div className="pt-2 flex items-center justify-center gap-6">
                <div className="flex flex-col items-center">
                  <img src="/assets/ganesh.png" alt="Lord Ganesha" className="w-8 h-8 object-contain drop-shadow-sm" />
                  <span className="font-cinzel text-[9px] tracking-wider font-bold mt-1 text-[#6A1B29]">
                    || श्री गणेशाय नमः ||
                  </span>
                </div>
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
                <div className="flex flex-col items-center">
                  <img src="/assets/mahaveer.png" alt="Lord Mahavir" className="w-8 h-8 object-contain drop-shadow-sm" />
                  <span className="font-cinzel text-[9px] tracking-wider font-bold mt-1 text-[#6A1B29]">
                    || श्री महावीराय नमः ||
                  </span>
                </div>
              </div>

              {/* Invitation Host & Wedding Details */}
              <div className="space-y-1.5 my-auto">
                <p className="font-cormorant italic text-xs text-[#2C1518] font-bold">
                  With the gracious blessings of Almighty
                </p>

                <h3 className="font-cormorant font-bold text-lg sm:text-xl text-[#6A1B29]">
                  Smt. Padma & Sh. Sanjay Babel
                </h3>

                <p className="font-cormorant text-[11px] font-bold text-[#2C1518] max-w-xs mx-auto leading-tight">
                  solicit your gracious presence & blessings on the auspicious wedding ceremony of their son
                </p>

                {/* Groom & Bride Names */}
                <div className="pt-1">
                  <h2 className="font-allura text-4xl sm:text-5xl text-[#6A1B29] font-bold drop-shadow-sm">
                    Shreyansh <span className="font-cormorant text-xs text-[#2C1518] font-bold">(Riyansh)</span>
                  </h2>
                  <p className="font-allura text-base text-[#D4AF37] font-bold my-0.5">weds</p>
                  <h2 className="font-allura text-4xl sm:text-5xl text-[#6A1B29] font-bold drop-shadow-sm">
                    Aditi <span className="font-cormorant text-xs text-[#2C1518] font-bold">(Megha)</span>
                  </h2>
                </div>
              </div>

              {/* Bottom Venue Footer */}
              <div className="pb-1 border-t border-[#D4AF37]/40 pt-2">
                <p className="font-cinzel text-[10px] tracking-widest text-[#8B6508] font-bold uppercase">
                  Save The Date • 21 & 22 July 2026
                </p>
                <h4 className="font-cormorant font-bold text-sm text-[#6A1B29]">
                  The Aaureum Resort, Bhilwara
                </h4>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* LAYER 3: ENVELOPE FRONT POCKET CUTOUT (z-30) */}
          {/* ---------------------------------------------------- */}
          {/* Covers lower ~78% of envelope height, hiding the lower portion of card as it slides up! */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[78%] rounded-b-2xl z-30 overflow-hidden shadow-[0_-4px_16px_rgba(40,20,10,0.15)] border-t border-[#D4AF37]/60"
            style={{
              backgroundImage: "url('/assets/envelope_front_pocket.png')",
              backgroundColor: '#FAF5EA',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Top Pocket Slit Inner Shadow */}
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]" />
          </div>

          {/* ---------------------------------------------------- */}
          {/* LAYER 4: ENVELOPE TOP FLAP (z-40 closed -> z-5 open) */}
          {/* ---------------------------------------------------- */}
          <div 
            className={`absolute top-0 left-0 right-0 h-[46%] origin-top transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) preserve-3d ${
              step >= 1 ? '[transform:rotateX(180deg)] z-0' : '[transform:rotateX(0deg)] z-40'
            }`}
          >
            {/* Front Side of Flap (Cream Paper, Gold Filigree Border) */}
            <div 
              className="absolute inset-0 backface-hidden flex flex-col items-center justify-end pb-4"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(135deg, #FAF6EE 0%, #F4ECE0 100%)',
                boxShadow: '0 8px 24px rgba(45,20,10,0.25)'
              }}
            >
              {/* Outer Flap Gold Line Border */}
              <div 
                className="absolute inset-0 border-b-2 border-[#D4AF37]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} 
              />
            </div>

            {/* Back Side of Flap (Visible when rotated 180deg up) */}
            <div 
              className="absolute inset-0 backface-hidden [transform:rotateX(180deg)] border-t border-[#D4AF37]/60"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                backgroundImage: "url('/assets/envelope_back_inside.png')",
                backgroundColor: '#FAF5EA',
                backgroundSize: 'cover'
              }}
            />
          </div>

          {/* ---------------------------------------------------- */}
          {/* LAYER 5: MONOGRAM GOLD WAX SEAL & TAP PROMPT (z-50) */}
          {/* ---------------------------------------------------- */}
          <div 
            className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center flex flex-col items-center pointer-events-auto transition-all duration-500 ${
              step >= 1 ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
            }`}
          >
            {/* Wax Seal Container */}
            <div className="relative group cursor-pointer active:scale-95 transition-transform duration-300">
              {/* Outer Golden Aura Pulse Ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF566] to-[#AA771C] opacity-75 blur-md animate-pulse-subtle" />

              {/* 3D Wax Seal Image / Stamp */}
              <img 
                src="/assets/wax_seal_monogram.png" 
                alt="S & A Monogram Gold Wax Seal" 
                className="relative w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_10px_20px_rgba(60,20,10,0.35)] transition-transform duration-300 group-hover:scale-105" 
              />

              {/* Center Sparkle Accent */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Sparkles className="w-5 h-5 text-white/90 animate-spin" style={{ animationDuration: '9s' }} />
              </div>
            </div>

            {/* High-Contrast Luxury Royal "Tap to Open" Button */}
            <div className="mt-5 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#5A121E] via-[#800020] to-[#5A121E] border-2 border-[#D4AF37] shadow-[0_6px_20px_rgba(90,18,30,0.45)] hover:scale-105 transition-transform duration-300">
                <Heart className="w-4 h-4 fill-[#F7D070] text-[#F7D070] animate-pulse" />
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#F7D070] font-extrabold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {lang === 'hi' ? 'खोलने के लिए टैप करें' : 'TAP TO OPEN'}
                </span>
                <Heart className="w-4 h-4 fill-[#F7D070] text-[#F7D070] animate-pulse" />
              </div>
            </div>
          </div>

        </div>

        {/* Audio / Atmosphere Prompt Note */}
        <div className={`mt-6 text-center transition-opacity duration-500 ${step >= 3 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-md">
            <p className="font-cormorant text-xs sm:text-sm italic text-[#5A121E] font-bold">
              {lang === 'hi' ? 'शाही अनुभव के लिए ध्वनि चालू रखें' : 'Turn sound on for a royal experience'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

