import { useContext } from "react"
import DecisionTreeContext from "components/ProductConfigurator/Context"

export function useDecisionTreeContext() {
  return useContext(DecisionTreeContext)
}
