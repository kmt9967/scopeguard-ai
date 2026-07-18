import { Check, CircleAlert, FileText, Info } from "lucide-react";
import { Confidence } from "@/lib/types";

export function StatusBadge({ kind, children }: { kind: "confirmed" | "uncertain" | "conflict" | "new" | "review" | "neutral"; children: React.ReactNode }) {
  return <span className={`badge badge-${kind}`}>{kind === "confirmed" ? <Check size={12} /> : kind === "conflict" || kind === "review" ? <CircleAlert size={12} /> : null}{children}</span>;
}

export function ConfidenceBadge({ value }: { value: Confidence }) {
  return <span className={`confidence confidence-${value}`}><span />{value} confidence</span>;
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-intro"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

export function Evidence({ sourceIds }: { sourceIds: string[] }) {
  return <div className="evidence"><FileText size={13} />{sourceIds.map((id) => <span key={id}>{id}</span>)}</div>;
}

export function Notice({ children }: { children: React.ReactNode }) {
  return <div className="notice"><Info size={17} /><div>{children}</div></div>;
}
