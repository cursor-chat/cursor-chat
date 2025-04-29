import { describe, it, expect, vi } from "vitest";
import { throttle } from "./utils";

describe("throttle", () => {
  it("should call the function immediately on the first call", () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should not call the function again within the throttle period", () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn();
    throttledFn();
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should call the function again after the throttle period", async () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);

    await new Promise((resolve) => setTimeout(resolve, 150));
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("should return the last result of the function", () => {
    const mockFn = vi.fn((x: number) => x * 2);
    const throttledFn = throttle(mockFn, 100);

    const result1 = throttledFn(2);
    expect(result1).toBe(4);

    const result2 = throttledFn(3);
    expect(result2).toBe(4); // Should still return the last result
  });
});
