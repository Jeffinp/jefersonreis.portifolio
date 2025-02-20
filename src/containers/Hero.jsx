import React, { useEffect, useState } from 'react';
import { ArrowRight, Mail, Sparkles, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="home" className="relative min-h-screen overflow-hidden">
            {/* Improved background with subtle animation */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-gray-50/95 to-white/95 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95" />
                <img
                    src="/assets/images/nebula-space-blue-12k-2v.webp"
                    alt="Background pattern"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10 mix-blend-multiply transform scale-105 animate-subtle-float"
                    loading="eager"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.02)_25%,rgba(68,68,68,0.02)_50%,transparent_50%,transparent_75%,rgba(68,68,68,0.02)_75%)] bg-[length:20px_20px] animate-subtle-move" />
            </div>

            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float-slow" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-slow-reverse" />
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
                {/* Profile image with enhanced animations */}
                <div className="group relative mb-12 transition-transform duration-700 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-all duration-700" />
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/90 dark:border-gray-700/90 shadow-2xl transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
                        <img
                            src="/assets/images/Linkedin-foto.webp"
                            alt={t('hero.profileAlt')}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="eager"
                            decoding="async"
                            width="192"
                            height="192"
                        />
                        <Sparkles className="absolute top-2 right-2 w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12" />
                    </div>
                </div>

                {/* Enhanced typography */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 transition-all duration-700">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {t('hero.title')}
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl text-center mb-16 leading-relaxed">
                    {t('hero.subtitle')}
                    <span className="relative inline-block mx-2 group">
                        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        <span className="relative font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            {t('hero.transforming')}
                        </span>
                    </span>
                    ✨
                </p>

                {/* Enhanced action buttons */}
                <div className="flex flex-wrap gap-8 justify-center">
                    <button
                        onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px] transition-all duration-500 hover:shadow-[0_0_2rem_-0.5rem_rgb(147,51,234)]"
                    >
                        <div className="relative bg-white dark:bg-gray-900 rounded-full px-8 py-4">
                            <span className="relative flex items-center text-gray-900 dark:text-white font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                <ArrowRight className="mr-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                {t('hero.buttons.viewProjects')}
                            </span>
                        </div>
                    </button>

                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative overflow-hidden rounded-full bg-white dark:bg-gray-800 px-8 py-4 transition-all duration-500 hover:shadow-lg"
                    >
                        <span className="relative flex items-center text-gray-900 dark:text-white font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                            <Mail className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
                            {t('hero.buttons.contact')}
                        </span>
                    </button>
                </div>
            </div>

            {/* Improved scroll indicator */}
            <div
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500"
                style={{ opacity: 1 - (scrollProgress / 50) }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative group cursor-pointer">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <ChevronDown className={`w-8 h-8 text-gray-600 dark:text-gray-300 transition-transform duration-500 ${isHovered ? 'translate-y-2' : 'animate-bounce'}`} />
                </div>
            </div>
        </section>
    );
};

export default Hero;