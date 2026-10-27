import type { Metadata } from "next";
import Inicio from "@/components/Inicio";
import { cargarInicio } from "@/lib/contenido";

const URL = "https://auladevozinmagomes.net/";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await cargarInicio();
  const p = data.pagina;
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
      images: p.portada?.imagen ? [URL + p.portada.imagen.replace(/^\//, "")] : [],
    },
  };
}

export default async function Page() {
  const contenido = await cargarInicio();
  const p = contenido.data.pagina;
  const tarifas = p.precios?.tarifas || [];
  const importe = (t: any) => (/gratis/i.test(t.precio || "") ? "0" : (t.precio || "").replace(/[^\d,.]/g, "").replace(",", "."));
  const escuela = {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    name: "Aula de Voz Inma Gomes",
    url: URL,
    image: URL + (p.portada?.imagen || "").replace(/^\//, ""),
    description: "Clases de canto personalizadas, presenciales en Sants (Barcelona) y online, con Inma Gomes, vocal coach y entrenadora vocal.",
    founder: { "@type": "Person", name: "Inma Gomes", jobTitle: "Vocal coach y entrenadora vocal" },
    telephone: "+34" + (p.contacto?.telefono || "").replace(/\D/g, ""),
    email: p.contacto?.email,
    address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressRegion: "Sants", addressCountry: "ES" },
    areaServed: ["Sants", "Barcelona", "Online"],
    sameAs: p.contacto?.youtube ? [p.contacto.youtube] : [],
    makesOffer: tarifas.map((t: any) => ({ "@type": "Offer", name: t.nombre, price: importe(t), priceCurrency: "EUR" })),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (p.preguntas?.lista || []).map((q: any) => ({
      "@type": "Question",
      name: q.pregunta,
      acceptedAnswer: { "@type": "Answer", text: q.respuesta },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(escuela) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <Inicio {...contenido} />
    </>
  );
}
