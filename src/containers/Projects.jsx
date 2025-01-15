import React, { useState, useEffect, useRef, useCallback } from 'react';

const projects = [
    {
        category: 'web',
        image: '/assets/images/Screenshot_987.webp',
        title: 'Curso de Desenho Online',
        description: 'Site desenvolvido para um professor de desenho, utilizando HTML, CSS e JavaScript. Foco em experiência de usuário intuitiva e design responsivo.',
        link: 'https://www.desenhosricardodias.com.br/',
        type: 'contracted'
    },
    // ... rest of the projects array remains the same
];

const ProjectCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visibleItems, setVisibleItems] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');

    const startPos = useRef(0);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
    const animationId = useRef(null);
    const autoAdvanceTimer = useRef(null);
    const trackRef = useRef(null);
    const itemWidth = useRef(0);

    const filterItems = useCallback((category) => {
        setActiveFilter(category);
        if (trackRef.current) {
            const items = Array.from(trackRef.current.children);
            items.forEach(item => {
                const shouldShow = category === 'all' || item.dataset.category === category;
                item.style.display = shouldShow ? 'flex' : 'none';
            });
            setCurrentIndex(0);
            updateVisibleItems();
        }
    }, []);

    const updateVisibleItems = useCallback(() => {
        if (!trackRef.current) return;
        const items = Array.from(trackRef.current.children);
        const updatedVisibleItems = items.filter(item =>
            item.style.display !== 'none' &&
            window.getComputedStyle(item).display !== 'none'
        );
        setVisibleItems(updatedVisibleItems);
    }, []);

    const showSlide = useCallback((index) => {
        if (visibleItems.length === 0 || isTransitioning) return;
        const newIndex = ((index % visibleItems.length) + visibleItems.length) % visibleItems.length;
        setCurrentIndex(newIndex);
        const offset = -newIndex * itemWidth.current;
        currentTranslate.current = offset;
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${offset}px)`;
        }
    }, [visibleItems.length, isTransitioning]);

    const nextSlide = useCallback(() => {
        if (!isTransitioning) {
            showSlide(currentIndex + 1);
        }
    }, [currentIndex, isTransitioning, showSlide]);

    const prevSlide = useCallback(() => {
        if (!isTransitioning) {
            showSlide(currentIndex - 1);
        }
    }, [currentIndex, isTransitioning, showSlide]);

    useEffect(() => {
        const handleResize = () => {
            if (!trackRef.current) return;
            updateVisibleItems();
            if (visibleItems.length > 0) {
                itemWidth.current = visibleItems[0].offsetWidth;
                showSlide(currentIndex);
            }
        };

        const startAutoAdvance = () => {
            clearInterval(autoAdvanceTimer.current);
            autoAdvanceTimer.current = setInterval(() => {
                if (!isHovering && !isTransitioning) {
                    nextSlide();
                }
            }, 4000);
        };

        handleResize();
        startAutoAdvance();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(autoAdvanceTimer.current);
        };
    }, [currentIndex, isHovering, isTransitioning, nextSlide, showSlide, updateVisibleItems, visibleItems.length]);

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Meu Portfólio
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Projetos e trabalhos que demonstram minhas habilidades
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {['all', 'web', 'design', 'motion', 'modelagem'].map((category) => (
                        <button
                            key={category}
                            onClick={() => filterItems(category)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl
                                ${activeFilter === category
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg">
                    <div
                        ref={trackRef}
                        className="flex transition-transform duration-500 ease-out"
                        style={{ touchAction: 'pan-y pinch-zoom' }}
                    >
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                data-category={project.category}
                                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4"
                            >
                                <div className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800">
                                    <div className="relative pb-[60%]">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="absolute w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        {project.type === 'contracted' && (
                                            <span className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm">
                                                Contratado
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                                            {project.description}
                                        </p>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                                            >
                                                Ver Projeto
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        aria-label="Projeto anterior"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        aria-label="Próximo projeto"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProjectCarousel;