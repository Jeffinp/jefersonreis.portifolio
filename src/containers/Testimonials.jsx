import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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

const Testimonials = () => {
    const { t } = useTranslation();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const autoplayInterval = useRef(null);
    const autoplayDelay = 25000;

    const testimonials = t("testimonials.testimonialsList", {
        returnObjects: true,
    });

    const goToSlide = (index) => setActiveSlideIndex(index);
    const moveToNextSlide = () =>
        setActiveSlideIndex((prev) => (prev + 1) % testimonials.length);
    const moveToPrevSlide = () =>
        setActiveSlideIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );

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

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const updateSlidePosition = () => {
            const slideWidth = track.children[0]?.offsetWidth || 0;
            track.style.transform = `translateX(${-slideWidth * activeSlideIndex}px)`;
        };

        const startAutoplay = () => {
            if (autoplayInterval.current || isHovering) return;
            autoplayInterval.current = setInterval(moveToNextSlide, autoplayDelay);
        };

        const stopAutoplay = () => {
            if (autoplayInterval.current) {
                clearInterval(autoplayInterval.current);
                autoplayInterval.current = null;
            }
        };

        let touchStartX = 0;

        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoplay();
        };

        const handleTouchEnd = (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) moveToNextSlide();
                else moveToPrevSlide();
            }

            startAutoplay();
        };

        updateSlidePosition();
        startAutoplay();

        track.addEventListener("touchstart", handleTouchStart, { passive: true });
        track.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("resize", updateSlidePosition);

        return () => {
            stopAutoplay();
            track.removeEventListener("touchstart", handleTouchStart);
            track.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("resize", updateSlidePosition);
        };
    }, [activeSlideIndex, testimonials.length, isHovering]);

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative py-24 md:py-32"
            aria-label="Depoimentos"
        >
            {/* Fundo dinâmico com gradiente ajustado para melhor transição com Contact */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-purple-50/40 dark:from-blue-950/30 dark:via-slate-900/90 dark:to-indigo-950/30 -z-10"></div>

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
                {/* Bolha decorativa para conexão com Portfolio - ajustada para tons compatíveis */}
                <div className={`absolute rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl section-boundary-bubble ${isMobile ? 'w-[400px] h-[400px] top-[-250px] left-[40%]' : 'w-[800px] h-[800px] top-[-500px] left-[35%] transform translate-x-[-50%]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) translate(-50%, 0)`
                    }}
                />

                {/* Bolha decorativa para conexão com Contact - ajustada para melhor fluxo */}
                <div className={`absolute rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl section-boundary-bubble ${isMobile ? 'w-[400px] h-[400px] bottom-[-250px] right-[40%]' : 'w-[800px] h-[800px] bottom-[-500px] right-[35%] transform translate-x-[50%]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) translate(50%, 0)`
                    }}
                />

                {/* Círculos com gradiente e blur */}
                <div className={`absolute rounded-full bg-yellow-500/10 dark:bg-yellow-500/15 blur-3xl ${isMobile ? 'w-[300px] h-[300px] -top-[150px] -right-[150px]' : 'w-[600px] h-[600px] -top-[300px] -right-[300px]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
                    }}
                />
                <div className={`absolute rounded-full bg-teal-500/10 dark:bg-teal-500/15 blur-3xl ${isMobile ? 'w-[250px] h-[250px] -bottom-[150px] -left-[100px]' : 'w-[500px] h-[500px] -bottom-[250px] -left-[250px]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
                    }}
                />
                <div className={`absolute rounded-full bg-pink-500/10 dark:bg-pink-500/15 blur-3xl ${isMobile ? 'w-[200px] h-[200px] top-[30%] -left-[100px]' : 'w-[400px] h-[400px] top-[30%] -left-[200px]'}`}
                    style={{
                        transform: isMobile ? 'none' : `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
                    }}
                />

                {/* Formas geométricas animadas */}
                {!isMobile && (
                    <>
                        <div className="absolute top-20 left-[15%] w-10 h-10 border-2 border-yellow-500/30 dark:border-yellow-400/30 rounded-md animate-float-slow transform rotate-12"
                            style={{
                                transform: `rotate(12deg) translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`
                            }}
                        />
                        <div className="absolute top-[40%] right-[20%] w-14 h-14 border-2 border-teal-500/30 dark:border-teal-400/30 rounded-full animate-float-reverse transform -rotate-12"
                            style={{
                                transform: `rotate(-12deg) translate(${mousePosition.x * 35}px, ${mousePosition.y * 35}px)`
                            }}
                        />
                        <div className="absolute bottom-[30%] left-[25%] w-16 h-16 border-2 border-pink-500/30 dark:border-pink-400/30 rounded-lg animate-float transform rotate-45"
                            style={{
                                transform: `rotate(45deg) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
                            }}
                        />
                    </>
                )}

                {/* Formas simplificadas para mobile */}
                {isMobile && (
                    <>
                        <div className="absolute top-20 right-10 w-8 h-8 border-2 border-yellow-500/30 dark:border-yellow-400/30 rounded-md animate-float-slow" />
                        <div className="absolute bottom-40 left-10 w-10 h-10 border-2 border-pink-500/30 dark:border-pink-400/30 rounded-full animate-float" />
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
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-teal-600 dark:from-yellow-400 dark:via-pink-400 dark:to-teal-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                            {t("testimonials.title")}
                        </h2>
                    </motion.div>

                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        {t("testimonials.subtitle")}
                    </motion.p>
                </AnimatedSection>

                <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-white/20 dark:border-slate-700/80 shadow-xl">
                    <div
                        ref={trackRef}
                        className="flex transition-transform duration-500 ease-out"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {testimonials.map((testimonial, index) => {
                            // Transformação 3D baseada na posição do mouse
                            const isActive = activeSlideIndex === index;
                            const transform = !isMobile && isActive ?
                                `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * -3}deg)` :
                                'none';

                            return (
                                <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                                    <motion.div
                                        className="group relative h-full rounded-xl overflow-hidden shadow-lg bg-white/95 dark:bg-slate-800/95 border border-white/30 dark:border-slate-700/80"
                                        style={{ transform }}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Fundo com gradiente */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-yellow-50/50 dark:from-slate-800/0 dark:to-yellow-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="p-8 relative z-10">
                                            <div className="flex mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ scale: 1 }}
                                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                                    >
                                                        <Star
                                                            className="w-5 h-5 text-yellow-400 fill-current"
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 italic">
                                                {testimonial.content}
                                            </p>

                                            <div className="flex items-center mt-6">
                                                {testimonial.image && (
                                                    <motion.div
                                                        className="mr-4"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                    >
                                                        <img
                                                            src={testimonial.image}
                                                            alt={t("testimonials.imageAlt", {
                                                                name: testimonial.author,
                                                            })}
                                                            className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 group-hover:ring-purple-500 transition-all duration-300"
                                                            loading="lazy"
                                                        />
                                                    </motion.div>
                                                )}
                                                <div>
                                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                                        {testimonial.author}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        {testimonial.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>

                    <motion.button
                        onClick={moveToPrevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.5), 0 10px 10px -5px rgba(59, 130, 246, 0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={t("testimonials.accessibility.prevButton")}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </motion.button>

                    <motion.button
                        onClick={moveToNextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.5), 0 10px 10px -5px rgba(59, 130, 246, 0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={t("testimonials.accessibility.nextButton")}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </motion.button>

                    {/* Indicadores de slide */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {testimonials.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full ${activeSlideIndex === index
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-md w-8 transition-all duration-300'
                                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500 transition-all duration-300'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={t("testimonials.accessibility.goToSlide", { number: index + 1 })}
                            />
                        ))}
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
            `}</style>
        </section>
    );
};

export default Testimonials;