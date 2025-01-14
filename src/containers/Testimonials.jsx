import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

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
            image: '/assets/images/RicardoDias.webp',
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

    const goToSlide = (index) => setActiveSlideIndex(index);
    const moveToNextSlide = () => setActiveSlideIndex((prev) => (prev + 1) % testimonials.length);
    const moveToPrevSlide = () => setActiveSlideIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const updateSlidePosition = () => {
            const slideWidth = track.children[0]?.offsetWidth || 0;
            track.style.transform = `translateX(${-slideWidth * activeSlideIndex}px)`;
        };

        const startAutoplay = () => {
            if (autoplayInterval.current) return;
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
        };

        const handleTouchEnd = (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) moveToNextSlide();
                else moveToPrevSlide();
            }
        };

        updateSlidePosition();
        startAutoplay();

        track.addEventListener('touchstart', handleTouchStart, { passive: true });
        track.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('resize', updateSlidePosition);

        return () => {
            stopAutoplay();
            track.removeEventListener('touchstart', handleTouchStart);
            track.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('resize', updateSlidePosition);
        };
    }, [activeSlideIndex]);

    return (
        <section id="depoimentos" className="py-16 bg-background dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-text dark:text-gray-100 transition-colors duration-300">Depoimentos</h2>

                <div className="relative overflow-hidden">
                    <div ref={trackRef} className="flex transition-transform duration-500 ease-in-out">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-4">
                                <div className="bg-card dark:bg-gray-700 rounded-xl shadow-lg p-8 transition-colors duration-300">
                                    <div className="flex mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>

                                    <p className="text-text dark:text-gray-300 text-lg mb-6 italic transition-colors duration-300">{testimonial.content}</p>

                                    <div className="flex items-center">
                                        {testimonial.image && (
                                            <img src={testimonial.image} alt={`Foto de ${testimonial.author}`} className="w-16 h-16 rounded-full object-cover mr-4" loading="lazy" />
                                        )}
                                        <div>
                                            <h3 className="font-bold text-text dark:text-gray-100 transition-colors duration-300">{testimonial.author}</h3>
                                            <p className="text-text-secondary dark:text-gray-400 transition-colors duration-300">{testimonial.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 mt-8">
                        <button onClick={moveToPrevSlide} className="p-2 rounded-full bg-card dark:bg-gray-600 shadow-lg hover:bg-hover dark:hover:bg-gray-500 transition-colors duration-300" aria-label="Previous testimonial">
                            <ChevronLeft className="w-6 h-6 text-text dark:text-gray-300 transition-colors duration-300" />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === activeSlideIndex ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400'}`} aria-label={`Go to testimonial ${index + 1}`} />
                            ))}
                        </div>

                        <button onClick={moveToNextSlide} className="p-2 rounded-full bg-card dark:bg-gray-600 shadow-lg hover:bg-hover dark:hover:bg-gray-500 transition-colors duration-300" aria-label="Next testimonial">
                            <ChevronRight className="w-6 h-6 text-text dark:text-gray-300 transition-colors duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;