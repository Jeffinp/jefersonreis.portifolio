import React from 'react';
import { PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    const contactInfo = [
        {
            icon: <PhoneCall className="w-6 h-6" />,
            title: t('contact.callMe'),
            link: 'https://wa.me/qr/KW2XXA46XAXNH1',
            linkText: '+55 71 9 8439-3235',
        },
        {
            icon: <img src="assets/images/icon/mail-heart-svgrepo-com.svg" alt="Email" className="w-8 h-8" />,
            title: t('contact.emailMe'),
            link: 'mailto:jefersonreisalmeida8356@gmail.com',
            linkText: 'jefersonreisalmeida8356@gmail.com',
        },
    ];

    return (
        <section className="relative py-24 bg-gray-50 dark:bg-slate-900"> {/* Background color changed to solid */}
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                        {t('contact.title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105">
                            <div className="p-8 flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                    {item.title}
                                </h3>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    {item.linkText}
                                </a>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;