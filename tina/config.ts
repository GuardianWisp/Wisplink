import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",

  // From TinaCloud (app.tina.io) once you connect this repo — see README.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "project",
        label: "Проекты",
        path: "content/projects",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Название",
            isTitle: true,
            required: true,
          },
          { type: "string", name: "category", label: "Категория" },
          { type: "string", name: "year", label: "Год" },
          { type: "string", name: "client", label: "Клиент" },
          {
            type: "string",
            name: "index",
            label: "Порядок (01, 02, 03…)",
            description: "Управляет сортировкой по всему сайту.",
          },
          {
            type: "string",
            name: "summary",
            label: "Краткое описание",
            ui: { component: "textarea" },
          },
          { type: "string", name: "software", label: "Софт", list: true },
          {
            type: "string",
            name: "services",
            label: "Теги / услуги",
            list: true,
            description: "Питает фильтр по тегам на главной.",
          },
          {
            type: "string",
            name: "aspect",
            label: "Пропорции карточки на главной",
            options: ["portrait", "landscape", "square"],
          },
          { type: "image", name: "cover", label: "Обложка (список проектов)" },
          { type: "image", name: "hero", label: "Hero-изображение" },
          {
            type: "object",
            name: "renders",
            label: "Рендеры (галерея)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.src }) },
            fields: [
              { type: "image", name: "src", label: "Изображение", required: true },
              {
                type: "string",
                name: "size",
                label: "Размер в сетке",
                options: ["sm", "md", "lg", "xl"],
              },
              {
                type: "string",
                name: "aspect",
                label: "Пропорции (опционально)",
                options: ["portrait", "landscape", "square", "wide"],
              },
            ],
          },
          {
            type: "object",
            name: "process",
            label: "Процесс (галерея)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.src }) },
            fields: [
              { type: "image", name: "src", label: "Изображение", required: true },
              {
                type: "string",
                name: "size",
                label: "Размер в сетке",
                options: ["sm", "md", "lg", "xl"],
              },
              {
                type: "string",
                name: "aspect",
                label: "Пропорции (опционально)",
                options: ["portrait", "landscape", "square", "wide"],
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Описание проекта",
            isBody: true,
          },
        ],
      },
      {
        name: "post",
        label: "Журнал",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Заголовок",
            isTitle: true,
            required: true,
          },
          { type: "datetime", name: "date", label: "Дата" },
          {
            type: "string",
            name: "excerpt",
            label: "Краткое описание",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "tags",
            label: "Теги",
            list: true,
            description: "Питает фильтр по тегам в журнале.",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Текст записи",
            isBody: true,
          },
        ],
      },
    ],
  },
});
