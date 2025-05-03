import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
 * Componente de seção animada - memoizado para evitar re-renderizações
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

// Componente memoizado para o fundo
const Background = memo(({ isMobile, mousePosition }) => (
    <>
        {/* Fundo dinâmico simplificado */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-purple-50/40 dark:from-blue-950/30 dark:via-slate-900/90 dark:to-indigo-950/30 -z-10"></div>

        {/* Grades estáticas */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
            style={{
                backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), 
                               linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                backgroundSize: isMobile ? '40px 40px' : '80px 80px'
            }}
        />

        {/* Formas decorativas simplificadas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Bolhas principais */}
            <div className="absolute rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl w-[600px] h-[600px] -top-[300px] left-[35%] transform translate-x-[-50%]" />
            <div className="absolute rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl w-[400px] h-[400px] -bottom-[200px] -left-[200px]" />
            
            {/* Apenas algumas formas geométricas estáticas em desktop */}
            {!isMobile && (
                <div className="absolute top-20 left-[15%] w-10 h-10 border-2 border-yellow-500/30 dark:border-yellow-400/30 rounded-md animate-float-slow" />
            )}
        </div>
    </>
));

Background.displayName = 'Background';

// Componente memoizado para as estrelas de avaliação
const RatingStars = memo(({ rating }) => (
    <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={16}
                className={`${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"} mr-1`}
                aria-hidden="true"
            />
        ))}
    </div>
));

RatingStars.displayName = 'RatingStars';

// Componente memoizado para cada slide de testemunho
const TestimonialSlide = memo(({ testimonial, t, index, activeIndex, isMobile, mousePosition }) => {
    const isActive = index === activeIndex;

    return (
        <div 
            className="flex-shrink-0 w-full px-4 md:px-8"
            aria-hidden={!isActive}
        >
            <div 
                className={`relative p-6 md:p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/80 shadow-xl h-full max-w-3xl mx-auto
                            ${isActive ? 'ring-2 ring-blue-200 dark:ring-blue-900' : ''}`}
                style={!isMobile && isActive ? {
                    transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * -3}deg)`
                } : {}}
            >
                <RatingStars rating={testimonial.rating} />
                
                <blockquote>
                    <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 mb-6">
                        {testimonial.content}
                    </p>
                    <footer className="flex items-center">
                        {testimonial.image && (
                            <div className="flex-shrink-0 mr-4">
                                <img
                                    src={testimonial.image}
                                    alt={t('testimonials.imageAlt', { name: testimonial.author })}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
                                    loading="lazy"
                                />
                            </div>
                        )}
                        <div>
                            <div className="font-bold text-gray-800 dark:text-gray-200">
                                {testimonial.author}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {testimonial.title}
                            </div>
                        </div>
                    </footer>
                </blockquote>
            </div>
        </div>
    );
});

TestimonialSlide.displayName = 'TestimonialSlide';

// Componente memoizado para botões de navegação
const NavigationButton = memo(({ onClick, direction, disabled, ariaLabel }) => {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
    
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`absolute top-1/2 transform -translate-y-1/2 z-20
                ${direction === 'prev' ? 'left-2 md:left-4' : 'right-2 md:right-4'}
                ${disabled ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100 cursor-pointer'}
                bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 md:p-3
                border border-gray-200 dark:border-gray-700 shadow-lg
                transition-opacity duration-300`}
        >
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-800 dark:text-gray-200" />
        </button>
    );
});

NavigationButton.displayName = 'NavigationButton';

const Testimonials = () => {
    const { t } = useTranslation();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const autoplayInterval = useRef(null);
    const autoplayDelay = 5000; // Reduzido para 5 segundos para melhor experiência

    // Memoizando os testimonials
    const testimonials = React.useMemo(() => 
        t("testimonials.testimonialsList", { returnObjects: true })
    , [t]);

    // Handlers memoizados
    const goToSlide = useCallback((index) => {
        setActiveSlideIndex(index);
    }, []);

    const moveToNextSlide = useCallback(() => {
        setActiveSlideIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const moveToPrevSlide = useCallback(() => {
        setActiveSlideIndex((prev) => 
            (prev - 1 + testimonials.length) % testimonials.length
        );
    }, [testimonials.length]);

    // Detectar dispositivo móvel com callback memoizado
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
        if (isMobile) return () => {};

        const handleMouseMove = debounce((e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePosition({
                x: (x / rect.width) - 0.5,
                y: (y / rect.height) - 0.5
            });
        }, 50); // 50ms debounce para melhor performance

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

    // Gerenciamento do carrossel e autoplay
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

        // Eventos de toque para dispositivos móveis
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

        // Inicialização
        updateSlidePosition();
        startAutoplay();

        // Event listeners com cleanup
        const handleResizeDebounced = debounce(updateSlidePosition, 250);
        
        track.addEventListener("touchstart", handleTouchStart, { passive: true });
        track.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("resize", handleResizeDebounced);

        return () => {
            stopAutoplay();
            track.removeEventListener("touchstart", handleTouchStart);
            track.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("resize", handleResizeDebounced);
        };
    }, [activeSlideIndex, isHovering, moveToNextSlide, moveToPrevSlide, autoplayDelay]);

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative py-16 md:py-24 overflow-hidden"
            aria-labelledby="testimonials-heading"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Fundo simplificado e memoizado */}
            <Background isMobile={isMobile} mousePosition={mousePosition} />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <AnimatedSection className="text-center mb-12 md:mb-16">
                    <h2 
                        id="testimonials-heading"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                    >
                        {t('testimonials.title')}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {t('testimonials.subtitle')}
                    </p>
                </AnimatedSection>

                <div className="relative max-w-5xl mx-auto">
                    {/* Botões de navegação memoizados */}
                    <NavigationButton 
                        onClick={moveToPrevSlide}
                        direction="prev"
                        disabled={false}
                        ariaLabel={t('testimonials.accessibility.prevButton')}
                    />
                    
                    <NavigationButton 
                        onClick={moveToNextSlide}
                        direction="next"
                        disabled={false}
                        ariaLabel={t('testimonials.accessibility.nextButton')}
                    />

                    {/* Container do carrossel */}
                    <div className="overflow-hidden">
                        <div
                            ref={trackRef}
                            className="flex transition-transform duration-500 ease-out"
                            style={{ touchAction: 'pan-y' }}
                        >
                            {/* Slides memoizados */}
                            {testimonials.map((testimonial, index) => (
                                <TestimonialSlide
                                    key={index}
                                    testimonial={testimonial}
                                    t={t}
                                    index={index}
                                    activeIndex={activeSlideIndex}
                                    isMobile={isMobile}
                                    mousePosition={mousePosition}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Indicadores de paginação simplificados */}
                    <div className="flex justify-center mt-8 gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    index === activeSlideIndex ? "bg-blue-600 w-5" : "bg-gray-300 dark:bg-gray-700"
                                }`}
                                aria-label={t('testimonials.accessibility.goToSlide', { number: index + 1 })}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(Testimonials);