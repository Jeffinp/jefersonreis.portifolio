import React, { useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

const Resume = () => {
    const [expanded, setExpanded] = useState(false);
    const { t } = useTranslation();

    const Card = ({ children, className = "" }) => (
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
            {children}
        </div>
    );

    return (
        <section id="resume" className="relative py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('resume.title')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {t('resume.subtitle')}
                    </p>
                </div>

                <div className="space-y-8">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('resume.highlights')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {t('resume.highlightItems', { returnObjects: true }).map((item, index) => (
                                <div key={index} className="flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 rounded-lg">
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('resume.experience.title')}</h3>
                        <div className="space-y-6">
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('resume.experience.freelancer.title')}</h4>
                                <p className="text-gray-500 dark:text-gray-400">{t('resume.experience.freelancer.period')}</p>
                                <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                                    {t('resume.experience.freelancer.responsibilities', { returnObjects: true }).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <div className={`space-y-8 transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('resume.technicalSkills.title')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Object.entries(t('resume.technicalSkills.categories', { returnObjects: true })).map(([key, value]) => (
                                    <div key={key} className="space-y-2">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{value.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{value.skills}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('resume.softSkills.title')}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {t('resume.softSkills.items', { returnObjects: true }).map((skill, index) => (
                                    <div key={index} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 rounded-lg">
                                        <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="text-center mt-8">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            {expanded ? (
                                <>
                                    {t('resume.buttons.showLess')} <ChevronUp className="ml-2 w-5 h-5" />
                                </>
                            ) : (
                                <>
                                    {t('resume.buttons.showMore')} <ChevronDown className="ml-2 w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center mt-16">
                        <a
                            href="./Jeferson_resume.pdf"
                            download
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            {t('resume.buttons.downloadCV')}
                        </a>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            {t('resume.downloadDescription')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;