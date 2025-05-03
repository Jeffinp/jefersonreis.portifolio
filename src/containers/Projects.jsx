import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { debounce } from '../utils';

// Componente memoizado para o botão de navegação do carrossel
const CarouselButton = memo(({ direction, onClick, disabled }) => {
    const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`absolute top-1/2 transform -translate-y-1/2 z-20
                ${direction === 'left' ? 'left-2 md:left-4' : 'right-2 md:right-4'}
                ${disabled ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}
                bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 md:p-3
                border border-gray-200 dark:border-gray-700 shadow-lg
                transition-opacity duration-300`}
            aria-label={direction === 'left' ? 'Previous project' : 'Next project'}
        >
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-800 dark:text-gray-200" />
        </button>
    );
});

CarouselButton.displayName = 'CarouselButton';

// Componente memoizado para o item do projeto
const ProjectItem = memo(({ project, t, isMobile }) => {
    const { category, image, titleKey, descriptionKey, link, technologies = [] } = project;

    return (
        <div className="flex-shrink-0 w-full sm:w-[340px] md:w-[380px] lg:w-[400px] p-2 sm:p-4">
            <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transform transition duration-300 hover:shadow-xl dark:hover:shadow-2xl">
                <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden">
                    <img
                        src={image}
                        alt={t(titleKey)}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                    />
                    {category && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600/80 text-white text-xs rounded-md backdrop-blur-sm">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </div>
                    )}
                </div>

                <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {t(titleKey)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {t(descriptionKey)}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {technologies.slice(0, 3).map((tech, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
                            >
                                {tech}
                            </span>
                        ))}
                        {technologies.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                                +{technologies.length - 3}
                            </span>
                        )}
                    </div>

                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                            {t('portfolio.viewProject')}
                            <ExternalLink className="ml-1 w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
});

ProjectItem.displayName = 'ProjectItem';

// Componente memoizado para a navegação por categorias
const CategoryNav = memo(({ categories, activeFilter, setActiveFilter }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => setActiveFilter(cat.value)}
                    className={`px-4 py-2 text-sm md:text-base rounded-full transition-colors duration-300 
                        ${activeFilter === cat.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
});

CategoryNav.displayName = 'CategoryNav';

const PortfolioSection = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [visibleItems, setVisibleItems] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [isMobile, setIsMobile] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isTransitioning, setIsTransitioning] = useState(false); // novo estado

    const trackRef = useRef(null);
    const itemWidth = useRef(0);
    const sectionRef = useRef(null);
    const carouselWrapperRef = useRef(null);

    // Usar useMemo para os dados estáticos
    const projects = useMemo(() => [
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
    ], []);

    // Categorias memoizadas
    const categories = useMemo(() => [
        { value: "all", label: t('portfolio.categories.all') },
        { value: "web", label: t('portfolio.categories.web') },
        { value: "design", label: t('portfolio.categories.design') },
        { value: "motion", label: t('portfolio.categories.motion') },
        { value: "modelagem", label: t('portfolio.categories.modelagem') },
    ], [t]);

    // Filtrar projetos baseado na categoria selecionada - memoizado
    const filteredProjects = useMemo(() => {
        return activeFilter === "all"
            ? projects
            : projects.filter((project) => project.category === activeFilter);
    }, [projects, activeFilter]);

    // Número de itens no carrossel
    const totalItems = filteredProjects.length;

    // Calcular quantos itens mostrar por slide com base no tamanho da tela
    const getItemsPerView = useCallback(() => {
        if (window.innerWidth < 640) {
            return 1;
        } else if (window.innerWidth < 1024) {
            return 2;
        } else {
            return 3;
        }
    }, []);

    // Detectar dispositivo móvel com callback otimizado
    const checkMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Mover o carrossel - otimizado
    const moveCarousel = useCallback((newIndex) => {
        if (!trackRef.current) return;
        setIsTransitioning(true); // inicia bloqueio
        const safeIndex = Math.max(0, Math.min(newIndex, totalItems - getItemsPerView()));
        setCurrentIndex(safeIndex);
        const translateX = safeIndex * -itemWidth.current;
        trackRef.current.style.transform = `translateX(${translateX}px)`;
        setTimeout(() => setIsTransitioning(false), 500); // libera após 500ms
    }, [totalItems, getItemsPerView]);

    // Handlers de navegação memoizados
    const goToPrevious = useCallback(() => {
        if (isTransitioning) return;
        moveCarousel(currentIndex - 1);
    }, [currentIndex, moveCarousel, isTransitioning]);

    const goToNext = useCallback(() => {
        if (isTransitioning) return;
        moveCarousel(currentIndex + 1);
    }, [currentIndex, moveCarousel, isTransitioning]);

    // Redimensionamento com debounce
    useEffect(() => {
        const handleResize = debounce(() => {
            checkMobile();

            // Recalcular largura dos itens
            if (carouselWrapperRef.current) {
                const totalWidth = carouselWrapperRef.current.offsetWidth;
                const itemsPerView = getItemsPerView();
                itemWidth.current = totalWidth / itemsPerView;

                // Atualizar posição do trackRef após redimensionamento
                moveCarousel(currentIndex);
            }
        }, 250);

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [checkMobile, currentIndex, getItemsPerView, moveCarousel]);

    // Inicialização e atualização do carrossel
    useEffect(() => {
        // Atualizar items visíveis com base na filtragem
        setVisibleItems(filteredProjects);

        // Resetar o carrossel para o início ao trocar o filtro
        setCurrentIndex(0);
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(0px)`;
        }

        // Calcular largura dos itens no carrossel
        if (carouselWrapperRef.current) {
            const totalWidth = carouselWrapperRef.current.offsetWidth;
            const itemsPerView = getItemsPerView();
            itemWidth.current = totalWidth / itemsPerView;
        }
    }, [filteredProjects, getItemsPerView]);

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30 overflow-hidden z-10"
        >
            {/* Decoração de fundo simplificada */}
            <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Container principal */}
            <div className="relative z-10 container mx-auto px-4">
                {/* Cabeçalho da seção */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                    >
                        {t('portfolio.title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        {t('portfolio.subtitle')}
                    </motion.p>
                </div>

                {/* Navegação por categorias */}
                <CategoryNav
                    categories={categories}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />

                {/* Carrossel */}
                <div className="relative">
                    {/* Botões de navegação do carrossel */}
                    <CarouselButton
                        direction="left"
                        onClick={goToPrevious}
                        disabled={currentIndex === 0 || isTransitioning}
                    />

                    <CarouselButton
                        direction="right"
                        onClick={goToNext}
                        disabled={currentIndex >= totalItems - getItemsPerView() || isTransitioning}
                    />

                    {/* Container do carrossel */}
                    <div
                        ref={carouselWrapperRef}
                        className="overflow-hidden relative mx-auto"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div
                            ref={trackRef}
                            className="flex transition-transform duration-500 ease-out"
                        >
                            {/* Itens do carrossel */}
                            {filteredProjects.map((project, index) => (
                                <ProjectItem
                                    key={`${project.category}-${index}`}
                                    project={project}
                                    t={t}
                                    isMobile={isMobile}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Paginação simplificada */}
                <div className="flex justify-center mt-8 gap-2">
                    {Array.from({ length: Math.ceil(totalItems / getItemsPerView()) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => moveCarousel(index * getItemsPerView())}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === Math.floor(currentIndex / getItemsPerView())
                                ? "bg-blue-600 w-5"
                                : "bg-gray-300 dark:bg-gray-700"
                                }`}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(PortfolioSection);
