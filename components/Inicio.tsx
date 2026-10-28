"use client";

import type React from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import type { ContenidoInicio } from "@/lib/contenido";
import { enlaceWhatsApp, idYouTube } from "@/lib/util";
import Comportamiento from "./Comportamiento";

const NUEVA = <span className="sr-only"> (se abre en una pestaña nueva)</span>;

const IconoWhatsApp = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.6-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z" />
  </svg>
);

type BloqueProps = { b: any; d: any; opciones: string[] };

const formatoGaleria: Record<string, string | undefined> = { alta: "tall", ancha: "wide" };

function Portada({ b, d, opciones }: BloqueProps) {
  return (
      <section className="hero" id="inicio" aria-labelledby="hero-h">
        <img
          className="hero-bg"
          src={b?.imagen}
          alt={b?.textoAlternativo || ""}
          fetchPriority="high"
          data-tina-field={tinaField(b, "imagen")}
        />
        <div className="wrap">
          <div className="hero-text">
            <p className="eyebrow" data-tina-field={tinaField(b, "antetitulo")}>{b?.antetitulo}</p>
            <h1 id="hero-h">
              <span data-tina-field={tinaField(b, "titulo")}>{b?.titulo}</span>{" "}
              <em data-tina-field={tinaField(b, "tituloDestacado")}>{b?.tituloDestacado}</em>
            </h1>
            <p className="lead" data-tina-field={tinaField(b, "texto")}>{b?.texto}</p>
            <div className="hero-ctas">
              <a className="btn btn-light" href="#contacto" data-tina-field={tinaField(b, "botonPrincipal")}>{b?.botonPrincipal}</a>
              <a className="btn btn-outline" href="#precios" data-tina-field={tinaField(b, "botonSecundario")}>{b?.botonSecundario}</a>
            </div>
          </div>
        </div>
      </section>
  );
}

function Lema({ b, d, opciones }: BloqueProps) {
  return (
      <section className="motto" aria-label="Lema de Inma">
        <div className="wrap">
          <blockquote>
            <p data-tina-field={tinaField(b, "frase")}>“{b?.frase}”</p>
          </blockquote>
          <cite data-tina-field={tinaField(b, "autora")}>{b?.autora}</cite>
        </div>
      </section>
  );
}

function Metodo({ b, d, opciones }: BloqueProps) {
  return (
      <section className="benefits" aria-labelledby="beneficios-h">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow" data-tina-field={tinaField(b, "antetitulo")}>{b?.antetitulo}</p>
            <h2 id="beneficios-h" data-tina-field={tinaField(b, "titulo")}>{b?.titulo}</h2>
            <p className="lead" data-tina-field={tinaField(b, "texto")}>{b?.texto}</p>
          </div>
          <div className="grid-4">
            {(b?.pilares || []).map((pilar: any, i: number) => (
              <article className="pillar" key={i} data-tina-field={tinaField(pilar)}>
                <span className="num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 data-tina-field={tinaField(pilar, "titulo")}>{pilar?.titulo}</h3>
                <p data-tina-field={tinaField(pilar, "texto")}>{pilar?.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}

function SobreMi({ b, d, opciones }: BloqueProps) {
  return (
      <section className="about" id="sobre-mi" aria-labelledby="sobre-mi-h">
        <div className="wrap about-grid">
          <div className="arch" data-tina-field={tinaField(b, "foto")}>
            <img src={b?.foto} alt={b?.textoAlternativo || ""} loading="lazy" />
          </div>
          <div>
            <p className="eyebrow" data-tina-field={tinaField(b, "antetitulo")}>{b?.antetitulo}</p>
            <h2 id="sobre-mi-h" data-tina-field={tinaField(b, "titulo")}>{b?.titulo}</h2>
            <p className="lead" data-tina-field={tinaField(b, "entradilla")}>{b?.entradilla}</p>
            <p data-tina-field={tinaField(b, "texto")}>{b?.texto}</p>
            <ul className="creds" data-tina-field={tinaField(b, "formacion")}>
              {(b?.formacion || []).map((f: string, i: number) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        </div>
      </section>
  );
}

function Precios({ b, d, opciones }: BloqueProps) {
  return (
      <section className="prices" id="precios" aria-labelledby="precios-h">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow" data-tina-field={tinaField(b, "antetitulo")}>{b?.antetitulo}</p>
            <h2 id="precios-h" data-tina-field={tinaField(b, "titulo")}>{b?.titulo}</h2>
            <p className="lead" data-tina-field={tinaField(b, "texto")}>{b?.texto}</p>
            {b?.aviso && <p className="free-line" data-tina-field={tinaField(b, "aviso")}>✦ {b.aviso}</p>}
          </div>
          <div className="grid-3">
            {(b?.tarifas || []).map((t: any, i: number) => (
              <article
                className={"price-card" + (t?.destacada ? " featured" : "")}
                aria-labelledby={`p${i + 1}-h`}
                key={i}
                data-tina-field={tinaField(t)}
              >
                {t?.destacada && t?.etiqueta && <span className="tag" data-tina-field={tinaField(t, "etiqueta")}>{t.etiqueta}</span>}
                <h3 id={`p${i + 1}-h`} data-tina-field={tinaField(t, "nombre")}>{t?.nombre}</h3>
                <ul data-tina-field={tinaField(t, "incluye")}>
                  {(t?.incluye || []).map((x: string, j: number) => <li key={j}>{x}</li>)}
                </ul>
                <p className="amount" data-tina-field={tinaField(t, "precio")}>
                  {t?.precio}
                  {t?.unidad && <> <small>{t.unidad}</small></>}
                </p>
                <p className="note" data-tina-field={tinaField(t, "nota")}>{t?.nota || " "}</p>
                <a
                  className={"btn btn-block " + (t?.destacada ? "btn-light" : "btn-outline")}
                  href="#contacto"
                  data-interes={t?.opcionFormulario || undefined}
                  data-tina-field={tinaField(t, "boton")}
                >
                  {t?.boton}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}

function Conciertos({ b, d, opciones }: BloqueProps) {
  return (
      <section className="concerts" id="conciertos" aria-labelledby="conciertos-h">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow" data-tina-field={tinaField(b, "antetitulo")}>{b?.antetitulo}</p>
            <h2 id="conciertos-h" data-tina-field={tinaField(b, "titulo")}>{b?.titulo}</h2>
          </div>
          <div className="community">
            <img
              className="group"
              src={b?.fotoGrupo}
              alt={b?.textoAlternativoGrupo || ""}
              loading="lazy"
              data-tina-field={tinaField(b, "fotoGrupo")}
            />
            <div>
              <p className="lead" data-tina-field={tinaField(b, "entradilla")}>{b?.entradilla}</p>
              <p data-tina-field={tinaField(b, "texto")}>{b?.texto}</p>
            </div>
          </div>
        </div>
        <div className="gallery">
          {(b?.galeria || []).map((g: any, i: number) => (
            <figure className={formatoGaleria[g?.formato]} key={i} data-tina-field={tinaField(g)}>
              <img src={g?.imagen} alt={g?.textoAlternativo || ""} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>
  );
}

function Musica({ b, d, opciones }: BloqueProps) {
  const video = idYouTube(b?.video);
  return (
      <section className="listen dark" id="escuchar" aria-labelledby="escuchar-h">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow" data-tina-field={tinaField(b, "antetitulo")}>{b?.antetitulo}</p>
            <h2 id="escuchar-h" data-tina-field={tinaField(b, "titulo")}>{b?.titulo}</h2>
            <p className="lead" data-tina-field={tinaField(b, "texto")}>{b?.texto}</p>
          </div>
          {video && (
            <div className="video" data-tina-field={tinaField(b, "video")}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video}?rel=0`}
                title="Vídeo de Inma Gomes cantando"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {d?.youtube && (
            <p className="listen-cta">
              <a className="btn btn-light" href={d.youtube} rel="noopener" target="_blank" data-tina-field={tinaField(b, "boton")}>
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
                {b?.boton}
                {NUEVA}
              </a>
            </p>
          )}
        </div>
      </section>
  );
}

function Opiniones({ b, d, opciones }: BloqueProps) {
  return (
      <section className="testimonials" id="opiniones" aria-labelledby="opiniones-h">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow" data-tina-field={tinaField(b, "antetitulo")}>{b?.antetitulo}</p>
            <h2 id="opiniones-h" data-tina-field={tinaField(b, "titulo")}>{b?.titulo}</h2>
          </div>
          <div className="grid-3">
            {(b?.lista || []).map((o: any, i: number) => (
              <figure className="quote" key={i} data-tina-field={tinaField(o)}>
                <blockquote><p data-tina-field={tinaField(o, "texto")}>{o?.texto}</p></blockquote>
                <figcaption data-tina-field={tinaField(o, "nombre")}>{o?.nombre}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
  );
}

function Preguntas({ b, d, opciones }: BloqueProps) {
  return (
      <section className="faq" id="preguntas" aria-labelledby="faq-h">
        <div className="wrap faq-grid">
          <div className="faq-photo" data-tina-field={tinaField(b, "foto")}>
            <img src={b?.foto} alt="" loading="lazy" />
          </div>
          <div>
            <div className="section-head">
              <p className="eyebrow" data-tina-field={tinaField(b, "antetitulo")}>{b?.antetitulo}</p>
              <h2 id="faq-h" data-tina-field={tinaField(b, "titulo")}>{b?.titulo}</h2>
            </div>
            {(b?.lista || []).map((q: any, i: number) => (
              <details key={i} data-tina-field={tinaField(q)}>
                <summary>{q?.pregunta}</summary>
                <p>{q?.respuesta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
  );
}

function Contacto({ b, d, opciones }: BloqueProps) {
  const tel = d?.telefono || "";
  const telHref = "tel:+34" + tel.replace(/\D/g, "");
  const wa = enlaceWhatsApp(tel, d?.mensajeWhatsApp);
  return (
      <section className="contact" id="contacto" aria-labelledby="contacto-h">
        <div className="wrap contact-grid">
          <div>
            <p className="eyebrow" data-tina-field={tinaField(b, "antetitulo")}>{b?.antetitulo}</p>
            <h2 id="contacto-h" data-tina-field={tinaField(b, "titulo")}>{b?.titulo}</h2>
            <p className="lead" data-tina-field={tinaField(b, "texto")}>{b?.texto}</p>
            <a className="btn btn-wa" href={wa} rel="noopener" target="_blank">
              <IconoWhatsApp />
              Escribir por WhatsApp{NUEVA}
            </a>
            <ul className="contact-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                <span data-tina-field={tinaField(d, "zona")}>{d?.zona}</span>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
                <a href={telHref} data-tina-field={tinaField(d, "telefono")}><span className="sr-only">Llamar al </span>{tel}</a>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                <a href={`mailto:${d?.email}`} data-tina-field={tinaField(d, "email")}><span className="sr-only">Enviar un email a </span>{d?.email}</a>
              </li>
              {d?.youtube && (
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></svg>
                  <a href={d.youtube} rel="noopener" target="_blank" data-tina-field={tinaField(d, "youtube")}>
                    {d.youtube.replace(/^https?:\/\/(www\.)?/, "")}{NUEVA}
                  </a>
                </li>
              )}
            </ul>
            <div className="contact-photo" data-tina-field={tinaField(b, "foto")}>
              <img src={b?.foto} alt="" loading="lazy" />
            </div>
          </div>
  
          <form name="contacto" method="POST" action="https://api.web3forms.com/submit" noValidate aria-labelledby="form-h">
            <h3 id="form-h" data-tina-field={tinaField(b, "tituloFormulario")}>{b?.tituloFormulario}</h3>
            <input type="hidden" name="access_key" value={d?.claveFormulario || ""} />
            <input type="hidden" name="subject" value="Nuevo mensaje desde la web" />
            <input type="hidden" name="from_name" value="Web Aula de Voz Inma Gomes" />
            <p hidden><label>No rellenar <input type="checkbox" name="botcheck" tabIndex={-1} /></label></p>
            <div className="field">
              <label htmlFor="f-nombre">Nombre</label>
              <input id="f-nombre" name="nombre" required autoComplete="name" aria-describedby="e-nombre" />
              <span className="field-error" id="e-nombre">Escribe tu nombre.</span>
            </div>
            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input id="f-email" type="email" name="email" required autoComplete="email" inputMode="email" aria-describedby="e-email" />
              <span className="field-error" id="e-email">Escribe un email válido, por ejemplo nombre@gmail.com.</span>
            </div>
            <div className="field">
              <label htmlFor="f-tel">Teléfono <span className="opt">(opcional)</span></label>
              <input id="f-tel" type="tel" name="telefono" autoComplete="tel" inputMode="tel" />
            </div>
            <div className="field">
              <label htmlFor="f-interes">Me interesa</label>
              <select id="f-interes" name="interes">
                {opciones.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-modalidad">Modalidad</label>
              <select id="f-modalidad" name="modalidad">
                <option>Presencial en Sants</option>
                <option>Online</option>
                <option>Aún no lo sé</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-msg">Cuéntame tu experiencia y qué quieres conseguir <span className="opt">(opcional)</span></label>
              <textarea id="f-msg" name="mensaje" rows={4}></textarea>
            </div>
            <button className="btn btn-primary btn-block" type="submit">Enviar mensaje</button>
            <p className="form-status" role="alert"></p>
            <p className="form-legal">Usaré tus datos solo para responderte. Más información en la <a href="/privacidad.html">política de privacidad</a>.</p>
          </form>
        </div>
      </section>
  );
}

const COMPONENTES: Record<string, (props: BloqueProps) => React.JSX.Element> = {
  portada: Portada,
  lema: Lema,
  metodo: Metodo,
  sobreMi: SobreMi,
  precios: Precios,
  conciertos: Conciertos,
  musica: Musica,
  opiniones: Opiniones,
  preguntas: Preguntas,
  contacto: Contacto,
};

// En el JSON el tipo viene en _template; desde Tina llega como __typename (PaginaBloquesSobreMi).
function tipoBloque(b: any): string {
  if (b?._template) return b._template;
  const t = String(b?.__typename || "").replace(/^PaginaBloques/, "");
  return t.charAt(0).toLowerCase() + t.slice(1);
}

export default function Inicio(props: ContenidoInicio) {
  const { data } = useTina(props);
  const p = data.pagina;
  const d = p.datos;
  const bloques = (p.bloques || []).filter((b: any) => b && !b.ocultar);

  const tel = d?.telefono || "";
  const wa = enlaceWhatsApp(tel, d?.mensajeWhatsApp);
  const opciones = Array.from(
    new Set(
      bloques
        .filter((b: any) => tipoBloque(b) === "precios")
        .flatMap((b: any) => (b.tarifas || []).map((t: any) => t?.opcionFormulario))
        .filter(Boolean)
    )
  ) as string[];

  return (
    <>
      <a className="skip" href="#main">Saltar al contenido</a>

      <header id="top">
        <nav className="wrap nav" aria-label="Principal">
          <a className="brand" href="#inicio">Aula de Voz Inma Gomes</a>
          <button className="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">
            <span className="bars" aria-hidden="true"></span>
            <span>Menú</span>
          </button>
          <ul className="nav-links" id="nav-links">
            <li><a href="#sobre-mi">Sobre mí</a></li>
            <li><a href="#precios">Precios</a></li>
            <li><a href="#conciertos">Conciertos</a></li>
            <li><a href="#opiniones">Opiniones</a></li>
            <li><a href="#preguntas">Preguntas</a></li>
            <li className="nav-cta"><a className="btn btn-light" href="#contacto">Reservar clase de prueba</a></li>
          </ul>
        </nav>
      </header>

      <main id="main">
        {bloques.map((b: any, i: number) => {
          const Bloque = COMPONENTES[tipoBloque(b)];
          return Bloque ? <Bloque key={i} b={b} d={d} opciones={opciones} /> : null;
        })}
      </main>

      <footer>
        <div className="wrap">
          <div>
            <p className="f-brand">Aula de Voz Inma Gomes</p>
            <p data-tina-field={tinaField(d, "textoPie")}>{d?.textoPie}</p>
          </div>
          <ul aria-label="Enlaces del pie">
            {d?.youtube && <li><a href={d.youtube} rel="noopener" target="_blank">YouTube{NUEVA}</a></li>}
            <li><a href={enlaceWhatsApp(tel)} rel="noopener" target="_blank">WhatsApp{NUEVA}</a></li>
            <li><a href={`mailto:${d?.email}`}>Email</a></li>
            <li><a href="/privacidad.html">Privacidad</a></li>
          </ul>
          <p>© {new Date().getFullYear()} Inma Gomes</p>
        </div>
      </footer>

      <aside aria-label="Reserva rápida">
        <div className="sticky-cta wa-float">
          <a href={wa} rel="noopener" target="_blank">
            <IconoWhatsApp size={22} />
            Escribir por WhatsApp{NUEVA}
          </a>
        </div>
        <div className="sticky-cta mobile-bar">
          <a className="btn btn-primary" href="#contacto">Reservar clase de prueba</a>
          <a className="btn btn-wa" href={wa} rel="noopener" target="_blank" aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)">
            <IconoWhatsApp size={24} />
          </a>
        </div>
      </aside>

      <Comportamiento />
    </>
  );
}
