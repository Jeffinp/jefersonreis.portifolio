import React, { useEffect, useState } from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
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
        <section className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-float-1" />
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-float-2" />
                
                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[size:40px_40px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center">
                {/* Profile Image Container */}
                <div className="group relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl group-hover:shadow-blue-500/25 dark:group-hover:shadow-purple-500/25 transition-all duration-500">
                        <img
                            src="/assets/images/Linkedin-foto.webp"
                            alt={t('hero.profileAlt')}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-0 right-0 p-2">
                            <Sparkles className="w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 text-center">
                    {t('hero.title')}
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-12">
                    {t('hero.subtitle')}
                    <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mx-2">
                        {t('hero.transforming')}
                    </span>
                    ✨
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-6 justify-center">
                    <button className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 px-8 py-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        <span className="relative flex items-center text-gray-900 dark:text-white font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                            <ArrowRight className="mr-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            {t('hero.buttons.viewProjects')}
                        </span>
                    </button>

                    <button className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 px-8 py-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        <span className="relative flex items-center text-gray-900 dark:text-white font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                            <Mail className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
                            {t('hero.buttons.contact')}
                        </span>
                    </button>
                </div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <div 
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer transition-opacity duration-500 hover:opacity-100"
                style={{ opacity: 1 - (scrollProgress/100) }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative flex flex-col items-center">
                    <div className={`relative w-8 h-12 transition-transform duration-300 ${isHovered ? 'translate-y-2' : ''}`}>
                        <div className="absolute inset-0 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                        
                        {/* Progress Circle */}
                        <svg 
                            className="absolute -inset-2 text-blue-500 dark:text-purple-400 transform -rotate-90"
                            viewBox="0 0 100 100"
                        >
                            <circle 
                                cx="50" 
                                cy="50" 
                                r="45" 
                                stroke="currentColor" 
                                strokeWidth="4" 
                                fill="transparent" 
                                strokeDasharray="283"
                                strokeDashoffset={283 * (1 - scrollProgress/100)}
                            />
                        </svg>

                        {/* Animated Dot */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2">
                            <div className={`w-2 h-2 bg-blue-500 dark:bg-purple-400 rounded-full ${
                                isHovered ? 'animate-jump' : 'animate-bounce'
                            }`} />
                        </div>
                    </div>

                    {/* Pulse Animation */}
                    <div className={`absolute -inset-4 bg-blue-500/10 dark:bg-purple-400/10 rounded-full ${
                        isHovered ? 'animate-pulse-ring' : ''
                    }`} />
                </div>
            </div>
        </section>
    );
};

export default Hero;