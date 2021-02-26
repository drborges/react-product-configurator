import NodeInput from "./index";
import { useNodeInput } from "hooks/useNodeInput";

export function GroupNode({ node }) {
  const { name, options = [], register } = useNodeInput(node);

  return (
    <>
      <input type="hidden" ref={register} name={name} defaultValue={node.id} />
      {options.map((option) => (
        <NodeInput key={option.id} node={option} />
      ))}
    </>
  );
}
