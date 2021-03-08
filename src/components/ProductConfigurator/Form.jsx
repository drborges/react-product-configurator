import { memo } from "react"
import { noop } from "lodash"
import { Card, FlexItem } from "playbook-ui"

import StepInput from "./StepInput"
import DimensionsInput from "./DimensionsInput"
import { useFormChangeListener } from "./hooks/useFormChangeListener"
import { useDecisionTreeContext } from "./hooks/useDecisionTreeContext"

function Form({ onChange = noop }) {
  useFormChangeListener(onChange)
  const { root, defaults } = useDecisionTreeContext()

  return (
    <form>
      <FlexItem grow maxWidth="md">
        <Card>
          <DimensionsInput label="Dimensions" name="dimensions" defaultValue={defaults?.dimensions} />
          {root.map(step => <StepInput key={ step.id } step={ step } />)}
        </Card>
      </FlexItem>
    </form>
  )
}

export default memo(Form)
