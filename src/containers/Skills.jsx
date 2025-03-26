import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";

// Componente para animações de entrada
const AnimatedSection = ({ children, delay = 0, className = "" }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

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
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            }}
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
    const skillsRef = useRef(null);

    const toggleSection = (sectionId) => {
        setOpenSection(openSection === sectionId ? null : sectionId);
    };

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

        const skillsSection = document.querySelector("#skills-section");
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        return () => {
            if (skillsSection) {
                observer.unobserve(skillsSection);
            }
        };
    }, []);

    const frontendSkills = [
        { name: "HTML", percentage: 100 },
        { name: "CSS", percentage: 100 },
        { name: "JavaScript", percentage: 100 },
        { name: "React", percentage: 95 },
    ];

    const backendSkills = [
        { name: "PHP", percentage: 85 },
        { name: "Node.js", percentage: 90 },
        { name: "Python", percentage: 95 },
        { name: "C#", percentage: 20 }
    ];

    const toolsSkills = [
        { name: "After Effects", percentage: 90 },
        { name: "Bootstrap", percentage: 90 },
        { name: "Canva", percentage: 90 },
        { name: "Figma", percentage: 80 },
        { name: "Filmora", percentage: 90 },
        { name: "Illustrator", percentage: 90 },
        { name: "MySQL", percentage: 90 },
        { name: "Pacotes Office", percentage: 100 },
        { name: "Photoshop", percentage: 95 },
        { name: "Premiere", percentage: 95 },
        { name: "UX Design", percentage: 100 },
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

        return (
            <motion.div
                className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
            >
                <motion.div
                    className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/30 dark:from-slate-700/0 dark:to-blue-900/20 rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />

                <div className="relative">
                    <button
                        onClick={() => toggleSection(id)}
                        className="w-full px-8 py-6 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <motion.span
                                className="text-3xl transform origin-center"
                                variants={iconVariants}
                                animate={isExpanded ? "expanded" : ""}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                {icon}
                            </motion.span>
                            <div>
                                <motion.h3
                                    className="text-xl font-bold text-gray-900 dark:text-white"
                                    animate={{
                                        background: isExpanded ?
                                            "linear-gradient(to right, #3B82F6, #8B5CF6)" : "none",
                                        backgroundClip: isExpanded ? "text" : "border-box",
                                        WebkitBackgroundClip: isExpanded ? "text" : "text",
                                        WebkitTextFillColor: isExpanded ? "transparent" : "inherit",
                                        transition: { duration: 0.3 }
                                    }}
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

        return (
            <AnimatedSection key={index} delay={0.4 + index * 0.1} className="group">
                <motion.div
                    className="relative h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg"
                    whileHover={{
                        scale: 1.03,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setHoveredStat(index)}
                    onHoverEnd={() => setHoveredStat(null)}
                >
                    <motion.div
                        className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    />

                    <div className="relative p-8 h-full">
                        <motion.span
                            className="text-4xl mb-6 block"
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
                            {emoji}
                        </motion.span>

                        <motion.h4
                            className="text-lg font-bold text-gray-900 dark:text-white mb-4"
                            animate={{
                                background: isHovered ?
                                    "linear-gradient(to right, #3B82F6, #8B5CF6)" : "none",
                                backgroundClip: isHovered ? "text" : "border-box",
                                WebkitBackgroundClip: isHovered ? "text" : "text",
                                WebkitTextFillColor: isHovered ? "transparent" : "inherit",
                                scale: isHovered ? 1.02 : 1
                            }}
                            transition={{ duration: 0.3 }}
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
            id="skills-section"
            ref={skillsRef}
            className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-blue-50/70 dark:from-slate-900/60 dark:to-slate-900/60"
        >

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                        dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                        {t("skills.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t("skills.subtitle")}
                    </p>
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
                            className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 
                                dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-12"
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
        </section>
    );
};

export default Skills;