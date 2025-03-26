import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Adicionando Framer Motion

const PortfolioSection = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visibleItems, setVisibleItems] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    // Adicionando estado para controlar rolagem durante transições
    const [preventScrollReset, setPreventScrollReset] = useState(false);

    const startPos = useRef(0);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
    const animationId = useRef(null);
    const autoAdvanceTimer = useRef(null);
    const trackRef = useRef(null);
    const itemWidth = useRef(0);

    const projects = [
        {
            category: "web",
            image: "/assets/images/flyserv.webp",
            titleKey: "portfolio.projects.flyserv.title",
            descriptionKey: "portfolio.projects.flyserv.description",
            link: "https://flyservdrones.com.br/",
            type: "contracted",
            technologies: ["HTML", "CSS", "JavaScript"],
        },
        {
            category: "web",
            image: "/assets/images/Screenshot_987.webp",
            titleKey: "portfolio.projects.onlineDrawingCourse.title",
            descriptionKey: "portfolio.projects.onlineDrawingCourse.description",
            link: "https://www.desenhosricardodias.com.br/",
            type: "contracted",
            technologies: ["HTML", "CSS", "JavaScript"],
        },
        {
            category: "web",
            image: "/assets/images/Screenshot_1023.webp",
            titleKey: "portfolio.projects.weightLossProgram.title",
            descriptionKey: "portfolio.projects.weightLossProgram.description",
            link: "https://secaedefine.vercel.app",
            type: "contracted",
            technologies: ["HTML", "CSS", "JavaScript"],
        },
        {
            category: "web",
            image: "/assets/images/Screenshot_1051.webp",
            titleKey: "portfolio.projects.fileManager.title",
            descriptionKey: "portfolio.projects.fileManager.description",
            link: "https://github.com/Jeffinp/file_organizer",
            type: "personal",
            technologies: ["Python", "File Management", "HTML", "CSS", "JavaScript"],
        },
        {
            category: "web",
            image: "/assets/images/Chatbot.webp",
            titleKey: "portfolio.projects.pythonChatbot.title",
            descriptionKey: "portfolio.projects.pythonChatbot.description",
            link: "https://github.com/Jeffinp/ProjetoPython",
            type: "personal",
            technologies: [
                "Python",
                "Machine Learning",
                "Natural Language Processing",
            ],
        },
        {
            category: "web",
            image: "/assets/images/jogoplataforma.webp",
            titleKey: "portfolio.projects.platformGame.title",
            descriptionKey: "portfolio.projects.platformGame.description",
            link: "https://plataforma-chatgpt-main.vercel.app/",
            type: "personal",
            technologies: ["JavaScript", "HTML", "CSS", "Game Development"],
        },
        {
            category: "web",
            image: "/assets/images/menuinterativo.webp",
            titleKey: "portfolio.projects.interactiveMenu.title",
            descriptionKey: "portfolio.projects.interactiveMenu.description",
            link: "https://menu-interativo.vercel.app/",
            type: "personal",
            technologies: ["JavaScript", "HTML", "CSS", "UI/UX Design"],
        },
        {
            category: "web",
            image: "/assets/images/Presente-Natal.webp",
            titleKey: "portfolio.projects.christmasGift.title",
            descriptionKey: "portfolio.projects.christmasGift.description",
            link: "https://aterrsagemresponsiva.netlify.app/",
            type: "personal",
            technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        },
        {
            category: "web",
            image: "/assets/images/Screenshot_993.webp",
            titleKey: "portfolio.projects.justlyTraining.title",
            descriptionKey: "portfolio.projects.justlyTraining.description",
            link: "https://justly.netlify.app/",
            type: "personal",
            technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        },
        {
            category: "web",
            image: "/assets/images/site.webp",
            titleKey: "portfolio.projects.personalPortfolio.title",
            descriptionKey: "portfolio.projects.personalPortfolio.description",
            link: "https://jefersonreis-github-io.vercel.app/index.html",
            type: "personal",
            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "Portfolio Design",
                "React",
                "Tailwind CSS",
            ],
        },
        {
            category: "web",
            image: "/assets/images/bookmark.webp",
            titleKey: "portfolio.projects.bookmarkManager.title",
            descriptionKey: "portfolio.projects.bookmarkManager.description",
            link: "https://bookmarkproject12.netlify.app/",
            type: "personal",
            technologies: ["HTML", "CSS", "JavaScript"],
        },
        {
            category: "web",
            image: "/assets/images/acsendoflex.webp",
            titleKey: "portfolio.projects.acsendoflex.title",
            descriptionKey: "portfolio.projects.acsendoflex.description",
            link: "https://ascendotraining.netlify.app/",
            type: "personal",
            technologies: ["HTML", "CSS", "JavaScript", "Landing Page"],
        },
        {
            category: "web",
            image: "/assets/images/Zomato.webp",
            titleKey: "portfolio.projects.zomatoLanding.title",
            descriptionKey: "portfolio.projects.zomatoLanding.description",
            link: "https://zomato.com",
            type: "personal",
            technologies: ["HTML", "CSS", "Landing Page Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/DuplaDoTerror.webp",
            titleKey: "portfolio.projects.terrorDuo.title",
            descriptionKey: "portfolio.projects.terrorDuo.description",
            technologies: ["Adobe Photoshop", "Clip Studio", "Illustration"],
        },
        {
            category: "motion",
            image: "/assets/images/Artes/BratailsAnim.gif",
            titleKey: "portfolio.projects.bratailsAnimated.title",
            descriptionKey: "portfolio.projects.bratailsAnimated.description",
            technologies: ["Clip Studio", "Motion Graphics", "2D Animation"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/Azete.webp",
            titleKey: "portfolio.projects.oliveBrandDesign.title",
            descriptionKey: "portfolio.projects.oliveBrandDesign.description",
            type: "contracted",
            technologies: ["Adobe Photoshop", "Branding", "Product Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/BandeiraEstilosaBrasil.webp",
            titleKey: "portfolio.projects.stylizedFlag.title",
            descriptionKey: "portfolio.projects.stylizedFlag.description",
            type: "contracted",
            technologies: ["Clip Studio", "Digital Art", "Illustration"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/DesignComputador.webp",
            titleKey: "portfolio.projects.gamerCase.title",
            descriptionKey: "portfolio.projects.gamerCase.description",
            type: "contracted",
            technologies: ["Adobe Photoshop", "Product Design", "Graphic Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/Estampa.webp",
            titleKey: "portfolio.projects.environmentShirt.title",
            descriptionKey: "portfolio.projects.environmentShirt.description",
            type: "contracted",
            technologies: ["Adobe Photoshop", "Graphic Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/ParasitaCaderno.webp",
            titleKey: "portfolio.projects.parasiteNotebook.title",
            descriptionKey: "portfolio.projects.parasiteNotebook.description",
            technologies: ["Illustration"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/giratina.webp",
            titleKey: "portfolio.projects.giratinaArt.title",
            descriptionKey: "portfolio.projects.giratinaArt.description",
            technologies: ["Illustration", "Adobe Photoshop"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/hamburguer.webp",
            titleKey: "portfolio.projects.burgerDesign.title",
            descriptionKey: "portfolio.projects.burgerDesign.description",
            type: "contracted",
            technologies: ["Adobe Photoshop", "Food Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/Alastor.webp",
            titleKey: "portfolio.projects.notebookDrawing.title",
            descriptionKey: "portfolio.projects.notebookDrawing.description",
            type: "contracted",
            technologies: ["Illustration", "Character Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/PizzalDoSul.webp",
            titleKey: "portfolio.projects.pizzaDesign.title",
            descriptionKey: "portfolio.projects.pizzaDesign.description",
            type: "contracted",
            technologies: ["Adobe Photoshop", "Food Marketing", "Graphic Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/PizzaInsta.webp",
            titleKey: "portfolio.projects.pizzaPromo.title",
            descriptionKey: "portfolio.projects.pizzaPromo.description",
            type: "contracted",
            technologies: [
                "Social Media Design",
                "Adobe Photoshop",
                "Promotional Design",
            ],
        },
        {
            category: "design",
            image: "/assets/images/Artes/ProtNave.webp",
            titleKey: "portfolio.projects.spaceshipPrototype.title",
            descriptionKey: "portfolio.projects.spaceshipPrototype.description",
            technologies: ["Concept Art", "Digital Illustration", "Sci-Fi Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/Bryan360.webp",
            titleKey: "portfolio.projects.bratails360.title",
            descriptionKey: "portfolio.projects.bratails360.description",
            technologies: ["Character Design", "Digital Art", "Illustration"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/BryanSorrindo.webp",
            titleKey: "portfolio.projects.bratailsSmiling.title",
            descriptionKey: "portfolio.projects.bratailsSmiling.description",
            technologies: ["Character Illustration", "Digital Art", "Portraiture"],
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/BratailsNave.webp",
            titleKey: "portfolio.projects.bratailsSpaceship.title",
            descriptionKey: "portfolio.projects.bratailsSpaceship.description",
            type: "contracted",
            technologies: ["Blender", "3D Modeling", "Sci-Fi Design"],
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/Asgemeas2.webp",
            titleKey: "portfolio.projects.twinSwords.title",
            descriptionKey: "portfolio.projects.twinSwords.description",
            technologies: ["Digital Art", "Swords Design", "Illustration"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/Angel.webp",
            titleKey: "portfolio.projects.angelSymbols.title",
            descriptionKey: "portfolio.projects.angelSymbols.description",
            technologies: ["Symbolism", "Digital Illustration", "Graphic Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/TFK.webp",
            titleKey: "portfolio.projects.fourKingdoms.title",
            descriptionKey: "portfolio.projects.fourKingdoms.description",
            type: "contracted",
            technologies: ["Concept Art", "Illustration", "Digital Painting"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/FurryQueMataFurry.webp",
            titleKey: "portfolio.projects.berserkInspired.title",
            descriptionKey: "portfolio.projects.berserkInspired.description",
            technologies: ["Digital Art", "Graphic anime Style", "Illustration"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/Annie.webp",
            titleKey: "portfolio.projects.anniePortrait.title",
            descriptionKey: "portfolio.projects.anniePortrait.description",
            technologies: ["Character Portrait", "Digital Painting", "Illustration"],
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/Cubos.webp",
            titleKey: "portfolio.projects.renderTest.title",
            descriptionKey: "portfolio.projects.renderTest.description",
            technologies: ["Blender", "3D Rendering", "Geometric Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/ArteVicente.webp",
            titleKey: "portfolio.projects.vicenteCover.title",
            descriptionKey: "portfolio.projects.vicenteCover.description",
            type: "contracted",
            technologies: ["Album Cover Design", "Graphic Design", "Digital Art"],
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/AsGemeas.webp",
            titleKey: "portfolio.projects.twinSwordsVariation.title",
            descriptionKey: "portfolio.projects.twinSwordsVariation.description",
            technologies: ["Digital Art", "Illustration", "Character Design"],
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/Asteroide.webp",
            titleKey: "portfolio.projects.asteroid3d.title",
            descriptionKey: "portfolio.projects.asteroid3d.description",
            technologies: ["Blender", "3D Modeling", "Space Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/BryanComFoice.webp",
            titleKey: "portfolio.projects.bratailsScythe.title",
            descriptionKey: "portfolio.projects.bratailsScythe.description",
            technologies: ["Character Design", "Digital Art", "Weapon Illustration"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/Bryanoao.webp",
            titleKey: "portfolio.projects.bratailsSurprised.title",
            descriptionKey: "portfolio.projects.bratailsSurprised.description",
            technologies: [
                "Character Illustration",
                "Digital Art",
                "Emotion Portrayal",
            ],
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/CapitaoAmerica.webp",
            titleKey: "portfolio.projects.captainShield.title",
            descriptionKey: "portfolio.projects.captainShield.description",
            technologies: ["3D Modeling", "Blender", "Prop Design"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/ClickTeamLogo.webp",
            titleKey: "portfolio.projects.clickteamLogo.title",
            descriptionKey: "portfolio.projects.clickteamLogo.description",
            type: "contracted",
            technologies: ["Logo Design", "Branding", "Adobe Photoshop"],
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/cycles.webp",
            titleKey: "portfolio.projects.donut3d.title",
            descriptionKey: "portfolio.projects.donut3d.description",
            technologies: ["Blender", "3D Rendering", "Texturing"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/forma1.webp",
            titleKey: "portfolio.projects.bossConcept.title",
            descriptionKey: "portfolio.projects.bossConcept.description",
            technologies: ["Concept Art", "Digital Illustration", "Character Design"],
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/cranio.webp",
            titleKey: "portfolio.projects.skull3d.title",
            descriptionKey: "portfolio.projects.skull3d.description",
            technologies: ["Blender", "3D Modeling", "Anatomical Alien Rendering"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/ProtScreabiny.webp",
            titleKey: "portfolio.projects.screavinyPrototype.title",
            descriptionKey: "portfolio.projects.screavinyPrototype.description",
            type: "contracted",
            technologies: ["Concept Design", "Digital Art", "Character Prototype"],
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/untitled.webp",
            titleKey: "portfolio.projects.modelingTest.title",
            descriptionKey: "portfolio.projects.modelingTest.description",
            technologies: ["3D Modeling", "Blender", "Rendering Test"],
        },
        {
            category: "design",
            image: "/assets/images/Artes/Versões.webp",
            titleKey: "portfolio.projects.discordIcons.title",
            descriptionKey: "portfolio.projects.discordIcons.description",
            type: "contracted",
            technologies: ["Icon Design", "Digital Art", "Branding"],
        },
    ];

    // Função otimizada para prevenir rolagem indesejada
    const preventScroll = useCallback(() => {
        if (isTransitioning) return;

        // Salvar a posição atual de scroll
        const scrollPosition = window.scrollY;
        setIsTransitioning(true);
        setPreventScrollReset(true);

        // Restaurar posição de scroll se mudar
        const handleScroll = () => {
            if (preventScrollReset) {
                window.scrollTo(0, scrollPosition);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Limpar após a transição
        setTimeout(() => {
            setIsTransitioning(false);
            setPreventScrollReset(false);
            window.removeEventListener('scroll', handleScroll);
        }, 500); // Corresponde à duração da transição
    }, [isTransitioning, preventScrollReset]);

    // Definindo updateVisibleItems primeiro, antes de ser usada em filterItems
    const updateVisibleItems = useCallback(() => {
        if (!trackRef.current) return;

        const items = Array.from(trackRef.current.children);
        const updatedVisibleItems = items.filter(
            (item) =>
                item.style.display !== "none" &&
                window.getComputedStyle(item).display !== "none"
        );

        setVisibleItems(updatedVisibleItems);

        // Ajustar largura dos itens após filtrar
        if (updatedVisibleItems.length > 0) {
            itemWidth.current = updatedVisibleItems[0].offsetWidth;
        }
    }, []);

    const filterItems = useCallback((category) => {
        if (isTransitioning) return;

        // Prevenir rolagem durante a filtragem
        preventScroll();
        setActiveFilter(category);

        if (trackRef.current) {
            const items = Array.from(trackRef.current.children);
            items.forEach((item) => {
                const shouldShow =
                    category === "all" || item.dataset.category === category;
                item.style.display = shouldShow ? "flex" : "none";
            });

            // Resetar índice de forma controlada
            setCurrentIndex(0);
            currentTranslate.current = 0;

            // Atualizar a transformação sem animação primeiro
            trackRef.current.style.transition = 'none';
            trackRef.current.style.transform = 'translateX(0)';

            // Forçar reflow antes de reativar transições
            trackRef.current.offsetHeight;

            // Restaurar transições após o DOM ser atualizado
            setTimeout(() => {
                if (trackRef.current) {
                    trackRef.current.style.transition = 'transform 500ms ease-out';
                    updateVisibleItems();
                }
            }, 50);
        }
    }, [isTransitioning, preventScroll, updateVisibleItems]);

    const showSlide = useCallback(
        (index) => {
            if (visibleItems.length === 0 || isTransitioning) return;

            preventScroll();

            const newIndex =
                ((index % visibleItems.length) + visibleItems.length) %
                visibleItems.length;

            setCurrentIndex(newIndex);

            const offset = -newIndex * itemWidth.current;
            currentTranslate.current = offset;

            if (trackRef.current) {
                trackRef.current.style.transform = `translateX(${offset}px)`;
            }
        },
        [visibleItems.length, isTransitioning, preventScroll]
    );

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

    // Otimizar gestão de autoAvance para evitar animações repetidas
    useEffect(() => {
        let isComponentMounted = true;

        const handleResize = () => {
            if (!trackRef.current || !isComponentMounted) return;

            // Cancelar animações em andamento
            cancelAnimationFrame(animationId.current);
            clearInterval(autoAdvanceTimer.current);

            // Recalcular com debounce
            updateVisibleItems();

            if (visibleItems.length > 0) {
                // Cálculo mais preciso da largura
                itemWidth.current = visibleItems[0].offsetWidth;

                // Atualizar posição sem animação para evitar saltos
                trackRef.current.style.transition = 'none';
                const offset = -currentIndex * itemWidth.current;
                currentTranslate.current = offset;
                trackRef.current.style.transform = `translateX(${offset}px)`;

                // Restaurar transição suave após atualização
                setTimeout(() => {
                    if (trackRef.current && isComponentMounted) {
                        trackRef.current.style.transition = 'transform 500ms ease-out';
                    }
                }, 50);
            }

            // Reiniciar auto-avanço
            startAutoAdvance();
        };

        const startAutoAdvance = () => {
            clearInterval(autoAdvanceTimer.current);

            // Só ativar auto-avanço se necessário
            if (visibleItems.length > 1) {
                autoAdvanceTimer.current = setInterval(() => {
                    if (!isHovering && !isTransitioning && isComponentMounted) {
                        nextSlide();
                    }
                }, 25000);
            }
        };

        // Inicialização
        handleResize();

        // Debounce para o resize
        let resizeTimer;
        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 250);
        };

        window.addEventListener("resize", debouncedResize);

        // Limpeza completa
        return () => {
            isComponentMounted = false;
            clearTimeout(resizeTimer);
            clearInterval(autoAdvanceTimer.current);
            cancelAnimationFrame(animationId.current);
            window.removeEventListener("resize", debouncedResize);
        };
    }, [
        currentIndex,
        isHovering,
        isTransitioning,
        nextSlide,
        updateVisibleItems,
        visibleItems.length,
    ]);

    // Adicionar suporte a gestos de toque
    const handleTouchStart = useCallback((e) => {
        if (isTransitioning) return;

        setIsDragging(true);
        startPos.current = e.touches[0].clientX;
        prevTranslate.current = currentTranslate.current;

        cancelAnimationFrame(animationId.current);
    }, [isTransitioning]);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;

        const currentPosition = e.touches[0].clientX;
        const diff = currentPosition - startPos.current;

        // Adicionar resistência nos limites
        const maxTranslate = 0;
        const minTranslate = -(visibleItems.length - 1) * itemWidth.current;

        let newTranslate = prevTranslate.current + diff;

        if (newTranslate > maxTranslate) {
            newTranslate = maxTranslate + (newTranslate - maxTranslate) * 0.2;
        } else if (newTranslate < minTranslate) {
            newTranslate = minTranslate + (newTranslate - minTranslate) * 0.2;
        }

        currentTranslate.current = newTranslate;

        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${newTranslate}px)`;
        }
    }, [isDragging, visibleItems.length]);

    const handleTouchEnd = useCallback(() => {
        if (!isDragging) return;

        setIsDragging(false);

        const movedBy = currentTranslate.current - prevTranslate.current;

        // Determinar direção do deslize
        if (movedBy < -50 && currentIndex < visibleItems.length - 1) {
            showSlide(currentIndex + 1);
        } else if (movedBy > 50 && currentIndex > 0) {
            showSlide(currentIndex - 1);
        } else {
            // Voltar à posição original se movimento pequeno
            showSlide(currentIndex);
        }
    }, [currentIndex, isDragging, showSlide, visibleItems.length]);

    return (
        <section
            id="portfolio"
            className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900/55 dark:to-slate-900/55"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                        {t("portfolio.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t("portfolio.subtitle")}
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {Object.entries(
                        t("portfolio.categories", { returnObjects: true })
                    ).map(([key, value], index) => (
                        <motion.button
                            key={key}
                            onClick={() => filterItems(key)}
                            className={`group px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-medium transition-all duration-300 text-sm md:text-base shadow-md hover:shadow-lg transform hover:-translate-y-1
                                ${activeFilter === key
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {value}
                        </motion.button>
                    ))}
                </motion.div>

                <div
                    className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl"
                >
                    <div
                        ref={trackRef}
                        className="flex transition-transform duration-500 ease-out"
                        style={{ touchAction: "pan-y pinch-zoom" }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                data-category={project.category}
                                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4"
                            >
                                <motion.div
                                    className="group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 h-full flex flex-col"
                                    whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <div className="relative pb-[60%] overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={t(project.titleKey)}
                                            className="absolute w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        {project.type === "contracted" && (
                                            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                                                {t("portfolio.projectLabels.contracted")}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                            {t(project.titleKey)}
                                        </h3>
                                        <p className="mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base flex-grow">
                                            {t(project.descriptionKey)}
                                        </p>
                                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                                            {project.technologies?.map((tech, techIndex) => (
                                                <motion.span
                                                    key={techIndex}
                                                    className="px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                        {project.link && (
                                            <motion.a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm md:text-base font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                                                whileHover={{ y: -3 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {t("portfolio.projectLabels.viewProject")}
                                                <motion.span className="ml-2 inline-block">
                                                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 transform group-hover:scale-110 transition-transform duration-300" />
                                                </motion.span>
                                            </motion.a>
                                        )}
                                    </div>
                                    <motion.div
                                        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500"
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        whileHover={{ scaleX: 1, opacity: 1 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={t("portfolio.projectLabels.prevProject")}
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </motion.button>
                    <motion.button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={t("portfolio.projectLabels.nextProject")}
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </motion.button>
                </div>

                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.a
                        href="https://drive.google.com/drive/folders/1kNUbhpuYBDRTLjD66vBwfSweugiabAIE?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center px-5 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm md:text-base font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t("portfolio.projectLabels.viewHighRes")}
                        <motion.span
                            className="ml-2"
                            animate={{ x: [0, 3, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                                repeatDelay: 1
                            }}
                        >
                            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default PortfolioSection;
