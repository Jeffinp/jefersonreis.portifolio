import React, { useState, useEffect, useRef, memo } from 'react';
import { Book, ChevronRight, BookOpen, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from 'react-router-dom';
import { featuredEbooks } from '../data/featuredEbooks'; // Importando os featuredEbooks

/**
 * Hook personalizado para gerenciar animações baseadas em visibilidade
 */
const useAnimatedVisibility = (threshold = 0.2, once = true) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once, threshold });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return { ref, controls };
};

/**
 * Componente de seção animada
 */
const AnimatedSection = memo(({ children, delay = 0, className = "" }) => {
    const { ref, controls } = useAnimatedVisibility(0.2);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        delay,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
});

AnimatedSection.displayName = 'AnimatedSection';

const EbookPromo = () => {
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="ebooks-promo" className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-transparent">
            {/* Background com quadrados */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Text content */}
                    <AnimatedSection className="max-w-xl">
                        <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/60 rounded-full px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-200 mb-4">
                            <BookOpen size={16} className="mr-2" />
                            {t("ebooksPromo.badge", "Novos eBooks disponíveis")}
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                            {t("ebooksPromo.title", "Conhecimento que transforma")}
                        </h2>

                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                            {t("ebooksPromo.description", "Acesse minha biblioteca exclusiva de eBooks com conteúdos sobre tecnologia, empreendedorismo e desenvolvimento pessoal. Material prático e objetivo para aplicação imediata.")}
                        </p>

                        <ul className="mb-8 space-y-3">
                            {[
                                "Conteúdo exclusivo",
                                "PDF organizado e visual bonito",
                                "Exemplos práticos",
                                "Acesso imediato ao conteúdo",
                                "Atualizações regulares",
                                "Suporte ao cliente dedicado"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/60 flex items-center justify-center mr-3">
                                        <ChevronRight size={14} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {t(`ebooksPromo.benefits.${index}`, item)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/ebooks"
                            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
                            aria-label={t("ebooksPromo.cta", "Explorar Biblioteca")}
                        >
                            {t("ebooksPromo.cta", "Explorar Biblioteca")}
                            <Book size={18} className="ml-2" />
                        </Link>
                    </AnimatedSection>

                    {/* eBooks preview */}
                    <AnimatedSection delay={0.2} className="relative">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 sm:gap-4 relative">
                            {featuredEbooks.map((ebook) => (
                                <motion.div
                                    key={ebook.id}
                                    className="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    style={{
                                        transformOrigin: "center bottom",
                                    }}
                                >
                                    <div className="h-40 bg-blue-50 dark:bg-gray-700 relative">
                                        {ebook.coverImage ? (
                                            <img
                                                src={ebook.coverImage}
                                                alt={ebook.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <Book size={36} className="text-blue-500/50" />
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-md bg-blue-600/90 text-white">
                                            {ebook.tags.join(", ")}
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                                            {ebook.title}
                                        </h3>
                                        <div className="mt-auto pt-2 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                                            <Download size={14} className="mr-1" />
                                            <span aria-label={t("ebooksPromo.details", "Ver detalhes")}>
                                                {t("ebooksPromo.details", "Ver detalhes")}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mensagem de aviso*/}
                        <div className="mt-4 flex justify-center">
                            <div className="relative bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-2 rounded-lg shadow-lg">
                                <p className="text-center text-sm">
                                    Novos eBooks estarão disponíveis em breve. Enquanto isso, aproveite os que já estão disponíveis.
                                </p>
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-b-blue-100 dark:border-b-blue-900" />
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default EbookPromo; 