import React from "react";
import { Linkedin, Github, Instagram, MessageCircle, ArrowUp } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
    const { t } = useTranslation();

    const socialLinks = [
        {
            icon: <Linkedin className="w-6 h-6" />,
            href: "https://www.linkedin.com/in/jeferson-reis-877a942b7/",
            title: t("footer.social.linkedin"),
            label: "LinkedIn",
            hoverColor: "hover:text-blue-500 dark:hover:text-blue-400",
            bgColor: "bg-blue-100 dark:bg-blue-900/20"
        },
        {
            icon: <Github className="w-6 h-6" />,
            href: "https://github.com/Jeffinp",
            title: t("footer.social.github"),
            label: "GitHub",
            hoverColor: "hover:text-gray-900 dark:hover:text-gray-100",
            bgColor: "bg-gray-100 dark:bg-gray-800"
        },
        {
            icon: <Instagram className="w-6 h-6" />,
            href: "https://www.instagram.com/jeffinx___/",
            title: t("footer.social.instagram"),
            label: "Instagram",
            hoverColor: "hover:text-pink-600 dark:hover:text-pink-400",
            bgColor: "bg-pink-100 dark:bg-pink-900/20"
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            href: "https://wa.me/qr/KW2XXA46XAXNH1",
            title: t("footer.social.whatsapp"),
            label: "WhatsApp",
            hoverColor: "hover:text-green-600 dark:hover:text-green-400",
            bgColor: "bg-green-100 dark:bg-green-900/20"
        },
        {
            icon: <FaDiscord className="w-6 h-6" />,
            href: "https://discord.com/users/563186981962776577",
            title: t("footer.social.discord"),
            label: "Discord",
            hoverColor: "hover:text-blue-600 dark:hover:text-blue-400",
            bgColor: "bg-indigo-100 dark:bg-indigo-900/20"
        },
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-slate-900 border-t border-gray-200 dark:border-gray-800">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-float-1" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-float-2" />
                <div className="absolute inset-0 bg-[size:40px_40px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] opacity-10 dark:opacity-20" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <motion.h2
                            whileHover={{ scale: 1.05 }}
                            className="text-3xl font-bold inline-block"
                        >
                            <a href="#" className="group transition-colors duration-300">
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {"<"}Jeferson Reis{"/>"}
                                </span>
                                <span className="ml-2 inline-block w-2 h-6 bg-blue-600 animate-blink" />
                            </a>
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
                            {t("footer.occupation")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {t("footer.quickLinks")}
                        </h3>
                        <nav className="grid grid-cols-2 gap-4">
                            {['home', 'about', 'portfolio', 'contact'].map((item) => (
                                <motion.a
                                    key={item}
                                    href={`#${item}`}
                                    whileHover={{ x: 5 }}
                                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    {t(`menu.${item}`)}
                                </motion.a>
                            ))}
                        </nav>
                    </div>

                    {/* Social Connections */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {t("footer.connect")}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={link.title}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${link.bgColor} ${link.hoverColor}`}
                                >
                                    {link.icon}
                                    <span className="sr-only">{link.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4">
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                        {t("footer.copyright", { year: new Date().getFullYear() })}
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;