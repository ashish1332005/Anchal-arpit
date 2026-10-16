import React, { useEffect, useRef, useState } from 'react';
import floralHeart from '../assets/image.png';

const REVEAL_THRESHOLD = 0.35;

export default function ScratchDateReveal({ revealed, onReveal }) {
  const canvasRef = useRef(null);
  const isScratching = useRef(false);
  const [progress, setProgress] = useState(0);
  const [flowers, setFlowers] = useState([]);
  const lastFlowerAt = useRef(0);
  const flowerId = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const bounds = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.round(bounds.width * scale);
    canvas.height = Math.round(bounds.height * scale);
    const context = canvas.getContext('2d');
    context.scale(scale, scale);

    // Royal Gold Foil Gradient Background matching the theme
    const goldGradient = context.createLinearGradient(0, 0, bounds.width, bounds.height);
    goldGradient.addColorStop(0, '#C59B27');
    goldGradient.addColorStop(0.2, '#FBF5B7');
    goldGradient.addColorStop(0.4, '#D4AF37');
    goldGradient.addColorStop(0.7, '#E5C058');
    goldGradient.addColorStop(0.85, '#F7D070');
    goldGradient.addColorStop(1, '#AA771C');
    context.fillStyle = goldGradient;
    context.fillRect(0, 0, bounds.width, bounds.height);

    // Subtle metallic shimmer overlay
    const sheen = context.createLinearGradient(0, 0, bounds.width, 0);
    sheen.addColorStop(0, 'rgba(255,255,255,0.15)');
    sheen.addColorStop(0.5, 'rgba(255,255,255,0.4)');
    sheen.addColorStop(1, 'rgba(255,255,255,0.15)');
    context.fillStyle = sheen;
    context.fillRect(0, 0, bounds.width, bounds.height);

    // Double ornate royal borders
    context.strokeStyle = 'rgba(90, 18, 30, 0.45)';
    context.lineWidth = 1.5;
    context.strokeRect(5, 5, bounds.width - 10, bounds.height - 10);

    context.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    context.lineWidth = 0.8;
    context.strokeRect(8, 8, bounds.width - 16, bounds.height - 16);

    // Royal callout text
    context.fillStyle = '#5A121E';
    context.font = 'bold 11px Cinzel, serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('✦ SCRATCH TO REVEAL ✦', bounds.width / 2, bounds.height / 2);
  }, [revealed]);

  const eraseAt = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const bounds = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');
    const now = Date.now();
    if (now - lastFlowerAt.current > 80) {
      lastFlowerAt.current = now;
      const id = flowerId.current++;
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      setFlowers((current) => [...current.slice(-8), { id, x, y }]);
      window.setTimeout(() => setFlowers((current) => current.filter((flower) => flower.id !== id)), 850);
    }
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc((event.clientX - bounds.left), (event.clientY - bounds.top), 20, 0, Math.PI * 2);
    context.fill();
    context.globalCompositeOperation = 'source-over';

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < pixels.length; i += 4 * 16) {
      if (pixels[i] < 32) cleared += 1;
    }
    const ratio = cleared / (pixels.length / (4 * 16));
    setProgress(ratio);
    if (ratio >= REVEAL_THRESHOLD) onReveal();
  };

  return (
    <div className="relative aspect-[7/8] w-[min(76vw,260px)] max-w-full mx-auto">
      {/* Revealed Inner Card Content */}
      <div className="absolute inset-0 select-none">
        <img src={floralHeart} alt="Gold floral heart frame" className="absolute inset-x-0 bottom-0 h-[88%] w-full object-contain" />
        <p className="font-lucy-said-ok absolute inset-x-0 top-0 text-center text-2xl sm:text-3xl text-[#8B6508]">
          Save the date
        </p>
        {/* Date centered inside the heart cavity */}
        <div className="absolute top-[57%] left-[56%] -translate-x-1/2 -translate-y-1/2 text-center w-[52%]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-[#B78B34] mb-1">
              <span className="w-4 h-px bg-[#B78B34]/60" />
              <span className="text-[9px]">✦</span>
              <span className="w-4 h-px bg-[#B78B34]/60" />
            </div>
            <p className="font-playfair text-[30px] sm:text-[34px] font-bold text-[#7B1124] leading-none">
              11 &amp; 12
            </p>
            <p className="font-cinzel text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#8B6508] uppercase leading-none mt-1.5">
              DECEMBER
            </p>
            <p className="font-cormorant text-sm sm:text-base font-semibold tracking-[0.18em] text-[#5A121E] leading-none mt-1">
              2026
            </p>
            <div className="flex items-center gap-1.5 text-[#B78B34] mt-1.5">
              <span className="w-4 h-px bg-[#B78B34]/60" />
              <span className="text-[9px]">✦</span>
              <span className="w-4 h-px bg-[#B78B34]/60" />
            </div>
          </div>
        </div>
      </div>

      {flowers.map((flower, index) => (
        <span
          key={flower.id}
          aria-hidden="true"
          className={`scratch-flower scratch-flower-${index % 3}`}
          style={{ left: flower.x, top: flower.y }}
        >
          {index % 2 ? '\u273f' : '\u2740'}
        </span>
      ))}

      {!revealed && (
        <canvas
          ref={canvasRef}
          aria-label="Scratch to reveal the wedding date"
          className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
          onPointerDown={(event) => {
            isScratching.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            eraseAt(event);
          }}
          onPointerMove={(event) => isScratching.current && eraseAt(event)}
          onPointerUp={() => { isScratching.current = false; }}
          onPointerCancel={() => { isScratching.current = false; }}
        />
      )}
      {!revealed && progress > 0.04 && (
        <span className="sr-only">{Math.round(progress * 100)}% revealed</span>
      )}
    </div>
  );
}

