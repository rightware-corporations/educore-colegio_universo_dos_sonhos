import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ColusMark } from "./ColusMark";

type HeaderTheme = "hidden" | "transparent" | "light" | "dark";

const links = [
  ["O Colégio", "o-colegio"],
  ["Experiência", "experiencia"],
  ["Futuro", "futuro"],
  ["Comunidade", "comunidade"],
  ["Contactos", "contactos"],
] as const;

export function LandingHeader() {
  const [theme, setTheme] = useState<HeaderTheme>("hidden");
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [autoHidden, setAutoHidden] = useState(false);
  const lastScrollY = useRef(0);
  const directionDistance = useRef(0);

  useEffect(() => {
    const themed = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme]"),
    );

    const themeObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const next = (visible.target as HTMLElement).dataset.headerTheme as HeaderTheme;
          if (next) setTheme(next);
        }
      },
      { rootMargin: "-24% 0px -56% 0px", threshold: [0, 0.05, 0.15] },
    );

    themed.forEach((node) => themeObserver.observe(node));

    const anchors = links
      .map(([, id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    const anchorObserver = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActive(current.target.id);
      },
      { rootMargin: "-30% 0px -58% 0px", threshold: 0 },
    );

    anchors.forEach((node) => anchorObserver.observe(node));

    return () => {
      themeObserver.disconnect();
      anchorObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (theme === "hidden") {
      setOpen(false);
      setAutoHidden(false);
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      if (open) {
        setAutoHidden(false);
        lastScrollY.current = window.scrollY;
        directionDistance.current = 0;
        return;
      }

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < window.innerHeight * 0.85) {
        setAutoHidden(false);
        directionDistance.current = 0;
      } else if (delta > 0) {
        directionDistance.current = Math.max(0, directionDistance.current) + delta;
        if (directionDistance.current >= 16) setAutoHidden(true);
      } else if (delta < 0) {
        directionDistance.current = Math.min(0, directionDistance.current) + delta;
        if (directionDistance.current <= -8) setAutoHidden(false);
      }

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const skipLink = (
    <a
      href="#conteudo-principal"
      className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-colus-orange px-4 py-2 text-sm font-bold text-colus-ink transition focus:translate-y-0"
    >
      Saltar para o conteúdo
    </a>
  );

  if (theme === "hidden") return skipLink;

  const dark = theme === "dark" || theme === "transparent";

  return (
    <>
      {skipLink}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition duration-300 lg:pt-0",
        autoHidden ? "-translate-y-full" : "translate-y-0",
        theme === "transparent" ? "bg-transparent" : "",
        theme === "dark" ? "border-b border-white/10 bg-colus-ink/90 backdrop-blur-md" : "",
        theme === "light" ? "border-b border-black/5 bg-colus-white/90 backdrop-blur-md" : "",
        ].join(" ")}
      >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-5 md:px-8 lg:h-[72px] lg:px-16">
        <a href="#top" aria-label="Colégio Universo dos Sonhos" className="shrink-0">
          <ColusMark className="h-11 w-14" compact />
        </a>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={[
                "relative py-2 text-sm font-semibold transition-colors",
                dark ? "text-white/80 hover:text-white" : "text-colus-text/75 hover:text-colus-text",
              ].join(" ")}
            >
              {label}
              {active === id && (
                <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-5 rounded-full bg-colus-orange" />
              )}
            </a>
          ))}
        </nav>

        <a
          href="#contactos"
          className={[
            "ml-auto hidden rounded-full px-5 py-2.5 text-sm font-bold transition lg:inline-flex",
            dark
              ? "bg-colus-orange text-colus-ink hover:translate-y-[-1px]"
              : "bg-colus-ink text-white hover:translate-y-[-1px]",
          ].join(" ")}
        >
          Marcar uma visita
        </a>

        <button
          type="button"
          className={[
            "ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden",
            dark ? "text-white" : "text-colus-ink",
          ].join(" ")}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className={dark ? "bg-colus-ink text-white" : "bg-colus-white text-colus-ink"}>
          <nav className="mx-auto grid max-w-[1440px] gap-1 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-2 md:px-8 lg:pb-6">
            {links.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-xl px-3 py-3 text-base font-semibold"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contactos"
              className="mt-2 rounded-full bg-colus-orange px-5 py-3 text-center text-sm font-bold text-colus-ink"
              onClick={() => setOpen(false)}
            >
              Marcar uma visita
            </a>
          </nav>
        </div>
      )}
      </header>
    </>
  );
}
