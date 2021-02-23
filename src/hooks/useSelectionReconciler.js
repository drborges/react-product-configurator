import Context from "Context";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useToggler } from "./useToggler";

export function useSelectionReconciler({ name, parentFieldName, options }) {
  const { errors, setValue } = useFormContext();
  const [expanded, toggleExpanded] = useToggler();
  const { select, selection } = useContext(Context);
  const value = selection[name];
  const handleSelect = useCallback(
    (name, value) => {
      // Track user selections outside the form state,
      // this will allow us to initialize new fields with
      // previously selected values as users change options
      // higher in the tree, e.g., changing the style or model
      // we'd be able to keep the state of previouslly selected
      // options, such as "Color", "Grid Pattern", etc...
      select(name, value);
      setValue(name, value?.id, {
        shouldValidate: true,
        shouldDirty: true
      });
      // Make sure we track the parent config as well
      // this will make it easier to extract all config
      // ids we need to build the product upon clicking "Save"
      setValue(parentFieldName, value?.parentId);
    },
    [parentFieldName, select, setValue]
  );

  const disabled = options.length <= 1;
  const optionById = useMemo(() => options.find((o) => o.id === value?.id), [options, value]);
  const optionByName = useMemo(() => options.find((o) => o.name === value?.name), [options, value]);
  const canAutoSelect = !optionById && options.length === 1;
  const canReconcile = !optionById && optionByName;
  const cantReconcile = !optionById && !optionByName;
  const invalid = errors[name];

  useEffect(() => {
    if (canAutoSelect) {
      handleSelect(name, options[0]);
    } else if (canReconcile) {
      handleSelect(name, optionByName);
    } else if (cantReconcile && !disabled && !expanded) {
      handleSelect(name, undefined);
      toggleExpanded();
    }
  }, [
    name,
    expanded,
    canAutoSelect,
    canReconcile,
    handleSelect,
    optionByName,
    options,
    toggleExpanded
  ]);

  useEffect(() => {
    if (invalid && !expanded) toggleExpanded();
  }, [invalid]);

  return {
    disabled,
    invalid,
    expanded,
    toggleExpanded,
    value,
    select: handleSelect
  };
}
