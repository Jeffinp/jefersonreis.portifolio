import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            // Mostrar botão apenas quando rolar mais que 300px
            const shouldBeVisible = window.scrollY > 300;
            if (shouldBeVisible !== isVisible) {
                setIsVisible(shouldBeVisible);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed z-50 bottom-48 right-5 p-3 md:p-4 
                        rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                        text-white shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-700/20 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    title={t("floatButtons.scrollToTop") || "Voltar ao topo"}
                    aria-label={t("floatButtons.scrollToTop") || "Voltar ao topo"}
                >
                    <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />

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
            )}
        </AnimatePresence>
    );
};

export default ScrollToTopBtn;
