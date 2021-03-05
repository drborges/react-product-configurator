import { debounce } from "lodash"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"

export function useFormChangeListener(onChange, { debounceBy = 200 } = {}) {
  const { errors, formState, getValues } = useFormContext()
  const debouncedOnChange = useMemo(() => debounce(onChange, debounceBy), [debounceBy, onChange])
  const values = getValues()

  useEffect(() => {
    debouncedOnChange({
      complete: formState.isValid,
      errors,
      values,
    })
  }, [debouncedOnChange, errors, values, formState])
}
