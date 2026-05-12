import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const ROLES = ['ECE Engineer', 'Drone Builder', 'Visual Artist', 'Robotics Engineer'];

function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const speed = deleting ? 45 : 90;

  useEffect(() => {
    const current = words[idx % words.length];
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIdx(i => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, idx, words, speed]);

  return (
    <span className="typewriter">
      {text}<span className="caret">|</span>
    </span>
  );
}

function DroneSVG() {
  return (
    <svg className="drone-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B6FFF"/>
          <stop offset="100%" stopColor="#00D4FF"/>
        </linearGradient>
        <filter id="glow-filter">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Arms */}
      <line x1="160" y1="110" x2="60"  y2="70"  stroke="url(#dg1)" strokeWidth="3" opacity="0.7"/>
      <line x1="160" y1="110" x2="260" y2="70"  stroke="url(#dg1)" strokeWidth="3" opacity="0.7"/>
      <line x1="160" y1="110" x2="60"  y2="150" stroke="url(#dg1)" strokeWidth="3" opacity="0.7"/>
      <line x1="160" y1="110" x2="260" y2="150" stroke="url(#dg1)" strokeWidth="3" opacity="0.7"/>

      {/* Motor circles */}
      {[[60,70],[260,70],[60,150],[260,150]].map(([cx,cy],i) => (
        <g key={i} filter="url(#glow-filter)">
          <circle cx={cx} cy={cy} r="22" fill="rgba(123,111,255,0.15)" stroke="url(#dg1)" strokeWidth="1.5"/>
          <circle cx={cx} cy={cy} r="14" fill="rgba(0,212,255,0.1)" stroke="#00D4FF" strokeWidth="1"/>
          <circle cx={cx} cy={cy} r="6" fill="url(#dg1)"/>
          {/* Propeller blades */}
          <ellipse cx={cx-18} cy={cy} rx="14" ry="4" fill="rgba(123,111,255,0.3)" className="prop-blade"
            style={{ transformOrigin: `${cx}px ${cy}px`, animationDelay: `${i * 0.1}s` }}/>
          <ellipse cx={cx+18} cy={cy} rx="14" ry="4" fill="rgba(0,212,255,0.3)" className="prop-blade"
            style={{ transformOrigin: `${cx}px ${cy}px`, animationDelay: `${i * 0.1}s` }}/>
        </g>
      ))}

      {/* Body */}
      <rect x="140" y="90" width="40" height="40" rx="8" fill="rgba(18,18,30,0.9)" stroke="url(#dg1)" strokeWidth="1.5" filter="url(#glow-filter)"/>
      {/* Camera */}
      <circle cx="160" cy="136" r="8" fill="rgba(0,212,255,0.2)" stroke="#00D4FF" strokeWidth="1" filter="url(#glow-filter)"/>
      <circle cx="160" cy="136" r="4" fill="#00D4FF" opacity="0.7"/>
      {/* LED */}
      <circle cx="160" cy="100" r="3" fill="#FF6B6B" filter="url(#glow-filter)" className="led-blink"/>

      {/* Signal rings */}
      <circle cx="160" cy="110" r="90" stroke="rgba(123,111,255,0.08)" strokeWidth="1" strokeDasharray="4 8"/>
      <circle cx="160" cy="110" r="120" stroke="rgba(0,212,255,0.05)" strokeWidth="1" strokeDasharray="2 12"/>
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">

        {/* Orbit ring */}
        <div className="orbit-ring orbit-ring--outer" />
        <div className="orbit-ring orbit-ring--inner" />

        {/* Drone */}
        <motion.div
          className="drone-wrap"
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
        >
          <DroneSVG />
        </motion.div>

        {/* Content */}
        <div className="hero-content">
          {/* Available badge */}
          <motion.div
            className="available-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="badge-dot" />
            Available for opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="gradient-text">MANICKA</span>
            <br />
            <span className="gradient-text">VASAGAM S</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <TypeWriter words={ROLES} />
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            "Above the surface. Beyond the limit."
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <a href="#projects" className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
              My Works
            </a>
            <a
              href="https://drive.google.com/file/d/1dnqdvtBTb9vg9Ie2RV6qRbiVdBUJSANz/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              View Resume
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
            <rect x="1" y="1" width="18" height="30" rx="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
            <circle cx="10" cy="10" r="3" fill="var(--accent1)"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
