// App.jsx
import React, { useState, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import SEOHead from "./components/SEOHead";
import "./styles/import.css";
import WhatsAppFloatBtn from "./components/WhatsAppFloatBtn.jsx";
import DiscordFloatBtn from "./components/DiscordFloatBtn.jsx";

// Lazy loading com comentários de prefetch
const Header = lazy(() => import(/* @vite-ignore */ "./components/Header.jsx"));
const Hero = lazy(() => import(/* @vite-ignore */ "./containers/Hero.jsx"));
const About = lazy(() => import(/* @vite-ignore */ "./containers/About.jsx"));
const Skills = lazy(() => import(/* @vite-ignore */ "./containers/Skills.jsx"));
const Services = lazy(
    () => import(/* @vite-ignore */ "./containers/Services.jsx")
);
const Resume = lazy(() => import(/* @vite-ignore */ "./containers/Resume.jsx"));
const PortfolioSection = lazy(
    () => import(/* @vite-ignore */ "./containers/Projects.jsx")
);
const Testimonials = lazy(
    () => import(/* @vite-ignore */ "./containers/Testimonials.jsx")
);
const Contact = lazy(
    () => import(/* @vite-ignore */ "./containers/Contact.jsx")
);
const Footer = lazy(() => import(/* @vite-ignore */ "./components/Footer.jsx"));
const ScrollToTopBtn = lazy(
    () => import(/* @vite-ignore */ "./components/ScrollToTopBtn.jsx")
);
const Atuacao = lazy(
    () => import(/* @vite-ignore */ "./containers/atuacao.jsx")
);

const LoadingScreen = () => <div className="loading-screen">Carregando...</div>;

const App = () => {
    const [darkMode, setDarkMode] = useState(() => {
        try {
            return (
                localStorage.getItem("darkMode") === "enabled" ||
                (localStorage.getItem("darkMode") === null &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            );
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
            <SEOHead />           {" "}
            <Suspense fallback={<LoadingScreen />}>
                {" "}
                <Header
                    toggleDarkMode={() => setDarkMode((prev) => !prev)}
                    darkMode={darkMode}
                />
                {" "}
                <div className="content-wrapper">
                    <Hero />
                    <About />
                    <Atuacao />
                    <Skills />
                    <Services />
                    <Resume />
                    <PortfolioSection />
                    <Testimonials />
                    <Contact />               {" "}
                </div>
                <WhatsAppFloatBtn />
                <DiscordFloatBtn />
                <ScrollToTopBtn />
                <Footer />           {" "}
            </Suspense>
            {" "}
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {" "}
        <HelmetProvider>
            {" "}
            <I18nextProvider i18n={i18n}>
                <App />           {" "}
            </I18nextProvider>
            {" "}
        </HelmetProvider>
        {" "}
    </React.StrictMode>
);
