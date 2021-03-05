import { debounce } from "lodash"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"

export function useFormChangeListener(onChange, { debounceBy = 200 } = {}) {
  const { errors, formState, watch } = useFormContext()
  const debouncedOnChange = useMemo(() => debounce(onChange, debounceBy), [debounceBy, onChange])
  const isValid = formState.isValid
  const values = watch()

  useEffect(() => {
    debouncedOnChange({
      complete: isValid,
      errors,
      values,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedOnChange, errors,  isValid])
}
