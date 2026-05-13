import { useEffect } from 'react';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Education from './components/Education';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Tools from './components/Tools';
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
        <Tools />
        <Projects />
        <Gallery />
        <Education />
        <Interests />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
