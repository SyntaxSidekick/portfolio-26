import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useUnsavedChanges } from "./useUnsavedChanges";

describe("useUnsavedChanges", () => {
  it("returns true without confirmation when clean", () => {
    const confirmSpy = vi.spyOn(window, "confirm");
    const { result } = renderHook(() => useUnsavedChanges(false));

    expect(result.current.confirmDiscardChanges()).toBe(true);
    expect(confirmSpy).not.toHaveBeenCalled();

    confirmSpy.mockRestore();
  });

  it("asks for confirmation when dirty", () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);
    const { result } = renderHook(() => useUnsavedChanges(true));

    expect(result.current.confirmDiscardChanges()).toBe(false);
    expect(confirmSpy).toHaveBeenCalledWith("Discard unsaved project changes?");

    confirmSpy.mockRestore();
  });
});
