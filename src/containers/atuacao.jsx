import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import { useTranslation } from 'react-i18next';
import { Code2, Palette, FileText, Box, Camera, Cpu, ChevronRight } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
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
 * Componente de seção animada - memoizado para melhorar performance
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

// Componente memoizado para o fundo
const Background = memo(({ isMobile, mousePosition }) => (
    <>
        {/* Fundo simplificado */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 -z-10"></div>

        {/* Grades */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
            style={{
                backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                               linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                backgroundSize: isMobile ? '40px 40px' : '80px 80px'
            }}
        />

        {/* Formas decorativas simplificadas - bolhas centralizadas */}
        <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: -1, transform: 'translate(-50%, -50%) scale(0.7)' }} />
        </div>
    </>
));

Background.displayName = 'Background';

/**
 * Componente de Card 3D para áreas de atuação - otimizado
 */
const ExpertiseCard3D = memo(({
    icon,
    title,
    description,
    actionText,
    gradient,
    delay,
    index,
    mousePosition,
    isMobile
}) => {
    const Icon = icon;
    const isEven = index % 2 === 0;

    // Extração segura das cores base do gradiente
    let colorFrom = "blue";
    let colorTo = "cyan";

    if (gradient && typeof gradient === 'string') {
        const parts = gradient.split(" ");
        if (parts.length >= 2 && parts[1] && parts[1].startsWith("from-")) {
            colorFrom = parts[1].replace("from-", "").split("-")[0];
        }
        if (parts.length >= 3 && parts[2] && parts[2].startsWith("to-")) {
            colorTo = parts[2].replace("to-", "").split("-")[0];
        }
    }

    // Transformação 3D simplificada
    const transform = !isMobile ?
        `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)` :
        'none';

    return (
        <AnimatedSection
            delay={delay}
            className="group h-full"
            threshold={0.1}
        >
            <motion.div
                className="relative h-full perspective"
                style={{ transform }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative h-full p-6 md:p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Efeito de borda inferior simplificado */}
                    <div className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Fundo simplificado */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/0 to-${colorFrom}-50/30 dark:from-slate-800/0 dark:to-${colorFrom}-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="relative flex flex-col items-center text-center h-full">
                        {/* Ícone com gradiente - efeitos simplificados */}
                        <div className={`relative mb-6 p-5 md:p-6 rounded-full bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-105 z-10`}>
                            <Icon strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10 relative z-10" aria-hidden="true" />
                        </div>

                        {/* Título simplificado */}
                        <h3 className="text-gray-800 dark:text-gray-100 text-xl md:text-2xl font-bold mb-4 transition-colors duration-300 z-10">
                            {title}
                        </h3>

                        {/* Descrição */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                            {description}
                        </p>

                        {/* Botão simplificado */}
                        <button
                            type="button"
                            className={`flex items-center text-${colorFrom}-500 dark:text-${colorFrom}-400 font-medium hover:underline mt-auto`}
                        >
                            {actionText}
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatedSection>
    );
});

ExpertiseCard3D.displayName = 'ExpertiseCard3D';

const ExpertiseAreas = () => {
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    // Detectar dispositivo móvel com callback memoizado
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

    // Efeito de paralaxe com mouse otimizado
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

    // Memoizando os dados para evitar re-renderizações
    const expertiseItems = useMemo(() => [
        {
            icon: Code2,
            title: t('expertise.items.item0.title'),
            description: t('expertise.items.item0.description'),
            actionText: t('expertise.learnMore'),
            gradient: "from-blue-500 to-cyan-500",
            delay: 0.1
        },
        {
            icon: Palette,
            title: t('expertise.items.item1.title'),
            description: t('expertise.items.item1.description'),
            actionText: t('expertise.learnMore'),
            gradient: "from-purple-500 to-pink-500",
            delay: 0.2
        },
        {
            icon: FileText,
            title: t('expertise.items.item2.title'),
            description: t('expertise.items.item2.description'),
            actionText: t('expertise.learnMore'),
            gradient: "from-orange-500 to-red-500",
            delay: 0.3
        },
        {
            icon: Box,
            title: t('expertise.items.item3.title'),
            description: t('expertise.items.item3.description'),
            actionText: t('expertise.learnMore'),
            gradient: "from-green-500 to-teal-500",
            delay: 0.4
        },
        {
            icon: Cpu,
            title: t('expertise.items.item4.title'),
            description: t('expertise.items.item4.description'),
            actionText: t('expertise.learnMore'),
            gradient: "from-blue-500 to-indigo-500",
            delay: 0.5
        },
        {
            icon: Camera,
            title: t('expertise.items.item5.title'),
            description: t('expertise.items.item5.description'),
            actionText: t('expertise.learnMore'),
            gradient: "from-pink-500 to-purple-500",
            delay: 0.6
        }
    ], [t]);

    return (
        <section
            ref={sectionRef}
            id="areas"
            className="relative py-16 md:py-24 bg-transparent overflow-hidden"
            aria-labelledby="expertise-heading"
        >
            {/* Fundo simplificado e memoizado */}
            <Background isMobile={isMobile} mousePosition={mousePosition} />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <AnimatedSection className="text-center mb-12 md:mb-16">
                    <h2
                        id="expertise-heading"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                    >
                        {t('expertise.title')}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        {t('expertise.subtitle')}
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {expertiseItems.map((item, index) => (
                        <ExpertiseCard3D
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            actionText={item.actionText}
                            gradient={item.gradient}
                            delay={item.delay}
                            index={index}
                            mousePosition={mousePosition}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(ExpertiseAreas);