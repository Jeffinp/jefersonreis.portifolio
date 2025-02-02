import React, { useState, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import SEOHead from "./components/SEOHead";
import "./styles/import.css";

// Lazy Loading para otimizar carregamento
const Header = lazy(() => import("./components/Header.jsx"));
const Hero = lazy(() => import("./containers/Hero.jsx"));
const About = lazy(() => import("./containers/About.jsx"));
const Skills = lazy(() => import("./containers/Skills.jsx"));
const Services = lazy(() => import("./containers/Services.jsx"));
const Resume = lazy(() => import("./containers/Resume.jsx"));
const PortfolioSection = lazy(() => import("./containers/Projects.jsx"));
const Testimonials = lazy(() => import("./containers/Testimonials.jsx"));
const Contact = lazy(() => import("./containers/Contact.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));
const ScrollToTopBtn = lazy(() => import("./components/ScrollToTopBtn.jsx"));
const Atuacao = lazy(() => import("./containers/atuacao.jsx"));

const LoadingScreen = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333'
    }}>
        Carregando...
    </div>
);

const App = () => {
    const [darkMode, setDarkMode] = useState(() => {
        try {
            const storedMode = localStorage.getItem("darkMode");
            if (storedMode === "enabled") return true;
            if (storedMode === "disabled") return false;
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        } catch (error) {
            console.error("Erro ao acessar localStorage:", error);
            return false;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
        } catch (error) {
            console.error("Erro ao salvar no localStorage:", error);
        }
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

    return (
        <div className="app-container">
            <SEOHead />
            <div className="content-wrapper">
                <Suspense fallback={<LoadingScreen />}>
                    <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                    <Hero />
                    <About />
                    <Atuacao />
                    <Skills />
                    <Services />
                    <Resume />
                    <PortfolioSection />
                    <Testimonials />
                    <Contact />
                    <Footer />
                    <ScrollToTopBtn />
                </Suspense>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <HelmetProvider>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </HelmetProvider>
    </React.StrictMode>
);