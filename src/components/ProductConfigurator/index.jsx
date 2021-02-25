import { useContext } from "react";
import { Card, FlexItem } from "playbook-ui";
import Context from "Context";
import NodeInput from "components/NodeInput";
import DimensionsInput from "components/DimensionsInput";

export default function ProductConfigurator() {
  const { rootNode } = useContext(Context);

  return (
    <FlexItem grow maxWidth="md">
      <Card>
        <DimensionsInput label="Dimensions" name="dimensions" />
        <NodeInput node={rootNode} />
      </Card>
    </FlexItem>
  );
}
