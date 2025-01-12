import React from "react";
import "../styles/Contact.css";

function Contact() {
    return (
        <section id="contact" class="section contact">
        <div class="container">
        <h2 class="section__title">Contato</h2>
        <div class="contact__container grid">
            <div class="contact__info">

            <div class="contact__card">
                <span class="iconify contact__icon" data-icon="line-md:phone-call-loop" aria-hidden="true"></span>
                <h3 class="contact__card-title">Me ligue para iniciar seu projeto!</h3>
                <a href="https://wa.me/qr/KW2XXA46XAXNH1" target="_blank" class="contact__card-link">+55 71 9 8439-3235</a>
            </div>

            <div class="contact__card">
                <span class="iconify contact__icon" data-icon="line-md:email-check-filled" aria-hidden="true"></span>
                <h3 class="contact__card-title">Envie um email para me contar sobre sua ideia!</h3>
                <a href="mailto:jefersonreisalmeida8356@gmail.com" target="_blank" class="contact__card-link">jefersonreisalmeida8356@gmail.com</a>
            </div>
            </div>
        </div>
        </div>
        </section>
    );
}

export default Contact;