import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Contact.css';

const contactItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'manickavasagam1359@gmail.com',
    href: 'mailto:manickavasagam1359@gmail.com',
    color: '#7B6FFF',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+91 93443 26259',
    href: 'tel:+919344326259',
    color: '#00D4FF',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/manickavasagam-s',
    href: 'https://linkedin.com/in/manickavasagam-s-794174291',
    color: '#7B6FFF',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Karur, Tamil Nadu, India',
    href: 'https://maps.google.com/?q=Karur,Tamil+Nadu',
    color: '#FF6B6B',
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

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Mailto fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:manickavasagam1359@gmail.com?subject=${subject}&body=${body}`);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-tag" variants={itemVariants}>Signal Transmission</motion.p>
          <motion.h2 className="section-title" variants={itemVariants}>
            Transmit a <span className="gradient-text">Signal</span>
          </motion.h2>

          <div className="contact-grid">
            {/* Left — Contact cards */}
            <motion.div className="contact-cards" variants={itemVariants}>
              <p className="contact-intro">
                Open to internships, collaborations, and freelance projects in drones, embedded systems, and creative media.
              </p>
              {contactItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="contact-card glass-card"
                  style={{ '--accent': item.color }}
                >
                  <div className="contact-card-icon" style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    {item.icon}
                  </div>
                  <div className="contact-card-text">
                    <span className="contact-card-label">{item.label}</span>
                    <span className="contact-card-value">{item.value}</span>
                  </div>
                  <div className="contact-card-arrow">→</div>
                </a>
              ))}
            </motion.div>

            {/* Right — Terminal form */}
            <motion.div className="terminal-form glass-card" variants={itemVariants}>
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span /><span /><span />
                </div>
                <span className="terminal-title">signal_transmitter.sh</span>
              </div>

              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="terminal-body"
                  >
                    <div className="terminal-field">
                      <label className="terminal-label">
                        <span className="prompt">$ </span>name:
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name..."
                        className="terminal-input"
                        autoComplete="off"
                      />
                    </div>

                    <div className="terminal-field">
                      <label className="terminal-label">
                        <span className="prompt">$ </span>email:
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="terminal-input"
                        autoComplete="off"
                      />
                    </div>

                    <div className="terminal-field">
                      <label className="terminal-label">
                        <span className="prompt">$ </span>message:
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Describe your mission..."
                        className="terminal-input terminal-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary transmit-btn"
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <span className="sending-dots">transmitting</span>
                          <SignalWave />
                        </>
                      ) : (
                        <>
                          TRANSMIT
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="7" y1="17" x2="17" y2="7"/>
                            <polyline points="7 7 17 7 17 17"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="terminal-success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="success-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <p className="success-title">Signal Transmitted!</p>
                    <p className="success-sub">Your message is on its way. I'll respond within 24 hours.</p>
                    <button className="btn btn-outline" onClick={() => setSent(false)} style={{ marginTop: 16 }}>
                      Send another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <p className="footer-copy">
              © 2026 <span className="gradient-text">Manickavasagam S</span> — Engineered in zero gravity.
            </p>
            <div className="footer-links">
              <a href="https://linkedin.com/in/manickavasagam-s-794174291" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://bit.ly/3Reh7kT" target="_blank" rel="noreferrer">GitHub</a>
              <a href="mailto:manickavasagam1359@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

function SignalWave() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="signal-wave">
      <rect x="0" y="6" width="3" height="4" rx="1.5" fill="currentColor" className="wave-bar bar1"/>
      <rect x="5" y="2" width="3" height="12" rx="1.5" fill="currentColor" className="wave-bar bar2"/>
      <rect x="10" y="0" width="3" height="16" rx="1.5" fill="currentColor" className="wave-bar bar3"/>
      <rect x="15" y="2" width="3" height="12" rx="1.5" fill="currentColor" className="wave-bar bar4"/>
      <rect x="20" y="6" width="3" height="4" rx="1.5" fill="currentColor" className="wave-bar bar5"/>
    </svg>
  );
}
