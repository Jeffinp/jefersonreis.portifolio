import React, { useState, useRef, useEffect } from 'react';
import '../styles/Skills.css'; // Importe o CSS

function Skills() {
    const [openSection, setOpenSection] = useState(null);
    const progressBars = useRef({});

    const toggleSection = (sectionId) => {
        setOpenSection(prevSection => prevSection === sectionId ? null : sectionId);
    };

    useEffect(() => {
        Object.keys(progressBars.current).forEach(sectionId => {
            progressBars.current[sectionId]?.forEach(bar => { // Optional chaining aqui também
                const percentage = parseInt(bar.dataset.percentage, 10);
                bar.style.width = openSection === sectionId ? `${percentage}%` : '0%';
            });
        });
    }, [openSection]);

    const renderSkillsContent = (title, icon, skills, id) => (
        <div className={`skills__content ${openSection === id ? 'skills__open' : ''}`} key={id}>
            <div className="skills__header" onClick={() => toggleSection(id)}>
                <div className="skill__icon-wrapper">
                    <span className="iconify skill__icon" data-icon={icon}></span>
                </div>
                <div className="skill__info">
                    <h3 className="skill__category">{title}</h3>
                    <span className="skill__experience">Mais de 4 anos de experiência</span>
                </div>
                <button className="skills__arrow" aria-label="Abrir/Fechar lista de habilidades" aria-expanded={openSection === id} aria-controls={`skills-list-${id}`}>
                    <span className="iconify" data-icon="uil:angle-down"></span>
                </button>
            </div>
            <div className="skills__list" id={`skills-list-${id}`}>
                {skills.map((skill, index) => (
                    <div className="skill__item" key={index}>
                        <div className="skill__name-wrapper">
                            <span className="skill__name">{skill.name}</span>
                        </div>
                        <div className="skill__bar">
                            <div
                                className="skill__progress"
                                data-percentage={skill.percentage}
                                ref={el => {
                                    if (!progressBars.current[id]) {
                                        progressBars.current[id] = [];
                                    }
                                    progressBars.current[id][index] = el;
                                }}
                                style={{ width: '0%' }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const softSkills = [
        { icon: "pepicons-print:people", title: "Comunicação Eficaz", description: "Comunico ideias de forma clara, concisa e adaptável a diferentes públicos, garantindo o entendimento e a colaboração." },
        { icon: "la:people-carry", title: "Colaboração e Trabalho em Equipe", description: "Contribuo ativamente para um ambiente de equipe positivo e produtivo, buscando soluções em conjunto e valorizando a troca de ideias." },
        { icon: "hugeicons:idea-01", title: "Resolução Criativa de Problemas", description: "Abordo desafios com uma mentalidade analítica e criativa, buscando soluções inovadoras e eficazes, mesmo em situações complexas." },
        { icon: "ic:outline-person", title: "Autogerenciamento e Proatividade", description: "Organizo meu tempo e minhas tarefas de forma eficiente, assumindo responsabilidades e buscando sempre entregar resultados de alta qualidade, com iniciativa e autonomia." },
        { icon: "ic:outline-access-time", title: "Gestão de Tempo e Prazos", description: "Priorizo tarefas, defino metas realistas e gerencio meu tempo com foco em entregar projetos dentro dos prazos estabelecidos, mantendo a qualidade e a organização." },
        { icon: "arcticons:my-brain", title: "Pensamento Crítico e Analítico", description: "Analiso informações de forma objetiva, identificando pontos fortes e fracos, e tomo decisões embasadas em dados e evidências." },
        { icon: "streamline:collaborations-idea", title: "Criatividade e Inovação", description: "Busco constantemente novas ideias e soluções criativas, pensando 'fora da caixa' para entregar projetos originais e que agreguem valor." }
    ];

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

    return (
        <section id="skills" className="section skills" aria-label="Minhas Habilidades">
            <div className="container skills__container">
                <h2 className="skills__title section__title">Minhas Habilidades e Competências</h2>
                <div className="skills__grid">
                    {renderSkillsContent("Desenvolvimento Frontend", "devicon-plain:html5-wordmark", frontendSkills, "frontend")}
                    {renderSkillsContent("Desenvolvimento Backend", "solar:server-path-outline", backendSkills, "backend")}
                    {renderSkillsContent("Ferramentas & Outras Habilidades", "ic:outline-design-services", toolsSkills, "tools")}
                </div>
                <div className="soft-skills__content">
                    <h3 className="skills__title">Soft-Skills <span className="iconify" data-icon="noto-v1:yin-yang" data-width="32"></span></h3>
                    <ul className="soft-skills__list grid">
                        {softSkills.map((skill, index) => (
                            <li className="soft-skill__item" key={index}>
                                <span className="iconify soft-skill__icon" data-icon={skill.icon} aria-hidden="true"></span>
                                <div className="soft-skill__content">
                                    <h4 className="soft-skill__title"><strong>{skill.title}</strong></h4>
                                    <p className="soft-skill__description">{skill.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Skills;