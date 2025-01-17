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

const App = () => {
    // Usando o estado para controlar o tema escuro
    const [darkMode, setDarkMode] = useState(() => {
        try {
            // Verifico se o modo escuro está salvo no localStorage
            const storedMode = localStorage.getItem('darkMode');
            if (storedMode === 'enabled') {
                return true;
            } else if (storedMode === 'disabled') {
                return false;
            }
            // Se não estiver salvo, verifico a preferência do usuário
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (error) {
            console.error("Erro ao acessar localStorage:", error);
            return false;
        }
    });

    // UseEffect para salvar a configuração do tema no localStorage
    useEffect(() => {
        try {
            localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
        } catch (error) {
            console.error("Erro ao salvar no localStorage:", error);
        }

        // classe 'dark-mode' no body para trocar o tema
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    // Função para alternar o modo escuro
    const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

    return (
        <div className="app-container">
            <div className="content-wrapper">
                {/* função de alternar o modo escuro para o Header */}
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

// Crio o root para renderizar o app
const root = ReactDOM.createRoot(document.getElementById('root'));

// renderizar o componente App dentro de StrictMode para detectar problemas
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
