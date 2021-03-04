import { useContext } from "react"
import DecisionTreeContext from "DecisionTreeContext"

export function useDecisionTreeContext() {
  return useContext(DecisionTreeContext)
}
