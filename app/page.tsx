import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Inicio from "@/components/Inicio";
import { cargarInicio, bloquesDe } from "@/lib/contenido";

const URL = "https://auladevozinmagomes.com/";

// WhatsApp y algunas redes no muestran WebP: para compartir se usa la versión JPG si existe.
const fotoParaCompartir = (src?: string) => {
  if (!src) return "";
  const jpg = src.replace(/\.webp$/, ".jpg");
  return existsSync(join(process.cwd(), "public", jpg)) ? jpg : src;
};

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await cargarInicio();
  const p = data.pagina;
  const portada = bloquesDe(p, "portada")[0];
  return {
    title: p.seo?.titulo,
    description: p.seo?.descripcion,
    alternates: { canonical: URL },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: "Aula de Voz Inma Gomes",
      title: "Aula de Voz Inma Gomes · Clases de canto en Barcelona y online",
      description: p.seo?.descripcionRedes,
      url: URL,
      images: portada?.imagen ? [URL + fotoParaCompartir(portada.imagen).replace(/^\//, "")] : [],
    },
  };
}

export default async function Page() {
  const contenido = await cargarInicio();
  const p = contenido.data.pagina;
  const d = p.datos || {};
  const portada = bloquesDe(p, "portada")[0];
  const tarifas = bloquesDe(p, "precios").flatMap((b: any) => b.tarifas || []);
  const faqs = bloquesDe(p, "preguntas").flatMap((b: any) => b.lista || []);
  const importe = (t: any) => (/gratis/i.test(t.precio || "") ? "0" : (t.precio || "").replace(/[^\d,.]/g, "").replace(",", "."));
  const escuela = {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    name: "Aula de Voz Inma Gomes",
    url: URL,
    image: URL + fotoParaCompartir(portada?.imagen).replace(/^\//, ""),
    description: "Clases de canto personalizadas, presenciales en Sants (Barcelona) y online, con Inma Gomes, vocal coach y entrenadora vocal.",
    founder: { "@type": "Person", name: "Inma Gomes", jobTitle: "Vocal coach y entrenadora vocal" },
    telephone: "+34" + (d.telefono || "").replace(/\D/g, ""),
    email: d.email,
    address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressRegion: "Sants", addressCountry: "ES" },
    areaServed: ["Sants", "Barcelona", "Online"],
    sameAs: d.youtube ? [d.youtube] : [],
    makesOffer: tarifas.map((t: any) => ({ "@type": "Offer", name: t.nombre, price: importe(t), priceCurrency: "EUR" })),
  };
  // Nombre del sitio que Google muestra encima de la dirección en los resultados
  const sitio = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aula de Voz Inma Gomes",
    alternateName: ["Inma Gomes", "Aula de Voz"],
    url: URL,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((q: any) => ({
      "@type": "Question",
      name: q.pregunta,
      acceptedAnswer: { "@type": "Answer", text: q.respuesta },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sitio) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(escuela) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <Inicio {...contenido} />
    </>
  );
}
