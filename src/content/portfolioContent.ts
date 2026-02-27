import type { PortfolioContent } from '../types/content';

export const portfolioContent: PortfolioContent = {
  seo: {
    title: {
      es: 'Dragos Camarasan | Portfolio Tecnico',
      en: 'Dragos Camarasan | Technical Portfolio',
    },
    description: {
      es: 'Portfolio bilingue con experiencia real en Icaria Technology, proyectos seleccionados y generador de imagenes integrado.',
      en: 'Bilingual portfolio with real experience at Icaria Technology, selected projects, and an integrated image generator.',
    },
  },
  profile: {
    name: 'Dragos Ionut Camarasan',
    role: {
      es: 'Junior Implantation Software en Icaria Technology',
      en: 'Junior Implantation Software at Icaria Technology',
    },
    location: {
      es: 'Madrid, Espana',
      en: 'Madrid, Spain',
    },
    headline: {
      es: 'Ingenieria de software aplicada a producto y cliente real.',
      en: 'Software engineering applied to product and real client delivery.',
    },
    subheadline: {
      es: 'Actualmente en Icaria, trabajando con Icaria TDM, modulos GDPR, Java y Docker con foco en calidad tecnica.',
      en: 'Currently at Icaria, working with Icaria TDM, GDPR modules, Java, and Docker with a strong technical quality focus.',
    },
    shortBio: {
      es: 'Graduado en Ingenieria Informatica por la UCM. Combino implantacion software, integracion tecnica y proyectos de desarrollo web con testing.',
      en: 'Computer Engineering graduate from UCM. I combine software implementation, technical integration, and web development projects with testing.',
    },
    photo: '/assets/profile/Imagen-CV.png',
    insightLines: [
      {
        es: 'Trabajo actual en Icaria Technology dentro del area de implantacion software.',
        en: 'Current role at Icaria Technology in software implementation.',
      },
      {
        es: 'Herramientas principales: Icaria TDM, GDPR, Java, Docker y YouTrack.',
        en: 'Main tooling: Icaria TDM, GDPR, Java, Docker, and YouTrack.',
      },
      {
        es: 'Perfil mixto: desarrollo, validacion funcional y resolucion de incidencias.',
        en: 'Mixed profile: development, functional validation, and incident resolution.',
      },
      {
        es: 'Base solida en TypeScript y JavaScript para frontend moderno.',
        en: 'Strong TypeScript and JavaScript foundation for modern frontend work.',
      },
    ],
  },
  about: {
    title: {
      es: 'Sobre mi',
      en: 'About me',
    },
    paragraphs: [
      {
        es: 'Mi objetivo es construir software util para negocio, con buena base tecnica y una ejecucion real orientada a cliente.',
        en: 'My goal is to build software that is useful for business, with strong technical foundations and real client-oriented execution.',
      },
      {
        es: 'Estoy enfocado en seguir creciendo en Icaria Technology y escalar hacia responsabilidades de producto e integracion cada vez mas completas.',
        en: 'I am focused on growing at Icaria Technology and moving toward broader product and integration responsibilities.',
      },
    ],
  },
  experience: {
    title: {
      es: 'Experiencia',
      en: 'Experience',
    },
    intro: {
      es: 'Resumen de experiencia profesional y tecnica mas relevante.',
      en: 'Summary of the most relevant professional and technical experience.',
    },
    items: [
      {
        id: 'icaria-junior-implantation',
        role: {
          es: 'Junior Implantation Software',
          en: 'Junior Implantation Software',
        },
        organization: {
          es: 'Icaria Technology',
          en: 'Icaria Technology',
        },
        period: {
          es: 'Actualidad',
          en: 'Current',
        },
        summary: {
          es: 'Implantacion de soluciones en cliente, configuracion funcional y soporte tecnico en entorno productivo. Trabajo habitual con Icaria TDM, modulos GDPR, Java, Docker y seguimiento operativo en YouTrack.',
          en: 'Client solution implementation, functional setup, and technical support in production environments. Daily work with Icaria TDM, GDPR modules, Java, Docker, and operational tracking in YouTrack.',
        },
        tools: ['Icaria TDM', 'GDPR', 'Java', 'Docker', 'YouTrack', 'Soporte a cliente'],
      },
      {
        id: 'siemens-hmi-scada',
        role: {
          es: 'Practicas HMI/SCADA',
          en: 'HMI/SCADA Internship',
        },
        organization: {
          es: 'Siemens',
          en: 'Siemens',
        },
        period: {
          es: 'Etapa de practicas',
          en: 'Internship period',
        },
        summary: {
          es: 'Colaboracion en entorno industrial con WinCC Unified y SCADA, tareas de pruebas tecnicas, integracion y soporte a migraciones.',
          en: 'Worked in an industrial environment with WinCC Unified and SCADA, supporting technical testing, integration, and migration tasks.',
        },
        tools: ['WinCC Unified', 'SCADA', 'Testing tecnico', 'Integracion', 'Soporte'],
      },
      {
        id: 'ucm-lab-support',
        role: {
          es: 'Soporte Tecnico de Laboratorio',
          en: 'IT Lab Technical Support',
        },
        organization: {
          es: 'Universidad Complutense de Madrid',
          en: 'Complutense University of Madrid',
        },
        period: {
          es: 'Durante etapa universitaria',
          en: 'During university stage',
        },
        summary: {
          es: 'Gestion de incidencias, mantenimiento de equipos y apoyo en preparacion de aulas para docencia y evaluacion.',
          en: 'Incident management, workstation maintenance, and classroom setup support for teaching and assessment.',
        },
        tools: ['Windows', 'Mantenimiento', 'Incidencias', 'Soporte tecnico'],
      },
    ],
  },
  projects: {
    title: {
      es: 'Proyectos',
      en: 'Projects',
    },
    intro: {
      es: 'Proyectos tecnicos seleccionados, con foco en desarrollo real y calidad de entrega.',
      en: 'Selected technical projects focused on practical development and delivery quality.',
    },
    items: [
      {
        id: 'pwa-imagenes-ia',
        title: {
          es: 'Generador de Imagenes (PWA)',
          en: 'Image Generator (PWA)',
        },
        summary: {
          es: 'Aplicacion web para generar imagenes desde prompt con experiencia optimizada en movil y escritorio.',
          en: 'Web app to generate images from prompts with optimized mobile and desktop experience.',
        },
        context: {
          es: 'Proyecto orientado a consumo de servicios de imagen, estado en frontend y experiencia de usuario responsive.',
          en: 'Project focused on image-service consumption, frontend state handling, and responsive UX.',
        },
        stack: ['React', 'TypeScript', 'Vite', 'PWA', 'Service Worker', 'Responsive UI'],
        highlights: [
          {
            es: 'Modulo integrado en este portfolio para probarlo en vivo.',
            en: 'Integrated module inside this portfolio for live testing.',
          },
          {
            es: 'Fallback multiple para evitar que falle la vista previa.',
            en: 'Multi-level fallback to avoid preview failures.',
          },
          {
            es: 'Flujo de generacion y descarga preparado para movil.',
            en: 'Generation and download flow prepared for mobile usage.',
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
          es: 'Bot en Python para monitorizar ofertas y enviar alertas automaticas en Telegram.',
          en: 'Python bot to monitor offers and send automated Telegram alerts.',
        },
        context: {
          es: 'Proyecto de automatizacion para productividad personal. Actualmente no esta desplegado en produccion.',
          en: 'Automation project for personal productivity. It is currently not deployed in production.',
        },
        stack: ['Python', 'asyncio', 'requests', 'BeautifulSoup', 'Telegram Bot API'],
        highlights: [
          {
            es: 'Extraccion periodica con control de duplicados.',
            en: 'Periodic extraction with duplicate control.',
          },
          {
            es: 'Base para evolucion cloud con scheduler.',
            en: 'Foundation for a future cloud scheduler version.',
          },
          {
            es: 'Arquitectura simple y mantenible.',
            en: 'Simple and maintainable architecture.',
          },
        ],
        images: ['/assets/projects/bot-toy.svg'],
        links: {},
      },
      {
        id: 'tfg-aps-fullstack',
        title: {
          es: 'TFG - Aplicacion Web de Soporte (UCM)',
          en: 'Thesis - Support Web App (UCM)',
        },
        summary: {
          es: 'Proyecto full-stack centrado en datos, logica de negocio y validacion con testing automatizado.',
          en: 'Full-stack project focused on data, business logic, and validation with automated testing.',
        },
        context: {
          es: 'Evolucion de plataforma universitaria con mejoras funcionales, arquitectura y cobertura de pruebas.',
          en: 'Evolution of a university platform with functional improvements, architecture work, and broader test coverage.',
        },
        stack: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Node.js', 'MySQL', 'Knex', 'Docker', 'TailwindCSS', 'Vitest', 'Playwright'],
        highlights: [
          {
            es: 'Frontend y backend unificados en Nuxt con tipado TypeScript.',
            en: 'Unified frontend and backend in Nuxt with TypeScript typing.',
          },
          {
            es: 'Modelado y acceso a datos en MySQL con Knex.',
            en: 'Data modeling and access in MySQL with Knex.',
          },
          {
            es: 'Testing unitario y e2e con Vitest y Playwright.',
            en: 'Unit and e2e testing with Vitest and Playwright.',
          },
        ],
        images: ['/assets/projects/tfg-web-motion.svg'],
        links: {
          publicRepo: 'https://github.com/dragosic/TFG',
        },
      },
    ],
  },
  imageLab: {
    title: {
      es: 'Generador de imagenes',
      en: 'Image generator',
    },
    intro: {
      es: 'Genera imagen a partir de texto con fallback automatico para que siempre tengas resultado visible.',
      en: 'Generate images from text with automatic fallback so you always get a visible result.',
    },
    tokenLabel: {
      es: 'Token interno',
      en: 'Internal token',
    },
    tokenHint: {
      es: 'No necesitas introducir token para usar este modulo.',
      en: 'No token input is needed for this module.',
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
      es: 'Ejemplo: coche deportivo rojo en carretera al atardecer...',
      en: 'Example: red sports car on a sunset road...',
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
      es: 'Prueba prompts simples: coches, motos, perros, gatos o animales.',
      en: 'Try simple prompts: cars, bikes, dogs, cats, or animals.',
    },
    previewTitle: {
      es: 'Vista previa',
      en: 'Preview',
    },
    emptyPreviewText: {
      es: 'Aqui aparecera la imagen generada.',
      en: 'Your generated image will appear here.',
    },
    missingTokenError: {
      es: 'Servicio temporalmente no disponible.',
      en: 'Service temporarily unavailable.',
    },
    missingPromptError: {
      es: 'Escribe un prompt antes de generar.',
      en: 'Write a prompt before generating.',
    },
    apiErrorPrefix: {
      es: 'No se pudo generar imagen con ese prompt',
      en: 'Could not generate image with that prompt',
    },
    styleOptions: [
      {
        value: 'realistic',
        label: { es: 'Realista', en: 'Realistic' },
      },
      {
        value: 'illustration',
        label: { es: 'Ilustracion', en: 'Illustration' },
      },
      {
        value: 'cinematic',
        label: { es: 'Cinematico', en: 'Cinematic' },
      },
      {
        value: 'minimal',
        label: { es: 'Minimalista', en: 'Minimal' },
      },
    ],
    quickPrompts: [
      {
        es: 'coche clasico azul en ciudad nocturna',
        en: 'blue classic car in a night city',
      },
      {
        es: 'moto deportiva en carretera de montana',
        en: 'sport bike on a mountain road',
      },
      {
        es: 'perro golden retriever en parque soleado',
        en: 'golden retriever dog in a sunny park',
      },
      {
        es: 'gato naranja durmiendo en una manta',
        en: 'orange cat sleeping on a blanket',
      },
      {
        es: 'manada de animales salvajes en sabana',
        en: 'wild animal pack in savannah',
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
        items: ['Node.js', 'MySQL', 'Knex', 'REST APIs', 'Modelado de datos', 'Docker'],
      },
      {
        name: {
          es: 'QA y Testing',
          en: 'QA and Testing',
        },
        items: ['Vitest', 'Playwright', 'Testing unitario', 'Testing e2e', 'Smoke tests', 'Validacion funcional'],
      },
      {
        name: {
          es: 'Implantacion en Icaria',
          en: 'Implementation at Icaria',
        },
        items: ['Icaria TDM', 'GDPR', 'YouTrack', 'Integracion tecnica', 'Soporte a cliente', 'Resolucion de incidencias'],
      },
      {
        name: {
          es: 'Trabajo en Equipo',
          en: 'Teamwork',
        },
        items: ['SCRUM', 'Comunicacion tecnica', 'Priorizacion', 'Documentacion', 'Mejora continua'],
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
        es: 'Mi foco principal es consolidar mi etapa en Icaria Technology dentro del area de implantacion software, creciendo en integracion, automatizacion, calidad tecnica y evolucion hacia desarrollo de producto con impacto real.',
        en: 'My main focus is to consolidate my current stage at Icaria Technology in software implementation, growing in integration, automation, technical quality, and product development with real impact.',
      },
    ],
  },
  contact: {
    title: {
      es: 'Contacto',
      en: 'Contact',
    },
    text: {
      es: 'Si buscas un perfil junior con experiencia real en implantacion, desarrollo y testing, hablamos.',
      en: 'If you are looking for a junior profile with real implementation, development, and testing experience, let us connect.',
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
      { id: 'experience', label: { es: 'Experiencia', en: 'Experience' } },
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
      stack: { es: 'Stack tecnico', en: 'Technical stack' },
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
      es: 'Disenado con React, Vite, TypeScript y Tailwind.',
      en: 'Designed with React, Vite, TypeScript, and Tailwind.',
    },
  },
};
