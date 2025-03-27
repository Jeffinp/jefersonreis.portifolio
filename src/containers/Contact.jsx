import React, { useEffect, useRef, useState } from 'react';
import { PhoneCall, Mail, ClipboardCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation, useInView } from "framer-motion";

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
 * Componente de seção animada
 */
const AnimatedSection = ({ children, delay = 0, className = "" }) => {
    const { ref, controls } = useAnimatedVisibility(0.2);

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

const Contact = () => {
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('jefersonreisalmeida8356@gmail.com');
            alert(t('contact.emailCopied'));
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

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

    const contactInfo = [
        {
            icon: <PhoneCall className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300" aria-hidden="true" />,
            title: t('contact.callMe'),
            link: 'https://wa.me/qr/KW2XXA46XAXNH1',
            linkText: t('contact.phone'),
            ariaLabel: t('contact.ariaWhatsapp'),
            colorFrom: "blue",
            colorTo: "cyan",
            delay: 0.1
        },
        {
            icon: <Mail className="w-6 h-6 text-purple-500 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300" aria-hidden="true" />,
            title: t('contact.emailMe'),
            link: 'mailto:jefersonreisalmeida8356@gmail.com',
            linkText: t('contact.email'),
            ariaLabel: t('contact.ariaEmail'),
            colorFrom: "purple",
            colorTo: "pink",
            extraAction: {
                icon: <ClipboardCheck className="w-4 h-4 ml-2 text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-300" />,
                label: t('contact.copyEmail'),
                action: handleCopyEmail
            },
            delay: 0.2
        },
    ];

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-24 md:py-32"
            aria-label="Contato"
        >
            {/* Fundo dinâmico com gradiente ajustado para melhor transição com Testimonials */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-50/40 via-white to-blue-50/50 dark:from-indigo-950/30 dark:via-slate-900/90 dark:to-blue-950/30 -z-10"></div>

            {/* Grades e elementos decorativos */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                                   linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />

            {/* Formas decorativas flutuantes com movimento de paralaxe */}
            <div className="absolute inset-0 overflow-visible pointer-events-none -z-10">
                {/* Bolha decorativa adicional para conexão com Testimonials - ajustada para cores e posição complementares */}
                <div className={`absolute rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl section-boundary-bubble ${isMobile ? 'w-[400px] h-[400px] top-[-250px] left-[40%]' : 'w-[800px] h-[800px] top-[-500px] left-[35%] transform translate-x-[-50%]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) translate(-50%, 0)`
                    }}
                />

                {/* Círculos com gradiente e blur - ajustados para complementar Testimonials */}
                <div className={`absolute rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl ${isMobile ? 'w-[300px] h-[300px] -top-[150px] -right-[150px]' : 'w-[600px] h-[600px] -top-[300px] -right-[300px]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
                    }}
                />
                <div className={`absolute rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl ${isMobile ? 'w-[250px] h-[250px] -bottom-[150px] -left-[100px]' : 'w-[500px] h-[500px] -bottom-[250px] -left-[250px]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
                    }}
                />
                <div className={`absolute rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl ${isMobile ? 'w-[200px] h-[200px] top-[30%] -left-[100px]' : 'w-[400px] h-[400px] top-[30%] -left-[200px]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
                    }}
                />

                {/* Formas geométricas animadas */}
                {!isMobile && (
                    <>
                        <div className="absolute top-20 left-[15%] w-10 h-10 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-md animate-float-slow transform rotate-12"
                            style={{
                                transform: `rotate(12deg) translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`
                            }}
                        />
                        <div className="absolute top-[40%] right-[20%] w-14 h-14 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-full animate-float-reverse transform -rotate-12"
                            style={{
                                transform: `rotate(-12deg) translate(${mousePosition.x * 35}px, ${mousePosition.y * 35}px)`
                            }}
                        />
                        <div className="absolute bottom-[30%] left-[25%] w-16 h-16 border-2 border-indigo-500/30 dark:border-indigo-400/30 rounded-lg animate-float transform rotate-45"
                            style={{
                                transform: `rotate(45deg) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
                            }}
                        />
                    </>
                )}

                {/* Formas simplificadas para mobile */}
                {isMobile && (
                    <>
                        <div className="absolute top-20 right-10 w-8 h-8 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-md animate-float-slow" />
                        <div className="absolute bottom-40 left-10 w-10 h-10 border-2 border-blue-500/30 dark:border-blue-400/30 rounded-full animate-float" />
                    </>
                )}
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-16 md:mb-20">
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
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            {t('contact.title')}
                        </h2>
                    </motion.div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {contactInfo.map((item, index) => {
                        const isHovered = hoveredCard === index;

                        // Transformação 3D baseada na posição do mouse
                        const transform = !isMobile ?
                            `perspective(1000px) rotateY(${mousePosition.x * 8}deg) rotateX(${mousePosition.y * -8}deg)` :
                            'none';

                        return (
                            <AnimatedSection delay={item.delay} key={index} className="group">
                                <motion.div
                                    className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-500"
                                    style={{ transform }}
                                    whileHover={{ scale: 1.03 }}
                                    onHoverStart={() => setHoveredCard(index)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                >
                                    {/* Efeito de borda inferior com gradiente */}
                                    <div className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Fundo com gradiente */}
                                    <div className={`absolute inset-0 bg-gradient-to-br from-white/0 to-${item.colorFrom}-50/30 dark:from-slate-800/0 dark:to-${item.colorFrom}-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                    {/* Elemento decorativo */}
                                    <div className={`absolute -right-3 -top-3 w-32 h-32 bg-gradient-to-br from-${item.colorFrom}-400/20 to-${item.colorTo}-400/20 dark:from-${item.colorFrom}-600/20 dark:to-${item.colorTo}-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500`} />

                                    <div className="p-8 flex flex-col items-center relative z-10">
                                        <motion.div
                                            className={`w-16 h-16 rounded-full bg-gradient-to-r from-${item.colorFrom}-500/10 to-${item.colorTo}-500/10 flex items-center justify-center mb-6`}
                                            animate={{
                                                scale: isHovered ? 1.1 : 1,
                                                rotate: isHovered ? 5 : 0
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 10
                                            }}
                                        >
                                            {/* Resplandor do ícone */}
                                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 blur-md group-hover:animate-pulse-slow rounded-full"></div>
                                            {item.icon}
                                        </motion.div>

                                        <motion.h3
                                            className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300"
                                        >
                                            {item.title}
                                        </motion.h3>

                                        <div className="flex items-center gap-2">
                                            <motion.a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={item.ariaLabel}
                                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 break-all group"
                                                whileHover={{ scale: 1.03 }}
                                            >
                                                <span className="relative">
                                                    {item.linkText}
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                                                </span>
                                            </motion.a>

                                            {item.extraAction && (
                                                <motion.button
                                                    onClick={item.extraAction.action}
                                                    aria-label={item.extraAction.label}
                                                    className="text-gray-400 hover:text-purple-500 transition-colors duration-300"
                                                    type="button"
                                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {item.extraAction.icon}
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        );
                    })}
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
                .animate-pulse-slow {
                    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                .perspective {
                    perspective: 1000px;
                }
                .perspective-3d {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
};

export default Contact;