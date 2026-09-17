# Learning workspaces

One folder per topic. Each folder is a self-contained teaching workspace with its own
`MISSION.md`, `RESOURCES.md`, `NOTES.md`, `lessons/`, `reference/`, `learning-records/`,
and `assets/`. Nothing is shared between topics — a lesson never links outside its own folder,
so a topic can be moved, zipped, or abandoned without breaking anything.

| Topic | Mission | Started | Lessons |
| --- | --- | --- | --- |
| [asd-ste100](./asd-ste100/) | Simplified Technical English as a discipline for blog, product, and social writing | 2026-09-17 | 1 |

`tools/` is shared, and is the one exception to the no-sharing rule: small local scripts with their
own `package.json`, used to prepare material. Nothing in `tools/` is ever linked from a lesson.

- `tools/pdftext.mjs` — extracts text from a PDF, including PDFs encrypted with an empty user
  password, which defeats most readers. `node tools/pdftext.mjs <file.pdf> [first] [last]`.

To start a new topic, run `/teach <topic>` from this directory and I will create its folder.
