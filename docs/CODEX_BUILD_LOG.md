# Codex Collaboration

ScopeGuard AI was created during OpenAI Build Week in one primary Codex task. Codex handled implementation and verification while the human builder retained the product, safety, and submission decisions.

| Area | How Codex helped | Key human decision | Evidence |
| --- | --- | --- | --- |
| Product architecture | Built the Next.js application structure and server boundary | Use an evidence-first scope workspace, not a general chatbot | Primary Codex task and repository history |
| Analysis contract | Implemented Zod and strict JSON Schema | Require source IDs for consequential conclusions | `src/lib/analysis-schema.ts` |
| Input security | Added source limits and an untrusted-evidence prompt boundary | Never follow instructions embedded in client material | `src/lib/input-schema.ts`, API route |
| Review workflow | Built editing, approval, rejection, resolution, and confirmation state | AI must never finalize delivery scope | `src/app/review/page.tsx` |
| Exports | Implemented deterministic Markdown, JSON, client, and checklist outputs | Draft status remains visible until human confirmation | `src/lib/exports.ts` |
| Responsible AI | Added visible limits, traceability, and safe error handling | No client contact, legal authority, or automatic assignment | Methodology page and `src/lib/api-errors.ts` |
| Reliability | Added validation, tests, CI, production builds, and route smoke checks | Preserve a useful demo even when live AI is unavailable | Tests and `.github/workflows/ci.yml` |
| Product design | Built a responsive premium SaaS interface and social card | Optimize the first 30 seconds for judges | Landing page and demo workflow |

## Where Codex accelerated development

Codex converted a detailed product brief into a component architecture, implemented the cross-page workflow, created the strict server contract, produced realistic demo data, generated export formats, and iterated through lint, type, dependency, and production-build failures. It also converted post-build feedback into specific reliability and submission assets.

## Human decisions retained

- The baseline is evidence, not a legal determination.
- Later requests remain proposed changes until reviewed.
- Human confirmation is required after individual review decisions.
- The model may suggest roles but cannot assign work.
- Demo mode must stay available without live API access.

## Session evidence

Run `/feedback` in the primary Codex task and record the returned Session ID here before submission:

`Codex Session ID: PENDING`
