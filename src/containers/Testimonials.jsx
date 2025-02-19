import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials = () => {
    const { t } = useTranslation();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
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
        <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900/55 dark:to-slate-900/55">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                        {t("testimonials.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t("testimonials.subtitle")}
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
                    <div
                        ref={trackRef}
                        className="flex transition-transform duration-500 ease-out"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                                <div className="group relative h-full rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105">
                                    <div className="p-8">
                                        <div className="flex mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-5 h-5 text-yellow-400 fill-current"
                                                />
                                            ))}
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 italic">
                                            {testimonial.content}
                                        </p>

                                        <div className="flex items-center mt-6">
                                            {testimonial.image && (
                                                <div className="mr-4">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={t("testimonials.imageAlt", {
                                                            name: testimonial.author,
                                                        })}
                                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 group-hover:ring-purple-500 transition-all duration-300"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                                    {testimonial.author}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {testimonial.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={moveToPrevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110"
                        aria-label={t("testimonials.accessibility.prevButton")}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={moveToNextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110"
                        aria-label={t("testimonials.accessibility.nextButton")}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;