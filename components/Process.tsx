import Reveal from "./Reveal";

const steps = [
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
];

export default function Process() {
  return (
    <section className="container-studio border-t border-line py-24 md:py-32">
      <Reveal>
        <span className="label">Как я работаю</span>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-4 md:gap-8">
        {steps.map((step, i) => (
          <Reveal
            key={step.index}
            delay={i * 0.08}
            className="border-t border-line pt-6"
          >
            <span className="label">{step.index}</span>
            <h3 className="mt-4 text-2xl font-medium tracking-tighter">
              {step.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {step.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
