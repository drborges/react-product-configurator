import { debounce } from "lodash"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"

export function useConfigurationChangeHandler(onChange, { debounceBy = 200 } = {}) {
  const { getValues, formState } = useFormContext()
  const debouncedOnChange = useMemo(() => debounce(onChange, debounceBy), [debounceBy, onChange])
  const values = getValues()

  useEffect(() => {
    debouncedOnChange({
      complete: formState.isValid,
      values,
    })
  }, [debouncedOnChange, values, formState])
}
