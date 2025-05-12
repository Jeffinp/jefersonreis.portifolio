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
                        {t("ebooks.title", "eBooks")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        {t("ebooks.description", "Uma coleção de eBooks com conteúdo exclusivo para ajudar no seu desenvolvimento pessoal e profissional.")}
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
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    {/* eBook Cover */}
                                    <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
                                        {ebook.coverImage ? (
                                            <img
                                                src={ebook.coverImage}
                                                alt={ebook.title}
                                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Book size={48} className="text-blue-500 opacity-50" />
                                            </div>
                                        )}
                                    </div>

                                    {/* eBook Details */}
                                    <div className="p-5 space-y-3">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {ebook.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                            {ebook.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {ebook.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 text-xs bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-300 rounded-md"
                                                >
                                                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Download Button */}
                                        <a
                                            href={ebook.downloadLink}
                                            className="flex items-center justify-center w-full py-2 px-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center font-medium rounded-md transition duration-300 group-hover:shadow-lg"
                                        >
                                            <Download size={0} className="mr-2" />
                                            {t("ebooks.downloadBtn", "Lançamento em breve")}
                                        </a>
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
                            {t("ebooks.noResults", "Nenhum eBook encontrado")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                            {t("ebooks.tryDifferentFilter", "Tente ajustar sua busca ou selecionar outra categoria")}
                        </p>
                        <button
                            onClick={() => {
                                setActiveFilter("all");
                                setSearchQuery("");
                            }}
                            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                            {t("ebooks.resetFilters", "Limpar Filtros")}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Ebook;