import { describe, expect, it } from "vitest";
import { publicApiError } from "../api-errors";

describe("safe API errors", () => {
  it("turns rate limits into a recoverable message", () => {
    expect(publicApiError(429)).toEqual({ status: 429, message: expect.stringContaining("temporarily busy") });
  });

  it("does not expose provider error details", () => {
    expect(publicApiError(500).message).not.toMatch(/stack|token|api[_ -]?key/i);
  });

  it("calls out unavailable model configuration", () => {
    expect(publicApiError(404).message).toContain("OPENAI_MODEL");
  });
});
