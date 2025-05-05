import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { ChevronDown, Sparkles, Code, Terminal, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { debounce } from '../utils';

/**
 * Hook personalizado para gerenciar animações baseadas em visibilidade
 * Otimizado para melhor performance e simplicidade
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
 * Utiliza Tailwind para melhorar a consistência do layout
 */
const AnimatedSection = memo(({
    children,
    delay = 0,
    className = "",
    threshold = 0.2,
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

/**
 * Componente de barra de skills - Visualização de progresso com animação
 * Melhorado com classes Tailwind mais consistentes e melhor contraste
 */
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
        className="mb-4 md:mb-5"
    >
        <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-gray-800 dark:text-gray-200 sm:text-sm">
                {name}
            </span>
            <div className="flex items-center gap-1">
                <span
                    className={`text-xs font-medium sm:text-sm ${percentage === 100
                        ? "text-amber-500 dark:text-amber-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                >
                    {percentage}%
                </span>
                {percentage === 100 && (
                    <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400 sm:w-4 sm:h-4" />
                )}
            </div>
        </div>
        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden sm:h-2.5">
            <motion.div
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500"
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

/**
 * Componente de seção de skills - Container expansível para grupos de habilidades
 * Redesenhado com melhor acessibilidade e consistência visual
 */
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
            className="bg-white dark:bg-slate-800/95 backdrop-blur-sm rounded-lg border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow duration-300 md:rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <button
                onClick={() => toggleSection(id)}
                className="w-full px-4 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 rounded-lg transition-colors md:px-5 md:py-5 md:rounded-xl"
                aria-expanded={isExpanded}
                aria-controls={`content-${id}`}
            >
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="flex-shrink-0 text-xl text-blue-600 dark:text-blue-400 sm:text-2xl md:text-3xl">
                        {icon}
                    </span>
                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white md:text-lg">
                            {title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
                            {id === 'frontend' ? 'Frontend Development' :
                                id === 'backend' ? 'Backend Development' :
                                    'Design Tools & Office'}
                        </p>
                    </div>
                </div>
                <div
                    className={`transform transition-transform duration-300 ${isExpanded
                        ? "text-blue-600 dark:text-blue-400 rotate-180"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        id={`content-${id}`}
                        key={`content-${id}`}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700/50 md:px-5 md:py-5">
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
        </motion.div>
    );
});

SkillSection.displayName = 'SkillSection';

/**
 * Componente de item de estatística - Card para soft skills
 * Redesenhado com melhor hierarquia visual e espaçamento consistente
 */
const StatItem = memo(({ index, skill }) => {
    const emoji = ["👥", "🤝", "💡", "⏱️"][index];

    return (
        <AnimatedSection delay={0.2 + index * 0.1} className="h-full">
            <div className="h-full bg-white dark:bg-slate-800/95 backdrop-blur-sm rounded-lg border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 group md:rounded-xl">
                <div className="p-4 h-full flex flex-col sm:p-5">
                    <span className="text-2xl mb-3 block transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-500 dark:group-hover:text-blue-400 sm:text-3xl md:mb-4">
                        {emoji}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2 md:text-lg">
                        {skill.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-auto sm:text-sm">
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

/**
 * Componente principal Skills
 * Redesenhado com foco em responsividade, acessibilidade e 
 * estética moderna usando Tailwind CSS
 */
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

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-12 overflow-hidden sm:py-16 lg:py-20 xl:py-24"
            aria-labelledby="skills-heading"
        >
            {/* Background com padrão de grade responsivo */}
            <div
                className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: `clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)`,
                }}
            />

            {/* Efeitos de gradiente com posicionamento melhorado */}
            <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
                <div className="absolute left-1/2 top-1/2 w-full max-w-2xl aspect-square bg-blue-500/5 dark:bg-blue-500/10 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2 md:max-w-3xl md:blur-3xl" />
                <div className="absolute left-1/2 top-1/2 w-full max-w-xl aspect-square bg-purple-500/5 dark:bg-purple-500/10 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2 scale-75 md:max-w-2xl md:blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto lg:max-w-4xl">
                    {/* Cabeçalho da seção - Melhorado com espaçamento e tipografia responsivos */}
                    <AnimatedSection delay={0} className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <h2
                            id="skills-heading"
                            className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4 md:mb-5"
                        >
                            {t('skills.title')}
                        </h2>
                        <p className="text-sm text-gray-700 dark:text-gray-300 max-w-2xl mx-auto sm:text-base">
                            {t('skills.description')}
                        </p>
                    </AnimatedSection>

                    {/* Seções de habilidades técnicas com espaçamento consistente */}
                    <div className="space-y-3 mb-10 sm:space-y-4 md:space-y-5 lg:mb-12">
                        <AnimatedSection delay={0.1}>
                            <div className="mb-6">
                                <SkillSection
                                    id="frontend"
                                    title={t('skills.sections.frontend.title')}
                                    icon={<Code />}
                                    skills={frontendSkills}
                                    openSection={openSection}
                                    toggleSection={toggleSection}
                                    isVisible={isVisible && openSection === "frontend"}
                                />
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="mb-6">
                                <SkillSection
                                    id="backend"
                                    title={t('skills.sections.backend.title')}
                                    icon={<Terminal />}
                                    skills={backendSkills}
                                    openSection={openSection}
                                    toggleSection={toggleSection}
                                    isVisible={isVisible && openSection === "backend"}
                                />
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <div className="mb-6">
                                <SkillSection
                                    id="design"
                                    title={t('skills.sections.tools.title')}
                                    icon={<Cpu />}
                                    skills={designSkills}
                                    openSection={openSection}
                                    toggleSection={toggleSection}
                                    isVisible={isVisible && openSection === "design"}
                                />
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Soft skills com subtítulo melhorado */}
                    <AnimatedSection delay={0.4} className="mb-6 sm:mb-8">
                        <h3 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white sm:text-2xl sm:mb-6">
                            {t('skills.softSkills.title')}
                        </h3>
                    </AnimatedSection>

                    {/* Grid responsivo de soft skills com alturas iguais */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-4">
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