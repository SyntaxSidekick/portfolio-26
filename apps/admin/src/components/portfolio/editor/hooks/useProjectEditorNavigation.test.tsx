import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { emptyProjectFormValues } from "../../ProjectForm";
import { useProjectEditorNavigation } from "./useProjectEditorNavigation";

describe("useProjectEditorNavigation", () => {
  it("does not advance when basics validation fails", () => {
    const validators = {
      validateBasics: vi.fn().mockReturnValue({ title: "Required" }),
      validateImages: vi.fn().mockReturnValue({}),
      validateCaseStudy: vi.fn().mockReturnValue({}),
    };

    const { result } = renderHook(() => useProjectEditorNavigation(emptyProjectFormValues, validators));

    act(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStepIndex).toBe(0);
    expect(validators.validateBasics).toHaveBeenCalled();
  });

  it("advances through basics, images, and case study when valid", () => {
    const validators = {
      validateBasics: vi.fn().mockReturnValue({}),
      validateImages: vi.fn().mockReturnValue({}),
      validateCaseStudy: vi.fn().mockReturnValue({}),
    };

    const { result } = renderHook(() => useProjectEditorNavigation(emptyProjectFormValues, validators));

    act(() => {
      result.current.goToNextStep();
    });
    expect(result.current.currentStepIndex).toBe(1);

    act(() => {
      result.current.goToNextStep();
    });
    expect(result.current.currentStepIndex).toBe(2);

    act(() => {
      result.current.goToNextStep();
    });
    expect(result.current.currentStepIndex).toBe(3);
  });

  it("blocks direct jump to case study when images are invalid", () => {
    const validators = {
      validateBasics: vi.fn().mockReturnValue({}),
      validateImages: vi.fn().mockReturnValue({ featuredImageUrl: "Required" }),
      validateCaseStudy: vi.fn().mockReturnValue({}),
    };

    const { result } = renderHook(() => useProjectEditorNavigation(emptyProjectFormValues, validators));

    act(() => {
      result.current.goToStep("case-study");
    });

    expect(result.current.currentStepIndex).toBe(0);
    expect(validators.validateBasics).toHaveBeenCalled();
    expect(validators.validateImages).toHaveBeenCalled();
  });
});
