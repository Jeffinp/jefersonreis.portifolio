import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { ChevronDown, ChevronUp, Download, ChevronRight } from "lucide-react";
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
 * Componente de seção animada - Wrapper para elementos que animam na entrada
 */
const AnimatedSection = memo(({
    children,
    delay = 0,
    className = "",
    threshold = 0.2
}) => {
    const { ref, controls } = useAnimatedVisibility(threshold);

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
});

AnimatedSection.displayName = 'AnimatedSection';

// Componente memoizado para o fundo
const Background = memo(({ isMobile, mousePosition }) => (
    <>
        {/* Fundo simplificado */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 dark:from-blue-950/30 dark:via-slate-900 dark:to-blue-950/30 -z-10"></div>

        {/* Grades */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
            style={{
                backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                               linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                backgroundSize: isMobile ? '40px 40px' : '80px 80px'
            }}
        />

        {/* Formas decorativas simplificadas - bolhas centralizadas */}
        <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: -1, transform: 'translate(-50%, -50%) scale(0.7)' }} />
        </div>
    </>
));

Background.displayName = 'Background';

// Componente de card com efeitos 3D memoizado
const Card = memo(({ children, className = "", delay = 0, mousePosition, isMobile }) => {
    // Transformação 3D simplificada
    const transform = !isMobile ?
        `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * -3}deg)` :
        'none';

    return (
        <motion.article
            className={`group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6,
                    delay,
                    ease: [0.22, 1, 0.36, 1]
                }
            }}
            style={{ transform }}
        >
            {/* Fundo simplificado */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/50 dark:from-slate-800/0 dark:to-blue-900/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="p-8 relative z-10">
                <div className="flex flex-col h-full">
                    {children}
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </motion.article>
    );
});

Card.displayName = 'Card';

// Componente para a seção de destaques
const Highlights = memo(({ t }) => {
    // Memoizando a lista de destaques
    const highlightItems = React.useMemo(() =>
        t('resume.highlightItems', { returnObjects: true }),
        [t]);

    return (
        <Card className="mb-8" delay={0.1} mousePosition={{ x: 0, y: 0 }} isMobile={true}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {t('resume.highlights')}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                {highlightItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </Card>
    );
});

Highlights.displayName = 'Highlights';

// Componente para a experiência profissional
const Experience = memo(({ t }) => (
    <Card className="mb-8" delay={0.2} mousePosition={{ x: 0, y: 0 }} isMobile={true}>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {t('resume.experience.title')}
        </h3>

        <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {t('resume.experience.freelancer.title')}
                </h4>
                <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full">
                    {t('resume.experience.freelancer.period')}
                </span>
            </div>

            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                {t('resume.experience.freelancer.responsibilities', { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    </Card>
));

Experience.displayName = 'Experience';

// Componente para habilidades técnicas
const TechnicalSkills = memo(({ t }) => (
    <Card className="mb-8" delay={0.3} mousePosition={{ x: 0, y: 0 }} isMobile={true}>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {t('resume.technicalSkills.title')}
        </h3>

        <div className="space-y-6">
            <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {t('resume.technicalSkills.categories.programming.title')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                    {t('resume.technicalSkills.categories.programming.skills')}
                </p>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {t('resume.technicalSkills.categories.design.title')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                    {t('resume.technicalSkills.categories.design.skills')}
                </p>
            </div>

            <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {t('resume.technicalSkills.categories.webDev.title')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                    {t('resume.technicalSkills.categories.webDev.skills')}
                </p>
            </div>
        </div>
    </Card>
));

TechnicalSkills.displayName = 'TechnicalSkills';

// Componente para habilidades interpessoais
const SoftSkills = memo(({ t }) => {
    // Memoizando a lista de soft skills
    const softSkillItems = React.useMemo(() =>
        t('resume.softSkills.items', { returnObjects: true }),
        [t]);

    return (
        <Card className="mb-8" delay={0.4} mousePosition={{ x: 0, y: 0 }} isMobile={true}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {t('resume.softSkills.title')}
            </h3>

            <div className="flex flex-wrap gap-2">
                {softSkillItems.map((skill, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </Card>
    );
});

SoftSkills.displayName = 'SoftSkills';

const Resume = () => {
    const [expanded, setExpanded] = useState(false);
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const controls = useAnimation();

    // Toggle para expansão do currículo - memoizado
    const toggleExpanded = useCallback(() => {
        setExpanded(prev => !prev);
    }, []);

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

    // Animação inicial
    useEffect(() => {
        controls.start('visible');
    }, [controls]);

    return (
        <section
            ref={sectionRef}
            id="resume"
            className="relative py-16 md:py-24 bg-transparent overflow-hidden"
            aria-labelledby="resume-heading"
        >
            {/* Fundo de quadrados alinhados igual ao atuacao/skills/projects */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />
            {/* Bolhas centralizadas */}
            <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
                <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: -1, transform: 'translate(-50%, -50%) scale(0.7)' }} />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <AnimatedSection className="text-center mb-12 md:mb-16">
                    <h2
                        id="resume-heading"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                    >
                        {t('resume.title')}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {t('resume.subtitle')}
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {/* Resumo principal */}
                        <Experience t={t} />
                        <TechnicalSkills t={t} />

                        {/* Conteúdo expandido */}
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <SoftSkills t={t} />
                            </motion.div>
                        )}

                        {/* Botão para expandir/contrair */}
                        <button
                            onClick={toggleExpanded}
                            className="flex items-center justify-center w-full mt-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300 font-medium text-blue-600 dark:text-blue-400"
                        >
                            <span className="mr-2">
                                {expanded ? t('resume.buttons.showLess') : t('resume.buttons.showMore')}
                            </span>
                            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                    </div>

                    <div>
                        {/* Sidebar */}
                        <Highlights t={t} />

                        {/* Botão de download do CV */}
                        <AnimatedSection delay={0.5} className="text-center">
                            <a
                                href="/assets/cv-jefersonreis.pdf"
                                download
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <Download className="w-5 h-5" aria-hidden="true" />
                                {t('resume.buttons.downloadCV')}
                            </a>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                {t('resume.downloadDescription')}
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(Resume);
