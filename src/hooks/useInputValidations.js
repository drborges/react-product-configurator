import Context from "DecisionTreeContext";
import { useCallback, useContext, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { validateFormula } from "helpers/validation";

export function useInputValidations(step) {
  const [notice, setNotice] = useState(null);
  const { errors, getValues } = useFormContext();
  const lookup = useCallback((id) => step.options.find(o => o.id === parseInt(id)), [step])

  const validate = useCallback(
    (id) => {
      const option = lookup(id);
      const { error, notice } = validateFormula(option, getValues()?.dimensions);
      setNotice(notice);
      return error;
    },
    [getValues, lookup]
  );

  const validations = useMemo(() => ({
    required: true,
    validate
  }), [validate]);

  return {
    error: errors[step.name],
    notice,
    validations
  };
}
