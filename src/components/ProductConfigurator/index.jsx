import { Card, FlexItem, LoadingInline } from "playbook-ui"

import DecisionTreeContext from "DecisionTreeContext"
import StepInput from "components/StepInput"
import DimensionsInput from "components/DimensionsInput"
import { useDecisionTree } from "hooks/useDecisionTree"
import { useFormChangeListener } from "hooks/useFormChangeListener"

export default function ProductConfigurator({ defaultValues = {}, decisionTree = {}, loading = false, onChange = () => { } }) {
  useFormChangeListener(onChange)
  const tree = useDecisionTree(decisionTree, {
    defaultValues
  })

  return (
    <DecisionTreeContext.Provider value={tree}>
      <FlexItem grow maxWidth="md">
        <Card>
          {loading ? <LoadingInline align="center" /> : (
            <>
              <DimensionsInput label="Dimensions" name="dimensions" defaultValue={defaultValues?.dimensions} />
              {tree.root.map(step => <StepInput key={step.id} step={step} />)}
            </>
          )}
        </Card>
      </FlexItem>
    </DecisionTreeContext.Provider>
  )
}
