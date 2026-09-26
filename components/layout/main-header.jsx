import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import { admin } from "../../helper/emailAdmin";
import { IconArrowRight, IconClose, IconLogout, IconMenu } from "../ui/icons";
import { Logo } from "../ui/Logo";
import { getInitials, navItems } from "./nav-items";

const MainHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/login");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  React.useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    router.events.on("routeChangeStart", closeMenu);
    return () => router.events.off("routeChangeStart", closeMenu);
  }, [router.events]);

  const isAdmin = admin.includes(user?.email);
  const links = user
    ? navItems.filter((item) => !item.adminOnly || isAdmin)
    : [];

  const linkClasses = (href) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
      router.pathname === href
        ? "bg-white/15 text-white shadow-header"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  const mobileDrawer =
    user && isOpen ? (
      <div
        className="fixed inset-0 z-[200] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div
          className="absolute inset-0 animate-fade-in bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <aside
          className="absolute right-0 top-0 z-10 flex h-[100dvh] w-[min(20rem,85vw)] animate-slide-in-right flex-col gap-4 border-l border-white/10 bg-surface-inverted p-5 shadow-2xl"
          style={{
            paddingTop: "calc(1.25rem + env(safe-area-inset-top))",
            paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/90 text-sm font-bold text-white">
                {getInitials(user?.displayName)}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-white">
                  {user?.displayName || "Team member"}
                </span>
                <span className="block text-xs text-slate-400">
                  {isAdmin ? "Admin" : "Staff"}
                </span>
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close menu"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain">
            <ul className="flex flex-col gap-1">
              {links.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link href={href}>
                    <a
                      className={`${linkClasses(href)} min-h-[3rem] text-base`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={handleSignOut}
            className="inline-flex min-h-[3rem] shrink-0 items-center justify-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/15 px-4 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/25"
          >
            <IconLogout className="h-5 w-5" />
            Log Out
          </button>
        </aside>
      </div>
    ) : null;

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-white/10 bg-surface-inverted/95"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-3 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <Link href="/">
            <a className="flex items-center">
              <Logo subtitle="Cash Register" tone="light" />
            </a>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link href={href}>
                    <a
                      className={linkClasses(href)}
                      aria-current={
                        router.pathname === href ? "page" : undefined
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {!user && router.pathname !== "/login" && (
              <Link href="/login">
                <a className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700">
                  Sign in
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </Link>
            )}

            {user && (
              <div className="hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 md:flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500/90 text-xs font-bold text-white">
                  {getInitials(user?.displayName)}
                </span>
                <span className="leading-tight">
                  <span className="block max-w-[10rem] truncate text-xs font-semibold text-white">
                    {user?.displayName || "Team member"}
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {isAdmin ? "Admin" : "Staff"}
                  </span>
                </span>
              </div>
            )}

            {user && (
              <button
                onClick={handleSignOut}
                className="hidden items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/15 px-3 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/25 lg:inline-flex"
              >
                <IconLogout className="h-4 w-4" />
                Log Out
              </button>
            )}

            {user && (
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <IconClose className="h-5 w-5" />
                ) : (
                  <IconMenu className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {mounted && mobileDrawer ? createPortal(mobileDrawer, document.body) : null}
    </>
  );
};

export default MainHeader;
