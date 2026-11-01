import type { Metadata } from "next";
import { cargarInicio } from "@/lib/contenido";

export const metadata: Metadata = { title: "Aviso legal | Aula de Voz Inma Gomes" };

const PENDIENTE = "pendiente de completar";

// Datos exigidos por el artículo 10 de la LSSI. Se editan en Tina, en "Datos de contacto".
export default async function AvisoLegal() {
  const { data } = await cargarInicio();
  const d = data.pagina?.datos || {};
  return (
    <main className="legal">
      <a className="back" href="/">← Volver al inicio</a>
      <h1>Aviso legal</h1>

      <h2>Titular de la web</h2>
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información (LSSI), estos son los datos de la titular de esta web:</p>
      <ul>
        <li>Titular: {d.titular || PENDIENTE}</li>
        <li>NIF: {d.nif || PENDIENTE}</li>
        <li>Dirección: {d.direccion || PENDIENTE}</li>
        <li>Email: <a href={`mailto:${d.email}`}>{d.email}</a></li>
        <li>Teléfono: {d.telefono}</li>
        <li>Actividad: clases de canto y técnica vocal, con el nombre comercial Aula de Voz Inma Gomes.</li>
      </ul>

      <h2>Precios</h2>
      <p>Los precios que aparecen en la web son precios finales. {d.notaImpuestos}</p>

      <h2>Propiedad intelectual</h2>
      <p>Los textos, fotos y vídeos de esta web pertenecen a Inma Gomes o se usan con permiso de sus autores. No se pueden copiar ni reutilizar sin autorización.</p>

      <h2>Responsabilidad</h2>
      <p>La información de esta web puede actualizarse sin previo aviso. Los enlaces a otras webs, como YouTube o WhatsApp, se ofrecen por comodidad; su contenido es responsabilidad de esas webs.</p>

      <h2>Datos personales</h2>
      <p>Cómo se tratan los datos que me envías por WhatsApp o email se explica en la <a href="/privacidad.html">política de privacidad</a>.</p>

      <h2>Legislación aplicable</h2>
      <p>Esta web se rige por la legislación española.</p>
    </main>
  );
}
