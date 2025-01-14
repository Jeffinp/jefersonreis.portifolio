import React from "react";
import { User, Palette } from "lucide-react";

const SobreMim = () => {
    return (
        <section id="about" className="relative py-20 bg-white dark:bg-slate-900">
            {/* Linha azul clara no topo */}
            <div className="absolute inset-x-0 top-0 h-1 bg-blue-400 dark:bg-blue-500" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                        Sobre Mim
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Olá, sou Jeferson Reis, um apaixonado por tecnologia, design e programação. Ao longo dos anos, desenvolvi habilidades como desenvolvedor full-stack, designer gráfico e técnico em informática. Estou sempre em busca de novos desafios para criar soluções inovadoras e personalizadas, combinando tecnologia e criatividade.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group p-8 bg-white dark:bg-slate-900 rounded-xl border border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300">
                        <div className="relative flex flex-col items-center">
                            <div className="mb-6 p-4 rounded-full bg-blue-400 dark:bg-blue-500 text-white group-hover:text-blue-300 dark:group-hover:text-blue-400 transition-colors duration-300">
                                <User className="w-8 h-8 md:w-12 md:h-12" />
                            </div>
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Jeferson Reis</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                                Sou um desenvolvedor full-stack com experiência em criação de soluções web inovadoras. Tenho um forte conhecimento em React e Node.js, focando sempre na performance e na experiência do usuário (UX/UI).
                            </p>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>

                    <div className="relative group p-8 bg-white dark:bg-slate-900 rounded-xl border border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600 transition-all duration-300">
                        <div className="relative flex flex-col items-center">
                            <div className="mb-6 p-4 rounded-full bg-green-400 dark:bg-green-500 text-white group-hover:text-green-300 dark:group-hover:text-green-400 transition-colors duration-300">
                                <Palette className="w-8 h-8 md:w-12 md:h-12" />
                            </div>
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Design Gráfico</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                                Combinando criatividade e técnicas modernas de design, crio identidades visuais únicas, como logotipos, banners e materiais gráficos, para atender às necessidades de cada cliente.
                            </p>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500 dark:bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SobreMim;
