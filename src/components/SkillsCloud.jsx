import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SkillCard from "./SkillCard";
import { skills, skillsIcons, skillsColors } from "../data/skills";
import "../styles/skills.css";

const SkillsCloud = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-10 md:py-16 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            {t("skills.title")}
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t("skills.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {Object.keys(skills).map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1"
            >
              <SkillCard
                category={category}
                skills={skills[category]}
                iconName={skillsIcons[category]}
                color={skillsColors[category]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsCloud;
