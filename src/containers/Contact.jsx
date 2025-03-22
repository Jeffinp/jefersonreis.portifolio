import React, { useEffect, useRef } from 'react';
import { PhoneCall, Mail, ClipboardCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation, useInView } from "framer-motion";

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
            ariaLabel: t('contact.ariaWhatsapp'),
            delay: 0.1
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
            },
            delay: 0.2
        },
    ];

    return (
        <section id="contact" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-blue-50/70 dark:from-slate-900/60 dark:to-slate-900/60">

            <div aria-hidden="true" className="absolute -z-10 inset-0 overflow-hidden pointer-events-none select-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000" />
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40 animate-blob animation-delay-4000" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/80 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-blob animation-delay-1000" />

                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.03]" />

                {/* Wave pattern at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent" />
                <svg className="absolute bottom-0 fill-blue-100/30 dark:fill-blue-900/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                        {t('contact.title')}
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {contactInfo.map((item, index) => (
                        <AnimatedSection delay={item.delay} key={index} className="group perspective">
                            <div className="relative h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu hover:-rotate-y-2 hover:scale-[1.02]">
                                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-blue-50/30 dark:from-slate-700/0 dark:to-blue-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Decorative elements */}
                                <div className="absolute -right-3 -top-3 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-500" />

                                <div className="p-8 flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;