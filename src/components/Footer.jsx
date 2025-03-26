import React, { useEffect, useRef } from "react";
import { Linkedin, Github, Instagram, MessageCircle } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion, useAnimation, useInView } from "framer-motion";
import SectionBackground from "./SectionBackground";

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

const Footer = () => {
    const { t } = useTranslation();

    const socialLinks = [
        {
            icon: <Linkedin className="w-6 h-6" />,
            href: "https://www.linkedin.com/in/jeferson-reis-877a942b7/",
            title: t("footer.social.linkedin"),
            label: "LinkedIn",
            hoverColor: "hover:text-blue-500 dark:hover:text-blue-400",
            delay: 0.1
        },
        {
            icon: <Github className="w-6 h-6" />,
            href: "https://github.com/Jeffinp",
            title: t("footer.social.github"),
            label: "GitHub",
            hoverColor: "hover:text-gray-900 dark:hover:text-gray-100",
            delay: 0.2
        },
        {
            icon: <Instagram className="w-6 h-6" />,
            href: "https://www.instagram.com/jeffinx___/",
            title: t("footer.social.instagram"),
            label: "Instagram",
            hoverColor: "hover:text-pink-600 dark:hover:text-pink-400",
            delay: 0.3
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            href: "https://wa.me/qr/KW2XXA46XAXNH1",
            title: t("footer.social.whatsapp"),
            label: "WhatsApp",
            hoverColor: "hover:text-green-600 dark:hover:text-green-400",
            delay: 0.4
        },
        {
            icon: <FaDiscord className="w-6 h-6" />,
            href: "https://discord.com/users/563186981962776577",
            title: t("footer.social.discord"),
            label: "Discord",
            hoverColor: "hover:text-blue-600 dark:hover:text-blue-400",
            delay: 0.5
        },
    ];

    const menuItems = [
        { key: 'home', delay: 0.2 },
        { key: 'about', delay: 0.3 },
        { key: 'portfolio', delay: 0.4 },
        { key: 'contact', delay: 0.5 }
    ];

    return (
        <footer className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50/70 dark:from-slate-900/60 dark:to-slate-900/60 border-t border-gray-200 dark:border-gray-800">
            {/* Background decorative elements */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-500 dark:to-purple-500" />

            <SectionBackground wave={false} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <AnimatedSection className="space-y-6">
                        <div className="group perspective">
                            <div className="relative transform-gpu hover:-rotate-y-2 hover:scale-[1.02] transition-all duration-300">
                                <h2 className="text-3xl font-bold">
                                    <a href="#" className="group">
                                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                            {"<"}Jeferson Reis{"/>"}
                                        </span>
                                        <span className="ml-2 inline-block w-2 h-6 bg-gradient-to-r from-blue-500 to-purple-500 animate-blink" />
                                    </a>
                                </h2>
                                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
                            {t("footer.occupation")}
                        </p>
                    </AnimatedSection>

                    {/* Quick Links */}
                    <AnimatedSection delay={0.1} className="space-y-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            {t("footer.quickLinks")}
                        </h3>
                        <nav className="grid grid-cols-2 gap-4">
                            {menuItems.map((item) => (
                                <AnimatedSection key={item.key} delay={item.delay}>
                                    <a
                                        href={`#${item.key}`}
                                        className="relative text-gray-600 dark:text-gray-300 transition-all duration-300 hover:translate-x-1 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        <span className="absolute -bottom-px left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 hover:w-full transition-all duration-300"></span>
                                        {t(`menu.${item.key}`)}
                                    </a>
                                </AnimatedSection>
                            ))}
                        </nav>
                    </AnimatedSection>

                    {/* Social Connections */}
                    <AnimatedSection delay={0.2} className="space-y-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            {t("footer.connect")}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={link.title}
                                    className={`p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${link.hoverColor}`}
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                    <span className="sr-only">{link.label}</span>
                                </a>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>

                {/* Copyright */}
                <AnimatedSection delay={0.3} className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4">
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                        {t("footer.copyright", { year: new Date().getFullYear() })}
                    </p>
                </AnimatedSection>
            </div>
        </footer>
    );
};

export default Footer;