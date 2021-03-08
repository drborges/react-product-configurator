import { debounce, isEmpty } from "lodash"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { extractSelectedIds } from "../helpers/form"

export function useFormChangeListener(onChange, { debounceBy = 200 } = {}) {
  const { errors, watch } = useFormContext()
  const values = watch()
  const pathIds = useMemo(() => extractSelectedIds(values), [values])
  const debouncedOnChange = useMemo(() => debounce(onChange, debounceBy), [debounceBy, onChange])

  useEffect(() => {
    debouncedOnChange({
      complete: isEmpty(errors),
      errors,
      pathIds,
      values,
    })
  }, [debouncedOnChange, errors, pathIds, values])
}
