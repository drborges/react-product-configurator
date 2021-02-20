import { useEffect } from "react";

export function useAutoSelect(name, value, options, onChange) {
  useEffect(() => {
    if (options.length === 1) {
      onChange(name, options[0].id);
    }
  }, [onChange, name, options, value]);
}
