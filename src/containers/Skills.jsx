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

    // Variantes para animações - transições estáticas
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const contentVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                height: { duration: 0.6, ease: "easeInOut" },
                opacity: { duration: 0.5, delay: 0.1 }
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3 }
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
                <div className="flex items-center gap-1">
                    <span
                        className={`text-sm font-medium ${percentage === 100 ? "text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}
                    >
                        {percentage}%
                    </span>
                    {percentage === 100 && (
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                    )}
                </div>
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
                />
            </div>
        </motion.div>
    );

    const SkillSection = ({ title, icon, skills, id }) => {
        const isExpanded = openSection === id;
        const contentRef = useRef(null);

        return (
            <motion.div
                className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="relative overflow-hidden">
                    <button
                        onClick={() => toggleSection(id)}
                        className="w-full px-8 py-6 flex items-center justify-between relative z-10"
                    >
                        <div className="flex items-center gap-6">
                            <span className="text-3xl">
                                {icon}
                            </span>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                    {t(`skills.sections.${id}.title`)}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {t(`skills.sections.${id}.experience`)}
                                </p>
                            </div>
                        </div>
                        <div
                            className={`transition-transform duration-300 ${openSection === id ? "text-blue-500 rotate-180" : "text-gray-400 dark:text-gray-500"}`}
                        >
                            <ChevronDown />
                        </div>
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
        const emoji = ["👥", "🤝", "💡", "⏱️"][index];

        return (
            <AnimatedSection key={index} delay={0.4 + index * 0.1} className="group">
                <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl">
                    <div className="relative p-8 h-full z-10">
                        <span className="text-4xl mb-6 block">
                            {emoji}
                        </span>

                        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                            {skill.title}
                        </h4>

                        <p className="text-gray-600 dark:text-gray-300">
                            {skill.description}
                        </p>
                    </div>
                </div>
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
            {/* Fundo estático simples */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-gray-50 dark:from-blue-950/30 dark:via-slate-900/90 dark:to-slate-950 -z-10"></div>

            {/* Grades simplificadas */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                                    linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                        {t("skills.title")}
                    </h2>

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
                        <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-12">
                            {t("skills.softSkills.title")}
                        </h3>
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
        </section>
    );
};

export default Skills;