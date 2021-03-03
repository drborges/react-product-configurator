import DecisionTreeContext from "DecisionTreeContext";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useToggler } from "hooks/useToggler";
import { useInputValidations } from "./useInputValidations";

export function useStepInput(step) {
  const [expanded, toggleExpanded] = useToggler();
  const { register, setValue } = useFormContext();
  const { error, notice, validations } = useInputValidations(step);
  const { next, select, valueFor } = useContext(DecisionTreeContext);

  const value = valueFor(step);
  const defaultOption = step.options.find(o => o.id === step.defaultValue)
  const ref = register(validations)
  const optionById = useMemo(() => step.options.find((o) => o.id === value?.id), [step, value]);
  const optionByName = useMemo(() => step.options.find((o) => o.name === value?.name), [step, value]);
  const canAutoSelect = !optionById && defaultOption;
  const canReconcile = !optionById && optionByName;
  const cantReconcile = !optionById && !optionByName;

  const selectOption = useCallback((option) => {
    setValue(step.name, option?.id, {
      shouldValidate: true,
      shouldDirty: true
    });
    // Track user selections outside the form state,
    // this will allow us to initialize new fields with
    // previously selected values as users change options
    // higher in the tree, e.g., changing the style or model
    // we'd be able to keep the state of previouslly selected
    // options, such as "Color", "Grid Pattern", etc...
    select(step.name, option);
  }, [step, select, setValue]);

  const handleSelect = useCallback((option) => {
    selectOption(option);
    toggleExpanded();
  }, [selectOption, toggleExpanded]);

  useEffect(() => {
    if (canAutoSelect) {
      selectOption(defaultOption);
    } else if (canReconcile) {
      selectOption(optionByName);
    } else if (cantReconcile && !error && !expanded) {
      handleSelect(undefined);
    }
  }, [
    canAutoSelect,
    canReconcile,
    cantReconcile,
    error,
    optionById,
    optionByName,
    selectOption
  ]);

  return {
    error,
    notice,
    expanded,
    name: step.name,
    next,
    select: handleSelect,
    toggleExpanded,
    ref,
    value
  };
}
