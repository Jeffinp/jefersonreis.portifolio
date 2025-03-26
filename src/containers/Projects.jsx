import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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

    // Valores para animação fluida
    const dragX = useMotionValue(0);
    const dragXProgress = useTransform(dragX, [-300, 300], [-1, 1]);
    const dragOpacity = useTransform(dragXProgress, [-1, 0, 1], [0.5, 1, 0.5]);

    // Referência para a máscara que contém o carrossel
    const carouselWrapperRef = useRef(null);

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
            setIsTransitioning(true);

            const newIndex =
                ((index % visibleItems.length) + visibleItems.length) %
                visibleItems.length;

            // Determinar a direção da animação (para esquerda ou direita)
            const goingRight = newIndex > currentIndex;

            // Atualizar o estado com o novo índice
            setCurrentIndex(newIndex);

            // Calcular o deslocamento
            const offset = -newIndex * itemWidth.current;
            currentTranslate.current = offset;

            // Animar com spring para transição suave
            if (trackRef.current) {
                // Aplicar transformação com efeito de profundidade
                trackRef.current.style.transform = `translateX(${offset}px)`;

                // Aplicar efeito parallax sutil nos itens
                const items = Array.from(trackRef.current.children);
                items.forEach((item, idx) => {
                    const isTarget = idx === newIndex;
                    const isBefore = idx < newIndex;
                    const isAfter = idx > newIndex;

                    // Aplicar estilos de transição para cada item
                    const card = item.querySelector('.group');
                    if (card) {
                        // Reset de estilos
                        card.style.transition = 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)';

                        if (isTarget) {
                            // Item atual - zoom suave para frente
                            card.style.transform = 'scale(1.02)';
                            card.style.zIndex = '10';
                            card.style.opacity = '1';
                        } else if (isBefore) {
                            // Itens anteriores - deslizam mais rápido
                            card.style.transform = goingRight ? 'scale(0.97) translateX(-5%)' : 'scale(0.99)';
                            card.style.zIndex = '1';
                            card.style.opacity = '0.8';
                        } else if (isAfter) {
                            // Itens posteriores - deslizam mais lento
                            card.style.transform = !goingRight ? 'scale(0.97) translateX(5%)' : 'scale(0.99)';
                            card.style.zIndex = '1';
                            card.style.opacity = '0.8';
                        }

                        // Restaurar após a transição
                        setTimeout(() => {
                            if (card) {
                                card.style.transform = '';
                                card.style.zIndex = '';
                                card.style.opacity = '';
                            }
                        }, 350);
                    }
                });
            }

            // Finalizar a transição após um breve delay
            setTimeout(() => {
                setIsTransitioning(false);
            }, 350); // Pouco mais que a duração da animação para garantir que termine
        },
        [currentIndex, visibleItems.length, preventScroll]
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
        dragX.set(0); // Reset da posição de drag

        // Configurar estilo para feedback imediato 
        if (trackRef.current) {
            trackRef.current.style.transition = 'none';
            // Adicionar cursor de arrasto
            document.body.style.cursor = 'grabbing';
        }

        cancelAnimationFrame(animationId.current);
    }, [isTransitioning, dragX]);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;

        const currentPosition = e.touches[0].clientX;
        const diff = currentPosition - startPos.current;

        // Atualizar o valor de dragX para animações reativas
        dragX.set(diff);

        // Adicionar resistência nos limites
        const maxTranslate = 0;
        const minTranslate = -(visibleItems.length - 1) * itemWidth.current;

        let newTranslate = prevTranslate.current + diff;

        // Resistência progressiva nos extremos
        if (newTranslate > maxTranslate) {
            const overscroll = newTranslate - maxTranslate;
            newTranslate = maxTranslate + overscroll * 0.2;
        } else if (newTranslate < minTranslate) {
            const overscroll = minTranslate - newTranslate;
            newTranslate = minTranslate - overscroll * 0.2;
        }

        currentTranslate.current = newTranslate;

        // Aplicar transformação com efeito parallax sutil
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${newTranslate}px)`;

            // Aplicar efeito de parallax nos itens
            const items = Array.from(trackRef.current.children);
            const swipingRight = diff > 0;
            const swipingLeft = diff < 0;

            items.forEach((item, idx) => {
                const card = item.querySelector('.group');
                if (card) {
                    const scaleValue = 1 - Math.abs(diff) * 0.0002; // Efeito sutil de escala
                    const translateFactor = diff * 0.02; // Movimento parallax

                    // Efeito de profundidade baseado na posição e direção
                    if (idx === currentIndex) {
                        // Item atual
                        card.style.transform = `scale(${scaleValue}) translateX(${translateFactor}px)`;
                    } else if (idx < currentIndex) {
                        // Itens anteriores - movimento mais intenso
                        card.style.transform = `scale(${scaleValue - 0.01}) translateX(${translateFactor * 1.2}px)`;
                    } else {
                        // Itens posteriores - movimento menos intenso
                        card.style.transform = `scale(${scaleValue - 0.01}) translateX(${translateFactor * 0.8}px)`;
                    }
                }
            });
        }
    }, [isDragging, visibleItems.length, currentIndex, dragX]);

    const handleTouchEnd = useCallback(() => {
        if (!isDragging) return;

        // Restaurar cursor
        document.body.style.cursor = '';

        // Determinar o snap baseado na velocidade e distância
        const movedBy = currentTranslate.current - prevTranslate.current;
        const swipeFraction = Math.abs(movedBy) / itemWidth.current;
        const swipeThreshold = 0.2; // 20% do slide
        const swipeBoost = 1 + Math.min(swipeFraction * 2, 0.5); // Boost baseado na velocidade

        setIsDragging(false);

        // Aplicar snap com animação aprimorada
        if (movedBy < -itemWidth.current * swipeThreshold) {
            // Swipe para a esquerda - avança
            showSlide(currentIndex + 1);
        } else if (movedBy > itemWidth.current * swipeThreshold) {
            // Swipe para a direita - retrocede
            showSlide(currentIndex - 1);
        } else {
            // Retornar à posição do slide atual com animação suave
            if (trackRef.current) {
                trackRef.current.style.transition = 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
                trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;

                // Resetar quaisquer transformações aplicadas aos cartões
                const items = Array.from(trackRef.current.children);
                items.forEach(item => {
                    const card = item.querySelector('.group');
                    if (card) {
                        card.style.transition = 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
                        card.style.transform = '';
                    }
                });

                setTimeout(() => {
                    if (trackRef.current) {
                        trackRef.current.style.transition = 'transform 500ms ease-out';
                    }
                }, 300);
            }
        }

        // Resetar o valor de dragX
        dragX.set(0);
    }, [currentIndex, isDragging, showSlide, dragX]);

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
                    ref={carouselWrapperRef}
                    className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl perspective-800"
                    style={{ perspective: "1000px" }}
                >
                    <div
                        ref={trackRef}
                        className="flex will-change-transform"
                        style={{
                            touchAction: "pan-y pinch-zoom",
                            transition: "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                        }}
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
                                        y: -5,
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 15,
                                            mass: 0.8
                                        }
                                    }}
                                    initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                    animate={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                    whileTap={{ scale: 0.98, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                >
                                    <div className="relative pb-[60%] overflow-hidden">
                                        <motion.img
                                            src={project.image}
                                            alt={t(project.titleKey)}
                                            className="absolute w-full h-full object-cover"
                                            loading="lazy"
                                            initial={{ scale: 1 }}
                                            whileHover={{
                                                scale: 1.1,
                                                transition: {
                                                    duration: 0.5,
                                                    ease: [0.25, 1, 0.5, 1]
                                                }
                                            }}
                                        />
                                        {project.type === "contracted" && (
                                            <motion.div
                                                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: {
                                                        delay: 0.1,
                                                        duration: 0.3,
                                                        ease: "easeOut"
                                                    }
                                                }}
                                            >
                                                {t("portfolio.projectLabels.contracted")}
                                            </motion.div>
                                        )}

                                        {/* Gradiente sobreposto com efeito de profundidade */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                                        <motion.h3
                                            className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4"
                                            initial={{ backgroundPosition: "100% 0%" }}
                                            whileHover={{
                                                backgroundImage: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                                                backgroundClip: "text",
                                                backgroundSize: "200%",
                                                backgroundPosition: "0% 0%",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                transition: { duration: 0.5, ease: "easeOut" }
                                            }}
                                        >
                                            {t(project.titleKey)}
                                        </motion.h3>
                                        <p className="mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base flex-grow">
                                            {t(project.descriptionKey)}
                                        </p>
                                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                                            {project.technologies?.map((tech, techIndex) => (
                                                <motion.span
                                                    key={techIndex}
                                                    className="px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        backgroundColor: "rgba(59, 130, 246, 0.15)",
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 400,
                                                            damping: 10
                                                        }
                                                    }}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: {
                                                            delay: 0.1 + techIndex * 0.05,
                                                            duration: 0.3,
                                                            ease: "easeOut"
                                                        }
                                                    }}
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
                                                className="group inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm md:text-base font-medium overflow-hidden relative"
                                                whileHover={{
                                                    y: -3,
                                                    boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 10
                                                    }
                                                }}
                                                whileTap={{ scale: 0.98, y: 0 }}
                                                initial={{ scale: 1 }}
                                            >
                                                {/* Efeito de brilho ao passar o mouse */}
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

                                                <span className="relative z-10">{t("portfolio.projectLabels.viewProject")}</span>
                                                <motion.span
                                                    className="relative z-10 ml-2 inline-block"
                                                    initial={{ x: 0 }}
                                                    whileHover={{
                                                        x: 3,
                                                        transition: {
                                                            repeat: Infinity,
                                                            repeatType: "reverse",
                                                            duration: 0.3,
                                                            ease: "easeOut"
                                                        }
                                                    }}
                                                >
                                                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
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

                    {/* Botões de navegação aprimorados */}
                    <motion.button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md z-10"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                            from: "#4F46E5",
                            to: "#9333EA"
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0.8, scale: 0.95 }}
                        animate={{
                            opacity: isTransitioning ? 0.6 : 1,
                            scale: isTransitioning ? 0.9 : 1,
                            transition: { duration: 0.2 }
                        }}
                        aria-label={t("portfolio.projectLabels.prevProject")}
                        disabled={isTransitioning}
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />

                        {/* Efeito de onda circular ao clicar */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-white/20"
                            initial={{ scale: 0, opacity: 0 }}
                            whileTap={{
                                scale: 2,
                                opacity: [0, 0.5, 0],
                                transition: { duration: 0.5 }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                    </motion.button>

                    <motion.button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md z-10"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                            from: "#4F46E5",
                            to: "#9333EA"
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0.8, scale: 0.95 }}
                        animate={{
                            opacity: isTransitioning ? 0.6 : 1,
                            scale: isTransitioning ? 0.9 : 1,
                            transition: { duration: 0.2 }
                        }}
                        aria-label={t("portfolio.projectLabels.nextProject")}
                        disabled={isTransitioning}
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />

                        {/* Efeito de onda circular ao clicar */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-white/20"
                            initial={{ scale: 0, opacity: 0 }}
                            whileTap={{
                                scale: 2,
                                opacity: [0, 0.5, 0],
                                transition: { duration: 0.5 }
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                    </motion.button>

                    {/* Indicador de progresso */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {Array.from({ length: Math.ceil(visibleItems.length / 1) }).map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => showSlide(index)}
                                className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none"
                                initial={{ scale: 0.8 }}
                                animate={{
                                    scale: currentIndex === index ? 1.2 : 0.8,
                                    backgroundColor: currentIndex === index ? '#3B82F6' : '',
                                    transition: { duration: 0.3 }
                                }}
                                whileHover={{ scale: 1.5 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Ir para slide ${index + 1}`}
                            />
                        ))}
                    </div>
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
