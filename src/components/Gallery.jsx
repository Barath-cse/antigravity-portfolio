import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Gallery.css';

const photos = [
  { id: 1,  src: '/gallery/IMG-20240204-WA0023.jpg',       title: 'Candid Moments',      category: 'Photography', size: 'large' },
  { id: 2,  src: '/gallery/IMG_20240617_103600.jpg',       title: 'Aerial View',         category: 'Photography', size: 'small' },
  { id: 3,  src: '/gallery/IMG_20240619_184422.jpeg',      title: 'Urban Exploration',   category: 'Photography', size: 'medium' },
  { id: 4,  src: '/gallery/IMG_20240817_184442.jpg',       title: 'Nature’s Detail',     category: 'Photography', size: 'small' },
  { id: 5,  src: '/gallery/IMG_20240911_182715.jpg',       title: 'Horizon Lines',       category: 'Photography', size: 'medium' },
  { id: 6,  src: '/gallery/IMG_20250116_135055.jpg',       title: 'Daily Life',          category: 'Photography', size: 'small' },
  { id: 7,  src: '/gallery/IMG_20250505_183816.jpg',       title: 'Evening Glow',        category: 'Photography', size: 'medium' },
  { id: 8,  src: '/gallery/IMG_20260117_165131.jpeg',      title: 'Grand Perspective',   category: 'Photography', size: 'large' },
  { id: 9,  src: '/gallery/New Project 34 [6FCA40D].png',  title: 'Digital Fusion',      category: 'Creative',    size: 'medium' },
  { id: 10, src: '/gallery/Project 422 [24C1AD8].png',     title: 'Surreal Edit',        category: 'Editing',     size: 'small' },
  { id: 11, src: '/gallery/Project 698 [F2A4969].png',     title: 'Conceptual Art',      category: 'Creative',    size: 'large' },
  { id: 12, src: '/gallery/Project [77CF6E8].png',         title: 'Visual Synthesis',    category: 'Editing',     size: 'medium' },
  { id: 13, src: '/gallery/IMG_20251120_195440.jpeg',     title: 'Golden Perspective',   category: 'Photography', size: 'medium' },
];

const filters = ['All', 'Photography', 'Editing', 'Creative'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? photos : photos.filter(p => p.category === active);

  return (
    <section id="gallery" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-tag" variants={itemVariants}>Visual Transmission</motion.p>
          <motion.h2 className="section-title" variants={itemVariants}>
            Creative <span className="gradient-text">Gallery</span>
          </motion.h2>

          {/* Filter Bar */}
          <motion.div className="gallery-filters" variants={itemVariants}>
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn ${active === f ? 'active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div className="gallery-grid" variants={containerVariants}>
            <AnimatePresence>
              {filtered.map(photo => (
                <motion.div
                  key={photo.id}
                  className={`gallery-item gallery-item--${photo.size}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setLightbox(photo)}
                >
                  <div className="gallery-img-wrap">
                    <img src={photo.src} alt={photo.title} loading="lazy" />
                    <div className="gallery-overlay">
                      <div className="overlay-content">
                        <span className="overlay-category">{photo.category}</span>
                        <h4 className="overlay-title">{photo.title}</h4>
                        <div className="overlay-zoom">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="M21 21l-4.35-4.35"/>
                            <path d="M11 8v6M8 11h6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="lightbox-inner"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.title} />
              <div className="lightbox-caption">
                <span className="overlay-category">{lightbox.category}</span>
                <h4>{lightbox.title}</h4>
              </div>
              <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
