import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ChevronLeft,
    ChevronRight,
    Book,
    Filter,
    X,
    Download,
    Search
} from 'lucide-react';
import { debounce } from '../utils';
import { featuredEbooks } from '../data/featuredEbooks';
import { Link } from 'react-router-dom';

const Ebook = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleScroll = debounce(() => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.scrollHeight;

        if (scrollPosition + windowHeight >= bodyHeight - 100) {
            handlePageChange(currentPage + 1);
        }
    }, 100);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Verificação inicial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Extrair tags únicas para filtragem
    const allTags = [...new Set(featuredEbooks.flatMap(book => book.tags || []))];

    // Categorias para botões de filtro
    const categories = [
        { value: "all", label: t("ebooks.filters.all", "Todos") },
        ...allTags.map(tag => ({
            value: tag,
            label: t(`ebooks.filters.${tag}`, tag.charAt(0).toUpperCase() + tag.slice(1))
        }))
    ];

    // Filtrar e buscar ebooks
    const filteredEbooks = featuredEbooks.filter(book =>
        (activeFilter === "all" || book.tags.includes(activeFilter)) &&
        (searchQuery === "" ||
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    );

    return (
        <section
            id="ebooks"
            className="w-full min-h-screen py-16 md:py-24 lg:py-32 bg-transparent relative"
        >
            {/* Background com quadrados */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] -z-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
                    backgroundSize: isMobile ? '40px 40px' : '80px 80px'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho da Seção com Gradiente Animado */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 space-y-4"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {t("ebooks.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        {t("ebooks.description")}
                    </p>
                </motion.div>

                {/* Container de Busca e Filtro */}
                <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
                    {/* Input de Busca */}
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder={t("ebooks.searchPlaceholder", "Busque por título, descrição ou tags")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                            size={20}
                        />
                    </div>

                    {/* Botão de Filtro Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsFilterMenuOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-md hover:scale-105 transition-transform"
                        >
                            <Filter size={18} />
                            {t("ebooks.filterBtn", "Filtrar")}
                        </button>
                    </div>
                </div>

                {/* Menu de Filtro Mobile */}
                <AnimatePresence>
                    {isFilterMenuOpen && isMobile && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25 }}
                            className="fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-2xl p-6 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {t("ebooks.filterTitle", "Filtros")}
                                </h3>
                                <button
                                    onClick={() => setIsFilterMenuOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <X size={20} className="text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.value}
                                        onClick={() => {
                                            setActiveFilter(cat.value);
                                            setIsFilterMenuOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${activeFilter === cat.value
                                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Filtros de Categoria */}
                <div className="hidden md:flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveFilter(cat.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat.value
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* eBooks Grid */}
                {filteredEbooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {filteredEbooks.map((ebook) => (
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
                                                alt={t(`ebooks.featuredEbooks.${ebook.id}.title`)}
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
                                            {t(`ebooks.featuredEbooks.${ebook.id}.title`)}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                            {t(`ebooks.featuredEbooks.${ebook.id}.description`)}
                                        </p>
                                        <div className="mt-auto pt-2 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                                            <Download size={14} className="mr-1" />
                                            <Link to="/ebooks" aria-label={t("ebooksPromo.details")}>
                                                {t("ebooksPromo.details")}
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    // No Results State
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-16 space-y-4"
                    >
                        <Book size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {t("ebooks.noResults")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                            {t("ebooks.tryDifferentFilter")}
                        </p>
                        <button
                            onClick={() => {
                                setActiveFilter("all");
                                setSearchQuery("");
                            }}
                            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                            {t("ebooks.resetFilters")}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Ebook;