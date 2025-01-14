import React from "react";
import { Globe, Palette, FileText, Box, Laptop, Video } from "lucide-react";

const Services = () => {
    const services = [
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Desenvolvimento Web Imersivo",
            description: "Crio experiências web únicas! Landing Pages que convertem, Sites Institucionais que contam sua história, E-commerces dinâmicos e Blogs envolventes. Design personalizado, responsividade e SEO para o topo das buscas!"
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: "Design & Identidade Visual Memorável",
            description: "Desenvolvo logotipos marcantes e identidades visuais completas. Crio artes para redes sociais, banners, flyers e outros materiais publicitários que fortalecem sua marca e conectam você com seus clientes."
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Documentação Profissional Impecável",
            description: "Transformo suas ideias em documentos profissionais e impactantes. Apresentações que impressionam, documentos empresariais claros, planilhas avançadas, currículos que destacam talentos e trabalhos acadêmicos com formatação ABNT impecável."
        },
        {
            icon: <Box className="w-8 h-8" />,
            title: "Modelagem 3D & Visualização Imersiva",
            description: "Dou vida aos seus projetos com modelagem 3D de alta qualidade! Modelos e ambientes 3D detalhados, renderizações fotorrealistas, animações e assets otimizados para AR/VR. Projetos prontos para impressão 3D e visualização profissional."
        },
        {
            icon: <Laptop className="w-8 h-8" />,
            title: "Suporte Técnico Eficiente",
            description: "Suporte técnico completo para seus equipamentos: formatação, otimização, limpeza, recuperação de dados e manutenção preventiva. Atendimento remoto ou presencial, com agilidade e profissionalismo."
        },
        {
            icon: <Video className="w-8 h-8" />,
            title: "Edição e Motion Graphics Profissional",
            description: "Vídeos dinâmicos e envolventes! Corte, montagem, correção de cor, efeitos, legendagem, motion graphics e animações (com After Effects). Uso Premiere Pro, After Effects, Filmora e outras ferramentas top. Perfeito para YouTube, redes sociais, vídeos institucionais, eventos, vinhetas, animações de logo!"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Meus Serviços
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Soluções profissionais personalizadas para dar vida às suas ideias!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <article key={index} className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Content with 1px border offset */}
                            <div className="relative m-[1px] bg-white dark:bg-gray-800 rounded-[11px] p-6 h-full">
                                <div className="mb-6 p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 w-fit transition-transform duration-300 group-hover:scale-110">
                                    <div className="text-blue-600 dark:text-blue-400">
                                        {service.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300">
                                    {service.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="./Orçamento_de_Serviços.pdf"
                        download
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Baixe o Catálogo Completo de Serviços
                    </a>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        Descubra todos os detalhes e valores em meu catálogo!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Services;