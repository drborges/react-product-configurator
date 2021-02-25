import Context from "Context";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useToggler } from "hooks/useToggler";
import { useInputValidations } from "./useInputValidations";

export function useNodeInput(node) {
  const [expanded, toggleExpanded] = useToggler();
  const { register, setValue } = useFormContext();
  const { error, notice, validations } = useInputValidations(node);
  const { lookup, select, selection, values } = useContext(Context);
  // Workaround issue using strings with "." as object keys 🤷🏻‍♂️
  const name = node.name; // useMemo(() => node.name.replace(".", ""), [node]);

  const options = values(node);
  const value = selection[name];

  const selectOption = useCallback(
    (option) => {
      setValue(name, option?.id, {
        shouldValidate: true,
        shouldDirty: true
      });
      // Track user selections outside the form state,
      // this will allow us to initialize new fields with
      // previously selected values as users change options
      // higher in the tree, e.g., changing the style or model
      // we'd be able to keep the state of previouslly selected
      // options, such as "Color", "Grid Pattern", etc...
      select(name, option);
    },
    [name, select, setValue]
  );

  const handleSelect = useCallback(
    (value) => {
      toggleExpanded();
      selectOption(value);
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
    } else if (canReconcile) {
      selectOption(optionByName);
    } else if (cantReconcile && !disabled && !error && !expanded) {
      handleSelect(undefined);
    }
  }, [
    canAutoSelect,
    canReconcile,
    cantReconcile,
    disabled,
    error,
    optionById,
    optionByName,
    selectOption
  ]);

  return {
    disabled,
    error,
    notice,
    expanded,
    lookup,
    name,
    options,
    select: handleSelect,
    toggleExpanded,
    register,
    validations,
    value
  };
}
