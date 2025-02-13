// DiscordFloatBtn.js (modificado)
import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; 

const DiscordFloatBtn = () => {
    const { t } = useTranslation();
    const discordLink = "https://discord.com/users/563186981962776577";

    return (
        <a
            href={discordLink}
            target="_blank"
            rel="noopener noreferrer"
            title={t('floatButtons.discord')}
            aria-label={t('floatButtons.discord')}
            style={{
                position: 'fixed',
                bottom: '165px',
                right: '20px',
                backgroundColor: '#5865F2',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                padding: '15px',
                cursor: 'pointer',
                zIndex: 1000,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease-in-out',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
            <FaDiscord size={24} color="#fff" />
        </a>
    );
};

export default DiscordFloatBtn;