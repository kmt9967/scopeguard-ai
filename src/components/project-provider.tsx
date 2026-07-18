"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoAnalysis, demoInput } from "@/lib/demo-data";
import { AnalysisResult, ProjectInput, StoredProject } from "@/lib/types";

interface ProjectContextValue {
  project: StoredProject;
  setInput: (input: ProjectInput) => void;
  setAnalysis: (analysis: AnalysisResult) => void;
  loadDemo: () => void;
  reset: () => void;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);
const emptyInput: ProjectInput = { projectName: "", clientName: "", originalScope: "", notes: "", sources: [] };
const emptyAnalysis: AnalysisResult = { requirements: [], contradictions: [], missing_decisions: [], assumptions: [], scope_creep_items: [], dependencies: [], risks: [], clarification_questions: [], delivery_tasks: [], acceptance_criteria: [], change_request_summary: "", overall_confidence: "low", finalized: false };

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<StoredProject>({ input: emptyInput, analysis: emptyAnalysis });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("scopeguard-project");
      if (saved) {
        try { setProject(JSON.parse(saved) as StoredProject); } catch { /* ignore invalid local state */ }
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("scopeguard-project", JSON.stringify(project));
  }, [project, hydrated]);

  const value = useMemo<ProjectContextValue>(() => ({
    project,
    setInput: (input) => setProject((current) => ({ ...current, input })),
    setAnalysis: (analysis) => setProject((current) => ({ ...current, analysis })),
    loadDemo: () => setProject({ input: structuredClone(demoInput), analysis: structuredClone(demoAnalysis) }),
    reset: () => setProject({ input: emptyInput, analysis: emptyAnalysis }),
  }), [project]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const value = useContext(ProjectContext);
  if (!value) throw new Error("useProject must be used inside ProjectProvider");
  return value;
}
