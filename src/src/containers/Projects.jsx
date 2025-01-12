import React from "react";
import "../styles/Projects.css";
import ImageCarousel from "../components/ImageCarousel"; // Atualize o caminho para importar de 'components'

function Projects() {
    return (
        <section id="portfolio" className="projects section" aria-labelledby="projectsTitle">
            <div className="project-container container">
                <h2 id="projectsTitle" className="section__title">Meu Portfólio</h2>
                <div className="filter-container">
                    <button className="filter-button active" data-filter="all">Todos</button>
                    <button className="filter-button" data-filter="web">Web</button>
                    <button className="filter-button" data-filter="design">Design</button>
                    <button className="filter-button" data-filter="motion">Motion</button>
                    <button className="filter-button" data-filter="modelagem">Modelagem 3D</button>
                </div>
                <ImageCarousel />
            </div>
        </section>
    );
}

export default Projects;