import React, { useEffect, useState, useRef } from 'react';
import { Mail, ChevronDown, ExternalLink, Code, Palette, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation } from 'framer-motion';

const Hero = () => {
    const { t } = useTranslation();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const heroRef = useRef(null);
    const controls = useAnimation();

    // Detectar dispositivo móvel
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Controle de scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!document.documentElement) return;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Efeito de paralaxe com mouse (apenas em desktop)
    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePosition({
                x: (x / rect.width) - 0.5,
                y: (y / rect.height) - 0.5
            });
        };

        const heroElement = heroRef.current;
        if (heroElement) {
            heroElement.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (heroElement) {
                heroElement.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [isMobile]);

    // Animação inicial
    useEffect(() => {
        controls.start('visible');
    }, [controls]);

    // Skills para mostrar no carrossel
    const skills = [
        { name: "React", icon: <Code className="w-5 h-5" /> },
        { name: "Design", icon: <Palette className="w-5 h-5" /> },
        { name: "Web", icon: <ExternalLink className="w-5 h-5" /> },
        { name: "Python", icon: <Cpu className="w-5 h-5" /> },
    ];

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gray-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30"
        >
            {/* Fundo 3D dinâmico - simplificado em mobile */}
            <div className="absolute inset-0 z-0">
                {/* Camada de grade */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                                         linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                        backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                    }}
                />

                {/* Camadas de esferas com efeito de profundidade - reduzidas em mobile */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className={`absolute rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl ${isMobile ? 'w-[400px] h-[400px] -top-[200px] -right-[200px]' : 'w-[800px] h-[800px] -top-[400px] -right-[400px]'}`}
                        style={{
                            transform: isMobile ? 'none' : `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`
                        }}
                    />
                    <div className={`absolute rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl ${isMobile ? 'w-[300px] h-[300px] -bottom-[150px] -left-[150px]' : 'w-[600px] h-[600px] -bottom-[300px] -left-[300px]'}`}
                        style={{
                            transform: isMobile ? 'none' : `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
                        }}
                    />
                </div>

                {/* Elementos geométricos flutuantes - menos em mobile */}
                {!isMobile && (
                    <>
                        <div className="absolute top-20 left-[10%] w-8 h-8 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-md animate-float-slow transform rotate-12"
                            style={{
                                transform: `rotate(12deg) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
                            }}
                        />
                        <div className="absolute top-[30%] right-[15%] w-12 h-12 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-full animate-float-reverse transform -rotate-12"
                            style={{
                                transform: `rotate(-12deg) translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
                            }}
                        />
                        <div className="absolute bottom-[20%] left-[20%] w-16 h-16 border-2 border-emerald-500/30 dark:border-emerald-400/30 rounded-lg animate-float transform rotate-45"
                            style={{
                                transform: `rotate(45deg) translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`
                            }}
                        />
                    </>
                )}

                {/* Apenas alguns elementos leves em mobile */}
                {isMobile && (
                    <>
                        <div className="absolute top-20 right-20 w-8 h-8 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-md animate-float-slow" />
                        <div className="absolute bottom-40 left-10 w-10 h-10 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-full animate-float" />
                    </>
                )}

                {/* Linhas conectoras dinâmicas - simplificadas em mobile */}
                <svg className="absolute inset-0 w-full h-full z-0 opacity-20 dark:opacity-30" style={{ filter: 'blur(1px)', display: isMobile ? 'none' : 'block' }}>
                    <line x1="10%" y1="30%" x2="30%" y2="10%" stroke="url(#blueGradient)" strokeWidth="1" />
                    <line x1="70%" y1="20%" x2="90%" y2="40%" stroke="url(#purpleGradient)" strokeWidth="1" />
                    <line x1="20%" y1="85%" x2="40%" y2="65%" stroke="url(#cyanGradient)" strokeWidth="1" />

                    <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%">
                            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Conteúdo principal - reorganizado para mobile */}
            <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 max-w-7xl mx-auto">
                    {/* Ordem invertida em mobile: foto primeiro, depois texto */}
                    <motion.div
                        className="w-full md:w-1/2 flex justify-center order-1 md:order-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="perspective-3d">
                            <div
                                className={`relative w-64 h-64 md:w-80 md:h-80 transform-gpu transition-all duration-300`}
                                style={{
                                    transform: isMobile ? 'none' : `rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * -10}deg)`
                                }}
                            >
                                {/* Camadas do card com profundidade - simplificadas em mobile */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-cyan-500/20 shadow-xl backdrop-blur-lg border border-white/20 dark:border-white/10 transform-gpu -translate-z-4"></div>

                                <div className="absolute inset-4 rounded-2xl bg-white dark:bg-gray-800 shadow-inner transform-gpu -translate-z-2"></div>

                                {/* Imagem de perfil com moldura */}
                                <div className="absolute inset-0 flex items-center justify-center transform-gpu -translate-z-0">
                                    <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                                        <img
                                            src="/assets/images/Linkedin-foto.webp"
                                            alt={t('hero.profileAlt')}
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                            loading="eager"
                                        />
                                    </div>
                                </div>

                                {/* Elementos decorativos flutuantes - reduzidos em mobile */}
                                <div className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shadow-xl transform-gpu translate-z-4 animate-float"
                                    style={{ marginTop: '-0.5rem', marginRight: '-0.5rem' }}
                                ></div>

                                {isMobile ? null : (
                                    <div className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 shadow-xl transform-gpu translate-z-2 animate-float-slow"
                                        style={{ marginBottom: '-1rem', marginLeft: '-0.5rem' }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Seção de texto animado */}
                    <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h2 className="text-base md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-3 md:mb-4 tracking-wider">
                                <span className="inline-flex items-center">
                                    <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse mr-2"></span>
                                    <span className="uppercase text-sm md:text-base">
                                        {isMobile ? "Dev Full Stack & Designer" : "Desenvolvedor Full Stack & Designer"}
                                    </span>
                                </span>
                            </h2>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-slate-900 dark:text-white">
                                {t('hero.title')}
                            </h1>

                            {/* Subtítulo com animação de digitação - adaptado para mobile */}
                            <div className="h-6 md:h-8 overflow-hidden mb-6 md:mb-8">
                                <motion.p
                                    className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0"
                                    animate={{
                                        y: [0, -160, -320, -480, 0],
                                    }}
                                    transition={{
                                        duration: isMobile ? 18 : 12,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }}
                                >
                                    {t('hero.subtitle')}<br />
                                    Front-end Development<br />
                                    UI/UX Design<br />
                                    Creative Solutions<br />
                                    {t('hero.subtitle')}
                                </motion.p>
                            </div>

                            {/* Card interativo de skills - ocultado em telas muito pequenas */}
                            <div className={`${isMobile && window.innerWidth < 400 ? 'hidden' : 'block'} mb-6`}>
                                <div className="group perspective max-w-xs sm:max-w-md mx-auto md:mx-0">
                                    <div className="relative h-12 md:h-16 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 dark:from-blue-700/20 dark:via-purple-700/20 dark:to-blue-700/20 backdrop-blur-sm rounded-xl border border-blue-200/50 dark:border-blue-700/50 shadow-lg transition-all duration-300 transform-gpu hover:scale-105 overflow-hidden">
                                        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Carrossel de skills */}
                                        <div className="flex px-4 md:px-6 h-full items-center gap-4 overflow-hidden">
                                            <motion.div
                                                className="flex gap-3 md:gap-4 items-center"
                                                animate={{
                                                    x: [0, -400, 0],
                                                }}
                                                transition={{
                                                    duration: isMobile ? 30 : 20,
                                                    ease: "linear",
                                                    repeat: Infinity,
                                                }}
                                            >
                                                {[...skills, ...skills, ...skills].map((skill, index) => (
                                                    <div key={index} className="flex items-center gap-1 md:gap-2">
                                                        <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                            {skill.icon}
                                                        </div>
                                                        <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 whitespace-nowrap">{skill.name}</span>
                                                        <span className="mx-2 md:mx-3 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botões CTA - reorganizados para mobile */}
                            <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
                                <motion.button
                                    onClick={() => {
                                        const element = document.getElementById('portfolio');
                                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group px-5 sm:px-6 md:px-8 py-3 md:py-4 bg-blue-600 dark:bg-blue-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-700/20 text-sm md:text-base"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="flex items-center">
                                        <ExternalLink className="mr-2 w-4 h-4 md:w-5 md:h-5 transform group-hover:rotate-12 transition-transform duration-300" />
                                        {t('hero.buttons.viewProjects')}
                                    </span>
                                </motion.button>

                                <motion.button
                                    onClick={() => {
                                        const element = document.getElementById('contact');
                                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group px-5 sm:px-6 md:px-8 py-3 md:py-4 border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-gray-800 dark:text-gray-200 rounded-full font-medium transition-all duration-300 text-sm md:text-base"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="flex items-center">
                                        <Mail className="mr-2 w-4 h-4 md:w-5 md:h-5 transform group-hover:rotate-12 transition-transform duration-300" />
                                        {t('hero.buttons.contact')}
                                    </span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator - menor em mobile */}
            <motion.div
                className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
                style={{ opacity: 1 - (scrollProgress / 20) }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="p-1.5 md:p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-300" />
                </div>
            </motion.div>

            {/* Estilos CSS otimizados para mobile */}
            <style jsx>{`
                .perspective-3d {
                    perspective: 1000px;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateZ(4px); }
                    50% { transform: translateY(-10px) translateZ(4px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) translateZ(2px); }
                    50% { transform: translateY(-8px) translateZ(2px); }
                }
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                .transform-gpu {
                    transform: translateZ(0);
                    will-change: transform;
                }
                .-translate-z-0 { transform: translateZ(0px); }
                .-translate-z-2 { transform: translateZ(2px); }
                .-translate-z-4 { transform: translateZ(4px); }
                .translate-z-2 { transform: translateZ(2px); }
                .translate-z-4 { transform: translateZ(4px); }
            `}</style>
        </section>
    );
};

export default Hero;