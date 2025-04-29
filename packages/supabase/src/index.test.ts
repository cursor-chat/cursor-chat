import { describe, it, expect } from "vitest";
import * as IndexExports from "./index";

describe("index.ts exports", () => {
  it("should export CursorChat component", () => {
    expect(IndexExports).toHaveProperty("CursorChat");
    expect(IndexExports.CursorChat).toBeDefined();
  });

  it("should export handler module", () => {
    expect(IndexExports).toHaveProperty("createSupabaseHandler");
    expect(IndexExports.createSupabaseHandler).toBeDefined();
  });
});
