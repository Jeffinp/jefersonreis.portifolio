import React from 'react'

interface GlobalBackgroundProps {
  className?: string
}

/**
 * Background global que aplica gradiente contínuo do topo ao rodapé
 * Design fluido seguindo as melhores práticas de UX/UI 2025
 */
const GlobalBackground: React.FC<GlobalBackgroundProps> = ({
  className = '',
}) => {
  return (
    <div className={`fixed inset-0 -z-50 overflow-hidden ${className}`}>
      {/* Gradiente principal contínuo - azul no topo, rosado no rodapé */}
      {/* Light mode */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background: `linear-gradient(to bottom, 
            rgb(239 246 255 / 0.6), 
            rgb(238 242 255 / 0.5), 
            rgb(196 181 253 / 0.4), 
            rgb(251 207 232 / 0.5), 
            rgb(254 242 242 / 0.6)
          )`,
        }}
      ></div>

      {/* Dark mode */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `linear-gradient(to bottom, 
            rgb(23 37 84 / 0.4), 
            rgb(30 27 75 / 0.3), 
            rgb(59 7 100 / 0.25), 
            rgb(80 7 36 / 0.3), 
            rgb(76 5 25 / 0.4)
          )`,
        }}
      ></div>

      {/* Overlay sutil para suavizar transições */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10 dark:from-slate-900/30 dark:via-transparent dark:to-slate-900/20"></div>

      {/* Padrão quadriculado sutil */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 0',
        }}
      />

      {/* Elementos decorativos flutuantes sutis */}
      <div className="pointer-events-none absolute inset-0">
        {/* Topo - tons azuis */}
        <div
          className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full opacity-[0.03] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          }}
        />

        {/* Centro-esquerda - tons índigo */}
        <div
          className="absolute top-1/3 left-0 h-[500px] w-[500px] rounded-full opacity-[0.025] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          }}
        />

        {/* Centro-direita - tons púrpura */}
        <div
          className="absolute top-1/2 right-1/4 h-[700px] w-[700px] rounded-full opacity-[0.02] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          }}
        />

        {/* Parte inferior - tons rosa */}
        <div
          className="absolute right-1/3 bottom-0 h-[600px] w-[600px] rounded-full opacity-[0.03] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
          }}
        />

        {/* Rodapé - tons rosa mais fortes */}
        <div
          className="absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full opacity-[0.025] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Pontos decorativos minimalistas distribuídos */}
      <div className="pointer-events-none absolute inset-0">
        {/* Topo */}
        <div className="absolute top-[10%] left-[15%] h-1 w-1 rounded-full bg-blue-400/20 dark:bg-blue-400/10"></div>
        <div className="absolute top-[15%] right-[20%] h-0.5 w-0.5 rounded-full bg-indigo-400/25 dark:bg-indigo-400/15"></div>

        {/* Centro */}
        <div className="absolute top-[45%] left-[10%] h-0.5 w-0.5 rounded-full bg-purple-400/20 dark:bg-purple-400/10"></div>
        <div className="absolute top-[55%] right-[15%] h-1 w-1 rounded-full bg-purple-400/25 dark:bg-purple-400/15"></div>

        {/* Inferior */}
        <div className="absolute bottom-[20%] left-[25%] h-0.5 w-0.5 rounded-full bg-pink-400/25 dark:bg-pink-400/15"></div>
        <div className="absolute right-[30%] bottom-[10%] h-1 w-1 rounded-full bg-rose-400/20 dark:bg-rose-400/10"></div>
      </div>

      {/* Linhas de horizonte sutis para criar profundidade */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent dark:via-blue-700/20"></div>
        <div className="absolute top-1/2 right-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-200/15 to-transparent dark:via-purple-700/15"></div>
        <div className="absolute right-0 bottom-1/4 left-0 h-px bg-gradient-to-r from-transparent via-pink-200/20 to-transparent dark:via-pink-700/20"></div>
      </div>
    </div>
  )
}

export default GlobalBackground
