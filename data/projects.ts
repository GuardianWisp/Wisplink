export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  index: string;
  summary: string;
  description: string[];
  software: string[];
  services: string[];
  aspect: "portrait" | "landscape" | "square";
  /** Cover image used on the homepage work list. */
  cover: string;
  /** Fullscreen hero image at the top of the project page. */
  hero: string;
  /** Gallery images, in order — leave empty to fall back to placeholders. */
  renders: string[];
  process: string[];
};

export const projects: Project[] = [
  {
    slug: "biotech",
    title: "Biotech",
    category: "3D Design — Визуализация микроорганизмов",
    year: "2023",
    client: "Artlife Biotech",
    index: "01",
    summary:
      "Исследование биологических структур, переведённое в футуристичную 3D-визуальную систему.",
    description: [
      "Biotech начался как задача показать невидимое: как выглядят биологические структуры и микроорганизмы, если довести их форму до чистой, футуристичной 3D-графики. Бренду Artlife Biotech нужен был визуальный язык, который не копирует фотографию или снимки под микроскопом буквально, а превращает научную тему в самостоятельный, запоминающийся образ.",
      "Я построил библиотеку органических, клеточных форм и выстроил свет так, будто это кадры из лаборатории будущего: чистый фон, точная фокусировка, минимум лишних деталей. Палитра выдержана в холодных, почти стерильных тонах — под стать теме биотехнологий.",
      "В результате получилась система рендеров, которую клиент использует и сейчас — в презентациях, на сайте и в маркетинговых материалах, без необходимости пересъёмки.",
    ],
    software: ["Cinema 4D", "Redshift", "Substance 3D", "Photoshop"],
    services: ["3D Design", "Creative Direction"],
    aspect: "landscape",
    cover: "/images/projects/biotech/cover.webp",
    hero: "/images/projects/biotech/hero.webp",
    renders: [
      "/images/projects/biotech/render-01.webp",
      "/images/projects/biotech/render-02.webp",
    ],
    process: [
      "/images/projects/biotech/process-01.webp",
      "/images/projects/biotech/process-02.webp",
    ],
  },
  {
    slug: "kozhindev",
    title: "Оформление кейсов для KozhinDev",
    category: "3D Motion & Презентация кейсов",
    year: "2024",
    client: "KozhinDev",
    index: "02",
    summary:
      "Визуальная 3D-система и графический пак для презентации проектов и оформления кейсов IT-студии.",
    description: [
      "Цель проекта — сформировать современный визуальный язык для презентации цифровых продуктов kozhindev. Вместо стандартной плоской демонстрации интерфейсов упор был сделан на объёмные 3D-композиции, атмосферные сцены и кинематографичный свет, повышающие воспринимаемую ценность разработок.",
      "Для проекта был разработан комплект модульных 3D-ассетов, кей-визуалов и анимационных элементов. Использование процедурных текстур, глубокой работы с освещением и мягких облетов камеры позволило превратить абстрактные технологические решения в понятные и запоминающиеся визуальные образы.",
      "Дизайн интерфейсов (UI/UX) предоставлен командой kozhindev. Со своей стороны я полностью отвечал за построение 3D-сцен, работу со светом и материалами, композицию, моушн-дизайн и финальную сборку графического пака.",
    ],
    software: ["Cinema 4D", "Redshift", "After Effects", "Figma"],
    services: ["3D Generalist", "Motion Design", "Visual Direction"],
    aspect: "landscape",
    cover: "/images/projects/kozhindev/cover.webp",
    hero: "/images/projects/kozhindev/hero.webp",
    renders: [
      "/images/projects/kozhindev/render-01.webp",
      "/images/projects/kozhindev/render-02.webp",
      "/images/projects/kozhindev/render-03.webp",
      "/images/projects/kozhindev/render-04.webp",
      "/images/projects/kozhindev/render-05.webp",
      "/images/projects/kozhindev/render-06.webp",
      "/images/projects/kozhindev/render-07.webp",
      "/images/projects/kozhindev/render-08.webp",
    ],
    process: [
      "/images/projects/kozhindev/process-01.webp",
      "/images/projects/kozhindev/process-02.webp",
      "/images/projects/kozhindev/process-03.webp",
    ],
  },
  {
    slug: "ai-content",
    title: "Ai Контент",
    category: "Моушн-дизайн — Рекламная кампания",
    year: "2024",
    client: "Aperture Optics",
    index: "03",
    summary:
      "12-секундный луп о том, как стекло преломляет свет — снят для запуска линейки очков.",
    description: [
      "Aperture Optics хотели один движущийся кадр, который можно беззвучно крутить в витрине магазина, но чтобы он держал внимание не хуже тридцатисекундного телевизионного ролика. Вместо того чтобы ускорять действие, я решил его замедлить.",
      "Одна линза, один источник света и двенадцать секунд преломления — рендер в разрешении, которое держит чёткость даже на пятиметровом экране витрины.",
      "Ролик с тех пор крутится в четырнадцати городах без единой правки — редкий результат для кампании, запущенной на таком раннем этапе жизни продукта.",
    ],
    software: ["Houdini", "Redshift", "After Effects", "DaVinci Resolve"],
    services: ["Motion Design", "Creative Direction"],
    aspect: "landscape",
    cover: "/images/projects/aperture/cover.webp",
    hero: "/images/projects/aperture/hero.webp",
    renders: [
      "/images/projects/aperture/render-01.webp",
      "/images/projects/aperture/render-02.webp",
    ],
    process: [
      "/images/projects/aperture/process-01.webp",
      "/images/projects/aperture/process-02.webp",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
