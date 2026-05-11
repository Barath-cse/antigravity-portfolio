import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    id: 'UAV-01',
    code: 'ESP32-UAV-01',
    name: 'Military Based Drone',
    status: 'COMPLETED',
    period: 'Dec 2025 – Jan 2026',
    description:
      'Surveillance drone with real-time Wi-Fi/Bluetooth transmission. Built for tactical reconnaissance with live camera feed streaming and multi-channel control interface.',
    tags: ['ESP32', 'Wi-Fi', 'Bluetooth', 'Camera Module', 'C++'],
    accent: '#7B6FFF',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="project-icon">
        <defs>
          <linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B6FFF"/>
            <stop offset="100%" stopColor="#00D4FF"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" stroke="url(#pg1)" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <path d="M24 10 L30 22 L24 19 L18 22 Z" fill="url(#pg1)"/>
        <path d="M21 22 L18 34 L24 30 L30 34 L27 22 Z" fill="url(#pg1)" opacity="0.7"/>
        <circle cx="10" cy="16" r="4" stroke="url(#pg1)" strokeWidth="1" fill="rgba(123,111,255,0.15)"/>
        <circle cx="38" cy="16" r="4" stroke="url(#pg1)" strokeWidth="1" fill="rgba(123,111,255,0.15)"/>
        <circle cx="10" cy="32" r="4" stroke="url(#pg1)" strokeWidth="1" fill="rgba(123,111,255,0.15)"/>
        <circle cx="38" cy="32" r="4" stroke="url(#pg1)" strokeWidth="1" fill="rgba(123,111,255,0.15)"/>
      </svg>
    ),
    highlights: ['Real-time video stream', 'Dual-protocol (WiFi + BT)', 'Tactical recon ready'],
  },
  {
    id: 'BOT-01',
    code: 'BOT-FIRE-01',
    name: 'Robotic Fire Extinguisher',
    status: 'COMPLETED',
    period: 'Sep 2024 – Oct 2024',
    description:
      'Autonomous robot detecting flame and smoke, navigating hazardous environments to suppress fire. Integrated multi-sensor fusion for accurate threat detection.',
    tags: ['Arduino', 'Flame Sensor', 'MQ-2', 'Servo', 'Embedded C'],
    accent: '#FF6B6B',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="project-icon">
        <defs>
          <linearGradient id="pg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B"/>
            <stop offset="100%" stopColor="#FF9A4D"/>
          </linearGradient>
        </defs>
        <rect x="8" y="22" width="32" height="20" rx="4" stroke="url(#pg2)" strokeWidth="1.5" fill="rgba(255,107,107,0.1)"/>
        <circle cx="16" cy="38" r="4" fill="url(#pg2)" opacity="0.8"/>
        <circle cx="32" cy="38" r="4" fill="url(#pg2)" opacity="0.8"/>
        <path d="M20 10 Q24 4 28 10 Q32 16 24 20 Q16 16 20 10Z" fill="url(#pg2)" opacity="0.8"/>
        <line x1="24" y1="22" x2="24" y2="14" stroke="url(#pg2)" strokeWidth="1.5"/>
        <rect x="18" y="26" width="12" height="8" rx="2" fill="rgba(255,107,107,0.2)" stroke="url(#pg2)" strokeWidth="1"/>
      </svg>
    ),
    highlights: ['Autonomous navigation', 'Flame + smoke detection', 'Fire suppression system'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function ProjectCard({ project }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
        '--accent': project.accent,
      }}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      {/* Top border glow */}
      <div className="project-top-border" style={{ background: project.accent }} />

      {/* Header */}
      <div className="project-header">
        <div className="project-icon-wrap">
          {project.icon}
        </div>
        <div className="project-meta">
          <span className="project-code">{project.code}</span>
          <span
            className={`project-status ${project.status === 'ACTIVE' ? 'status-active' : 'status-done'}`}
          >
            <span className="status-dot" />
            {project.status}
          </span>
        </div>
      </div>

      {/* Body */}
      <h3 className="project-name">{project.name}</h3>
      <p className="project-period">{project.period}</p>
      <p className="project-desc">{project.description}</p>

      {/* Highlights */}
      <ul className="project-highlights">
        {project.highlights.map(h => (
          <li key={h}>
            <span className="highlight-dot" style={{ background: project.accent }} />
            {h}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="project-tags">
        {project.tags.map(t => (
          <span key={t} className="project-tag" style={{ borderColor: project.accent + '55' }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-tag" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            Mission Log
          </motion.p>
          <motion.h2
            className="section-title"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            Featured <span className="gradient-text">Missions</span>
          </motion.h2>

          <div className="projects-grid">
            {projects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
