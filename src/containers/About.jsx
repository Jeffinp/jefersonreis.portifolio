import React, { useEffect, useRef } from "react";
import { User, Palette, ChevronRight, Trophy, Code, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView } from "framer-motion";

// Função para rolar até a seção de áreas
const scrollToAreas = () => {
    const areasSection = document.getElementById('areas');
    if (areasSection) {
        areasSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
};

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

// Componente para estatísticas
const StatItem = ({ value, label, icon, delay }) => {
    const Icon = icon;
    return (
        <AnimatedSection delay={delay} className="flex flex-col items-center">
            <div className="w-16 h-16 mb-3 bg-gradient-to-br from-blue-400/80 to-green-400/80 dark:from-blue-500/80 dark:to-green-500/80 rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent">
                {value}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-medium mt-1">{label}</p>
        </AnimatedSection>
    );
};

// Cards com efeito hover avançado
const FeatureCard = ({ icon, title, description, actionText, onClick, colorFrom, colorTo, delay, index }) => {
    const Icon = icon;
    const isEven = index % 2 === 0;

    return (
        <AnimatedSection delay={delay} className="group perspective">
            <div className="relative h-full p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:-rotate-y-2 hover:scale-[1.01]">
                <div className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-${colorFrom}-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/30 dark:from-slate-700/0 dark:to-blue-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Decorative elements */}
                <div className="absolute -right-3 -top-3 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-green-100/20 dark:from-blue-900/10 dark:to-green-900/10 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-500" />

                <div className="relative flex flex-col items-center">
                    <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-br from-${colorFrom}-400 to-${colorTo}-500 dark:from-${colorFrom}-500 dark:to-${colorTo}-600 text-white shadow-lg transform group-hover:scale-110 ${isEven ? 'group-hover:rotate-3' : 'group-hover:-rotate-3'} transition-transform duration-300`}>
                        <Icon strokeWidth={1.5} className="w-8 h-8 md:w-12 md:h-12" />
                    </div>

                    <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-${colorFrom}-500 dark:group-hover:text-${colorFrom}-400 transition-colors duration-300`}>
                        {title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                        {description}
                    </p>

                    <button
                        type="button"
                        onClick={onClick}
                        className={`flex items-center text-${colorFrom}-500 dark:text-${colorFrom}-400 font-medium group-hover:text-${colorFrom}-600 dark:group-hover:text-${colorFrom}-300 transition-colors duration-300`}
                        aria-label={actionText}
                    >
                        {actionText}
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};

const AboutMe = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="relative py-28 overflow-hidden bg-gradient-to-b from-white to-blue-50/70 dark:from-slate-900/60 dark:to-slate-900/60">
            {/* Background decorative elements */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-green-400 dark:from-blue-500 dark:to-green-500" />

            <div aria-hidden="true" className="absolute -z-10 inset-0 overflow-hidden pointer-events-none select-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000" />
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-40 animate-blob animation-delay-4000" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/80 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-blob animation-delay-1000" />

                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.03]" />

                {/* Wave pattern at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent" />
                <svg className="absolute bottom-0 fill-blue-100/30 dark:fill-blue-900/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                        {t("about.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {t("about.intro")}
                    </p>
                </AnimatedSection>

                {/* Stats section */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-20">
                    <StatItem
                        value="4+"
                        label={t("skills.sections.frontend.experience").split(' de ')[0]}
                        icon={Code}
                        delay={0.1}
                    />
                    <StatItem
                        value="50+"
                        label={t("portfolio.title").split(' ')[0]}
                        icon={Briefcase}
                        delay={0.2}
                    />
                    <StatItem
                        value="100%"
                        label={t("about.title").split(' ')[1]}
                        icon={Trophy}
                        delay={0.3}
                    />
                </div>

                {/* Cards with perspective effect */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <FeatureCard
                        icon={User}
                        title={t("about.title")}
                        description={t("about.devDescription")}
                        actionText={t("about.learnMore")}
                        onClick={scrollToAreas}
                        colorFrom="blue"
                        colorTo="blue"
                        delay={0.4}
                        index={0}
                    />

                    <FeatureCard
                        icon={Palette}
                        title={t("about.designTitle")}
                        description={t("about.designDescription")}
                        actionText={t("about.learnMore")}
                        onClick={scrollToAreas}
                        colorFrom="green"
                        colorTo="green"
                        delay={0.5}
                        index={1}
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
