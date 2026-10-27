"use client";

import { useEffect } from "react";

// Menú móvil, cabecera sólida, botones fijos, preselección del formulario y validación accesible.
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

    // Los botones de cada precio preseleccionan la opción del formulario
    const interes = document.getElementById("f-interes") as HTMLSelectElement;
    const onDoc = (e: Event) => {
      const a = (e.target as Element).closest<HTMLElement>("[data-interes]");
      if (a && interes) interes.value = a.dataset.interes!;
    };
    document.addEventListener("click", onDoc);

    // Validación accesible del formulario
    const form = document.querySelector<HTMLFormElement>('form[name="contacto"]');
    const onSubmit = (e: Event) => {
      let first: HTMLInputElement | null = null;
      form.querySelectorAll<HTMLInputElement>("[required]").forEach((f) => {
        const ok = f.checkValidity();
        f.closest(".field")!.classList.toggle("invalid", !ok);
        f.setAttribute("aria-invalid", String(!ok));
        if (!ok && !first) first = f;
      });
      if (first) { e.preventDefault(); (first as HTMLInputElement).focus(); }
    };
    const onInput = (e: Event) => {
      const f = e.target as HTMLInputElement;
      const field = f.closest(".field");
      if (f.required && field?.classList.contains("invalid") && f.checkValidity()) {
        field.classList.remove("invalid");
        f.setAttribute("aria-invalid", "false");
      }
    };
    form?.addEventListener("submit", onSubmit);
    form?.addEventListener("input", onInput);

    return () => {
      btn.removeEventListener("click", onBtn);
      links.removeEventListener("click", onLinks);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", update);
      document.removeEventListener("click", onDoc);
      form?.removeEventListener("submit", onSubmit);
      form?.removeEventListener("input", onInput);
      observers.forEach((o) => o.disconnect());
    };
  }, []);
  return null;
}
