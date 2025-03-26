import React, { useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

const Resume = () => {
    const [expanded, setExpanded] = useState(false);
    const { t } = useTranslation();

    const Card = ({ children, className = "", gradient = "from-blue-400 to-cyan-400" }) => (
        <article className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="p-8">
                <div className="flex flex-col h-full">
                    {children}
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </article>
    );

    return (
        <section id="resume" className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900/55 dark:to-slate-900/55">

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
                        {t("resume.title")}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t("resume.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                            {t("resume.highlights")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {t("resume.highlightItems", { returnObjects: true }).map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl transform hover:scale-105 transition-all duration-300"
                                    >
                                        <span className="text-gray-700 dark:text-gray-300">
                                            {item}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </Card>

                    <Card gradient="from-purple-400 to-pink-400">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                            {t("resume.experience.title")}
                        </h3>
                        <div className="space-y-6">
                            <div className="border-l-4 border-gradient-to-r from-blue-500 to-purple-500 pl-6 transform hover:scale-105 transition-all duration-300">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {t("resume.experience.freelancer.title")}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {t("resume.experience.freelancer.period")}
                                </p>
                                <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-300">
                                    {t("resume.experience.freelancer.responsibilities", {
                                        returnObjects: true,
                                    }).map((item, index) => (
                                        <li key={index} className="transform hover:translate-x-2 transition-transform duration-300">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <div
                        className={`space-y-8 transition-all duration-500 transform ${expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 hidden"
                            }`}
                    >
                        <Card gradient="from-green-400 to-emerald-400">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                {t("resume.technicalSkills.title")}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Object.entries(
                                    t("resume.technicalSkills.categories", {
                                        returnObjects: true,
                                    })
                                ).map(([key, value]) => (
                                    <div key={key} className="space-y-3 transform hover:scale-105 transition-all duration-300">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {value.title}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {value.skills}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card gradient="from-orange-400 to-yellow-400">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                                {t("resume.softSkills.title")}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {t("resume.softSkills.items", { returnObjects: true }).map(
                                    (skill, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-xl transform hover:scale-105 transition-all duration-300"
                                        >
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {skill}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 
                                text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all 
                                duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            {expanded ? (
                                <>
                                    {t("resume.buttons.showLess")}{" "}
                                    <ChevronUp className="ml-2 w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
                                </>
                            ) : (
                                <>
                                    {t("resume.buttons.showMore")}{" "}
                                    <ChevronDown className="ml-2 w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center mt-20">
                        <a
                            href="./Jeferson_resume.pdf"
                            download
                            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 
                                text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all 
                                duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <Download className="w-5 h-5 mr-3 transform group-hover:scale-110 transition-transform duration-300" />
                            {t("resume.buttons.downloadCV")}
                        </a>
                        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                            {t("resume.downloadDescription")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;