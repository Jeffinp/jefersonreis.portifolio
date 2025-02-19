import React from "react";
import { useTranslation } from 'react-i18next';
import { Code2, Palette, FileText, Box, Camera, Cpu, ArrowRight } from "lucide-react";

const ExpertiseAreas = () => {
    const { t } = useTranslation();

    const expertiseItems = [
        {
            title: "Immersive Web Development",
            icon: <Code2 className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Creation of Landing Pages, Corporate Websites, and E-commerce platforms optimized for SEO, focusing on responsiveness and conversion.",
            gradient: "from-blue-400 to-cyan-400"
        },
        {
            title: "Design & Visual Identity",
            icon: <Palette className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Development of logos, visual identities, image manipulation, and graphic materials to strengthen your brand.",
            gradient: "from-purple-400 to-pink-400"
        },
        {
            title: "Professional Documentation",
            icon: <FileText className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Creation of presentations, proposals, spreadsheets, resumes, reports, and financial control documents with impeccable formatting.",
            gradient: "from-green-400 to-emerald-400"
        },
        {
            title: "3D Modeling & Visualization",
            icon: <Box className="w-8 h-8 md:w-12 md:h-12" />,
            description: "3D modeling, animations, photorealistic renderings, and assets for AR/VR and 3D printing.",
            gradient: "from-orange-400 to-yellow-400"
        },
        {
            title: "Technical Support",
            icon: <Cpu className="w-8 h-8 md:w-12 md:h-12" />,
            description: "System maintenance, data recovery, and device optimization with remote or on-site support.",
            gradient: "from-red-400 to-rose-400"
        },
        {
            title: "Editing and Motion Graphics",
            icon: <Camera className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Professional video editing and animations using After Effects, Premiere Pro, and Filmora for YouTube, social media, and other formats.",
            gradient: "from-indigo-400 to-violet-400"
        }
    ];

    return (
        <section id="atuacao" className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-900">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                        {t('expertise.title')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t('expertise.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {expertiseItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
                        >
                            <div className="p-8">
                                <div className="flex flex-col items-center">
                                    <div className={`mb-6 p-6 rounded-2xl bg-gradient-to-br ${item.gradient} text-white 
                                        shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                        {item.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-transparent 
                                        group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-500 group-hover:to-purple-500 
                                        transition-all duration-300">
                                        {t(`expertise.items.item${index}.title`)}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                                        {t(`expertise.items.item${index}.description`)}
                                    </p>

                                    <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 
                                        dark:hover:text-blue-400 font-medium transition-colors duration-300">
                                        Learn more
                                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </div>
                            </div>

                            {/* Bottom border gradient animation */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 
                                opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertiseAreas;