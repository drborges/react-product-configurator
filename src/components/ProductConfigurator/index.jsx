import { useContext } from "react";
import { Card, FlexItem } from "playbook-ui";
import StepInput from "components/StepInput";
import DecisionTreeContext from "DecisionTreeContext";
import DimensionsInput from "components/DimensionsInput";

export default function ProductConfigurator() {
  const { root } = useContext(DecisionTreeContext);

  return (
    <FlexItem grow maxWidth="md">
      <Card>
        <DimensionsInput label="Dimensions" name="dimensions" />
        {root.map(step => <StepInput key={step.id} step={step} />)}
      </Card>
    </FlexItem>
  );
}
