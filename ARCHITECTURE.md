# ScopeGuard AI Architecture

## System boundary

```text
Source cards in browser
        │
        ▼
Next.js client workspace ──────── local demo and export generation
        │ POST /api/analyze
        ▼
Next.js server route
  ├─ Zod input and size validation
  ├─ untrusted-source prompt boundary
  ├─ OpenAI Responses API
  ├─ strict JSON Schema output
  ├─ Zod response validation
  └─ source-ID integrity validation
        │
        ▼
Human review workspace
  ├─ approve / reject / edit
  ├─ resolve questions
  ├─ reviewer notes
  └─ explicit final confirmation
        │
        ▼
Browser-generated exports
```

## Components

- `src/app/new`: multi-source intake and text-file import.
- `src/app/api/analyze`: server-only OpenAI boundary.
- `src/lib/analysis-schema.ts`: strict response contract and citation integrity.
- `src/lib/input-schema.ts`: limits and validation for untrusted project material.
- `src/app/analysis`: traceable analysis workspace.
- `src/app/review`: editable human approval gate.
- `src/lib/exports.ts`: deterministic, local export generation.
- `src/app/methodology`: visible responsible-AI boundaries.

## Security and privacy

The OpenAI key never crosses the server boundary. Source text is explicitly labeled untrusted in the model instruction, response citations must match supplied IDs, and provider errors are converted into safe recovery messages. Prototype state is local to the browser; production teams should add an approved retention and access-control design before storing client material centrally.

## Why strict structured output

The dashboard needs repeatable fields, not prose that happens to look structured. JSON Schema constrains generation, Zod verifies the runtime response, and a separate integrity pass rejects citations to nonexistent sources. This layered boundary keeps the UI predictable without treating model output as trusted.
