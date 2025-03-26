import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { User, Palette, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView } from "framer-motion";

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
 * Hook personalizado para navegação suave entre seções
 */
const useSmothScroll = () => {
    return useCallback((elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);
};

/**
 * Componente de seção animada - Wrapper para elementos que animam na entrada
 */
const AnimatedSection = ({
    children,
    delay = 0,
    className = "",
    threshold = 0.2,
    animation = "fadeUp"
}) => {
    const { ref, controls } = useAnimatedVisibility(threshold);

    // Define as variantes de animação com base no tipo solicitado
    const variants = useMemo(() => {
        const animations = {
            fadeUp: {
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        delay,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            },
            fadeIn: {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        duration: 0.6,
                        delay,
                        ease: "easeInOut"
                    }
                }
            },
            scaleUp: {
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 0.5,
                        delay,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            }
        };

        return animations[animation];
    }, [animation, delay]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/**
 * Componente de Card que destaca habilidades ou características
 */
const FeatureCard = React.memo(({
    icon,
    title,
    description,
    actionText,
    onClick,
    colorFrom = "blue",
    colorTo = "blue",
    delay,
    index,
    ariaLabel
}) => {
    const Icon = icon;
    const isEven = index % 2 === 0;

    // Gradiente baseado nas cores fornecidas
    const gradientStyle = `from-${colorFrom}-400 to-${colorTo}-500 dark:from-${colorFrom}-500 dark:to-${colorTo}-600`;

    return (
        <AnimatedSection
            delay={delay}
            className="group perspective h-full"
            threshold={0.1}
            aria-labelledby={`feature-title-${index}`}
        >
            <div className="relative h-full p-6 md:p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:-rotate-y-2 hover:scale-[1.01]">
                {/* Efeito de borda inferior com gradiente */}
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Fundo com gradiente sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/30 dark:from-slate-700/0 dark:to-blue-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Elemento decorativo */}
                <div className="absolute -right-3 -top-3 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-green-100/20 dark:from-blue-900/10 dark:to-green-900/10 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-500" />

                <div className="relative flex flex-col items-center text-center h-full">
                    {/* Ícone com gradiente */}
                    <div className={`mb-6 p-5 md:p-6 rounded-2xl bg-gradient-to-br ${gradientStyle} text-white shadow-lg transform group-hover:scale-110 ${isEven ? 'group-hover:rotate-3' : 'group-hover:-rotate-3'} transition-transform duration-300`}>
                        <Icon strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
                    </div>

                    {/* Título */}
                    <h3
                        id={`feature-title-${index}`}
                        className={`text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-${colorFrom}-500 dark:group-hover:text-${colorFrom}-400 transition-colors duration-300`}
                    >
                        {title}
                    </h3>

                    {/* Descrição */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                        {description}
                    </p>

                    {/* Botão de ação */}
                    <button
                        type="button"
                        onClick={onClick}
                        className={`flex items-center text-${colorFrom}-500 dark:text-${colorFrom}-400 font-medium group-hover:text-${colorFrom}-600 dark:group-hover:text-${colorFrom}-300 transition-colors duration-300 mt-auto`}
                        aria-label={ariaLabel || actionText}
                    >
                        {actionText}
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
});

FeatureCard.displayName = 'FeatureCard';

/**
 * Componente principal About
 */
const AboutMe = () => {
    const { t } = useTranslation();
    const scrollToSection = useSmothScroll();

    // Cards de características
    const featureCards = useMemo(() => [
        {
            icon: User,
            title: t("about.title"),
            description: t("about.devDescription"),
            actionText: t("about.learnMore"),
            onClick: () => scrollToSection('areas'),
            colorFrom: "blue",
            colorTo: "blue",
            delay: 0.2,
            index: 0,
            ariaLabel: "Saiba mais sobre minhas habilidades como desenvolvedor"
        },
        {
            icon: Palette,
            title: t("about.designTitle"),
            description: t("about.designDescription"),
            actionText: t("about.learnMore"),
            onClick: () => scrollToSection('areas'),
            colorFrom: "green",
            colorTo: "green",
            delay: 0.3,
            index: 1,
            ariaLabel: "Saiba mais sobre minhas habilidades como designer"
        }
    ], [t, scrollToSection]);

    return (
        <section
            id="about"
            className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-blue-50/70 dark:from-slate-900/60 dark:to-slate-900/60"
            aria-label="Sobre mim"
        >
            {/* Barra de destaque superior */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-green-400 dark:from-blue-500 dark:to-green-500" />

            {/* Elementos decorativos de fundo */}
            <div aria-hidden="true" className="absolute -z-10 inset-0 overflow-hidden pointer-events-none select-none">
                {/* Círculos com blur para efeito visual */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000" />
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-40 animate-blob animation-delay-4000" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/80 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-blob animation-delay-1000" />

                {/* Padrão de grid e ondas no fundo */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.03]" />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent" />
                <svg className="absolute bottom-0 fill-blue-100/30 dark:fill-blue-900/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho da seção */}
                <AnimatedSection className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                        {t("about.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {t("about.intro")}
                    </p>
                </AnimatedSection>

                {/* Cards de características - uma coluna em mobile, duas em desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {featureCards.map((card, index) => (
                        <FeatureCard
                            key={`feature-${index}`}
                            {...card}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
