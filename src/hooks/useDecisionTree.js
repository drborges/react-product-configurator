import { useCallback, useRef } from "react"

export function useDecisionTree(tree) {
  const root = tree[tree.rootId]
  const selection = useRef({})
  const next = useCallback((value) => tree[value?.id] || [], [tree])
  const valueFor = useCallback((step) => selection.current[step.name], [selection])
  const select = useCallback((name, value) => {
    selection.current[name] = value
  }, [])

  return {
    next,
    root,
    select,
    valueFor,
  }
}
