import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { Code2, Palette, FileText, Box, Camera, Cpu, ArrowRight } from "lucide-react";
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

const ExpertiseAreas = () => {
    const { t } = useTranslation();

    const expertiseItems = [
        {
            title: "expertise.items.item0.title",
            icon: <Code2 className="w-8 h-8 md:w-12 md:h-12" />,
            description: "expertise.items.item0.description",
            gradient: "from-blue-400 to-cyan-400",
            delay: 0.1
        },
        {
            title: "expertise.items.item1.title",
            icon: <Palette className="w-8 h-8 md:w-12 md:h-12" />,
            description: "expertise.items.item1.description",
            gradient: "from-purple-400 to-pink-400",
            delay: 0.2
        },
        {
            title: "expertise.items.item2.title",
            icon: <FileText className="w-8 h-8 md:w-12 md:h-12" />,
            description: "expertise.items.item2.description",
            gradient: "from-green-400 to-emerald-400",
            delay: 0.3
        },
        {
            title: "expertise.items.item3.title",
            icon: <Box className="w-8 h-8 md:w-12 md:h-12" />,
            description: "expertise.items.item3.description",
            gradient: "from-orange-400 to-yellow-400",
            delay: 0.4
        },
        {
            title: "expertise.items.item4.title",
            icon: <Cpu className="w-8 h-8 md:w-12 md:h-12" />,
            description: "expertise.items.item4.description",
            gradient: "from-red-400 to-rose-400",
            delay: 0.5
        },
        {
            title: "expertise.items.item5.title",
            icon: <Camera className="w-8 h-8 md:w-12 md:h-12" />,
            description: "expertise.items.item5.description",
            gradient: "from-indigo-400 to-violet-400",
            delay: 0.6
        }
    ];

    return (
        <section id="atuacao" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-blue-50/70 dark:from-slate-900/60 dark:to-slate-900/60">
            <div aria-hidden="true" className="absolute -z-10 inset-0 overflow-hidden pointer-events-none select-none">
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

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                        {t('expertise.title')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t('expertise.subtitle')}
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {expertiseItems.map((item, index) => (
                        <AnimatedSection delay={item.delay} key={index} className="group perspective">
                            <div className="relative h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:-rotate-y-2 hover:scale-[1.02]">
                                <div className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/30 dark:from-slate-700/0 dark:to-blue-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Decorative elements */}
                                <div className="absolute -right-3 -top-3 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-500" />

                                <div className="relative p-8">
                                    <div className="flex flex-col items-center">
                                        <div className={`mb-6 p-6 rounded-2xl bg-gradient-to-br ${item.gradient} text-white 
                                            shadow-lg transform group-hover:scale-110 ${index % 2 === 0 ? 'group-hover:rotate-3' : 'group-hover:-rotate-3'} transition-transform duration-300`}>
                                            {item.icon}
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-transparent 
                                            group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 
                                            group-hover:bg-clip-text transition-all duration-300">
                                            {t(item.title)}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                                            {t(item.description)}
                                        </p>

                                        <button
                                            className="flex items-center text-blue-500 dark:text-blue-400 font-medium 
                                            group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                                            type="button"
                                        >
                                            {t('expertise.learnMore')}
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertiseAreas;