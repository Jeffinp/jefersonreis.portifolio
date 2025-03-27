import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { User, Palette, ChevronRight, Cpu, Code, Terminal, Layers, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";

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
 * Componente de Card 3D que destaca habilidades ou características
 */
const FeatureCard3D = React.memo(({
    icon,
    title,
    description,
    actionText,
    onClick,
    colorFrom = "blue",
    colorTo = "purple",
    delay,
    index,
    ariaLabel,
    mousePosition,
    isMobile
}) => {
    const Icon = icon;
    const isEven = index % 2 === 0;

    // Gradiente baseado nas cores fornecidas
    const gradientStyle = `from-${colorFrom}-400 via-${colorTo}-500 to-${colorFrom}-600 dark:from-${colorFrom}-600 dark:via-${colorTo}-500 dark:to-${colorFrom}-700`;

    // Mapear as cores para as classes corretas do botão e títulos
    const colorClasses = {
        blue: {
            button: "text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300",
            title: "text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400",
            icon: "text-white"
        },
        green: {
            button: "text-green-500 dark:text-green-400 group-hover:text-green-600 dark:group-hover:text-green-300",
            title: "text-gray-800 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400",
            icon: "text-white"
        },
        purple: {
            button: "text-purple-500 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300",
            title: "text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400",
            icon: "text-white"
        },
        cyan: {
            button: "text-cyan-500 dark:text-cyan-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300",
            title: "text-gray-800 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
            icon: "text-white"
        },
        pink: {
            button: "text-pink-500 dark:text-pink-400 group-hover:text-pink-600 dark:group-hover:text-pink-300",
            title: "text-gray-800 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400",
            icon: "text-white"
        }
    };

    // Usar as classes correspondentes ou fallback para azul
    const buttonColorClass = colorClasses[colorFrom]?.button || colorClasses.blue.button;
    const titleColorClass = colorClasses[colorFrom]?.title || colorClasses.blue.title;
    const iconColorClass = colorClasses[colorFrom]?.icon || colorClasses.blue.icon;

    // Transformação 3D baseada na posição do mouse
    const transform = !isMobile ?
        `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg) scale3d(1, 1, 1)` :
        'perspective(1000px) scale3d(1, 1, 1)';

    return (
        <AnimatedSection
            delay={delay}
            className="group h-full transform-gpu transition-transform duration-300"
            threshold={0.1}
            aria-labelledby={`feature-title-${index}`}
        >
            <motion.div
                className="relative h-full perspective"
                style={{ transform }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-white/10 dark:from-white/10 dark:to-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 transform-gpu translate-z-4"></div>

                <div className="relative h-full p-6 md:p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Efeito de borda inferior com gradiente */}
                    <div className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Fundo com gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/50 dark:from-slate-800/0 dark:to-blue-900/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Elemento decorativo */}
                    <div className="absolute -right-3 -top-3 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500" />

                    <div className="relative flex flex-col items-center text-center h-full">
                        {/* Ícone com gradiente e efeito flutuante */}
                        <div className={`relative mb-6 p-5 md:p-6 rounded-full bg-gradient-to-br ${gradientStyle} ${iconColorClass} shadow-lg transform group-hover:scale-110 transition-all duration-700 z-10 overflow-hidden`}>
                            {/* Resplandor do ícone */}
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 blur-md group-hover:animate-pulse-slow rounded-full"></div>

                            {/* Efeito de partículas no ícone (apenas em desktop) */}
                            {!isMobile && (
                                <>
                                    <span className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full group-hover:animate-particle-1"></span>
                                    <span className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-white rounded-full group-hover:animate-particle-2"></span>
                                    <span className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white rounded-full group-hover:animate-particle-3"></span>
                                </>
                            )}

                            <Icon strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10 relative z-10" aria-hidden="true" />
                        </div>

                        {/* Título com efeito de destaque e cor de texto corrigida */}
                        <h3
                            id={`feature-title-${index}`}
                            className={`relative ${titleColorClass} text-xl md:text-2xl font-bold mb-4 transition-colors duration-300 inline-block z-10`}
                        >
                            {/* Linha decorativa sob o título */}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-${colorFrom}-400 dark:bg-${colorFrom}-500 group-hover:w-full transition-all duration-300 ease-out rounded-full`}></span>
                            {title}
                        </h3>

                        {/* Descrição */}
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                            {description}
                        </p>

                        {/* Botão de ação com efeito de deslizamento */}
                        <button
                            type="button"
                            onClick={onClick}
                            className={`group relative flex items-center ${buttonColorClass} font-medium transition-all duration-300 mt-auto overflow-hidden py-2 px-3 rounded-lg`}
                            aria-label={ariaLabel || actionText}
                        >
                            {/* Fundo hover */}
                            <span className={`absolute inset-0 bg-${colorFrom}-100 dark:bg-${colorFrom}-900/30 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>

                            <span className="relative flex items-center">
                                {actionText}
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                            </span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatedSection>
    );
});

FeatureCard3D.displayName = 'FeatureCard3D';

/**
 * Componente principal About
 */
const AboutMe = () => {
    const { t } = useTranslation();
    const scrollToSection = useSmothScroll();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    // Detectar dispositivo móvel
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Efeito de paralaxe com mouse (apenas em desktop)
    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePosition({
                x: (x / rect.width) - 0.5,
                y: (y / rect.height) - 0.5
            });
        };

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

    // Cards de características expandidos
    const featureCards = useMemo(() => [
        {
            icon: Code,
            title: t("about.devTitle"),
            description: t("about.devDescription"),
            actionText: t("about.learnMore"),
            onClick: () => scrollToSection('skills'),
            colorFrom: "blue",
            colorTo: "cyan",
            delay: 0.2,
            index: 0,
            ariaLabel: "Saiba mais sobre minhas habilidades como desenvolvedor"
        },
        {
            icon: Palette,
            title: t("about.designTitle"),
            description: t("about.designDescription"),
            actionText: t("about.learnMore"),
            onClick: () => scrollToSection('portfolio'),
            colorFrom: "purple",
            colorTo: "pink",
            delay: 0.3,
            index: 1,
            ariaLabel: "Saiba mais sobre minhas habilidades como designer"
        },
        {
            icon: Terminal,
            title: t("about.backendTitle") || "Backend",
            description: t("about.backendDescription") || "Desenvolvimento de APIs robustas, sistemas escaláveis e integração com bancos de dados.",
            actionText: t("about.learnMore"),
            onClick: () => scrollToSection('skills'),
            colorFrom: "green",
            colorTo: "blue",
            delay: 0.4,
            index: 2,
            ariaLabel: "Saiba mais sobre minhas habilidades como desenvolvedor backend"
        },
        {
            icon: Layers,
            title: t("about.architectureTitle") || "Arquitetura",
            description: t("about.architectureDescription") || "Planejamento e implementação de arquiteturas eficientes e escaláveis para aplicações web e mobile.",
            actionText: t("about.learnMore"),
            onClick: () => scrollToSection('experience'),
            colorFrom: "pink",
            colorTo: "purple",
            delay: 0.5,
            index: 3,
            ariaLabel: "Saiba mais sobre minha experiência com arquitetura de software"
        }
    ], [t, scrollToSection]);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-24 md:py-32"
            aria-label="Sobre mim"
        >
            {/* Fundo dinâmico com gradiente e efeitos - Ajustado para transição com Skills */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-blue-50/50 dark:from-slate-950 dark:via-slate-900/90 dark:to-blue-950/30 -z-10"></div>

            {/* Grades e elementos decorativos */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                                    linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />

            {/* Formas decorativas flutuantes com movimento de paralaxe */}
            <div className="absolute inset-0 overflow-visible pointer-events-none -z-10">
                {/* Círculos com gradiente e blur */}
                <div className={`absolute rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl ${isMobile ? 'w-[300px] h-[300px] -top-[150px] -right-[150px]' : 'w-[600px] h-[600px] -top-[300px] -right-[300px]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
                    }}
                />
                <div className={`absolute rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-3xl ${isMobile ? 'w-[250px] h-[250px] -bottom-[150px] -left-[100px]' : 'w-[500px] h-[500px] -bottom-[250px] -left-[250px]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
                    }}
                />
                <div className={`absolute rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl ${isMobile ? 'w-[200px] h-[200px] top-[30%] -left-[100px]' : 'w-[400px] h-[400px] top-[30%] -left-[200px]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
                    }}
                />

                {/* Formas geométricas animadas */}
                {!isMobile && (
                    <>
                        <div className="absolute top-20 left-[15%] w-10 h-10 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-md animate-float-slow transform rotate-12"
                            style={{
                                transform: `rotate(12deg) translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`
                            }}
                        />
                        <div className="absolute top-[40%] right-[20%] w-14 h-14 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-full animate-float-reverse transform -rotate-12"
                            style={{
                                transform: `rotate(-12deg) translate(${mousePosition.x * 35}px, ${mousePosition.y * 35}px)`
                            }}
                        />
                        <div className="absolute bottom-[30%] left-[25%] w-16 h-16 border-2 border-cyan-500/30 dark:border-cyan-400/30 rounded-lg animate-float transform rotate-45"
                            style={{
                                transform: `rotate(45deg) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
                            }}
                        />
                        <div className="absolute top-[60%] right-[10%] w-12 h-12 border-2 border-green-500/30 dark:border-green-400/30 rounded-md animate-float-slow transform -rotate-12"
                            style={{
                                transform: `rotate(-12deg) translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
                            }}
                        />
                    </>
                )}

                {/* Formas simplificadas para mobile */}
                {isMobile && (
                    <>
                        <div className="absolute top-20 right-10 w-8 h-8 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-md animate-float-slow" />
                        <div className="absolute bottom-40 left-10 w-10 h-10 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-full animate-float" />
                    </>
                )}

                {/* Bolha decorativa adicional para conexão com Skills */}
                <div className={`absolute rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl section-boundary-bubble ${isMobile ? 'w-[400px] h-[400px] bottom-[-250px] left-[40%]' : 'w-[800px] h-[800px] bottom-[-500px] left-[35%] transform translate-x-[-50%]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) translate(-50%, 0)`
                    }}
                />
            </div>

            {/* Barra de destaque superior */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 dark:from-blue-500 dark:via-purple-500 dark:to-cyan-500" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho da seção com efeito 3D */}
                <AnimatedSection className="text-center mb-16 md:mb-20">
                    <motion.div
                        className="perspective-3d inline-block"
                        animate={{
                            rotateX: [0, 2, 0],
                            rotateY: [0, -2, 0]
                        }}
                        transition={{
                            duration: 6,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            {t("about.title")}
                        </h2>
                    </motion.div>

                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        {t("about.intro")}
                    </motion.p>
                </AnimatedSection>

                {/* Cards de características com grid responsivo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {featureCards.map((card, index) => (
                        <FeatureCard3D
                            key={`feature-${index}`}
                            {...card}
                            mousePosition={mousePosition}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </div>

            {/* Estilos CSS para animações adicionais */}
            <style>{`
                @keyframes particle-1 {
                    0%, 100% { transform: translate(0, 0); opacity: 1; }
                    50% { transform: translate(-10px, -10px); opacity: 0; }
                }
                @keyframes particle-2 {
                    0%, 100% { transform: translate(0, 0); opacity: 1; }
                    50% { transform: translate(10px, -15px); opacity: 0; }
                }
                @keyframes particle-3 {
                    0%, 100% { transform: translate(0, 0); opacity: 1; }
                    50% { transform: translate(7px, 15px); opacity: 0; }
                }
                .animate-particle-1 {
                    animation: particle-1 2s ease-in-out infinite;
                }
                .animate-particle-2 {
                    animation: particle-2 2.5s ease-in-out infinite;
                }
                .animate-particle-3 {
                    animation: particle-3 3s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .perspective {
                    perspective: 1000px;
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
                .animate-float-reverse {
                    animation: float-reverse 5s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default AboutMe;
