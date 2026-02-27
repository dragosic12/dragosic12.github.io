import type { PortfolioContent } from '../types/content';

export const portfolioContent: PortfolioContent = {
  seo: {
    title: {
      es: 'Dragos Camarasan | Portfolio Técnico',
      en: 'Dragos Camarasan | Technical Portfolio',
    },
    description: {
      es: 'Portfolio bilingüe con proyectos reales, experiencia actual en Icaria Technology e integración de un generador de imágenes.',
      en: 'Bilingual portfolio with real projects, current experience at Icaria Technology, and an integrated image generator.',
    },
  },
  profile: {
    name: 'Dragos Ionut Camarasan',
    role: {
      es: 'Junior Implantation Software en Icaria Technology',
      en: 'Junior Implantation Software at Icaria Technology',
    },
    location: {
      es: 'Madrid, España',
      en: 'Madrid, Spain',
    },
    headline: {
      es: 'Ingeniería de software aplicada a producto y cliente real.',
      en: 'Software engineering applied to product and real client delivery.',
    },
    subheadline: {
      es: 'Actualmente en Icaria (entorno TDN/TDM), trabajando con GDPR, Java y Docker, con foco en calidad técnica y ejecución.',
      en: 'Currently at Icaria (TDN/TDM environment), working with GDPR, Java, and Docker, focused on technical quality and execution.',
    },
    shortBio: {
      es: 'Graduado en Ingeniería Informática por la UCM. Mi etapa actual está centrada en implantación software en Icaria Technology, y la combino con proyectos de desarrollo full-stack, testing y automatización.',
      en: 'Computer Engineering graduate from UCM. My current stage is focused on software implementation at Icaria Technology, combined with full-stack, testing, and automation projects.',
    },
    photo: '/assets/profile/Imagen-CV.png',
    insightLines: [
      {
        es: 'Implementación técnica en cliente con foco en fiabilidad y entrega.',
        en: 'Client-facing technical implementation focused on reliability and delivery.',
      },
      {
        es: 'Trabajo diario con Icaria TDN/TDM, módulos GDPR, Java y Docker.',
        en: 'Daily work with Icaria TDN/TDM, GDPR modules, Java, and Docker.',
      },
      {
        es: 'Perfil mixto entre desarrollo, validación funcional y soporte de negocio.',
        en: 'Hybrid profile across development, functional validation, and business support.',
      },
      {
        es: 'Base sólida en TypeScript/JavaScript para frontend moderno.',
        en: 'Strong TypeScript/JavaScript foundation for modern frontend work.',
      },
    ],
  },
  about: {
    title: {
      es: 'Sobre mí',
      en: 'About me',
    },
    paragraphs: [
      {
        es: 'Mi perfil está orientado a construir software útil para negocio, con una combinación de base técnica sólida y capacidad de adaptación a entornos de cliente.',
        en: 'My profile is focused on building software that is useful for business, combining strong technical foundations with client-environment adaptability.',
      },
      {
        es: 'Actualmente trabajo en Icaria Technology como Junior Implantation Software, participando en implantaciones y tareas de integración con herramientas como Icaria TDN/TDM, módulos GDPR, Java y Docker.',
        en: 'I currently work at Icaria Technology as Junior Implantation Software, participating in deployments and integration tasks with tools such as Icaria TDN/TDM, GDPR modules, Java, and Docker.',
      },
      {
        es: 'Además, desarrollo proyectos propios para reforzar arquitectura frontend, modelado de datos, pruebas automáticas y experiencia de usuario en web responsive.',
        en: 'I also build personal projects to strengthen frontend architecture, data modeling, automated testing, and responsive web user experience.',
      },
    ],
  },
  projects: {
    title: {
      es: 'Proyectos',
      en: 'Projects',
    },
    intro: {
      es: 'Proyectos seleccionados con más peso técnico y mejor alineados con mi perfil actual.',
      en: 'Selected projects with stronger technical weight and better alignment with my current profile.',
    },
    items: [
      {
        id: 'pwa-imagenes-ia',
        title: {
          es: 'Generador de Imágenes (PWA)',
          en: 'Image Generator (PWA)',
        },
        summary: {
          es: 'Aplicación web para generar imágenes desde prompt, con UX rápida, notificaciones y enfoque mobile-first.',
          en: 'Web app to generate images from prompts, with fast UX, notifications, and mobile-first focus.',
        },
        context: {
          es: 'Proyecto personal/académico orientado a consumo de servicios de imagen, gestión de estado en frontend y optimización de experiencia de uso.',
          en: 'Personal/academic project focused on image-service consumption, frontend state management, and UX optimization.',
        },
        stack: ['React', 'TypeScript', 'Vite', 'PWA', 'Service Worker', 'CSS responsive'],
        highlights: [
          {
            es: 'Integrado como módulo real dentro del portfolio para que pueda probarse directamente.',
            en: 'Integrated as a real module inside this portfolio so it can be tested directly.',
          },
          {
            es: 'Flujo de generación, limpieza y descarga adaptado a escritorio y móvil.',
            en: 'Generation, reset, and download flow adapted for desktop and mobile.',
          },
          {
            es: 'Fallback visual automático si el proveedor principal de imágenes falla.',
            en: 'Automatic visual fallback if the main image provider fails.',
          },
        ],
        images: ['/assets/projects/pwa.svg'],
        links: {
          publicRepo: 'https://github.com/dragosic12/generador-de-imagenes',
        },
      },
      {
        id: 'bot-infojobs',
        title: {
          es: 'Bot de Ofertas de Empleo',
          en: 'Job Offers Bot',
        },
        summary: {
          es: 'Bot en Python para monitorizar ofertas y enviar alertas automáticas a Telegram.',
          en: 'Python bot to monitor job offers and send automated Telegram alerts.',
        },
        context: {
          es: 'Proyecto de automatización enfocado a productividad personal. Actualmente no está desplegado en producción.',
          en: 'Automation project focused on personal productivity. It is currently not deployed in production.',
        },
        stack: ['Python', 'asyncio', 'requests', 'BeautifulSoup', 'Telegram Bot API'],
        highlights: [
          {
            es: 'Extracción periódica de vacantes con control de duplicados.',
            en: 'Periodic vacancy extraction with duplicate control.',
          },
          {
            es: 'Diseño simple, fácil de mantener y ampliar.',
            en: 'Simple design, easy to maintain and extend.',
          },
          {
            es: 'Base para una futura versión cloud con scheduler.',
            en: 'Foundation for a future cloud version with scheduler.',
          },
        ],
        images: ['/assets/projects/bot.svg'],
        links: {},
      },
      {
        id: 'tfg-aps-fullstack',
        title: {
          es: 'TFG - Aplicación web de soporte (UCM)',
          en: 'Thesis - Support Web Platform (UCM)',
        },
        summary: {
          es: 'Proyecto full-stack orientado a gestión de datos, lógica de negocio y calidad de software.',
          en: 'Full-stack project focused on data management, business logic, and software quality.',
        },
        context: {
          es: 'Evolución de la plataforma ApS de la UCM con mejoras funcionales, trabajo de arquitectura y ampliación de cobertura de pruebas.',
          en: 'Evolution of UCM ApS platform with functional improvements, architecture work, and expanded test coverage.',
        },
        stack: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Node.js', 'MySQL', 'Knex', 'Docker', 'TailwindCSS', 'Vitest', 'Playwright'],
        highlights: [
          {
            es: 'Modelado y explotación de datos en MySQL con capa de acceso en Knex.',
            en: 'Data modeling and querying in MySQL with a Knex data-access layer.',
          },
          {
            es: 'Implementación frontend/backend en Nuxt con tipado TypeScript.',
            en: 'Frontend/backend implementation in Nuxt with TypeScript typing.',
          },
          {
            es: 'Validación con tests unitarios y e2e (Vitest + Playwright) y despliegue en entorno Docker.',
            en: 'Validation with unit and e2e tests (Vitest + Playwright) and Docker-based deployment.',
          },
        ],
        images: ['/assets/projects/tfg-aps.png'],
        links: {
          publicRepo: 'https://github.com/dragosic/TFG',
        },
      },
    ],
  },
  imageLab: {
    title: {
      es: 'Generador de imágenes',
      en: 'Image generator',
    },
    intro: {
      es: 'Escribe un prompt y genera imagen. Si el proveedor principal no responde, se activa un fallback automático para que la experiencia no se rompa.',
      en: 'Write a prompt and generate an image. If the main provider fails, an automatic fallback is used so the experience remains functional.',
    },
    tokenLabel: {
      es: 'Token interno',
      en: 'Internal token',
    },
    tokenHint: {
      es: 'No necesitas introducir token para usar este módulo.',
      en: 'You do not need to enter a token to use this module.',
    },
    rememberTokenLabel: {
      es: 'Recordar token',
      en: 'Remember token',
    },
    showTokenLabel: {
      es: 'Mostrar',
      en: 'Show',
    },
    hideTokenLabel: {
      es: 'Ocultar',
      en: 'Hide',
    },
    promptLabel: {
      es: 'Prompt',
      en: 'Prompt',
    },
    promptPlaceholder: {
      es: 'Ejemplo: retrato editorial minimalista, luz suave, tonos cálidos, alta calidad...',
      en: 'Example: minimalist editorial portrait, soft lighting, warm tones, high quality...',
    },
    styleLabel: {
      es: 'Estilo',
      en: 'Style',
    },
    generateLabel: {
      es: 'Generar imagen',
      en: 'Generate image',
    },
    generatingLabel: {
      es: 'Generando...',
      en: 'Generating...',
    },
    clearLabel: {
      es: 'Limpiar',
      en: 'Clear',
    },
    downloadLabel: {
      es: 'Descargar PNG',
      en: 'Download PNG',
    },
    note: {
      es: 'Consejo: en móvil empieza con prompts breves y añade detalle en una segunda iteración.',
      en: 'Tip: on mobile, start with short prompts and add detail in a second iteration.',
    },
    previewTitle: {
      es: 'Vista previa',
      en: 'Preview',
    },
    emptyPreviewText: {
      es: 'Aquí aparecerá la imagen generada.',
      en: 'Your generated image will appear here.',
    },
    missingTokenError: {
      es: 'Servicio no disponible temporalmente.',
      en: 'Service temporarily unavailable.',
    },
    missingPromptError: {
      es: 'Escribe un prompt antes de generar.',
      en: 'Write a prompt before generating.',
    },
    apiErrorPrefix: {
      es: 'No se pudo generar imagen con este prompt',
      en: 'Image generation failed for this prompt',
    },
    styleOptions: [
      {
        value: 'realistic',
        label: { es: 'Realista', en: 'Realistic' },
      },
      {
        value: 'illustration',
        label: { es: 'Ilustración', en: 'Illustration' },
      },
      {
        value: 'cinematic',
        label: { es: 'Cinemático', en: 'Cinematic' },
      },
      {
        value: 'minimal',
        label: { es: 'Minimalista', en: 'Minimal' },
      },
    ],
    quickPrompts: [
      {
        es: 'Paisaje urbano nocturno con reflejos de lluvia',
        en: 'Night cityscape with rain reflections',
      },
      {
        es: 'Interior moderno con luz natural y tonos cálidos',
        en: 'Modern interior with natural light and warm tones',
      },
      {
        es: 'Retrato creativo editorial con estilo fotográfico',
        en: 'Creative editorial portrait in photographic style',
      },
    ],
  },
  skills: {
    title: {
      es: 'Skills',
      en: 'Skills',
    },
    groups: [
      {
        name: {
          es: 'Lenguajes',
          en: 'Languages',
        },
        items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL', 'C++'],
      },
      {
        name: {
          es: 'Frontend y Web',
          en: 'Frontend and Web',
        },
        items: ['React', 'Vite', 'Nuxt 3', 'Vue 3', 'TailwindCSS', 'PWA'],
      },
      {
        name: {
          es: 'Backend y Datos',
          en: 'Backend and Data',
        },
        items: ['Node.js', 'MySQL', 'Knex', 'TypeORM (base)', 'REST APIs', 'Modelado de datos'],
      },
      {
        name: {
          es: 'QA y Testing',
          en: 'QA and Testing',
        },
        items: ['Vitest', 'Playwright', 'Testing unitario', 'Testing e2e', 'Smoke tests', 'Validación funcional'],
      },
      {
        name: {
          es: 'Implantación (Icaria)',
          en: 'Implementation (Icaria)',
        },
        items: ['Icaria TDN/TDM', 'Módulos GDPR', 'Docker', 'Integración técnica', 'Soporte a cliente', 'Resolución de incidencias'],
      },
      {
        name: {
          es: 'Trabajo de Equipo',
          en: 'Teamwork',
        },
        items: ['SCRUM', 'Comunicación técnica', 'Priorización', 'Documentación', 'Mejora continua'],
      },
    ],
  },
  focus: {
    title: {
      es: 'Enfoque profesional',
      en: 'Professional focus',
    },
    paragraphs: [
      {
        es: 'Mi foco actual está en consolidar mi etapa en Icaria Technology dentro del área de implantación software, crecer en responsabilidades técnicas (integración, calidad y automatización) y evolucionar hacia un rol de desarrollo de producto donde pueda aportar tanto en código como en ejecución real con cliente.',
        en: 'My current focus is to consolidate my stage at Icaria Technology in software implementation, grow in technical responsibilities (integration, quality, and automation), and evolve toward a product development role where I can contribute both in code and real client execution.',
      },
    ],
  },
  contact: {
    title: {
      es: 'Contacto',
      en: 'Contact',
    },
    text: {
      es: 'Si buscas un perfil junior con experiencia real en implantación, base de desarrollo y visión de calidad, hablamos.',
      en: 'If you are looking for a junior profile with real implementation experience, development foundations, and a quality mindset, let us connect.',
    },
    emailLabel: {
      es: 'Enviar email',
      en: 'Send email',
    },
    cvLabel: {
      es: 'Descargar CV',
      en: 'Download CV',
    },
  },
  social: {
    github: 'https://github.com/dragosic12',
    linkedin: undefined,
    email: 'dragosic12@gmail.com',
    cv: '/assets/cv/CV_DragosIcaria.pdf',
  },
  ui: {
    nav: [
      { id: 'home', label: { es: 'Inicio', en: 'Home' } },
      { id: 'about', label: { es: 'Perfil', en: 'Profile' } },
      { id: 'projects', label: { es: 'Proyectos', en: 'Projects' } },
      { id: 'image-lab', label: { es: 'Generador', en: 'Generator' } },
      { id: 'skills', label: { es: 'Skills', en: 'Skills' } },
      { id: 'focus', label: { es: 'Enfoque', en: 'Focus' } },
      { id: 'contact', label: { es: 'Contacto', en: 'Contact' } },
    ],
    locale: {
      es: 'ES',
      en: 'EN',
    },
    theme: {
      light: { es: 'Cambiar a claro', en: 'Switch to light' },
      dark: { es: 'Cambiar a oscuro', en: 'Switch to dark' },
    },
    projects: {
      details: { es: 'Ver detalle', en: 'Show details' },
      hide: { es: 'Ocultar', en: 'Hide' },
      highlights: { es: 'Logros clave', en: 'Key highlights' },
      stack: { es: 'Stack técnico', en: 'Technical stack' },
      publicRepo: { es: 'Repositorio', en: 'Repository' },
      demo: { es: 'Demo', en: 'Demo' },
    },
    social: {
      github: { es: 'GitHub', en: 'GitHub' },
      linkedin: { es: 'LinkedIn', en: 'LinkedIn' },
      email: { es: 'Email', en: 'Email' },
    },
    ctas: {
      viewProjects: { es: 'Ver proyectos', en: 'View projects' },
      downloadCv: { es: 'Descargar CV', en: 'Download CV' },
    },
    footer: {
      es: 'Diseñado con React, Vite, TypeScript y Tailwind.',
      en: 'Designed with React, Vite, TypeScript, and Tailwind.',
    },
  },
};
