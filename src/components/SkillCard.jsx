import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
import { skillItemColors } from "../data/skills";

const SkillCard = ({ category, skills, color, iconName }) => {
  const { t } = useTranslation();
  const Icon = Icons[iconName];

  const getTitle = () => {
    switch (category) {
      case "frontend":
        return t("skills.sections.frontend.title");
      case "backend":
        return t("skills.sections.backend.title");
      case "outras":
        return t("skills.sections.tools.title");
      default:
        return category;
    }
  };

  // Função para obter a cor específica da habilidade ou usar a cor padrão da categoria
  const getSkillColor = (skillName) => {
    return skillItemColors[skillName] || color;
  };

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg border border-gray-100/30 dark:border-gray-700/30">
      {/* Header */}
      <div className={`w-full py-4 px-5 bg-gradient-to-r ${color} text-white`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-full">
            {Icon && <Icon size={24} className="text-white" />}
          </div>
          <h3 className="text-xl font-bold">{getTitle()}</h3>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="p-4">
        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="skill-item-card flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50"
            >
              <div className="w-full h-[80px] mb-3 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={skill.imagePath}
                  alt={skill.name}
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/images/skills/placeholder.webp";
                  }}
                />
              </div>{" "}
              <div className="w-full">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getSkillColor(
                    skill.name
                  )} block text-center`}
                >
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
