import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.jsx';
import Hero from './containers/Hero.jsx';
import About from './containers/About.jsx';
import Skills from './containers/Skills.jsx';
import Services from './containers/Services.jsx';
import Resume from './containers/Resume.jsx';
import Projects from './containers/Projects.jsx';
import Testimonials from './containers/Testimonials.jsx';
import Contact from './containers/Contact.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTopBtn from './components/ScrollToTopBtn.jsx';
import ParticlesComponent from './components/ParticlesComponent.jsx';
import Atuacao from './containers/atuacao.jsx';
import { Analytics } from "@vercel/analytics/react"

import './styles/import.css';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ParticlesComponent /> {/* Fundo de partículas */}
        <div className="content-wrapper">
            <Header />
            <Hero />
            <About />
            <Atuacao />
            <Skills />
            <Services />
            <Resume />
            <Projects />
            <Testimonials />
            <Contact />
            <Footer />
            <ScrollToTopBtn />
        </div>
    </React.StrictMode>
);