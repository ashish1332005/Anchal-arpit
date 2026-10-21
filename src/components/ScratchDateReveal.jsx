import React, { useEffect, useRef, useState } from 'react';
import pinkHeart      from '../assets/pink-heart.png';
import scratchSurface from '../assets/image copy.png';

const REVEAL_THRESHOLD = 0.35;

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
    img.src = pinkHeart;
    img.onload = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, W, H);
    };
    img.onerror = () => {
      const fallback = new Image();
      fallback.src = scratchSurface;
      fallback.onload = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(fallback, 0, 0, W, H);
      };
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
    ctx.arc(event.clientX - bounds.left, event.clientY - bounds.top, 28, 0, Math.PI * 2);
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

      {/* Heading ABOVE the heart with consistent event heading font (Alex Brush / Anchal-Arpit-Invitaion) */}
      <div className="text-center transition-all duration-500 mb-0.5">
        <h2 className="font-alex-brush text-4xl min-[375px]:text-[44px] sm:text-[48px] text-[#5A121E] leading-tight select-none drop-shadow-xs">
          {revealed ? 'Save the Date' : 'Scratch to Reveal'}
        </h2>
      </div>

      {/* Card area matching exact 340/310 aspect ratio of Anchal-Arpit-Invitaion heart */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ width: 'min(88vw, 320px)', aspectRatio: '340 / 310' }}
      >
        {/* ── BOTTOM: Revealed Royal Gold Foil & Pearl Blush Heart (from Anchal-Arpit-Invitaion) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none drop-shadow-[0_14px_28px_rgba(180,110,120,0.32)]">
          <svg viewBox="0 0 340 310" className="w-full h-full">
            <defs>
              {/* 3D Luxury Gold Metallic Gradient */}
              <linearGradient id="goldMetallicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b8860b" />
                <stop offset="25%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#fff8d1" />
                <stop offset="75%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#8a6217" />
              </linearGradient>

              {/* Pearlescent Soft Romantic Blush Fill */}
              <radialGradient id="pearlBlushGlow" cx="50%" cy="38%" r="62%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#fffdfa" />
                <stop offset="80%" stopColor="#fdefef" />
                <stop offset="100%" stopColor="#f8dde2" />
              </radialGradient>
            </defs>

            {/* Outer Gold Metallic Border Rim */}
            <path
              d="M 170,82 C 170,16 42,16 42,112 C 42,176 128,222 170,274 C 212,222 298,176 298,112 C 298,16 170,16 170,82 Z"
              fill="url(#pearlBlushGlow)"
              stroke="url(#goldMetallicGradient)"
              strokeWidth="4.5"
            />

            {/* Inner Delicate Gold Filigree Ring (Double Rim) */}
            <path
              d="M 170,88 C 170,24 50,24 50,113 C 50,171 130,215 170,265 C 210,215 290,171 290,113 C 290,24 170,24 170,88 Z"
              fill="none"
              stroke="#c59b27"
              strokeWidth="1.2"
              strokeDasharray="6 3"
              opacity="0.75"
            />

            {/* Grand Date Typography */}
            <text x="170" y="124" textAnchor="middle" fill="#8b1e3f">
              <tspan fontFamily="'Cinzel', 'Playfair Display', serif" fontSize="22" fontWeight="800" letterSpacing="0.5">
                12 December, 2026
              </tspan>
            </text>

            {/* Decorative Gold Divider */}
            <line x1="92" y1="142" x2="148" y2="142" stroke="#c59b27" strokeWidth="1.2" opacity="0.8" />
            <circle cx="170" cy="142" r="3" fill="#84651d" />
            <line x1="192" y1="142" x2="248" y2="142" stroke="#c59b27" strokeWidth="1.2" opacity="0.8" />

            {/* Saturday */}
            <text
              x="170"
              y="166"
              textAnchor="middle"
              fill="#84651d"
              fontFamily="'Marcellus', 'Cinzel', serif"
              fontSize="13"
              fontWeight="700"
              letterSpacing="3.5"
            >
              SATURDAY
            </text>

            {/* Venue Location: Gloria Inn cleanly inside the heart */}
            <text
              x="170"
              y="190"
              textAnchor="middle"
              fill="#2d4a2e"
              fontFamily="'Marcellus', 'Cinzel', serif"
              fontSize="11"
              fontWeight="600"
              letterSpacing="2"
            >
              GLORIA INN
            </text>

            {/* Bottom Tiny Heart Accent */}
            <path
              d="M 170 208 C 167 204 163 204 163 208 C 163 212 170 217 170 217 C 170 217 177 212 177 208 C 177 204 173 204 170 208 Z"
              fill="#c59b27"
              opacity="0.85"
            />
          </svg>
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
