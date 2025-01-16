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
    {
        category: 'web',
        image: '/assets/images/Screenshot_1023.webp',
        title: 'Seca e Define - Programa de Emagrecimento',
        description: 'Site criado para divulgar um programa de emagrecimento online. Design moderno e intuitivo, com foco em depoimentos e informações relevantes para impulsionar as vendas.',
        link: 'https://secaedefine.vercel.app',
        type: 'contracted'
    },
    {
        category: 'web',
        image: '/assets/images/Screenshot_1051.webp',
        title: 'Gerenciador de Arquivos Automatizado',
        description: 'O Organizador de Arquivos é um aplicativo de desktop, desenvolvido por mim, que utiliza Python e Electron para facilitar a organização de arquivos baseados em suas extensões.',
        link: 'https://drive.google.com/drive/folders/1xQ-bAaj1QNShVqQTnPIQf7DcdmCDc1pm?usp=sharing',
        type: 'contracted'
    },
    {
        category: 'web',
        image: '/assets/images/Chatbot.webp',
        title: 'Python Chatbot',
        description: 'Chatbot em Python que auxilia no aprendizado da linguagem. Utiliza o modelo rufimelo/bert-large-portuguese-cased-sts para entender perguntas e fornecer respostas detalhadas.',
        link: 'https://github.com/Jeffinp/ProjetoPython',
        type: 'personal'
    },
    {
        category: 'web',
        image: '/assets/images/jogoplataforma.webp',
        title: 'Jogo de Plataforma Online',
        description: 'Versão melhorada de um projeto do GitHub de Guilherme Silveira. Desenvolvido com HTML, CSS e JavaScript, com foco em UX/UI e responsividade.',
        link: 'https://plataforma-chatgpt-main.vercel.app/',
        type: 'personal'
    },
    {
        category: 'web',
        image: '/assets/images/menuinterativo.webp',
        title: 'Menu Interativo',
        description: 'Projeto com várias funcionalidades interativas em HTML, CSS e JavaScript. Inclui jogos e ferramentas úteis.',
        link: 'https://menu-interativo.vercel.app/',
        type: 'personal'
    },
    {
        category: 'web',
        image: '/assets/images/Presente-Natal.webp',
        title: 'Presente de Natal Digital',
        description: 'Site criado com HTML, CSS e JavaScript para envio de presentes virtuais. Interface simples e amigável.',
        link: 'https://aterrsagemresponsiva.netlify.app/',
        type: 'personal'
    },
    {
        category: 'web',
        image: '/assets/images/Screenshot_993.webp',
        title: 'Justly - Treinamento Front-End',
        description: 'Projeto desenvolvido com HTML e CSS para aprimorar habilidades em desenvolvimento front-end.',
        link: 'https://justly.netlify.app/',
        type: 'personal'
    },
    {
        category: 'web',
        image: '/assets/images/site.webp',
        title: 'Meu Portfólio Pessoal',
        description: 'Meu espaço online para apresentar projetos, habilidades e tecnologias. Desenvolvido com foco em responsividade e performance.',
        link: 'https://jefersonreis-github-io.vercel.app/index.html',
        type: 'personal'
    },
    {
        category: 'web',
        image: '/assets/images/bookmark.webp',
        title: 'Bookmark Project - Gerenciador de Favoritos',
        description: 'Gerenciador de favoritos simples e prático, criado com HTML, CSS e JavaScript.',
        link: 'https://bookmarkproject12.netlify.app/',
        type: 'personal'
    },
    {
        category: 'web',
        image: '/assets/images/acsendoflex.webp',
        title: 'Acsendoflex - Software de Avaliação',
        description: 'Site para promover um software de avaliação de desempenho. Design limpo e profissional.',
        link: 'https://ascendotraining.netlify.app/',
        type: 'personal'
    },
    {
        category: 'web',
        image: '/assets/images/Zomato.webp',
        title: 'Landing Page Zomato (Reimaginação)',
        description: 'Recriação da landing page do Zomato com HTML, CSS e JavaScript. Versão responsiva com design atrativo.',
        link: 'https://zomato.com',
        type: 'personal'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/DuplaDoTerror.webp',
        title: 'A Dupla do Terror',
        description: 'Conheça Bryan e seu "Parasita" em um desenho digital cheio de detalhes!'
    },
    {
        category: 'motion',
        image: '/assets/images/Artes/BratailsAnim.gif',
        title: 'Bratails Animado',
        description: 'Uma animação curtinha do meu personagem Bryan, feita com carinho no Clip Studio.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/Azete.webp',
        title: 'Design de Marca Azeite',
        description: 'Criei este design de marca para azeite no Photoshop.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/BandeiraEstilosaBrasil.webp',
        title: 'Bandeira Estilizada do Brasil',
        description: 'Uma versão estilizada da nossa bandeira, com um toque de cristais, feita sob encomenda.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/DesignComputador.webp',
        title: 'Design de Gabinete Gamer',
        description: 'Um design de gabinete gamer personalizado para um cliente apaixonado por jogos!'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/Estampa.webp',
        title: 'Estampa de Camisa Ambiental',
        description: 'Estampa de camisa para o dia do meio ambiente, um projeto escolar que adorei desenvolver.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/ParasitaCaderno.webp',
        title: 'O Parasita no Caderno',
        description: 'O parasita do meu personagem, desenhado no papel e finalizado digitalmente com cores vibrantes.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/giratina.webp',
        title: 'Giratina Digital Art',
        description: 'Uma arte digital do lendário Pokémon Giratina.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/hamburguer.webp',
        title: 'Design de Hambúrguer',
        description: 'Design apetitoso de hambúrguer criado para uma hamburgueria local.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/Alastor.webp',
        title: 'Desenho em Caderno',
        description: 'Um desenho feito à mão no caderno e colorido digitalmente.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/PizzalDoSul.webp',
        title: 'Design de Pizza',
        description: 'Design de pizza criado especialmente para a pizzaria de um cliente.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/PizzaInsta.webp',
        title: 'Imagem Promocional de Pizza',
        description: 'Imagem promocional de pizza, perfeita para bombar as redes sociais!'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/ProtNave.webp',
        title: 'Protótipo de Nave Espacial',
        description: 'Um protótipo de nave espacial com um design futurista e cheio de estilo!'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/Bryan360.webp',
        title: 'Bratails em 360 graus',
        description: 'Uma visão completa do meu personagem Bratails/Bryan em 360 graus.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/BryanSorrindo.webp',
        title: 'Bratails Sorrindo',
        description: 'Olha só o Bratails dando um sorriso contagiante!'
    },
    {
        category: 'modelagem',
        image: '/assets/images/Artes/BratailsNave.webp',
        title: 'Bratails na Nave Espacial',
        description: 'Bratails explorando o espaço em uma modelagem 3D feita no Blender.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/Asgemeas2.webp',
        title: 'Espadas Gêmeas',
        description: 'Duas espadas gêmeas com detalhes ornamentados em azul e vermelho, um design simétrico impressionante.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/Angel.webp',
        title: 'Símbolos ANGEL',
        description: 'Símbolos circulares que evocam a beleza das asas de um anjo.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/TFK.webp',
        title: 'Brasões dos Quatro Reinos',
        description: 'Quatro brasões com design heráldico, representando reinos distintos.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/FurryQueMataFurry.webp',
        title: 'Ilustração Inspirada em Berserk',
        description: 'Uma ilustração digital com uma forte inspiração no universo de Berserk.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/Annie.webp',
        title: 'Retrato da Annie',
        description: 'Um retrato digital da Annie, com foco nos detalhes expressivos do seu rosto.'
    },
    {
        category: 'modelagem',
        image: '/assets/images/Artes/Cubos.webp',
        title: 'Teste de Renderização',
        description: 'Uma renderização de teste com cubos e uma esfera, explorando diferentes texturas.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/ArteVicente.webp',
        title: 'Capa Musical Vicente',
        description: 'Capa de música criada especialmente para o artista Vicente.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/AsGemeas.webp',
        title: 'Espadas Gêmeas (Variação)',
        description: 'Outra versão da ilustração das espadas gêmeas, com as cores invertidas.'
    },
    {
        category: 'modelagem',
        image: '/assets/images/Artes/Asteroide.webp',
        title: 'Modelo 3D de Asteroide',
        description: 'Um modelo 3D de asteroide criado no Blender, com uma iluminação básica.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/BryanComFoice.webp',
        title: 'Bratails com Foice',
        description: 'Bratails e seu parasita em uma cena tensa, ambos visivelmente feridos.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/Bryanoao.webp',
        title: 'Bratails Surpreso',
        description: 'Bratails com uma expressão de surpresa!'
    },
    {
        category: 'modelagem',
        image: '/assets/images/Artes/CapitaoAmerica.webp',
        title: 'Escudo do Capitão América',
        description: 'Modelagem 3D do icônico escudo do Capitão América.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/ClickTeamLogo.webp',
        title: 'Logo CLICKTEAM',
        description: 'O logo da CLICKTEAM, com um design moderno e minimalista.'
    },
    {
        category: 'modelagem',
        image: '/assets/images/Artes/cycles.webp',
        title: 'Rosquinha 3D',
        description: 'Uma deliciosa rosquinha em 3D!'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/forma1.webp',
        title: 'Conceito de Boss',
        description: 'Um conceito de design para um boss de um jogo em desenvolvimento.'
    },
    {
        category: 'modelagem',
        image: '/assets/images/Artes/cranio.webp',
        title: 'Crânio 3D',
        description: 'Modelagem 3D de um crânio misterioso, criada no Blender.'
    },
    {
        category: 'design',
        image: '/assets/images/Artes/ProtScreabiny.webp',
        title: 'Protótipo Screaviny',
        description: 'Protótipo do personagem Screaviny para um projeto de jogo.'
    },
    {
        category: 'modelagem',
        image: '/assets/images/Artes/untitled.webp',
        title: 'Teste de Modelagem',
        description: 'Um teste de modelagem 3D de personagem.'
    },
    
    {
        category: 'design',
        image: '/assets/images/Artes/Versões.webp',
        title: 'Ícones Discord',
        description: 'Quatro versões de um ícone para um servidor do Discord.'
    }
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
        <section className="relative py-20 bg-white dark:bg-slate-900">
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