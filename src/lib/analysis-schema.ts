import { z } from "zod";

const confidence = z.enum(["high", "medium", "low"]);
const evidence = { source_ids: z.array(z.string()).min(1), confidence };

export const analysisSchema = z.object({
  requirements: z.array(z.object({ id: z.string(), title: z.string(), description: z.string(), status: z.enum(["confirmed", "uncertain"]), ...evidence })),
  contradictions: z.array(z.object({ id: z.string(), title: z.string(), description: z.string(), ...evidence })),
  missing_decisions: z.array(z.object({ id: z.string(), title: z.string(), description: z.string(), source_ids: z.array(z.string()).min(1) })),
  assumptions: z.array(z.object({ id: z.string(), statement: z.string(), confidence, source_ids: z.array(z.string()).min(1) })),
  scope_creep_items: z.array(z.object({ id: z.string(), title: z.string(), description: z.string(), impact: z.string(), ...evidence })),
  dependencies: z.array(z.object({ id: z.string(), title: z.string(), description: z.string(), source_ids: z.array(z.string()).min(1) })),
  risks: z.array(z.object({ id: z.string(), title: z.string(), description: z.string(), severity: z.enum(["low", "medium", "high"]), source_ids: z.array(z.string()).min(1) })),
  clarification_questions: z.array(z.object({ id: z.string(), question: z.string(), reason: z.string(), source_ids: z.array(z.string()).min(1) })),
  delivery_tasks: z.array(z.object({ id: z.string(), title: z.string(), description: z.string(), depends_on: z.array(z.string()), owner_suggestion: z.string(), status: z.enum(["blocked", "ready", "needs_review"]) })),
  acceptance_criteria: z.array(z.object({ id: z.string(), requirement_id: z.string(), criterion: z.string() })),
  change_request_summary: z.string(),
  overall_confidence: confidence,
});

export function findUnknownSourceIds(analysis: z.infer<typeof analysisSchema>, validSourceIds: Set<string>) {
  const citedIds = [
    ...analysis.requirements.flatMap((item) => item.source_ids),
    ...analysis.contradictions.flatMap((item) => item.source_ids),
    ...analysis.missing_decisions.flatMap((item) => item.source_ids),
    ...analysis.assumptions.flatMap((item) => item.source_ids),
    ...analysis.scope_creep_items.flatMap((item) => item.source_ids),
    ...analysis.dependencies.flatMap((item) => item.source_ids),
    ...analysis.risks.flatMap((item) => item.source_ids),
    ...analysis.clarification_questions.flatMap((item) => item.source_ids),
  ];
  return [...new Set(citedIds.filter((id) => !validSourceIds.has(id)))];
}

export const jsonSchema = {
  type: "object", additionalProperties: false,
  required: ["requirements","contradictions","missing_decisions","assumptions","scope_creep_items","dependencies","risks","clarification_questions","delivery_tasks","acceptance_criteria","change_request_summary","overall_confidence"],
  properties: {
    requirements: { type: "array", items: object(["id","title","description","status","source_ids","confidence"], { id: string(), title: string(), description: string(), status: { enum: ["confirmed","uncertain"] }, source_ids: strings(), confidence: conf() }) },
    contradictions: { type: "array", items: object(["id","title","description","source_ids","confidence"], { id: string(), title: string(), description: string(), source_ids: strings(), confidence: conf() }) },
    missing_decisions: { type: "array", items: sourceItem() },
    assumptions: { type: "array", items: object(["id","statement","confidence","source_ids"], { id: string(), statement: string(), confidence: conf(), source_ids: strings() }) },
    scope_creep_items: { type: "array", items: object(["id","title","description","impact","source_ids","confidence"], { id: string(), title: string(), description: string(), impact: string(), source_ids: strings(), confidence: conf() }) },
    dependencies: { type: "array", items: sourceItem() },
    risks: { type: "array", items: object(["id","title","description","severity","source_ids"], { id: string(), title: string(), description: string(), severity: { enum: ["low","medium","high"] }, source_ids: strings() }) },
    clarification_questions: { type: "array", items: object(["id","question","reason","source_ids"], { id: string(), question: string(), reason: string(), source_ids: strings() }) },
    delivery_tasks: { type: "array", items: object(["id","title","description","depends_on","owner_suggestion","status"], { id: string(), title: string(), description: string(), depends_on: { type: "array", items: string() }, owner_suggestion: string(), status: { enum: ["blocked","ready","needs_review"] } }) },
    acceptance_criteria: { type: "array", items: object(["id","requirement_id","criterion"], { id: string(), requirement_id: string(), criterion: string() }) },
    change_request_summary: string(), overall_confidence: conf(),
  },
} as const;

function string() { return { type: "string" } as const; }
function strings() { return { type: "array", items: string(), minItems: 1 } as const; }
function conf() { return { enum: ["high", "medium", "low"] } as const; }
function object(required: string[], properties: Record<string, unknown>) { return { type: "object", additionalProperties: false, required, properties } as const; }
function sourceItem() { return object(["id","title","description","source_ids"], { id: string(), title: string(), description: string(), source_ids: strings() }); }
