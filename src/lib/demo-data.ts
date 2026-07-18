import { AnalysisResult, ProjectInput } from "./types";

export const demoInput: ProjectInput = {
  projectName: "Northstar Spring Launch",
  clientName: "Northstar Coffee Co.",
  originalScope: "Design and build a five-page marketing website plus an eight-week paid social campaign. Includes one homepage concept, two revision rounds, English copy supplied by the client, Meta ads only, and launch by May 12. Ecommerce, video production, and ongoing community management are excluded.",
  notes: "Prepared from the signed brief, kickoff notes, and the client's latest email. Budget approval for additions has not been documented.",
  sources: [
    { id: "SRC-01", title: "Signed website & campaign brief", type: "Brief", date: "2026-03-04", content: "Five-page Webflow marketing site. One homepage concept and two revision rounds. Client supplies final English copy. Eight-week Meta campaign with six static ad variants. No ecommerce, video, translation, or community management. Target launch: May 12." },
    { id: "SRC-02", title: "Kickoff meeting notes", type: "Meeting notes", date: "2026-03-11", content: "Client asked if the team can add a wholesale portal, Spanish pages, and three short founder videos. Team said these need estimating. Client also mentioned a trade show in early May, but no revised launch date was agreed. Final approver was not present." },
    { id: "SRC-03", title: "Email from marketing director", type: "Email", date: "2026-03-14", content: "Please treat the first three weeks after launch as included social community management. We need the site live by May 2 for the trade show, not May 12. The CEO expects two homepage directions to choose from." },
    { id: "SRC-04", title: "Production chat excerpt", type: "Chat", date: "2026-03-15", content: "Agency producer: We have not approved the portal, Spanish localization, videos, extra concept, or community management. Need client budget owner, content handoff date, and written deadline approval before committing." },
  ],
};

export const demoAnalysis: AnalysisResult = {
  requirements: [
    { id: "REQ-01", title: "Five-page marketing website", description: "Design and build five Webflow pages using client-supplied English copy.", status: "confirmed", confidence: "high", source_ids: ["SRC-01"], reviewStatus: "pending" },
    { id: "REQ-02", title: "Eight-week Meta campaign", description: "Prepare and run six static ad variants across an eight-week Meta campaign.", status: "confirmed", confidence: "high", source_ids: ["SRC-01"], reviewStatus: "pending" },
    { id: "REQ-03", title: "Homepage concept count", description: "The signed brief specifies one direction, while the latest email expects two.", status: "uncertain", confidence: "high", source_ids: ["SRC-01", "SRC-03"], reviewStatus: "pending" },
  ],
  contradictions: [
    { id: "CON-01", title: "Launch date conflict", description: "The signed brief sets May 12; the latest email requests May 2.", confidence: "high", source_ids: ["SRC-01", "SRC-03"] },
    { id: "CON-02", title: "Homepage direction conflict", description: "One homepage concept was agreed, but the CEO now expects two.", confidence: "high", source_ids: ["SRC-01", "SRC-03"] },
  ],
  missing_decisions: [
    { id: "DEC-01", title: "Final approver", description: "No person is documented as final creative and launch approver.", source_ids: ["SRC-02", "SRC-04"] },
    { id: "DEC-02", title: "Expanded budget", description: "No budget approval exists for requested additions.", source_ids: ["SRC-02", "SRC-04"] },
  ],
  assumptions: [
    { id: "ASM-01", statement: "English remains the only approved site language until localization is estimated.", confidence: "medium", source_ids: ["SRC-01", "SRC-02"] },
  ],
  scope_creep_items: [
    { id: "SCP-01", title: "Wholesale portal", description: "A new authenticated wholesale capability is outside the five-page marketing site.", impact: "High design, engineering, and QA impact", confidence: "high", source_ids: ["SRC-01", "SRC-02"] },
    { id: "SCP-02", title: "Spanish localization", description: "Translation and localized pages were explicitly excluded.", impact: "Adds copy, layout, review, and QA work", confidence: "high", source_ids: ["SRC-01", "SRC-02"] },
    { id: "SCP-03", title: "Video production & community management", description: "Both services are excluded from the signed brief but requested later.", impact: "Requires new production capacity and operating coverage", confidence: "high", source_ids: ["SRC-01", "SRC-02", "SRC-03"] },
  ],
  dependencies: [
    { id: "DEP-01", title: "Client copy handoff", description: "Final English copy is required before page build and QA.", source_ids: ["SRC-01", "SRC-04"] },
    { id: "DEP-02", title: "Change approval", description: "Cost and schedule approval is needed for any expanded deliverables.", source_ids: ["SRC-04"] },
  ],
  risks: [
    { id: "RSK-01", title: "Compressed launch window", description: "A ten-day acceleration without content dates or written approval puts quality and launch at risk.", severity: "high", source_ids: ["SRC-01", "SRC-03", "SRC-04"] },
  ],
  clarification_questions: [
    { id: "Q-01", question: "Which launch date is authorized: May 2 or May 12?", reason: "Two sources specify different deadlines.", source_ids: ["SRC-01", "SRC-03"], resolved: false },
    { id: "Q-02", question: "Who has final approval authority for scope, budget, and creative?", reason: "The final approver is not documented.", source_ids: ["SRC-02", "SRC-04"], resolved: false },
  ],
  delivery_tasks: [
    { id: "TSK-01", title: "Confirm scope baseline", description: "Resolve deadline, concept count, and requested additions in writing.", depends_on: [], owner_suggestion: "Project lead", status: "needs_review" },
    { id: "TSK-02", title: "Receive final copy", description: "Collect approved English copy for all five pages.", depends_on: ["TSK-01"], owner_suggestion: "Client", status: "blocked" },
    { id: "TSK-03", title: "Design, build, and QA", description: "Complete approved pages and campaign assets, then run launch QA.", depends_on: ["TSK-01", "TSK-02"], owner_suggestion: "Delivery team", status: "blocked" },
  ],
  acceptance_criteria: [
    { id: "ACC-01", requirement_id: "REQ-01", criterion: "Five responsive Webflow pages match the approved design and supplied English copy." },
    { id: "ACC-02", requirement_id: "REQ-02", criterion: "Six approved static variants are configured for an eight-week Meta campaign." },
  ],
  change_request_summary: "Northstar requested a wholesale portal, Spanish localization, three founder videos, an additional homepage direction, three weeks of community management, and a May 2 launch. These items are not fully supported by the signed scope and require written cost, schedule, and approval decisions before commitment.",
  overall_confidence: "high",
  finalized: false,
  reviewerNotes: "",
};
