import React from "react";
import { features } from "./content";

export const Features = () => (
  <section
    id="features"
    className="mx-auto w-full max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
  >
    <div className="mx-auto max-w-2xl text-center">
      <span className="section-title justify-center">What it does</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Everything a shift needs, in one place
      </h2>
      <p className="mt-4 text-base text-ink-muted">
        No spreadsheets, no notes on the back of a receipt. The whole cash-up
        lives in one app the entire team can reach.
      </p>
    </div>

    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map(({ title, body, icon: Icon }) => (
        <article key={title} className="card-interactive h-full p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
        </article>
      ))}
    </div>
  </section>
);
