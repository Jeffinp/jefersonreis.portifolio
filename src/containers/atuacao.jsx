import React from "react";
import { Code2, Palette, Brain, Laptop } from "lucide-react";

const Atuacao = () => {
    const atuacaoItems = [
        {
            title: "Desenvolvedor Full-Stack",
            icon: <Code2 className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Criação de sites, e-commerces, landing pages e sistemas web com foco em performance, segurança e experiência do usuário (UX/UI)."
        },
        {
            title: "Designer Gráfico",
            icon: <Palette className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Desenvolvimento de logotipos, banners, materiais gráficos e identidade visual, unindo criatividade e técnicas modernas de design."
        },
        {
            title: "Desenvolvimento Web",
            icon: <Brain className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Especializado em React e Node.js para criar soluções web inovadoras, sempre priorizando a experiência do usuário (UX) e as melhores práticas de desenvolvimento."
        },
        {
            title: "Suporte Técnico",
            icon: <Laptop className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Manutenção de computadores, otimização de sistemas e consultoria de TI para garantir o bom desempenho das empresas e indivíduos."
        }
    ];

    return (
        <section className="relative py-20 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 dark:opacity-100" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
                        Áreas de Atuação
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
                        Conheça minhas principais áreas de expertise e como posso ajudar seu projeto a decolar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {atuacaoItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative group p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl 
                                     border border-slate-200 dark:border-slate-700 
                                     hover:border-slate-300 dark:hover:border-slate-600 
                                     transition-all duration-300 
                                     hover:shadow-lg dark:hover:shadow-slate-700/50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 
                                          dark:from-blue-500/10 dark:to-purple-500/10 
                                          rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative flex flex-col items-center">
                                <div className="mb-6 p-4 rounded-full 
                                            bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                                            dark:from-blue-500/20 dark:to-purple-500/20 
                                            text-blue-600 dark:text-blue-400 
                                            group-hover:text-blue-500 dark:group-hover:text-blue-300 
                                            transition-colors duration-300">
                                    {item.icon}
                                </div>

                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
                                    {item.title}
                                </h3>

                                <p className="text-slate-600 dark:text-gray-400 text-center leading-relaxed transition-colors duration-300">
                                    {item.description}
                                </p>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-[2px] 
                                        bg-gradient-to-r from-blue-500 to-purple-500 
                                        transform scale-x-0 group-hover:scale-x-100 
                                        transition-transform duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Atuacao;