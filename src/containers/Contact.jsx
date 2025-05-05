import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import { PhoneCall, Mail, ClipboardCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
 * Componente de seção animada
 */
const AnimatedSection = memo(({ children, delay = 0, className = "" }) => {
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
});

AnimatedSection.displayName = 'AnimatedSection';

// Componente memoizado para o cartão de contato
const ContactCard = memo(({ item, index, isMobile, mousePosition, hoveredCard, setHoveredCard }) => {
    const isHovered = hoveredCard === index;

    // Transformação 3D baseada na posição do mouse (simplificada)
    const transform = !isMobile ?
        `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)` :
        'none';

    return (
        <AnimatedSection delay={item.delay} key={index} className="group">
            <motion.div
                className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{ transform }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
            >
                <div className="p-8 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                        {item.icon}
                        <h3 className="text-xl font-bold ml-4 text-gray-800 dark:text-white">
                            {item.title}
                        </h3>
                    </div>

                    <a
                        href={item.link}
                        className="group inline-flex items-center text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mt-2 transition-colors duration-300"
                        aria-label={item.ariaLabel}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                        {item.linkText}

                        {item.extraAction && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    item.extraAction.action();
                                }}
                                className="ml-2 inline-flex items-center text-sm"
                                aria-label={item.extraAction.label}
                            >
                                {item.extraAction.icon}
                            </button>
                        )}
                    </a>
                </div>
            </motion.div>
        </AnimatedSection>
    );
});

ContactCard.displayName = 'ContactCard';

// Componente memoizado para o fundo
const Background = memo(({ isMobile, mousePosition }) => (
    <>
        {/* Grades */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
            style={{
                backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                               linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                backgroundSize: isMobile ? '40px 40px' : '80px 80px'
            }}
        />

        {/* Formas decorativas simplificadas - bolhas centralizadas */}
        <div className="absolute inset-0 overflow-visible pointer-events-none -z-10">
            <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/15 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: -1, transform: 'translate(-50%, -50%) scale(0.7)' }} />
        </div>
    </>
));

Background.displayName = 'Background';

const Contact = () => {
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Memoizar a função de cópia de email
    const handleCopyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText('jefersonreisalmeida8356@gmail.com');
            alert(t('contact.emailCopied'));
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    }, [t]);

    // Detectar dispositivo móvel com debounce
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

    // Memoizando os dados de contato
    const contactInfo = React.useMemo(() => [
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
    ], [t, handleCopyEmail]);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-20 md:py-24 bg-transparent"
            aria-label="Contato"
        >
            {/* Fundo de quadrados alinhados igual ao atuacao/skills/projects/resume */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />
            {/* Bolhas centralizadas */}
            <div className="absolute inset-0 overflow-visible pointer-events-none -z-10">
                <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/15 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: -1, transform: 'translate(-50%, -50%) scale(0.7)' }} />
            </div>

            {/* Fundo e elementos decorativos memoizados */}
            <Background isMobile={isMobile} mousePosition={mousePosition} />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
                        {t('contact.title')}
                    </h2>
                    <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {contactInfo.map((item, index) => (
                        <ContactCard
                            key={index}
                            item={item}
                            index={index}
                            isMobile={isMobile}
                            mousePosition={mousePosition}
                            hoveredCard={hoveredCard}
                            setHoveredCard={setHoveredCard}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(Contact);