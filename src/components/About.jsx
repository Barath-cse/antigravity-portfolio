import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref} className="stat-number">{count}{suffix}</span>;
}

const stats = [
  { value: 2, suffix: '+', label: 'Projects Built' },
  { value: 75, suffix: '%+', label: 'Academic Score' },
  { value: 5, suffix: '+', label: 'Tech Skills' },
  { value: 2025, suffix: '', label: 'Active Since' },
];

const skillGroups = [
  {
    label: 'Hardware',
    color: '#7B6FFF',
    skills: ['ESP32', 'Arduino', 'Embedded C', 'Sensors'],
  },
  {
    label: 'Software',
    color: '#00D4FF',
    skills: ['Python', 'JavaScript', 'SQL', 'Git'],
  },
  {
    label: 'Creative',
    color: '#FF6B6B',
    skills: ['Photography', 'Editing', 'UI Design'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-tag" variants={itemVariants}>
            Zero-G Profile
          </motion.p>
          <motion.h2 className="section-title" variants={itemVariants}>
            About <span className="gradient-text">Me</span>
          </motion.h2>

          <div className="about-grid">
            {/* Left — Profile Card */}
            <motion.div className="profile-card glass-card" variants={itemVariants}>
              <div className="profile-avatar-wrap">
                <div className="profile-avatar-ring" />
                <div className="profile-avatar">
                  <img src="/profile.jpg" alt="Manickavasagam S" />
                </div>
              </div>

              <h3 className="profile-name">Manickavasagam S</h3>
              <p className="profile-role">ECE Engineer · Drone Builder · Photographer</p>

              <p className="profile-bio">
                I'm an ECE graduate who builds surveillance drones and fire-fighting robots by day, 
                and chases cinematic light by night. I live at the intersection of hardware and imagination — 
                where firmware meets fine art.
              </p>

              <div className="profile-links">
                <a href="https://linkedin.com/in/manickavasagam-s-794174291" target="_blank" rel="noreferrer" className="profile-link">
                  <LinkedInIcon/> LinkedIn
                </a>
                <a href="https://bit.ly/3Reh7kT" target="_blank" rel="noreferrer" className="profile-link">
                  <GitHubIcon/> GitHub
                </a>
              </div>
            </motion.div>

            {/* Right — Stats + Skill bubbles */}
            <div className="about-right">
              {/* Stats */}
              <motion.div className="stats-grid" variants={itemVariants}>
                {stats.map(s => (
                  <div key={s.label} className="stat-card glass-card">
                    <Counter target={s.value} suffix={s.suffix} />
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Skill Bubbles */}
              <motion.div className="skill-bubbles" variants={itemVariants}>
                {skillGroups.map(group => (
                  <div key={group.label} className="skill-group">
                    <p className="skill-group-label" style={{ color: group.color }}>
                      {group.label}
                    </p>
                    <div className="skill-tags">
                      {group.skills.map(s => (
                        <span key={s} className="skill-tag" style={{ borderColor: group.color + '44', color: group.color }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}
