import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { ChevronDown, ChevronUp, Sparkles, Code, Terminal, Cpu } from "lucide-react";
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
});

AnimatedSection.displayName = 'AnimatedSection';

// Componente memoizado para barras de skills
const SkillBar = memo(({ name, percentage, delay, isVisible }) => (
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
));

SkillBar.displayName = 'SkillBar';

// Componente memoizado para seções de skills
const SkillSection = memo(({ title, icon, skills, id, openSection, toggleSection, isVisible }) => {
    const isExpanded = openSection === id;

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

    return (
        <motion.div
            className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
                                {title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {id === 'frontend' ? 'Frontend Development' :
                                    id === 'backend' ? 'Backend Development' :
                                        'Design Tools & Office'}
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
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative z-10"
                        >
                            <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-700">
                                {skills.map((skill, index) => (
                                    <SkillBar
                                        key={`${id}-${index}`}
                                        name={skill.name}
                                        percentage={skill.percentage}
                                        delay={index}
                                        isVisible={isVisible}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
});

SkillSection.displayName = 'SkillSection';

// Componente memoizado para itens de estatísticas
const StatItem = memo(({ index, skill }) => {
    const emoji = ["👥", "🤝", "💡", "⏱️"][index];

    return (
        <AnimatedSection key={index} delay={0.2 + index * 0.1} className="group">
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
});

StatItem.displayName = 'StatItem';

// Dados das habilidades memoizados
const getFrontendSkills = (t) => [
    { name: "HTML/CSS", percentage: 100 },
    { name: "JavaScript/TypeScript", percentage: 95 },
    { name: "React.js", percentage: 90 },
    { name: "Next.js", percentage: 85 },
    { name: "Vue.js", percentage: 75 },
    { name: "Tailwind CSS", percentage: 95 },
    { name: "Bootstrap", percentage: 90 },
    { name: "Responsive Design", percentage: 95 },
];

const getBackendSkills = (t) => [
    { name: "Node.js", percentage: 85 },
    { name: "Express.js", percentage: 80 },
    { name: "API Development", percentage: 85 },
    { name: "Python", percentage: 80 },
    { name: "Django", percentage: 65 },
    { name: "MySQL/MongoDB", percentage: 75 },
    { name: "Firebase", percentage: 70 },
];

const getDesignSkills = (t) => [
    { name: "Adobe Photoshop", percentage: 95 },
    { name: "Illustrator", percentage: 90 },
    { name: "Figma", percentage: 85 },
    { name: "UI/UX Design", percentage: 85 },
    { name: "Blender", percentage: 70 },
    { name: "Office Suite", percentage: 95 },
];

const getSoftSkills = (t) => [
    {
        title: t('skills.softSkills.items.communication.title'),
        description: t('skills.softSkills.items.communication.description'),
    },
    {
        title: t('skills.softSkills.items.teamwork.title'),
        description: t('skills.softSkills.items.teamwork.description'),
    },
    {
        title: t('skills.softSkills.items.problemSolving.title'),
        description: t('skills.softSkills.items.problemSolving.description'),
    },
    {
        title: t('skills.softSkills.items.timeManagement.title'),
        description: t('skills.softSkills.items.timeManagement.description'),
    },
];

const Skills = () => {
    const { t } = useTranslation();
    const [openSection, setOpenSection] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    // Dados memoizados
    const frontendSkills = React.useMemo(() => getFrontendSkills(t), [t]);
    const backendSkills = React.useMemo(() => getBackendSkills(t), [t]);
    const designSkills = React.useMemo(() => getDesignSkills(t), [t]);
    const softSkills = React.useMemo(() => getSoftSkills(t), [t]);

    // Handler memoizado para alternar seções
    const toggleSection = useCallback((sectionId) => {
        setOpenSection(openSection === sectionId ? null : sectionId);
    }, [openSection]);

    // Detector de dispositivo móvel com debounce
    const checkMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Inicialização e verificação de visibilidade
    useEffect(() => {
        const handleResize = debounce(() => {
            checkMobile();
        }, 250);

        checkMobile();
        window.addEventListener('resize', handleResize);

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Só definir como visível quando realmente estiver bem visível (50%)
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, [checkMobile]);

    // Abrir a primeira seção após um breve atraso quando a seção se torna visível
    useEffect(() => {
        if (isVisible && !openSection) {
            const timer = setTimeout(() => {
                setOpenSection('frontend');
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isVisible, openSection]);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden"
        >
            {/* Elementos de fundo simplificados */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Cabeçalho da seção */}
                    <AnimatedSection delay={0} className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            {t('skills.title')}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {t('skills.description')}
                        </p>
                    </AnimatedSection>

                    {/* Skills técnicas */}
                    <div className="space-y-6 mb-16">
                        <AnimatedSection delay={0.1}>
                            <SkillSection
                                id="frontend"
                                title={t('skills.sections.frontend.title')}
                                icon={<Code className="text-blue-600 dark:text-blue-400" />}
                                skills={frontendSkills}
                                openSection={openSection}
                                toggleSection={toggleSection}
                                isVisible={isVisible && openSection === "frontend"}
                            />
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <SkillSection
                                id="backend"
                                title={t('skills.sections.backend.title')}
                                icon={<Terminal className="text-green-600 dark:text-green-400" />}
                                skills={backendSkills}
                                openSection={openSection}
                                toggleSection={toggleSection}
                                isVisible={isVisible && openSection === "backend"}
                            />
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <SkillSection
                                id="design"
                                title={t('skills.sections.tools.title')}
                                icon={<Cpu className="text-purple-600 dark:text-purple-400" />}
                                skills={designSkills}
                                openSection={openSection}
                                toggleSection={toggleSection}
                                isVisible={isVisible && openSection === "design"}
                            />
                        </AnimatedSection>
                    </div>

                    {/* Soft skills */}
                    <AnimatedSection delay={0.4} className="mb-8">
                        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
                            {t('skills.softSkills.title')}
                        </h3>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {softSkills.map((skill, index) => (
                            <StatItem key={index} index={index} skill={skill} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(Skills);