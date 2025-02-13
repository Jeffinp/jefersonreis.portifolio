// WhatsAppFloatBtn.js
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloatBtn = () => {
    const whatsappLink = "https://wa.me/qr/KW2XXA46XAXNH1"; // URL do WhatsApp do Footer

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Fale conosco no WhatsApp"
            aria-label="WhatsApp"
            style={{
                position: 'fixed',
                bottom: '90px', // Ajustado para ficar acima do ScrollToTopBtn se ambos estiverem no bottom-right
                right: '20px',
                backgroundColor: '#25D366', // Cor do WhatsApp
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
            <MessageCircle size={24} />
        </a>
    );
};

export default WhatsAppFloatBtn;