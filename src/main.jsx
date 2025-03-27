// App.jsx
import React, { useState, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import SEOHead from "./components/SEOHead";
import "./styles/import.css";
import WhatsAppFloatBtn from "./components/WhatsAppFloatBtn.jsx";
import DiscordFloatBtn from "./components/DiscordFloatBtn.jsx";

// Lazy loading dos componentes (evita carregar tudo de uma vez)
const Header = lazy(() => import(/* @vite-ignore */"./components/Header.jsx"));
const Hero = lazy(() => import(/* @vite-ignore */"./containers/Hero.jsx"));
const About = lazy(() => import(/* @vite-ignore */"./containers/About.jsx"));
const Skills = lazy(() => import(/* @vite-ignore */"./containers/Skills.jsx"));
const Services = lazy(() => import(/* @vite-ignore */"./containers/Services.jsx"));
const Resume = lazy(() => import(/* @vite-ignore */"./containers/Resume.jsx"));
const PortfolioSection = lazy(() => import(/* @vite-ignore */"./containers/Projects.jsx"));
const Testimonials = lazy(() => import(/* @vite-ignore */"./containers/Testimonials.jsx"));
const Contact = lazy(() => import(/* @vite-ignore */"./containers/Contact.jsx"));
const Footer = lazy(() => import(/* @vite-ignore */"./components/Footer.jsx"));
const ScrollToTopBtn = lazy(() => import(/* @vite-ignore */"./components/ScrollToTopBtn.jsx"));

// Tela de carregamento enquanto os componentes são carregados

const LoadingScreen = () => (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100 dark:bg-slate-800 flex flex-col justify-center items-center z-50 transition-colors duration-300">
        <div className="flex items-center space-x-6 mb-8">
            <div
                className="animate-spin rounded-full h-14 w-14 border-4 border-transparent border-t-purple-500 dark:border-t-purple-400"
                style={{
                    backgroundImage: `url('/assets/images/icon/favicon-96x96.png')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
            ></div>
        </div>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 opacity-90 transition-colors duration-300">Carregando Portfólio...</p>
    </div>
);

// Adicionar estilos para resolver o problema de transição entre seções
const sectionStyles = `
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
    // Pega o tema salvo ou usa a preferência do sistema
    const [darkMode, setDarkMode] = useState(() => {
        try {
            return localStorage.getItem("darkMode") === "enabled" ||
                (localStorage.getItem("darkMode") === null &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches);
        } catch {
            return false;
        }
    });

    // Salva a escolha do usuário no localStorage e aplica a classe no body
    useEffect(() => {
        try {
            localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
            document.body.classList.toggle("dark-mode", darkMode);
        } catch (error) {
            console.error("localStorage error:", error);
        }
    }, [darkMode]);

    return (
        <div className="app-container">
            <SEOHead />
            {/* Injetar estilos para corrigir as transições */}
            <style>{sectionStyles}</style>

            <Suspense fallback={<LoadingScreen />}>
                <Header toggleDarkMode={() => setDarkMode(prev => !prev)} darkMode={darkMode} />
                <div className="content-wrapper">
                    <Hero />

                    {/* Container para About/Skills com transição suave */}
                    <div className="section-container">
                        <About />
                        <div className="overlap-section">
                            <Skills />
                        </div>
                    </div>

                    {/* Container para Services/Resume com transição suave */}
                    <div className="section-container">
                        <Services />
                        <div className="overlap-section">
                            <Resume />
                        </div>
                    </div>

                    {/* Container para Portfolio/Testimonials com transição suave */}
                    <div className="section-container">
                        <PortfolioSection />
                        <div className="overlap-section">
                            <Testimonials />
                        </div>
                    </div>

                    {/* Última seção */}
                    <Contact />
                </div>
                <WhatsAppFloatBtn />
                <DiscordFloatBtn />
                <ScrollToTopBtn />
                <Footer />
            </Suspense>
        </div>
    );
};

// Renderiza o app na raiz do HTML
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </HelmetProvider>
    </React.StrictMode>
);
