# Portfolio Profissional - Jeferson Reis

Portfolio moderno e escalável desenvolvido com **Next.js 15 (App Router)**, **TypeScript strict** e **Tailwind CSS 4**.

## 🚀 Tecnologias Principais

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router e Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Strict mode completo para máxima type-safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internacionalização (PT/EN)
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Sistema de temas
- **[Framer Motion](https://www.framer.com/motion/)** - Animações
- **[Lucide React](https://lucide.dev/)** - Ícones

## 📦 Comandos

```bash
npm install     # Instalar dependências
npm run dev     # Desenvolvimento (http://localhost:3000)
npm run build   # Build de produção
npm start       # Executar build
npm run lint    # Verificar código
```

## 🏗️ Estrutura

```
src/
├── app/[locale]/        # Rotas App Router
│   ├── empresa/        # Modo Portfolio
│   └── freelance/      # Modo Comercial
├── components/         # Componentes React
├── hooks/             # Custom Hooks
├── lib/               # Utils e configurações
├── types/             # TypeScript types
├── data/locales/      # Traduções PT/EN
└── styles/            # CSS global
```

## ✨ Funcionalidades

✅ **i18n** - PT/EN automático  
✅ **Tema** - Light/Dark/System  
✅ **Dual-Mode** - Empresa / Freelance  
✅ **TypeScript Strict** - Type-safety máxima  
✅ **SSG** - Todas rotas pré-renderizadas

## 🌍 Rotas

| URL             | Descrição         |
| --------------- | ----------------- |
| `/pt`           | Home PT           |
| `/en`           | Home EN           |
| `/pt/empresa`   | Portfolio técnico |
| `/pt/freelance` | Landing comercial |

## 🛠️ Próximos Passos

1. Adicionar componentes de seção (Hero, Projects, Skills)
2. Popular dados (projetos, skills, depoimentos)
3. Instalar shadcn/ui components
4. Expandir traduções
5. Adicionar SEO & Analytics

## 📖 Docs

- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [next-intl](https://next-intl-docs.vercel.app/)

---

**Build Status:** ✅ Funcionando  
**Deploy:** Pronto para Vercel
