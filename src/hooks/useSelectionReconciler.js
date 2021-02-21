import Context from "Context";
import { useContext, useEffect, useMemo } from "react";
import { useToggler } from "./useToggler";

export function useSelectionReconciler(name, value, options) {
  const { select } = useContext(Context);
  const [expanded, toggleExpanded] = useToggler();

  const disabled = options.length <= 1;
  const optionById = useMemo(() => options.find((o) => o.id === value?.id), [options, value]);
  const optionByName = useMemo(() => options.find((o) => o.name === value?.name), [options, value]);
  const canAutoSelect = !optionById && options.length === 1;
  const canReconcile = !optionById && optionByName;
  const cantReconcile = !optionById && !optionByName;
  const invalid = cantReconcile && !disabled;

  useEffect(() => {
    if (canAutoSelect) {
      select(name, options[0]);
    } else if (canReconcile) {
      select(name, optionByName);
    } else if (invalid && !expanded) {
      select(name, undefined);
      toggleExpanded();
    }
  }, [
    invalid,
    select,
    name,
    expanded,
    canAutoSelect,
    canReconcile,
    optionByName,
    options,
    toggleExpanded
  ]);

  return {
    disabled,
    expanded,
    invalid,
    toggleExpanded
  };
}
