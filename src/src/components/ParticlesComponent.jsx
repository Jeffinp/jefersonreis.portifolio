import React, { useEffect, useRef } from 'react';

function ParticlesComponent() {
    const particlesRef = useRef(null);

    useEffect(() => {
        if (window.particlesJS && particlesRef.current) { // Verifica se particlesJS e o ref existem
            window.particlesJS(particlesRef.current.id, {
                particles: {
                    number: {
                        value: 50,
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                    },
                    // Adicione aqui as outras configurações do particles.js que você precisa
                    color: {
                        value: '#ffffff'
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.5
                    },
                    size: {
                        value: 3
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    },
                },
                interactivity: {
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        }
                    }
                }
            });
        }
    }, []);

    return <div ref={particlesRef} id="particles-js" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>;
}

export default ParticlesComponent;