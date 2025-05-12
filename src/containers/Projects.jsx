import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { debounce } from '../utils';

// Componente memoizado para o botão de navegação do carrossel - Melhorado para responsividade
const CarouselButton = memo(({ direction, onClick, disabled }) => {
    const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`absolute top-1/2 transform -translate-y-1/2 z-20
                ${direction === 'left'
                    ? 'left-0 sm:left-1 md:left-2 lg:left-4'
                    : 'right-0 sm:right-1 md:right-2 lg:right-4'}
                ${disabled ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}
                bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full 
                p-1 sm:p-2 md:p-3
                border border-gray-200 dark:border-gray-700 
                shadow-md hover:shadow-lg
                transition-all duration-300`}
            aria-label={direction === 'left' ? 'Previous project' : 'Next project'}
        >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800 dark:text-gray-200" />
        </button>
    );
});

CarouselButton.displayName = 'CarouselButton';

// Componente memoizado para o item do projeto - Responsividade aprimorada
const ProjectItem = memo(({ project, t, isMobile }) => {
    const { category, image, titleKey, descriptionKey, link, technologies = [], type } = project;
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

    return (
        <div className="flex-shrink-0 w-full xs:w-[280px] sm:w-[320px] md:w-[340px] lg:w-[380px] xl:w-[400px] 2xl:w-[420px] p-1 xs:p-2 sm:p-3 md:p-4">
            <div className="h-full bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg lg:hover:shadow-xl dark:hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transform transition duration-300">
                <div className="relative h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 overflow-hidden">
                    <img
                        src={image}
                        alt={t(titleKey)}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                    />
                    {category && (
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-600/80 text-white text-xs rounded-md backdrop-blur-sm">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </div>
                    )}

                    {/* Project type tag */}
                    {type && (
                        <div className={`absolute bottom-2 sm:bottom-3 right-2 sm:right-3 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-md backdrop-blur-sm border border-opacity-20 ${type === 'personal'
                            ? 'bg-purple-500/60 text-white border-purple-300 dark:border-purple-400'
                            : 'bg-emerald-500/60 text-white border-emerald-300 dark:border-emerald-400'
                            }`}>
                            {type === 'personal' ? t('portfolio.projectLabels.personal') : t('portfolio.projectLabels.commercial')}
                        </div>
                    )}
                </div>

                <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-gray-900 dark:text-white">
                        {t(titleKey)}
                    </h3>
                    <p className={`text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 md:mb-4 ${isDescriptionVisible ? '' : 'line-clamp-2 sm:line-clamp-3'}`}>
                        {t(descriptionKey)}
                    </p>
                    <button
                        onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
                        className="text-blue-600 dark:text-blue-400 text-xs mt-1"
                    >
                        {isDescriptionVisible ? t('portfolio.projectLabels.hideDescription') : t('portfolio.projectLabels.showMore')}
                    </button>

                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                        {technologies.slice(0, isMobile ? 2 : 3).map((tech, index) => (
                            <span
                                key={index}
                                className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
                            >
                                {tech}
                            </span>
                        ))}
                        {technologies.length > (isMobile ? 2 : 3) && (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                                +{technologies.length - (isMobile ? 2 : 3)}
                            </span>
                        )}
                    </div>

                    {/* Botão de visualizar projeto - Melhorado para maior visibilidade */}
                    <a
                        href={link || image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-3 py-2 mt-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-colors duration-300"
                    >
                        {t('portfolio.projectLabels.viewProject')}
                        <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
});

ProjectItem.displayName = 'ProjectItem';

// Componente memoizado para a navegação por categorias - Aprimorado para responsividade
const CategoryNav = memo(({ categories, activeFilter, setActiveFilter }) => {
    return (
        <div className="flex flex-wrap justify-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => setActiveFilter(cat.value)}
                    className={`px-2 xs:px-3 sm:px-4 py-1 sm:py-1.5 md:py-2 text-xs xs:text-sm md:text-base rounded-full transition-colors duration-300 
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
    const [screenSize, setScreenSize] = useState('md');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Ref para controlar melhor o bloqueio durante transições
    const isTransitioningRef = useRef(false);
    const transitionTimeoutRef = useRef(null);

    const trackRef = useRef(null);
    const itemWidth = useRef(0);
    const sectionRef = useRef(null);
    const carouselWrapperRef = useRef(null);

    // Projetos - mantido como está
    const projects = useMemo(() => [
        /* Array de projetos - mantido como está no código original */
        // Para não sobrecarregar o código, mantive o mesmo array de projetos
        {
            category: "web",
            image: "/assets/images/SistemaSolar.png",
            titleKey: "portfolio.projects.systemSolar.title",
            descriptionKey: "portfolio.projects.systemSolar.description",
            link: "https://sistema-solar-puce.vercel.app/",
            type: "personal",
            technologies: ["React", "TypeScript", "Tailwind CSS", "Three.js", "Shadcn/UI"],
        },
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
            image: "/assets/images/Artes/DesignGráfico_Brasil_piscinas.png",
            titleKey: "portfolio.projects.brasilPiscinas.title",
            descriptionKey: "portfolio.projects.brasilPiscinas.description",
            technologies: ["Canva"],
            type: "personal",
        },
        {
            category: "design",
            image: "/assets/images/Artes/DuplaDoTerror.webp",
            titleKey: "portfolio.projects.terrorDuo.title",
            descriptionKey: "portfolio.projects.terrorDuo.description",
            technologies: ["Adobe Photoshop", "Clip Studio", "Illustration"],
            type: "personal",
        },
        {
            category: "motion",
            image: "/assets/images/Artes/BratailsAnim.gif",
            titleKey: "portfolio.projects.bratailsAnimated.title",
            descriptionKey: "portfolio.projects.bratailsAnimated.description",
            technologies: ["Clip Studio", "Motion Graphics", "2D Animation"],
            type: "personal",
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
            type: "personal",
        },
        {
            category: "design",
            image: "/assets/images/Artes/giratina.webp",
            titleKey: "portfolio.projects.giratinaArt.title",
            descriptionKey: "portfolio.projects.giratinaArt.description",
            technologies: ["Illustration", "Adobe Photoshop"],
            type: "personal",
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
            type: "personal",
        },
        {
            category: "design",
            image: "/assets/images/Artes/Bryan360.webp",
            titleKey: "portfolio.projects.bratails360.title",
            descriptionKey: "portfolio.projects.bratails360.description",
            technologies: ["Character Design", "Digital Art", "Illustration"],
            type: "personal",
        },
        {
            category: "design",
            image: "/assets/images/Artes/BryanSorrindo.webp",
            titleKey: "portfolio.projects.bratailsSmiling.title",
            descriptionKey: "portfolio.projects.bratailsSmiling.description",
            technologies: ["Character Illustration", "Digital Art", "Portraiture"],
            type: "personal",
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
            type: "personal",
        },
        {
            category: "design",
            image: "/assets/images/Artes/Angel.webp",
            titleKey: "portfolio.projects.angelSymbols.title",
            descriptionKey: "portfolio.projects.angelSymbols.description",
            technologies: ["Symbolism", "Digital Illustration", "Graphic Design"],
            type: "personal",
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
            type: "personal",
        },
        {
            category: "design",
            image: "/assets/images/Artes/Annie.webp",
            titleKey: "portfolio.projects.anniePortrait.title",
            descriptionKey: "portfolio.projects.anniePortrait.description",
            technologies: ["Character Portrait", "Digital Painting", "Illustration"],
            type: "personal",
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/Cubos.webp",
            titleKey: "portfolio.projects.renderTest.title",
            descriptionKey: "portfolio.projects.renderTest.description",
            technologies: ["Blender", "3D Rendering", "Geometric Design"],
            type: "personal",
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
            type: "personal",
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/Asteroide.webp",
            titleKey: "portfolio.projects.asteroid3d.title",
            descriptionKey: "portfolio.projects.asteroid3d.description",
            technologies: ["Blender", "3D Modeling", "Space Design"],
            type: "personal",
        },
        {
            category: "design",
            image: "/assets/images/Artes/BryanComFoice.webp",
            titleKey: "portfolio.projects.bratailsScythe.title",
            descriptionKey: "portfolio.projects.bratailsScythe.description",
            technologies: ["Character Design", "Digital Art", "Weapon Illustration"],
            type: "personal",
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
            type: "personal",
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/CapitaoAmerica.webp",
            titleKey: "portfolio.projects.captainShield.title",
            descriptionKey: "portfolio.projects.captainShield.description",
            technologies: ["3D Modeling", "Blender", "Prop Design"],
            type: "personal",
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
            type: "personal",
        },
        {
            category: "design",
            image: "/assets/images/Artes/forma1.webp",
            titleKey: "portfolio.projects.bossConcept.title",
            descriptionKey: "portfolio.projects.bossConcept.description",
            technologies: ["Concept Art", "Digital Illustration", "Character Design"],
            type: "personal",
        },
        {
            category: "modelagem",
            image: "/assets/images/Artes/cranio.webp",
            titleKey: "portfolio.projects.skull3d.title",
            descriptionKey: "portfolio.projects.skull3d.description",
            technologies: ["Blender", "3D Modeling", "Anatomical Alien Rendering"],
            type: "personal",
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
            type: "personal",
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

    // Categorias memoizadas - mantido como está
    const categories = useMemo(() => [
        { value: "all", label: t('portfolio.categories.all') },
        { value: "web", label: t('portfolio.categories.web') },
        { value: "design", label: t('portfolio.categories.design') },
        { value: "motion", label: t('portfolio.categories.motion') },
        { value: "modelagem", label: t('portfolio.categories.modelagem') },
    ], [t]);

    // Filtrar projetos baseado na categoria selecionada - memoizado - mantido como está
    const filteredProjects = useMemo(() => {
        return activeFilter === "all"
            ? projects
            : projects.filter((project) => project.category === activeFilter);
    }, [projects, activeFilter]);

    // Número de itens no carrossel
    const totalItems = filteredProjects.length;

    // Calcular quantos itens mostrar por slide com base no tamanho da tela - MELHORADO
    const getItemsPerView = useCallback(() => {
        if (window.innerWidth < 480) { // xs breakpoint
            return 1;
        } else if (window.innerWidth < 640) { // sm breakpoint
            return 1.2; // Mostra um item inteiro + parte do próximo
        } else if (window.innerWidth < 768) { // md breakpoint
            return 1.8; // Mostra quase dois itens completos
        } else if (window.innerWidth < 1024) { // lg breakpoint
            return 2;
        } else if (window.innerWidth < 1280) { // xl breakpoint
            return 2.5; // Mostra 2 itens completos + parte do próximo
        } else { // 2xl e maior
            return 3;
        }
    }, []);

    // Detectar tamanho da tela com callback otimizado - MELHORADO
    const checkScreenSize = useCallback(() => {
        const width = window.innerWidth;
        setIsMobile(width < 768);

        // Define o tamanho da tela atual para uso ao longo do componente
        if (width < 480) {
            setScreenSize('xs');
        } else if (width < 640) {
            setScreenSize('sm');
        } else if (width < 768) {
            setScreenSize('md');
        } else if (width < 1024) {
            setScreenSize('lg');
        } else if (width < 1280) {
            setScreenSize('xl');
        } else {
            setScreenSize('2xl');
        }
    }, []);

    // Mover o carrossel - reescrito para usar ref e prevenir cliques rápidos
    const moveCarousel = useCallback((newIndex) => {
        if (!trackRef.current || isTransitioningRef.current) return;

        // Usar ref para prevenção imediata de cliques múltiplos
        isTransitioningRef.current = true;
        setIsTransitioning(true);

        const safeIndex = Math.max(0, Math.min(newIndex, totalItems - getItemsPerView()));
        setCurrentIndex(safeIndex);

        const translateX = safeIndex * -itemWidth.current;
        trackRef.current.style.transform = `translateX(${translateX}px)`;

        // Limpar timeout anterior se existir
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }

        // Definir novo timeout e armazenar a referência
        transitionTimeoutRef.current = setTimeout(() => {
            isTransitioningRef.current = false;
            setIsTransitioning(false);
            transitionTimeoutRef.current = null;
        }, 600); // Tempo suficiente para completar a transição
    }, [totalItems, getItemsPerView]);

    // Handlers de navegação - simplificados pois verificamos transição no moveCarousel
    const goToPrevious = useCallback(() => {
        moveCarousel(currentIndex - 1);
    }, [currentIndex, moveCarousel]);

    const goToNext = useCallback(() => {
        moveCarousel(currentIndex + 1);
    }, [currentIndex, moveCarousel]);

    // Redimensionamento com debounce - MELHORADO
    useEffect(() => {
        const handleResize = debounce(() => {
            checkScreenSize();

            // Recalcular largura dos itens
            if (carouselWrapperRef.current) {
                const totalWidth = carouselWrapperRef.current.offsetWidth;
                const itemsPerView = getItemsPerView();
                itemWidth.current = totalWidth / itemsPerView;

                // Atualizar posição do trackRef após redimensionamento
                moveCarousel(currentIndex);
            }
        }, 200); // Reduzido para 200ms para melhor responsividade

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [checkScreenSize, currentIndex, getItemsPerView, moveCarousel]);

    // Inicialização e atualização do carrossel - mantido como está
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

    // Implementação de arrastar (drag) - melhorada
    const handleTouchStart = useCallback((e) => {
        if (isTransitioningRef.current) return;
        setIsDragging(true);
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging || isTransitioningRef.current) return;

        const deltaX = e.touches[0].clientX - mousePosition.x;

        if (Math.abs(deltaX) > 50) { // Aumentado para evitar swipes acidentais
            if (deltaX > 0 && currentIndex > 0) {
                moveCarousel(currentIndex - 1);
            } else if (deltaX < 0 && currentIndex < totalItems - getItemsPerView()) {
                moveCarousel(currentIndex + 1);
            }
            setIsDragging(false);
        }
    }, [isDragging, currentIndex, mousePosition, moveCarousel, totalItems, getItemsPerView]);

    // Limpeza de timeouts ao desmontar componente
    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="relative py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-transparent z-10"
        >
            {/* Fundo de quadrados alinhados - MELHORADO para breakpoints */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: screenSize === 'xs' ? '20px 20px' :
                        screenSize === 'sm' ? '30px 30px' :
                            screenSize === 'md' ? '40px 40px' :
                                screenSize === 'lg' ? '60px 60px' : '80px 80px'
                }}
            />
            {/* Bolhas centralizadas - MELHORADO para responsividade */}
            <div className="absolute inset-0 overflow-visible opacity-30 dark:opacity-20 pointer-events-none -z-10">
                <div
                    className="absolute left-1/2 top-1/2 bg-blue-500/10 dark:bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                        width: screenSize === 'xs' ? '300px' :
                            screenSize === 'sm' ? '400px' :
                                screenSize === 'md' ? '500px' :
                                    screenSize === 'lg' ? '600px' : '700px',
                        height: screenSize === 'xs' ? '300px' :
                            screenSize === 'sm' ? '400px' :
                                screenSize === 'md' ? '500px' :
                                    screenSize === 'lg' ? '600px' : '700px',
                    }}
                />
                <div
                    className="absolute left-1/2 top-1/2 bg-purple-500/10 dark:bg-purple-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                        zIndex: -1,
                        width: screenSize === 'xs' ? '200px' :
                            screenSize === 'sm' ? '300px' :
                                screenSize === 'md' ? '350px' :
                                    screenSize === 'lg' ? '400px' : '500px',
                        height: screenSize === 'xs' ? '200px' :
                            screenSize === 'sm' ? '300px' :
                                screenSize === 'md' ? '350px' :
                                    screenSize === 'lg' ? '400px' : '500px',
                        transform: 'translate(-50%, -50%) scale(0.7)'
                    }}
                />
            </div>

            {/* Container principal */}
            <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6">
                {/* Cabeçalho da seção - MELHORADO para responsividade */}
                <div className="text-center max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                    >
                        {t('portfolio.title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-sm xs:text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
                    >
                        {t('portfolio.subtitle')}
                    </motion.p>
                </div>

                {/* Navegação por categorias - Usando o componente melhorado */}
                <CategoryNav
                    categories={categories}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />

                {/* Carrossel - Botões atualizados com feedback mais claro */}
                <div className="relative">
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

                    {/* Container do carrossel - Melhorado com classe de transição controlada */}
                    <div
                        ref={carouselWrapperRef}
                        className="overflow-hidden relative mx-auto"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={() => setIsDragging(false)}
                    >
                        <div
                            ref={trackRef}
                            className="flex transition-transform duration-500 ease-out"
                            style={{ willChange: 'transform' }}
                        >
                            {/* Itens do carrossel - Usando o componente melhorado */}
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

                {/* Paginação simplificada - MELHORADO para responsividade */}
                <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8 gap-1 sm:gap-2">
                    {Array.from({ length: Math.ceil(totalItems / getItemsPerView()) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => moveCarousel(index * getItemsPerView())}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === Math.floor(currentIndex / getItemsPerView())
                                ? "bg-blue-600 w-3 sm:w-4 md:w-5"
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