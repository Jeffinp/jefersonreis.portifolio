// WhatsAppFloatBtn.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const WhatsAppFloatBtn = () => {
    const { t } = useTranslation();
    const whatsappLink = "https://wa.me/qr/KW2XXA46XAXNH1";

    return (
        <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            title={t("floatButtons.whatsapp")}
            aria-label={t("floatButtons.whatsapp")}
            className="fixed z-50 bottom-16 right-5 p-3 md:p-4 rounded-full 
                     bg-[#25D366] text-white shadow-lg flex items-center justify-center"
            whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
        >
            <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" />
        </motion.a>
    );
};

export default WhatsAppFloatBtn;
