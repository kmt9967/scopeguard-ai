import { describe, expect, it } from "vitest";
import { analysisSchema, findUnknownSourceIds } from "../analysis-schema";
import { demoAnalysis } from "../demo-data";

describe("analysis contract", () => {
  it("accepts the complete demo analysis", () => {
    expect(analysisSchema.safeParse(demoAnalysis).success).toBe(true);
  });

  it("rejects invalid confidence values", () => {
    const invalid = structuredClone(demoAnalysis) as typeof demoAnalysis & { overall_confidence: string };
    invalid.overall_confidence = "certain";
    expect(analysisSchema.safeParse(invalid).success).toBe(false);
  });

  it("detects citations to sources that were not supplied", () => {
    const parsed = analysisSchema.parse(demoAnalysis);
    parsed.requirements[0].source_ids.push("SRC-99");
    expect(findUnknownSourceIds(parsed, new Set(["BASELINE", "SRC-01", "SRC-02", "SRC-03", "SRC-04"]))).toEqual(["SRC-99"]);
  });

  it("accepts the original scope baseline as traceable evidence", () => {
    const parsed = analysisSchema.parse(structuredClone(demoAnalysis));
    parsed.requirements[0].source_ids = ["BASELINE"];
    expect(findUnknownSourceIds(parsed, new Set(["BASELINE", "SRC-01", "SRC-02", "SRC-03", "SRC-04"]))).toEqual([]);
  });
});
