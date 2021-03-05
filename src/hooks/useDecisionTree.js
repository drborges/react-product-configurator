import { useCallback, useRef } from "react"
import { defaultValueForStep } from "helpers/step"

export function useDecisionTree(tree, { defaultValues = {} } = {}) {
  const selection = useRef({})
  const defaults = useRef(defaultValues)
  const next = useCallback((value) => tree[value?.id] || [], [tree])

  const valueFor = useCallback((step) => {
    return selection.current[step.name] || defaultValueForStep(defaults.current, step)
  }, [selection])

  const select = useCallback((name, value) => {
    selection.current[name] = value
  }, [])

  return {
    next,
    root: tree[tree.rootId],
    select,
    selection,
    valueFor,
  }
}
