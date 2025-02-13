// DiscordFloatBtn.js
import React from 'react';
import { FaDiscord } from 'react-icons/fa';

const DiscordFloatBtn = () => {
    const discordLink = "https://discord.com/users/563186981962776577"; // URL do Discord do Footer

    return (
        <a
            href={discordLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Junte-se a mim no Discord"
            aria-label="Discord"
            style={{
                position: 'fixed',
                bottom: '165px',
                right: '20px',
                backgroundColor: '#5865F2', // Cor do Discord
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