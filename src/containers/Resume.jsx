import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Download, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation } from "framer-motion";

const Resume = () => {
    const [expanded, setExpanded] = useState(false);
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
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

    // Efeito de paralaxe com mouse (apenas em desktop)
    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePosition({
                x: (x / rect.width) - 0.5,
                y: (y / rect.height) - 0.5
            });
        };

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

    // Componente de card com efeitos 3D
    const Card = ({ children, className = "", delay = 0 }) => {
        // Transformação 3D baseada na posição do mouse
        const transform = !isMobile ?
            `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * -3}deg)` :
            'none';

        return (
            <motion.article
                className={`group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-500 ${className}`}
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
                {/* Fundo com gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/50 dark:from-slate-800/0 dark:to-blue-900/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Elemento decorativo */}
                <div className="absolute -right-3 -top-3 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500" />

                <div className="p-8 relative z-10">
                    <div className="flex flex-col h-full">
                        {children}
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.article>
        );
    };

    return (
        <section
            ref={sectionRef}
            id="resume"
            className="relative py-24 md:py-32"
            aria-label="Meu Currículo"
        >
            {/* Fundo dinâmico com gradiente ajustado para melhor transição com Services */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 dark:from-blue-950/30 dark:via-slate-900 dark:to-blue-950/30 -z-10"></div>

            {/* Grades e elementos decorativos - mesmo padrão do Hero */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                                   linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-visible pointer-events-none -z-10">
                {/* Bolha decorativa para conexão com Services - ajustada para tom similar */}
                <div className={`absolute rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl section-boundary-bubble ${isMobile ? 'w-[400px] h-[400px] top-[-250px] left-[40%]' : 'w-[800px] h-[800px] top-[-500px] left-[35%] transform translate-x-[-50%]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) translate(-50%, 0)`
                    }}
                />

                {/* Bolha decorativa adicional para conexão com Portfolio */}
                <div className={`absolute rounded-full bg-purple-500/10 dark:bg-purple-500/15 blur-3xl section-boundary-bubble ${isMobile ? 'w-[400px] h-[400px] bottom-[-250px] right-[40%]' : 'w-[800px] h-[800px] bottom-[-500px] right-[35%] transform translate-x-[50%]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) translate(50%, 0)`
                    }}
                />

                {/* Resto das bolhas e elementos decorativos - mantido como estava */}
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

                {/* Elementos geométricos flutuantes - mesmo padrão do Hero */}
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

                {/* Linhas conectoras dinâmicas - mesmo padrão do Hero */}
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

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className="perspective-3d inline-block"
                        animate={{
                            rotateX: [0, 2, 0],
                            rotateY: [0, -2, 0]
                        }}
                        transition={{
                            duration: 6,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            {t("resume.title")}
                        </h2>
                    </motion.div>

                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        {t("resume.subtitle")}
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8">
                    <Card delay={0.1}>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                            {t("resume.highlights")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {t("resume.highlightItems", { returnObjects: true }).map(
                                (item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl"
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "rgba(59, 130, 246, 0.15)",
                                            transition: { type: "spring", stiffness: 400, damping: 10 }
                                        }}
                                    >
                                        <span className="text-gray-700 dark:text-gray-300">
                                            {item}
                                        </span>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </Card>

                    <Card delay={0.2}>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                            {t("resume.experience.title")}
                        </h3>
                        <div className="space-y-6">
                            <div className="border-l-4 border-blue-500 pl-6 transform hover:scale-105 transition-all duration-300 hover:border-purple-500">
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    {t("resume.experience.freelancer.title")}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {t("resume.experience.freelancer.period")}
                                </p>
                                <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
                                    {t("resume.experience.freelancer.responsibilities", {
                                        returnObjects: true,
                                    }).map((item, index) => (
                                        <motion.li
                                            key={index}
                                            className="flex items-center transform hover:translate-x-2 transition-transform duration-300"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                                        >
                                            <ChevronRight className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" />
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <div
                        className={`space-y-8 transition-all duration-500 transform ${expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 hidden"
                            }`}
                    >
                        <Card delay={0.3}>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                {t("resume.technicalSkills.title")}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Object.entries(
                                    t("resume.technicalSkills.categories", {
                                        returnObjects: true,
                                    })
                                ).map(([key, value], index) => (
                                    <motion.div
                                        key={key}
                                        className="space-y-3"
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { type: "spring", stiffness: 400, damping: 10 }
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                                    >
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                                            {value.title}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {value.skills}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>

                        <Card delay={0.4}>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                {t("resume.softSkills.title")}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {t("resume.softSkills.items", { returnObjects: true }).map(
                                    (skill, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl"
                                            whileHover={{
                                                scale: 1.05,
                                                backgroundColor: "rgba(59, 130, 246, 0.15)",
                                                transition: { type: "spring", stiffness: 400, damping: 10 }
                                            }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.05 + index * 0.03, duration: 0.4 }}
                                        >
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {skill}
                                            </span>
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <motion.button
                            onClick={() => setExpanded(!expanded)}
                            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                                text-white rounded-full font-medium shadow-lg overflow-hidden relative"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {/* Efeito de brilho em hover */}
                            <motion.div
                                className="absolute inset-0 w-full h-full bg-white/20"
                                initial={{ x: '-100%', skewX: '-15deg' }}
                                whileHover={{
                                    x: '200%',
                                    transition: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 1.5,
                                        ease: "easeInOut",
                                        repeatDelay: 0.5
                                    }
                                }}
                            />

                            <span className="relative z-10">
                                {expanded ? (
                                    <>
                                        {t("resume.buttons.showLess")}{" "}
                                        <ChevronUp className="ml-2 w-5 h-5 transform group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </>
                                ) : (
                                    <>
                                        {t("resume.buttons.showMore")}{" "}
                                        <ChevronDown className="ml-2 w-5 h-5 transform group-hover:scale-110 group-hover:translate-y-1 transition-transform duration-300" />
                                    </>
                                )}
                            </span>
                        </motion.button>
                    </div>

                    <div className="text-center mt-20">
                        <motion.div
                            className="perspective"
                            style={{
                                transform: !isMobile ?
                                    `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * -3}deg)` :
                                    'none'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <motion.a
                                href="./Jeferson_resume.pdf"
                                download
                                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                                    text-white rounded-full font-medium shadow-lg overflow-hidden relative"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Efeito de brilho em hover */}
                                <motion.div
                                    className="absolute inset-0 w-full h-full bg-white/20"
                                    initial={{ x: '-100%', skewX: '-15deg' }}
                                    whileHover={{
                                        x: '200%',
                                        transition: {
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            duration: 1.5,
                                            ease: "easeInOut",
                                            repeatDelay: 0.5
                                        }
                                    }}
                                />

                                <motion.div
                                    animate={{
                                        y: [0, -3, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="mr-3 relative z-10"
                                >
                                    <Download className="w-5 h-5" />
                                </motion.div>
                                <span className="relative z-10">{t("resume.buttons.downloadCV")}</span>
                            </motion.a>
                        </motion.div>

                        <motion.p
                            className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
                            animate={{
                                opacity: [0.8, 1, 0.8],
                                transition: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            {t("resume.downloadDescription")}
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Estilos CSS para animações adicionais */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
                .animate-float-reverse {
                    animation: float-reverse 5s ease-in-out infinite;
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                .perspective {
                    perspective: 1000px;
                }
                .perspective-3d {
                    perspective: 1000px;
                }
                .transform-gpu {
                    transform: translateZ(0);
                    will-change: transform;
                }
            `}</style>
        </section>
    );
};

export default Resume;
