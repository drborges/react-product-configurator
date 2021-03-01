import { useCallback, useState } from "react"

export function useDecisionTree(tree) {
  const root = tree[tree.rootId]
  const [selection, setSelection] = useState({});
  const next = useCallback((value) => tree[value?.id] || [], [tree])
  const valueFor = useCallback((step) => selection[step.name], [selection])
  const select = useCallback((name, value) => {
    setSelection(current => ({
      ...current,
      [name]: value,
    }))
  }, [])

  return {
    next,
    root,
    select,
    valueFor,
  }
}
