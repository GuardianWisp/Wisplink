import Link from "next/link";
import Doodle from "@/components/Doodle";

export default function NotFound() {
  return (
    <div className="container-studio flex min-h-[70vh] flex-col justify-center py-24">
      <span className="relative inline-block w-fit">
        <span className="label">404</span>
        <Doodle
          variant="circle"
          className="absolute -inset-x-3 -inset-y-2 h-auto w-[calc(100%+1.5rem)]"
          delay={0.4}
        />
      </span>
      <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-tightest">
        Такой страницы не существует.
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        Страница, которую вы ищете, могла переехать. Вернитесь к проектам
        или напишите напрямую.
      </p>
      <div className="mt-10 flex gap-6">
        <Link
          href="/"
          className="label border border-ink px-6 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          На главную →
        </Link>
      </div>
    </div>
  );
}
