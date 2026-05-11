import { useEffect } from 'react';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Education from './components/Education';
import Contact from './components/Contact';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <StarField />
      <Navbar />

      <main className="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Gallery />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
