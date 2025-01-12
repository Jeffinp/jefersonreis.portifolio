import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/Projects.css';

const ImageCarousel = ({ options = {} }) => {
    const { transitionDuration = 500, autoAdvanceInterval = 4000, touchSensitivity = 100 } = options;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visibleItems, setVisibleItems] = useState([]);

    const startPos = useRef(0);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
    const animationId = useRef(null);
    const autoAdvanceTimer = useRef(null);
    const trackRef = useRef(null);
    const itemWidth = useRef(0);

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const escapeHtml = (str) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return str.replace(/[&<>"']/g, (m) => map[m]);
    };

    const updateVisibleItems = () => {
        if (!trackRef.current) return;
        const items = Array.from(trackRef.current.children);

        const updatedVisibleItems = items.filter(item =>
            item.style.display !== 'none' &&
            window.getComputedStyle(item).display !== 'none'
        );

        setVisibleItems(updatedVisibleItems);
    };

    const handleResize = () => {
        if (isTransitioning || !trackRef.current) return;

        updateVisibleItems();

        if (visibleItems.length > 0) {
            itemWidth.current = visibleItems[0].offsetWidth;
            setCurrentIndex((prevIndex) => Math.min(prevIndex, visibleItems.length - 1));

            const offset = -currentIndex * itemWidth.current;
            trackRef.current.style.transition = 'none';
            trackRef.current.style.transform = `translateX(${offset}px)`;
            trackRef.current.offsetHeight;
            trackRef.current.style.transition = `transform ${transitionDuration}ms ease`;
        }
    };

    const showSlide = (index) => {
        updateVisibleItems();

        if (visibleItems.length === 0 || isTransitioning) return;

        const newIndex = ((index % visibleItems.length) + visibleItems.length) % visibleItems.length;
        setCurrentIndex(newIndex);

        const offset = -newIndex * itemWidth.current;
        currentTranslate.current = offset;

        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${offset}px)`;
        }
    };

    const nextSlide = debounce(() => {
        if (!isTransitioning) {
            showSlide(currentIndex + 1);
        }
    }, 250);

    const prevSlide = debounce(() => {
        if (!isTransitioning) {
            showSlide(currentIndex - 1);
        }
    }, 250);

    const handleDragStart = (e) => {
        if (isTransitioning) return;

        setIsDragging(true);
        if (trackRef.current) {
            trackRef.current.style.cursor = 'grabbing';
        }
        startPos.current = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        prevTranslate.current = currentTranslate.current;

        cancelAnimationFrame(animationId.current);
        pauseAutoAdvance();
    };

    const handleDrag = (e) => {
        if (!isDragging || isTransitioning) return;
        e.preventDefault();

        const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = currentPosition - startPos.current;
        currentTranslate.current = prevTranslate.current + diff;

        animationId.current = requestAnimationFrame(() => {
            if (trackRef.current) {
                trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
            }
        });
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);
        if (trackRef.current) {
            trackRef.current.style.cursor = '';
        }

        const movedBy = currentTranslate.current - prevTranslate.current;

        if (Math.abs(movedBy) > touchSensitivity) {
            if (movedBy > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            showSlide(currentIndex);
        }

        if (!isHovering) {
            resetAutoAdvance();
        }
    };

    const filterProjects = (category) => {
        const safeCategory = escapeHtml(category);
        if (trackRef.current) {
            const items = Array.from(trackRef.current.children);
            items.forEach(item => {
                const itemCategory = escapeHtml(item.dataset.category);
                const shouldShow = safeCategory === 'all' || itemCategory === safeCategory;
                item.style.display = shouldShow ? 'flex' : 'none';
            });
        }
        updateVisibleItems()
        setCurrentIndex(0);
        showSlide(0);
    };

    const startAutoAdvance = () => {
        clearInterval(autoAdvanceTimer.current);
        autoAdvanceTimer.current = setInterval(() => {
            if (!isHovering && !isTransitioning) {
                nextSlide();
            }
        }, autoAdvanceInterval);
    };

    const pauseAutoAdvance = () => {
        clearInterval(autoAdvanceTimer.current);
    };

    const resetAutoAdvance = () => {
        pauseAutoAdvance();
        startAutoAdvance();
    };

    useEffect(() => {
        if (!trackRef.current) return;
        const items = Array.from(trackRef.current.children);
        itemWidth.current = items.length > 0 ? items[0].offsetWidth : 0;

        items.forEach(item => {
            item.style.display = 'flex';
            item.classList.add('active');
        });

        updateVisibleItems();
        showSlide(0);
        startAutoAdvance();

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(trackRef.current);

        const handleTransitionStart = () => setIsTransitioning(true);
        const handleTransitionEnd = () => setIsTransitioning(false);

        trackRef.current.addEventListener('transitionstart', handleTransitionStart);
        trackRef.current.addEventListener('transitionend', handleTransitionEnd);

        const dragEvents = {
            mouse: { start: 'mousedown', move: 'mousemove', end: 'mouseup', leave: 'mouseleave' },
            touch: { start: 'touchstart', move: 'touchmove', end: 'touchend' }
        };

        Object.values(dragEvents).forEach(eventSet => {
            trackRef.current.addEventListener(eventSet.start, (e) => !isTransitioning && handleDragStart(e));
            trackRef.current.addEventListener(eventSet.move, (e) => handleDrag(e));
            trackRef.current.addEventListener(eventSet.end, handleDragEnd);
            if (eventSet.leave) {
                trackRef.current.addEventListener(eventSet.leave, handleDragEnd);
            }
        });

        const handleKeyDown = debounce((e) => {
            if (!isTransitioning) {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            }
        }, 250);

        document.addEventListener('keydown', handleKeyDown);

        // Adicionando event listeners para os botões de filtro
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.filter;
                filterProjects(category);

                // Removendo a classe 'active' de todos os botões
                filterButtons.forEach(b => b.classList.remove('active'));
                // Adicionando a classe 'active' ao botão clicado
                button.classList.add('active');
            });
        });

        // Adicionando event listeners para hover
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => {
            setIsHovering(true);
            pauseAutoAdvance();
        });

        carousel.addEventListener('mouseleave', () => {
            setIsHovering(false);
            resetAutoAdvance();
        });

        return () => {
            clearInterval(autoAdvanceTimer.current);
            resizeObserver.disconnect();
            trackRef.current.removeEventListener('transitionstart', handleTransitionStart);
            trackRef.current.removeEventListener('transitionend', handleTransitionEnd);
            document.removeEventListener('keydown', handleKeyDown);

            // Removendo event listeners dos botões de filtro
            filterButtons.forEach(button => {
                button.removeEventListener('click', () => {
                    const category = button.dataset.filter;
                    filterProjects(category);
                });
            });

            // Removendo event listeners de hover
            carousel.removeEventListener('mouseenter', () => setIsHovering(true));
            carousel.removeEventListener('mouseleave', () => setIsHovering(false));
        };
    }, []);

    return (
        <div className="carousel">
            <div className="carousel-track" ref={trackRef}>
                {/* Web */}
                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/Screenshot_987.webp" alt="Layout do site Curso de Desenho, mostrando a página inicial." loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--contracted">Projeto Contratado</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Curso de Desenho Online</strong></h3>
                        <p className="project-description">Site desenvolvido para um professor de desenho, utilizando <strong>HTML, CSS e JavaScript</strong>. Foco em <strong>experiência de usuário intuitiva</strong> e design <strong>responsivo</strong>, promovendo seus cursos de forma eficaz.</p>
                        <a href="https://www.desenhosricardodias.com.br/" className="project-link" target="_blank" rel="noopener noreferrer">Ver Projeto</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/Screenshot_1023.webp" alt="Layout do site Seca e Define, com foco na apresentação do programa." loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--contracted">Projeto Contratado</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Seca e Define - Programa de Emagrecimento</strong></h3>
                        <p className="project-description">Site criado para divulgar um <strong>programa de emagrecimento online</strong>. Design <strong>moderno e intuitivo</strong>, com foco em <strong>depoimentos</strong> e informações relevantes para <strong>impulsionar as vendas</strong>.</p>
                        <a href="https://secaedefine.vercel.app" className="project-link" target="_blank" rel="noopener noreferrer">Conhecer o Programa</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/Chatbot.webp" alt="Imagem do Chatbot Python desenvolvido como projeto pessoal, respondendo a perguntas sobre programação" loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--personal">Projeto Pessoal</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Python Chatbot</strong></h3>
                        <p className="project-description">
                            <strong>Chatbot em Python</strong> que auxilia no <strong>aprendizado da linguagem</strong>. Utiliza o modelo <strong>rufimelo/bert-large-portuguese-cased-sts</strong> para entender perguntas e fornecer <strong>respostas detalhadas</strong> sobre diversos tópicos, desde o <strong>básico</strong> até o <strong>avançado</strong>.
                        </p>
                        <a href="https://github.com/Jeffinp/ProjetoPython" className="project-link" target="_blank" rel="noopener noreferrer">Veja o Projeto do Game</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/jogoplataforma.webp" alt="Layout do Jogo de plataforma Online." loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--personal">Projeto Pessoal</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Jogo de Plataforma Online</strong></h3>
                        <p className="project-description">
                            Versão melhorada de um projeto do GitHub de <a href="https://github.com/guilhermesilveira" target="_blank" rel="noopener noreferrer">Guilherme Silveira</a> (<a href="https://github.com/guilhermesilveira/plataforma-chatgpt" target="_blank" rel="noopener noreferrer">repositório original</a>). Desenvolvido com <strong>HTML, CSS e JavaScript</strong>, com foco em <strong>UX/UI</strong> e <strong>responsividade</strong>.
                        </p>
                        <a href="https://plataforma-chatgpt-main.vercel.app/" className="project-link" target="_blank" rel="noopener noreferrer">Veja o Projeto do Game</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/menuinterativo.webp" alt="Imagem do Menu Interativo" loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--personal">Projeto Pessoal</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Menu Interativo</strong></h3>
                        <p className="project-description">
                            Projeto com várias funcionalidades interativas em <strong>HTML, CSS e JavaScript</strong>. Inclui: "Olá Mundo!", calculadoras, verificador de número primo, conversor de temperatura, gerador de tabela ASCII, Jogos da Forca e da Velha e Lista de Tarefas. Foco em <strong>segurança e tratamento de erros</strong>.
                        </p>
                        <a href="https://menu-interativo.vercel.app/" className="project-link" target="_blank" rel="noopener noreferrer">Interaja com o Menu</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/Presente-Natal.webp" alt="Layout do site Presente de Natal, mostrando a animação de neve." loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--personal">Projeto Pessoal</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Presente de Natal Digital</strong></h3>
                        <p className="project-description">Site criado com <strong>HTML, CSS e JavaScript</strong> para envio de presentes virtuais. <strong>Interface simples e amigável</strong>, com foco na <strong>experiência do usuário</strong>.</p>
                        <a href="https://aterrsagemresponsiva.netlify.app/" className="project-link" target="_blank" rel="noopener noreferrer">Ver Projeto Online</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/Screenshot_993.webp" alt="Layout do site Justly, mostrando o design responsivo." loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--personal">Projeto Pessoal</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Justly - Treinamento Front-End</strong></h3>
                        <p className="project-description">Projeto desenvolvido com <strong>HTML e CSS</strong> para aprimorar habilidades em <strong>desenvolvimento front-end</strong>. Site <strong>responsivo</strong> com <strong>design moderno e limpo</strong>.</p>
                        <a href="https://justly.netlify.app/" className="project-link" target="_blank" rel="noopener noreferrer">Visitar o Site</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/site.webp" alt="Captura de tela do Meu Portfólio, destacando a seção de projetos." loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--personal">Projeto Pessoal</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Meu Portfólio Pessoal</strong></h3>
                        <p className="project-description">Meu espaço online para apresentar projetos, habilidades e tecnologias. Desenvolvido com foco em <strong>responsividade e performance</strong>, demonstrando excelência em <strong>desenvolvimento web</strong>.</p>
                        <a href="https://jefersonreis-github-io.vercel.app/index.html" className="project-link" target="_blank" rel="noopener noreferrer">Navegar no Portfólio</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/bookmark.webp" alt="Interface do gerenciador de favoritos Bookmark Project." loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--personal">Projeto Pessoal</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Bookmark Project - Gerenciador de Favoritos</strong></h3>
                        <p className="project-description"><strong>Gerenciador de favoritos</strong> simples e prático, criado com <strong>HTML, CSS e JavaScript</strong>. Permite adicionar, remover e acessar sites favoritos de forma rápida e organizada.</p>
                        <a href="https://bookmarkproject12.netlify.app/" className="project-link" target="_blank" rel="noopener noreferrer">Experimente o Gerenciador</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/acsendoflex.webp" alt="Layout do site Acsendoflex, com foco na apresentação do software." loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--personal">Projeto Pessoal</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Acsendoflex - Software de Avaliação</strong></h3>
                        <p className="project-description">Site para promover um <strong>software de avaliação de desempenho</strong>. Design <strong>limpo e profissional</strong>, pensado para <strong>converter visitantes em leads</strong>.</p>
                        <a href="https://ascendotraining.netlify.app/" className="project-link" target="_blank" rel="noopener noreferrer">Conhecer o Software</a>
                    </div>
                </div>

                <div className="carousel-item" data-category="web">
                    <figure className="project-image">
                        <img src="/assets/images/Zomato.webp" alt="Layout da landing page do Zomato, destacando a barra de pesquisa." loading="lazy" width="500" height="300" />
                        <figcaption className="project-label project-label--personal">Projeto Pessoal</figcaption>
                    </figure>
                    <div className="project-info">
                        <h3 className="project-title"><strong>Landing Page Zomato (Reimaginação)</strong></h3>
                        <p className="project-description">Recriação da landing page do Zomato com <strong>HTML, CSS e JavaScript</strong>. Versão <strong>responsiva</strong> com <strong>design atrativo e navegação intuitiva</strong>.</p>
                        <a href="https://zomato.com" className="project-link" target="_blank" rel="noopener noreferrer">Explorar a Landing Page</a>
                    </div>
                </div>

                {/* Design */}
                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/DuplaDoTerror.webp" alt="A dupla do terror" loading="lazy" width="500" height="300" />
                        <figcaption>Conheça Bryan e seu "Parasita" em um desenho digital cheio de detalhes! </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="motion">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/BratailsAnim.gif" alt="Versões animadas do Bryan" loading="lazy" width="500" height="300" />
                        <figcaption>Uma animação curtinha do meu personagem Bryan, feita com carinho no Clip Studio. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Azete.webp" alt="Design da marca Azeite" loading="lazy" width="500" height="300" />
                        <figcaption>Criei este design de marca para azeite no Photoshop. O que acharam?</figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/BandeiraEstilosaBrasil.webp" alt="Bandeira estilosa do Brasil" loading="lazy" width="500" height="300" />
                        <figcaption>Uma versão estilizada da nossa bandeira, com um toque de cristais, feita sob encomenda. 🇧🇷</figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/DesignComputador.webp" alt="Design de Gabinete Gamer" loading="lazy" width="500" height="300" />
                        <figcaption>Um design de gabinete gamer personalizado para um cliente apaixonado por jogos! </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Estampa.webp" alt="Estampa de Camisa Tênico Frente" loading="lazy" width="500" height="300" />
                        <figcaption>Estampa de camisa para o dia do meio ambiente, um projeto escolar que adorei desenvolver. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/ParasitaCaderno.webp" alt="Desenho do Parasita" loading="lazy" width="500" height="300" />
                        <figcaption>O parasita do meu personagem, desenhado no papel e finalizado digitalmente com cores vibrantes. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/giratina.webp" alt="Arte digital do Pokémon Giratina" loading="lazy" width="500" height="300" />
                        <figcaption>Uma arte digital do lendário Pokémon Giratina. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/hamburguer.webp" alt="Design de Hambúrguer" loading="lazy" width="500" height="300" />
                        <figcaption>Design apetitoso de hambúrguer criado para uma hamburgueria local. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Alastor.webp" alt="Desenho em Caderno" loading="lazy" width="500" height="300" />
                        <figcaption>Um desenho feito à mão no caderno e colorido digitalmente. ✍️</figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/PizzalDoSul.webp" alt="Design de Pizza para Pizzaria" loading="lazy" width="500" height="300" />
                        <figcaption>Design de pizza criado especialmente para a pizzaria de um cliente.</figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/PizzaInsta.webp" alt="Imagem Promocional de Pizza" loading="lazy" width="500" height="300" />
                        <figcaption>Imagem promocional de pizza, perfeita para bombar as redes sociais! </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/ProtNave.webp" alt="Protótipo de Nave Espacial" loading="lazy" width="500" height="300" />
                        <figcaption>Um protótipo de nave espacial com um design futurista e cheio de estilo! </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Bryan360.webp" alt="Bratails em 360 graus" loading="lazy" width="500" height="300" />
                        <figcaption>Uma visão completa do meu personagem Bratails/Bryan em 360 graus. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/BryanSorrindo.webp" alt="Bratails Sorrindo" loading="lazy" width="500" height="300" />
                        <figcaption>Olha só o Bratails dando um sorriso contagiante! </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="modelagem">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Bratailsnave.webp" alt="Bratails na Nave Espacial" loading="lazy" width="500" height="300" />
                        <figcaption>Bratails explorando o espaço em uma modelagem 3D feita no Blender. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Asgemeas2.webp" alt="Ilustração de Espadas Gêmeas" loading="lazy" width="500" height="300" />
                        <figcaption>Duas espadas gêmeas com detalhes ornamentados em azul e vermelho, um design simétrico impressionante. ⚔️</figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Angel.webp" alt="Símbolos da forma ANGEL" loading="lazy" width="500" height="300" />
                        <figcaption>Símbolos circulares que evocam a beleza das asas de um anjo. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/TFK.webp" alt="Brasões dos Quatro Reinos" loading="lazy" width="500" height="300" />
                        <figcaption>Quatro brasões com design heráldico, representando reinos distintos. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/FurryQueMataFurry.webp" alt="Ilustração com Referência a Berserk" loading="lazy" width="500" height="300" />
                        <figcaption>Uma ilustração digital com uma forte inspiração no universo de Berserk. ️</figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Annie.webp" alt="Retrato Digital da Annie" loading="lazy" width="500" height="300" />
                        <figcaption>Um retrato digital da Annie, com foco nos detalhes expressivos do seu rosto. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="modelagem">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Cubos.webp" alt="Renderização de Teste com Cubos e Esfera" loading="lazy" width="500" height="300" />
                        <figcaption>Uma renderização de teste com cubos e uma esfera, explorando diferentes texturas. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/ArteVicente.webp" alt="Capa de Música para Vicente" loading="lazy" width="500" height="300" />
                        <figcaption>Capa de música criada especialmente para o artista Vicente. 🎶</figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/AsGemeas.webp" alt="Ilustração de Espadas Gêmeas (Variação)" loading="lazy" width="500" height="300" />
                        <figcaption>Outra versão da ilustração das espadas gêmeas, com as cores invertidas. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="modelagem">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Asteroide.webp" alt="Modelo 3D de Asteroide" loading="lazy" width="500" height="300" />
                        <figcaption>Um modelo 3D de asteroide criado no Blender, com uma iluminação básica. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/BryanComFoice.webp" alt="Bratails com Foice" loading="lazy" width="500" height="300" />
                        <figcaption>Bratails e seu parasita em uma cena tensa, ambos visivelmente feridos. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Bryanoao.webp" alt="Bratails Surpreso" loading="lazy" width="500" height="300" />
                        <figcaption>Bratails com uma expressão de surpresa! 😄</figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="modelagem">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/CapitaoAmerica.webp" alt="Modelo 3D do Escudo do Capitão América" loading="lazy" width="500" height="300" />
                        <figcaption>Modelagem 3D do icônico escudo do Capitão América. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/ClickTeamLogo.webp" alt="Logo da CLICKTEAM" loading="lazy" width="500" height="300" />
                        <figcaption>O logo da CLICKTEAM, com um design moderno e minimalista. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="modelagem">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/cycles.webp" alt="Renderização 3D de Rosquinha" loading="lazy" width="500" height="300" />
                        <figcaption>Uma deliciosa rosquinha em 3D! 🍩</figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/forma1.webp" alt="Conceito de Boss para Jogo" loading="lazy" width="500" height="300" />
                        <figcaption>Um conceito de design para um boss de um jogo em desenvolvimento. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="modelagem">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/cranio.webp" alt="Modelagem 3D de Crânio" loading="lazy" width="500" height="300" />
                        <figcaption>Modelagem 3D de um crânio misterioso, criada no Blender. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/ProtScreabiny.webp" alt="Protótipo do Personagem Screaviny" loading="lazy" width="500" height="300" />
                        <figcaption>Protótipo do personagem Screaviny para um projeto de jogo. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="modelagem">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/untitled.webp" alt="Teste de Modelagem 3D de Personagem" loading="lazy" width="500" height="300" />
                        <figcaption>Um teste de modelagem 3D de personagem. </figcaption>
                    </figure>
                </div>

                <div className="carousel-item" data-category="design">
                    <figure className="project-image">
                        <img src="/assets/images/Artes/Versões.webp" alt="Ícones para Servidor do Discord" loading="lazy" width="500" height="300" />
                        <figcaption>Quatro versões de um ícone para um servidor do Discord. </figcaption>
                    </figure>
                </div>

            </div>
            <button className="carousel-button prev" aria-label="Projeto anterior" onClick={prevSlide}>&lt;</button>
            <button className="carousel-button next" aria-label="Próximo projeto" onClick={nextSlide}>&gt;</button>
        </div>
    );
};

export default ImageCarousel;