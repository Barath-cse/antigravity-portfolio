import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = () => document.body.classList.add('cursor-hover');
    const onLeave = () => document.body.classList.remove('cursor-hover');

    const animate = () => {
      // Dot follows immediately
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top  = my + 'px';
      }
      // Ring lags behind
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top  = ry + 'px';
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);

    document.querySelectorAll('a, button, .btn, .project-card, .skill-node').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
