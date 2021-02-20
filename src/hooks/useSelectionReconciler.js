import { useEffect } from "react";

export function useSelectionReconciler(name, value, options, onChange) {
  useEffect(() => {
    if (value) {
      const option = options.find((o) => o.name === value?.name);
      if (option) {
        onChange(name, option.id);
      }
    }
  }, [onChange, name, options, value]);
}
