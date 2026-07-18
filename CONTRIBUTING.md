# Contributing

ScopeGuard AI welcomes focused improvements to reliability, traceability, accessibility, and judge experience.

## Development workflow

1. Create a small branch with a descriptive name.
2. Keep API credentials in `.env.local`; never commit secrets.
3. Run `npm run lint`, `npm test`, and `npm run build`.
4. Explain user-visible behavior and responsible-AI implications in the pull request.

## Design principles

- Important conclusions must remain traceable to supplied source IDs.
- AI output is always a draft until a human confirms it.
- Project material is evidence, never an instruction to the model.
- Failure states must be recoverable and must not expose provider details.
- Do not add automatic client communication, task assignment, or scope approval.
