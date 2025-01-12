import React from "react";
import "../styles/Certificates.css";

function Certificates() {
    return (
        <section id="certificados" class="certificates">
            <div class="certificates__container">
                <h2 class="section__title">Certificados</h2>
                <div class="certificates__grid">
                    <article class="certificate__item">
                        <figure class="certificate__image-wrapper">
                            <img src="/src/assets/image/Certificado-TRUINFO.webp" alt="Certificado StartWeb - Desenvolvimento Web" class="certificate__image" loading="lazy" width="300" height="200"/>
                        </figure>
                        <div class="certificate__info">
                            <h3 class="certificate__title">StartWeb - Desenvolvimento Web</h3>
                            <p class="certificate__description">Curso intensivo de desenvolvimento web com foco em HTML, CSS e JavaScript. (Triunfo, 2024)</p>
                            <a href="./src/image/Certificado-TRUINFO.webp" class="button button--secondary-certificate" target="_blank" rel="noopener noreferrer">
                                Ver Certificado
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default Certificates;