import React from "react";

/**
 * Componente reutilizável para fundos de seção
 * @param {Object} props - Propriedades do componente
 * @param {string} props.type - Tipo de fundo ('wave', 'plain', 'grid')
 * @param {string} props.color - Cor base para o fundo ('blue', 'purple', 'green')
 * @param {boolean} props.bubbles - Se deve mostrar as bolhas de fundo
 * @param {boolean} props.wave - Se deve mostrar a onda na parte inferior
 * @param {boolean} props.grid - Se deve mostrar o padrão de grid
 */
const SectionBackground = ({
    type = 'wave',
    color = 'blue',
    bubbles = true,
    wave = true,
    grid = true,
    className = ""
}) => {
    // Mapear cores para suas classes CSS
    const colorMap = {
        blue: {
            bubble1: "bg-blue-100 dark:bg-blue-900/20",
            bubble2: "bg-purple-100 dark:bg-purple-900/20",
            bubble3: "bg-blue-100/80 dark:bg-blue-900/20",
            wave: "from-blue-50/50 dark:from-blue-900/10",
            fill: "fill-blue-100/30 dark:fill-blue-900/20"
        },
        purple: {
            bubble1: "bg-purple-100 dark:bg-purple-900/20",
            bubble2: "bg-blue-100 dark:bg-blue-900/20",
            bubble3: "bg-purple-100/80 dark:bg-purple-900/20",
            wave: "from-purple-50/50 dark:from-purple-900/10",
            fill: "fill-purple-100/30 dark:fill-purple-900/20"
        },
        green: {
            bubble1: "bg-green-100 dark:bg-green-900/20",
            bubble2: "bg-blue-100 dark:bg-blue-900/20",
            bubble3: "bg-green-100/80 dark:bg-green-900/20",
            wave: "from-green-50/50 dark:from-green-900/10",
            fill: "fill-green-100/30 dark:fill-green-900/20"
        }
    };

    const colors = colorMap[color] || colorMap.blue;

    return (
        <div aria-hidden="true" className={`absolute -z-10 inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
            {/* Círculos com blur para efeito visual */}
            {bubbles && (
                <>
                    <div className={`absolute -top-40 -right-40 w-80 h-80 ${colors.bubble1} rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000`} />
                    <div className={`absolute top-20 left-1/4 w-64 h-64 ${colors.bubble2} rounded-full blur-3xl opacity-40 animate-blob animation-delay-4000`} />
                    <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${colors.bubble3} rounded-full blur-3xl opacity-50 animate-blob animation-delay-1000`} />
                </>
            )}

            {/* Padrão de grid */}
            {grid && (
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.03]" />
            )}

            {/* Onda na parte inferior */}
            {wave && (
                <>
                    <div className={`absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t ${colors.wave} to-transparent`} />
                    <svg className={`absolute bottom-0 ${colors.fill}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </>
            )}
        </div>
    );
};

export default SectionBackground;
