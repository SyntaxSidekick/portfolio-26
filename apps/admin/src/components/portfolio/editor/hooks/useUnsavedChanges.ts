import { useEffect } from "react";

export function useUnsavedChanges(isDirty: boolean) {
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!isDirty) {
        return;
      }
      event.preventDefault();
    };

    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);

  function confirmDiscardChanges() {
    if (!isDirty) {
      return true;
    }
    return window.confirm("Discard unsaved project changes?");
  }

  return {
    confirmDiscardChanges,
  };
}
