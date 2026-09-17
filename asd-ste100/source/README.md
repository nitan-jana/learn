# Source documents

- `ASD-STE100_ISSUE9.pdf` — the standard, downloaded free from
  <https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf> on 2026-09-17. © ASD, 2025.
  Kept locally for study only; not redistributed, and no lesson reproduces more than short quotations.

The PDF is encrypted with an empty user password, so most readers and extractors refuse it.
To get plain text out of it:

    node ../../tools/pdftext.mjs source/ASD-STE100_ISSUE9.pdf > /tmp/ste9.txt
    node ../../tools/pdftext.mjs source/ASD-STE100_ISSUE9.pdf 86 99   # just a page range

Rule statements live in the "Summary of the rules" block at the start of each of the 9 sections.
