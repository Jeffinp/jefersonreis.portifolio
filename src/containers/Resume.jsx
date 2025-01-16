import React, { useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

const Resume = () => {
    const [expanded, setExpanded] = useState(false);

    const Card = ({ children, className = "" }) => (
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
            {children}
        </div>
    );

    return (
        <section id="resume" className="relative py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Meu Currículo
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Experiência e habilidades que fazem a diferença
                    </p>
                </div>

                <div className="space-y-8">
                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Destaques</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                "Desenvolvedor Full-Stack com +4 anos de experiência",
                                "Especialista em React e Node.js",
                                "Designer Gráfico",
                                "Experiência em Informática",
                                "Conhecimentos em Administração"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 rounded-lg">
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Experiência Profissional</h3>
                        <div className="space-y-6">
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Desenvolvedor Web Freelancer</h4>
                                <p className="text-gray-500 dark:text-gray-400">2024 – Atual</p>
                                <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                                    <li>Criação de websites intuitivos e responsivos para empresas e microempreendedores.</li>
                                    <li>Desenvolvimento de plataforma de cursos online, aumentando as vendas em 90% com design focado na conversão e experiência do usuário.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <div className={`space-y-8 transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Habilidades Técnicas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Linguagens de Programação</h4>
                                    <p className="text-gray-600 dark:text-gray-300">JavaScript, PHP, C#, React, Node.js, Python, SQL</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Ferramentas de Design</h4>
                                    <p className="text-gray-600 dark:text-gray-300">Adobe Photoshop, Illustrator, Premiere, After Effects</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Desenvolvimento Web</h4>
                                    <p className="text-gray-600 dark:text-gray-300">HTML, CSS, WordPress, Bootstrap, Tailwind CSS</p>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Soft Skills</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {[
                                    "Trabalho em equipe",
                                    "Resolução de problemas",
                                    "Comunicação eficaz",
                                    "Criatividade",
                                    "Proatividade",
                                    "Adaptabilidade",
                                    "Gestão de tempo"
                                ].map((skill, index) => (
                                    <div key={index} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 rounded-lg">
                                        <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="text-center mt-8">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            {expanded ? (
                                <>
                                    Ver Menos <ChevronUp className="ml-2 w-5 h-5" />
                                </>
                            ) : (
                                <>
                                    Ver Mais <ChevronDown className="ml-2 w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center mt-16">
                        <a
                            href="./Jeferson_currículo.pdf"
                            download
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Baixar CV Completo
                        </a>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Para mais detalhes, baixe meu currículo completo
                        </p>
                    </div>
                </div>
            </div>div
        </section>
    );
};

export default Resume;