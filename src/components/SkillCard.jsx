import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';

const SkillCard = ({ category, skills, color, iconName }) => {
    const { t } = useTranslation();
    const [isFlipped, setIsFlipped] = useState(false);
    const Icon = Icons[iconName];

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const getTitle = () => {
        switch (category) {
            case 'frontend': return t('skills.sections.frontend.title');
            case 'backend': return t('skills.sections.backend.title');
            case 'outras': return t('skills.sections.tools.title');
            default: return category;
        }
    };

    return (
        <div
            className="h-[300px] perspective-1000 w-full cursor-pointer group"
            onClick={handleClick}
            role="button"
            aria-pressed={isFlipped}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <motion.div
                className="relative w-full h-full preserve-3d transition-all duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* Front Face */}
                <div className={`absolute w-full h-full backface-hidden rounded-xl p-5 shadow-md border border-gray-100/30 dark:border-gray-700/30 flex flex-col items-center justify-center bg-gradient-to-br ${color} text-white`}>
                    <div className="text-white mb-4 p-3 rounded-full bg-white/10">
                        {Icon && <Icon size={36} className="text-white" />}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-center mb-2">{getTitle()}</h3>
                    <p className="text-xs md:text-sm text-center text-white/90 mb-3">
                        {t('skills.clickToReveal')}
                    </p>
                    <div className="mt-2">
                        <motion.div
                            animate={{ y: [0, 3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="bg-white/15 text-white text-xs py-1 px-2 rounded-full"
                        >
                            {t('skills.clickToFlip')}
                        </motion.div>
                    </div>
                </div>

                {/* Back Face */}
                <div className="absolute w-full h-full backface-hidden rounded-xl p-4 shadow-md border border-gray-100/30 dark:border-gray-700/30 bg-white dark:bg-gray-800 rotateY-180 overflow-y-auto flex flex-col">
                    <h3 className="text-lg md:text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">
                        {getTitle()}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 justify-center items-center flex-1">
                        {skills.map((skill, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                className={`px-2 py-1 text-xs font-medium rounded-md bg-gradient-to-r ${color} text-white shadow-sm hover:shadow-md transition-shadow duration-300`}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                        }}
                        className="mt-3 self-center text-xs py-0.5 px-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {t('skills.flipBack')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default SkillCard; 