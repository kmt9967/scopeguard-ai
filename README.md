# ScopeGuard AI

> Turn scattered client instructions into an approved, evidence-backed delivery plan.

**Category:** Work & Productivity  
**Built with:** Codex using GPT-5.6  
**Live demo:** [scopeguard-ai-rust.vercel.app](https://scopeguard-ai-rust.vercel.app)  
**Demo video:** Pending recording

ScopeGuard AI is a polished Work & Productivity hackathon project for agencies, production teams, developers, and operations managers. It turns briefs, meeting notes, email text, chats, tasks, and change requests into a traceable scope workspace—without making commitments on the user's behalf.

## The problem

Delivery scope rarely lives in one place. The signed brief says one thing, kickoff notes add another, and a later email quietly changes the date. Teams spend hours reconciling those fragments, and still risk missed requirements, unpriced work, rework, and uncomfortable client conversations.

ScopeGuard creates a reviewable source of truth before execution begins.

## Target users

- Creative and marketing agencies managing shifting client requests
- Producers and project managers coordinating multi-disciplinary delivery
- Development teams translating stakeholder messages into implementation scope
- Operations leaders who need auditable handoffs and risk visibility

## Why AI is necessary

The work is semantic, contextual, and cross-document. A request can be new without using the word “new”; two dates can conflict even when described in different formats; and an apparent requirement may only be a suggestion. A language model can compare meaning across unstructured sources and turn it into a consistent decision surface.

Keyword or rules-based systems are insufficient because they depend on predictable wording, struggle with paraphrases and implied changes, and cannot reliably connect a clarification question to the evidence that created it. ScopeGuard still constrains AI output with a strict schema and a human approval gate.

## Product flow

1. **New analysis:** Enter the project, client, agreed baseline, context, and multiple dated source cards. Plain text and Markdown files can be imported into a source.
2. **AI analysis:** The secure server route asks the configured model for strict structured output. Source-backed categories include requirements, conflicts, decisions, assumptions, scope creep, dependencies, risks, questions, tasks, criteria, and a change summary.
3. **Workspace:** Explore each finding by category with confidence labels and source IDs.
4. **Human review:** Edit, approve, or reject every requirement; answer and resolve questions; add notes; then explicitly confirm the final scope.
5. **Export:** Copy or download a Markdown brief, JSON record, client-facing summary, or internal checklist. Unconfirmed work remains clearly marked as draft.

## Architecture

```text
Browser / Next.js UI
  ├─ source intake and local draft state
  ├─ evidence-backed analysis dashboard
  ├─ review and approval controls
  └─ local export generation
             │
             ▼
POST /api/analyze (server only)
  ├─ validates required input
  ├─ calls the OpenAI Responses API
  ├─ requests strict JSON Schema output
  ├─ validates the response with Zod
  └─ rejects unknown source citations
```

The OpenAI key is referenced only inside the Node.js server route. No secret or model call is present in client code. The active workspace is saved to browser `localStorage` for prototype convenience; there is no authentication or server-side persistence.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the component boundary and trust model.

## GPT-5.6 usage

The model identifier is read exclusively from `OPENAI_MODEL`. Set it to `gpt-5.6` when that model is enabled for your account. The route uses the Responses API with strict JSON Schema output and performs a second Zod validation before returning analysis to the client.

The system instruction tells the model to:

- compare every source with the original baseline;
- cite valid source IDs for consequential findings;
- separate confirmed facts from uncertainty;
- treat later requests as proposed changes, not approved commitments;
- avoid legal conclusions, real assignments, or claims of client contact.

## Human-in-the-loop design

AI output begins as a draft. Requirements have independent approve, reject, edit, and reviewer-note controls. Clarification questions require human resolution. Final confirmation remains unavailable while decisions or questions are pending. Any edit after confirmation returns the project to draft status.

## Responsible AI safeguards

- Source traceability for consequential conclusions
- Confidence labels and uncertainty states
- Explicit human approval before finalization
- No automatic client communication or external-system writes
- No automatic task assignment; owners are suggestions only
- No claims of legal or contractual authority
- Visible methodology and limitations page
- Persistent reminders that incomplete inputs produce incomplete analysis
- Server-side key isolation and model selection
- Validation that model citations match supplied source IDs

## Local setup

Requirements: Node.js 20+ and an OpenAI API key for live analysis.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The included demo does not require an API key.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | For live analysis | Server-side OpenAI credential |
| `OPENAI_MODEL` | For live analysis | Model identifier, e.g. `gpt-5.6` |
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Absolute site URL for social metadata |

Never prefix the API key with `NEXT_PUBLIC_`.

## Deployment to Vercel

1. Import the repository into Vercel.
2. Set the root directory to `scopeguard-ai` if this project lives in a monorepo.
3. Add `OPENAI_API_KEY`, `OPENAI_MODEL`, and `NEXT_PUBLIC_SITE_URL` in project settings.
4. Deploy. Next.js routes and the Node.js API handler require no additional configuration.

## Demo walkthrough

1. On the landing page, choose **Explore the live demo**.
2. Review the signed five-page website and Meta campaign requirement.
3. Open **Conflicts** to see May 12 versus May 2 and one versus two homepage concepts.
4. Open **Scope creep** to find the wholesale portal, Spanish localization, videos, and community management.
5. Open **Needs clarification** to see the missing approver and budget decision.
6. Go to **Review**, approve or reject requirements, and resolve both questions.
7. Confirm the final scope, then export all four artifact formats.

## Testing

The repository includes automated coverage for the strict analysis contract, source-ID integrity, exports, input validation, prompt-injection fixtures, and safe API errors. GitHub Actions runs lint, tests, and the production build.

See [docs/TESTING.md](docs/TESTING.md) for the manual bug bash and deployment checklist.

## Codex collaboration

Codex converted the product brief into the Next.js architecture, strict model boundary, review state, exports, responsive product experience, automated tests, and submission documentation. The human builder retained the core decisions around evidence traceability, approval authority, responsible-AI limits, and judge experience.

See [docs/CODEX_BUILD_LOG.md](docs/CODEX_BUILD_LOG.md) for concrete implementation evidence. Run `/feedback` in the primary build task and add its Session ID before submission.

## Known limitations

- Analysis quality depends on complete, accurate source material.
- Source citations provide traceability, not factual or legal proof.
- Informal approvals, sarcasm, or organization-specific phrasing may be misread.
- Confidence is a model assessment, not a calibrated probability.
- Prototype state is device-local and has no multi-user collaboration or audit log.
- Text import currently supports `.txt` and `.md`; PDF, DOCX, and email parsing are future work.

## Future roadmap

- Team workspaces with roles, version history, and immutable approval records
- Side-by-side source excerpts and citation highlighting
- PDF, DOCX, email, and meeting-transcript ingestion
- Change-cost and schedule-impact estimation with human-set rate cards
- Re-analysis diffs when a new source is added
- Reusable approval templates and organization-specific terminology
- Optional, explicitly authorized integrations after the core review flow is proven

## Scripts

- `npm run dev` — start local development
- `npm run lint` — run ESLint
- `npm run build` — create the production build
- `npm start` — serve the production build
