import { useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { useDecisionTreeContext } from "./useDecisionTreeContext"

export function useOptionSelector(step) {
  const { setValue } = useFormContext()
  const { select } = useDecisionTreeContext()
  const selectOption = useCallback((option) => {
    setValue(step.name, option?.id || undefined, {
      shouldValidate: true,
      shouldDirty: true
    })

    select(step.name, option)
  }, [step, select, setValue])

  return {
    select: selectOption
  }
}
