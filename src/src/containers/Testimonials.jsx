import React, { useState, useEffect, useRef } from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const trackRef = useRef(null);
    const autoplayInterval = useRef(null);
    const autoplayDelay = 5000;

    const testimonials = [
        {
            rating: 5,
            content: '"O investimento no desenvolvimento do meu site valeu cada centavo! O design profissional e a otimização para conversões aumentaram muito as vendas dos meus cursos, sem a necessidade de grandes gastos com anúncios. Além disso, o serviço foi ágil e eficiente. Recomendo fortemente!"',
            author: 'Ricardo Dias',
            title: 'Professor de Artes e Fundador',
            image: '/src/assets/image/RicardoDias.webp',
        },
        {
            rating: 5,
            content: '"Como Diretora de Tecnologia da School Vision, posso afirmar que o trabalho do Jeferson foi essencial para modernizar nossa plataforma. A solução que ele desenvolveu nos permitiu otimizar processos internos e oferecer uma melhor experiência para nossos alunos."',
            author: 'Camila Oliveira',
            title: 'Diretora de Tecnologia da School Vision',
        },
        {
            rating: 5,
            content: '"A criação do meu site pelo Jeferson foi um divisor de águas para o meu negócio. Antes, eu tinha dificuldades em alcançar novos clientes online. Agora, com um site moderno e funcional, minha presença digital se fortaleceu e as vendas aumentaram consideravelmente."',
            author: 'Lucas Oliveira',
            title: 'Proprietário, Barbearia Estilo Urbano',
        },
        {
            rating: 5,
            content: '"O Jeferson demonstrou um profissionalismo incrível durante todo o processo de desenvolvimento do meu site. Ele foi atencioso às minhas necessidades, entregou o projeto dentro do prazo e superou minhas expectativas com um resultado final impecável."',
            author: 'Ana Silva',
            title: 'Proprietária, Loja de Roupas Femininas',
        },
        {
            rating: 5,
            content: '"Precisávamos de uma solução personalizada para nossa empresa e o Jeferson entregou exatamente o que precisávamos. O sistema que ele desenvolveu é intuitivo, eficiente e tem nos ajudado a otimizar nossos processos de gestão."',
            author: 'João Pereira',
            title: 'Gerente de Projetos, Empresa de Consultoria',
        },
        {
            rating: 5,
            content: '"Recomendo o Jeferson sem hesitação! Ele é um profissional dedicado, talentoso e com um profundo conhecimento em desenvolvimento web. O site que ele criou para minha empresa é moderno, responsivo e atende perfeitamente às minhas necessidades."',
            author: 'Mariana Costa',
            title: 'Empreendedora Digital',
        },
        {
            rating: 5,
            content: '"O Jeferson me ajudou a transformar minha ideia em realidade. Ele criou um site incrível para o meu novo negócio, com um design moderno e funcionalidades que me permitem interagir melhor com meus clientes. Estou muito satisfeita com o resultado!"',
            author: 'Fernanda Rodrigues',
            title: 'Fundadora, Marca de Acessórios',
        },
    ];

    const slides = testimonials.map((testimonial, index) => (
        <div key={index} className="testimonial">
            <div className="testimonial-rating">
                <span className="star" data-rating={testimonial.rating}>
                    {'★'.repeat(testimonial.rating)}
                </span>
            </div>
            <div className="testimonial-content">
                <p>{testimonial.content}</p>
            </div>
            <div className="testimonial-author">
                {testimonial.image && (
                    <img
                        src={testimonial.image}
                        alt={`Foto de ${testimonial.author}`}
                        className="testimonial-author__image"
                        loading="lazy"
                        width="80"
                        height="80"
                    />
                )}
                <h4 className="testimonial-author__name">
                    <strong>{testimonial.author}</strong>
                </h4>
                <p className="testimonial-author__title">{testimonial.title}</p>
            </div>
        </div>
    ));

    const dots = testimonials.map((_, index) => (
        <button
            key={index}
            className={`testimonial-dot ${index === activeSlideIndex ? 'active' : ''}`}
            aria-label={`Ir para depoimento ${index + 1}`}
            onClick={() => goToSlide(index)}
        />
    ));

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const updateSlideWidth = () => {
            const containerWidth = track.parentElement.offsetWidth;
            Array.from(track.children).forEach((slide) => {
                slide.style.width = `${containerWidth}px`;
            });
            updateSlidePosition();
        };

        const updateSlidePosition = () => {
            const slideWidth = track.children[0]?.offsetWidth || 0;
            track.style.transform = `translateX(${-slideWidth * activeSlideIndex}px)`;
        };

        const startAutoplay = () => {
            if (autoplayInterval.current) return;
            autoplayInterval.current = setInterval(() => moveToNextSlide(), autoplayDelay);
        };

        const stopAutoplay = () => {
            if (autoplayInterval.current) {
                clearInterval(autoplayInterval.current);
                autoplayInterval.current = null;
            }
        };

        const resetAutoplay = () => {
            stopAutoplay();
            startAutoplay();
        };

        updateSlideWidth();
        startAutoplay();
        window.addEventListener('resize', updateSlideWidth);

        const handleSwipe = (touchStartX, touchEndX) => {
            const swipeThreshold = 50;
            const difference = touchStartX - touchEndX;

            if (Math.abs(difference) > swipeThreshold) {
                if (difference > 0) {
                    moveToNextSlide();
                } else {
                    moveToPrevSlide();
                }
            }
        };

        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(touchStartX, touchEndX);
        }, { passive: true });


        const parentElement = track.parentElement;
        parentElement.addEventListener('mouseenter', stopAutoplay);
        parentElement.addEventListener('mouseleave', startAutoplay);

        return () => {
            window.removeEventListener('resize', updateSlideWidth);
            stopAutoplay();
            parentElement.removeEventListener('mouseenter', stopAutoplay);
            parentElement.removeEventListener('mouseleave', startAutoplay);
        };
    }, [activeSlideIndex]);

    const goToSlide = (index) => {
        setActiveSlideIndex(index);
    };

    const moveToNextSlide = () => {
        setActiveSlideIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const moveToPrevSlide = () => {
        setActiveSlideIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section id="depoimentos" className="section testimonials">
            <div className="container">
                <h2 className="section__title">Depoimentos</h2>
                <div className="testimonials__carousel">
                    <div className="testimonials-track" ref={trackRef}>
                        {slides}
                    </div>
                    <div className="navigation-wrapper">
                        <div className="testimonial-dots">{dots}</div>
                        <div className="carousel-controls">
                            <button className="prev-testimonial" aria-label="Anterior" onClick={moveToPrevSlide}>
                                ❮
                            </button>
                            <button className="next-testimonial" aria-label="Próximo" onClick={moveToNextSlide}>
                                ❯
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;