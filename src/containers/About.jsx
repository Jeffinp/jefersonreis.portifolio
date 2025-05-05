import React, { useEffect, useRef, useMemo, useCallback, useState, memo } from "react";
import { User, Palette, ChevronRight, Cpu, Code, Terminal, Layers, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { debounce } from '../utils';

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
const AnimatedSection = memo(({
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
});

AnimatedSection.displayName = 'AnimatedSection';

/**
 * Componente simplificado para fundo dinâmico
 */
const Background = memo(({ isMobile, mousePosition }) => (
    <>
        {/* Fundo com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-gray-50/40 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-950/40 -z-10"></div>
        
        {/* Grade simplificada - estática para reduzir animações */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
            style={{
                backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                               linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                backgroundSize: isMobile ? '40px 40px' : '80px 80px'
            }}
        />
        
        {/* Elementos decorativos - bolhas centralizadas */}
        <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: -1, transform: 'translate(-50%, -50%) scale(0.7)' }} />
        </div>
    </>
));

Background.displayName = 'Background';

/**
 * Componente de Card 3D que destaca habilidades ou características - simplificado
 */
const FeatureCard = memo(({
    icon,
    title,
    description,
    actionText,
    onClick,
    colorFrom = "blue",
    colorTo = "purple",
    delay,
    index,
    ariaLabel
}) => {
    const Icon = icon;
    
    return (
        <AnimatedSection
            delay={delay}
            className="group h-full"
            threshold={0.1}
            aria-labelledby={`feature-title-${index}`}
        >
            <div className="relative h-full p-4 sm:p-5 md:p-6 lg:p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-md hover:shadow-xl sm:shadow-lg sm:hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative flex flex-col items-center text-center h-full">
                    {/* Ícone simplificado */}
                    <div className={`relative mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 rounded-full bg-gradient-to-br from-${colorFrom}-500 to-${colorTo}-500 shadow-lg text-white transition-transform duration-300 hover:scale-105`}>
                        <Icon strokeWidth={1.5} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative" aria-hidden="true" />
                    </div>
                    
                    {/* Título simplificado */}
                    <h3
                        id={`feature-title-${index}`}
                        className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-800 dark:text-white`}
                    >
                        {title}
                    </h3>
                    
                    {/* Descrição */}
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6 flex-grow">
                        {description}
                    </p>
                    
                    {/* Botão simplificado */}
                    <button
                        type="button"
                        onClick={onClick}
                        className={`flex items-center text-${colorFrom}-600 dark:text-${colorFrom}-400 text-sm sm:text-base font-medium hover:underline mt-auto`}
                        aria-label={ariaLabel || actionText}
                    >
                        {actionText}
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
});

FeatureCard.displayName = 'FeatureCard';

const AboutMe = () => {
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const scrollTo = useSmothScroll();

    // Detectar dispositivo móvel com debounce
    const checkMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        const handleResize = debounce(() => {
            checkMobile();
        }, 250);
        
        checkMobile();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [checkMobile]);

    // Efeito de paralaxe com mouse (apenas em desktop)
    useEffect(() => {
        if (isMobile) return () => { };
        
        const handleMouseMove = debounce((e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePosition({
                x: (x / rect.width) - 0.5,
                y: (y / rect.height) - 0.5
            });
        }, 50);
        
        const sectionElement = sectionRef.current;
        if (sectionElement) {
            sectionElement.addEventListener('mousemove', handleMouseMove);
        }
        
        return () => {
            if (sectionElement) {
                sectionElement.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [isMobile]);

    // Memoizar os dados das features para evitar re-renderizações desnecessárias
    const features = useMemo(() => [
        {
            icon: Code,
            title: t('about.cards.webDev.title'),
            description: t('about.cards.webDev.description'),
            actionText: t('about.cards.action'),
            onClick: () => scrollTo('portfolio'),
            colorFrom: "blue",
            colorTo: "cyan",
            ariaLabel: t('about.cards.webDev.ariaLabel'),
            delay: 0.1
        },
        {
            icon: Palette,
            title: t('about.cards.design.title'),
            description: t('about.cards.design.description'),
            actionText: t('about.cards.action'),
            onClick: () => scrollTo('portfolio'),
            colorFrom: "purple",
            colorTo: "pink",
            ariaLabel: t('about.cards.design.ariaLabel'),
            delay: 0.2
        },
        {
            icon: Terminal,
            title: t('about.cards.backend.title'),
            description: t('about.cards.backend.description'),
            actionText: t('about.cards.action'),
            onClick: () => scrollTo('skills'),
            colorFrom: "green",
            colorTo: "blue",
            ariaLabel: t('about.cards.backend.ariaLabel'),
            delay: 0.3
        },
        {
            icon: Layers,
            title: t('about.cards.softSkills.title'),
            description: t('about.cards.softSkills.description'),
            actionText: t('about.cards.action'),
            onClick: () => scrollTo('skills'),
            colorFrom: "orange",
            colorTo: "red",
            ariaLabel: t('about.cards.softSkills.ariaLabel'),
            delay: 0.4
        }
    ], [t, scrollTo]);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-8 sm:py-10 md:py-16 lg:py-20 xl:py-24 bg-transparent"
            aria-label={t('about.ariaLabel')}
        >
            {/* Fundo de quadrados alinhados igual ao padrão das outras seções */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />
            
            {/* Bolhas centralizadas */}
            <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
                <div className="absolute left-1/2 top-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-500/10 dark:bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 w-[200px] sm:w-[260px] md:w-[320px] h-[200px] sm:h-[260px] md:h-[320px] bg-purple-500/10 dark:bg-purple-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: -1, transform: 'translate(-50%, -50%) scale(0.7)' }} />
            </div>
            
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
                    {/* Layout responsivo: Altera a ordem e layout baseado no breakpoint */}
                    <div className={`w-full ${isMobile ? 'order-1' : 'order-2 lg:order-1'}`}>
                        <AnimatedSection delay={0} animation="fadeUp" className="w-full mb-6 sm:mb-8 md:mb-10">
                            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full">
                                <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-center lg:text-left">
                                            {t('about.title')}
                                        </h2>
                                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 md:mb-4 text-center lg:text-left">
                                            {t('about.devTitle')}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg text-center lg:text-left">
                                        <p>{t('about.paragraphs.first')}</p>
                                        <p>{t('about.paragraphs.second')}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6 justify-center lg:justify-start">
                                        <a
                                            href="#contact"
                                            className="inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md sm:shadow-lg transition-colors duration-300 gap-1 sm:gap-2"
                                        >
                                            {t('about.cta.contact')}
                                        </a>
                                        <a
                                            href={t('about.cta.resumeUrl')}
                                            className="inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl border border-blue-600 hover:border-blue-700 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 dark:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md sm:shadow-lg gap-1 sm:gap-2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t('about.cta.resume')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                    
                    <div className={`w-full ${isMobile ? 'order-2' : 'order-1 lg:order-2'}`}>
                        <AnimatedSection delay={0.1} animation="fadeUp" className="mb-6 sm:mb-8 md:mb-10 w-full">
                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-800 dark:text-white text-center lg:text-left">
                                {t('about.stats.title')}
                            </h2>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                {[
                                    {
                                        value: "3+",
                                        label: t('about.stats.experience'),
                                        color: "blue"
                                    },
                                    {
                                        value: "30+",
                                        label: t('about.stats.projects'),
                                        color: "purple"
                                    },
                                    {
                                        value: "15+",
                                        label: t('about.stats.clients'),
                                        color: "green"
                                    },
                                    {
                                        value: "99%",
                                        label: t('about.stats.satisfaction'),
                                        color: "pink"
                                    }
                                ].map((stat, index) => (
                                    <div key={index} className={`bg-white/80 dark:bg-slate-800/80 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm sm:shadow-md flex flex-col items-center`}>
                                        <p className={`text-xl sm:text-2xl md:text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</p>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                        
                        <AnimatedSection delay={0.2} animation="fadeUp">
                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-800 dark:text-white text-center lg:text-left">
                                {t('about.expertise.title')}
                            </h2>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                {[
                                    {
                                        icon: <Code size={18} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
                                        label: t('about.expertise.frontend'),
                                        color: "blue"
                                    },
                                    {
                                        icon: <Terminal size={18} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
                                        label: t('about.expertise.backend'),
                                        color: "purple"
                                    },
                                    {
                                        icon: <Palette size={18} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
                                        label: t('about.expertise.design'),
                                        color: "green"
                                    },
                                    {
                                        icon: <Monitor size={18} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
                                        label: t('about.expertise.ux'),
                                        color: "pink",
                                        bg: "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className={`flex items-center gap-1 sm:gap-2 p-2 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg ${item.bg ? item.bg : `bg-${item.color}-50 dark:bg-${item.color}-900/20`} text-${item.color}-600 dark:text-${item.color}-400 justify-center lg:justify-start`}>
                                        {item.icon}
                                        <span className="font-medium text-xs sm:text-sm md:text-base">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
                
                {/* Feature Cards Section - Layout responsivo com grid */}
                <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {t('about.features.title', 'Meus Serviços')}
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                actionText={feature.actionText}
                                onClick={feature.onClick}
                                colorFrom={feature.colorFrom}
                                colorTo={feature.colorTo}
                                delay={feature.delay}
                                index={index}
                                ariaLabel={feature.ariaLabel}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(AboutMe);