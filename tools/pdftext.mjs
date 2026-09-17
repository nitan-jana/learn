#!/usr/bin/env node
// Extract text from a PDF, including PDFs encrypted with an empty user password
// (the usual case for freely distributed standards). Project-scoped: needs only
// the pdfjs-dist in this folder's node_modules.
//
//   node pdftext.mjs <file.pdf> [firstPage] [lastPage]
//
// Writes plain text to stdout, one form feed between pages.

import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { readFileSync } from "node:fs";

const [, , file, from = "1", to = "0"] = process.argv;
if (!file) {
  console.error("usage: node pdftext.mjs <file.pdf> [firstPage] [lastPage]");
  process.exit(1);
}

const doc = await getDocument({
  data: new Uint8Array(readFileSync(file)),
  password: "",
  useSystemFonts: false,
  isEvalSupported: false,
}).promise;

const first = Math.max(1, Number(from));
const last = Number(to) > 0 ? Math.min(doc.numPages, Number(to)) : doc.numPages;
console.error(`pages ${first}-${last} of ${doc.numPages}`);

for (let n = first; n <= last; n++) {
  const page = await doc.getPage(n);
  const { items } = await page.getTextContent();
  let line = "";
  const out = [];
  for (const it of items) {
    line += it.str;
    if (it.hasEOL) { out.push(line); line = ""; }
  }
  if (line) out.push(line);
  process.stdout.write(out.join("\n") + `\n\f[page ${n}]\n`);
}
