import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Skills.css';

const skillNodes = [
  // Hardware
  { id: 'esp32',  label: 'ESP32',       group: 'hardware', level: 88, x: 15, y: 25 },
  { id: 'arduino',label: 'Arduino',     group: 'hardware', level: 90, x: 10, y: 55 },
  { id: 'embc',   label: 'Embedded C',  group: 'hardware', level: 80, x: 20, y: 78 },
  { id: 'sensors',label: 'Sensors',     group: 'hardware', level: 85, x: 5,  y: 42 },

  // Software
  { id: 'python', label: 'Python',      group: 'software', level: 78, x: 55, y: 10 },
  { id: 'js',     label: 'JavaScript',  group: 'software', level: 70, x: 75, y: 20 },
  { id: 'sql',    label: 'SQL',         group: 'software', level: 72, x: 85, y: 45 },
  { id: 'git',    label: 'Git',         group: 'software', level: 82, x: 80, y: 68 },

  // Creative
  { id: 'photo',  label: 'Photography', group: 'creative', level: 92, x: 40, y: 88 },
  { id: 'edit',   label: 'Editing',     group: 'creative', level: 86, x: 65, y: 82 },
  { id: 'ui',     label: 'UI Design',   group: 'creative', level: 74, x: 50, y: 65 },

];

// Star-map connections (pairs of node IDs)
const connections = [
  ['esp32','arduino'],['arduino','embc'],['embc','sensors'],['sensors','esp32'],
  ['python','js'],['js','sql'],['sql','git'],
  ['photo','edit'],['edit','ui'],
  ['esp32','python'],['git','ui'],['embc','photo'],
];

const groupColors = {
  hardware: '#7B6FFF',
  software: '#00D4FF',
  creative: '#FF6B6B',
};

const groupLabels = {
  hardware: '⚙ Hardware',
  software: '💻 Software',
  creative: '🎨 Creative',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeNode, setActiveNode] = useState(null);

  const nodeById = Object.fromEntries(skillNodes.map(n => [n.id, n]));

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-tag" variants={itemVariants}>Tech Constellation</motion.p>
          <motion.h2 className="section-title" variants={itemVariants}>
            Skill <span className="gradient-text">Map</span>
          </motion.h2>

          <div className="skills-legend" style={{ marginTop: 40, marginBottom: 32 }}>
            {Object.entries(groupLabels).map(([key, label]) => (
              <span key={key} className="legend-item">
                <span className="legend-dot" style={{ background: groupColors[key] }} />
                {label}
              </span>
            ))}
          </div>

          <motion.div className="constellation-wrap glass-card" variants={itemVariants}>
            <svg
              className="constellation-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connection lines */}
              {connections.map(([a, b]) => {
                const na = nodeById[a], nb = nodeById[b];
                if (!na || !nb) return null;
                const isActive = activeNode === a || activeNode === b;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke={isActive ? groupColors[na.group] : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isActive ? '0.5' : '0.2'}
                    strokeDasharray="0.5 1"
                    style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                  />
                );
              })}

              {/* Skill nodes */}
              {skillNodes.map(node => {
                const color = groupColors[node.group];
                const isActive = activeNode === node.id;
                const r = isActive ? 3.5 : 2.2;
                return (
                  <g
                    key={node.id}
                    className="skill-node"
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Glow ring */}
                    <circle
                      cx={node.x} cy={node.y}
                      r={r + 2}
                      fill={color}
                      opacity={isActive ? 0.2 : 0.07}
                      style={{ transition: 'r 0.3s, opacity 0.3s' }}
                    />
                    {/* Core */}
                    <circle
                      cx={node.x} cy={node.y}
                      r={r}
                      fill={color}
                      opacity={0.9}
                      style={{ transition: 'r 0.3s' }}
                      filter="url(#nodeGlow)"
                    />
                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y - r - 1.5}
                      textAnchor="middle"
                      fontSize={isActive ? '3.5' : '2.8'}
                      fill={color}
                      fontFamily="JetBrains Mono, monospace"
                      opacity={isActive ? 1 : 0.7}
                      style={{ transition: 'font-size 0.3s, opacity 0.3s', pointerEvents: 'none' }}
                    >
                      {node.label}
                    </text>
                    {/* Proficiency bar when active */}
                    {isActive && (
                      <>
                        <rect
                          x={node.x - 8} y={node.y + r + 1.5}
                          width="16" height="2.5"
                          rx="1.25"
                          fill="rgba(255,255,255,0.1)"
                        />
                        <rect
                          x={node.x - 8} y={node.y + r + 1.5}
                          width={16 * node.level / 100} height="2.5"
                          rx="1.25"
                          fill={color}
                        />
                        <text
                          x={node.x} y={node.y + r + 7}
                          textAnchor="middle"
                          fontSize="2.5"
                          fill={color}
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {node.level}%
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

              <defs>
                <filter id="nodeGlow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Hint */}
            <p className="constellation-hint">Hover nodes to see proficiency</p>
          </motion.div>

          {/* Skill bars — compact breakdown */}
          <motion.div className="skill-bars-grid" variants={itemVariants}>
            {skillNodes.map(node => (
              <div key={node.id} className="skill-bar-row">
                <div className="skill-bar-meta">
                  <span className="skill-bar-name" style={{ color: groupColors[node.group] }}>
                    {node.label}
                  </span>
                  <span className="skill-bar-pct">{node.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <motion.div
                    className="skill-bar-fill"
                    style={{ background: groupColors[node.group] }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${node.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
