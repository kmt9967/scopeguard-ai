import { describe, expect, it } from "vitest";
import { demoAnalysis, demoInput } from "../demo-data";
import { exportContent } from "../exports";

describe("exports", () => {
  it("marks unconfirmed output as a draft", () => {
    const analysis = structuredClone(demoAnalysis);
    expect(exportContent({ input: demoInput, analysis }, "client")).toContain("DRAFT — pending human approval");
  });

  it("includes only human-approved requirements in the approved section", () => {
    const analysis = structuredClone(demoAnalysis);
    analysis.requirements[0].reviewStatus = "approved";
    analysis.requirements[1].reviewStatus = "rejected";
    analysis.finalized = true;
    const client = exportContent({ input: demoInput, analysis }, "client");
    expect(client).toContain("Five-page marketing website");
    expect(client).not.toContain("Eight-week Meta campaign");
    expect(client).toContain("Human-approved");
  });

  it("produces parseable JSON", () => {
    expect(() => JSON.parse(exportContent({ input: demoInput, analysis: demoAnalysis }, "json"))).not.toThrow();
  });
});
