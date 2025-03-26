import React, { useEffect, useRef, useState } from "react";
import { Globe, Palette, FileText, Box, Laptop, Video, Download, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";

// Componente para animações de entrada
const AnimatedSection = ({ children, delay = 0, className = "" }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

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
};

const Services = () => {
    const { t } = useTranslation();
    const [expandedCard, setExpandedCard] = useState(null);
    const [isDownloadHovered, setIsDownloadHovered] = useState(false);

    const services = [
        {
            icon: <Globe className="w-8 h-8" />,
            title: "services.items.web.title",
            description: "services.items.web.description",
            gradient: "from-blue-400 to-cyan-400",
            delay: 0.1
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: "services.items.design.title",
            description: "services.items.design.description",
            gradient: "from-purple-400 to-pink-400",
            delay: 0.2
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "services.items.documentation.title",
            description: "services.items.documentation.description",
            gradient: "from-green-400 to-emerald-400",
            delay: 0.3
        },
        {
            icon: <Box className="w-8 h-8" />,
            title: "services.items.modeling.title",
            description: "services.items.modeling.description",
            gradient: "from-orange-400 to-yellow-400",
            delay: 0.4
        },
        {
            icon: <Laptop className="w-8 h-8" />,
            title: "services.items.support.title",
            description: "services.items.support.description",
            gradient: "from-red-400 to-rose-400",
            delay: 0.5
        },
        {
            icon: <Video className="w-8 h-8" />,
            title: "services.items.video.title",
            description: "services.items.video.description",
            gradient: "from-indigo-400 to-violet-400",
            delay: 0.6
        },
    ];

    // Variantes de animação para os cartões
    const cardVariants = {
        initial: {
            scale: 1,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        },
        expanded: {
            scale: 1.05,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
        }
    };

    // Variantes para ícones
    const iconVariants = {
        initial: { rotate: 0, scale: 1 },
        hover: {
            rotate: 10, // Modificado: apenas um valor em vez de [0, -10, 0, 10, 0]
            scale: 1.2,
            transition: { duration: 0.5, type: "tween" } // Adicionado type: "tween"
        },
        expanded: { rotate: 0, scale: 1.3, transition: { duration: 0.3 } }
    };

    // Variantes para texto de descrição
    const descriptionVariants = {
        initial: { opacity: 0.8, y: 0 },
        hover: { opacity: 1, y: 0 },
        expanded: { opacity: 1, y: 0 }
    };

    // Variantes para o botão de download
    const downloadButtonVariants = {
        initial: { scale: 1, y: 0 },
        hover: {
            scale: 1.05,
            y: -5,
            boxShadow: "0 15px 30px -10px rgba(79, 70, 229, 0.4)",
            transition: { duration: 0.3, ease: "easeOut" }
        },
        tap: { scale: 0.98, y: 0, transition: { duration: 0.1 } }
    };

    const handleCardClick = (index) => {
        if (expandedCard === index) {
            setExpandedCard(null);
        } else {
            setExpandedCard(index);
        }
    };

    return (
        <section id="areas" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-blue-50/70 dark:from-slate-900/60 dark:to-slate-900/60">
            

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                        {t("services.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t("services.subtitle")}
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        if (!service) return null;

                        const isExpanded = expandedCard === index;
                        const cardState = isExpanded ? "expanded" : "initial";

                        return (
                            <AnimatedSection key={index} delay={service.delay} className="perspective">
                                <motion.div
                                    className="relative h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
                                    variants={cardVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    animate={cardState}
                                    whileTap="tap"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                        duration: 0.4
                                    }}
                                >
                                    <motion.div
                                        className="absolute inset-x-0 -bottom-px h-1"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            background: "linear-gradient(to right, transparent, rgb(59, 130, 246), transparent)",
                                            originX: 0.5
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/30 dark:from-slate-700/0 dark:to-blue-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Decorative elements */}
                                    <motion.div
                                        className="absolute -right-3 -top-3 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-2xl"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 0.7 }}
                                        animate={{ opacity: isExpanded ? 0.7 : 0 }}
                                        transition={{ duration: 0.5 }}
                                    />

                                    <div className="p-8">
                                        <div className="flex flex-col h-full">
                                            <motion.div
                                                className={`mb-8 p-6 rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-lg w-fit`}
                                                variants={iconVariants}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                            >
                                                {service.icon}
                                            </motion.div>

                                            <motion.h3
                                                className={`text-xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text transition-all duration-300 ${isExpanded ? 'text-transparent bg-gradient-to-r from-blue-500 to-purple-500' : ''}`}
                                                animate={{
                                                    scale: isExpanded ? 1.05 : 1,
                                                    transition: { duration: 0.3, ease: "easeOut" }
                                                }}
                                            >
                                                {t(service.title)}
                                            </motion.h3>

                                            <AnimatePresence>
                                                <motion.p
                                                    className="text-gray-600 dark:text-gray-300 mb-6 flex-grow"
                                                    variants={descriptionVariants}
                                                    initial="initial"
                                                    animate={cardState}
                                                    layout
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                >
                                                    {t(service.description)}
                                                </motion.p>
                                            </AnimatePresence>

                                            {isExpanded && (
                                                <motion.div
                                                    className="flex justify-end"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 20 }}
                                                    transition={{ duration: 0.3, delay: 0.1 }}
                                                >
                                                    <button
                                                        className="flex items-center text-blue-500 font-medium hover:text-blue-600"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Aqui você pode adicionar uma ação de "saiba mais"
                                                        }}
                                                    >
                                                        Saiba mais
                                                        <motion.span
                                                            initial={{ x: 0 }}
                                                            animate={{ x: 5 }} // Modificado: apenas um valor final
                                                            transition={{
                                                                duration: 1,
                                                                repeat: Infinity,
                                                                repeatType: "reverse"
                                                            }}
                                                        >
                                                            <ArrowRight className="w-4 h-4 ml-2" />
                                                        </motion.span>
                                                    </button>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        );
                    })}
                </div>

                <AnimatedSection delay={0.7} className="mt-20 text-center">
                    <motion.button
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 
                                  text-white rounded-full font-medium shadow-lg"
                        variants={downloadButtonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        onHoverStart={() => setIsDownloadHovered(true)}
                        onHoverEnd={() => setIsDownloadHovered(false)}
                    >
                        <motion.div
                            animate={{
                                y: isDownloadHovered ? -2 : 0 // Modificado: apenas dois valores
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: isDownloadHovered ? Infinity : 0,
                                repeatType: "reverse"
                            }}
                            className="mr-3"
                        >
                            <Download className="w-5 h-5" />
                        </motion.div>
                        <span className="text-lg">{t("services.downloadButton")}</span>
                    </motion.button>

                    <motion.p
                        className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: isDownloadHovered ? 1 : 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        {t("services.downloadDescription")}
                    </motion.p>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Services;