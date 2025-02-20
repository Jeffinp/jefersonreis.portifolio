// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    // IDIOMAS EM PORTUGUÊS
    pt: {
        translation: {
            menu: {
                home: "Início",
                about: "Sobre",
                areas: "Áreas de Atuação",
                skills: "Habilidades",
                portfolio: "Portfólio",
                resume: "Currículo",
                contact: "Contato",
            },
            hero: {
                title: "Jeferson Reis Almeida",
                subtitle:
                    "Desenvolvedor Full-Stack | Designer Gráfico | Técnico em Informática | ",
                transforming: "Transformando Ideias em Realidade",
                profileAlt: "Foto de Jeferson Reis, desenvolvedor web full-stack",
                buttons: {
                    viewProjects: "Ver Meus Projetos",
                    contact: "Entrar em Contato",
                },
            },
            about: {
                title: "Sobre Mim",
                intro:
                    "Olá, sou Jeferson Reis, um apaixonado por tecnologia, design e programação. Ao longo dos anos, desenvolvi habilidades como desenvolvedor full-stack, designer gráfico e técnico em informática. Estou sempre em busca de novos desafios para criar soluções inovadoras e personalizadas, combinando tecnologia e criatividade.",
                name: "Jeferson Reis",
                devDescription:
                    "Sou um desenvolvedor full-stack com experiência em criação de soluções web inovadoras. Tenho um forte conhecimento em React e Node.js, focando sempre na performance e na experiência do usuário (UX/UI).",
                designTitle: "Design Gráfico",
                designDescription:
                    "Combinando criatividade e técnicas modernas de design, crio identidades visuais únicas, como logotipos, banners e materiais gráficos, para atender às necessidades de cada cliente.",
                learnMore: "Veja mais"

            },
            expertise: {
                title: "Áreas de Atuação",
                subtitle:
                    "Conheça minhas principais áreas de expertise e como posso ajudar seu projeto a decolar.",
                learnMore: "Saiba mais",
                items: {
                    item0: {
                        title: "Desenvolvimento Web Imersivo",
                        description:
                            "Criação de Landing Pages, Sites Institucionais e E-commerces otimizados para SEO, com foco em responsividade e conversão.",
                    },
                    item1: {
                        title: "Design & Identidade Visual",
                        description:
                            "Desenvolvimento de logotipos, identidades visuais, manipulação de imagens e materiais gráficos para fortalecer a sua marca.",
                    },
                    item2: {
                        title: "Documentação Profissional",
                        description:
                            "Criação de apresentações, propostas, planilhas, currículos, relatórios e documentos de controle financeiro, com formatação impecável.",
                    },
                    item3: {
                        title: "Modelagem 3D & Visualização",
                        description:
                            "Modelagem 3D, animações, renderizações fotorrealistas e assets para AR/VR e impressão 3D.",
                    },
                    item4: {
                        title: "Suporte Técnico",
                        description:
                            "Manutenção de sistemas, recuperação de dados e otimização de dispositivos com atendimento remoto ou presencial.",
                    },
                    item5: {
                        title: "Edição e Motion Graphics",
                        description:
                            "Edição de vídeos e animações profissionais com After Effects, Premiere Pro e Filmora para YouTube, redes sociais e outros formatos.",
                    },
                },
            },
            services: {
                title: "Meus Serviços",
                subtitle:
                    "Soluções profissionais personalizadas para dar vida às suas ideias!",
                items: {
                    web: {
                        title: "Desenvolvimento Web Imersivo",
                        description:
                            "Crio experiências web únicas! Landing Pages que convertem, Sites Institucionais que contam sua história, E-commerces dinâmicos e Blogs envolventes. Design personalizado, responsividade e SEO para o topo das buscas!",
                    },
                    design: {
                        title: "Design & Identidade Visual Memorável",
                        description:
                            "Desenvolvo logotipos marcantes e identidades visuais completas. Crio artes para redes sociais, banners, flyers e outros materiais publicitários que fortalecem sua marca e conectam você com seus clientes.",
                    },
                    documentation: {
                        title: "Documentação Profissional Impecável",
                        description:
                            "Transformo suas ideias em documentos profissionais e impactantes. Apresentações que impressionam, documentos empresariais claros, planilhas avançadas, currículos que destacam talentos e trabalhos acadêmicos com formatação ABNT impecável.",
                    },
                    modeling: {
                        title: "Modelagem 3D & Visualização Imersiva",
                        description:
                            "Dou vida aos seus projetos com modelagem 3D de alta qualidade! Modelos e ambientes 3D detalhados, renderizações fotorrealistas, animações e assets otimizados para AR/VR. Projetos prontos para impressão 3D e visualização profissional.",
                    },
                    support: {
                        title: "Suporte Técnico Eficiente",
                        description:
                            "Suporte técnico completo para seus equipamentos: formatação, otimização, limpeza, recuperação de dados e manutenção preventiva. Atendimento remoto ou presencial, com agilidade e profissionalismo.",
                    },
                    video: {
                        title: "Edição e Motion Graphics Profissional",
                        description:
                            "Vídeos dinâmicos e envolventes! Corte, montagem, correção de cor, efeitos, legendagem, motion graphics e animações (com After Effects). Uso Premiere Pro, After Effects, Filmora e outras ferramentas top. Perfeito para YouTube, redes sociais, vídeos institucionais, eventos, vinhetas, animações de logo!",
                    },
                },
                downloadButton: "Baixe o Catálogo Completo de Serviços",
                downloadDescription:
                    "Descubra todos os detalhes e valores em meu catálogo!",
            },
            portfolio: {
                title: "Meu Portfólio",
                subtitle: "Projetos e trabalhos que demonstram minhas habilidades",
                categories: {
                    all: "Todos",
                    web: "Web",
                    design: "Design",
                    motion: "Motion",
                    modelagem: "Modelagem 3D",
                },
                projectLabels: {
                    contracted: "Contratado",
                    viewProject: "Ver Projeto",
                    prevProject: "Projeto anterior",
                    nextProject: "Próximo projeto",
                    viewHighRes: "Ver em Qualidade Máxima! Em até 4K!",
                },
                projects: {
                    flyserv: {
                        title: "FlyServ Drones",
                        description:
                            "Desenvolvi o front-end e back-end do site FlyServ Drones, criando a estrutura, mecânica e experiência do usuário para garantir um desempenho otimizado e uma navegação intuitiva.",
                    },
                    onlineDrawingCourse: {
                        title: "Curso de Desenho Online",
                        description:
                            "Site desenvolvido para um professor de desenho, utilizando HTML, CSS e JavaScript. Foco em experiência de usuário intuitiva e design responsivo.",
                    },
                    weightLossProgram: {
                        title: "Seca e Define - Programa de Emagrecimento",
                        description:
                            "Site criado para divulgar um programa de emagrecimento online. Design moderno e intuitivo, com foco em depoimentos e informações relevantes para impulsionar as vendas.",
                    },
                    fileManager: {
                        title: "Gerenciador de Arquivos Automatizado",
                        description:
                            "O Organizador de Arquivos é um aplicativo de desktop, desenvolvido por mim, que utiliza Python e Electron para facilitar a organização de arquivos baseados em suas extensões.",
                    },
                    pythonChatbot: {
                        title: "Python Chatbot",
                        description:
                            "Chatbot em Python que auxilia no aprendizado da linguagem. Utiliza o modelo rufimelo/bert-large-portuguese-cased-sts para entender perguntas e fornecer respostas detalhadas.",
                    },
                    platformGame: {
                        title: "Jogo de Plataforma Online",
                        description:
                            "Versão melhorada de um projeto do GitHub de Guilherme Silveira. Desenvolvido com HTML, CSS e JavaScript, com foco em UX/UI e responsividade.",
                    },
                    interactiveMenu: {
                        title: "Menu Interativo",
                        description:
                            "Projeto com várias funcionalidades interativas em HTML, CSS e JavaScript. Inclui jogos e ferramentas úteis.",
                    },
                    christmasGift: {
                        title: "Presente de Natal Digital",
                        description:
                            "Site criado com HTML, CSS e JavaScript para envio de presentes virtuais. Interface simples e amigável.",
                    },
                    justlyTraining: {
                        title: "Justly - Treinamento Front-End",
                        description:
                            "Projeto desenvolvido com HTML e CSS para aprimorar habilidades em desenvolvimento front-end.",
                    },
                    personalPortfolio: {
                        title: "Meu Portfólio Pessoal",
                        description:
                            "Meu espaço online para apresentar projetos, habilidades e tecnologias. Desenvolvido com foco em responsividade e performance.",
                    },
                    bookmarkManager: {
                        title: "Bookmark Project - Gerenciador de Favoritos",
                        description:
                            "Gerenciador de favoritos simples e prático, criado com HTML, CSS e JavaScript.",
                    },
                    acsendoflex: {
                        title: "Acsendoflex - Software de Avaliação",
                        description:
                            "Site para promover um software de avaliação de desempenho. Design limpo e profissional.",
                    },
                    zomatoLanding: {
                        title: "Landing Page Zomato (Reimaginação)",
                        description:
                            "Recriação da landing page do Zomato com HTML, CSS e JavaScript. Versão responsiva com design atrativo.",
                    },
                    terrorDuo: {
                        title: "A Dupla do Terror",
                        description:
                            "Conheça Bryan e seu 'Parasita' em um desenho digital cheio de detalhes!",
                    },
                    bratailsAnimated: {
                        title: "Bratails Animado",
                        description:
                            "Uma animação curtinha do meu personagem Bryan, feita com carinho no Clip Studio.",
                    },
                    oliveBrandDesign: {
                        title: "Design de Marca Azeite",
                        description: "Criei este design de marca para azeite no Photoshop.",
                    },
                    stylizedFlag: {
                        title: "Bandeira Estilizada do Brasil",
                        description:
                            "Uma versão estilizada da nossa bandeira, com um toque de cristais, feita sob encomenda.",
                    },
                    gamerCase: {
                        title: "Design de Gabinete Gamer",
                        description:
                            "Um design de gabinete gamer personalizado para um cliente apaixonado por jogos!",
                    },
                    environmentShirt: {
                        title: "Estampa de Camisa Ambiental",
                        description:
                            "Estampa de camisa para o dia do meio ambiente, um projeto escolar que gostei muito em desenvolver.",
                    },
                    parasiteNotebook: {
                        title: "O Parasita no Caderno",
                        description:
                            "O parasita do meu personagem, desenhado no papel e finalizado digitalmente com cores vibrantes.",
                    },
                    giratinaArt: {
                        title: "Giratina Digital Art",
                        description: "Uma arte digital do lendário Pokémon Giratina.",
                    },
                    burgerDesign: {
                        title: "Design de Hambúrguer",
                        description:
                            "Design apetitoso de hambúrguer criado para uma hamburgueria local.",
                    },
                    notebookDrawing: {
                        title: "Desenho em Caderno",
                        description:
                            "Um desenho feito à mão no caderno e colorido digitalmente.",
                    },
                    pizzaDesign: {
                        title: "Design de Pizza",
                        description:
                            "Design de pizza criado especialmente para a pizzaria de um cliente.",
                    },
                    pizzaPromo: {
                        title: "Imagem Promocional de Pizza",
                        description:
                            "Imagem promocional de pizza, perfeita para bombar as redes sociais!",
                    },
                    spaceshipPrototype: {
                        title: "Protótipo de Nave Espacial",
                        description:
                            "Um protótipo de nave espacial com um design futurista e cheio de estilo!",
                    },
                    bratails360: {
                        title: "Bratails em 360 graus",
                        description:
                            "Uma visão completa do meu personagem Bratails/Bryan em 360 graus.",
                    },
                    bratailsSmiling: {
                        title: "Bratails Sorrindo",
                        description: "Olha só o Bratails dando um sorriso contagiante!",
                    },
                    bratailsSpaceship: {
                        title: "Bratails na Nave Espacial",
                        description:
                            "Bratails explorando o espaço em uma modelagem 3D feita no Blender.",
                    },
                    twinSwords: {
                        title: "Espadas Gêmeas",
                        description:
                            "Duas espadas gêmeas com detalhes ornamentados em azul e vermelho, um design simétrico impressionante.",
                    },
                    angelSymbols: {
                        title: "Símbolos ANGEL",
                        description:
                            "Símbolos circulares que evocam a beleza das asas de um anjo.",
                    },
                    fourKingdoms: {
                        title: "Brasões dos Quatro Reinos",
                        description:
                            "Quatro brasões com design heráldico, representando reinos distintos.",
                    },
                    berserkInspired: {
                        title: "Ilustração Inspirada em Berserk",
                        description:
                            "Uma ilustração digital com uma forte inspiração no universo de Berserk.",
                    },
                    anniePortrait: {
                        title: "Retrato da Annie",
                        description:
                            "Um retrato digital da Annie, com foco nos detalhes expressivos do seu rosto.",
                    },
                    renderTest: {
                        title: "Teste de Renderização",
                        description:
                            "Uma renderização de teste com cubos e uma esfera, explorando diferentes texturas.",
                    },
                    vicenteCover: {
                        title: "Capa Musical Vicente",
                        description:
                            "Capa de música criada especialmente para o artista Vicente.",
                    },
                    twinSwordsVariation: {
                        title: "Espadas Gêmeas (Variação)",
                        description:
                            "Outra versão da ilustração das espadas gêmeas, com as cores invertidas.",
                    },
                    asteroid3d: {
                        title: "Modelo 3D de Asteroide",
                        description:
                            "Um modelo 3D de asteroide criado no Blender, com uma iluminação básica.",
                    },
                    bratailsScythe: {
                        title: "Bratails com Foice",
                        description:
                            "Bratails e seu parasita em uma cena tensa, ambos visivelmente feridos.",
                    },
                    bratailsSurprised: {
                        title: "Bratails Surpreso",
                        description: "Bratails com uma expressão de surpresa!",
                    },
                    captainShield: {
                        title: "Escudo do Capitão América",
                        description: "Modelagem 3D do icônico escudo do Capitão América.",
                    },
                    clickteamLogo: {
                        title: "Logo CLICKTEAM",
                        description:
                            "O logo da CLICKTEAM, com um design moderno e minimalista.",
                    },
                    donut3d: {
                        title: "Rosquinha 3D",
                        description: "Uma deliciosa rosquinha em 3D!",
                    },
                    bossConcept: {
                        title: "Conceito de Boss",
                        description:
                            "Um conceito de design para um boss de um jogo em desenvolvimento.",
                    },
                    skull3d: {
                        title: "Crânio 3D",
                        description:
                            "Modelagem 3D de um crânio misterioso, criada no Blender.",
                    },
                    screavinyPrototype: {
                        title: "Protótipo Screaviny",
                        description:
                            "Protótipo do personagem Screaviny para um projeto de jogo.",
                    },
                    modelingTest: {
                        title: "Teste de Modelagem",
                        description: "Um teste de modelagem 3D de personagem.",
                    },
                    discordIcons: {
                        title: "Ícones Discord",
                        description:
                            "Quatro versões de um ícone para um servidor do Discord.",
                    },
                },
            },
            footer: {
                occupation:
                    "Desenvolvedor Web Full Stack | Designer Gráfico | Técnico em Informática",
                quickLinks: "Links Rápidos",
                connect: "Conecte-se",
                copyright: "© {{year}} Jeferson Reis. Todos os direitos reservados.",
                social: {
                    linkedin: "LinkedIn de Jeferson Reis Almeida",
                    github: "GitHub de Jeferson Reis Almeida",
                    instagram: "Instagram de Jeferson Reis Almeida",
                    whatsapp: "WhatsApp de Jeferson Reis Almeida",
                    discord: "Discord de Jeferson Reis Almeida",
                },
            },
            skills: {
                title: "Minhas Habilidades e Competências",
                subtitle:
                    "Expertise técnica e habilidades interpessoais para entregar resultados excepcionais",
                sections: {
                    frontend: {
                        title: "Desenvolvimento Frontend",
                        experience: "Mais de 4 anos de experiência",
                    },
                    backend: {
                        title: "Desenvolvimento Backend",
                        experience: "Mais de 4 anos de experiência",
                    },
                    tools: {
                        title: "Ferramentas e Outras Habilidades",
                        experience: "Mais de 4 anos de experiência",
                    },
                },
                softSkills: {
                    title: "Habilidades Interpessoais",
                    items: {
                        communication: {
                            title: "Comunicação Eficaz",
                            description:
                                "Comunicar ideias de forma clara, concisa e adaptável para diferentes públicos.",
                        },
                        teamwork: {
                            title: "Colaboração e Trabalho em Equipe",
                            description:
                                "Contribuir ativamente para um ambiente de equipe positivo e produtivo.",
                        },
                        problemSolving: {
                            title: "Resolução Criativa de Problemas",
                            description:
                                "Abordar desafios com uma mentalidade analítica e criativa.",
                        },
                        timeManagement: {
                            title: "Gestão de Tempo",
                            description:
                                "Priorizar tarefas e definir metas realistas com foco em resultados.",
                        },
                    },
                },
            },
            resume: {
                title: "Meu Currículo",
                subtitle: "Experiência e habilidades que fazem a diferença",
                highlights: "Destaques",
                highlightItems: [
                    "Desenvolvedor Full-Stack com mais de 4 anos de experiência",
                    "Especialista em React e Node.js",
                    "Designer Gráfico",
                    "Experiência em TI",
                    "Conhecimento em Gestão",
                ],
                experience: {
                    title: "Experiência Profissional",
                    freelancer: {
                        title: "Desenvolvedor Web Freelancer",
                        period: "2024 – Presente",
                        responsibilities: [
                            "Criação de sites intuitivos e responsivos para empresas e empreendedores.",
                            "Desenvolvimento de uma plataforma de cursos online, aumentando as vendas em 90% através de design focado em conversão e experiência do usuário.",
                        ],
                    },
                },
                technicalSkills: {
                    title: "Habilidades Técnicas",
                    categories: {
                        programming: {
                            title: "Linguagens de Programação",
                            skills: "JavaScript, PHP, C#, React, Node.js, Python, SQL",
                        },
                        design: {
                            title: "Ferramentas de Design",
                            skills: "Adobe Photoshop, Illustrator, Premiere, After Effects",
                        },
                        webDev: {
                            title: "Desenvolvimento Web",
                            skills: "HTML, CSS, WordPress, Bootstrap, Tailwind CSS",
                        },
                    },
                },
                softSkills: {
                    title: "Habilidades Interpessoais",
                    items: [
                        "Trabalho em equipe",
                        "Resolução de problemas",
                        "Comunicação eficaz",
                        "Criatividade",
                        "Proatividade",
                        "Adaptabilidade",
                        "Gestão de tempo",
                    ],
                },
                buttons: {
                    showMore: "Mostrar Mais",
                    showLess: "Mostrar Menos",
                    downloadCV: "Baixar CV Completo",
                },
                downloadDescription: "Para mais detalhes, baixe meu currículo completo",
            },
            testimonials: {
                title: "Depoimentos",
                subtitle: "Veja o que nossos clientes dizem",
                imageAlt: "Foto de {{name}}",
                testimonialsList: [
                    {
                        rating: 5,
                        content: 
                            '"Fiquei impressionado com a qualidade do serviço entregue no prazo combinado! Cada detalhe foi pensado, e os resultados superaram expectativas. Com certeza vou indicar para todos que precisarem de um trabalho sério."',
                        author: "FlyServ Drones",
                        title: "Empresa de Serviços com Drones",
                        image: "/assets/images/icon-flyserv.png",
                    },
                    {
                        rating: 5,
                        content: 
                            '"O site desenvolvido pelo Jeferson foi um marco para meus cursos de arte. Além do design impecável, as vendas aumentaram 40% em três meses sem gastar fortunas em anúncios. Serviço ágil e feito com maestria!"',
                        author: "Ricardo Dias",
                        title: "Professor de Artes e Fundador",
                        image: "/assets/images/RicardoDias.webp",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Como CTO da School Vision, testemunhei como o Jeferson modernizou nossa plataforma de forma estratégica. A nova solução não só simplificou nossos processos internos como elevou a experiência dos alunos para outro nível."',
                        author: "Camila Oliveira",
                        title: "Diretora de Tecnologia da School Vision",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Antes do site, minha barbearia dependia apenas do boca a boca. Hoje, tenho agenda lotada graças ao trabalho do Jeferson. Design moderno, funcional e que realmente converte visitantes em clientes!"',
                        author: "Lucas Oliveira",
                        title: "Proprietário da Barbearia Estilo Urbano",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Profissionalismo em cada etapa! O Jeferson não só entendeu minha visão para a loja de roupas como trouxe ideias inovadoras. O projeto foi entregue antes do prazo e o resultado final é simplesmente perfeito."',
                        author: "Ana Silva",
                        title: "Proprietária de Loja de Roupas Femininas",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Precisávamos de um sistema sob medida para nossa consultoria, e o Jeferson acertou em cheio. A ferramenta é intuitiva, reduzindo nosso tempo de gestão em 30%. Recomendo para quem busca eficiência e criatividade."',
                        author: "João Pereira",
                        title: "Gerente de Projetos em Consultoria",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Contratei o Jeferson para criar o site da minha empresa digital e me surpreendi! Ele combina técnica com um olhar estratégico para conversão. O site é rápido, moderno e já gerou leads qualificados desde o lançamento."',
                        author: "Mariana Costa",
                        title: "Empreendedora Digital",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Transformou minha ideia em um site incrível para minha marca de acessórios! Além do design moderno, as funcionalidades facilitam a interação com os clientes. Cada elogio que recebo no site é mérito do seu excelente trabalho!"',
                        author: "Fernanda Rodrigues",
                        title: "Fundadora de Marca de Acessórios",
                    },
                ],
                accessibility: {
                    prevButton: "Depoimento anterior",
                    nextButton: "Próximo depoimento",
                    goToSlide: "Ir para o depoimento {{number}}",
                },
            },
            contact: {
                title: "Contato",
                callMe: "Me ligue para iniciar seu projeto!",
                emailMe: "Envie um email para me contar sobre sua ideia!",
                phone: "+55 71 9 8439-3235",
                email: "jefersonreisalmeida8356@gmail.com",
                ariaWhatsapp: "Abrir conversa no WhatsApp",
                ariaEmail: "Enviar email",
                copyEmail: "Copiar email para área de transferência",
                emailCopied: "Email copiado com sucesso!"
            },
            // -------------- ADICIONANDO AS TRADUÇÕES PARA OS BOTÕES FLUTUANTES AQUI --------
            floatButtons: {
                whatsapp: "Fale comigo no WhatsApp",
                discord: "Junte-se a mim no Discord",
            },
            // ------------------------------------------------------------------------------
        },
    },

    // IDIOMAS EM INGLÊS
    en: {
        translation: {
            menu: {
                home: "Home",
                about: "About",
                areas: "Areas of Expertise",
                skills: "Skills",
                portfolio: "Portfolio",
                resume: "Resume",
                contact: "Contact",
            },
            hero: {
                title: "Jeferson Reis Almeida",
                subtitle: "Full-Stack Developer | Graphic Designer | IT Technician | ",
                transforming: "Turning Ideas into Reality",
                profileAlt: "Photo of Jeferson Reis, full-stack web developer",
                buttons: {
                    viewProjects: "View My Projects",
                    contact: "Get in Touch",
                },
            },
            about: {
                title: "About Me",
                intro:
                    "Hello, I'm Jeferson Reis, passionate about technology, design, and programming. Over the years, I've developed skills as a full-stack developer, graphic designer, and IT technician. I'm always seeking new challenges to create innovative and customized solutions, combining technology and creativity.",
                name: "Jeferson Reis",
                devDescription:
                    "I'm a full-stack developer experienced in creating innovative web solutions. I have strong expertise in React and Node.js, always focusing on performance and user experience (UX/UI).",
                designTitle: "Graphic Design",
                designDescription:
                    "Combining creativity with modern design techniques, I create unique visual identities, including logos, banners, and graphic materials, tailored to meet each client's needs.",
                learnMore: "Learn More"
            },
            expertise: {
                title: "Areas of Expertise",
                subtitle:
                    "Discover my main areas of expertise and how I can help your project take off.",
                learnMore: "Learn more",
                items: {
                    item0: {
                        title: "Immersive Web Development",
                        description:
                            "Creation of Landing Pages, Corporate Websites, and E-commerce platforms optimized for SEO, focusing on responsiveness and conversion.",
                    },
                    item1: {
                        title: "Design & Visual Identity",
                        description:
                            "Development of logos, visual identities, image manipulation, and graphic materials to strengthen your brand.",
                    },
                    item2: {
                        title: "Professional Documentation",
                        description:
                            "Creation of presentations, proposals, spreadsheets, resumes, reports, and financial control documents with impeccable formatting.",
                    },
                    item3: {
                        title: "3D Modeling & Visualization",
                        description:
                            "3D modeling, animations, photorealistic renderings, and assets for AR/VR and 3D printing.",
                    },
                    item4: {
                        title: "Technical Support",
                        description:
                            "System maintenance, data recovery, and device optimization with remote or on-site support.",
                    },
                    item5: {
                        title: "Editing and Motion Graphics",
                        description:
                            "Professional video editing and animations using After Effects, Premiere Pro, and Filmora for YouTube, social media, and other formats.",
                    },
                },
            },
            services: {
                title: "My Services",
                subtitle:
                    "Customized professional solutions to bring your ideas to life!",
                items: {
                    web: {
                        title: "Immersive Web Development",
                        description:
                            "I create unique web experiences! Landing Pages that convert, Corporate Websites that tell your story, dynamic E-commerce sites, and engaging Blogs. Custom design, responsiveness, and SEO to reach the top of searches!",
                    },
                    design: {
                        title: "Memorable Design & Visual Identity",
                        description:
                            "I develop striking logos and complete visual identities. I create arts for social media, banners, flyers, and other advertising materials that strengthen your brand and connect you with your clients.",
                    },
                    documentation: {
                        title: "Impeccable Professional Documentation",
                        description:
                            "I transform your ideas into professional and impactful documents. Presentations that impress, clear business documents, advanced spreadsheets, resumes that highlight talents, and academic papers with impeccable formatting.",
                    },
                    modeling: {
                        title: "Immersive 3D Modeling & Visualization",
                        description:
                            "I bring your projects to life with high-quality 3D modeling! Detailed 3D models and environments, photorealistic renderings, animations, and assets optimized for AR/VR. Projects ready for 3D printing and professional visualization.",
                    },
                    support: {
                        title: "Efficient Technical Support",
                        description:
                            "Comprehensive technical support for your equipment: formatting, optimization, cleaning, data recovery, and preventive maintenance. Remote or on-site service, with agility and professionalism.",
                    },
                    video: {
                        title: "Professional Editing and Motion Graphics",
                        description:
                            "Dynamic and engaging videos! Cutting, editing, color correction, effects, subtitling, motion graphics, and animations (with After Effects). I use Premiere Pro, After Effects, Filmora, and other top tools. Perfect for YouTube, social media, corporate videos, events, vignettes, logo animations!",
                    },
                },
                downloadButton: "Download the Complete Services Catalog",
                downloadDescription:
                    "Discover all the details and values in my catalog!",
            },
            portfolio: {
                title: "My Portfolio",
                subtitle: "Projects and works that demonstrate my skills",
                categories: {
                    all: "All",
                    web: "Web",
                    design: "Design",
                    motion: "Motion",
                    modelagem: "3D Modeling",
                },
                projectLabels: {
                    contracted: "Contracted",
                    viewProject: "View Project",
                    prevProject: "Previous Project",
                    nextProject: "Next Project",
                    viewHighRes: "View in Maximum Quality! Up to 4K!",
                },
                projects: {
                    flyserv: {
                        title: "FlyServ Drones",
                        description:
                            "I developed the front-end and back-end of the FlyServ Drones website, creating the structure, mechanics, and user experience to ensure optimized performance and intuitive navigation.",
                    },
                    onlineDrawingCourse: {
                        title: "Online Drawing Course",
                        description:
                            "Website developed for a drawing teacher, using HTML, CSS, and JavaScript. Focus on intuitive user experience and responsive design.",
                    },
                    weightLossProgram: {
                        title: "Seca e Define - Weight Loss Program",
                        description:
                            "Website created to promote an online weight loss program. Modern and intuitive design, focusing on testimonials and relevant information to boost sales.",
                    },
                    fileManager: {
                        title: "Automated File Manager",
                        description:
                            "File Organizer is a desktop application, developed by me, that uses Python and Electron to facilitate the organization of files based on their extensions.",
                    },
                    pythonChatbot: {
                        title: "Python Chatbot",
                        description:
                            "Chatbot in Python that assists in learning the language. It uses the rufimelo/bert-large-portuguese-cased-sts model to understand questions and provide detailed answers.",
                    },
                    platformGame: {
                        title: "Online Platform Game",
                        description:
                            "Improved version of a GitHub project by Guilherme Silveira. Developed with HTML, CSS, and JavaScript, focusing on UX/UI and responsiveness.",
                    },
                    interactiveMenu: {
                        title: "Interactive Menu",
                        description:
                            "Project with various interactive features in HTML, CSS, and JavaScript. Includes games and useful tools.",
                    },
                    christmasGift: {
                        title: "Digital Christmas Gift",
                        description:
                            "Website created with HTML, CSS, and JavaScript for sending virtual gifts. Simple and friendly interface.",
                    },
                    justlyTraining: {
                        title: "Justly - Front-End Training",
                        description:
                            "Project developed with HTML and CSS to improve front-end development skills.",
                    },
                    personalPortfolio: {
                        title: "My Personal Portfolio",
                        description:
                            "My online space to present projects, skills, and technologies. Developed with a focus on responsiveness and performance.",
                    },
                    bookmarkManager: {
                        title: "Bookmark Project - Bookmark Manager",
                        description:
                            "Simple and practical bookmark manager, created with HTML, CSS, and JavaScript.",
                    },
                    acsendoflex: {
                        title: "Acsendoflex - Evaluation Software",
                        description:
                            "Website to promote performance evaluation software. Clean and professional design.",
                    },
                    zomatoLanding: {
                        title: "Zomato Landing Page (Reimagining)",
                        description:
                            "Recreation of the Zomato landing page with HTML, CSS, and JavaScript. Responsive version with attractive design.",
                    },
                    terrorDuo: {
                        title: "Terror Duo",
                        description:
                            "Meet Bryan and his 'Parasite' in a digital drawing full of details!",
                    },
                    bratailsAnimated: {
                        title: "Bratails Animated",
                        description:
                            "A short animation of my character Bryan, made with care in Clip Studio.",
                    },
                    oliveBrandDesign: {
                        title: "Olive Brand Design",
                        description:
                            "I created this brand design for olive oil in Photoshop.",
                    },
                    stylizedFlag: {
                        title: "Stylized Flag of Brazil",
                        description:
                            "A stylized version of our flag, with a touch of crystals, made to order.",
                    },
                    gamerCase: {
                        title: "Gamer Case Design",
                        description:
                            "A custom gamer case design for a client passionate about games!",
                    },
                    environmentShirt: {
                        title: "Environmental Shirt Print",
                        description:
                            "Shirt print for Environment Day, a school project that I really enjoyed developing.",
                    },
                    parasiteNotebook: {
                        title: "The Parasite in the Notebook",
                        description:
                            "My character's parasite, drawn on paper and digitally finished with vibrant colors.",
                    },
                    giratinaArt: {
                        title: "Giratina Digital Art",
                        description: "A digital art of the legendary Pokémon Giratina.",
                    },
                    burgerDesign: {
                        title: "Burger Design",
                        description:
                            "Appetizing burger design created for a local burger joint.",
                    },
                    notebookDrawing: {
                        title: "Drawing in Notebook",
                        description:
                            "A drawing made by hand in a notebook and digitally colored.",
                    },
                    pizzaDesign: {
                        title: "Pizza Design",
                        description:
                            "Pizza design created especially for a client's pizzeria.",
                    },
                    pizzaPromo: {
                        title: "Pizza Promotional Image",
                        description:
                            "Promotional pizza image, perfect for boosting social media!",
                    },
                    spaceshipPrototype: {
                        title: "Spaceship Prototype",
                        description:
                            "A spaceship prototype with a futuristic and stylish design!",
                    },
                    bratails360: {
                        title: "Bratails in 360 degrees",
                        description:
                            "A complete view of my character Bratails/Bryan in 360 degrees.",
                    },
                    bratailsSmiling: {
                        title: "Bratails Smiling",
                        description: "Look at Bratails giving a contagious smile!",
                    },
                    bratailsSpaceship: {
                        title: "Bratails in the Spaceship",
                        description:
                            "Bratails exploring space in a 3D model made in Blender.",
                    },
                    twinSwords: {
                        title: "Twin Swords",
                        description:
                            "Two twin swords with ornate blue and red details, an impressive symmetrical design.",
                    },
                    angelSymbols: {
                        title: "ANGEL Symbols",
                        description:
                            "Circular symbols that evoke the beauty of an angel's wings.",
                    },
                    fourKingdoms: {
                        title: "Coats of Arms of the Four Kingdoms",
                        description:
                            "Four coats of arms with heraldic design, representing distinct kingdoms.",
                    },
                    berserkInspired: {
                        title: "Berserk Inspired Illustration",
                        description:
                            "A digital illustration with a strong inspiration from the universe of Berserk.",
                    },
                    anniePortrait: {
                        title: "Annie Portrait",
                        description:
                            "A digital portrait of Annie, focusing on the expressive details of her face.",
                    },
                    renderTest: {
                        title: "Rendering Test",
                        description:
                            "A rendering test with cubes and a sphere, exploring different textures.",
                    },
                    vicenteCover: {
                        title: "Vicente Music Cover",
                        description:
                            "Music cover created especially for the artist Vicente.",
                    },
                    twinSwordsVariation: {
                        title: "Twin Swords (Variation)",
                        description:
                            "Another version of the twin swords illustration, with inverted colors.",
                    },
                    asteroid3d: {
                        title: "3D Asteroid Model",
                        description:
                            "A 3D asteroid model created in Blender, with basic lighting.",
                    },
                    bratailsScythe: {
                        title: "Bratails with Scythe",
                        description:
                            "Bratails and his parasite in a tense scene, both visibly wounded.",
                    },
                    bratailsSurprised: {
                        title: "Bratails Surprised",
                        description: "Bratails with a surprised expression!",
                    },
                    captainShield: {
                        title: "Captain America Shield",
                        description: "3D modeling of the iconic Captain America shield.",
                    },
                    clickteamLogo: {
                        title: "CLICKTEAM Logo",
                        description:
                            "The CLICKTEAM logo, with a modern and minimalist design.",
                    },
                    donut3d: {
                        title: "3D Donut",
                        description: "A delicious donut in 3D!",
                    },
                    bossConcept: {
                        title: "Boss Concept",
                        description:
                            "A design concept for a boss in a game under development.",
                    },
                    skull3d: {
                        title: "3D Skull",
                        description:
                            "3D modeling of a mysterious skull, created in Blender.",
                    },
                    screavinyPrototype: {
                        title: "Screaviny Prototype",
                        description: "Screaviny character prototype for a game project.",
                    },
                    modelingTest: {
                        title: "Modeling Test",
                        description: "A 3D character modeling test.",
                    },
                    discordIcons: {
                        title: "Discord Icons",
                        description: "Four versions of an icon for a Discord server.",
                    },
                },
            },
            footer: {
                occupation:
                    "Full Stack Web Developer | Graphic Designer | IT Technician",
                quickLinks: "Quick Links",
                connect: "Connect",
                copyright: "© {{year}} Jeferson Reis. All rights reserved.",
                social: {
                    linkedin: "Jeferson Reis Almeida LinkedIn",
                    github: "Jeferson Reis Almeida GitHub",
                    instagram: "Jeferson Reis Almeida Instagram",
                    whatsapp: "Jeferson Reis Almeida WhatsApp",
                    discord: "Jeferson Reis Almeida Discord",
                },
            },
            skills: {
                title: "My Skills and Competencies",
                subtitle:
                    "Technical expertise and interpersonal skills to deliver exceptional results",
                sections: {
                    frontend: {
                        title: "Frontend Development",
                        experience: "4+ Years of Experience",
                    },
                    backend: {
                        title: "Backend Development",
                        experience: "4+ Years of Experience",
                    },
                    tools: {
                        title: "Tools & Other Skills",
                        experience: "4+ Years of Experience",
                    },
                },
                softSkills: {
                    title: "Interpersonal Skills",
                    items: {
                        communication: {
                            title: "Effective Communication",
                            description:
                                "Communicate ideas clearly, concisely, and adaptably for different audiences.",
                        },
                        teamwork: {
                            title: "Collaboration & Teamwork",
                            description:
                                "Actively contribute to a positive and productive team environment.",
                        },
                        problemSolving: {
                            title: "Creative Problem Solving",
                            description:
                                "Approach challenges with an analytical and creative mindset.",
                        },
                        timeManagement: {
                            title: "Time Management",
                            description:
                                "Prioritize tasks and set realistic goals with a focus on results.",
                        },
                    },
                },
            },
            resume: {
                title: "My Resume",
                subtitle: "Experience and skills that make a difference",
                highlights: "Highlights",
                highlightItems: [
                    "Full-Stack Developer with 4+ years of experience",
                    "React and Node.js Specialist",
                    "Graphic Designer",
                    "IT Expertise",
                    "Management Knowledge",
                ],
                experience: {
                    title: "Professional Experience",
                    freelancer: {
                        title: "Freelance Web Developer",
                        period: "2024 – Present",
                        responsibilities: [
                            "Creation of intuitive and responsive websites for companies and entrepreneurs.",
                            "Development of an online course platform, increasing sales by 90% through conversion-focused design and user experience.",
                        ],
                    },
                },
                technicalSkills: {
                    title: "Technical Skills",
                    categories: {
                        programming: {
                            title: "Programming Languages",
                            skills: "JavaScript, PHP, C#, React, Node.js, Python, SQL",
                        },
                        design: {
                            title: "Design Tools",
                            skills: "Adobe Photoshop, Illustrator, Premiere, After Effects",
                        },
                        webDev: {
                            title: "Web Development",
                            skills: "HTML, CSS, WordPress, Bootstrap, Tailwind CSS",
                        },
                    },
                },
                softSkills: {
                    title: "Interpersonal Skills",
                    items: [
                        "Teamwork",
                        "Problem-solving",
                        "Effective communication",
                        "Creativity",
                        "Proactivity",
                        "Adaptability",
                        "Time management",
                    ],
                },
                buttons: {
                    showMore: "Show More",
                    showLess: "Show Less",
                    downloadCV: "Download Full CV",
                },
                downloadDescription: "For more details, download my full resume",
            },
            testimonials: {
                title: "Testimonials",
                subtitle: "Hear From Happy Clients",
                imageAlt: "Photo of {{name}}",
                testimonialsList: [
                    {
                        rating: 5,
                        content: 
                            '"The quality of work delivered within the agreed timeline blew me away! Every detail was meticulously planned, and the results exceeded expectations. I’ll definitely recommend Jeferson to anyone looking for top-notch service."',
                        author: "FlyServ Drones",
                        title: "Drone Services Company",
                        image: "/assets/images/icon-flyserv.png",
                    },
                    {
                        rating: 5,
                        content: 
                            '"The website Jeferson built for my art courses was a game-changer. Not only is the design flawless, but sales jumped 40% in three months without expensive ads. Fast, professional, and truly impactful!"',
                        author: "Ricardo Dias",
                        title: "Art Instructor & Founder",
                        image: "/assets/images/RicardoDias.webp",
                    },
                    {
                        rating: 5,
                        content: 
                            '"As CTO of School Vision, I saw firsthand how Jeferson strategically modernized our platform. His solution streamlined our internal workflows and significantly enhanced the student experience. Outstanding work!"',
                        author: "Camila Oliveira",
                        title: "CTO at School Vision",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Before the website, my barbershop relied solely on word of mouth. Now, we’re fully booked thanks to Jeferson’s work—modern design, user-friendly, and perfectly optimized to convert visitors into customers."',
                        author: "Lucas Oliveira",
                        title: "Owner, Urban Style Barbershop",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Professionalism at every step! Jeferson not only understood my vision for the clothing store but added innovative ideas. The project was delivered early, and the final result is absolutely flawless."',
                        author: "Ana Silva",
                        title: "Owner, Women’s Fashion Store",
                    },
                    {
                        rating: 5,
                        content: 
                            '"We needed a custom system for our consultancy, and Jeferson nailed it. The tool is intuitive, cutting our management time by 30%. Highly recommended for anyone seeking efficiency and creativity."',
                        author: "João Pereira",
                        title: "Project Manager, Consulting Firm",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Hired Jeferson for my digital business website, and wow! He blends technical skill with a sharp eye for conversion. The site is fast, modern, and already generating quality leads. A+ experience!"',
                        author: "Mariana Costa",
                        title: "Digital Entrepreneur",
                    },
                    {
                        rating: 5,
                        content: 
                            '"Turned my idea into a stunning website for my accessory brand! Beyond the sleek design, the features make client interaction seamless. Every compliment I get on the site is a testament to his expertise!"',
                        author: "Fernanda Rodrigues",
                        title: "Founder, Accessory Brand",
                    },
                ],
                accessibility: {
                    prevButton: "Previous testimonial",
                    nextButton: "Next testimonial",
                    goToSlide: "Go to testimonial {{number}}",
                },
            },
            contact: {
                title: "Contact",
                callMe: "Call me to start your project!",
                emailMe: "Email me to share your idea!",
                phone: "+55 71 9 8439-3235",
                email: "jefersonreisalmeida8356@gmail.com",
                ariaWhatsapp: "Open WhatsApp conversation",
                ariaEmail: "Send email",
                copyEmail: "Copy email to clipboard",
                emailCopied: "Email copied successfully!"
            },
            // -------------- ADICIONANDO AS TRADUÇÕES PARA OS BOTÕES FLUTUANTES AQUI --------
            floatButtons: {
                whatsapp: "Talk to me on WhatsApp",
                discord: "Join my Discord",
            },
            // ------------------------------------------------------------------------------
        },
    },
};

i18n
    .use(initReactI18next) // passa o i18n para react-i18next.
    .init({
        resources,
        lng: "pt", // idioma padrão
        interpolation: {
            escapeValue: false, // não escape para caracteres HTML (< in JSX).
        },
    });

export default i18n;
