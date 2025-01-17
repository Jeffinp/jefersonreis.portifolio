import React, { useEffect } from "react";
import { ArrowRight, Mail } from "lucide-react";

const Hero = () => {
    useEffect(() => {
        try {
            window.particlesJS("particles-js", {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: {
                        value: 0.5,
                        random: false,
                        animation: { enable: true, speed: 1, opacity_min: 0.1 }
                    },
                    size: {
                        value: 3,
                        random: true,
                        animation: { enable: true, speed: 2, size_min: 0.1 }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        repulse: { distance: 100, duration: 0.4 },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        } catch (error) {
            console.error("Erro ao inicializar o particles.js:", error);
        }
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Imagem de fundo com opacidade */}
            <div className="absolute inset-0 bg-[url('assets/images/nebula-space-blue-12k-2v.webp')] bg-cover bg-center bg-no-repeat opacity-50" />


            {/* Sobreposição de partículas com gradiente mais suave */}
            <div id="particles-js" className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Imagem de perfil */}
                    <div className="relative">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                            <img
                                src="assets/images/Linkedin-foto.webp"
                                alt="Jeferson Reis Almeida"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Efeito de gradiente e blur ao redor da imagem de perfil */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    </div>

                    {/* Conteúdo do perfil */}
                    <div className="text-center md:text-left md:flex-1 max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                            Jeferson Reis Almeida
                        </h1>

                        {/* Descrição breve sobre a pessoa */}
                        <p className="text-lg md:text-xl text-gray-200 mb-8">
                            Desenvolvedor Full-Stack | Designer Gráfico | Técnico em Informática |{" "}
                            <span className="font-semibold">Transformando Ideias em Realidade</span> ✨
                        </p>

                        {/* Botões para acessar o portfólio e entrar em contato */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a
                                href="#portfolio"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Ver Meus Projetos
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </a>

                            <a
                                href="#contact"
                                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 backdrop-blur-sm"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Entrar em Contato
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );


};

export default Hero;