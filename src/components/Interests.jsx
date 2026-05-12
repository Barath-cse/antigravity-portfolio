import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Video, Camera, Film, Heart } from 'lucide-react';
import './Interests.css';

const hobbies = [
  {
    id: 1,
    title: 'Video Editing',
    icon: Film,
    color: '#7B6FFF',
    bg: 'rgba(123, 111, 255, 0.1)'
  },
  {
    id: 2,
    title: 'Videography',
    icon: Video,
    color: '#00D4FF',
    bg: 'rgba(0, 212, 255, 0.1)'
  },
  {
    id: 3,
    title: 'Photography',
    icon: Camera,
    color: '#FF6B6B',
    bg: 'rgba(255, 107, 107, 0.1)'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" } 
  }
};

export default function Interests() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="interests" className="interests-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="interests-grid"
        >
          <div className="interests-text">
            <motion.h2 className="section-title-alt left" variants={itemVariants}>
              Interests & <span className="gradient-text">Hobbies</span>
            </motion.h2>
            
            <motion.p className="interests-description" variants={itemVariants}>
              Beyond engineering, I am deeply involved in creative visual arts. 
              Capturing stories through a lens and bringing them to life on screen 
              is what drives my creativity.
            </motion.p>

            <motion.div className="interests-tag" variants={itemVariants}>
              <Heart size={16} fill="#7B6FFF" color="#7B6FFF" />
              <span>Creativity in Motion</span>
            </motion.div>
          </div>

          <div className="hobbies-list">
            {hobbies.map((hobby) => (
              <motion.div
                key={hobby.id}
                className="hobby-card glass-card"
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div 
                  className="hobby-icon-wrapper" 
                  style={{ backgroundColor: hobby.bg }}
                >
                  <hobby.icon size={32} style={{ color: hobby.color }} />
                </div>
                <h3 className="hobby-title">{hobby.title}</h3>
                <div className="hobby-line" style={{ backgroundColor: hobby.color }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
