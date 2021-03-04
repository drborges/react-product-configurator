import { useCallback, useState } from "react";

export function useExpandable(initialState = false) {
  const [expanded, setExpanded] = useState(initialState);
  const toggle = useCallback(() => setExpanded((current) => !current), []);
  const expand = useCallback(() => setExpanded(true), []);
  const collapse = useCallback(() => setExpanded(false), []);

  return {
    collapse,
    expand,
    expanded,
    toggle,
  };
}
