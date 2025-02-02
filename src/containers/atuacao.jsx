import React from "react";
import { useTranslation } from 'react-i18next';
import { Code2, Palette, FileText, Box, Camera, Cpu } from "lucide-react";

const ExpertiseAreas = () => {
    const { t } = useTranslation();

    const expertiseItems = [
        {
            title: "Immersive Web Development",
            icon: <Code2 className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Creation of Landing Pages, Corporate Websites, and E-commerce platforms optimized for SEO, focusing on responsiveness and conversion."
        },
        {
            title: "Design & Visual Identity",
            icon: <Palette className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Development of logos, visual identities, image manipulation, and graphic materials to strengthen your brand."
        },
        {
            title: "Professional Documentation",
            icon: <FileText className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Creation of presentations, proposals, spreadsheets, resumes, reports, and financial control documents with impeccable formatting."
        },
        {
            title: "3D Modeling & Visualization",
            icon: <Box className="w-8 h-8 md:w-12 md:h-12" />,
            description: "3D modeling, animations, photorealistic renderings, and assets for AR/VR and 3D printing."
        },
        {
            title: "Technical Support",
            icon: <Cpu className="w-8 h-8 md:w-12 md:h-12" />,
            description: "System maintenance, data recovery, and device optimization with remote or on-site support."
        },
        {
            title: "Editing and Motion Graphics",
            icon: <Camera className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Professional video editing and animations using After Effects, Premiere Pro, and Filmora for YouTube, social media, and other formats."
        }
    ];

    // Add these translations to your i18n configuration
    const i18nAdditions = {
        en: {
            translation: {
                expertise: {
                    title: 'Areas of Expertise',
                    subtitle: 'Discover my main areas of expertise and how I can help your project take off.',
                    items: expertiseItems.reduce((acc, item, index) => ({
                        ...acc,
                        [`item${index}`]: {
                            title: item.title,
                            description: item.description
                        }
                    }), {})
                }
            }
        }
    };

    return (
        <section id="atuacao" className="relative py-20 bg-white dark:bg-slate-900">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('expertise.title')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {t('expertise.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {expertiseItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative m-[1px] bg-white dark:bg-gray-800 rounded-[11px] p-8 h-full">
                                <div className="flex flex-col items-center">
                                    <div className="mb-6 p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                                        transition-transform duration-300 group-hover:scale-110">
                                        <div className="text-blue-600 dark:text-blue-400">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                                        {t(`expertise.items.item${index}.title`)}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                                        {t(`expertise.items.item${index}.description`)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertiseAreas;