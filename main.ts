// Say What Actually Broke — make.fun entry (v2)
// Writes one line of software error copy, at most 200 characters, to
// $MAKEFUN_OUTPUT_DIR/entry.txt. The line names the real failure in plain
// words (autosave overwrote the good version with an empty one) and the
// exact next step (check version history), with a twist a reader repeats
// out loud to a colleague.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Autosave just overwrote your good version with an empty one. Check version history to get it back \u2014 autosave giveth, and autosave taketh away.";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the file on disk must be exactly the line, no
// trailing newline, no extra bytes, and inside the 1..200 character gate.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the chosen line byte-for-byte");
}
if (back.length < 1 || back.length > 200) {
  throw new Error(`entry length ${back.length} outside the 1..200 gate`);
}
if (back.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (back.includes("\n") || back.includes("\r")) {
  throw new Error("entry must be a single line with no newline characters");
}
if (!back.endsWith(".")) {
  throw new Error("entry must end with its punch on a full stop");
}
if (!back.includes("version history")) {
  throw new Error("entry lost its next step (check version history)");
}
if (!/Autosave just overwrote/.test(back)) {
  throw new Error("entry lost the named failure (autosave overwrote)");
}
console.log(`wrote ${outPath} (${back.length} chars)`);
