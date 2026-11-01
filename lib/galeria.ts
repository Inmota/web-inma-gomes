// Galería: la cuadrícula se calcula sola según cuántas fotos haya, para que siempre quede completa
// (sin huecos) en escritorio y en móvil. Cada foto recibe cuántas columnas ocupa: "d" de 12 en
// escritorio, "m" de 2 en móvil. Las fotos marcadas como destacadas ocupan el hueco más ancho de su fila.
function filas(total: number, porFila: number): number[] {
  if (total <= 0) return [];
  if (porFila === 3) {
    if (total === 1) return [1];
    if (total === 2) return [2];
    if (total === 4) return [2, 2];
    const resto = total % 3;
    const llenas = Math.floor(total / 3);
    if (resto === 0) return Array(llenas).fill(3);
    if (resto === 2) return [...Array(llenas).fill(3), 2];
    return [...Array(llenas - 1).fill(3), 2, 2]; // resto 1: dos filas de 2 en lugar de una foto sola
  }
  // Móvil (2 por fila): si son impares, la primera ocupa todo el ancho
  return total % 2 ? [1, ...Array((total - 1) / 2).fill(2)] : Array(total / 2).fill(2);
}
const ANCHOS_ESCRITORIO: Record<number, number[][]> = {
  1: [[12]],
  2: [[7, 5], [5, 7]],
  3: [[5, 4, 3], [3, 4, 5], [4, 4, 4]],
};
export function columnasGaleria(fotos: any[]) {
  const destacada = (g: any) => g?.formato === "ancha" || g?.formato === "alta";
  const reparto = (porFila: number, anchos: (n: number, fila: number) => number[]) => {
    const res: number[] = [];
    let i = 0;
    filas(fotos.length, porFila).forEach((n, fila) => {
      const grupo = fotos.slice(i, i + n);
      const tam = [...anchos(n, fila)];
      // Las destacadas se quedan con los huecos más anchos de la fila
      const orden = grupo.map((g, k) => k).sort((a, b) => Number(destacada(grupo[b])) - Number(destacada(grupo[a])));
      const libres = [...tam].sort((a, b) => b - a);
      const asignado: number[] = [];
      if (grupo.some(destacada)) orden.forEach((k) => { asignado[k] = libres.shift()!; });
      res.push(...(grupo.some(destacada) ? asignado : tam));
      i += n;
    });
    return res;
  };
  const d = reparto(3, (n, fila) => { const p = ANCHOS_ESCRITORIO[n]; return p[fila % p.length]; });
  const m = reparto(2, (n) => (n === 1 ? [2] : [1, 1]));
  return fotos.map((_, i) => ({ d: d[i], m: m[i] }));
}

