export type Locale = "ru" | "en";

export const locales: Locale[] = ["ru", "en"];

type ProcessStep = { index: string; title: string; description: string };
type ExperienceItem = { years: string; role: string };
type ServiceItem = { title: string; description: string };
type ContactDetail = { label: string; value: string };

export type Dictionary = {
  skipLink: string;
  nav: {
    brand: string;
    work: string;
    blog: string;
    about: string;
    contact: string;
    menuOpenLabel: string;
    menuCloseLabel: string;
    menuOpenText: string;
    menuCloseText: string;
  };
  footer: {
    tagline: string;
    toTop: string;
  };
  hero: {
    roles: string[];
    paragraph1: string;
    paragraph2: string;
  };
  process: {
    eyebrow: string;
    steps: ProcessStep[];
  };
  home: {
    workHeading: string;
    projectsSuffix: string;
    ctaHeading: string;
    ctaButton: string;
  };
  work: {
    viewCursor: string;
    viewProject: string;
    noProjectsForTag: string;
    coverAlt: string;
    renderLabel: string;
    backToProjects: string;
    category: string;
    year: string;
    client: string;
    services: string;
    software: string;
    gallery: string;
    galleryHint: string;
    nextProject: string;
  };
  gallery: {
    render: string;
    process: string;
    close: string;
    closeView: string;
    prevSlide: string;
    nextSlide: string;
    prevImage: string;
    nextImage: string;
    back: string;
    forward: string;
    highlightReel: string;
    fullscreenRender: string;
    imagesView: string;
    renderAlt: string;
    processAlt: string;
  };
  blog: {
    eyebrow: string;
    heading: string;
    all: string;
    emptyArchive: string;
    noTaggedPosts: string;
    readMore: string;
    readCursor: string;
    backToBlog: string;
    allPosts: string;
  };
  renderPlaceholder: {
    comingSoon: string;
    failedToLoad: string;
    open: string;
    heroReserved: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    downloadCv: string;
    portraitAlt: string;
    bio: string[];
    experienceLabel: string;
    experience: ExperienceItem[];
    skillsLabel: string;
    skills: string[];
    softwareLabel: string;
    software: string[];
    servicesLabel: string;
    services: ServiceItem[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    emailLabel: string;
    detailsLabel: string;
    details: ContactDetail[];
    socialLabel: string;
  };
  links: {
    tagline: string;
    portfolio: string;
    projects: string;
    blog: string;
    write: string;
    downloadCv: string;
  };
  notFound: {
    heading: string;
    body: string;
    backHome: string;
  };
  languageSwitcher: {
    label: string;
  };
};

const ru: Dictionary = {
  skipLink: "Перейти к содержимому",
  nav: {
    brand: "Wisp",
    work: "Проекты",
    blog: "Журнал",
    about: "Обо мне",
    contact: "Контакты",
    menuOpenLabel: "Открыть меню",
    menuCloseLabel: "Закрыть меню",
    menuOpenText: "Меню",
    menuCloseText: "Закрыть",
  },
  footer: {
    tagline: "AI-дизайнер и 3D-дженералист",
    toTop: "Наверх ↑",
  },
  hero: {
    roles: ["UX/UI Designer", "CGI Generalist", "AI-дизайнер"],
    paragraph1:
      "Я держу AI в центре процесса — от быстрого концепта до ускорения продакшна — и довожу результат до финального качества руками, там, где точность важнее скорости. UX/UI и 3D — медиумы, подход общий.",
    paragraph2: "Россия, работаю удалённо.",
  },
  process: {
    eyebrow: "Как я работаю",
    steps: [
      {
        index: "01",
        title: "Бриф",
        description:
          "Обсуждаем задачу, референсы, сроки и бюджет — до старта работы понятно, что именно получится на выходе.",
      },
      {
        index: "02",
        title: "Концепт",
        description:
          "Первые эскизы и композиции, чтобы согласовать направление до того, как начнётся основная работа.",
      },
      {
        index: "03",
        title: "Продакшн",
        description:
          "Моделинг, свет, материалы, анимация — самая долгая часть, на связи на всех этапах.",
      },
      {
        index: "04",
        title: "Сдача",
        description:
          "Финальные файлы в нужных форматах, при необходимости — правки и поддержка после сдачи.",
      },
    ],
  },
  home: {
    workHeading: "Избранные проекты",
    projectsSuffix: "проектов",
    ctaHeading: "Готовы начать?",
    ctaButton: "Обсудить проект →",
  },
  work: {
    viewCursor: "Смотреть",
    viewProject: "Смотреть проект →",
    noProjectsForTag: "Пока нет проектов с этим тегом.",
    coverAlt: "обложка",
    renderLabel: "Рендер",
    backToProjects: "← Все проекты",
    category: "Категория",
    year: "Год",
    client: "Клиент",
    services: "Услуги",
    software: "Используемый софт",
    gallery: "Галерея",
    galleryHint: "Нажмите на фото для полноэкранного просмотра",
    nextProject: "Следующий проект",
  },
  gallery: {
    render: "Рендер",
    process: "Процесс",
    close: "Закрыть ✕",
    closeView: "Закрыть просмотр",
    prevSlide: "Предыдущий слайд",
    nextSlide: "Следующий слайд",
    prevImage: "Предыдущее изображение",
    nextImage: "Следующее изображение",
    back: "← Назад",
    forward: "Далее →",
    highlightReel: "избранные рендеры",
    fullscreenRender: "Полноэкранный рендер",
    imagesView: "просмотр изображений",
    renderAlt: "рендер",
    processAlt: "процесс",
  },
  blog: {
    eyebrow: "Журнал",
    heading: "Заметки о процессе.",
    all: "Все",
    emptyArchive: "Пока здесь пусто — первая запись скоро появится.",
    noTaggedPosts: "Пока нет записей с этим тегом.",
    readMore: "Читать →",
    readCursor: "Читать",
    backToBlog: "← Журнал",
    allPosts: "← Все записи",
  },
  renderPlaceholder: {
    comingSoon: "Рендер скоро появится",
    failedToLoad: "Не удалось загрузить изображение",
    open: "Открыть",
    heroReserved: "Место зарезервировано для главного рендера",
  },
  about: {
    eyebrow: "Обо мне",
    heading: "AI-дизайнер с фокусом на процессе, форме и скорости.",
    downloadCv: "Скачать CV →",
    portraitAlt: "Портрет",
    bio: [
      "Мой путь в дизайн начался в 2018 году с увлечения трёхмерной графикой. Позже я прошёл обучение в школе дизайна по направлению UX/UI, что дало мне сильную базу в понимании структуры, логики и пользовательского опыта.",
      "В студии Chipsa я начинал как UX/UI специалист, позже полностью переключился на 3D-контент и графику. Там я работал над крупными проектами: создавал 3D-мокапы, Key Visuals для брендов и графику для презентаций.",
      "Последние пару лет я системно встраиваю AI в свой процесс — от быстрого прототипирования и генерации референсов до ускорения 3D-продакшна. AI для меня — не замена ремеслу, а инструмент, который освобождает время на то, что действительно требует глаза и опыта.",
    ],
    experienceLabel: "Опыт работы",
    experience: [
      { years: "2023 — Наст. время", role: "AI-дизайнер / 3D Generalist (Freelance)" },
      { years: "2018 — 2023", role: "Middle 3D Designer & UX/UI, Chipsa Design" },
      { years: "2019 — 2021", role: "UX/UI Дизайнер" },
    ],
    skillsLabel: "Навыки",
    skills: [
      "AI изображения и видео",
      "3D Моделинг",
      "Освещение сцен",
      "Создание материалов",
      "Дизайн интерфейсов",
      "Симуляции / Нодовые генерации",
    ],
    softwareLabel: "Софт",
    software: [
      "Midjourney",
      "Cinema 4D",
      "Houdini",
      "Redshift",
      "Substance 3D",
      "ZBrush",
      "After Effects",
      "Figma",
    ],
    servicesLabel: "Услуги",
    services: [
      {
        title: "AI-дизайн",
        description:
          "Системная интеграция ИИ в пайплайн: быстрый концепт-арт, референсы, нейро-видео и ускорение 3D-продакшна с помощью Midjourney и современных AI-инструментов.",
      },
      {
        title: "3D Дизайн & Визуализация",
        description:
          "Рендеры любой сложности, продуктовая визуализация, реалистичные 3D-мокапы и ключевые визуалы (Key Visuals) для брендов и промо-кампаний.",
      },
      {
        title: "UX/UI Дизайн",
        description:
          "Проектирование интерфейсов и пользовательского опыта — от вайрфреймов и логики экрана до финального UI. Дисциплина, с которой начинался мой путь в дизайне.",
      },
      {
        title: "Визуальная концептуализация",
        description:
          "Разработка объемного визуального языка: передача характера бренда через форму, свет, фактуру материалов и движение.",
      },
    ],
  },
  contact: {
    eyebrow: "Контакты",
    heading: "Давайте обсудим ваш проект.",
    emailLabel: "Email",
    detailsLabel: "Детали",
    details: [
      { label: "Локация", value: "Россия / Удаленно" },
      { label: "Формат работы", value: "Фриланс, проектная занятость" },
      { label: "Время ответа", value: "В течение нескольких часов" },
    ],
    socialLabel: "Соцсети & Связь",
  },
  links: {
    tagline: "AI-дизайнер, фриланс",
    portfolio: "Портфолио",
    projects: "Проекты",
    blog: "Журнал",
    write: "Написать",
    downloadCv: "Скачать CV",
  },
  notFound: {
    heading: "Такой страницы не существует.",
    body: "Страница, которую вы ищете, могла переехать. Вернитесь к проектам или напишите напрямую.",
    backHome: "На главную →",
  },
  languageSwitcher: {
    label: "Язык",
  },
};

const en: Dictionary = {
  skipLink: "Skip to content",
  nav: {
    brand: "Wisp",
    work: "Work",
    blog: "Journal",
    about: "About",
    contact: "Contact",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    menuOpenText: "Menu",
    menuCloseText: "Close",
  },
  footer: {
    tagline: "AI designer & 3D generalist",
    toTop: "Back to top ↑",
  },
  hero: {
    roles: ["UX/UI Designer", "CGI Generalist", "AI Designer"],
    paragraph1:
      "I keep AI at the centre of the process — from fast concepting to speeding up production — and finish the result to final quality by hand, wherever precision matters more than speed. UX/UI and 3D are the mediums; the approach stays the same.",
    paragraph2: "Based in Russia, working remotely.",
  },
  process: {
    eyebrow: "How I work",
    steps: [
      {
        index: "01",
        title: "Brief",
        description:
          "We discuss the task, references, timeline and budget — before work starts, it's clear what the outcome will be.",
      },
      {
        index: "02",
        title: "Concept",
        description:
          "First sketches and compositions to align on direction before the main work begins.",
      },
      {
        index: "03",
        title: "Production",
        description:
          "Modeling, lighting, materials, animation — the longest part, staying in touch at every stage.",
      },
      {
        index: "04",
        title: "Delivery",
        description:
          "Final files in the formats you need, with revisions and support after handoff if needed.",
      },
    ],
  },
  home: {
    workHeading: "Selected work",
    projectsSuffix: "projects",
    ctaHeading: "Ready to start?",
    ctaButton: "Let's talk →",
  },
  work: {
    viewCursor: "View",
    viewProject: "View project →",
    noProjectsForTag: "No projects with this tag yet.",
    coverAlt: "cover",
    renderLabel: "Render",
    backToProjects: "← All projects",
    category: "Category",
    year: "Year",
    client: "Client",
    services: "Services",
    software: "Software used",
    gallery: "Gallery",
    galleryHint: "Click a photo for a fullscreen view",
    nextProject: "Next project",
  },
  gallery: {
    render: "Render",
    process: "Process",
    close: "Close ✕",
    closeView: "Close view",
    prevSlide: "Previous slide",
    nextSlide: "Next slide",
    prevImage: "Previous image",
    nextImage: "Next image",
    back: "← Back",
    forward: "Next →",
    highlightReel: "highlight renders",
    fullscreenRender: "Fullscreen render",
    imagesView: "image view",
    renderAlt: "render",
    processAlt: "process",
  },
  blog: {
    eyebrow: "Journal",
    heading: "Notes on process.",
    all: "All",
    emptyArchive: "Nothing here yet — the first post is coming soon.",
    noTaggedPosts: "No posts with this tag yet.",
    readMore: "Read →",
    readCursor: "Read",
    backToBlog: "← Journal",
    allPosts: "← All posts",
  },
  renderPlaceholder: {
    comingSoon: "Render coming soon",
    failedToLoad: "Failed to load image",
    open: "Open",
    heroReserved: "Space reserved for the main render",
  },
  about: {
    eyebrow: "About",
    heading: "AI designer focused on process, form and speed.",
    downloadCv: "Download CV →",
    portraitAlt: "Portrait",
    bio: [
      "My path into design started in 2018 with an interest in 3D graphics. I later trained at a design school in UX/UI, which gave me a solid grounding in structure, logic and user experience.",
      "At Chipsa studio I started as a UX/UI specialist, later switching fully to 3D content and graphics. I worked on large projects there: 3D mockups, key visuals for brands and presentation graphics.",
      "For the past couple of years I've been systematically weaving AI into my process — from fast prototyping and reference generation to speeding up 3D production. AI isn't a replacement for craft to me — it's a tool that frees up time for what actually needs an eye and experience.",
    ],
    experienceLabel: "Experience",
    experience: [
      { years: "2023 — Present", role: "AI Designer / 3D Generalist (Freelance)" },
      { years: "2018 — 2023", role: "Middle 3D Designer & UX/UI, Chipsa Design" },
      { years: "2019 — 2021", role: "UX/UI Designer" },
    ],
    skillsLabel: "Skills",
    skills: [
      "AI images and video",
      "3D modeling",
      "Scene lighting",
      "Material creation",
      "Interface design",
      "Simulations / node-based generation",
    ],
    softwareLabel: "Software",
    software: [
      "Midjourney",
      "Cinema 4D",
      "Houdini",
      "Redshift",
      "Substance 3D",
      "ZBrush",
      "After Effects",
      "Figma",
    ],
    servicesLabel: "Services",
    services: [
      {
        title: "AI Design",
        description:
          "Systematic AI integration into the pipeline: fast concept art, references, AI video and speeding up 3D production with Midjourney and modern AI tools.",
      },
      {
        title: "3D Design & Visualization",
        description:
          "Renders of any complexity, product visualization, realistic 3D mockups and key visuals for brands and promo campaigns.",
      },
      {
        title: "UX/UI Design",
        description:
          "Interface and user-experience design — from wireframes and screen logic to final UI. The discipline my path into design started with.",
      },
      {
        title: "Visual Concepting",
        description:
          "Developing a dimensional visual language: conveying brand character through form, light, material texture and movement.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's talk about your project.",
    emailLabel: "Email",
    detailsLabel: "Details",
    details: [
      { label: "Location", value: "Russia / Remote" },
      { label: "Availability", value: "Freelance, project-based" },
      { label: "Response time", value: "Within a few hours" },
    ],
    socialLabel: "Social & elsewhere",
  },
  links: {
    tagline: "AI designer, freelance",
    portfolio: "Portfolio",
    projects: "Work",
    blog: "Journal",
    write: "Email me",
    downloadCv: "Download CV",
  },
  notFound: {
    heading: "This page doesn't exist.",
    body: "The page you're looking for may have moved. Head back to the work, or write directly.",
    backHome: "Back home →",
  },
  languageSwitcher: {
    label: "Language",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { ru, en };

export const dateLocale: Record<Locale, string> = {
  ru: "ru-RU",
  en: "en-US",
};
