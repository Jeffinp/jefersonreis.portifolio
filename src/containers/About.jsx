import React, { useEffect, useRef, useMemo, useCallback, useState, memo } from "react";
import { User, Palette, ChevronRight, Cpu, Code, Terminal, Layers, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { debounce } from '../utils';

/**
 * Hook personalizado para gerenciar animações baseadas em visibilidade
 * @param {number} threshold - Limiar de visibilidade para iniciar animação
 * @param {boolean} once - Se a animação deve ocorrer apenas uma vez
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
const useSmoothScroll = () => {
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
 * Componente para fundos dinâmicos
 */
const Background = memo(({ isMobile }) => (
    <>
        {/* Fundo com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-gray-50/40 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-950/40 -z-10"></div>

        {/* Grade simplificada - estática para reduzir animações */}
        <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
            style={{
                backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                               linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                backgroundSize: isMobile ? '40px 40px' : '80px 80px'
            }}
        />

        {/* Elementos decorativos - bolhas centralizadas */}
        <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div
                className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 scale-75"
                style={{ transform: 'translate(-50%, -50%) scale(0.7)' }}
            />
        </div>
    </>
));

Background.displayName = 'Background';

/**
 * Componente de Card para destacar recursos/habilidades
 */
const FeatureCard = memo(({
    icon,
    title,
    description,
    actionText,
    onClick,
    colorClass = "blue",
    delay,
    index,
    ariaLabel
}) => {
    const Icon = icon;

    // Mapeamento de cores para classes Tailwind
    const colorMap = {
        blue: {
            bg: "from-blue-500 to-cyan-500",
            text: "text-blue-600 dark:text-blue-400"
        },
        purple: {
            bg: "from-purple-500 to-pink-500",
            text: "text-purple-600 dark:text-purple-400"
        },
        green: {
            bg: "from-green-500 to-blue-500",
            text: "text-green-600 dark:text-green-400"
        },
        orange: {
            bg: "from-orange-500 to-red-500",
            text: "text-orange-600 dark:text-orange-400"
        }
    };

    const colors = colorMap[colorClass] || colorMap.blue;

    return (
        <AnimatedSection
            delay={delay}
            className="group h-full"
            threshold={0.1}
            aria-labelledby={`feature-title-${index}`}
        >
            <div className="relative h-full p-5 md:p-6 lg:p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl lg:rounded-2xl border border-gray-100 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative flex flex-col items-center text-center h-full">
                    {/* Ícone com gradiente */}
                    <div className={`relative mb-4 md:mb-6 p-3 md:p-4 rounded-full bg-gradient-to-br ${colors.bg} shadow-lg text-white transition-transform duration-300 group-hover:scale-105`}>
                        <Icon strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                    </div>

                    {/* Título */}
                    <h3
                        id={`feature-title-${index}`}
                        className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800 dark:text-white"
                    >
                        {title}
                    </h3>

                    {/* Descrição */}
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-5 md:mb-6 flex-grow">
                        {description}
                    </p>

                    {/* Botão de ação */}
                    <button
                        type="button"
                        onClick={onClick}
                        className={`flex items-center ${colors.text} text-sm md:text-base font-medium hover:underline mt-auto group`}
                        aria-label={ariaLabel || actionText}
                    >
                        {actionText}
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
});

FeatureCard.displayName = 'FeatureCard';

/**
 * Componente estatístico para exibir métricas
 */
const StatCard = memo(({ value, label, colorClass }) => {
    return (
        <div className="bg-white/80 dark:bg-slate-800/80 p-4 md:p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm md:shadow-md flex flex-col items-center">
            <p className={`text-2xl md:text-3xl font-bold ${colorClass === "blue" ? "text-blue-600 dark:text-blue-400" :
                colorClass === "purple" ? "text-purple-600 dark:text-purple-400" :
                    colorClass === "green" ? "text-green-600 dark:text-green-400" :
                        colorClass === "pink" ? "text-pink-600 dark:text-pink-400" :
                            "text-blue-600 dark:text-blue-400"
                }`}>
                {value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-1">
                {label}
            </p>
        </div>
    );
});

StatCard.displayName = 'StatCard';

/**
 * Componente de especialidade
 */
const ExpertiseItem = memo(({ icon, label, colorClass }) => {
    // Mapeamento de cores para classes Tailwind
    const bgColorMap = {
        blue: "bg-blue-50 dark:bg-blue-900/20",
        purple: "bg-purple-50 dark:bg-purple-900/20",
        green: "bg-green-50 dark:bg-green-900/20",
        pink: "bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30"
    };

    const textColorMap = {
        blue: "text-blue-600 dark:text-blue-400",
        purple: "text-purple-600 dark:text-purple-400",
        green: "text-green-600 dark:text-green-400",
        pink: "text-pink-600 dark:text-pink-400"
    };

    const bgClass = bgColorMap[colorClass] || bgColorMap.blue;
    const textClass = textColorMap[colorClass] || textColorMap.blue;

    return (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${bgClass} ${textClass} justify-center lg:justify-start`}>
            {icon}
            <span className="font-medium text-sm md:text-base">{label}</span>
        </div>
    );
});

ExpertiseItem.displayName = 'ExpertiseItem';

/**
 * Componente principal AboutMe 
 */
const AboutMe = () => {
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const scrollTo = useSmoothScroll();

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

    // Memoizar os dados das features para evitar re-renderizações
    const features = useMemo(() => [
        {
            icon: Code,
            title: t('about.cards.webDev.title'),
            description: t('about.cards.webDev.description'),
            actionText: t('about.cards.action'),
            onClick: () => scrollTo('portfolio'),
            colorClass: "blue",
            ariaLabel: t('about.cards.webDev.ariaLabel'),
            delay: 0.1
        },
        {
            icon: Palette,
            title: t('about.cards.design.title'),
            description: t('about.cards.design.description'),
            actionText: t('about.cards.action'),
            onClick: () => scrollTo('portfolio'),
            colorClass: "purple",
            ariaLabel: t('about.cards.design.ariaLabel'),
            delay: 0.2
        },
        {
            icon: Terminal,
            title: t('about.cards.backend.title'),
            description: t('about.cards.backend.description'),
            actionText: t('about.cards.action'),
            onClick: () => scrollTo('skills'),
            colorClass: "green",
            ariaLabel: t('about.cards.backend.ariaLabel'),
            delay: 0.3
        },
        {
            icon: Layers,
            title: t('about.cards.softSkills.title'),
            description: t('about.cards.softSkills.description'),
            actionText: t('about.cards.action'),
            onClick: () => scrollTo('skills'),
            colorClass: "orange",
            ariaLabel: t('about.cards.softSkills.ariaLabel'),
            delay: 0.4
        }
    ], [t, scrollTo]);

    // Estatísticas
    const stats = [
        {
            value: "3+",
            label: t('about.stats.experience'),
            colorClass: "blue"
        },
        {
            value: "30+",
            label: t('about.stats.projects'),
            colorClass: "purple"
        },
        {
            value: "15+",
            label: t('about.stats.clients'),
            colorClass: "green"
        },
        {
            value: "99%",
            label: t('about.stats.satisfaction'),
            colorClass: "pink"
        }
    ];

    // Áreas de expertise
    const expertiseItems = [
        {
            icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
            label: t('about.expertise.frontend'),
            colorClass: "blue"
        },
        {
            icon: <Terminal className="w-5 h-5 md:w-6 md:h-6" />,
            label: t('about.expertise.backend'),
            colorClass: "purple"
        },
        {
            icon: <Palette className="w-5 h-5 md:w-6 md:h-6" />,
            label: t('about.expertise.design'),
            colorClass: "green"
        },
        {
            icon: <Monitor className="w-5 h-5 md:w-6 md:h-6" />,
            label: t('about.expertise.ux'),
            colorClass: "pink"
        }
    ];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-16 md:py-20 lg:py-24 xl:py-28 bg-transparent overflow-hidden"
            aria-label={t('about.ariaLabel')}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />

            {/* Gradient Blobs */}
            <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
                <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 w-[320px] h-[320px] bg-purple-500/10 dark:bg-purple-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 scale-75" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 lg:gap-20 xl:gap-24">
                    {/* Bio and Introduction */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <AnimatedSection delay={0} animation="fadeUp" className="w-full">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 inline-block mb-4">
                                        {t('about.title')}
                                    </h2>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                        {t('about.devTitle')}
                                    </h3>
                                </div>

                                <div className="space-y-6 text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed md:leading-[1.5]">
                                    <p>{t('about.paragraphs.first')}</p>
                                    <p>{t('about.paragraphs.second')}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <a
                                        href="#contact"
                                        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                                    >
                                        {t('about.cta.contact')}
                                    </a>
                                    <a
                                        href={t('about.cta.resumeUrl')}
                                        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl border-2 border-blue-600 hover:border-blue-700 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 dark:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-lg hover:shadow-blue-500/10"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {t('about.cta.resume')}
                                    </a>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Statistics and Expertise */}
                    <div className="w-full lg:w-1/2 space-y-12">
                        {/* Statistics */}
                        <AnimatedSection delay={0.1} animation="fadeUp" className="w-full">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-white mt-8">
                                {t('about.stats.title')}
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                {stats.map((stat, index) => (
                                    <StatCard
                                        key={index}
                                        value={stat.value}
                                        label={stat.label}
                                        colorClass={stat.colorClass}
                                    />
                                ))}
                            </div>
                        </AnimatedSection>

                        {/* Expertise */}
                        <AnimatedSection delay={0.2} animation="fadeUp">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-white mt-8">
                                {t('about.expertise.title')}
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                {expertiseItems.map((item, index) => (
                                    <ExpertiseItem
                                        key={index}
                                        icon={item.icon}
                                        label={item.label}
                                        colorClass={item.colorClass}
                                    />
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(AboutMe);