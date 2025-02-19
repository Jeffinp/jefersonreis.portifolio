import React from "react";
import { User, Palette, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutMe = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="relative py-24 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-900">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-green-400 dark:from-blue-500 dark:to-green-500" />

            {/* Background decoration */}
            <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent mb-6">
                        {t("about.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t("about.intro")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Developer Card */}
                    <div className="group">
                        <div className="relative p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative flex flex-col items-center">
                                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                    <User className="w-8 h-8 md:w-12 md:h-12" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {t("about.devTitle")}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                                    {t("about.devDescription")}
                                </p>

                                <button
                                    type="button"
                                    className="flex items-center text-blue-500 dark:text-blue-400 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300"
                                    aria-label={t("about.learnMore")}
                                >
                                    {t("about.learnMore")} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Designer Card */}
                    <div className="group">
                        <div className="relative p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative flex flex-col items-center">
                                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 dark:from-green-500 dark:to-green-600 text-white shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                                    <Palette className="w-8 h-8 md:w-12 md:h-12" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300">
                                    {t("about.designTitle")}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                                    {t("about.designDescription")}
                                </p>

                                <button
                                    type="button"
                                    className="flex items-center text-green-500 dark:text-green-400 font-medium group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors duration-300"
                                    aria-label={t("about.learnMore")}
                                >
                                    {t("about.learnMore")} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
