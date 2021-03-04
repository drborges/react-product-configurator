import { useCallback, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import { validateFormula } from "helpers/validation"
import { findOptionById } from "helpers/step"

export function useInputValidations(step) {
  const [notice, setNotice] = useState(null)
  const { errors, getValues, register } = useFormContext()
  const lookup = useCallback((id) => findOptionById(step, id), [step])
  const dimensions = getValues().dimensions

  const validate = useCallback((id) => {
    const option = lookup(id)
    const { error, notice } = validateFormula(option, dimensions)
    setNotice(notice)
    return error
  }, [dimensions, lookup])

  const validations = useMemo(() => ({ required: true, validate }), [validate])
  const ref = useMemo(() => register(validations), [register, validations])

  return {
    error: errors[step.name],
    notice,
    ref,
  }
}
