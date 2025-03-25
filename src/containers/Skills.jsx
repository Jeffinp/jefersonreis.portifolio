import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView } from "framer-motion";

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

    const SkillBar = ({ name, percentage, delay }) => (
        <div
            className="mb-6 transform translate-y-0 opacity-100 transition-all duration-500 ease-out"
            style={{
                transitionDelay: `${delay}ms`,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                opacity: isVisible ? 1 : 0,
            }}
        >
            <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {name}
                </span>
                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {percentage}%
                    </span>
                    {percentage === 100 && (
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                    )}
                </div>
            </div>
            <div className="relative w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 group-hover:from-blue-400 group-hover:to-purple-400"
                    style={{
                        width: isVisible ? `${percentage}%` : "0%",
                        transitionDelay: `${delay + 200}ms`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>
        </div>
    );

    const SkillSection = ({ title, icon, skills, id }) => (
        <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-500 transform-gpu hover:-rotate-y-1 hover:scale-[1.01]">
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/30 dark:from-slate-700/0 dark:to-blue-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
                <button
                    onClick={() => toggleSection(id)}
                    className="w-full px-8 py-6 flex items-center justify-between"
                >
                    <div className="flex items-center gap-6">
                        <span className="text-3xl transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                            {icon}
                        </span>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent 
                                group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 
                                group-hover:bg-clip-text transition-all duration-300">
                                {t(`skills.sections.${id}.title`)}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {t(`skills.sections.${id}.experience`)}
                            </p>
                        </div>
                    </div>
                    <div className="text-gray-400 dark:text-gray-500 transition-transform duration-300 group-hover:text-blue-500">
                        {openSection === id ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </button>
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openSection === id
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-700">
                        {skills.map((skill, index) => (
                            <SkillBar key={index} {...skill} delay={index * 100} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section
            id="skills-section"
            className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-blue-50/70 dark:from-slate-900/60 dark:to-slate-900/60"
        >


            <div id="skills" aria-hidden="true" className="absolute -z-10 inset-0 overflow-hidden pointer-events-none select-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000" />
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40 animate-blob animation-delay-4000" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/80 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-blob animation-delay-1000" />

                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.03]" />

                {/* Wave pattern at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent" />
                <svg className="absolute bottom-0 fill-blue-100/30 dark:fill-blue-900/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

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

                <div className="grid gap-6 mb-20">
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
                </div>

                <div className="mt-20">
                    <AnimatedSection delay={0.3}>
                        <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 
                            dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-12">
                            {t("skills.softSkills.title")}
                        </h3>
                    </AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(
                            t("skills.softSkills.items", { returnObjects: true })
                        ).map(([key, skill], index) => (
                            <AnimatedSection key={key} delay={0.4 + index * 0.1} className="group perspective">
                                <div className="relative h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:-rotate-y-2 hover:scale-[1.02]">
                                    <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative p-8 h-full">
                                        <span className="text-4xl mb-6 block transform transition-transform duration-300 
                                            group-hover:scale-125 group-hover:rotate-12">
                                            {["👥", "🤝", "💡", "⏱️"][index]}
                                        </span>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent 
                                            group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 
                                            group-hover:bg-clip-text transition-all duration-300">
                                            {skill.title}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {skill.description}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;