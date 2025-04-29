import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useMouseMove } from "./useMouseMove";

describe("useMouseMove", () => {
  it("should initialize with default state", () => {
    const { result } = renderHook(() =>
      useMouseMove(null, vi.fn(), "testUser", "testComment")
    );

    expect(result.current.pos).toEqual({ x: 0, y: 0 });
    expect(result.current.visible).toBe(false);
  });

  it("should update position and set visible when setPositionOnMouseMove is called", () => {
    const { result } = renderHook(() =>
      useMouseMove("user1", vi.fn(), "testUser", "testComment")
    );

    act(() => {
      result.current.setPositionOnMouseMove({ clientX: 100, clientY: 200 });
    });

    expect(result.current.pos).toEqual({ x: 100, y: 200 });
    expect(result.current.visible).toBe(true);
  });

  it("should call onCursorPositionChanged with correct arguments", () => {
    const mockOnCursorPositionChanged = vi.fn();
    const mockGetCursorPositionRatio = vi.fn().mockReturnValue({
      ratioX: 0.5,
      ratioY: 0.5,
    });

    vi.mock("../utils", () => ({
      getCursorPositionRatio: mockGetCursorPositionRatio,
      throttle: (fn: any) => fn,
    }));

    const { result } = renderHook(() =>
      useMouseMove(
        "user1",
        mockOnCursorPositionChanged,
        "testUser",
        "testComment"
      )
    );

    act(() => {
      result.current.setPositionOnMouseMove({ clientX: 100, clientY: 200 });
    });

    expect(mockOnCursorPositionChanged).toHaveBeenCalledWith({
      id: "user1",
      userName: "testUser",
      comment: "testComment",
      ratioX: 0.5,
      ratioY: 0.5,
      x: 100,
      y: 200,
    });
  });

  it("should not call onCursorPositionChanged if currentUserId is null", () => {
    const mockOnCursorPositionChanged = vi.fn();

    const { result } = renderHook(() =>
      useMouseMove(null, mockOnCursorPositionChanged, "testUser", "testComment")
    );

    act(() => {
      result.current.setPositionOnMouseMove({ clientX: 100, clientY: 200 });
    });

    expect(mockOnCursorPositionChanged).not.toHaveBeenCalled();
  });

  it("should throttle calls to onCursorPositionChanged", () => {
    const mockOnCursorPositionChanged = vi.fn();
    const { mockThrottle } = vi.hoisted(() => {
      return {
        mockThrottle: vi.fn((fn) => fn),
      };
    });
    vi.mock("../utils", () => {
      return {
        getCursorPositionRatio: vi.fn().mockReturnValue({
          ratioX: 0.5,
          ratioY: 0.5,
        }),
        throttle: mockThrottle,
      };
    });

    renderHook(() =>
      useMouseMove(
        "user1",
        mockOnCursorPositionChanged,
        "testUser",
        "testComment"
      )
    );

    expect(mockThrottle).toHaveBeenCalled();
  });
});
