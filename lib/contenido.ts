import fs from "node:fs/promises";
import path from "node:path";

export type ContenidoInicio = {
  query: string;
  variables: Record<string, unknown>;
  data: { pagina: any };
};

// Lee la página desde Tina (nube o servidor local). Si no está disponible,
// usa directamente el archivo del repositorio para que la web siempre se genere.
export async function cargarInicio(): Promise<ContenidoInicio> {
  try {
    const { default: client } = await import("@/tina/__generated__/client");
    const res = await client.queries.pagina({ relativePath: "inicio.json" });
    return { query: res.query, variables: res.variables, data: res.data as any };
  } catch {
    const archivo = path.join(process.cwd(), "content/pagina/inicio.json");
    const pagina = JSON.parse(await fs.readFile(archivo, "utf8"));
    return { query: "", variables: {}, data: { pagina } };
  }
}

// Bloques visibles de un tipo (portada, precios, preguntas…), estén donde estén en la página.
export function bloquesDe(pagina: any, tipo: string): any[] {
  return (pagina?.bloques || []).filter((b: any) => {
    if (!b || b.ocultar) return false;
    const t = b._template || String(b.__typename || "").replace(/^PaginaBloques/, "");
    return t.toLowerCase() === tipo.toLowerCase();
  });
}
