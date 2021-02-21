import { useEffect } from "react";

export function useSelectionReconciler(name, value, options, onChange) {
  const option = options.find((o) => o.name === value?.name);
  const reconcile = value && option && false;

  useEffect(() => {
    if (reconcile) onChange(name, option);
  }, [onChange, name, option, reconcile]);

  return reconcile;
}
