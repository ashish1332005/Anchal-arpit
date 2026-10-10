import React, { useEffect, useRef, useState } from 'react';

const REVEAL_THRESHOLD = 0.38;

export default function ScratchDateReveal({ revealed, onReveal }) {
  const canvasRef = useRef(null);
  const isScratching = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const bounds = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.round(bounds.width * scale);
    canvas.height = Math.round(bounds.height * scale);
    const context = canvas.getContext('2d');
    context.scale(scale, scale);
    context.fillStyle = '#e8e5df';
    context.fillRect(0, 0, bounds.width, bounds.height);

    const gradient = context.createLinearGradient(0, 0, bounds.width, bounds.height);
    gradient.addColorStop(0, 'rgba(255,255,255,.5)');
    gradient.addColorStop(0.5, 'rgba(194,188,178,.22)');
    gradient.addColorStop(1, 'rgba(255,255,255,.55)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, bounds.width, bounds.height);
    context.strokeStyle = 'rgba(115,102,83,.35)';
    context.lineWidth = 1;
    context.strokeRect(8, 8, bounds.width - 16, bounds.height - 16);
    context.fillStyle = '#766d61';
    context.font = '600 13px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('SCRATCH HERE TO REVEAL', bounds.width / 2, bounds.height / 2);
  }, [revealed]);

  const eraseAt = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const bounds = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc((event.clientX - bounds.left), (event.clientY - bounds.top), 22, 0, Math.PI * 2);
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
    <div className="relative w-full max-w-2xl mx-auto aspect-[16/7] rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-[#8B6508]/20">
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="font-cormorant text-sm sm:text-base text-[#8B6508]">Save the date</p>
        <p className="font-playfair text-xl sm:text-3xl font-semibold text-[#5A121E]">11 &amp; 12 December 2026</p>
        <p className="font-cormorant text-sm sm:text-base text-[#5A121E] mt-1">Arpit &amp; Anchal</p>
      </div>
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
