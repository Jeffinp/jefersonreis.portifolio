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
import ParticlesComponent from './components/ParticlesComponent.jsx';
import Atuacao from './containers/atuacao.jsx';

import './styles/import.css';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Verifica se o usuário já tem preferência salva no localStorage
        const savedMode = localStorage.getItem('darkMode');
        
        if (savedMode === null) {
            // Se não tiver preferência salva, aplica o modo escuro por padrão
            setDarkMode(true);
            document.body.classList.add('dark-mode');
        } else {
            // Se houver preferência salva, aplica conforme
            setDarkMode(savedMode === 'enabled');
        }
    }, []);

    useEffect(() => {
        // Atualiza o modo no localStorage
        localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
        // Altera a classe do body para aplicar as variáveis CSS
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

    return (
        <div>
            <ParticlesComponent /> {/* Fundo de partículas */}
            <div className="content-wrapper">
                <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
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
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
