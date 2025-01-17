import React from 'react';
import { Linkedin, Github, Instagram, MessageCircle } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    
    const socialLinks = [
        {
            icon: <Linkedin className="transition-all duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" aria-label="LinkedIn" />,
            href: "https://www.linkedin.com/in/jeferson-reis-877a942b7/",
            title: t('footer.social.linkedin'),
            label: "LinkedIn"
        },
        {
            icon: <Github className="transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-gray-100" aria-label="GitHub" />,
            href: "https://github.com/Jeffinp",
            title: t('footer.social.github'),
            label: "GitHub"
        },
        {
            icon: <Instagram className="transition-all duration-300 group-hover:text-pink-600 dark:group-hover:text-pink-400" aria-label="Instagram" />,
            href: "https://www.instagram.com/jeffinx___/",
            title: t('footer.social.instagram'),
            label: "Instagram"
        },
        {
            icon: <MessageCircle className="transition-all duration-300 group-hover:text-green-600 dark:group-hover:text-green-400" aria-label="WhatsApp" />,
            href: "https://wa.me/qr/KW2XXA46XAXNH1",
            title: t('footer.social.whatsapp'),
            label: "WhatsApp"
        },
        {
            icon: <FaDiscord className="transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 w-6 h-6" aria-label="Discord" />,
            href: "https://discord.com/users/563186981962776577",
            title: t('footer.social.discord'),
            label: "Discord"
        }
    ];

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                                <span className="text-blue-600 dark:text-blue-500">{'<'}</span>
                                Jeferson Reis
                                <span className="text-blue-600 dark:text-blue-500">{'/>'}</span>
                            </a>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">
                            {t('footer.occupation')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {t('footer.connect')}
                        </h3>
                        <div className="flex gap-4">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={link.title}
                                    className="group p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                                >
                                    {link.icon}
                                    <span className="sr-only">{link.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        {t('footer.copyright', { year: new Date().getFullYear() })}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;