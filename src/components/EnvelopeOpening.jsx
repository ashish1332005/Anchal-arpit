import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export default function EnvelopeOpening({ onComplete, guestName, lang }) {
  // Step sequence:
  // 0: Idle closed envelope on table
  // 1: Flap rotates UP 180deg (revealing inside of envelope & card top)
  // 2: Card physically slides UP out of the front pocket sleeve slot
  // 3: Card floats up, moves to front (z-50), centers over screen
  // 4: Card expands into full-screen main invitation deck
  const [step, setStep] = useState(0);

  // Background floating dust particles
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate static random positions for ambient gold sparkles
    const pts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 10 + Math.random() * 80,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 4,
    }));
    setParticles(pts);
  }, []);

  const handleTapToOpen = () => {
    if (step > 0) return;

    // STEP 1: Rotate Flap UP 180 degrees
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

    // STEP 2: Card physically slides UP out of the pocket sleeve
    setTimeout(() => {
      setStep(2);
    }, 700);

    // STEP 3: Card floats clear of envelope & centers
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
        {/* Subtle Indian Wedding Watermark Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035] bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%3B8B6508' fill-opacity='1'%3E%3Cpath d='M40 0l10 20-10 20-10-20zM0 40l20-10 20 10-20 10zM40 40l10 20-10 20-10-20zM40 40l20-10 20 10-20 10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}
        />

        {/* Ambient Golden Light Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#D4AF37]/20 via-[#FCF6BA]/30 to-transparent blur-3xl pointer-events-none" />

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
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md border border-[#D4AF37]/70 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6508]" />
            <p className="font-cormorant italic text-sm text-[#6A1B29] font-bold tracking-wide">
              {lang === 'hi' ? `सादर निमंत्रण: ${guestName}` : `Cordially Invited: ${guestName}`}
            </p>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. 3D STAGE & POCKET ENVELOPE CONTAINER */}
      {/* ======================================================== */}
      <div className="relative w-full max-w-[460px] h-[100dvh] flex flex-col items-center justify-center px-4 perspective-1400">
        
        {/* Ambient Shadow Underneath Envelope */}
        <div 
          className={`absolute bottom-[14%] left-1/2 -translate-x-1/2 rounded-full bg-[#3D2518]/30 blur-2xl transition-all duration-700 pointer-events-none ${
            step === 0 ? 'w-[75%] h-10 opacity-70' :
            step === 1 ? 'w-[85%] h-12 opacity-90 scale-105' :
            step === 2 ? 'w-[80%] h-10 opacity-60' :
            'w-[60%] h-8 opacity-20'
          }`}
        />

        {/* 3D Envelope Main Frame */}
        <div 
          onClick={handleTapToOpen}
          className={`relative w-[320px] sm:w-[360px] h-[540px] sm:h-[600px] preserve-3d cursor-pointer transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1) ${
            step === 0 ? 'hover:scale-[1.02] [transform:rotateX(2deg)_translateZ(0px)]' :
            step === 1 ? '[transform:rotateX(0deg)_translateZ(30px)_scale(1.02)]' :
            step === 2 ? '[transform:rotateX(0deg)_translateZ(20px)_scale(1.01)]' :
            step === 3 ? '[transform:rotateX(0deg)_translateZ(0px)_translateY(30px)_scale(0.96)]' :
            '[transform:rotateX(0deg)_translateZ(-40px)_translateY(100px)_scale(0.9)] opacity-0'
          }`}
        >

          {/* ---------------------------------------------------- */}
          {/* LAYER 1: ENVELOPE INTERIOR BACKING (z-10) */}
          {/* ---------------------------------------------------- */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-[#F8F2E6] border border-[#D4AF37]/50 z-10">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-90"
              style={{ 
                backgroundImage: "url('/assets/invitation-main-bg.jpg')",
                backgroundColor: '#FAF5EA'
              }}
            />
            {/* Inner Shadow at top of interior pocket */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#2C1810]/35 via-[#2C1810]/10 to-transparent pointer-events-none z-10" />
          </div>

          {/* ---------------------------------------------------- */}
          {/* LAYER 2: THE INVITATION CARD (z-20 inside pocket -> z-50 extracted) */}
          {/* ---------------------------------------------------- */}
          <div 
            className={`absolute left-[4%] right-[4%] top-[4%] bottom-[4%] rounded-xl shadow-2xl transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) bg-[#FAF7F2] border-2 border-[#D4AF37] overflow-hidden flex flex-col justify-between ${
              step === 0 ? 'z-20 translate-y-[2%] scale-[0.98]' :
              step === 1 ? 'z-20 translate-y-[1%] scale-[0.99]' :
              step === 2 ? 'z-20 -translate-y-[72%] rotate-[-1deg] scale-[1.01]' :
              step === 3 ? 'z-50 -translate-y-[90%] rotate-[-1.5deg] scale-[1.05] shadow-[0_25px_50px_rgba(60,20,10,0.35)]' :
              'z-50 -translate-y-[110%] scale-[1.12] opacity-0 shadow-[0_30px_60px_rgba(60,20,10,0.4)]'
            }`}
            style={{
              backgroundImage: "url('/assets/invitation-main-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Card Content Layout */}
            <div className="h-full flex flex-col justify-between p-5 sm:p-6 text-center bg-[#FAF7F2]/85 backdrop-blur-[1.5px]">
              
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
                  With the divine blessings of Smt. Ratan Devi &amp; Shree Ram Rai Ji Kabra
                </p>

                <h3 className="font-cormorant font-bold text-lg sm:text-xl text-[#6A1B29]">
                  Kabra Family
                </h3>

                <p className="font-cormorant text-[11px] font-bold text-[#2C1518] max-w-xs mx-auto leading-tight">
                  request the pleasure of your gracious presence at the wedding ceremony of their beloved son
                </p>

                {/* Groom & Bride Names with Center A-अ Monogram */}
                <div className="pt-1 flex flex-col items-center">
                  <h2 className="font-allura text-3xl sm:text-4xl text-[#6A1B29] font-bold drop-shadow-sm">
                    Arpit
                  </h2>
                  <img 
                    src="/assets/couple_logo.png" 
                    alt="A-अ Logo" 
                    className="w-9 h-9 object-contain drop-shadow-sm my-0.5" 
                    title="A-अ"
                  />
                  <h2 className="font-allura text-3xl sm:text-4xl text-[#6A1B29] font-bold drop-shadow-sm">
                    Anchal
                  </h2>
                </div>
              </div>

              {/* Bottom Venue Footer */}
              <div className="pb-1 border-t border-[#D4AF37]/50 pt-2">
                <p className="font-cinzel text-[10px] tracking-widest text-[#8B6508] font-bold uppercase">
                  Save The Date • 11 & 12 December 2026
                </p>
                <h4 className="font-cormorant font-bold text-sm text-[#6A1B29]">
                  Gloria Inn, Bhilwara
                </h4>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* LAYER 3: ENVELOPE FRONT POCKET SLEEVE (z-30) */}
          {/* ---------------------------------------------------- */}
          {/* Covers the lower ~58% of the envelope. The card physically sits behind this sleeve and slides out! */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[58%] rounded-b-2xl z-30 overflow-hidden shadow-[0_-6px_22px_rgba(40,20,10,0.18)] border-t border-[#D4AF37]/60"
            style={{
              backgroundColor: '#FAF5EA',
              backgroundImage: 'radial-gradient(circle at 50% 65%, #FFFDF8 0%, #FAF5EA 60%, #EFE3CE 100%)'
            }}
          >
            {/* Subtle Royal Texture Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.035] bg-repeat pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%3B8B6508' fill-opacity='1'%3E%3Cpath d='M40 0l10 20-10 20-10-20zM0 40l20-10 20 10-20 10zM40 40l10 20-10 20-10-20zM40 40l20-10 20 10-20 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px'
              }}
            />

            {/* Top Pocket Slit Inner Shadow */}
            <div className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-black/35 via-black/10 to-transparent pointer-events-none" />

            {/* Inner Gold Foil Borders */}
            <div className="absolute inset-2.5 sm:inset-3 border border-[#D4AF37]/45 rounded-b-xl pointer-events-none" />
            <div className="absolute inset-[13px] sm:inset-[15px] border border-[#D4AF37]/25 rounded-b-lg pointer-events-none" />

            {/* Center Royal A-अ Monogram Crest */}
            <div className="absolute inset-x-0 bottom-12 sm:bottom-14 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
              <div className="p-2 rounded-full bg-[#FAF5EA]/60 backdrop-blur-[1px] border border-[#D4AF37]/30 shadow-inner">
                <img 
                  src="/assets/couple_logo.png" 
                  alt="Anchal & Arpit Monogram" 
                  className="w-24 sm:w-28 max-h-[130px] sm:max-h-[145px] object-contain drop-shadow-[0_4px_12px_rgba(60,30,10,0.2)]" 
                />
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[#8B6508] font-cinzel text-[9px] sm:text-[10px] tracking-[0.25em] font-bold">
                <span className="text-[#D4AF37]">✦</span>
                <span>TAP TO OPEN</span>
                <span className="text-[#D4AF37]">✦</span>
              </div>
            </div>

            {/* Royal Corner Ornaments: Left & Right */}
            <img 
              src="/assets/royal_corner_left.png" 
              alt="Royal Corner Left" 
              className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 object-contain pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]" 
            />
            <img 
              src="/assets/royal_corner_right.png" 
              alt="Royal Corner Right" 
              className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 object-contain pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]" 
            />
          </div>

          {/* ---------------------------------------------------- */}
          {/* LAYER 4: ENVELOPE TOP FLAP (z-40 closed -> z-5 open) */}
          {/* ---------------------------------------------------- */}
          {/* Attached to the top hinge. When clicked, it rotates UP 180 degrees! */}
          <div 
            className={`absolute top-0 left-0 right-0 h-[56%] origin-top transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1) preserve-3d ${
              step >= 1 ? '[transform:rotateX(180deg)] z-0' : '[transform:rotateX(0deg)] z-40'
            }`}
          >
            {/* Front Side of Flap (with Ganesh, Shree Ganeshaya Namah & Gold V-Borders) */}
            <div 
              className="absolute inset-0 backface-hidden overflow-hidden rounded-t-2xl shadow-[0_8px_24px_rgba(45,20,10,0.22)]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 57%, 50% 100%, 0 57%)',
                backgroundColor: '#FAF5EA',
                backgroundImage: 'radial-gradient(circle at 50% 30%, #FFFDF8 0%, #FAF5EA 60%, #EFE3CE 100%)'
              }}
            >
              {/* Subtle Royal Texture Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.035] bg-repeat pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%3B8B6508' fill-opacity='1'%3E%3Cpath d='M40 0l10 20-10 20-10-20zM0 40l20-10 20 10-20 10zM40 40l10 20-10 20-10-20zM40 40l20-10 20 10-20 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '80px 80px'
                }}
              />

              {/* Flap Gold Foil V-Border */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polyline points="0,57 50,100 100,57" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
                <polyline points="0,54 50,97 100,54" fill="none" stroke="#F3E5AB" strokeWidth="1" strokeDasharray="3 2" />
              </svg>

              {/* Top Sacred Invocations: Ganesh Idol & Shree Ganeshaya Namah */}
              <div className="absolute top-0 inset-x-0 pt-3 sm:pt-4 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
                <img 
                  src="/assets/ganesh.png" 
                  alt="Lord Ganesha" 
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_4px_12px_rgba(106,27,41,0.35)] filter contrast-105" 
                />
                <img 
                  src="/assets/shreeganeshaynamh.png" 
                  alt="|| श्री गणेशाय नमः ||" 
                  className="h-10 sm:h-12 w-auto max-w-[250px] sm:max-w-[280px] object-contain mt-1.5 drop-shadow-[0_2px_8px_rgba(180,120,30,0.55)] filter brightness-[0.95] contrast-110" 
                />
              </div>
            </div>

            {/* Back Side of Flap (Visible when rotated 180deg up) */}
            <div 
              className="absolute inset-0 backface-hidden [transform:rotateX(180deg)] border-t border-[#D4AF37]/60"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 100% 57%, 50% 100%, 0 57%)',
                backgroundImage: "url('/assets/royal_inner_card_bg.jpg')",
                backgroundColor: '#FAF5EA',
                backgroundSize: 'cover'
              }}
            />
          </div>

          {/* ---------------------------------------------------- */}
          {/* LAYER 5: 3D ROYAL GOLD WAX SEAL (z-50, only in step 0) */}
          {/* ---------------------------------------------------- */}
          {step === 0 && (
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none flex items-center justify-center">
              {/* Subtle Pulsing Gold Halo */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-r from-[#D4AF37]/50 via-[#FCF6BA]/80 to-[#AA771C]/50 blur-md animate-pulse-subtle" />
              {/* 3D Wax Seal Badge */}
              <img 
                src="/assets/file_00000000f6d081fb83201eadccf568af.png" 
                alt="Royal Wax Seal" 
                className="absolute w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_8px_18px_rgba(40,15,10,0.45)]" 
              />
              {/* Centered A-अ Monogram inside the wax seal */}
              <img
                src="/assets/couple_logo_gold.png"
                alt="A-अ Monogram"
                className="absolute w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
              />
              {/* Twinkling Center Sparkle */}
              
            </div>
          )}

        </div>

        {/* Audio Prompt Note */}
        <div className={`mt-5 text-center transition-opacity duration-500 ${step >= 3 ? 'opacity-0' : 'opacity-100'}`}>
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
