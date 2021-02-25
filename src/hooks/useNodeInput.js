import Context from "Context";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useToggler } from "hooks/useToggler";
import { validateFormula } from "helpers/validation";

export function useNodeInput(node) {
  const [notice, setNotice] = useState(null);
  const [expanded, toggleExpanded] = useToggler();
  const { errors, getValues, register, setValue } = useFormContext();
  const { lookup, select, selection, values } = useContext(Context);

  // Workaround issue using strings with "." as object keys 🤷🏻‍♂️
  const name = useMemo(() => node.name.replace(".", ""), [node]);
  const error = errors[name]?.message;
  const options = values(node);
  const value = selection[name];

  const validate = useCallback(
    (id) => {
      const config = lookup(id);
      const { error, notice } = validateFormula(config, getValues()?.dimensions);
      if (notice) {
        setNotice(notice);
      } else {
        setNotice(null);
      }
      return error;
    },
    [getValues, lookup]
  );

  const validations = useMemo(
    () => ({
      required: true,
      validate
    }),
    [validate]
  );

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
    } else if (canReconcile) {
      selectOption(optionByName);
    } else if (cantReconcile && !disabled && !error) {
      selectOption(undefined);
      console.log(">>>>> cannot reconcile!");
    }
  }, [error]);

  useEffect(() => {
    if (error && !expanded) {
      toggleExpanded();
    }
  }, [error, expanded, toggleExpanded]);

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
