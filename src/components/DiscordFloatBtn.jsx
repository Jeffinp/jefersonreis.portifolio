import React from "react";
import { FaDiscord } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const DiscordFloatBtn = () => {
    const { t } = useTranslation();
    const discordLink = "https://discord.com/users/563186981962776577";

    return (
        <motion.a
            href={discordLink}
            target="_blank"
            rel="noopener noreferrer"
            title={t("floatButtons.discord")}
            aria-label={t("floatButtons.discord")}
            className="fixed z-50 bottom-32 right-5 p-3 md:p-4 rounded-full 
                     bg-[#5865F2] text-white shadow-lg flex items-center justify-center"
            whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 25px -5px rgba(88, 101, 242, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
        >
            <FaDiscord className="w-5 h-5 md:w-6 md:h-6" />
        </motion.a>
    );
};

export default DiscordFloatBtn;
