import React from 'react';
import { PhoneCall, Mail } from 'lucide-react';

const Contact = () => {
    const contactInfo = [
        {
            icon: <PhoneCall className="w-6 h-6 text-primary fill-current" />,
            title: 'Me ligue para iniciar seu projeto!',
            link: 'https://wa.me/qr/KW2XXA46XAXNH1',
            linkText: '+55 71 9 8439-3235',
        },
        {
            icon: <img src="assets\images\icon\mail-heart-svgrepo-com.svg" alt="Email" className="w-8 h-8" />,
            title: 'Envie um email para me contar sobre sua ideia!',
            link: 'mailto:jefersonreisalmeida8356@gmail.com',
            linkText: 'jefersonreisalmeida8356@gmail.com',
        },
    ];
    
    return (
        <section id="contact" className="relative py-20 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-text dark:text-gray-100 transition-colors duration-300">Contato</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="flex flex-col items-center p-8 bg-card dark:bg-gray-700 rounded-xl shadow-lg transition-colors duration-300">
                            {item.icon}
                            <h3 className="text-lg font-bold text-text dark:text-gray-100 mt-4 mb-2 transition-colors duration-300">{item.title}</h3>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors duration-300">{item.linkText}</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;