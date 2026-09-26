import React from "react";
import { steps } from "./content";

export const Steps = () => (
  <section className="border-y border-line bg-surface/70">
    <div className="mx-auto w-full max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-title justify-center">How it works</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Three steps at the end of the night
        </h2>
      </div>

      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map(({ title, body }, index) => (
          <li key={title} className="card h-full p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-inverted text-sm font-bold text-white">
              {index + 1}
            </span>
            <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
