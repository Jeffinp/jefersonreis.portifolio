import React, { useState, useEffect } from 'react';
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
import Atuacao from './containers/atuacao.jsx';
import './styles/import.css';

import { Analytics } from "@vercel/analytics/react";

const App = () => {
    const [darkMode, setDarkMode] = useState(() => {
        try {
            const storedMode = localStorage.getItem('darkMode');
            if (storedMode === 'enabled') {
                return true;
            } else if (storedMode === 'disabled') {
                return false;
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (error) {
            console.error("Erro ao acessar localStorage:", error);
            return false;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
        } catch (error) {
            console.error("Erro ao salvar no localStorage:", error);
        }

        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

    return (
        <div className="app-container">
            <div className="content-wrapper">
                <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                <Hero />
                <About />
                <Atuacao />
                <Skills/>
                <Services />
                <Resume />
                <Projects />
                <Testimonials />
                <Contact />
                <Footer />
                <ScrollToTopBtn />
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
