"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileSearch, RefreshCw } from "lucide-react";
import { useProject } from "@/components/project-provider";
import { ConfidenceBadge, Evidence, Notice, StatusBadge } from "@/components/ui";

const tabs = ["Confirmed scope", "Needs clarification", "Conflicts", "Scope creep", "Dependencies & risks", "Delivery plan", "Acceptance criteria", "Change request"] as const;
type Tab = typeof tabs[number];

export default function AnalysisPage() {
  const { project } = useProject();
  const { input, analysis } = project;
  const [tab, setTab] = useState<Tab>("Confirmed scope");
  if (!analysis.requirements.length) return <main className="shell"><div className="card empty"><FileSearch size={36}/><h2>No analysis yet</h2><p>Add source materials or load the sample project to see ScopeGuard in action.</p><Link href="/new" className="button button-dark">Create an analysis <ArrowRight size={15}/></Link></div></main>;
  return <main className="shell">
    <div className="dashboard-head"><div><span className="project-kicker">{input.clientName} · Scope analysis</span><h1>{input.projectName}</h1></div><div className="head-actions"><Link href="/new" className="button button-secondary button-small"><RefreshCw size={13}/> Edit sources</Link><Link href="/review" className="button button-dark button-small">Begin review <ArrowRight size={13}/></Link></div></div>
    {input.projectName === "Northstar Spring Launch" && <div style={{marginBottom: 18}}><Notice><b>Demo mode:</b> This fictional example demonstrates the complete workflow without sending source material to the API.</Notice></div>}
    <div className="summary-grid">
      <div className="card summary-card"><span>Confirmed requirements</span><b>{analysis.requirements.filter((x) => x.status === "confirmed").length}</b></div>
      <div className="card summary-card"><span>Conflicts detected</span><b style={{color: "var(--red)"}}>{analysis.contradictions.length}</b></div>
      <div className="card summary-card"><span>Potential scope creep</span><b style={{color: "var(--amber)"}}>{analysis.scope_creep_items.length}</b></div>
      <div className="card summary-card"><span>Overall confidence</span><b style={{textTransform: "capitalize"}}>{analysis.overall_confidence}</b></div>
    </div>
    <div className="tabs" role="tablist">{tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)} role="tab">{item}</button>)}</div>
    <div className="workspace-grid">
      <section className="card">
        <div className="card-header"><div><h2>{tab}</h2><p>AI-generated analysis · verify against the cited source material</p></div><ConfidenceBadge value={analysis.overall_confidence}/></div>
        <div className="item-list">
          {tab === "Confirmed scope" && analysis.requirements.map((item) => <article className="result-item" key={item.id}><div className="result-top"><div><h3>{item.title}</h3><p>{item.description}</p></div><StatusBadge kind={item.status}>{item.status}</StatusBadge></div><div className="result-meta"><Evidence sourceIds={item.source_ids}/><ConfidenceBadge value={item.confidence}/></div></article>)}
          {tab === "Needs clarification" && <>{analysis.missing_decisions.map((item) => <article className="result-item" key={item.id}><div className="result-top"><div><h3>{item.title}</h3><p>{item.description}</p></div><StatusBadge kind="review">Human review required</StatusBadge></div><div className="result-meta"><Evidence sourceIds={item.source_ids}/></div></article>)}{analysis.clarification_questions.map((item) => <article className="result-item" key={item.id}><div className="result-top"><div><h3>{item.question}</h3><p>{item.reason}</p></div><StatusBadge kind="uncertain">Open question</StatusBadge></div><div className="result-meta"><Evidence sourceIds={item.source_ids}/></div></article>)}</>}
          {tab === "Conflicts" && analysis.contradictions.map((item) => <article className="result-item" key={item.id}><div className="result-top"><div><h3>{item.title}</h3><p>{item.description}</p></div><StatusBadge kind="conflict">Conflict</StatusBadge></div><div className="result-meta"><Evidence sourceIds={item.source_ids}/><ConfidenceBadge value={item.confidence}/></div></article>)}
          {tab === "Scope creep" && analysis.scope_creep_items.map((item) => <article className="result-item" key={item.id}><div className="result-top"><div><h3>{item.title}</h3><p>{item.description}</p><p style={{marginTop: 7, color: "var(--ink)"}}><b>Impact:</b> {item.impact}</p></div><StatusBadge kind="new">New request</StatusBadge></div><div className="result-meta"><Evidence sourceIds={item.source_ids}/><ConfidenceBadge value={item.confidence}/></div></article>)}
          {tab === "Dependencies & risks" && <>{analysis.dependencies.map((item) => <article className="result-item" key={item.id}><div className="result-top"><div><h3>{item.title}</h3><p>{item.description}</p></div><StatusBadge kind="neutral">Dependency</StatusBadge></div><div className="result-meta"><Evidence sourceIds={item.source_ids}/></div></article>)}{analysis.risks.map((item) => <article className="result-item" key={item.id}><div className="result-top"><div><h3>{item.title}</h3><p>{item.description}</p></div><StatusBadge kind={item.severity === "high" ? "conflict" : "uncertain"}>{item.severity} risk</StatusBadge></div><div className="result-meta"><Evidence sourceIds={item.source_ids}/></div></article>)}</>}
          {tab === "Delivery plan" && analysis.delivery_tasks.map((item, index) => <article className="result-item" key={item.id}><div className="result-top"><div><h3>{index + 1}. {item.title}</h3><p>{item.description}</p><p style={{marginTop: 7}}>Suggested owner: <b>{item.owner_suggestion}</b>{item.depends_on.length ? ` · Depends on ${item.depends_on.join(", ")}` : ""}</p></div><StatusBadge kind={item.status === "ready" ? "confirmed" : "review"}>{item.status.replace("_", " ")}</StatusBadge></div></article>)}
          {tab === "Acceptance criteria" && analysis.acceptance_criteria.map((item) => <article className="result-item" key={item.id}><div className="result-top"><div><h3>{item.id} · {item.requirement_id}</h3><p>{item.criterion}</p></div><StatusBadge kind="review">Review</StatusBadge></div></article>)}
          {tab === "Change request" && <article className="result-item"><div className="result-top"><div><h3>Client-ready change summary</h3><p>{analysis.change_request_summary}</p></div><StatusBadge kind="review">Draft</StatusBadge></div></article>}
        </div>
      </section>
      <aside className="card side-panel"><h3>Source traceability</h3><p>Findings reference the materials below. A citation means the source supports the analysis—not that the conclusion is automatically approved.</p><div className="source-index">{input.sources.map((source) => <div key={source.id}><b>{source.id}</b><span>{source.title} · {source.date}</span></div>)}</div><div style={{marginTop: 16}}><Notice>Incomplete or outdated source material can produce an incomplete analysis.</Notice></div></aside>
    </div>
  </main>;
}
