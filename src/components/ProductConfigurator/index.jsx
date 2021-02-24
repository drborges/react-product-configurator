import { useContext } from "react";
import { Card, FlexItem } from "playbook-ui";
import { useFormContext } from "react-hook-form";
import Context from "Context";
import StepInput from "components/StepInput";
import DimensionsInput from "components/DimensionsInput";

export default function ProductConfigurator() {
  const { register } = useFormContext();
  const {
    product,
    configs,
    models,
    configOptions,
    styles,
    types,
    typeOptions,
    values,
    showConfigOptions,
    showTypeOptions
  } = useContext(Context);

  return (
    <FlexItem grow maxWidth="md">
      <Card>
        <input type="hidden" ref={register} name="product" value={product.id} />
        <DimensionsInput label="Dimensions" name="dimensions" />
        <StepInput label="Model" name="model" options={models} />
        <StepInput label="Styles" name="style" options={styles} />
        <StepInput label="Type" name="type" options={types} />
        {!showTypeOptions && <StepInput label="Config" name="config" options={configs} />}
        {showTypeOptions && (
          <StepInput label="Type Options" name="typeOptions" options={typeOptions} />
        )}

        {showConfigOptions &&
          configOptions?.map((option) => (
            <StepInput
              nestable
              key={option.id}
              label={option.name}
              name={option.name}
              options={values(option)}
            />
          ))}
      </Card>
    </FlexItem>
  );
}
