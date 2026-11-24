import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The ultrasound showed two heartbeats, but the doctor kept counting, and I was alone in the room.";

// Gate: one sentence, 1–200 Unicode code points, not only whitespace.
const points = [...LINE];
if (points.length < 1 || points.length > 200 || !LINE.trim()) {
  throw new Error(`entry line invalid: ${points.length} code points`);
}
if ((LINE.match(/\./g) ?? []).length !== 1 || !LINE.endsWith(".")) {
  throw new Error("entry line must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
chmodSync(join(outDir, "entry.txt"), 0o644);
