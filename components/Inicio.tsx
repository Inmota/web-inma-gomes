"use client";

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

const formatoGaleria: Record<string, string | undefined> = { alta: "tall", ancha: "wide" };

export default function Inicio(props: ContenidoInicio) {
  const { data } = useTina(props);
  const p = data.pagina;
  const { portada, lema, metodo, sobreMi, precios, conciertos, musica, opiniones, preguntas, contacto, pie } = p;

  const tel = contacto?.telefono || "";
  const telHref = "tel:+34" + tel.replace(/\D/g, "");
  const wa = enlaceWhatsApp(tel, contacto?.mensajeWhatsApp);
  const video = idYouTube(musica?.video);
  const opciones = Array.from(
    new Set((precios?.tarifas || []).map((t: any) => t?.opcionFormulario).filter(Boolean))
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
            <li className="nav-cta"><a className="btn btn-light" href="#contacto">Reservar clase gratis</a></li>
          </ul>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="inicio" aria-labelledby="hero-h">
          <img
            className="hero-bg"
            src={portada?.imagen}
            alt={portada?.textoAlternativo || ""}
            fetchPriority="high"
            data-tina-field={tinaField(portada, "imagen")}
          />
          <div className="wrap">
            <div className="hero-text">
              <p className="eyebrow" data-tina-field={tinaField(portada, "antetitulo")}>{portada?.antetitulo}</p>
              <h1 id="hero-h">
                <span data-tina-field={tinaField(portada, "titulo")}>{portada?.titulo}</span>{" "}
                <em data-tina-field={tinaField(portada, "tituloDestacado")}>{portada?.tituloDestacado}</em>
              </h1>
              <p className="lead" data-tina-field={tinaField(portada, "texto")}>{portada?.texto}</p>
              <div className="hero-ctas">
                <a className="btn btn-light" href="#contacto" data-tina-field={tinaField(portada, "botonPrincipal")}>{portada?.botonPrincipal}</a>
                <a className="btn btn-outline" href="#precios" data-tina-field={tinaField(portada, "botonSecundario")}>{portada?.botonSecundario}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="motto" aria-label="Lema de Inma">
          <div className="wrap">
            <blockquote>
              <p data-tina-field={tinaField(lema, "frase")}>“{lema?.frase}”</p>
            </blockquote>
            <cite data-tina-field={tinaField(lema, "autora")}>{lema?.autora}</cite>
          </div>
        </section>

        <section className="benefits" aria-labelledby="beneficios-h">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow" data-tina-field={tinaField(metodo, "antetitulo")}>{metodo?.antetitulo}</p>
              <h2 id="beneficios-h" data-tina-field={tinaField(metodo, "titulo")}>{metodo?.titulo}</h2>
              <p className="lead" data-tina-field={tinaField(metodo, "texto")}>{metodo?.texto}</p>
            </div>
            <div className="grid-4">
              {(metodo?.pilares || []).map((pilar: any, i: number) => (
                <article className="pillar" key={i} data-tina-field={tinaField(pilar)}>
                  <span className="num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3 data-tina-field={tinaField(pilar, "titulo")}>{pilar?.titulo}</h3>
                  <p data-tina-field={tinaField(pilar, "texto")}>{pilar?.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about" id="sobre-mi" aria-labelledby="sobre-mi-h">
          <div className="wrap about-grid">
            <div className="arch" data-tina-field={tinaField(sobreMi, "foto")}>
              <img src={sobreMi?.foto} alt={sobreMi?.textoAlternativo || ""} loading="lazy" />
            </div>
            <div>
              <p className="eyebrow" data-tina-field={tinaField(sobreMi, "antetitulo")}>{sobreMi?.antetitulo}</p>
              <h2 id="sobre-mi-h" data-tina-field={tinaField(sobreMi, "titulo")}>{sobreMi?.titulo}</h2>
              <p className="lead" data-tina-field={tinaField(sobreMi, "entradilla")}>{sobreMi?.entradilla}</p>
              <p data-tina-field={tinaField(sobreMi, "texto")}>{sobreMi?.texto}</p>
              <ul className="creds" data-tina-field={tinaField(sobreMi, "formacion")}>
                {(sobreMi?.formacion || []).map((f: string, i: number) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="prices" id="precios" aria-labelledby="precios-h">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow" data-tina-field={tinaField(precios, "antetitulo")}>{precios?.antetitulo}</p>
              <h2 id="precios-h" data-tina-field={tinaField(precios, "titulo")}>{precios?.titulo}</h2>
              <p className="lead" data-tina-field={tinaField(precios, "texto")}>{precios?.texto}</p>
              {precios?.aviso && <p className="free-line" data-tina-field={tinaField(precios, "aviso")}>✦ {precios.aviso}</p>}
            </div>
            <div className="grid-3">
              {(precios?.tarifas || []).map((t: any, i: number) => (
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

        <section className="concerts" id="conciertos" aria-labelledby="conciertos-h">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow" data-tina-field={tinaField(conciertos, "antetitulo")}>{conciertos?.antetitulo}</p>
              <h2 id="conciertos-h" data-tina-field={tinaField(conciertos, "titulo")}>{conciertos?.titulo}</h2>
            </div>
            <div className="community">
              <img
                className="group"
                src={conciertos?.fotoGrupo}
                alt={conciertos?.textoAlternativoGrupo || ""}
                loading="lazy"
                data-tina-field={tinaField(conciertos, "fotoGrupo")}
              />
              <div>
                <p className="lead" data-tina-field={tinaField(conciertos, "entradilla")}>{conciertos?.entradilla}</p>
                <p data-tina-field={tinaField(conciertos, "texto")}>{conciertos?.texto}</p>
              </div>
            </div>
          </div>
          <div className="gallery">
            {(conciertos?.galeria || []).map((g: any, i: number) => (
              <figure className={formatoGaleria[g?.formato]} key={i} data-tina-field={tinaField(g)}>
                <img src={g?.imagen} alt={g?.textoAlternativo || ""} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section className="listen dark" id="escuchar" aria-labelledby="escuchar-h">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow" data-tina-field={tinaField(musica, "antetitulo")}>{musica?.antetitulo}</p>
              <h2 id="escuchar-h" data-tina-field={tinaField(musica, "titulo")}>{musica?.titulo}</h2>
              <p className="lead" data-tina-field={tinaField(musica, "texto")}>{musica?.texto}</p>
            </div>
            {video && (
              <div className="video" data-tina-field={tinaField(musica, "video")}>
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
            {contacto?.youtube && (
              <p className="listen-cta">
                <a className="btn btn-light" href={contacto.youtube} rel="noopener" target="_blank" data-tina-field={tinaField(musica, "boton")}>
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                  </svg>
                  {musica?.boton}
                  {NUEVA}
                </a>
              </p>
            )}
          </div>
        </section>

        <section className="testimonials" id="opiniones" aria-labelledby="opiniones-h">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow" data-tina-field={tinaField(opiniones, "antetitulo")}>{opiniones?.antetitulo}</p>
              <h2 id="opiniones-h" data-tina-field={tinaField(opiniones, "titulo")}>{opiniones?.titulo}</h2>
            </div>
            <div className="grid-3">
              {(opiniones?.lista || []).map((o: any, i: number) => (
                <figure className="quote" key={i} data-tina-field={tinaField(o)}>
                  <blockquote><p data-tina-field={tinaField(o, "texto")}>{o?.texto}</p></blockquote>
                  <figcaption data-tina-field={tinaField(o, "nombre")}>{o?.nombre}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="faq" id="preguntas" aria-labelledby="faq-h">
          <div className="wrap faq-grid">
            <div className="faq-photo" data-tina-field={tinaField(preguntas, "foto")}>
              <img src={preguntas?.foto} alt="" loading="lazy" />
            </div>
            <div>
              <div className="section-head">
                <p className="eyebrow" data-tina-field={tinaField(preguntas, "antetitulo")}>{preguntas?.antetitulo}</p>
                <h2 id="faq-h" data-tina-field={tinaField(preguntas, "titulo")}>{preguntas?.titulo}</h2>
              </div>
              {(preguntas?.lista || []).map((q: any, i: number) => (
                <details key={i} data-tina-field={tinaField(q)}>
                  <summary>{q?.pregunta}</summary>
                  <p>{q?.respuesta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contacto" aria-labelledby="contacto-h">
          <div className="wrap contact-grid">
            <div>
              <p className="eyebrow" data-tina-field={tinaField(contacto, "antetitulo")}>{contacto?.antetitulo}</p>
              <h2 id="contacto-h" data-tina-field={tinaField(contacto, "titulo")}>{contacto?.titulo}</h2>
              <p className="lead" data-tina-field={tinaField(contacto, "texto")}>{contacto?.texto}</p>
              <a className="btn btn-wa" href={wa} rel="noopener" target="_blank">
                <IconoWhatsApp />
                Escribir por WhatsApp{NUEVA}
              </a>
              <ul className="contact-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                  <span data-tina-field={tinaField(contacto, "zona")}>{contacto?.zona}</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
                  <a href={telHref} data-tina-field={tinaField(contacto, "telefono")}><span className="sr-only">Llamar al </span>{tel}</a>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  <a href={`mailto:${contacto?.email}`} data-tina-field={tinaField(contacto, "email")}><span className="sr-only">Enviar un email a </span>{contacto?.email}</a>
                </li>
                {contacto?.youtube && (
                  <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></svg>
                    <a href={contacto.youtube} rel="noopener" target="_blank" data-tina-field={tinaField(contacto, "youtube")}>
                      {contacto.youtube.replace(/^https?:\/\/(www\.)?/, "")}{NUEVA}
                    </a>
                  </li>
                )}
              </ul>
              <div className="contact-photo" data-tina-field={tinaField(contacto, "foto")}>
                <img src={contacto?.foto} alt="" loading="lazy" />
              </div>
            </div>

            <form name="contacto" method="POST" data-netlify="true" netlify-honeypot="empresa" action="/gracias.html" noValidate aria-labelledby="form-h">
              <h3 id="form-h" data-tina-field={tinaField(contacto, "tituloFormulario")}>{contacto?.tituloFormulario}</h3>
              <input type="hidden" name="form-name" value="contacto" />
              <p hidden><label>No rellenar <input name="empresa" tabIndex={-1} autoComplete="off" /></label></p>
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
              <p className="form-legal">Usaré tus datos solo para responderte. Más información en la <a href="/privacidad.html">política de privacidad</a>.</p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div>
            <p className="f-brand">Aula de Voz Inma Gomes</p>
            <p data-tina-field={tinaField(pie, "texto")}>{pie?.texto}</p>
          </div>
          <ul aria-label="Enlaces del pie">
            {contacto?.youtube && <li><a href={contacto.youtube} rel="noopener" target="_blank">YouTube{NUEVA}</a></li>}
            <li><a href={enlaceWhatsApp(tel)} rel="noopener" target="_blank">WhatsApp{NUEVA}</a></li>
            <li><a href={`mailto:${contacto?.email}`}>Email</a></li>
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
          <a className="btn btn-primary" href="#contacto">Reservar clase gratis</a>
          <a className="btn btn-wa" href={wa} rel="noopener" target="_blank" aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)">
            <IconoWhatsApp size={24} />
          </a>
        </div>
      </aside>

      <Comportamiento />
    </>
  );
}
