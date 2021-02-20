import { useCallback } from "react";

export function useSmartChange(options, onChange) {
  return useCallback(
    (name, value) => {
      onChange(
        name,
        options.find((o) => o.id.toString() === value.toString())
      );
    },
    [options, onChange]
  );
}
