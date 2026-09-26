import Link from "next/link";
import React from "react";
import { LogoMark } from "../ui/Logo";

export const LandingFooter = () => (
  <footer className="border-t border-line bg-surface">
    <div className="mx-auto flex w-full max-w-content flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="flex items-center gap-3">
        <LogoMark className="h-9 w-9" />
        <span className="leading-tight">
          <span className="block text-sm font-bold text-ink">
            Sorte Firkant
          </span>
          <span className="block text-xs text-ink-muted">
            Cash Register · internal tool
          </span>
        </span>
      </div>

      <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <Link href="/drinks">
          <a className="text-ink-muted transition hover:text-ink">
            Drinks menu
          </a>
        </Link>
        <Link href="/login">
          <a className="text-ink-muted transition hover:text-ink">Sign in</a>
        </Link>
        <Link href="/rest">
          <a className="text-ink-muted transition hover:text-ink">
            Reset password
          </a>
        </Link>
      </nav>

      <p className="text-xs text-ink-subtle">
        © {new Date().getFullYear()} Sorte Firkant. Staff access only.
      </p>
    </div>
  </footer>
);
