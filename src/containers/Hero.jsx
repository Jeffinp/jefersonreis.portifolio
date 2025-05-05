import { debounce } from '../utils';
import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { Mail, ChevronDown, ExternalLink, Code, Palette, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation } from 'framer-motion';

// Componente memoizado para os elementos decorativos do fundo
const BackgroundElements = memo(({ isMobile, mousePosition }) => (
    <div className="absolute inset-0 z-0">
        {/* Camada de grade */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
            style={{
                backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                                 linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                backgroundSize: isMobile ? '20px 20px' : '80px 80px'
            }}
        />

        {/* Camadas de esferas com efeito de profundidade - bolhas centralizadas */}
        <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-blue-500/5 dark:bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 1 }} />
            <div className="absolute left-1/2 top-1/2 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-purple-500/5 dark:bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 0, transform: 'translate(-50%, -50%) scale(0.75)' }} />
        </div>

        {/* Elementos geométricos flutuantes - responsivos */}
        <div className="hidden sm:block absolute top-20 left-[5%] sm:left-[7%] md:left-[10%] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-md animate-float-slow"
            style={{
                transform: `rotate(12deg) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
            }}
        />
        <div className="hidden sm:block absolute top-[30%] right-[10%] sm:right-[12%] md:right-[15%] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-full animate-float-reverse"
            style={{
                transform: `rotate(-12deg) translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
            }}
        />

        {/* Elemento leve para dispositivos móveis */}
        <div className="sm:hidden absolute top-16 right-10 w-6 h-6 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-md animate-float-slow" />
    </div>
));

BackgroundElements.displayName = 'BackgroundElements';

// Componente memoizado para o card de perfil
const ProfileCard = memo(({ isMobile, mousePosition, t }) => (
    <motion.div
        className="w-full sm:w-3/4 md:w-1/2 lg:w-5/12 xl:w-2/5 flex justify-center order-1 md:order-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
        <div className="perspective-3d">
            <div
                className="relative w-56 h-56 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 transform-gpu transition-all duration-300"
                style={{
                    transform: isMobile ? 'none' : `rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`
                }}
            >
                {/* Camadas do card com profundidade */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-cyan-500/20 shadow-xl backdrop-blur-lg border border-white/20 dark:border-white/10 transform-gpu -translate-z-4"></div>

                <div className="absolute inset-4 rounded-2xl bg-white dark:bg-gray-800 shadow-inner transform-gpu -translate-z-2"></div>

                {/* Imagem de perfil com moldura */}
                <div className="absolute inset-0 flex items-center justify-center transform-gpu -translate-z-0">
                    <div className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                        <img
                            src="/assets/images/Linkedin-foto.webp"
                            alt={t('hero.profileAlt')}
                            className="w-full h-full object-cover"
                            width={240}
                            height={240}
                            loading="eager"
                        />
                    </div>
                </div>

                {/* Elementos decorativos reduzidos */}
                <div 
                    className="absolute top-0 right-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shadow-xl transform-gpu translate-z-4 animate-float"
                    style={{ marginTop: '-0.5rem', marginRight: '-0.5rem' }}
                ></div>
            </div>
        </div>
    </motion.div>
));

ProfileCard.displayName = 'ProfileCard';

const Hero = () => {
    const { t } = useTranslation();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const heroRef = useRef(null);
    const controls = useAnimation();

    // Detectar dispositivo móvel com callback memoizado
    const checkMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Controle de scroll com debounce
    useEffect(() => {
        const handleScroll = debounce(() => {
            if (!document.documentElement) return;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            setScrollProgress(scrolled);
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Efeito de paralaxe com mouse (apenas em desktop, com debounce)
    useEffect(() => {
        checkMobile();

        const handleResize = debounce(() => {
            checkMobile();
        }, 250);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [checkMobile]);

    // Efeito de paralaxe simplificado e otimizado
    useEffect(() => {
        if (isMobile) return () => { };

        const handleMouseMove = debounce((e) => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePosition({
                x: (x / rect.width) - 0.5,
                y: (y / rect.height) - 0.5
            });
        }, 50);

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

    // Skills para mostrar no carrossel - memoizados
    const skills = [
        { name: "React", icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" /> },
        { name: "Design", icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" /> },
        { name: "Web", icon: <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" /> },
        { name: "Python", icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" /> },
    ];

    // Texto do subtítulo - reduzido para menos animações
    const subtitleText = t('hero.subtitle');

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-[550px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-screen xl:min-h-screen flex items-center bg-transparent py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32"
            aria-label={t('hero.title')}
        >
            {/* Fundo 3D dinâmico - simplificado e memoizado */}
            <BackgroundElements isMobile={isMobile} mousePosition={mousePosition} />

            {/* Conteúdo principal */}
            <div className="relative z-10 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-20 xl:gap-32">
                    {/* Card do perfil */}
                    <ProfileCard isMobile={isMobile} mousePosition={mousePosition} t={t} />

                    {/* Seção de texto animado */}
                    <div className="w-full sm:w-4/5 md:w-1/2 lg:w-7/12 xl:w-3/5 space-y-4 sm:space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start mt-8 md:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full"
                        >
                            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2 sm:mb-3 tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
                                <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                                <span className="hidden xs:inline">Desenvolvedor</span>
                                <span className="xs:hidden">Dev</span>
                                {' '}Full Stack & Designer
                            </h2>

                            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-slate-900 dark:text-white">
                                {t('hero.title')}
                            </h1>

                            <p className="text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto md:mx-0 font-medium mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                                {subtitleText}
                            </p>

                            {/* Botões de ação */}
                            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6 justify-center md:justify-start w-full">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 font-semibold rounded-lg sm:rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors duration-300 text-sm sm:text-base md:text-lg gap-1.5 sm:gap-2"
                                >
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                    {t('hero.buttons.contact')}
                                </a>
                                <a
                                    href="#portfolio"
                                    className="inline-flex items-center justify-center px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 font-semibold rounded-lg sm:rounded-xl border border-blue-600 hover:border-blue-700 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 dark:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-lg text-sm sm:text-base md:text-lg gap-1.5 sm:gap-2"
                                >
                                    {t('hero.buttons.viewProjects')}
                                </a>
                            </div>
                        </motion.div>

                        {/* Skills - agora responsivos em todos os breakpoints */}
                        <div className="flex gap-2 xs:gap-3 sm:gap-4 flex-wrap justify-center md:justify-start mt-4 sm:mt-5 md:mt-6">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs xs:text-sm sm:text-base bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700 gap-1.5 sm:gap-2"
                                >
                                    {skill.icon}
                                    <span>{skill.name}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Seta de scroll para baixo - responsiva */}
            <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <a
                    href="#about"
                    aria-label={t('hero.scrollToAbout')}
                    className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                >
                    <span className="text-[10px] xs:text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2 font-semibold">
                        {t('hero.scrollDown')}
                    </span>
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
                </a>
            </div>
        </section>
    );
};

export default memo(Hero);