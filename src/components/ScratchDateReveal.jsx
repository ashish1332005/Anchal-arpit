import React, { useEffect, useRef, useState } from 'react';

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
    <div className="relative w-[min(88vw,300px)] h-[184px] max-w-full mx-auto rounded-xl overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5ECE0] shadow-lg ring-1 ring-[#D4AF37]/60">
      {/* Revealed Inner Card Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 py-2 text-center select-none">
        <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8B6508] font-bold">
          Save the date
        </p>
        <p className="font-playfair whitespace-nowrap text-[21px] sm:text-2xl font-bold text-[#5A121E] my-1 tracking-normal leading-tight">
          11 &amp; 12 December 2026
        </p>
        <p className="font-allura text-4xl sm:text-5xl font-bold text-[#5A121E] leading-none drop-shadow-xs my-1">
          Arpit &amp; Anchal
        </p>
        <p className="font-cinzel text-xs sm:text-sm font-bold text-[#8B6508] tracking-wider uppercase mt-1">
          📍 Gloria Inn, Bhilwara
        </p>
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

