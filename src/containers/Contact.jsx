import React from 'react';
import { PhoneCall, Mail, ClipboardCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Contact = () => {
    const { t } = useTranslation();

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('jefersonreisalmeida8356@gmail.com');
            alert(t('contact.emailCopied'));
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    const contactInfo = [
        {
            icon: <PhoneCall className="w-6 h-6" aria-hidden="true" />,
            title: t('contact.callMe'),
            link: 'https://wa.me/qr/KW2XXA46XAXNH1',
            linkText: t('contact.phone'),
            ariaLabel: t('contact.ariaWhatsapp')
        },
        {
            icon: <Mail className="w-6 h-6" aria-hidden="true" />,
            title: t('contact.emailMe'),
            link: 'mailto:jefersonreisalmeida8356@gmail.com',
            linkText: t('contact.email'),
            ariaLabel: t('contact.ariaEmail'),
            extraAction: {
                icon: <ClipboardCheck className="w-4 h-4 ml-2" />,
                label: t('contact.copyEmail'),
                action: handleCopyEmail
            }
        },
    ];

    return (
        <section id="contact" className="relative py-24 bg-gray-50 dark:bg-slate-900">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-float-1" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-float-2" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                        {t('contact.title')}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {contactInfo.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            className="group relative rounded-xl overflow-hidden shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className="p-8 flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                    {item.title}
                                </h3>
                                
                                <div className="flex items-center gap-2">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.ariaLabel}
                                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 break-all"
                                    >
                                        {item.linkText}
                                    </a>
                                    
                                    {item.extraAction && (
                                        <button
                                            onClick={item.extraAction.action}
                                            aria-label={item.extraAction.label}
                                            className="text-gray-400 hover:text-purple-500 transition-colors duration-300"
                                            type="button"
                                        >
                                            {item.extraAction.icon}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;