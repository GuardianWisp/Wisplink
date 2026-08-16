/**
 * A gallery image, in the simplest case just a path. To control how much
 * visual weight it gets in the gallery grid, use the object form instead:
 *
 *   "/images/projects/silt/render-02.webp"                          // default size
 *   { src: "/images/projects/silt/render-02.webp", size: "xl" }      // full-width feature
 *   { src: "/images/projects/silt/render-03.webp", size: "sm" }      // small accent tile
 *
 * size: "sm" | "md" | "lg" | "xl" (defaults to an automatic rhythm if omitted)
 * aspect: optional override — otherwise a sensible aspect is picked per size
 */
export type GalleryImage =
  | string
  | {
    src: string;
    size?: "sm" | "md" | "lg" | "xl";
    aspect?: "portrait" | "landscape" | "square" | "wide";
  };

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
  renders: GalleryImage[];
  process: GalleryImage[];
};

export const projects: Project[] = [
  {
    slug: "akvabur",
    title: "АкваБур",
    category: "AI-контент — Сайт компании",
    year: "2025",
    client: "АкваБур",
    index: "01",
    summary:
      "Полный текст сайта бурового подрядчика, написанный через AI так, чтобы читаться как текст инженера с реальным опытом — не как SEO-заливка.",
    description: [
      "У бурового бизнеса особая проблема с доверием: рынок наводнён недобросовестными подрядчиками, и текст на сайте часто становится первым, на чём клиент решает — звонить или листать дальше. Клиенту нужен был контент для всего сайта — услуги, о компании, FAQ — который читается как написанный инженером с опытом, а не как сгенерированный SEO-текст ни о чём.",
      "Я не просто просил AI «написать текст про бурение скважин» — собрал техническую базу заранее: диаметры обсадных труб, глубины залегания воды по регионам, типы грунтов, разница между роторным и ударно-канатным бурением, реальные сроки и этапы работ. Каждый абзац после генерации проходил через ручную проверку фактов и несколько проходов редактуры — убирал типичные обороты и клише, которые выдают нейросеть с первого предложения.",
      "Итог — контент, который не считывается как сгенерированный: конкретные цифры вместо общих фраз, реальная терминология вместо маркетингового «мы лучшие». Клиент получил готовый текст для всего сайта быстрее, чем при заказе у копирайтера, но без потери в доверии — а в этой нише доверие решает всё.",
    ],
    software: ["ChatGPT", "Claude", "Perplexity", "SurferSEO"],
    services: ["AI"],
    aspect: "landscape",
    cover: "",
    hero: "",
    renders: [],
    process: [],
  },
  {
    slug: "biotech",
    title: "Biotech",
    category: "3D Design — Визуализация микроорганизмов",
    year: "2023",
    client: "Artlife Biotech",
    index: "02",
    summary:
      "Исследование биологических структур, переведённое в футуристичную 3D-визуальную систему.",
    description: [
      "Biotech начался как задача показать невидимое: как выглядят биологические структуры и микроорганизмы, если довести их форму до чистой, футуристичной 3D-графики. Бренду Artlife Biotech нужен был визуальный язык, который не копирует фотографию или снимки под микроскопом буквально, а превращает научную тему в самостоятельный, запоминающийся образ.",
      "Я построил библиотеку органических, клеточных форм и выстроил свет так, будто это кадры из лаборатории будущего: чистый фон, точная фокусировка, минимум лишних деталей. Палитра выдержана в холодных, почти стерильных тонах — под стать теме биотехнологий.",
      "В результате получилась система рендеров, которую клиент использует и сейчас — в презентациях, на сайте и в маркетинговых материалах, без необходимости пересъёмки.",
    ],
    software: ["Cinema 4D", "Redshift", "Substance 3D", "Photoshop"],
    services: ["3D Design"],
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
    index: "03",
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
    slug: "archive",
    title: "Архив",
    category: "Личные работы — Архив",
    year: "2022–2025",
    client: "Личный архив",
    index: "04",
    summary:
      "Разные рендеры без общего брифа и клиента — то, что копилось между заказными проектами и жалко было не показать вообще.",
    description: [
      "Не всё, что делается между заказными проектами, попадает в портфолио отдельным кейсом — часть работ так и остаётся черновиками, экспериментами или личными пробами техники. Здесь — то, что жалко было не показать вообще.",
      "Эти рендеры не объединены общим брифом или клиентом: где-то тестировал новый подход к свету, где-то отрабатывал материал, где-то просто хотелось сделать красиво без задачи от заказчика. Раздел будет пополняться по мере того, как в столе накапливается что-то, что стоит вытащить на свет.",
      "Смотреть стоит не как на связный кейс, а как на срез процесса между большими проектами — то, из чего вырастают идеи для следующих работ.",
    ],
    software: ["Cinema 4D", "Blender", "Redshift", "Photoshop"],
    services: ["3D Design", "Личные работы"],
    aspect: "square",
    cover: "",
    hero: "",
    renders: [],
    process: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
