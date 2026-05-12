import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, School, Award } from 'lucide-react';
import './Education.css';

const educationData = [
  {
    id: 1,
    institution: 'Chettinad College of Engineering and Technology',
    degree: 'Electronics and Communication Engineering',
    period: '2023 – Present',
    score: 'CGPA: 7.7',
    location: 'Karur, Tamil Nadu',
    icon: GraduationCap,
    align: 'right'
  },
  {
    id: 2,
    institution: 'Karur Vetri Vinayaga Matric Higher Secondary School',
    degree: 'HSC',
    period: '2022 – 2023',
    score: 'Percentage: 75.2%',
    location: 'Karur, Tamil Nadu',
    icon: School,
    align: 'left'
  },
  {
    id: 3,
    institution: 'Karur Vetri Vinayaga Matric Higher Secondary School',
    degree: 'SSLC',
    period: '2021 – 2022',
    score: 'Percentage: 60%',
    location: 'Karur, Tamil Nadu',
    icon: School,
    align: 'right'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.3 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="education-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="education-content"
        >
          <motion.h2 className="section-title-alt" variants={itemVariants}>
            Educational <span className="gradient-text">Journey</span>
          </motion.h2>

          <div className="timeline-v2">
            <div className="timeline-line-v2" />
            
            {educationData.map((item) => (
              <motion.div
                key={item.id}
                className={`timeline-item-v2 ${item.align}`}
                variants={itemVariants}
              >
                <div className="timeline-dot-v2">
                  <div className="dot-inner" />
                </div>

                <div className="timeline-card-v2 glass-card">
                  <div className="card-period">
                    <Calendar size={14} className="icon-purple" />
                    <span>{item.period}</span>
                  </div>
                  
                  <h3 className="card-institution">{item.institution}</h3>
                  <p className="card-degree">{item.degree}</p>

                  <div className="card-footer-edu">
                    <div className="badge-edu">
                      {item.score}
                    </div>
                    <div className="card-location">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
