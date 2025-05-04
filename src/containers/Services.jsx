import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import { Globe, Palette, FileText, Box, Laptop, Video, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
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
 * Componente de seção animada - memoizado para evitar re-renderizações
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
 * Componente de card de serviço com efeito 3D - memoizado para melhorar performance
 */
const ServiceCard3D = memo(({
    icon,
    title,
    description,
    gradient,
    delay,
    index,
    mousePosition,
    isMobile,
    expanded,
    onToggle,
    actionText
}) => {
    const Icon = icon;
    const isEven = index % 2 === 0;
    const isExpanded = expanded === index;

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

    // Transformação 3D baseada na posição do mouse - simplificada para melhor performance
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
                className="relative h-full perspective cursor-pointer"
                style={{ transform }}
                onClick={() => onToggle(index)}
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

                        {/* Título */}
                        <h3 className="text-gray-800 dark:text-gray-100 text-xl md:text-2xl font-bold mb-4 transition-colors duration-300 z-10">
                            {title}
                        </h3>

                        {/* Descrição */}
                        <motion.p
                            className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow"
                            animate={{
                                height: isExpanded ? 'auto' : '3.6rem',
                                overflow: isExpanded ? 'visible' : 'hidden',
                                textOverflow: isExpanded ? 'clip' : 'ellipsis'
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {description}
                        </motion.p>

                        {/* Botão "Saiba mais" simplificado */}
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

ServiceCard3D.displayName = 'ServiceCard3D';

// Componente memoizado para o fundo
const Background = memo(({ isMobile, mousePosition }) => (
    <>
        {/* Grades */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
            style={{
                backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                               linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                backgroundSize: isMobile ? '40px 40px' : '80px 80px'
            }}
        />
    </>
));

Background.displayName = 'Background';

// Componente para o botão do WhatsApp
const WhatsAppButton = memo(({ t, isHovered }) => (
    <a
        href="https://wa.me/qr/KW2XXA46XAXNH1"
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        aria-label={t('services.whatsappButton')}
    >
        <FaWhatsapp className="text-xl" />
        <AnimatePresence>
            {isHovered && (
                <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="font-medium whitespace-nowrap overflow-hidden"
                >
                    {t('services.whatsappText')}
                </motion.span>
            )}
        </AnimatePresence>
    </a>
));

WhatsAppButton.displayName = 'WhatsAppButton';

const Services = () => {
    const { t } = useTranslation();
    const [expandedCard, setExpandedCard] = useState(null);
    const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    // Detectar dispositivo móvel com callback memoizado
    const checkMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Handler memoizado para alternar expansão dos cards
    const handleCardToggle = useCallback((index) => {
        setExpandedCard(expandedCard === index ? null : index);
    }, [expandedCard]);

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

    // Memoizando os dados de serviços para evitar recálculos
    const serviceItems = useMemo(() => [
        {
            icon: Globe,
            title: t('services.items.web.title'),
            description: t('services.items.web.description'),
            gradient: "from-blue-500 to-cyan-500",
            delay: 0.1
        },
        {
            icon: Palette,
            title: t('services.items.design.title'),
            description: t('services.items.design.description'),
            gradient: "from-purple-500 to-pink-500",
            delay: 0.2
        },
        {
            icon: FileText,
            title: t('services.items.documentation.title'),
            description: t('services.items.documentation.description'),
            gradient: "from-orange-500 to-red-500",
            delay: 0.3
        },
        {
            icon: Box,
            title: t('services.items.modeling.title'),
            description: t('services.items.modeling.description'),
            gradient: "from-green-500 to-teal-500",
            delay: 0.4
        },
        {
            icon: Laptop,
            title: t('services.items.support.title'),
            description: t('services.items.support.description'),
            gradient: "from-blue-500 to-indigo-500",
            delay: 0.5
        },
        {
            icon: Video,
            title: t('services.items.video.title'),
            description: t('services.items.video.description'),
            gradient: "from-red-500 to-purple-500",
            delay: 0.6
        }
    ], [t]);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="relative py-16 md:py-24 bg-transparent overflow-hidden"
            aria-label={t('services.ariaLabel')}
        >
            {/* Fundo de quadrados alinhados igual ao padrão das outras seções */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />

            {/* Fundo dinâmico - simplificado e memoizado */}
            <Background isMobile={isMobile} mousePosition={mousePosition} />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <AnimatedSection className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {t('services.title')}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {t('services.subtitle')}
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {serviceItems.map((service, index) => (
                        <ServiceCard3D
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            gradient={service.gradient}
                            delay={service.delay}
                            index={index}
                            mousePosition={mousePosition}
                            isMobile={isMobile}
                            expanded={expandedCard}
                            onToggle={handleCardToggle}
                            actionText={t('services.learnMore')}
                        />
                    ))}
                </div>

                <AnimatedSection delay={0.4} className="text-center mt-16">
                    <a
                        href="/assets/catalogo-jeffinp.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onMouseEnter={() => setIsWhatsAppHovered(true)}
                        onMouseLeave={() => setIsWhatsAppHovered(false)}
                    >
                        <FileText className="w-5 h-5" aria-hidden="true" />
                        {t('services.downloadButton')}
                    </a>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        {t('services.downloadDescription')}
                    </p>
                </AnimatedSection>
            </div>

        </section>
    );
};

export default memo(Services);