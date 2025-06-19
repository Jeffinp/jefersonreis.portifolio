// App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/import.css";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import SEOHead from "./components/SEOHead";
import WhatsAppFloatBtn from "./components/WhatsAppFloatBtn.jsx";
import DiscordFloatBtn from "./components/DiscordFloatBtn.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Importação comum apenas para componentes críticos de primeira renderização
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
// Importando o Hero diretamente para melhorar o LCP
import Hero from "./containers/Hero";

// Lazy loading para componentes não críticos
const About = lazy(() => import("./containers/About"));
const Services = lazy(() => import("./containers/Services"));
const Skills = lazy(() => import("./containers/Skills"));
const Projects = lazy(() => import("./containers/Projects"));
const Timeline = lazy(() => import("./containers/Timeline"));
const Contact = lazy(() => import("./containers/Contact"));
const EbookPromo = lazy(() => import("./containers/EbookPromo"));
const Ebook = lazy(() => import("./pages/Ebook"));
const ScrollToTopBtn = lazy(() => import("./components/ScrollToTopBtn"));

// Componente HomePage
const HomePage = ({ darkMode, toggleDarkMode }) => {
  // Precarregar o componente About para melhorar a experiência de rolagem
  useEffect(() => {
    const preloadAbout = () => {
      import("./containers/About");
    };
    // Precarregar após o componente principal ser renderizado
    const timer = setTimeout(preloadAbout, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEOHead />

      {/* Bolhas globais atravessando todas as seções */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 w-[1200px] h-[1200px] bg-blue-500/10 dark:bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div
          className="absolute left-1/2 top-1/2 w-[900px] h-[900px] bg-purple-500/10 dark:bg-purple-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: -1, transform: "translate(-50%, -50%) scale(0.7)" }}
        />
      </div>

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="relative w-full">
        {/* Renderizando Hero diretamente para melhorar o LCP */}
        <Hero />
        <Suspense fallback={<Loader />}>
          <About />
          <EbookPromo />
          <Services /> <Skills />
          <Projects />
          <Timeline />
          <Contact />
        </Suspense>
        <ScrollToTopBtn />
      </main>
      <WhatsAppFloatBtn />
      <DiscordFloatBtn />
      <Footer />
    </>
  );
};

// Componente EbookPage
const EbookPage = ({ darkMode, toggleDarkMode }) => {
  return (
    <>
      <SEOHead
        title="eBooks - Conteúdo Exclusivo"
        description="Biblioteca de eBooks com conteúdo exclusivo sobre tecnologia, empreendedorismo e desenvolvimento pessoal."
      />

      {/* Bolhas globais */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 w-[1200px] h-[1200px] bg-blue-500/10 dark:bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div
          className="absolute left-1/2 top-1/2 w-[900px] h-[900px] bg-purple-500/10 dark:bg-purple-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: -1, transform: "translate(-50%, -50%) scale(0.7)" }}
        />
      </div>

      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        showBackHome={true}
      />
      <main className="relative w-full">
        <Suspense fallback={<Loader />}>
          <Ebook />
          <ScrollToTopBtn />
        </Suspense>
      </main>
      <WhatsAppFloatBtn />
      <DiscordFloatBtn />
      <Footer />
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    // Verificar o tema salvo no localStorage ao carregar
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    // Usar preferência do sistema se não houver tema salvo
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Inicialização do tema e configuração de observer para mudanças na preferência do sistema
  useEffect(() => {
    // Aplicar tema inicial
    document.documentElement.classList.toggle("dark", darkMode);

    // Configurar observer para mudanças de tema do sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Só atualiza automaticamente se não houver preferência explícita salva
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches);
      }
    };

    // Adicionar listener (usando o método adequado conforme a compatibilidade do navegador)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Atualizar localStorage quando o tema mudar
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Simula tempo de carregamento para garantir que os assets principais sejam carregados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          }
        />
        <Route
          path="/ebooks"
          element={
            <EbookPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          }
        />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
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
