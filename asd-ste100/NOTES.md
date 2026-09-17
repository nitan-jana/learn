# Notes

## About Nitan
- Engineer, frontend → fullstack. Audience for his writing is other engineers.
- Has a documented writing voice (`~/.claude/skills/.../my-writing-style/SKILL.md`): flat declarative
  openers, 1–3 sentence paragraphs, specifics over vagueness (real library names, config values,
  version numbers), dry humour in small doses, no emojis, no marketing verbs, no em-dash tics.
- **Teaching implication:** his voice and STE already agree on a lot (specificity, short paragraphs,
  no marketing adjectives). They conflict on: sentence rhythm variation, first person, rhetorical
  compression, and humour. Always mark which STE rules are *transferable* to his prose and which are
  *procedure-only*. Never present full STE compliance as the goal for a blog post.

## Preferences stated
- Wants all four modes: rule-by-rule teaching, rewrite drills, work on his real text, printable reference sheets.
- Starting from zero on this topic.

## Workspace mechanics
- The standard is at `source/ASD-STE100_ISSUE9.pdf`. It is encrypted (empty user password), so
  `Read` and most extractors refuse it. Use `node ../tools/pdftext.mjs <pdf> [first] [last]`.
- Rule wording lives in the "Summary of the rules" block at the head of each of the 9 sections.
  **Always quote the rule verbatim from the PDF in a lesson. Never paraphrase a rule number.**
- Section map: 1 Words · 2 Multi-word nouns · 3 Verbs · 4 Sentences · 5 Procedural writing ·
  6 Descriptive writing · 7 Safety instructions · 8 Punctuation and word count · 9 Writing practices,
  plus 8 General Recommendations (GR-1..GR-8; GR-7 inclusive language and GR-8 possessive form are new in Issue 9).

## Teaching plan (rolling)
1. ✅ One idea, one sentence — rules 5.1, 5.2, 6.3, 4.2. (lesson 0001, done 2026-09-17)
2. ✅ Name the actor — rules 3.6, 3.7, the four conversion methods. (lesson 0002, reference/passive-to-active.html)
3. Noun clusters (rule 2.1, max 3 words) — highest-value rule for product copy.
4. One word, one meaning: the approved dictionary, Technical Names, Technical Verbs.
5. Verb tense restrictions, and why -ing forms are banned.
6. Warnings, cautions, and conditional instructions (order of clauses).
7. Paragraph and text structure; then a full pass over one of his real blog posts.
