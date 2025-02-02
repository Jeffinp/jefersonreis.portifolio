// App.jsx otimizado
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import SEOHead from "./components/SEOHead";
import "./styles/import.css";

// Componentes com dynamic import e prefetch
const Header = React.lazy(() => import(/* webpackPrefetch: true */ "./components/Header.jsx"));
const Hero = React.lazy(() => import(/* webpackPrefetch: true */ "./containers/Hero.jsx"));
const About = React.lazy(() => import(/* webpackPrefetch: true */ "./containers/About.jsx"));

// Componentes carregados sob demanda sem prefetch
const Skills = React.lazy(() => import("./containers/Skills.jsx"));
const Services = React.lazy(() => import("./containers/Services.jsx"));
const Resume = React.lazy(() => import("./containers/Resume.jsx"));
const PortfolioSection = React.lazy(() => import("./containers/Projects.jsx"));
const Testimonials = React.lazy(() => import("./containers/Testimonials.jsx"));
const Contact = React.lazy(() => import("./containers/Contact.jsx"));
const Footer = React.lazy(() => import("./components/Footer.jsx"));
const ScrollToTopBtn = React.lazy(() => import("./components/ScrollToTopBtn.jsx"));
const Atuacao = React.lazy(() => import("./containers/atuacao.jsx"));

// Componente de loading otimizado
const LoadingScreen = () => (
    <div className="loading-screen">Carregando...</div>
);

const App = () => {
    const [darkMode, setDarkMode] = useState(() => {
        try {
            return localStorage.getItem("darkMode") === "enabled" ||
                (localStorage.getItem("darkMode") === null &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches);
        } catch {
            return false;
        }
    });

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
            <React.Suspense fallback={<LoadingScreen />}>
                <Header toggleDarkMode={() => setDarkMode(prev => !prev)} darkMode={darkMode} />
                <div className="content-wrapper">
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
                </div>
            </React.Suspense>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </HelmetProvider>
    </React.StrictMode>
);