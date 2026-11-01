import { defineConfig, type TinaField, type Template } from "tinacms";

const texto = (name: string, label: string, extra: Partial<TinaField> = {}): TinaField =>
  ({ type: "string", name, label, ...extra } as TinaField);
const parrafo = (name: string, label: string): TinaField =>
  texto(name, label, { ui: { component: "textarea" } } as Partial<TinaField>);
const foto = (name: string, label: string): TinaField => ({ type: "image", name, label });
const lista = (name: string, label: string, etiqueta: string, fields: TinaField[]): TinaField =>
  ({
    type: "object",
    name,
    label,
    list: true,
    ui: { itemProps: (item: Record<string, string>) => ({ label: item?.[etiqueta] }) },
    fields,
  } as TinaField);

const ocultar: TinaField = { type: "boolean", name: "ocultar", label: "Ocultar esta sección" };
const cabecera = [texto("antetitulo", "Texto pequeño sobre el título"), texto("titulo", "Título")];

// Cada sección de la página es un bloque que se puede mover, ocultar, añadir o borrar.
const bloque = (name: string, label: string, fields: TinaField[], defaultItem: Record<string, unknown> = {}): Template => ({
  name,
  label,
  ui: { defaultItem: { ocultar: false, ...defaultItem } },
  fields: [ocultar, ...fields],
});

const bloques: Template[] = [
  bloque("portada", "Portada", [
    foto("imagen", "Foto de portada"),
    texto("textoAlternativo", "Descripción de la foto (accesibilidad)"),
    texto("antetitulo", "Texto pequeño sobre el título"),
    texto("titulo", "Título"),
    texto("tituloDestacado", "Final del título (en dorado)"),
    parrafo("texto", "Texto"),
    texto("credenciales", "Formación destacada (línea pequeña bajo el texto)"),
    texto("botonPrincipal", "Botón principal"),
    texto("botonSecundario", "Botón secundario"),
  ], { titulo: "Título de la portada", botonPrincipal: "Reservar clase de prueba", botonSecundario: "Ver precios" }),
  bloque("lema", "Cita", [parrafo("frase", "Frase"), texto("autora", "Autora")], { autora: "Inma Gomes" }),
  bloque("metodo", "Mi forma de trabajar", [
    ...cabecera,
    parrafo("texto", "Texto"),
    lista("pilares", "Puntos", "titulo", [texto("titulo", "Título"), parrafo("texto", "Texto")]),
  ], { titulo: "Mi forma de trabajar" }),
  bloque("sobreMi", "Sobre mí", [
    foto("foto", "Foto"),
    texto("textoAlternativo", "Descripción de la foto (accesibilidad)"),
    ...cabecera,
    parrafo("entradilla", "Primer párrafo (más grande)"),
    parrafo("texto", "Segundo párrafo"),
    texto("formacion", "Formación", { list: true } as Partial<TinaField>),
  ], { titulo: "Hola, soy Inma Gomes" }),
  bloque("precios", "Tarifas", [
    ...cabecera,
    parrafo("texto", "Texto"),
    texto("aviso", "Aviso destacado"),
    lista("tarifas", "Tarifas", "nombre", [
      texto("nombre", "Nombre"),
      { type: "boolean", name: "destacada", label: "Destacada (fondo oscuro)" },
      texto("etiqueta", "Etiqueta (solo si está destacada)"),
      texto("incluye", "Qué incluye", { list: true } as Partial<TinaField>),
      texto("precio", "Precio (por ejemplo: 40 € o Gratis)"),
      texto("unidad", "Unidad (por ejemplo: al mes)"),
      texto("nota", "Nota bajo el precio"),
      texto("boton", "Texto del botón"),
    ]),
  ], { titulo: "Tarifas" }),
  bloque("conciertos", "Conciertos", [
    ...cabecera,
    foto("fotoGrupo", "Foto del grupo"),
    texto("textoAlternativoGrupo", "Descripción de la foto (accesibilidad)"),
    parrafo("entradilla", "Primer párrafo (más grande)"),
    parrafo("texto", "Segundo párrafo"),
    lista("galeria", "Galería de fotos", "textoAlternativo", [
      foto("imagen", "Foto"),
      texto("textoAlternativo", "Descripción de la foto (accesibilidad)"),
      texto("formato", "Tamaño en la galería", {
        options: [
          { value: "normal", label: "Normal" },
          { value: "alta", label: "Alta (vertical)" },
          { value: "ancha", label: "Ancha (horizontal)" },
        ],
      } as Partial<TinaField>),
    ]),
  ], { titulo: "Conciertos de alumnos" }),
  bloque("musica", "Vídeo", [
    ...cabecera,
    parrafo("texto", "Texto"),
    texto("video", "Enlace del vídeo de YouTube"),
    texto("boton", "Texto del botón al canal"),
  ], { titulo: "Escúchame cantar", boton: "Ver mi canal de YouTube" }),
  bloque("opiniones", "Opiniones", [
    ...cabecera,
    lista("lista", "Opiniones", "nombre", [texto("nombre", "Nombre"), parrafo("texto", "Opinión")]),
  ], { titulo: "Lo que dicen mis alumnos" }),
  bloque("preguntas", "Preguntas frecuentes", [
    foto("foto", "Foto"),
    ...cabecera,
    lista("lista", "Preguntas", "pregunta", [texto("pregunta", "Pregunta"), parrafo("respuesta", "Respuesta")]),
  ], { titulo: "Antes de empezar" }),
  bloque("contacto", "Contacto", [
    ...cabecera,
    parrafo("texto", "Texto"),
    foto("foto", "Foto"),
  ], { titulo: "¿Cantamos?" }),
];

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.CF_PAGES_BRANCH || process.env.HEAD || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "img", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "pagina",
        label: "Página de inicio",
        path: "content/pagina",
        format: "json",
        ui: {
          router: () => "/",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "bloques",
            label: "Secciones (arrastra para cambiar el orden)",
            list: true,
            templates: bloques,
          },
          {
            type: "object",
            name: "datos",
            label: "Datos de contacto",
            fields: [
              texto("telefono", "Teléfono"),
              texto("email", "Email"),
              texto("zona", "Dónde"),
              texto("youtube", "Enlace al canal de YouTube"),
              texto("mensajeWhatsApp", "Mensaje que se escribe al abrir WhatsApp"),
              texto("textoPie", "Texto del pie de página"),
              texto("titular", "Aviso legal: nombre y apellidos completos"),
              texto("nif", "Aviso legal: NIF"),
              texto("direccion", "Aviso legal: dirección postal"),
              texto("notaImpuestos", "Aviso legal: nota sobre impuestos (por ejemplo: Las clases están exentas de IVA.)"),
            ],
          },
          {
            type: "object",
            name: "seo",
            label: "Google y redes sociales",
            fields: [
              texto("titulo", "Título en Google"),
              parrafo("descripcion", "Descripción en Google"),
              parrafo("descripcionRedes", "Descripción al compartir en redes"),
            ],
          },
        ],
      },
    ],
  },
});
