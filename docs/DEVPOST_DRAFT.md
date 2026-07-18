# Devpost Draft

## Basics

- **Title:** ScopeGuard AI
- **Tagline:** Turn scattered client instructions into an approved, evidence-backed delivery plan.
- **Category:** Work & Productivity
- **Live demo:** https://scopeguard-ai-rust.vercel.app
- **Repository:** https://github.com/kmt9967/scopeguard-ai
- **Demo video:** PENDING
- **Codex Session ID:** PENDING — run `/feedback` in the primary build task

## Inspiration

Agencies and production teams receive scope information across briefs, calls, emails, chats, and revisions. The actual delivery agreement becomes difficult to track, creating missed requirements, unpaid work, rework, and risky client expectations.

## What it does

ScopeGuard AI converts fragmented source material into traceable requirements, contradictions, missing decisions, assumptions, scope-creep warnings, dependencies, risks, delivery tasks, acceptance criteria, and a client-ready change summary. Every consequential finding links back to its supporting source, and nothing becomes final without human review.

## How it works

Source cards → validated project input → GPT reasoning with strict JSON Schema → source-ID integrity validation → evidence-backed dashboard → human approval → approved exports.

## Why AI is necessary

The task requires semantic comparison across differently worded sources, contradiction detection, contextual reasoning, and transformation into testable acceptance criteria. Keyword rules cannot reliably tell a suggestion from a commitment or connect a later request to an earlier exclusion.

## Human-in-the-loop and responsible AI

ScopeGuard never approves scope, makes contractual decisions, contacts clients, or assigns work. It exposes evidence, confidence, uncertainty, prompt-injection boundaries, validation failures, and incomplete-input limitations. Reviewers edit, approve, reject, resolve, and explicitly confirm the final scope.

## How Codex and GPT-5.6 were used

Codex using GPT-5.6 helped build the Next.js architecture, strict schemas, secure server route, evidence validation, approval workflow, exports, responsive design, realistic demo, automated tests, and documentation. The human builder made the core decisions around traceability, approval authority, scope boundaries, and judge experience.

## Challenges

- Keeping evidence connected to every important conclusion
- Validating complex structured model output
- Managing editable approval state across the workflow
- Making failures clear without exposing provider details
- Preserving a complete demo when live API access is unavailable

## Accomplishments

- Complete source-to-export workflow
- Strict schemas and citation validation
- Human-controlled finalization
- Four export formats
- Responsive, judge-ready demo
- Responsible-AI and prompt-injection safeguards
- Automated tests and CI

## What is next

Team workspaces, versioned scope baselines, revision comparison, document ingestion, organization-specific policies, and explicitly authorized project-management integrations.
