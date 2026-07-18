"use client";

import Link from "next/link";
import { Check, Copy, Download, FileSearch, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useProject } from "@/components/project-provider";
import { Notice, PageIntro, StatusBadge } from "@/components/ui";
import { ExportKind, exportContent } from "@/lib/exports";

const options: { id: ExportKind; label: string; extension: string }[] = [
  { id: "brief", label: "Markdown project brief", extension: "md" },
  { id: "json", label: "Structured JSON", extension: "json" },
  { id: "client", label: "Client-facing summary", extension: "md" },
  { id: "checklist", label: "Production checklist", extension: "md" },
];

export default function ExportPage() {
  const { project } = useProject();
  const [kind, setKind] = useState<ExportKind>("brief");
  const [copied, setCopied] = useState(false);
  if (!project.analysis.requirements.length) return <main className="shell"><div className="card empty"><FileSearch size={36}/><h2>No project to export</h2><p>Analyze and review a project before creating a handoff.</p><Link href="/new" className="button button-dark">Create analysis</Link></div></main>;
  const content = exportContent(project, kind);
  const selected = options.find((x) => x.id === kind)!;
  const copy = async () => { await navigator.clipboard.writeText(content); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const download = () => { const blob = new Blob([content], { type: kind === "json" ? "application/json" : "text/markdown" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${project.input.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${kind}.${selected.extension}`; anchor.click(); URL.revokeObjectURL(url); };
  return <main className="shell">
    <PageIntro eyebrow="Export center" title="Package the approved scope." description="Create a client handoff or internal production artifact from the reviewed project. Draft status remains visible until a human confirms the final scope." action={<StatusBadge kind={project.analysis.finalized ? "confirmed" : "review"}>{project.analysis.finalized ? "Human-approved" : "Draft only"}</StatusBadge>}/>
    {!project.analysis.finalized && <div style={{marginBottom: 18}}><Notice><b>This project is not final.</b> Exports will be clearly marked as drafts. Complete human review before treating them as approved delivery scope.</Notice></div>}
    <div className="export-grid">
      <aside className="card export-options">{options.map((option) => <button className={kind === option.id ? "active" : ""} key={option.id} onClick={() => setKind(option.id)}>{option.label}</button>)}</aside>
      <section className="card export-preview"><div className="export-toolbar"><div><h2>{selected.label}</h2><span style={{fontSize: 10, color: "var(--muted)"}}>{content.length.toLocaleString()} characters</span></div><div className="head-actions"><button className="button button-secondary button-small" onClick={copy}>{copied ? <Check size={13}/> : <Copy size={13}/>} {copied ? "Copied" : "Copy"}</button><button className="button button-dark button-small" onClick={download}><Download size={13}/> Download</button></div></div><pre>{content}</pre></section>
    </div>
    <div style={{display: "flex", alignItems: "center", gap: 7, color: "var(--muted)", fontSize: 10, marginTop: 14}}><LockKeyhole size={12}/> Export happens in your browser. ScopeGuard does not send it to clients or external systems.</div>
  </main>;
}
