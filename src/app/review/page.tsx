"use client";

import Link from "next/link";
import { Check, ClipboardCheck, FileSearch, Pencil, X } from "lucide-react";
import { useProject } from "@/components/project-provider";
import { Evidence, PageIntro, StatusBadge } from "@/components/ui";

export default function ReviewPage() {
  const { project, setAnalysis } = useProject();
  const analysis = project.analysis;
  if (!analysis.requirements.length) return <main className="shell"><div className="card empty"><FileSearch size={36}/><h2>Nothing to review</h2><p>Run an analysis first, then return here to approve the proposed scope.</p><Link href="/new" className="button button-dark">Create analysis</Link></div></main>;
  const updateRequirement = (id: string, patch: Partial<(typeof analysis.requirements)[number]>) => setAnalysis({ ...analysis, finalized: false, requirements: analysis.requirements.map((item) => item.id === id ? { ...item, ...patch } : item) });
  const updateQuestion = (id: string, patch: Partial<(typeof analysis.clarification_questions)[number]>) => setAnalysis({ ...analysis, finalized: false, clarification_questions: analysis.clarification_questions.map((item) => item.id === id ? { ...item, ...patch } : item) });
  const unresolved = analysis.clarification_questions.filter((item) => !item.resolved).length;
  const pending = analysis.requirements.filter((item) => !item.reviewStatus || item.reviewStatus === "pending").length;
  const canFinalize = pending === 0 && unresolved === 0;
  return <main className="shell narrow">
    <PageIntro eyebrow="Human approval" title="Review every conclusion." description="Edit the AI draft, approve or reject requirements, resolve open questions, and record reviewer context. ScopeGuard never finalizes on its own." action={<Link href="/analysis" className="button button-secondary">Back to analysis</Link>}/>
    <div className="stack">
      <section className="card"><div className="card-header"><div><h2>Requirements</h2><p>{pending} awaiting a decision · edits remain reviewer-controlled</p></div><StatusBadge kind="review">Human review required</StatusBadge></div><div className="item-list review-grid">
        {analysis.requirements.map((item) => <article key={item.id} className={`result-item review-card ${item.reviewStatus ?? "pending"}`}>
          <div className="result-top"><div style={{flex: 1}}><div className="field"><label htmlFor={`title-${item.id}`}>{item.id} · Requirement title</label><input id={`title-${item.id}`} className="input" value={item.title} onChange={(e) => updateRequirement(item.id, { title: e.target.value })}/></div><div className="field" style={{marginTop: 10}}><label htmlFor={`desc-${item.id}`}>Description</label><textarea id={`desc-${item.id}`} className="input" style={{minHeight: 72}} value={item.description} onChange={(e) => updateRequirement(item.id, { description: e.target.value })}/></div></div><Pencil size={14} style={{color: "var(--muted)", marginTop: 28}}/></div>
          <div className="result-meta"><Evidence sourceIds={item.source_ids}/></div>
          <div className="field" style={{marginTop: 12}}><label htmlFor={`note-${item.id}`}>Reviewer note</label><input id={`note-${item.id}`} className="input" placeholder="Optional rationale or condition…" value={item.reviewerNote ?? ""} onChange={(e) => updateRequirement(item.id, { reviewerNote: e.target.value })}/></div>
          <div className="review-actions"><button className="button button-small button-secondary" onClick={() => updateRequirement(item.id, { reviewStatus: "approved" })}><Check size={13}/> Approve</button><button className="button button-small button-secondary" onClick={() => updateRequirement(item.id, { reviewStatus: "rejected" })}><X size={13}/> Reject</button><button className="button button-small" onClick={() => updateRequirement(item.id, { reviewStatus: "pending" })}>Reset</button></div>
        </article>)}
      </div></section>
      <section className="card"><div className="card-header"><div><h2>Clarification questions</h2><p>Record the answer before marking each decision resolved</p></div><StatusBadge kind={unresolved ? "uncertain" : "confirmed"}>{unresolved ? `${unresolved} open` : "Resolved"}</StatusBadge></div><div className="item-list review-grid">
        {analysis.clarification_questions.map((item) => <article key={item.id} className="result-item review-card"><div className="question-row"><button className={`check ${item.resolved ? "checked" : ""}`} onClick={() => updateQuestion(item.id, { resolved: !item.resolved })} aria-label={item.resolved ? "Mark unresolved" : "Mark resolved"}>{item.resolved && <Check size={14}/>}</button><div style={{flex: 1}}><h3>{item.question}</h3><p>{item.reason}</p><div className="result-meta"><Evidence sourceIds={item.source_ids}/></div><div className="field" style={{marginTop: 12}}><label htmlFor={`answer-${item.id}`}>Resolution or answer</label><textarea id={`answer-${item.id}`} className="input" style={{minHeight: 65}} placeholder="Record the human decision…" value={item.answer ?? ""} onChange={(e) => updateQuestion(item.id, { answer: e.target.value, resolved: false })}/></div></div></div></article>)}
      </div></section>
      <section className="card card-pad"><div className="field"><label htmlFor="review-notes">Overall reviewer notes</label><textarea id="review-notes" className="input textarea" placeholder="Capture constraints, approvals, or handoff context…" value={analysis.reviewerNotes ?? ""} onChange={(e) => setAnalysis({ ...analysis, finalized: false, reviewerNotes: e.target.value })}/></div></section>
      <section className={`card finalize ${analysis.finalized ? "done" : ""}`}><div><b>{analysis.finalized ? "Final scope confirmed" : "Confirm the reviewed scope"}</b><p>{analysis.finalized ? "This version is marked as human-approved and ready to export." : canFinalize ? "All required reviews are complete." : `${pending} requirement decisions and ${unresolved} clarification answers remain.`}</p></div><button className="button button-primary" disabled={!canFinalize} onClick={() => setAnalysis({ ...analysis, finalized: true })}><ClipboardCheck size={16}/>{analysis.finalized ? "Confirmed" : "Confirm final scope"}</button></section>
    </div>
  </main>;
}
