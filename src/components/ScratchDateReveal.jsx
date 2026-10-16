import React, { useEffect, useRef, useState } from 'react';
import scratchSurface from '../assets/image copy.png';
import heartReveal    from '../assets/image.png';

const REVEAL_THRESHOLD = 0.38;

const BG_STOPS = [
  { pos: 0,    color: [255, 253, 248] },
  { pos: 0.58, color: [247, 240, 228] },
  { pos: 1,    color: [234, 220, 200] },
];

export default function ScratchDateReveal({ revealed, onReveal }) {
  const canvasRef    = useRef(null);
  const isScratching = useRef(false);
  const [progress, setProgress] = useState(0);
  const [flowers,  setFlowers]  = useState([]);
  const lastFlowerAt = useRef(0);
  const flowerId     = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const dpr = window.devicePixelRatio || 1;
    const W   = bounds.width;
    const H   = bounds.height;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.src = scratchSurface;
    img.onload = () => {
      // Step 1: Fill with slide bg gradient → fully opaque, hides heart below
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.85);
      BG_STOPS.forEach(({ pos, color: [r, g, b] }) => {
        bg.addColorStop(pos, `rgb(${r},${g},${b})`);
      });
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Step 2: Couple image via multiply — white disappears, red petals stay
      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(img, 0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';

    };
  }, [revealed]);

  const eraseAt = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const bounds = canvas.getBoundingClientRect();
    const ctx    = canvas.getContext('2d');

    const now = Date.now();
    if (now - lastFlowerAt.current > 80) {
      lastFlowerAt.current = now;
      const id = flowerId.current++;
      const px = event.clientX - bounds.left;
      const py = event.clientY - bounds.top;
      setFlowers((f) => [...f.slice(-8), { id, x: px, y: py }]);
      window.setTimeout(() => setFlowers((f) => f.filter((fl) => fl.id !== id)), 850);
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(event.clientX - bounds.left, event.clientY - bounds.top, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < pixels.length; i += 4 * 16) {
      if (pixels[i] < 32) cleared++;
    }
    const ratio = cleared / (pixels.length / (4 * 16));
    setProgress(ratio);
    if (ratio >= REVEAL_THRESHOLD) onReveal();
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none">

      {/* Heading ABOVE the heart with event heading font (Lucy Said Ok) */}
      <div className="text-center transition-all duration-500 mb-0.5">
        <h2 className="font-lucy-said-ok text-4xl sm:text-5xl text-[#5A121E] leading-tight select-none drop-shadow-xs">
          {revealed ? 'Save the Date' : 'Scratch to Reveal'}
        </h2>
      </div>

      {/* Card area */}
      <div
        className="relative"
        style={{ width: 'min(88vw, 300px)', aspectRatio: '1 / 1' }}
      >
        {/* ── BOTTOM: gold heart PNG + date text inside hollow ── */}
        <div className="absolute inset-0">
          {/* Gold floral heart — transparent via multiply blend */}
          <img
            src={heartReveal}
            alt="Gold floral heart"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ mixBlendMode: 'multiply' }}
            draggable={false}
          />

          {/*
            Date inside heart hollow.
            image.png: flowers occupy left ~40%, rings at bottom-right.
            Hollow center is at ~62% from left, ~33% from top.
          */}
          <div
            className="absolute text-center flex flex-col items-center justify-center"
            style={{
              left: '62%',
              top: '32%',
              transform: 'translateX(-50%)',
              width: '46%',
            }}
          >
            <p className="font-dihjau text-[22px] sm:text-[25px] font-bold text-[#7B1124] leading-none whitespace-nowrap">
              11 &amp; 12
            </p>
            <p className="font-dihjau text-[12px] sm:text-[13.5px] tracking-[0.22em] font-bold text-[#7B1124] leading-tight mt-1">
              DECEMBER
            </p>
            <p className="font-dihjau text-[19px] sm:text-[22px] font-bold text-[#5A121E] tracking-[0.18em] mt-0.5">
              2026
            </p>
          </div>
        </div>

        {/* Petal particles */}
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

        {/* ── TOP: scratch canvas (couple rose-heart, fully opaque) ── */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            aria-label="Scratch to reveal the wedding date"
            className="absolute inset-0 h-full w-full touch-none cursor-crosshair z-20"
            onPointerDown={(e) => {
              isScratching.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              eraseAt(e);
            }}
            onPointerMove={(e) => isScratching.current && eraseAt(e)}
            onPointerUp={() => { isScratching.current = false; }}
            onPointerCancel={() => { isScratching.current = false; }}
          />
        )}

        {!revealed && progress > 0.04 && (
          <span className="sr-only">{Math.round(progress * 100)}% revealed</span>
        )}
      </div>
    </div>
  );
}
