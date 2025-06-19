import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Star,
} from "lucide-react";
import { debounce } from "../utils";

/**
 * Hook personalizado para gerenciar animações baseadas em visibilidade
 */
const useAnimatedVisibility = (threshold = 0.2, once = true) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once, threshold });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return { ref, controls };
};

/**
 * Componente de seção animada
 */
const AnimatedSection = memo(({ children, delay = 0, className = "" }) => {
  const { ref, controls } = useAnimatedVisibility(0.2);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

AnimatedSection.displayName = "AnimatedSection";

// Componente memoizado para o fundo
const Background = memo(({ isMobile, mousePosition }) => (
  <>
    {/* Grades */}
    <div
      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
      style={{
        backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                         linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
        backgroundSize: isMobile ? "40px 40px" : "80px 80px",
      }}
    />
  </>
));

// Componente para um evento individual da timeline
const TimelineEvent = memo(
  ({
    title,
    subtitle,
    date,
    description,
    icon,
    isLeft = true,
    iconBgColor = "bg-blue-500",
    delay,
  }) => {
    const { ref, controls } = useAnimatedVisibility(0.1);

    // Definindo as variantes de animação
    const containerVariants = {
      hidden: {
        opacity: 0,
        x: isLeft ? -50 : 50,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };

    const contentVariants = {
      hidden: {
        opacity: 0,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.4,
          delay: delay + 0.2,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }; // Renderizando o componente
    return (
      <motion.div
        ref={ref}
        className={`relative flex items-center ${
          isLeft ? "justify-end" : "justify-start"
        } w-full mb-8`}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {/* Card do conteúdo */}{" "}
        <motion.div
          className={`relative z-10 ${
            isLeft ? "mr-12" : "ml-12"
          } w-full max-w-[calc(50%-3rem)] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-100 dark:border-slate-700/80 hover:shadow-xl transition-all duration-300`}
          variants={contentVariants}
        >
          <div className="absolute -top-3 bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-1 rounded-full text-white text-sm font-medium">
            {date}
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-3">
            {title}
          </h3>
          <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400 mb-2">
            {subtitle}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        </motion.div>
        {/* Ícone central */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${iconBgColor} text-white shadow-lg`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              transition: {
                delay: delay + 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 260,
                damping: 20,
              },
            }}
          >
            {icon}
          </motion.div>
        </div>
        {/* Linha da timeline */}{" "}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
          initial={{ height: 0 }}
          animate={{
            height: "100%",
            transition: { delay: delay, duration: 0.8 },
          }}
        />
      </motion.div>
    );
  }
);

TimelineEvent.displayName = "TimelineEvent";

// Componente principal da Timeline
const Timeline = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const timelineRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Manipulador de movimento do mouse para efeitos parallax
  const handleMouseMove = (event) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    }
  };

  // Toggle para expandir/recolher a seção
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Dados da timeline (substituir com tradução real)
  const timelineEvents = [
    {
      title: t(
        "timeline.events.0.title",
        "Início da Carreira em Desenvolvimento"
      ),
      subtitle: t("timeline.events.0.subtitle", "Desenvolvedor Freelancer"),
      date: t("timeline.events.0.date", "2018"),
      description: t(
        "timeline.events.0.description",
        "Comecei minha jornada como desenvolvedor web, trabalhando em projetos freelancer e desenvolvendo minhas habilidades em HTML, CSS e JavaScript."
      ),
      icon: <Briefcase size={20} />,
      iconBgColor: "bg-blue-500",
      isLeft: true,
      delay: 0.1,
    },
    {
      title: t("timeline.events.1.title", "Especialização em Front-end"),
      subtitle: t("timeline.events.1.subtitle", "Frameworks Modernos"),
      date: t("timeline.events.1.date", "2019"),
      description: t(
        "timeline.events.1.description",
        "Aprofundei meus conhecimentos em React.js, Next.js e outras tecnologias front-end modernas, expandindo minha capacidade de criar interfaces interativas."
      ),
      icon: <Star size={20} />,
      iconBgColor: "bg-purple-500",
      isLeft: false,
      delay: 0.3,
    },
    {
      title: t("timeline.events.2.title", "Full Stack Development"),
      subtitle: t("timeline.events.2.subtitle", "Back-end & Databases"),
      date: t("timeline.events.2.date", "2020-2021"),
      description: t(
        "timeline.events.2.description",
        "Expandi meus horizontes para o desenvolvimento full stack, trabalhando com Node.js, Express, MongoDB e MySQL para criar aplicações web completas."
      ),
      icon: <GraduationCap size={20} />,
      iconBgColor: "bg-green-500",
      isLeft: true,
      delay: 0.5,
    },
    {
      title: t("timeline.events.3.title", "Criação de Conteúdo Digital"),
      subtitle: t("timeline.events.3.subtitle", "Tutoriais & Cursos"),
      date: t("timeline.events.3.date", "2022"),
      description: t(
        "timeline.events.3.description",
        "Comecei a compartilhar meu conhecimento através de tutoriais, artigos técnicos e pequenos cursos online, ajudando outros desenvolvedores a crescerem."
      ),
      icon: <Award size={20} />,
      iconBgColor: "bg-amber-500",
      isLeft: false,
      delay: 0.7,
    },
    {
      title: t("timeline.events.4.title", "Projetos Empresariais"),
      subtitle: t("timeline.events.4.subtitle", "Soluções Corporativas"),
      date: t("timeline.events.4.date", "2023-Presente"),
      description: t(
        "timeline.events.4.description",
        "Atualmente foco em desenvolver soluções tecnológicas para empresas, incluindo sistemas de gestão, dashboards e aplicações web personalizadas."
      ),
      icon: <Briefcase size={20} />,
      iconBgColor: "bg-blue-600",
      isLeft: true,
      delay: 0.9,
    },
  ];
  // Estado para controlar se é um dispositivo móvel
  const [isMobile, setIsMobile] = useState(false);

  // Verificar se é um dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="timeline"
      className="relative py-20 md:py-24 bg-transparent"
      ref={timelineRef}
      onMouseMove={handleMouseMove}
    >
      {/* Grade */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                                                    linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
          backgroundSize: isMobile ? "40px 40px" : "80px 80px",
        }}
      />
      {/* Elementos decorativos - bolhas centralizadas */}{" "}
      <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div
          className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/15 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translate(-50%, -50%) scale(0.7)" }}
        />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {" "}
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            {t("timeline.title", "Minha Jornada")}
          </h2>{" "}
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {t(
              "timeline.subtitle",
              "Um percurso através da minha evolução profissional e conquistas ao longo dos anos."
            )}
          </p>
        </motion.div>
        <div className="relative flex flex-col items-center">
          {/* Linha inicial da timeline */}{" "}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-transparent to-indigo-500 rounded-full"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 20,
              opacity: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            }}
          />
          {/* Eventos da timeline */}{" "}
          <div className={`w-full ${expanded ? "space-y-6" : "space-y-4"}`}>
            {timelineEvents
              .slice(0, expanded ? timelineEvents.length : 3)
              .map((event, index) => (
                <TimelineEvent
                  key={index}
                  {...event}
                  isLeft={index % 2 === 0}
                />
              ))}
          </div>
          {/* Botão para expandir/recolher */}{" "}
          <motion.button
            className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center gap-2 hover:shadow-lg shadow-blue-500/20 dark:shadow-blue-700/20 transition-all duration-300"
            onClick={toggleExpand}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {expanded ? (
              <>
                <ChevronUp size={20} />{" "}
                {t("timeline.showLess", "Mostrar Menos")}
              </>
            ) : (
              <>
                <ChevronDown size={20} />{" "}
                {t("timeline.showMore", "Mostrar Mais")}
              </>
            )}
          </motion.button>
          {/* Ícone de decoração no final da timeline */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: 1, duration: 0.5 },
            }}
          >
            {" "}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
