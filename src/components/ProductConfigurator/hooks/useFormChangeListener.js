import { debounce, isEmpty } from "lodash"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"

export function useFormChangeListener(onChange, { debounceBy = 200 } = {}) {
  const { errors, watch } = useFormContext()
  const debouncedOnChange = useMemo(() => debounce(onChange, debounceBy), [debounceBy, onChange])
  const values = watch()

  useEffect(() => {
    debouncedOnChange({
      complete: isEmpty(errors),
      errors,
      values,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedOnChange, errors]) // adding `values` to the dependencies list cause an infinite loop
}
