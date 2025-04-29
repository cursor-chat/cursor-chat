import { renderHook, act } from "@testing-library/react";
import { useCursors } from "./useCursors";
import { describe, expect, it } from "vitest";

describe("useCursors", () => {
  it("should add a cursor when event is 'add'", () => {
    const { result } = renderHook(() => useCursors());

    act(() => {
      result.current.handleCursor("add", "user1", { x: 10, y: 20 });
    });

    expect(result.current.cursors).toEqual({
      user1: { x: 10, y: 20 },
    });
  });

  it("should change a cursor when event is 'change'", () => {
    const { result } = renderHook(() => useCursors());

    act(() => {
      result.current.handleCursor("add", "user1", { x: 10, y: 20 });
      result.current.handleCursor("change", "user1", { x: 30, y: 40 });
    });

    expect(result.current.cursors).toEqual({
      user1: { x: 30, y: 40 },
    });
  });

  it("should remove a cursor when event is 'remove'", () => {
    const { result } = renderHook(() => useCursors());

    act(() => {
      result.current.handleCursor("add", "user1", { x: 10, y: 20 });
      result.current.handleCursor("remove", "user1");
    });

    expect(result.current.cursors).toEqual({});
  });

  it("should ignore invalid events", () => {
    const { result } = renderHook(() => useCursors());

    act(() => {
      result.current.handleCursor("add", "user1", { x: 10, y: 20 });
      result.current.handleCursor("invalid_event", "user1", { x: 30, y: 40 });
    });

    expect(result.current.cursors).toEqual({
      user1: { x: 10, y: 20 },
    });
  });

  it("should do nothing if userId is null", () => {
    const { result } = renderHook(() => useCursors());

    act(() => {
      result.current.handleCursor("add", null, { x: 10, y: 20 });
    });

    expect(result.current.cursors).toEqual({});
  });
});
