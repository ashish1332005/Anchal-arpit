import React, { useEffect, useRef } from 'react';

export default function FallingPetals({ active = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // A little denser on the envelope screen, with a mix of petals and leaves.
    const petalCount = active ? 24 : 12;
    const petals = [];
    const colors = [
      '#FF65A3', // Cherry blossom pink
      '#FF85B3', // Soft sakura pink
      '#E6005C', // Rose pink accent
      '#F472B6', // Light pink
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 8 + 7, // Smaller delicate size
        speedY: Math.random() * 0.9 + 0.5, // Slow gentle fall
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1.5 - 0.75,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.35, // Soft subtle opacity
        swingOffset: Math.random() * Math.PI * 2,
        isLeaf: active && i % 3 === 0,
      });
    }

    const drawPetal = (petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);
      ctx.globalAlpha = petal.opacity;

      const r = petal.size;
      if (petal.isLeaf) {
        ctx.fillStyle = ['#6F8060', '#83936B', '#52674B'][Math.floor(petal.swingOffset * 10) % 3];
        ctx.beginPath();
        ctx.moveTo(0, -r * 1.25);
        ctx.quadraticCurveTo(r * 1.1, -r * 0.35, 0, r * 1.25);
        ctx.quadraticCurveTo(-r * 0.7, r * 0.25, 0, -r * 1.25);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.65)';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(0, r);
        ctx.stroke();
      } else {
        ctx.fillStyle = petal.color;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.bezierCurveTo(r * 0.8, -r * 0.8, r * 0.8, r * 0.5, 0, r);
        ctx.bezierCurveTo(-r * 0.8, r * 0.5, -r * 0.8, -r * 0.8, 0, -r);
        ctx.fill();
      }

      ctx.restore();
    };

    let step = 0;
    const render = () => {
      step += 0.015;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(step + p.swingOffset) * 0.6 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${active ? 'z-[60] opacity-75' : 'z-30 opacity-70'}`}
    />
  );
}
