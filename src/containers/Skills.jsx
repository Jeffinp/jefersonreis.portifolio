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
        className="mb-4 sm:mb-5 lg:mb-6"
    >
        <div className="flex justify-between mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm md:text-sm font-medium text-gray-700 dark:text-gray-300">
                {name}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1">
                <span
                    className={`text-xs sm:text-sm font-medium ${percentage === 100 ? "text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}
                >
                    {percentage}%
                </span>
                {percentage === 100 && (
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                )}
            </div>
        </div>
        <div className="relative w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 sm:h-2.5 md:h-3 overflow-hidden">
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
            className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-lg sm:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="relative overflow-hidden">
                <button
                    onClick={() => toggleSection(id)}
                    className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between relative z-10"
                >
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                        <span className="text-xl sm:text-2xl md:text-3xl">
                            {icon}
                        </span>
                        <div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">
                                {title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                {id === 'frontend' ? 'Frontend Development' :
                                    id === 'backend' ? 'Backend Development' :
                                        'Design Tools & Office'}
                            </p>
                        </div>
                    </div>
                    <div
                        className={`transition-transform duration-300 ${openSection === id ? "text-blue-500 rotate-180" : "text-gray-400 dark:text-gray-500"}`}
                    >
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
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
                            <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-t border-gray-100 dark:border-gray-700">
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
            <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-md sm:shadow-lg md:shadow-xl">
                <div className="relative p-4 sm:p-6 md:p-8 h-full z-10">
                    <span className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-6 block">
                        {emoji}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3 md:mb-4">
                        {skill.title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
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
    
    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-transparent"
        >
            {/* Fundo de quadrados alinhados igual ao atuacao */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '20px 20px' : '40px 40px',
                    backgroundSize: 'clamp(20px, 5vw, 80px) clamp(20px, 5vw, 80px)'
                }}
            />
            
            {/* Bolhas centralizadas com tamanhos responsivos */}
            <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
                <div className="absolute left-1/2 top-1/2 w-full max-w-screen-sm aspect-square bg-blue-500/5 dark:bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 w-3/4 max-w-screen-sm aspect-square bg-purple-500/5 dark:bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: -1, transform: 'translate(-50%, -50%) scale(0.7)' }} />
            </div>
            
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
                    {/* Cabeçalho da seção */}
                    <AnimatedSection delay={0} className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            {t('skills.title')}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
                            {t('skills.description')}
                        </p>
                    </AnimatedSection>
                    
                    {/* Skills técnicas */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
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
                    <AnimatedSection delay={0.4} className="mb-4 sm:mb-6 md:mb-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-gray-800 dark:text-gray-200">
                            {t('skills.softSkills.title')}
                        </h3>
                    </AnimatedSection>
                    
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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