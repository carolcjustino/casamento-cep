// Build-time only: this module is never imported by the app or its server.
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, rename, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, process.argv[2] ?? "public");
const sourceOrigin = "https://casamento-cep.lovable.app";
const entries = JSON.parse(await readFile(new URL("./media-manifest.json", import.meta.url), "utf8"));
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

await Promise.all(entries.map(async (entry) => {
  const pointer = JSON.parse(await readFile(resolve(root, entry.pointer), "utf8"));
  const destination = resolve(output, entry.target);
  try {
    const existing = await readFile(destination);
    if (existing.length === pointer.size && digest(existing) === entry.sha256) {
      console.log(`Verified ${entry.target} (${existing.length} bytes)`);
      return;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  let bytes;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(new URL(pointer.url, sourceOrigin), {
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const downloaded = Buffer.from(await response.arrayBuffer());
      if (downloaded.length !== pointer.size || digest(downloaded) !== entry.sha256) {
        throw new Error("Original file size or SHA-256 mismatch");
      }
      bytes = downloaded;
      break;
    } catch (error) {
      if (attempt === 2) throw new Error(`Cannot prepare ${entry.target}: ${error.message}`);
    }
  }
  if (!bytes) throw new Error(`Missing original: ${entry.target}`);
  await mkdir(dirname(destination), { recursive: true });
  const temporary = `${destination}.tmp`;
  try {
    await writeFile(temporary, bytes);
    await rename(temporary, destination);
  } finally {
    await rm(temporary, { force: true });
  }
  console.log(`Prepared ${entry.target} (${bytes.length} bytes, SHA-256 verified)`);
}));