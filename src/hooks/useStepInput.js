import Context from "Context";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useToggler } from "./useToggler";

export function useStepInput({ name, options }) {
  const { errors, setValue } = useFormContext();
  const [expanded, toggleExpanded] = useToggler();
  const { select, selection } = useContext(Context);
  const parentFieldName = `${name}_parent_id`;
  const invalid = errors[name];
  const value = selection[name];
  const selectOption = useCallback(
    (option) => {
      setValue(name, option?.id, {
        shouldValidate: true,
        shouldDirty: true
      });
      // Make sure we track the parent config as well
      // this will make it easier to extract all config
      // ids we need to build the product upon clicking "Save"
      setValue(parentFieldName, option?.parentId);
      // Track user selections outside the form state,
      // this will allow us to initialize new fields with
      // previously selected values as users change options
      // higher in the tree, e.g., changing the style or model
      // we'd be able to keep the state of previouslly selected
      // options, such as "Color", "Grid Pattern", etc...
      select(name, option);
    },
    [name, parentFieldName, select, setValue]
  );

  const handleSelect = useCallback(
    (value) => {
      toggleExpanded();
      setTimeout(() => selectOption(value), 0);
    },
    [selectOption, toggleExpanded]
  );

  const disabled = options.length <= 1;
  const optionById = useMemo(() => options.find((o) => o.id === value?.id), [options, value]);
  const optionByName = useMemo(() => options.find((o) => o.name === value?.name), [options, value]);
  const canAutoSelect = !optionById && options.length === 1;
  const canReconcile = !optionById && optionByName;
  const cantReconcile = !optionById && !optionByName;

  useEffect(() => {
    if (canAutoSelect) {
      selectOption(options[0]);
      console.log(">>>>> AUTO SELECTED", name);
    } else if (canReconcile) {
      selectOption(optionByName);
      console.log(">>>>> CAN RECONCILE", name);
    } else if (cantReconcile && !disabled && !invalid) {
      console.log(">>>>> CANNOT RECONCILE", name);
      selectOption(undefined);
    }
  }, [canAutoSelect, canReconcile, disabled, invalid, optionByName, options, selectOption]);

  useEffect(() => {
    if (invalid && !expanded) {
      console.log(">>>>> INVALID AND NOT EXPANDED", name);
      console.log(">>>>> INVALID", invalid);
      toggleExpanded();
    }
  }, [invalid]);

  return {
    disabled,
    invalid,
    expanded,
    toggleExpanded,
    value,
    parentFieldName,
    select: handleSelect
  };
}
