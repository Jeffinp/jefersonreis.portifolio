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
                backgroundSize: isMobile ? '40px 40px' : '80px 80px'
            }}
        />

        {/* Camadas de esferas com efeito de profundidade - bolhas centralizadas */}
        <div className="absolute inset-0 overflow-visible -z-10 pointer-events-none">
            <div className={`absolute left-1/2 top-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2`} style={{ zIndex: 1 }} />
            <div className={`absolute left-1/2 top-1/2 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2`} style={{ zIndex: 0, transform: 'translate(-50%, -50%) scale(0.75)' }} />
        </div>

        {/* Elementos geométricos flutuantes - menos em mobile */}
        {!isMobile && (
            <>
                <div className="absolute top-20 left-[10%] w-8 h-8 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-md animate-float-slow"
                    style={{
                        transform: `rotate(12deg) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
                    }}
                />
                <div className="absolute top-[30%] right-[15%] w-12 h-12 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-full animate-float-reverse"
                    style={{
                        transform: `rotate(-12deg) translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`
                    }}
                />
            </>
        )}

        {/* Apenas alguns elementos leves em mobile */}
        {isMobile && (
            <div className="absolute top-20 right-20 w-8 h-8 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-md animate-float-slow" />
        )}
    </div>
));

BackgroundElements.displayName = 'BackgroundElements';

// Componente memoizado para o card de perfil
const ProfileCard = memo(({ isMobile, mousePosition, t }) => (
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
                    transform: isMobile ? 'none' : `rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`
                }}
            >
                {/* Camadas do card com profundidade */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-cyan-500/20 shadow-xl backdrop-blur-lg border border-white/20 dark:border-white/10 transform-gpu -translate-z-4"></div>

                <div className="absolute inset-4 rounded-2xl bg-white dark:bg-gray-800 shadow-inner transform-gpu -translate-z-2"></div>

                {/* Imagem de perfil com moldura */}
                <div className="absolute inset-0 flex items-center justify-center transform-gpu -translate-z-0">
                    <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                        <img
                            src="/assets/images/Linkedin-foto.webp"
                            alt={t('hero.profileAlt')}
                            className="w-full h-full object-cover"
                            loading="eager"
                        />
                    </div>
                </div>

                {/* Elementos decorativos reduzidos */}
                <div className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shadow-xl transform-gpu translate-z-4 animate-float"
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
        { name: "React", icon: <Code className="w-5 h-5" /> },
        { name: "Design", icon: <Palette className="w-5 h-5" /> },
        { name: "Web", icon: <ExternalLink className="w-5 h-5" /> },
        { name: "Python", icon: <Cpu className="w-5 h-5" /> },
    ];

    // Texto do subtítulo - reduzido para menos animações
    const subtitleText = t('hero.subtitle');

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center bg-transparent py-12 md:py-24 lg:py-32"
            aria-label={t('hero.title')}
        >
            {/* Fundo 3D dinâmico - simplificado e memoizado */}
            <BackgroundElements isMobile={isMobile} mousePosition={mousePosition} />

            {/* Conteúdo principal */}
            <div className="relative z-10 w-full mx-auto px-4 sm:px-8 lg:px-16 py-8 md:py-16 lg:py-20 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 lg:gap-32">
                    {/* Card do perfil */}
                    <ProfileCard isMobile={isMobile} mousePosition={mousePosition} t={t} />

                    {/* Seção de texto animado */}
                    <div className="w-full md:w-1/2 space-y-8 text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full"
                        >
                            <h2 className="text-base md:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
                                <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                                {isMobile ? "Dev Full Stack & Designer" : "Desenvolvedor Full Stack & Designer"}
                            </h2>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-4 md:mb-6 text-slate-900 dark:text-white drop-shadow-xl">
                                {t('hero.title')}
                            </h1>

                            <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0 font-medium mb-6 md:mb-8">
                                {subtitleText}
                            </p>

                            {/* Botões de ação */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start w-full">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center px-7 py-3 font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors duration-300 text-base md:text-lg gap-2"
                                >
                                    <Mail className="w-5 h-5" />
                                    {t('hero.buttons.contact')}
                                </a>
                                <a
                                    href="#portfolio"
                                    className="inline-flex items-center justify-center px-7 py-3 font-semibold rounded-xl border border-blue-600 hover:border-blue-700 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 dark:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-lg text-base md:text-lg gap-2"
                                >
                                    {t('hero.buttons.viewProjects')}
                                </a>
                            </div>
                        </motion.div>

                        {/* Skills - component simplificado e sem animações desnecessárias */}
                        <div className="hidden md:flex gap-4 flex-wrap justify-center md:justify-start mt-6">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-4 py-2 rounded-full text-base bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700 gap-2"
                                >
                                    {skill.icon}
                                    <span>{skill.name}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Seta de scroll para baixo - simplificada */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <a
                    href="#about"
                    aria-label={t('hero.scrollToAbout')}
                    className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                >
                    <span className="text-xs uppercase tracking-wider mb-2 font-semibold">
                        {t('hero.scrollDown')}
                    </span>
                    <ChevronDown className="w-6 h-6 animate-bounce" />
                </a>
            </div>
        </section>
    );
};

export default memo(Hero);