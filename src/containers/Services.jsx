import React from "react";
import {
    Globe,
    Palette,
    FileText,
    Box,
    Laptop,
    Video,
    Download,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: <Globe className="w-8 h-8" />,
            title: "services.items.web.title",
            description: "services.items.web.description",
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: "services.items.design.title",
            description: "services.items.design.description",
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "services.items.documentation.title",
            description: "services.items.documentation.description",
        },
        {
            icon: <Box className="w-8 h-8" />,
            title: "services.items.modeling.title",
            description: "services.items.modeling.description",
        },
        {
            icon: <Laptop className="w-8 h-8" />,
            title: "services.items.support.title",
            description: "services.items.support.description",
        },
        {
            icon: <Video className="w-8 h-8" />,
            title: "services.items.video.title",
            description: "services.items.video.description",
        },
    ];

    return (
        <section className="relative py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t("services.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {t("services.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <article
                            key={index}
                            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative m-[1px] bg-white dark:bg-gray-800 rounded-[11px] p-6 h-full">
                                <div className="mb-6 p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 w-fit transition-transform duration-300 group-hover:scale-110">
                                    <div className="text-blue-600 dark:text-blue-400">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t(service.title)}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t(service.description)}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="./Services_Catalog.pdf"
                        download
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        {t("services.downloadButton")}
                    </a>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        {t("services.downloadDescription")}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Services;
