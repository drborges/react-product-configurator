import { useCallback, useEffect, useMemo } from "react"
import { useExpandable } from "./useExpandable"
import { useOptionSelector } from "./useOptionSelector"
import { useInputValidations } from "./useInputValidations"
import { useDecisionTreeContext } from "./useDecisionTreeContext"
import { useUnregisterFieldOnUnmount } from "./useUnregisterFieldOnUnmount"
import { useRevalidateOnDimensionsChange } from "./useRevalidateOnDimensionsChange"
import {
  findDefaultOption,
  findOptionById,
  findOptionByName
} from "components/ProductConfigurator/helpers/step"

export function useStepInput(step) {
  useUnregisterFieldOnUnmount(step)
  useRevalidateOnDimensionsChange()
  const { select } = useOptionSelector(step)
  const { next, valueFor } = useDecisionTreeContext()
  const { error, notice, ref } = useInputValidations(step)
  const { collapse, expanded, toggle, expand } = useExpandable()

  const value = valueFor(step)
  const nextSteps = next(value)
  const defaultOption = useMemo(() => findDefaultOption(step), [step])
  const optionById = useMemo(() => findOptionById(step, value?.id), [step, value])
  const optionByName = useMemo(() => findOptionByName(step, value?.name), [step, value])
  const canAutoSelect = !optionById && defaultOption
  const canReconcile = !optionById && optionByName
  const cantReconcile = !optionById && !optionByName

  const handleSelect = useCallback((option) => {
    select(option)
    collapse()
  }, [collapse, select])

  useEffect(() => {
    if (canAutoSelect) {
      select(defaultOption)
    } else if (canReconcile) {
      select(optionByName)
    } else if (cantReconcile) {
      if (!error) select(undefined)
      if (!expanded) expand()
    }
  }, [
    canAutoSelect,
    canReconcile,
    cantReconcile,
    defaultOption,
    error,
    expand,
    expanded,
    optionByName,
    select,
  ])

  return {
    error,
    expanded,
    name: step.name,
    nextSteps,
    notice,
    ref,
    select: handleSelect,
    toggleExpanded: toggle,
    value,
  }
}
