export type SourceType = "Brief" | "Meeting notes" | "Email" | "Chat" | "Task" | "Change request" | "Other";

export interface ScopeSource {
  id: string;
  title: string;
  type: SourceType;
  date: string;
  content: string;
}

export interface ProjectInput {
  projectName: string;
  clientName: string;
  originalScope: string;
  notes: string;
  sources: ScopeSource[];
}

export type Confidence = "high" | "medium" | "low";
export type ReviewStatus = "pending" | "approved" | "rejected";

export interface EvidenceItem {
  source_ids: string[];
  confidence: Confidence;
}

export interface Requirement extends EvidenceItem {
  id: string;
  title: string;
  description: string;
  status: "confirmed" | "uncertain";
  reviewStatus?: ReviewStatus;
  reviewerNote?: string;
}

export interface Contradiction extends EvidenceItem {
  id: string;
  title: string;
  description: string;
}

export interface ScopeCreepItem extends EvidenceItem {
  id: string;
  title: string;
  description: string;
  impact: string;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  reason: string;
  source_ids: string[];
  resolved?: boolean;
  answer?: string;
}

export interface DeliveryTask {
  id: string;
  title: string;
  description: string;
  depends_on: string[];
  owner_suggestion: string;
  status: "blocked" | "ready" | "needs_review";
}

export interface AcceptanceCriterion {
  id: string;
  requirement_id: string;
  criterion: string;
}

export interface AnalysisResult {
  requirements: Requirement[];
  contradictions: Contradiction[];
  missing_decisions: { id: string; title: string; description: string; source_ids: string[] }[];
  assumptions: { id: string; statement: string; confidence: Confidence; source_ids: string[] }[];
  scope_creep_items: ScopeCreepItem[];
  dependencies: { id: string; title: string; description: string; source_ids: string[] }[];
  risks: { id: string; title: string; description: string; severity: "low" | "medium" | "high"; source_ids: string[] }[];
  clarification_questions: ClarificationQuestion[];
  delivery_tasks: DeliveryTask[];
  acceptance_criteria: AcceptanceCriterion[];
  change_request_summary: string;
  overall_confidence: Confidence;
  finalized?: boolean;
  reviewerNotes?: string;
}

export interface StoredProject {
  input: ProjectInput;
  analysis: AnalysisResult;
}
