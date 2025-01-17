import React from "react";
import { Code2, Palette, Brain, Laptop, FileText, Box, Camera, Cpu } from "lucide-react";

const Atuacao = () => {
    const atuacaoItems = [
        {
            title: "Desenvolvimento Web Imersivo",
            icon: <Code2 className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Criação de Landing Pages, Sites Institucionais e E-commerces otimizados para SEO, com foco em responsividade e conversão."
        },
        {
            title: "Design & Identidade Visual",
            icon: <Palette className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Desenvolvimento de logotipos, identidades visuais, manipulação de imagens e materiais gráficos para fortalecer a sua marca."
        },
        {
            title: "Documentação Profissional",
            icon: <FileText className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Criação de apresentações, propostas, planilhas, currículos, relatórios e documentos de controle financeiro, com formatação impecável."
        },
        {
            title: "Modelagem 3D & Visualização",
            icon: <Box className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Modelagem 3D, animações, renderizações fotorrealistas e assets para AR/VR e impressão 3D."
        },
        {
            title: "Suporte Técnico",
            icon: <Cpu className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Manutenção de sistemas, recuperação de dados e otimização de dispositivos com atendimento remoto ou presencial."
        },
        {
            title: "Edição e Motion Graphics",
            icon: <Camera className="w-8 h-8 md:w-12 md:h-12" />,
            description: "Edição de vídeos e animações profissionais com After Effects, Premiere Pro e Filmora para YouTube, redes sociais e outros formatos."
        }
    ];
    
    

    return (
        <section id="atuacao"className="relative py-20 bg-white dark:bg-slate-900">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:opacity-20 opacity-5" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Áreas de Atuação
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Conheça minhas principais áreas de expertise e como posso ajudar seu projeto a decolar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {atuacaoItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative m-[1px] bg-white dark:bg-gray-800 rounded-[11px] p-8 h-full">
                                <div className="flex flex-col items-center">
                                    <div className="mb-6 p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                                                transition-transform duration-300 group-hover:scale-110">
                                        <div className="text-blue-600 dark:text-blue-400">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Atuacao;