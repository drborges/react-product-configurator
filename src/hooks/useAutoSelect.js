import { useEffect } from "react";

export function useAutoSelect(name, options, onChange) {
  const autoselect = options.length === 1;

  useEffect(() => {
    if (autoselect) onChange(name, options[0]);
  }, [onChange, name, options, autoselect]);

  return autoselect;
}
