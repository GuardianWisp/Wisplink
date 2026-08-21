import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "content/home.json");

export type HomeSettings = {
  image?: string;
  alt?: string;
};

/** Homepage hero image, set via the CMS "Главная страница" singleton — empty until uploaded. */
export function getHomeSettings(): HomeSettings {
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as HomeSettings;
  } catch {
    return {};
  }
}
