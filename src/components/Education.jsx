import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Education.css';

const timeline = [
  {
    id: 1,
    degree: 'B.E. Electronics & Communication Engineering',
    institution: 'Chettinad College of Engineering & Technology',
    period: '2023 – Present',
    score: 'CGPA: 7.7',
    scoreLabel: 'Current CGPA',
    altitude: 'ALT 35,000 FT',
    accent: '#7B6FFF',
    icon: '🎓',
  },
  {
    id: 2,
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Karur Vetri Vinayaga Higher Secondary School',
    period: '2022 – 2023',
    score: '75.2%',
    scoreLabel: 'Percentage',
    altitude: 'ALT 18,000 FT',
    accent: '#00D4FF',
    icon: '📘',
  },
  {
    id: 3,
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Karur Vetri Vinayaga Higher Secondary School',
    period: '2021 – 2022',
    score: '60.0%',
    scoreLabel: 'Percentage',
    altitude: 'ALT 5,000 FT',
    accent: '#FF6B6B',
    icon: '🏫',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-tag" variants={itemVariants}>Flight Log</motion.p>
          <motion.h2 className="section-title" variants={itemVariants}>
            Education <span className="gradient-text">Timeline</span>
          </motion.h2>

          <div className="timeline">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.id}
                className="timeline-item"
                variants={itemVariants}
              >
                {/* Connector */}
                <div className="timeline-connector">
                  <div className="timeline-dot" style={{ background: item.accent, boxShadow: `0 0 20px ${item.accent}` }} />
                  {idx < timeline.length - 1 && <div className="timeline-line" />}
                </div>

                {/* Card */}
                <div className="timeline-card glass-card" style={{ '--accent': item.accent }}>
                  <div className="timeline-header">
                    <div className="timeline-icon">{item.icon}</div>
                    <div>
                      <span className="timeline-altitude">{item.altitude}</span>
                      <span className="timeline-period">{item.period}</span>
                    </div>
                  </div>

                  <h3 className="timeline-degree">{item.degree}</h3>
                  <p className="timeline-institution">{item.institution}</p>

                  <div className="timeline-score-wrap">
                    <span className="timeline-score-label">{item.scoreLabel}</span>
                    <span className="timeline-score" style={{ color: item.accent }}>
                      {item.score}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certificate Section */}
          <motion.div className="certificate-section" variants={itemVariants}>
            <p className="section-tag" style={{ marginTop: 0 }}>Clearance Badge</p>
            <h3 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 32 }}>
              Certification
            </h3>

            <motion.div
              className="cert-card glass-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="cert-shimmer" />
              <div className="cert-body">
                <div className="cert-badge-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <defs>
                      <linearGradient id="certGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7B6FFF"/>
                        <stop offset="100%" stopColor="#00D4FF"/>
                      </linearGradient>
                    </defs>
                    <circle cx="24" cy="20" r="14" stroke="url(#certGrad)" strokeWidth="2" fill="rgba(123,111,255,0.1)"/>
                    <path d="M18 35 L24 30 L30 35 L28 42 L24 39 L20 42 Z" fill="url(#certGrad)" opacity="0.8"/>
                    <circle cx="24" cy="20" r="8" fill="url(#certGrad)" opacity="0.3"/>
                    <path d="M20 20 L23 23 L28 17" stroke="url(#certGrad)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>

                <div className="cert-info">
                  <span className="cert-tag">CERTIFIED</span>
                  <h4 className="cert-title">Character Recognition Using Machine Learning</h4>
                  <p className="cert-issuer">Indian Info Techo</p>
                  <div className="cert-id">
                    <span className="cert-id-label">CREDENTIAL ID</span>
                    <span className="cert-id-value">IIT-ML-CR-2024</span>
                  </div>
                </div>

                <div className="cert-hologram">
                  <div className="hologram-inner">ML</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
