import { Card, FlexItem, LoadingInline } from "playbook-ui"

import StepInput from "components/StepInput"
import DecisionTreeContext from "DecisionTreeContext"
import { useDecisionTree } from "hooks/useDecisionTree"
import DimensionsInput from "components/DimensionsInput"

export default function ProductConfigurator({ decisionTree = {}, loading = false}) {
  const tree = useDecisionTree(decisionTree)

  return (
    <DecisionTreeContext.Provider value={tree}>
      <FlexItem grow maxWidth="md">
        <Card>
          {loading ? <LoadingInline align="center" /> : (
            <>
              <DimensionsInput label="Dimensions" name="dimensions" />
              { tree.root.map(step => <StepInput key={ step.id } step={ step } />) }
            </>
          )}
        </Card>
      </FlexItem>
    </DecisionTreeContext.Provider>
  )
}
