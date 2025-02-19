import React from "react";
import {
    Globe,
    Palette,
    FileText,
    Box,
    Laptop,
    Video,
    Download,
    ArrowRight
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: <Globe className="w-8 h-8" />,
            title: "services.items.web.title",
            description: "services.items.web.description",
            gradient: "from-blue-400 to-cyan-400"
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: "services.items.design.title",
            description: "services.items.design.description",
            gradient: "from-purple-400 to-pink-400"
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "services.items.documentation.title",
            description: "services.items.documentation.description",
            gradient: "from-green-400 to-emerald-400"
        },
        {
            icon: <Box className="w-8 h-8" />,
            title: "services.items.modeling.title",
            description: "services.items.modeling.description",
            gradient: "from-orange-400 to-yellow-400"
        },
        {
            icon: <Laptop className="w-8 h-8" />,
            title: "services.items.support.title",
            description: "services.items.support.description",
            gradient: "from-red-400 to-rose-400"
        },
        {
            icon: <Video className="w-8 h-8" />,
            title: "services.items.video.title",
            description: "services.items.video.description",
            gradient: "from-indigo-400 to-violet-400"
        },
    ];

    return (
        <section id="areas" className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900/55 dark:to-slate-900/55">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                        {t("services.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t("services.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <article
                            key={index}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
                        >
                            <div className="p-8">
                                <div className="flex flex-col h-full">
                                    <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-br ${service.gradient} text-white 
                                        shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 w-fit`}>
                                        {service.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent 
                                        group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 
                                        group-hover:bg-clip-text transition-all duration-300">
                                        {t(service.title)}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                                        {t(service.description)}
                                    </p>

                                </div>
                            </div>

                            {/* Bottom border gradient animation */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 
                                opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        </article>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button
                        className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 
                            text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all 
                            duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <Download className="w-5 h-5 mr-3 transform group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-lg">{t("services.downloadButton")}</span>
                    </button>

                    <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                        {t("services.downloadDescription")}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Services;