# Estrutura de Containers

Este diretório está organizado em três categorias principais:

## 📁 portfolio/

Componentes específicos para **empresas e recrutadores** (modo portfolio técnico):

- `Hero.tsx` - Hero section focado em habilidades técnicas e experiência
- `About.tsx` - Sobre mim com foco profissional
- `Skills.tsx` - Grid de habilidades técnicas
- `Timeline.tsx` - Jornada profissional e experiência
- `Contact.tsx` - Formulário de contato profissional

## 📁 commercial/

Componentes específicos para **clientes freelance** (modo comercial):

- `HeroCommercial.tsx` - Hero focado em conversão e vendas
- `AboutCommercial.tsx` - Sobre com foco em resultados
- `ServicesCommercial.tsx` - Serviços com preços e CTAs
- `FAQCommercial.tsx` - Perguntas frequentes para clientes

## 📁 shared/

Componentes usados em **ambos os modos**:

- `Projects.tsx` - Portfolio de projetos
- `Services.tsx` - Serviços gerais
- `Testimonials.tsx` - Depoimentos de clientes
- `HeroAdaptive.tsx` - Hero que se adapta ao target (deprecated)

## 📁 quantum/

Componentes com **efeitos visuais avançados** (modo quantum):

- Versões otimizadas dos componentes principais
- Efeitos de partículas e animações espaciais

## Como funciona o sistema de targets:

1. **Seleção inicial**: Usuário escolhe entre "Empresa/Recrutador" ou "Quero Escalar Meu Negócio"
2. **Query parameter**: Sistema usa `?target=empresa` ou `?target=freelance`
3. **Renderização condicional**: index.tsx renderiza componentes baseado no target
4. **Persistência**: Escolha é salva no localStorage

### Fluxo de decisão:

```
Usuario acessa site
    ↓
Tem target salvo ou na URL?
    ↓ Não
Mostra AudienceSelector
    ↓ Sim
target === 'freelance'?
    ↓ Sim              ↓ Não
Mostra Commercial   Mostra Portfolio
```
