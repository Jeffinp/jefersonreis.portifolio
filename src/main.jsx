// App.jsx
import React, { Suspense, lazy, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/import.css";
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import SEOHead from "./components/SEOHead";
import WhatsAppFloatBtn from "./components/WhatsAppFloatBtn.jsx";
import DiscordFloatBtn from "./components/DiscordFloatBtn.jsx";

// Importação comum apenas para componentes críticos de primeira renderização
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';

// Lazy loading para componentes não críticos
const Hero = lazy(() => import('./containers/Hero'));
const About = lazy(() => import('./containers/About'));
const Services = lazy(() => import('./containers/Services'));
const Skills = lazy(() => import('./containers/Skills'));
const Projects = lazy(() => import('./containers/Projects'));
const Resume = lazy(() => import('./containers/Resume'));
const Contact = lazy(() => import('./containers/Contact'));
const ScrollToTopBtn = lazy(() => import('./components/ScrollToTopBtn'));

// Adicionar estilos para resolver o problema de transição entre seções
const sectionStyles = `
  html, body {
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #root {
    position: relative;
    overflow: hidden;
  }
  
  .section-container {
    position: relative;
  }
  
  /* Remove overflow hidden das seções para permitir que os elementos decorativos fluam */
  #about, #skills, #services, #resume, #portfolio, #testimonials, #contact {
    overflow: visible !important;
  }
  
  /* Cria overlap entre seções para transição suave */
  .overlap-section {
    margin-top: -60px;
    padding-top: 80px;
  }
  
  /* Ajusta o z-index para controlar sobreposições */
  .z-lower { z-index: 1; }
  .z-higher { z-index: 2; }
  
  /* Aumenta o tamanho das bolhas nos limites das seções */
  .section-boundary-bubble {
    height: 800px !important;
    width: 800px !important;
    opacity: 0.1;
  }
`;

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simula tempo de carregamento para garantir que os assets principais sejam carregados
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <SEOHead />
            {/* Injetar estilos para corrigir as transições */}
            <style>{sectionStyles}</style>

            <Header />
            <main className="relative w-full overflow-hidden">
                <Suspense fallback={<Loader />}>
                    <Hero />
                    <About />
                    <Services />
                    <Skills />
                    <Projects />
                    <Resume />
                    <Contact />
                    <ScrollToTopBtn />
                </Suspense>
            </main>
            <WhatsAppFloatBtn />
            <DiscordFloatBtn />
            <Footer />
        </>
    );
};

// Renderiza o app na raiz do HTML
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </I18nextProvider>
    </React.StrictMode>
);
