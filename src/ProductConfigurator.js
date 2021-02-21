import { useContext } from "react";
import Context from "./Context";
import StepInput from "components/StepInput";

export function ProductConfigurator() {
  const { configs, models, onChange, options, selection, styles, types, values } = useContext(
    Context
  );

  return (
    <>
      <StepInput
        label="Model"
        name="model"
        options={models}
        value={selection.model}
        onChange={onChange}
      />
      <StepInput
        label="Styles"
        name="style"
        options={styles}
        value={selection.style}
        onChange={onChange}
      />
      <StepInput
        label="Type"
        name="type"
        options={types}
        value={selection.type}
        onChange={onChange}
      />
      <StepInput
        label="Config"
        name="config"
        options={configs}
        value={selection.config}
        onChange={onChange}
      />
      {options?.map((option) => (
        <StepInput
          nestable
          key={option.id}
          label={option.name}
          name={option.name}
          options={values(option)}
          value={selection[option.name]}
          onChange={onChange}
        />
      ))}
    </>
  );
}
