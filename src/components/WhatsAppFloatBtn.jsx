// WhatsAppFloatBtn.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; 

const WhatsAppFloatBtn = () => {
    const { t } = useTranslation(); 
    const whatsappLink = "https://wa.me/qr/KW2XXA46XAXNH1"; 

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            title={t('floatButtons.whatsapp')}
            aria-label={t('floatButtons.whatsapp')}
            style={{
                position: 'fixed',
                bottom: '102px',
                right: '20px',
                backgroundColor: '#25D366',
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
            <FaWhatsapp size={24} color="#fff" />
        </a>
    );
};

export default WhatsAppFloatBtn;