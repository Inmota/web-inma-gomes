// Con las claves de Tina Cloud se genera el editor conectado a la nube.
// Sin ellas, la web se construye igual a partir de los archivos del repositorio.
import { execSync } from "node:child_process";
import { rmSync } from "node:fs";

// Next guarda en caché las consultas a Tina entre builds; sin esto se publicarían textos antiguos.
rmSync(".next/cache/fetch-cache", { recursive: true, force: true });

const cloud = process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN;
const cmd = cloud
  ? "tinacms build && next build"
  : 'tinacms build --local --skip-cloud-checks --skip-search-index -c "next build"';

console.log(cloud ? "Build con Tina Cloud" : "Build local (sin claves de Tina Cloud)");
execSync(cmd, { stdio: "inherit", env: { ...process.env, NODE_ENV: "production" } });
