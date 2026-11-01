"use client";

import { useEffect } from "react";

// Menú móvil, cabecera sólida, botones fijos y aparición suave al hacer scroll.
export default function Comportamiento() {
  useEffect(() => {
    const header = document.getElementById("top")!;
    const btn = header.querySelector<HTMLButtonElement>(".menu-btn")!;
    const links = document.getElementById("nav-links")!;
    const setOpen = (o: boolean) => {
      header.classList.toggle("open", o);
      btn.setAttribute("aria-expanded", String(o));
      btn.lastElementChild!.textContent = o ? "Cerrar" : "Menú";
    };
    const onBtn = () => setOpen(btn.getAttribute("aria-expanded") !== "true");
    const onLinks = (e: Event) => { if ((e.target as Element).closest("a")) setOpen(false); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && header.classList.contains("open")) { setOpen(false); btn.focus(); }
    };
    btn.addEventListener("click", onBtn);
    links.addEventListener("click", onLinks);
    document.addEventListener("keydown", onKey);

    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contacto");
    const sticky = document.querySelectorAll(".sticky-cta");
    let pastHero = false, atContact = false;
    const update = () => {
      header.classList.toggle("solid", window.scrollY > 40);
      sticky.forEach((s) => s.classList.toggle("show", pastHero && !atContact));
    };
    const observers: IntersectionObserver[] = [];
    if ("IntersectionObserver" in window) {
      const o1 = new IntersectionObserver((e) => {
        pastHero = !e[0].isIntersecting && e[0].boundingClientRect.top < 0; update();
      }, { rootMargin: "-80px 0px 0px 0px" });
      const ctas = hero?.querySelector(".hero-ctas");
      if (ctas) o1.observe(ctas); else pastHero = true;
      const o2 = new IntersectionObserver((e) => { atContact = e[0].isIntersecting; update(); });
      if (contact) o2.observe(contact);
      observers.push(o1, o2);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();

    // Aparición suave al hacer scroll. Solo se ocultan si el navegador puede volver a mostrarlos.
    let revelar: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revelar = new IntersectionObserver((entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("visto");
          revelar!.unobserve(el);
          setTimeout(() => { el.style.transitionDelay = ""; }, 1200);
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      const grupos = [
        ".section-head", ".motto blockquote", ".about-grid > *", ".pillar", ".price-card",
        ".community > *", ".gallery figure", ".video", ".listen-cta", ".quote",
        ".faq-grid > *", ".contact-grid > *",
      ];
      document.querySelectorAll<HTMLElement>(grupos.join(",")).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        const hermanos = Array.from(el.parentElement!.children).filter((h) => h.matches(grupos.join(",")));
        el.style.transitionDelay = `${(hermanos.indexOf(el) % 4) * 90}ms`;
        el.classList.add("revelar");
        revelar!.observe(el);
      });
    }


    return () => {
      btn.removeEventListener("click", onBtn);
      links.removeEventListener("click", onLinks);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", update);
      observers.forEach((o) => o.disconnect());
      revelar?.disconnect();
    };
  }, []);
  return null;
}
