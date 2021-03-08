import { useCallback, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import { validateFormula } from "components/ProductConfigurator/helpers/validation"
import { findOptionById } from "components/ProductConfigurator/helpers/step"

export function useFormInput(step) {
  const [notice, setNotice] = useState(null)
  const { errors, getValues, register } = useFormContext()
  const lookup = useCallback((id) => findOptionById(step, id), [step])
  const { width, height } = getValues(["width", "height"])

  const validate = useCallback((id) => {
    const option = lookup(id)
    const { error, notice } = validateFormula(option, { width, height })
    setNotice(notice)
    return error
  }, [width, height, lookup])

  const config = useMemo(() => ({
    required: true,
    setValueAs: lookup,
    validate: { formula: validate },
  }), [lookup, validate])

  const ref = useMemo(() => register(config), [register, config])

  return {
    error: errors[step.name],
    notice,
    ref,
  }
}
