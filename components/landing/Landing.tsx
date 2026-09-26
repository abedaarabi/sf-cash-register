import Head from "next/head";
import React from "react";
import { Button } from "../ui/Button";
import { IconArrowRight } from "../ui/icons";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { LandingFooter } from "./LandingFooter";
import { Steps } from "./Steps";

export const Landing = () => (
  <>
    <Head>
      <title>Sorte Firkant · Cash Register</title>
      <meta
        name="description"
        content="The internal cash-up tool for Sorte Firkant: count the drawer, log every payment, track cash out and review the numbers behind every shift."
      />
      <meta property="og:title" content="Sorte Firkant · Cash Register" />
      <meta
        property="og:description"
        content="Count the drawer, log every payment and close the register from behind the bar."
      />
      <meta property="og:image" content="/icons/icon-512.png" />
      <meta property="og:type" content="website" />
    </Head>

    <Hero />
    <Features />
    <Steps />

    <section className="mx-auto w-full max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-surface-inverted px-6 py-12 text-center shadow-card sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl"
        />
        <div className="relative">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to close tonight&apos;s register?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
            Sign in with your staff account. Need access? Ask an admin to create
            one for you.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href="/login"
              size="lg"
              trailingIcon={<IconArrowRight className="h-4 w-4" />}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </section>

    <LandingFooter />
  </>
);
