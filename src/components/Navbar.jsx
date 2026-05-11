import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          <svg width="28" height="28" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7B6FFF"/>
                <stop offset="100%" stopColor="#00D4FF"/>
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="30" fill="none" stroke="url(#logoGrad)" strokeWidth="2"/>
            <path d="M32 12 L40 28 L32 24 L24 28 Z" fill="url(#logoGrad)"/>
            <path d="M28 28 L24 44 L32 38 L40 44 L36 28 Z" fill="url(#logoGrad)" opacity="0.7"/>
          </svg>
          <span className="gradient-text">MV</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)} className="nav-link">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:manickavasagam1359@gmail.com"
              className="btn btn-primary nav-cta"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </a>
          </li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span/><span/><span/>
        </button>
      </div>
    </motion.nav>
  );
}
