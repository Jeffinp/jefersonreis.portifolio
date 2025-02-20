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
const Atuacao = lazy(() => import(/* @vite-ignore */"./containers/atuacao.jsx"));

// Tela de carregamento enquanto os componentes são carregados

const LoadingScreen = () => (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100 dark:bg-slate-800 flex flex-col justify-center items-center z-50 transition-colors duration-300">
        <div className="flex items-center space-x-6 mb-8">
            <div
                className="animate-spin rounded-full h-14 w-14 border-4 border-transparent border-t-purple-500 dark:border-t-purple-400"
                style={{
                    backgroundImage: `url('/assets/images/icon/favicon-96x96.png')`,
                    backgroundSize: 'contain', // Ajusta o tamanho da imagem para caber dentro do spinner
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
            ></div>
        </div>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 opacity-90 transition-colors duration-300">Carregando Portfólio...</p>
    </div>
);

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
            <Suspense fallback={<LoadingScreen />}>
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
