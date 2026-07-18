import { StoredProject } from "./types";

export type ExportKind = "brief" | "json" | "client" | "checklist";

export function exportContent(project: StoredProject, kind: ExportKind) {
  const { input, analysis } = project;
  const approved = analysis.requirements.filter((item) => item.reviewStatus === "approved");
  if (kind === "json") return JSON.stringify(project, null, 2);
  if (kind === "client") return `# Scope summary — ${input.projectName}\n\n**Client:** ${input.clientName}\n**Status:** ${analysis.finalized ? "Human-approved" : "DRAFT — pending human approval"}\n\n## Approved delivery scope\n${lines(approved, (x) => `- **${x.title}:** ${x.description}`)}\n\n## Proposed changes requiring approval\n${analysis.change_request_summary}\n\n## Open decisions\n${lines(analysis.clarification_questions.filter((x) => !x.resolved), (x) => `- ${x.question}`)}\n\n> This summary supports project planning and is not legal or contractual advice.`;
  if (kind === "checklist") return `# Internal production checklist — ${input.projectName}\n\n**Approval status:** ${analysis.finalized ? "Confirmed" : "Not final"}\n\n## Pre-flight\n${analysis.clarification_questions.map((x) => `- [${x.resolved ? "x" : " "}] ${x.question}${x.answer ? ` — ${x.answer}` : ""}`).join("\n")}\n\n## Delivery tasks\n${analysis.delivery_tasks.map((x) => `- [ ] **${x.id} ${x.title}** — ${x.description} (${x.status.replace("_", " ")})`).join("\n")}\n\n## Acceptance checks\n${analysis.acceptance_criteria.map((x) => `- [ ] ${x.criterion} (${x.requirement_id})`).join("\n")}`;
  return `# ${input.projectName}\n\n**Client:** ${input.clientName}\n**Scope status:** ${analysis.finalized ? "Human-approved" : "DRAFT — pending human approval"}\n**Analysis confidence:** ${analysis.overall_confidence}\n\n## Agreed baseline\n${input.originalScope}\n\n## Approved requirements\n${lines(approved, (x) => `- **${x.id} ${x.title}:** ${x.description} _Evidence: ${x.source_ids.join(", ")}_`)}\n\n## Rejected requirements\n${lines(analysis.requirements.filter((x) => x.reviewStatus === "rejected"), (x) => `- ~~${x.title}~~${x.reviewerNote ? ` — ${x.reviewerNote}` : ""}`)}\n\n## Conflicts\n${lines(analysis.contradictions, (x) => `- **${x.title}:** ${x.description} _Evidence: ${x.source_ids.join(", ")}_`)}\n\n## Scope-creep warnings\n${lines(analysis.scope_creep_items, (x) => `- **${x.title}:** ${x.description} Impact: ${x.impact}`)}\n\n## Reviewer notes\n${analysis.reviewerNotes || "None recorded."}\n\n> Generated as decision support. Verify source completeness and obtain appropriate human approval.`;
}

function lines<T>(items: T[], render: (item: T) => string) { return items.length ? items.map(render).join("\n") : "- None recorded."; }
