"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp, Plus, Sparkles, Trash2 } from "lucide-react";
import { useProject } from "@/components/project-provider";
import { Notice, PageIntro } from "@/components/ui";
import { ProjectInput, ScopeSource, SourceType } from "@/lib/types";

const sourceTypes: SourceType[] = ["Brief", "Meeting notes", "Email", "Chat", "Task", "Change request", "Other"];
const newSource = (index: number): ScopeSource => ({ id: `SRC-${String(index + 1).padStart(2, "0")}`, title: "", type: "Brief", date: new Date().toISOString().slice(0, 10), content: "" });

export default function NewAnalysisPage() {
  const router = useRouter();
  const { project, setInput, setAnalysis, loadDemo } = useProject();
  const [input, setLocalInput] = useState<ProjectInput>(project.input.sources.length ? project.input : { projectName: "", clientName: "", originalScope: "", notes: "", sources: [newSource(0)] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const updateSource = (index: number, patch: Partial<ScopeSource>) => setLocalInput((current) => ({ ...current, sources: current.sources.map((source, i) => i === index ? { ...source, ...patch } : source) }));
  const removeSource = (index: number) => setLocalInput((current) => ({ ...current, sources: current.sources.filter((_, i) => i !== index).map((source, i) => ({ ...source, id: `SRC-${String(i + 1).padStart(2, "0")}` })) }));
  const addSource = () => setLocalInput((current) => ({ ...current, sources: [...current.sources, newSource(current.sources.length)] }));
  const upload = async (index: number, file?: File) => { if (!file) return; const content = await file.text(); updateSource(index, { title: input.sources[index].title || file.name, content }); };
  const useDemo = () => { loadDemo(); router.push("/analysis"); };

  const analyze = async () => {
    setError("");
    if (!input.projectName.trim() || !input.clientName.trim() || !input.originalScope.trim() || !input.sources.some((source) => source.title.trim() && source.content.trim())) { setError("Add the project, client, agreed scope, and at least one complete source before analyzing."); return; }
    setLoading(true); setInput(input);
    try {
      const response = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis could not be completed.");
      setAnalysis(data); router.push("/analysis");
    } catch (err) { setError(err instanceof Error ? err.message : "Analysis could not be completed."); }
    finally { setLoading(false); }
  };

  return <main className="shell narrow">
    <PageIntro eyebrow="New analysis" title="Build the source of truth." description="Add the agreed baseline and every source that changed, clarified, or challenged it. ScopeGuard will preserve each source ID for traceability." action={<button className="button button-secondary" onClick={useDemo}>Load polished demo</button>} />
    <div className="stack">
      <section className="card card-pad">
        <div className="form-grid">
          <div className="field"><label htmlFor="project">Project name</label><input id="project" className="input" placeholder="e.g. Northstar Spring Launch" value={input.projectName} onChange={(e) => setLocalInput({ ...input, projectName: e.target.value })}/></div>
          <div className="field"><label htmlFor="client">Client or organization</label><input id="client" className="input" placeholder="e.g. Northstar Coffee Co." value={input.clientName} onChange={(e) => setLocalInput({ ...input, clientName: e.target.value })}/></div>
          <div className="field full"><label htmlFor="scope">Original agreed scope</label><textarea id="scope" className="input textarea" placeholder="Paste the baseline deliverables, exclusions, dates, and constraints…" value={input.originalScope} onChange={(e) => setLocalInput({ ...input, originalScope: e.target.value })}/><small>Treat this as the baseline—not as legal or contractual interpretation.</small></div>
          <div className="field full"><label htmlFor="notes">Project context <span style={{fontWeight: 500, color: "var(--muted)"}}>(optional)</span></label><textarea id="notes" className="input" style={{minHeight: 80}} placeholder="Anything the reviewer should know…" value={input.notes} onChange={(e) => setLocalInput({ ...input, notes: e.target.value })}/></div>
        </div>
      </section>
      <div className="card-header" style={{paddingLeft: 2, paddingRight: 2}}><div><h2>Source materials</h2><p>Emails, meeting notes, chats, tasks, or change requests</p></div><button className="button button-secondary button-small" onClick={addSource}><Plus size={14}/> Add source</button></div>
      {input.sources.map((source, index) => <section className="card source-card" key={source.id}>
        <div className="source-card-top">
          <div className="field"><span className="source-label">{source.id}</span><label htmlFor={`title-${index}`}>Source title</label><input id={`title-${index}`} className="input" placeholder="e.g. Kickoff notes" value={source.title} onChange={(e) => updateSource(index, { title: e.target.value })}/></div>
          <div className="field"><label htmlFor={`type-${index}`}>Type</label><select id={`type-${index}`} className="input" value={source.type} onChange={(e) => updateSource(index, { type: e.target.value as SourceType })}>{sourceTypes.map((type) => <option key={type}>{type}</option>)}</select></div>
          <div className="field"><label htmlFor={`date-${index}`}>Date</label><input id={`date-${index}`} type="date" className="input" value={source.date} onChange={(e) => updateSource(index, { date: e.target.value })}/></div>
          <button className="button button-danger button-small" onClick={() => removeSource(index)} disabled={input.sources.length === 1} aria-label={`Remove source ${index + 1}`}><Trash2 size={14}/></button>
        </div>
        <div className="field" style={{marginTop: 13}}><label htmlFor={`content-${index}`}>Source content</label><textarea id={`content-${index}`} className="input textarea" placeholder="Paste the exact source text here…" value={source.content} onChange={(e) => updateSource(index, { content: e.target.value })}/></div>
        <div className="source-actions"><label className="file-label"><FileUp size={14}/> Import .txt or .md<input type="file" accept=".txt,.md,text/plain,text/markdown" onChange={(e) => upload(index, e.target.files?.[0])}/></label><span style={{fontSize: 10, color: "var(--muted)"}}>{source.content.length.toLocaleString()} characters</span></div>
      </section>)}
      <Notice><b>Analysis supports judgment; it does not make commitments.</b> Source material may be incomplete, and all findings require human review before finalization.</Notice>
      {error && <div className="error" role="alert">{error}</div>}
      <div className="form-footer"><span style={{color: "var(--muted)", fontSize: 11}}>{input.sources.length} source{input.sources.length === 1 ? "" : "s"} · IDs stay attached to findings</span><button className="button button-dark" onClick={analyze} disabled={loading}>{loading ? "Analyzing sources…" : <><Sparkles size={16}/> Analyze project</>}</button></div>
    </div>
  </main>;
}
