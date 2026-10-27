export function enlaceWhatsApp(telefono: string, mensaje?: string) {
  let numero = (telefono || "").replace(/\D/g, "");
  if (numero.length === 9) numero = "34" + numero;
  return `https://wa.me/${numero}` + (mensaje ? `?text=${encodeURIComponent(mensaje)}` : "");
}

export function idYouTube(url: string) {
  const m = (url || "").match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : "";
}
