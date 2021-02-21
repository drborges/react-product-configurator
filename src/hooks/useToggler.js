import { useCallback, useState } from "react";

export function useToggler(initialState = false) {
  const [value, setValue] = useState(initialState);
  const toggle = useCallback(() => setValue((current) => !current), []);

  return [value, toggle];
}
