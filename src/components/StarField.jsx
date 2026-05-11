import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.15 + 0.03,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.008 + 0.003,
      twinkleDir: 1,
    }));

    // Nebula particles
    const nebulas = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 80 + 30,
      hue: Math.random() > 0.5 ? 260 : 190,
      opacity: Math.random() * 0.04 + 0.01,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebula blobs
      nebulas.forEach(n => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, `hsla(${n.hue}, 80%, 65%, ${n.opacity})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Stars
      stars.forEach(s => {
        s.opacity += s.twinkleSpeed * s.twinkleDir;
        if (s.opacity >= 1) s.twinkleDir = -1;
        if (s.opacity <= 0.1) s.twinkleDir = 1;

        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Drift upward slowly
        s.y -= s.speed;
        if (s.y < -2) {
          s.y = canvas.height + 2;
          s.x = Math.random() * canvas.width;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.9,
      }}
    />
  );
}
