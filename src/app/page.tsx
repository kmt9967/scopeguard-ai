"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, CircleAlert, FileCheck2, GitCompareArrows, ScanSearch, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";
import { useProject } from "@/components/project-provider";
import { StatusBadge } from "@/components/ui";

export default function LandingPage() {
  const router = useRouter();
  const { loadDemo } = useProject();
  const openDemo = () => { loadDemo(); router.push("/analysis"); };
  return <main>
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Evidence before execution</p>
          <h1>Keep every project inside the lines.</h1>
          <p>Turn scattered client instructions into an approved, evidence-backed delivery plan—before ambiguity becomes rework.</p>
          <div className="hero-actions"><Link href="/new" className="button button-primary">Start a scope analysis <ArrowRight size={16}/></Link><button className="button button-secondary" onClick={openDemo}>Explore the live demo</button></div>
          <div className="hero-note"><span><Check size={13}/> Human approval required</span><span><Check size={13}/> Every claim links to evidence</span><span><Check size={13}/> No automatic client actions</span></div>
        </div>
        <div className="hero-panel" aria-label="Sample scope analysis">
          <div className="mock-top"><div><div className="mock-title">Northstar Spring Launch</div><div className="mock-meta">4 sources · analysis complete</div></div><div className="mock-score">86%</div></div>
          <div className="mock-row"><span className="mock-icon green"><FileCheck2 size={17}/></span><div><b>Five-page marketing site</b><small>Confirmed by signed brief</small></div><StatusBadge kind="confirmed">Confirmed</StatusBadge></div>
          <div className="mock-row"><span className="mock-icon red"><GitCompareArrows size={17}/></span><div><b>Launch date mismatch</b><small>May 12 vs. May 2</small></div><StatusBadge kind="conflict">Conflict</StatusBadge></div>
          <div className="mock-row"><span className="mock-icon amber"><TriangleAlert size={17}/></span><div><b>Wholesale portal</b><small>Not in original agreement</small></div><StatusBadge kind="new">New request</StatusBadge></div>
          <div className="mock-row"><span className="mock-icon amber"><CircleAlert size={17}/></span><div><b>Final approver missing</b><small>Human decision required</small></div><StatusBadge kind="review">Review</StatusBadge></div>
        </div>
      </div>
    </section>
    <div className="metric-strip"><div className="metric"><b>4</b><span>Source types unified</span></div><div className="metric"><b>100%</b><span>Traceable conclusions</span></div><div className="metric"><b>0</b><span>Automatic commitments</span></div><div className="metric"><b>1</b><span>Approved scope of truth</span></div></div>
    <section className="section">
      <div className="section-title"><p className="eyebrow">From noise to clarity</p><h2>Scope control built for real delivery teams.</h2><p>ScopeGuard reads across briefs, notes, messages, and changes—then shows people exactly where the project stands and what still needs a decision.</p></div>
      <div className="feature-grid">
        <article className="feature"><ScanSearch/><h3>Evidence-linked analysis</h3><p>Every important requirement, conflict, and scope warning points back to the source that supports it.</p></article>
        <article className="feature"><GitCompareArrows/><h3>Conflict detection</h3><p>Spot mismatched deadlines, deliverables, quantities, and expectations across scattered conversations.</p></article>
        <article className="feature"><ShieldCheck/><h3>Human-controlled outcomes</h3><p>Approve, reject, edit, and resolve item by item. Nothing becomes final until a reviewer confirms it.</p></article>
      </div>
    </section>
    <section className="cta-band"><div><h2>Move from “I think” to “we agreed.”</h2><p>Analyze a project in minutes, then review every conclusion with your team.</p></div><Link href="/new" className="button button-primary">Create analysis <Sparkles size={16}/></Link></section>
  </main>;
}
