import { defineConfig, type TinaField } from "tinacms";

const texto = (name: string, label: string, extra: Partial<TinaField> = {}): TinaField =>
  ({ type: "string", name, label, ...extra } as TinaField);
const parrafo = (name: string, label: string): TinaField =>
  texto(name, label, { ui: { component: "textarea" } } as Partial<TinaField>);
const foto = (name: string, label: string): TinaField => ({ type: "image", name, label });

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || "main",
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
            name: "seo",
            label: "Google y redes sociales",
            fields: [
              texto("titulo", "Título en Google"),
              parrafo("descripcion", "Descripción en Google"),
              parrafo("descripcionRedes", "Descripción al compartir en redes"),
            ],
          },
          {
            type: "object",
            name: "portada",
            label: "Portada",
            fields: [
              foto("imagen", "Foto de portada"),
              texto("textoAlternativo", "Descripción de la foto (accesibilidad)"),
              texto("antetitulo", "Texto pequeño sobre el título"),
              texto("titulo", "Título"),
              texto("tituloDestacado", "Final del título (en dorado)"),
              parrafo("texto", "Texto"),
              texto("botonPrincipal", "Botón principal"),
              texto("botonSecundario", "Botón secundario"),
            ],
          },
          {
            type: "object",
            name: "lema",
            label: "Cita",
            fields: [parrafo("frase", "Frase"), texto("autora", "Autora")],
          },
          {
            type: "object",
            name: "metodo",
            label: "Mi forma de trabajar",
            fields: [
              texto("antetitulo", "Texto pequeño sobre el título"),
              texto("titulo", "Título"),
              parrafo("texto", "Texto"),
              {
                type: "object",
                name: "pilares",
                label: "Puntos",
                list: true,
                ui: { itemProps: (item: { titulo?: string }) => ({ label: item?.titulo }) },
                fields: [texto("titulo", "Título"), parrafo("texto", "Texto")],
              },
            ],
          },
          {
            type: "object",
            name: "sobreMi",
            label: "Sobre mí",
            fields: [
              foto("foto", "Foto"),
              texto("textoAlternativo", "Descripción de la foto (accesibilidad)"),
              texto("antetitulo", "Texto pequeño sobre el título"),
              texto("titulo", "Título"),
              parrafo("entradilla", "Primer párrafo (más grande)"),
              parrafo("texto", "Segundo párrafo"),
              texto("formacion", "Formación", { list: true } as Partial<TinaField>),
            ],
          },
          {
            type: "object",
            name: "precios",
            label: "Tarifas",
            fields: [
              texto("antetitulo", "Texto pequeño sobre el título"),
              texto("titulo", "Título"),
              parrafo("texto", "Texto"),
              texto("aviso", "Aviso destacado"),
              {
                type: "object",
                name: "tarifas",
                label: "Tarifas",
                list: true,
                ui: { itemProps: (item: { nombre?: string }) => ({ label: item?.nombre }) },
                fields: [
                  texto("nombre", "Nombre"),
                  { type: "boolean", name: "destacada", label: "Destacada (fondo oscuro)" },
                  texto("etiqueta", "Etiqueta (solo si está destacada)"),
                  texto("incluye", "Qué incluye", { list: true } as Partial<TinaField>),
                  texto("precio", "Precio (por ejemplo: 40 € o Gratis)"),
                  texto("unidad", "Unidad (por ejemplo: al mes)"),
                  texto("nota", "Nota bajo el precio"),
                  texto("boton", "Texto del botón"),
                  texto("opcionFormulario", "Opción que se marca en el formulario", {
                    options: ["Primera clase gratis", "Pack mensual", "Clase suelta"],
                  } as Partial<TinaField>),
                ],
              },
            ],
          },
          {
            type: "object",
            name: "conciertos",
            label: "Conciertos",
            fields: [
              texto("antetitulo", "Texto pequeño sobre el título"),
              texto("titulo", "Título"),
              foto("fotoGrupo", "Foto del grupo"),
              texto("textoAlternativoGrupo", "Descripción de la foto (accesibilidad)"),
              parrafo("entradilla", "Primer párrafo (más grande)"),
              parrafo("texto", "Segundo párrafo"),
              {
                type: "object",
                name: "galeria",
                label: "Galería de fotos",
                list: true,
                ui: { itemProps: (item: { textoAlternativo?: string }) => ({ label: item?.textoAlternativo }) },
                fields: [
                  foto("imagen", "Foto"),
                  texto("textoAlternativo", "Descripción de la foto (accesibilidad)"),
                  texto("formato", "Tamaño en la galería", {
                    options: [
                      { value: "normal", label: "Normal" },
                      { value: "alta", label: "Alta (vertical)" },
                      { value: "ancha", label: "Ancha (horizontal)" },
                    ],
                  } as Partial<TinaField>),
                ],
              },
            ],
          },
          {
            type: "object",
            name: "musica",
            label: "Vídeo",
            fields: [
              texto("antetitulo", "Texto pequeño sobre el título"),
              texto("titulo", "Título"),
              parrafo("texto", "Texto"),
              texto("video", "Enlace del vídeo de YouTube"),
              texto("boton", "Texto del botón al canal"),
            ],
          },
          {
            type: "object",
            name: "opiniones",
            label: "Opiniones",
            fields: [
              texto("antetitulo", "Texto pequeño sobre el título"),
              texto("titulo", "Título"),
              {
                type: "object",
                name: "lista",
                label: "Opiniones",
                list: true,
                ui: { itemProps: (item: { nombre?: string }) => ({ label: item?.nombre }) },
                fields: [texto("nombre", "Nombre"), parrafo("texto", "Opinión")],
              },
            ],
          },
          {
            type: "object",
            name: "preguntas",
            label: "Preguntas frecuentes",
            fields: [
              foto("foto", "Foto"),
              texto("antetitulo", "Texto pequeño sobre el título"),
              texto("titulo", "Título"),
              {
                type: "object",
                name: "lista",
                label: "Preguntas",
                list: true,
                ui: { itemProps: (item: { pregunta?: string }) => ({ label: item?.pregunta }) },
                fields: [texto("pregunta", "Pregunta"), parrafo("respuesta", "Respuesta")],
              },
            ],
          },
          {
            type: "object",
            name: "contacto",
            label: "Contacto",
            fields: [
              texto("antetitulo", "Texto pequeño sobre el título"),
              texto("titulo", "Título"),
              parrafo("texto", "Texto"),
              texto("mensajeWhatsApp", "Mensaje que se escribe al abrir WhatsApp"),
              texto("telefono", "Teléfono"),
              texto("email", "Email"),
              texto("zona", "Dónde"),
              texto("youtube", "Enlace al canal de YouTube"),
              foto("foto", "Foto"),
              texto("tituloFormulario", "Título del formulario"),
            ],
          },
          {
            type: "object",
            name: "pie",
            label: "Pie de página",
            fields: [texto("texto", "Texto")],
          },
        ],
      },
    ],
  },
});
