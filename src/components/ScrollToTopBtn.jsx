import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "#007BFF", // Cor de fundo suave
                    color: "#fff", // Cor do ícone
                    border: "none",
                    borderRadius: "50%", // Bordas arredondadas
                    padding: "15px",
                    cursor: "pointer",
                    zIndex: 1000,
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para destacar
                    transition: "all 0.3s ease-in-out", // Transição suave
                }}
                title="Voltar ao Topo"
                aria-label="Voltar ao Topo"
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")} // Efeito de hover
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} // Retorna ao normal
            >
                <FontAwesomeIcon icon={faChevronUp} size="2x" />
            </button>
        )
    );
};

export default ScrollToTopBtn;
