import type { PortfolioContent } from '../types/content';

export const portfolioContent: PortfolioContent = {
  seo: {
    title: {
      es: 'Dragos Camarasan | Portfolio Técnico',
      en: 'Dragos Camarasan | Technical Portfolio',
    },
    description: {
      es: 'Portfolio bilingüe con proyectos técnicos y experiencia actual en implantación software en Icaria.',
      en: 'Bilingual portfolio with technical projects and current software implantation experience at Icaria.',
    },
  },
  profile: {
    name: 'Dragos Ionut Camarasan',
    role: {
      es: 'Junior Implantation Software en Icaria',
      en: 'Junior Implantation Software at Icaria',
    },
    location: {
      es: 'Madrid, España',
      en: 'Madrid, Spain',
    },
    headline: {
      es: 'Ingeniería de software con mentalidad de producto.',
      en: 'Software engineering with a product mindset.',
    },
    subheadline: {
      es: 'C++, React, Java, Docker, Icaria TDM y foco en soluciones fiables para negocio real.',
      en: 'C++, React, Java, Docker, Icaria TDM, and a focus on reliable software for real business use cases.',
    },
    shortBio: {
      es: 'Graduado en Ingeniería Informática por la UCM. Actualmente trabajo como Junior Implantation Software en Icaria, tras experiencia previa en Siemens (HMI/SCADA) y soporte técnico universitario.',
      en: 'Computer Engineering graduate from UCM. I currently work as Junior Implantation Software at Icaria, after previous experience at Siemens (HMI/SCADA) and university IT support.',
    },
    photo: '/assets/profile/Imagen-CV.png',
    insightLines: [
      {
        es: 'Experiencia actual en implantación software para cliente final.',
        en: 'Current experience in software implementation for end clients.',
      },
      {
        es: 'Trabajo con Icaria TDM, módulos GDPR, Java y Docker.',
        en: 'Hands-on work with Icaria TDM, GDPR modules, Java, and Docker.',
      },
      {
        es: 'Base sólida en C++, React y diseño de soluciones orientadas a negocio.',
        en: 'Strong foundation in C++, React, and business-oriented solution design.',
      },
      {
        es: 'Experiencia industrial previa en Siemens con HMI/SCADA.',
        en: 'Previous industrial experience at Siemens with HMI/SCADA.',
      },
      {
        es: 'Perfil junior con foco en fiabilidad, aprendizaje y entrega.',
        en: 'Junior profile focused on reliability, learning, and delivery.',
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
        es: 'Comencé mi trayectoria académica en ADE e Ingeniería Informática, y finalmente me especialicé en informática para construir una base sólida en programación, algoritmia y estructuras de datos.',
        en: 'I started my academic path in Business Administration and Computer Engineering, then specialized in computing to build strong foundations in programming, algorithms, and data structures.',
      },
      {
        es: 'Durante mis prácticas en Siemens trabajé en proyectos industriales con WinCC Unified y SCADA, participando en integración de sistemas, pruebas, soporte técnico y automatización de tareas.',
        en: 'During my internship at Siemens, I worked on industrial projects with WinCC Unified and SCADA, participating in system integration, testing, technical support, and task automation.',
      },
      {
        es: 'Actualmente trabajo en Icaria como Junior Implantation Software, implantando soluciones en cliente y operando con herramientas como Icaria TDM, módulos GDPR, Java y Docker.',
        en: 'I currently work at Icaria as Junior Implantation Software, implementing client solutions and working with tools such as Icaria TDM, GDPR modules, Java, and Docker.',
      },
      {
        es: 'También presté soporte técnico en el laboratorio de informática de la universidad, gestionando incidencias, mantenimiento y configuración de aulas para docencia y evaluación.',
        en: 'I also provided technical support in the university IT lab, handling incidents, maintenance, and classroom setup for teaching and assessment.',
      },
    ],
  },
  projects: {
    title: {
      es: 'Proyectos',
      en: 'Projects',
    },
    intro: {
      es: 'Selección de proyectos académicos y profesionales orientados a resolver problemas reales.',
      en: 'Selection of academic and professional projects focused on solving real problems.',
    },
    items: [
      {
        id: 'siemens-hmi-scada',
        title: {
          es: 'Siemens HMI/SCADA',
          en: 'Siemens HMI/SCADA',
        },
        summary: {
          es: 'Participación en desarrollo y soporte para interfaces industriales con WinCC Unified, CWC y migraciones técnicas.',
          en: 'Contribution to development and support for industrial interfaces with WinCC Unified, CWC, and technical migrations.',
        },
        context: {
          es: 'Proyecto de prácticas en departamento HMI & SCADA, con foco en calidad, integración y mantenimiento evolutivo.',
          en: 'Internship project in an HMI & SCADA department focused on quality, integration, and evolutive maintenance.',
        },
        stack: ['WinCC Unified', 'WinCC OA', 'HMI', 'SCADA', 'HTML', 'CSS', 'JavaScript', 'SQL', 'SQLite'],
        highlights: [
          {
            es: 'Desarrollo de Custom Web Controls con SVGs dinámicos y comportamiento en tiempo real.',
            en: 'Built Custom Web Controls with dynamic SVGs and real-time behavior.',
          },
          {
            es: 'Soporte en migraciones de logs entre versiones de TIA Portal/WinCC Unified.',
            en: 'Supported log migrations between TIA Portal/WinCC Unified versions.',
          },
          {
            es: 'Automatización de tareas con scripts reutilizables y apoyo a estandarización del equipo.',
            en: 'Automated repetitive tasks with reusable scripts and team standardization support.',
          },
        ],
        images: ['/assets/projects/siemens.svg'],
        links: {
          privateRepoLabel: 'Repositorio interno / Internal repository',
        },
      },
      {
        id: 'lab-soporte',
        title: {
          es: 'Soporte Técnico Universitario',
          en: 'University IT Support',
        },
        summary: {
          es: 'Gestión de incidencias, mantenimiento de equipos y preparación de aulas en laboratorio de informática.',
          en: 'Incident management, hardware/software maintenance, and classroom setup in an IT lab.',
        },
        context: {
          es: 'Trabajo en entorno académico con usuarios múltiples, incidencias simultáneas y necesidad de respuesta ágil.',
          en: 'Work in an academic environment with multiple users, simultaneous incidents, and the need for fast response.',
        },
        stack: ['Windows', 'Linux básico', 'Soporte IT', 'Configuración de equipos', 'Gestión de incidencias'],
        highlights: [
          {
            es: 'Mantenimiento preventivo y actualización de software en puestos de laboratorio.',
            en: 'Performed preventive maintenance and software updates in lab workstations.',
          },
          {
            es: 'Asistencia técnica en exámenes y sesiones prácticas con alta demanda.',
            en: 'Provided technical assistance during exams and high-demand practical sessions.',
          },
          {
            es: 'Colaboración con equipo IT para mejorar estabilidad de aulas informáticas.',
            en: 'Collaborated with the IT team to improve lab classroom stability.',
          },
        ],
        images: ['/assets/projects/lab.svg'],
        links: {},
      },
      {
        id: 'pwa-imagenes-ia',
        title: {
          es: 'PWA Generador de Imágenes IA',
          en: 'AI Image Generator PWA',
        },
        summary: {
          es: 'Aplicación React que genera imágenes desde texto con API de Hugging Face e integra notificaciones.',
          en: 'React application that generates images from text using Hugging Face API with notification support.',
        },
        context: {
          es: 'Proyecto académico centrado en integración API, UX en tiempo real y distribución como aplicación web progresiva.',
          en: 'Academic project focused on API integration, real-time UX, and distribution as a progressive web app.',
        },
        stack: ['React', 'Node.js', 'PWA', 'Service Worker', 'Hugging Face API', 'Bootstrap'],
        highlights: [
          {
            es: 'Implementación de flujo de generación y descarga de imágenes con manejo de estados.',
            en: 'Implemented image generation and download flow with robust state handling.',
          },
          {
            es: 'Notificaciones para avisar al usuario cuando el resultado está disponible.',
            en: 'Added notifications to inform users when results are ready.',
          },
          {
            es: 'Integrado como laboratorio interactivo dentro de este portfolio para uso real en escritorio y móvil.',
            en: 'Integrated as an interactive lab inside this portfolio for real desktop and mobile usage.',
          },
        ],
        images: ['/assets/projects/pwa.svg'],
        links: {
          publicRepo: 'https://github.com/dragosic12/dragosic12.github.io',
        },
      },
      {
        id: 'bot-infojobs',
        title: {
          es: 'Bot de Ofertas de Empleo',
          en: 'Job Offers Bot',
        },
        summary: {
          es: 'Script en Python que rastrea ofertas de InfoJobs y envía alertas a Telegram.',
          en: 'Python script that monitors InfoJobs offers and sends Telegram alerts.',
        },
        context: {
          es: 'Proyecto personal de automatización para seguimiento continuo de vacantes junior en zona objetivo.',
          en: 'Personal automation project for continuous tracking of junior vacancies in target locations.',
        },
        stack: ['Python', 'asyncio', 'requests', 'BeautifulSoup', 'Telegram Bot API'],
        highlights: [
          {
            es: 'Scraping periódico con control de duplicados para evitar ruido en notificaciones.',
            en: 'Scheduled scraping with duplicate control to avoid noisy notifications.',
          },
          {
            es: 'Diseño simple y mantenible orientado a uso real diario.',
            en: 'Simple and maintainable design intended for real daily usage.',
          },
          {
            es: 'Aplicación práctica de automatización en un caso de productividad personal.',
            en: 'Practical automation applied to a personal productivity use case.',
          },
        ],
        images: ['/assets/projects/bot.svg'],
        links: {},
      },
      {
        id: 'cpp-estructuras-datos',
        title: {
          es: 'Colección C++ de Estructuras de Datos',
          en: 'C++ Data Structures Collection',
        },
        summary: {
          es: 'Conjunto de prácticas y ejercicios avanzados en C++ sobre TADs, árboles, diccionarios y complejidad.',
          en: 'Collection of advanced C++ assignments on ADTs, trees, dictionaries, and complexity analysis.',
        },
        context: {
          es: 'Bloque académico clave para consolidar razonamiento algorítmico y diseño de software eficiente.',
          en: 'Key academic block for consolidating algorithmic reasoning and efficient software design.',
        },
        stack: ['C++', 'Algoritmia', 'Estructuras de datos', 'Análisis de complejidad', 'Depuración'],
        highlights: [
          {
            es: 'Implementación de soluciones con foco en rendimiento y corrección.',
            en: 'Implemented solutions with strong focus on performance and correctness.',
          },
          {
            es: 'Trabajo continuado con árboles, secuencias, diccionarios y aplicaciones de TADs.',
            en: 'Continuous work with trees, sequences, dictionaries, and ADT-based applications.',
          },
          {
            es: 'Base sólida transferible a entornos profesionales de backend y sistemas.',
            en: 'Solid foundation transferable to professional backend and systems environments.',
          },
        ],
        images: ['/assets/projects/cpp.svg'],
        links: {},
      },
      {
        id: 'tfg-fullstack',
        title: {
          es: 'TFG Full-Stack Orientado a Datos',
          en: 'Data-Oriented Full-Stack Thesis',
        },
        summary: {
          es: 'Desarrollo de aplicación completa con backend, frontend, base de datos y validación funcional.',
          en: 'Development of a complete application with backend, frontend, database, and functional validation.',
        },
        context: {
          es: 'Proyecto final de grado enfocado en diseño de datos, lógica de negocio y resolución de incidencias reales.',
          en: 'Final degree project focused on data modeling, business logic, and solving real-world issues.',
        },
        stack: ['SQL', 'Modelado de datos', 'Backend', 'Frontend', 'Testing funcional'],
        highlights: [
          {
            es: 'Diseño del modelo de datos y consultas orientadas a validación y consistencia.',
            en: 'Designed data model and queries oriented to validation and consistency.',
          },
          {
            es: 'Implementación integral del flujo funcional de la aplicación.',
            en: 'Implemented end-to-end functional flow of the application.',
          },
          {
            es: 'Documentación técnica y enfoque de mejora iterativa.',
            en: 'Technical documentation and iterative improvement approach.',
          },
        ],
        images: ['/assets/projects/tfg.svg'],
        links: {
          privateRepoLabel: 'Repositorio privado / Private repository',
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
      es: 'Módulo de generación de imágenes integrado en el portfolio. Escribe un prompt y genera la imagen directamente.',
      en: 'Image generation module integrated into the portfolio. Write a prompt and generate the image directly.',
    },
    tokenLabel: {
      es: 'Token interno',
      en: 'Internal token',
    },
    tokenHint: {
      es: 'La autenticación del generador ya está configurada.',
      en: 'Generator authentication is already configured.',
    },
    rememberTokenLabel: {
      es: 'Recordar token en este navegador',
      en: 'Remember token in this browser',
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
      es: 'Ejemplo: ciudad futurista con lluvia, estilo cinematográfico, alto detalle...',
      en: 'Example: futuristic rainy city, cinematic style, high detail...',
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
      es: 'Tip: en móvil, usa prompts cortos al inicio y luego añade detalles progresivamente.',
      en: 'Tip: on mobile, start with short prompts and then add details progressively.',
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
      es: 'El servicio de generación no está disponible temporalmente.',
      en: 'The generation service is temporarily unavailable.',
    },
    missingPromptError: {
      es: 'Escribe un prompt antes de generar.',
      en: 'Write a prompt before generating.',
    },
    apiErrorPrefix: {
      es: 'Error de generación',
      en: 'Generation error',
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
        value: 'cyberpunk',
        label: { es: 'Cyberpunk', en: 'Cyberpunk' },
      },
      {
        value: 'minimal',
        label: { es: 'Minimalista', en: 'Minimal' },
      },
    ],
    quickPrompts: [
      {
        es: 'Estación de metro futurista con neón y lluvia',
        en: 'Futuristic subway station with neon lights and rain',
      },
      {
        es: 'Centro de control industrial limpio y moderno',
        en: 'Clean and modern industrial control center',
      },
      {
        es: 'Escritorio de programador con estética retro-tech',
        en: 'Programmer desk with retro-tech aesthetics',
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
        items: ['C', 'C++', 'Java', 'Python', 'TypeScript', 'JavaScript'],
      },
      {
        name: {
          es: 'Desarrollo de Software',
          en: 'Software Engineering',
        },
        items: ['POO', 'Algoritmia', 'Estructuras de datos', 'Depuración', 'Resolución de problemas'],
      },
      {
        name: {
          es: 'Frontend / Backend',
          en: 'Frontend / Backend',
        },
        items: ['React', 'Node.js', 'Angular (base)', 'REST APIs', 'PWA'],
      },
      {
        name: {
          es: 'Datos y Herramientas',
          en: 'Data and Tooling',
        },
        items: ['MySQL', 'MongoDB', 'Oracle SQL Developer', 'Git', 'Docker', 'Linux básico', 'Icaria TDM', 'GDPR'],
      },
      {
        name: {
          es: 'Industrial',
          en: 'Industrial',
        },
        items: ['WinCC Unified', 'WinCC OA', 'HMI', 'SCADA', 'Integración de sistemas'],
      },
      {
        name: {
          es: 'Trabajo en Equipo',
          en: 'Teamwork',
        },
        items: ['SCRUM', 'Colaboración multidisciplinar', 'Comunicación técnica', 'Mentoría inicial'],
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
        es: 'Quiero desarrollarme como ingeniero de software en equipos donde se valore la calidad técnica, la fiabilidad y el aprendizaje continuo.',
        en: 'I want to grow as a software engineer in teams where technical quality, reliability, and continuous learning are core values.',
      },
      {
        es: 'Me motivan los proyectos que combinan arquitectura clara, datos bien diseñados y solución de problemas reales de negocio.',
        en: 'I am motivated by projects that combine clear architecture, well-designed data, and real business problem solving.',
      },
      {
        es: 'Estoy especialmente interesado en roles junior de desarrollo software, implementación técnica o integración de sistemas.',
        en: 'I am particularly interested in junior roles in software development, technical implementation, or system integration.',
      },
      {
        es: 'Mi objetivo es consolidar mi etapa actual en Icaria y escalar hacia responsabilidades de implementación y producto cada vez más completas.',
        en: 'My goal is to consolidate my current stage at Icaria and grow toward broader implementation and product responsibilities.',
      },
    ],
  },
  contact: {
    title: {
      es: 'Contacto',
      en: 'Contact',
    },
    text: {
      es: 'Si tu empresa busca un perfil junior con base técnica sólida, capacidad de aprendizaje y orientación a resultados, estaré encantado de hablar.',
      en: 'If your company is looking for a junior profile with strong technical foundations, learning agility, and outcome orientation, I would be glad to connect.',
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
      { id: 'about', label: { es: 'Sobre mí', en: 'About' } },
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
      es: 'Construido con React, Vite, TypeScript y Tailwind.',
      en: 'Built with React, Vite, TypeScript, and Tailwind.',
    },
  },
};



