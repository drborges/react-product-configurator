import { useContext } from "react";
import Context from "Context";
import StepInput from "components/StepInput";

export default function ProductConfigurator() {
  const { configs, models, select, options, selection, styles, types, values } = useContext(
    Context
  );

  return (
    <>
      <StepInput
        label="Model"
        name="model"
        options={models}
        value={selection.model}
        onChange={select}
      />
      <StepInput
        label="Styles"
        name="style"
        options={styles}
        value={selection.style}
        onChange={select}
      />
      <StepInput
        label="Type"
        name="type"
        options={types}
        value={selection.type}
        onChange={select}
      />
      <StepInput
        label="Config"
        name="config"
        options={configs}
        value={selection.config}
        onChange={select}
      />
      {options?.map((option) => (
        <StepInput
          nestable
          key={option.id}
          label={option.name}
          name={option.name}
          options={values(option)}
          value={selection[option.name]}
          onChange={select}
        />
      ))}
    </>
  );
}
