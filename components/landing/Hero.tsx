import React from "react";
import { Button } from "../ui/Button";
import { IconArrowRight, IconCocktail } from "../ui/icons";
import { CheckIcon, highlights } from "./content";
import { RegisterPreview } from "./RegisterPreview";

export const Hero = () => (
  <section className="relative overflow-hidden">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-32 right-[-15%] h-[28rem] w-[28rem] rounded-full bg-brand-300/25 blur-3xl"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-25%] left-[-15%] h-[24rem] w-[24rem] rounded-full bg-sky-300/20 blur-3xl"
    />

    <div className="relative mx-auto grid w-full max-w-content items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="animate-slide-up">
        <span className="pill bg-brand-50 text-brand-700 ring-1 ring-brand-100">
          Internal tool · Sorte Firkant
        </span>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Close the register
          <span className="block bg-gradient-to-r from-brand-600 to-sky-500 bg-clip-text text-transparent">
            without the guesswork.
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          Count the drawer, log every card, MobilePay and invoice, and see
          exactly what the shift brought in — from behind the bar, on the phone
          in your pocket.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            href="/login"
            size="lg"
            trailingIcon={<IconArrowRight className="h-4 w-4" />}
          >
            Sign in to the register
          </Button>
          <Button
            href="/drinks"
            size="lg"
            variant="secondary"
            icon={<IconCocktail className="h-4 w-4" />}
          >
            Browse drinks menu
          </Button>
        </div>

        <ul className="mt-8 flex flex-col gap-2.5">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-ink-muted"
            >
              <CheckIcon className="h-5 w-5 shrink-0 text-emerald-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="animate-fade-in lg:pl-4">
        <RegisterPreview />
      </div>
    </div>
  </section>
);
