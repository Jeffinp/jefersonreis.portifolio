import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Skills = () => {
    const [openSection, setOpenSection] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.1 });

        const skillsSection = document.querySelector('#skills-section');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        return () => {
            if (skillsSection) {
                observer.unobserve(skillsSection);
            }
        };
    }, []);

    const toggleSection = (sectionId) => {
        setOpenSection(prevSection => prevSection === sectionId ? null : sectionId);
    };

    const frontendSkills = [
        { name: 'HTML', percentage: 100 },
        { name: 'CSS', percentage: 100 },
        { name: 'JavaScript', percentage: 100 },
        { name: 'React', percentage: 95 },
        { name: 'Vue.js', percentage: 85 },
        { name: 'Angular', percentage: 90 },
    ];

    const backendSkills = [
        { name: 'PHP', percentage: 85 },
        { name: 'Node.js', percentage: 90 },
        { name: 'Python', percentage: 95 },
    ];

    const toolsSkills = [
        { name: 'MySQL', percentage: 90 },
        { name: 'Bootstrap', percentage: 80 },
        { name: 'UX Design', percentage: 100 },
        { name: 'Figma', percentage: 100 },
        { name: 'Photoshop', percentage: 85 },
        { name: 'Illustrator', percentage: 90 },
        { name: 'CorelDRAW', percentage: 95 },
    ];

    const softSkills = [
        { icon: "👥", title: "Comunicação Eficaz", description: "Comunico ideias de forma clara, concisa e adaptável a diferentes públicos." },
        { icon: "🤝", title: "Colaboração e Trabalho em Equipe", description: "Contribuo ativamente para um ambiente de equipe positivo e produtivo." },
        { icon: "💡", title: "Resolução Criativa de Problemas", description: "Abordo desafios com uma mentalidade analítica e criativa." },
        { icon: "⏱️", title: "Gestão de Tempo", description: "Priorizo tarefas e defino metas realistas com foco em resultados." },
    ];

    const SkillBar = ({ name, percentage, delay }) => (
        <div className="mb-4 transform translate-y-0 opacity-100 transition-all duration-500 ease-in-out"
             style={{ 
                 transitionDelay: `${delay}ms`,
                 transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                 opacity: isVisible ? 1 : 0 
             }}>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                        width: isVisible ? `${percentage}%` : '0%',
                        transitionDelay: `${delay + 200}ms`
                    }}
                />
            </div>
        </div>
    );

    const SkillSection = ({ title, icon, skills, id }) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:shadow-lg transform transition-all duration-500 ease-in-out hover:scale-[1.02]">
            <button
                onClick={() => toggleSection(id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 dark:bg-gradient-to-r dark:from-blue-800 dark:to-blue-900 dark:hover:from-blue-900 dark:hover:to-blue-700"
            >
                <div className="flex items-center gap-4">
                    <span className="text-2xl transform transition-transform duration-300 hover:scale-110">{icon}</span>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mais de 4 anos de experiência</p>
                    </div>
                </div>
                <div className="transform transition-transform duration-300">
                    {openSection === id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                    )}
                </div>
            </button>
            <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openSection === id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-6 py-4">
                    {skills.map((skill, index) => (
                        <SkillBar 
                            key={index} 
                            {...skill} 
                            delay={index * 100}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <section id="skills-section" className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12 transform transition-all duration-500 ease-out"
                    style={{
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        opacity: isVisible ? 1 : 0
                    }}>
                    Minhas Habilidades e Competências
                </h2>

                <div className="grid gap-6 mb-12">
                    <SkillSection
                        title="Desenvolvimento Frontend"
                        icon="🎨"
                        skills={frontendSkills}
                        id="frontend"
                    />
                    <SkillSection
                        title="Desenvolvimento Backend"
                        icon="⚙️"
                        skills={backendSkills}
                        id="backend"
                    />
                    <SkillSection
                        title="Ferramentas & Outras Habilidades"
                        icon="🛠️"
                        skills={toolsSkills}
                        id="tools"
                    />
                </div>

                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
                        Soft Skills
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {softSkills.map((skill, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:text-gray-200 dark:shadow-lg transform hover:scale-105"
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                                    opacity: isVisible ? 1 : 0
                                }}
                            >
                                <span className="text-3xl mb-4 block transform transition-transform duration-300 hover:scale-110">{skill.icon}</span>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    {skill.title}
                                </h4>
                                <p className="text-gray-600 text-sm dark:text-gray-400">
                                    {skill.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;