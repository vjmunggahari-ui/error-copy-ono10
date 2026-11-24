import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

// One line of software error copy: the brutal truth about a full disk,
// funny on a single read, shippable in a real error dialog.
const ENTRY =
  "Save failed: your disk is full. Free up some space first, or keep typing and watch this document exist only in your memory.";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back self-check: the file must hold exactly the entry, 1-200 chars.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the chosen line");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`entry length ${written.length} outside 1-200`);
}
if (written.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
// Single-line enforcement: the gate wants one line, so no line breaks.
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry must be a single line");
}
// The line must name the real failure in plain words.
if (!written.toLowerCase().includes("disk is full")) {
  throw new Error("entry does not name the failure");
}
console.log(`wrote ${outPath} (${written.length} chars)`);
