import { useContext } from "react";
import Context from "Context";
import StepInput from "./index";

export function NestedStepInput({ parent }) {
  const { select, values, selection } = useContext(Context);
  const options = values(parent);

  return (
    options.length > 0 && (
      <StepInput
        nestable
        label={`${parent.name} Options`}
        name={parent?.name}
        options={options}
        value={selection[parent?.name]}
        onChange={select}
      />
    )
  );
}
