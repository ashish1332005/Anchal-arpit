import React, { useEffect, useState } from 'react';

export default function EnvelopeOpening({ onComplete }) {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!isOpening) return undefined;
    const timeout = window.setTimeout(() => onComplete?.(), 850);
    return () => window.clearTimeout(timeout);
  }, [isOpening, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_#fffdf8_0%,_#f7f0e4_60%,_#eadcc8_100%)] px-5 text-center">
      <div className="relative z-10 flex w-full flex-col items-center gap-5">
        <button
          type="button"
          onClick={() => setIsOpening(true)}
          disabled={isOpening}
          aria-label="Tap the green floral envelope to open the wedding invitation"
          className="group flex flex-col items-center gap-4 rounded-2xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#D4AF37] disabled:cursor-default"
        >
          <img
            src="/assets/green-envelope-pocket.png"
            alt="Sage green floral wedding envelope with a wax seal"
            className={`max-h-[68dvh] w-[min(78vw,440px)] object-contain drop-shadow-xl transition duration-700 ease-in-out ${isOpening ? 'scale-125 opacity-0' : 'scale-100 opacity-100 group-hover:scale-[1.03]'}`}
          />
          <span className={`rounded-full border border-[#D4AF37]/70 bg-[#FFFCF5]/85 px-6 py-2 font-cinzel text-xs font-bold tracking-[0.2em] text-[#5A121E] shadow-md transition-opacity duration-300 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
            TAP TO OPEN
          </span>
        </button>
      </div>
    </div>
  );
}
