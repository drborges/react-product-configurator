import Context from "Context";
import { useCallback, useContext, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { validateFormula } from "helpers/validation";

export function useInputValidations(node) {
  const { lookup } = useContext(Context);
  const [notice, setNotice] = useState(null);
  const { errors, getValues } = useFormContext();

  const validate = useCallback(
    (id) => {
      const config = lookup(id);
      const { error, notice } = validateFormula(config, getValues()?.dimensions);
      setNotice(notice);
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

  return {
    error: errors[node.name],
    notice,
    validations
  };
}
