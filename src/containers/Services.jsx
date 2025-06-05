import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import { Globe, Palette, FileText, Box, Laptop, Video } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
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
    isMobile
}) => {
    const Icon = icon;

    // Map de gradientes seguros para Tailwind
    const gradientMap = {
        "from-blue-500 to-cyan-500": {
            gradientClass: "from-blue-500 to-cyan-500",
            textColor: "text-blue-500 dark:text-blue-400",
            hoverBg: "bg-blue-50 dark:bg-blue-900/20"
        },
        "from-purple-500 to-pink-500": {
            gradientClass: "from-purple-500 to-pink-500",
            textColor: "text-purple-500 dark:text-purple-400",
            hoverBg: "bg-purple-50 dark:bg-purple-900/20"
        },
        "from-orange-500 to-red-500": {
            gradientClass: "from-orange-500 to-red-500",
            textColor: "text-orange-500 dark:text-orange-400",
            hoverBg: "bg-orange-50 dark:bg-orange-900/20"
        },
        "from-green-500 to-teal-500": {
            gradientClass: "from-green-500 to-teal-500",
            textColor: "text-green-500 dark:text-green-400",
            hoverBg: "bg-green-50 dark:bg-green-900/20"
        },
        "from-blue-500 to-indigo-500": {
            gradientClass: "from-blue-500 to-indigo-500",
            textColor: "text-blue-500 dark:text-blue-400",
            hoverBg: "bg-blue-50 dark:bg-blue-900/20"
        },
        "from-red-500 to-purple-500": {
            gradientClass: "from-red-500 to-purple-500",
            textColor: "text-red-500 dark:text-red-400",
            hoverBg: "bg-red-50 dark:bg-red-900/20"
        }
    };

    // Buscar o gradiente seguro para Tailwind
    const safeGradient = gradientMap[gradient] || gradientMap["from-blue-500 to-cyan-500"];

    // Transformação 3D baseada na posição do mouse - simplificada para melhor performance
    const transform = !isMobile ?
        `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)` :
        'none';

    return (
        <AnimatedSection
            delay={delay}
            className="group h-full w-full"
            threshold={0.1}
        >
            <motion.div
                className="relative h-full perspective cursor-pointer"
                style={{ transform }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md flex flex-col">
                    {/* Borda de acento superior com gradiente */}
                    <div className={`h-1 w-full bg-gradient-to-r ${safeGradient.gradientClass}`}></div>

                    <div className="p-5 sm:p-6 lg:p-8 flex flex-col items-center text-center h-full">
                        {/* Ícone com gradiente */}
                        <div className={`mb-6 p-4 rounded-full bg-gradient-to-br ${safeGradient.gradientClass} text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                            <Icon strokeWidth={1.5} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" aria-hidden="true" />
                        </div>

                        {/* Título */}
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100 transition-colors duration-300">
                            {title}
                        </h3>

                        {/* Descrição */}
                        <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                            <p>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatedSection>
    );
});

ServiceCard3D.displayName = 'ServiceCard3D';

// Componente memoizado para o fundo
const Background = memo(({ isMobile }) => (
    <div className="absolute inset-0 -z-10">
        {/* Grade de fundo responsiva */}
        <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
            style={{
                backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                               linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                backgroundSize: isMobile ? '2rem 2rem' : '5rem 5rem'
            }}
        />

        {/* Elipse de destaque sutíl no fundo */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-3xl" />
    </div>
));

Background.displayName = 'Background';

// Componente para o botão do WhatsApp
const WhatsAppButton = memo(({ t, isHovered }) => (
    <a
        href="https://wa.me/qr/KW2XXA46XAXNH1"
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 sm:px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        aria-label={t('services.whatsappButton')}
    >
        <FaWhatsapp className="text-lg sm:text-xl" />
        <span className="font-medium whitespace-nowrap overflow-hidden text-sm sm:text-base">
            {t('services.whatsappText')}
        </span>
    </a>
));

WhatsAppButton.displayName = 'WhatsAppButton';

const Services = () => {
    const { t } = useTranslation();
    const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
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
            id="areas"
            ref={sectionRef}
            className="relative py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden"
            aria-label={t('services.ariaLabel')}
        >
            {/* Fundo dinâmico */}
            <Background isMobile={isMobile} />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                {/* Cabeçalho da seção */}
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {t('services.title')}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                        {t('services.subtitle')}
                    </p>
                </AnimatedSection>

                {/* Grid de serviços com layout responsivo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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
                        />
                    ))}
                </div>

                {/* CTA da seção */}
                <AnimatedSection delay={0.4} className="text-center mt-16 sm:mt-20">
                    <a
                        href="https://wa.me/5571984393235"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onMouseEnter={() => setIsWhatsAppHovered(true)}
                        onMouseLeave={() => setIsWhatsAppHovered(false)}
                    >
                        <FaWhatsapp className="w-6 h-6" aria-hidden="true" />
                        <span className="text-lg">{t('services.whatsappButton')}</span>
                    </a>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                        {t('services.whatsappText')}
                    </p>
                </AnimatedSection>
            </div>

        </section>
    );
};

export default memo(Services);