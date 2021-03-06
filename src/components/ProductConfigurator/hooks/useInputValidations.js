import { useCallback, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import { validateFormula } from "components/ProductConfigurator/helpers/validation"
import { findOptionById } from "components/ProductConfigurator/helpers/step"

export function useInputValidations(step) {
  const [notice, setNotice] = useState(null)
  const { errors, getValues, register } = useFormContext()
  const lookup = useCallback((id) => findOptionById(step, id), [step])
  const width = getValues().width
  const height = getValues().height

  const validate = useCallback((id) => {
    const option = lookup(id)
    const { error, notice } = validateFormula(option, { width, height })
    setNotice(notice)
    return error
  }, [width, height, lookup])

  const validations = useMemo(() => ({ required: true, validate: { formula: validate } }), [validate])
  const ref = useMemo(() => register(validations), [register, validations])

  return {
    error: errors[step.name],
    notice,
    ref,
  }
}
