import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
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
    const variants = {
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
    };

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

const Skills = () => {
    const { t } = useTranslation();
    const [openSection, setOpenSection] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredStat, setHoveredStat] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    const toggleSection = (sectionId) => {
        setOpenSection(openSection === sectionId ? null : sectionId);
    };

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const skillsSection = document.querySelector("#skills");
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        return () => {
            if (skillsSection) {
                observer.unobserve(skillsSection);
            }
        };
    }, []);

    // Frontend skills
    const frontendSkills = [
        { name: "HTML", percentage: 100 },
        { name: "CSS", percentage: 100 },
        { name: "JavaScript", percentage: 100 },
        { name: "React", percentage: 95 },
        { name: "TailwindCSS", percentage: 95 },
        { name: "Bootstrap", percentage: 90 },
        { name: "Three.js", percentage: 95 },
        { name: "GSAP", percentage: 90 },
    ];

    // Backend skills
    const backendSkills = [
        { name: "Node.js", percentage: 95 },
        { name: "TypeScript", percentage: 95 },
        { name: "Python", percentage: 95 },
        { name: "PHP", percentage: 85 },
        { name: "C#", percentage: 80 },
        { name: "C++", percentage: 70 },
        { name: "SQL", percentage: 90 },
        { name: "MySQL", percentage: 90 },
    ];

    // Tools and design skills
    const toolsSkills = [
        { name: "UX Design", percentage: 100 },
        { name: "Pacotes Office", percentage: 100 },
        { name: "Photoshop", percentage: 95 },
        { name: "Premiere", percentage: 95 },
        { name: "After Effects", percentage: 90 },
        { name: "Illustrator", percentage: 90 },
        { name: "Filmora", percentage: 90 },
        { name: "Canva", percentage: 90 },
        { name: "Figma", percentage: 80 },
    ];

    // Variantes para animações
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        hover: {
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        tap: { scale: 0.98, transition: { duration: 0.1 } }
    };

    const iconVariants = {
        hidden: { rotate: 0, scale: 1 },
        hover: { rotate: [0, -10, 10, 0], scale: 1.2, transition: { duration: 0.5 } },
        expanded: {
            rotate: openSection ? 90 : 0,
            scale: openSection ? 1.1 : 1,
            transition: { duration: 0.4, ease: "anticipate" }
        },
        tap: { scale: 0.9, transition: { duration: 0.1 } }
    };

    const contentVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, delay: 0.1 }
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.2 }
            }
        }
    };

    const SkillBar = ({ name, percentage, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 15
            }}
            transition={{
                duration: 0.5,
                delay: isVisible ? delay * 0.1 : 0,
                ease: "easeOut"
            }}
            className="mb-6"
        >
            <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {name}
                </span>
                <motion.div
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                >
                    <motion.span
                        className="text-sm font-medium text-gray-500 dark:text-gray-400"
                        animate={{
                            color: percentage === 100 ? "#FBBF24" : "#6B7280",
                            transition: { duration: 0.3 }
                        }}
                    >
                        {percentage}%
                    </motion.span>
                    {percentage === 100 && (
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 10 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                    )}
                </motion.div>
            </div>
            <div className="relative w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{
                        width: isVisible ? `${percentage}%` : "0%"
                    }}
                    transition={{
                        duration: 1,
                        delay: isVisible ? 0.2 + delay * 0.1 : 0,
                        ease: "easeOut"
                    }}
                >
                    <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{
                            opacity: isVisible ? [0, 1, 0] : 0,
                            x: isVisible ? [-100, 100, 300] : -100
                        }}
                        transition={{
                            duration: 2,
                            delay: isVisible ? 0.5 + delay * 0.1 : 0,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 3
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );

    const SkillSection = ({ title, icon, skills, id }) => {
        const isExpanded = openSection === id;
        const contentRef = useRef(null);

        // Transformação 3D baseada na posição do mouse
        const transform = !isMobile ?
            `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * -3}deg)` :
            'none';

        return (
            <motion.div
                className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-500"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                style={{ transform }}
            >
                <div className="relative overflow-hidden">
                    {/* Fundo com gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/50 dark:from-slate-800/0 dark:to-blue-900/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Elemento decorativo */}
                    <div className="absolute -right-3 -top-3 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500" />

                    <button
                        onClick={() => toggleSection(id)}
                        className="w-full px-8 py-6 flex items-center justify-between relative z-10"
                    >
                        <div className="flex items-center gap-6">
                            <motion.span
                                className="text-3xl transform origin-center relative"
                                variants={iconVariants}
                                animate={isExpanded ? "expanded" : ""}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                {/* Resplandor do ícone */}
                                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 blur-md group-hover:animate-pulse-slow rounded-full"></div>
                                {icon}
                            </motion.span>
                            <div>
                                <motion.h3
                                    className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300"
                                >
                                    {t(`skills.sections.${id}.title`)}
                                </motion.h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {t(`skills.sections.${id}.experience`)}
                                </p>
                            </div>
                        </div>
                        <motion.div
                            className="text-gray-400 dark:text-gray-500"
                            animate={{
                                color: isExpanded ? "#3B82F6" : "#9CA3AF",
                                rotate: isExpanded ? 180 : 0
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            {openSection === id ? <ChevronUp /> : <ChevronDown />}
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                key={`content-${id}`}
                                ref={contentRef}
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="relative z-10"
                            >
                                <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-700">
                                    {skills.map((skill, index) => (
                                        <SkillBar
                                            key={index}
                                            {...skill}
                                            delay={index}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        );
    };

    // Stats que são mostrados como ícones de emoji
    const StatItem = ({ index, skill }) => {
        const isHovered = hoveredStat === index;
        const emoji = ["👥", "🤝", "💡", "⏱️"][index];

        // Transformação 3D baseada na posição do mouse
        const transform = !isMobile ?
            `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)` :
            'none';

        return (
            <AnimatedSection key={index} delay={0.4 + index * 0.1} className="group">
                <motion.div
                    className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-500"
                    whileHover={{
                        scale: 1.03,
                    }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setHoveredStat(index)}
                    onHoverEnd={() => setHoveredStat(null)}
                    style={{ transform }}
                >
                    {/* Fundo com gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/50 dark:from-slate-800/0 dark:to-blue-900/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Elemento decorativo */}
                    <div className="absolute -right-3 -top-3 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500" />

                    <div className="relative p-8 h-full z-10">
                        <motion.span
                            className="text-4xl mb-6 block relative"
                            initial={{ scale: 1, rotate: 0 }}
                            animate={{
                                scale: isHovered ? 1.2 : 1,
                                rotate: isHovered ? 5 : 0,
                                y: isHovered ? -5 : 0
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 10
                            }}
                        >
                            {/* Resplandor do ícone */}
                            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 blur-md group-hover:animate-pulse-slow rounded-full"></div>
                            {emoji}
                        </motion.span>

                        <motion.h4
                            className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300"
                        >
                            {skill.title}
                        </motion.h4>

                        <motion.p
                            className="text-gray-600 dark:text-gray-300"
                            animate={{
                                opacity: isHovered ? 1 : 0.8,
                                y: isHovered ? 0 : 5
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {skill.description}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatedSection>
        );
    };

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-24 md:py-32"
            aria-label="Minhas Habilidades"
        >
            {/* Fundo dinâmico com gradiente e efeitos - Ajustado para combinar com About */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-gray-50 dark:from-blue-950/30 dark:via-slate-900/90 dark:to-slate-950 -z-10"></div>

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
                {/* Bolha decorativa adicional para conexão com Services - bolha inferior */}
                <div className={`absolute rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl section-boundary-bubble ${isMobile ? 'w-[400px] h-[400px] bottom-[-250px] right-[40%]' : 'w-[800px] h-[800px] bottom-[-500px] right-[35%] transform translate-x-[50%]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) translate(50%, 0)`
                    }}
                />

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
                        <div className="absolute top-[60%] right-[10%] w-12 h-12 border-2 border-yellow-500/30 dark:border-yellow-400/30 rounded-md animate-float-slow transform -rotate-12"
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
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            {t("skills.title")}
                        </h2>
                    </motion.div>

                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        {t("skills.subtitle")}
                    </motion.p>
                </AnimatedSection>

                <motion.div
                    className="grid gap-6 mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        staggerChildren: 0.1,
                        ease: "easeOut"
                    }}
                >
                    <SkillSection
                        title={t("skills.sections.frontend.title")}
                        icon="🎨"
                        skills={frontendSkills}
                        id="frontend"
                    />
                    <SkillSection
                        title={t("skills.sections.backend.title")}
                        icon="⚙️"
                        skills={backendSkills}
                        id="backend"
                    />
                    <SkillSection
                        title={t("skills.sections.tools.title")}
                        icon="🛠️"
                        skills={toolsSkills}
                        id="tools"
                    />
                </motion.div>

                <div className="mt-20">
                    <AnimatedSection delay={0.3}>
                        <motion.h3
                            className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {t("skills.softSkills.title")}
                        </motion.h3>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(
                            t("skills.softSkills.items", { returnObjects: true })
                        ).map(([key, skill], index) => (
                            <StatItem
                                key={key}
                                index={index}
                                skill={skill}
                            />
                        ))}
                    </div>
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
                .perspective-3d {
                    perspective: 1000px;
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
                .animate-float-reverse {
                    animation: float-reverse 5s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Skills;