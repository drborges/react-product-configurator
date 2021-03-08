import { debounce, isEmpty } from "lodash"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"

export function useFormChangeListener(onChange, { debounceBy = 200 } = {}) {
  const { errors, watch } = useFormContext()
  const debouncedOnChange = useMemo(() => debounce(onChange, debounceBy), [debounceBy, onChange])

  useEffect(() => {
    debouncedOnChange({
      complete: isEmpty(errors),
      errors,
      values: watch(),
    })
  }, [debouncedOnChange, watch, errors])
}
