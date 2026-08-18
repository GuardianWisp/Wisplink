"use client";

import { useEffect } from "react";

// Repo owner/name this CMS commits to — update if you rename or fork it.
const REPO = "GuardianWisp/Wisplink";

const imageField = { label: "Изображение", name: "src", widget: "image" };

const gallerySizeField = {
  label: "Размер в сетке",
  name: "size",
  widget: "select",
  options: ["sm", "md", "lg", "xl"],
  required: false,
};

const galleryAspectField = {
  label: "Пропорции (опционально)",
  name: "aspect",
  widget: "select",
  options: ["portrait", "landscape", "square", "wide"],
  required: false,
};

const CMS_CONFIG = {
  backend: {
    name: "github",
    repo: REPO,
    branch: "main",
    base_url:
      typeof window !== "undefined" ? window.location.origin : undefined,
    auth_endpoint: "api/auth",
  },
  media_folder: "public/images/uploads",
  public_folder: "/images/uploads",
  collections: [
    {
      name: "projects",
      label: "Проекты",
      folder: "content/projects",
      extension: "mdx",
      format: "frontmatter",
      create: true,
      slug: "{{fields.slug}}",
      fields: [
        {
          label: "URL проекта (латиницей, без пробелов)",
          name: "slug",
          widget: "string",
          hint: "Например: novyi-proekt — станет адресом /work/novyi-proekt",
          required: false,
        },
        { label: "Название", name: "title", widget: "string" },
        { label: "Категория", name: "category", widget: "string" },
        { label: "Год", name: "year", widget: "string" },
        { label: "Клиент", name: "client", widget: "string" },
        {
          label: "Порядок (01, 02, 03…)",
          name: "index",
          widget: "string",
          hint: "Управляет сортировкой по всему сайту",
        },
        { label: "Краткое описание", name: "summary", widget: "text" },
        { label: "Софт", name: "software", widget: "list", required: false },
        {
          label: "Теги / услуги",
          name: "services",
          widget: "list",
          required: false,
          hint: "Питает фильтр по тегам на главной",
        },
        {
          label: "Пропорции карточки на главной",
          name: "aspect",
          widget: "select",
          options: ["portrait", "landscape", "square"],
        },
        {
          label: "Обложка (список проектов)",
          name: "cover",
          widget: "image",
          required: false,
        },
        {
          label: "Hero-изображение",
          name: "hero",
          widget: "image",
          required: false,
        },
        {
          label: "Рендеры (галерея)",
          name: "renders",
          widget: "list",
          required: false,
          fields: [imageField, gallerySizeField, galleryAspectField],
        },
        {
          label: "Процесс (галерея)",
          name: "process",
          widget: "list",
          required: false,
          fields: [imageField, gallerySizeField, galleryAspectField],
        },
        { label: "Описание проекта", name: "body", widget: "markdown" },
      ],
    },
    {
      name: "posts",
      label: "Журнал",
      folder: "content/posts",
      extension: "mdx",
      format: "frontmatter",
      create: true,
      slug: "{{fields.slug}}",
      fields: [
        {
          label: "URL записи (латиницей, без пробелов)",
          name: "slug",
          widget: "string",
          hint: "Например: novyi-post — станет адресом /blog/novyi-post",
          required: false,
        },
        { label: "Заголовок", name: "title", widget: "string" },
        { label: "Дата", name: "date", widget: "datetime" },
        { label: "Краткое описание", name: "excerpt", widget: "text" },
        {
          label: "Теги",
          name: "tags",
          widget: "list",
          required: false,
          hint: "Питает фильтр по тегам в журнале",
        },
        { label: "Текст записи", name: "body", widget: "markdown" },
      ],
    },
  ],
};

export default function AdminPage() {
  useEffect(() => {
    // Tells the bundle not to auto-init itself by fetching a config.yml —
    // that auto-behaviour is what kept 404ing regardless of how the file
    // was served. This flag must exist *before* the script below runs,
    // which is guaranteed here since both happen synchronously in order.
    (window as unknown as { CMS_MANUAL_INIT?: boolean }).CMS_MANUAL_INIT =
      true;

    const script = document.createElement("script");
    script.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
    script.onload = () => {
      (
        window as unknown as { CMS: { init: (opts: unknown) => void } }
      ).CMS.init({ config: CMS_CONFIG });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="nc-root" />;
}
