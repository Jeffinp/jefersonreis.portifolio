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
      {/* Light mode - Fundo sólido limpo */}
      <div className="absolute inset-0 bg-white dark:hidden"></div>

      {/* Dark mode - Gradiente elegante */}
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

      {/* Overlay sutil apenas no modo escuro */}
      <div className="absolute inset-0 hidden bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/20 dark:block"></div>

      {/* Padrão quadriculado apenas no modo escuro */}
      <div
        className="absolute inset-0 hidden opacity-[0.025] dark:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 0',
        }}
      />

      {/* Elementos decorativos flutuantes apenas no modo escuro */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
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

      {/* Pontos decorativos apenas no modo escuro */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        {/* Topo */}
        <div className="absolute top-[10%] left-[15%] h-1 w-1 rounded-full bg-blue-400/10"></div>
        <div className="absolute top-[15%] right-[20%] h-0.5 w-0.5 rounded-full bg-indigo-400/15"></div>

        {/* Centro */}
        <div className="absolute top-[45%] left-[10%] h-0.5 w-0.5 rounded-full bg-purple-400/10"></div>
        <div className="absolute top-[55%] right-[15%] h-1 w-1 rounded-full bg-purple-400/15"></div>

        {/* Inferior */}
        <div className="absolute bottom-[20%] left-[25%] h-0.5 w-0.5 rounded-full bg-pink-400/15"></div>
        <div className="absolute right-[30%] bottom-[10%] h-1 w-1 rounded-full bg-rose-400/10"></div>
      </div>

      {/* Linhas de horizonte apenas no modo escuro */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute top-1/4 right-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-700/20 to-transparent"></div>
        <div className="absolute top-1/2 right-0 left-0 h-px bg-gradient-to-r from-transparent via-purple-700/15 to-transparent"></div>
        <div className="absolute right-0 bottom-1/4 left-0 h-px bg-gradient-to-r from-transparent via-pink-700/20 to-transparent"></div>
      </div>
    </div>
  )
}

export default GlobalBackground
