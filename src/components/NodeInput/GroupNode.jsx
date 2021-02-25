import { useNodeInput } from "hooks/useNodeInput";
import NodeInput from "./index";

export function GroupNode({ node, type }) {
  const { name, options = [], register } = useNodeInput(node);

  return (
    <>
      <input type="hidden" ref={register} name={name} defaultValue={node.id} />
      {options.map((option) => (
        <NodeInput key={option.id} node={option} type={type} />
      ))}
    </>
  );
}
