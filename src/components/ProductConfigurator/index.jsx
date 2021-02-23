import { useContext } from "react";
import { Card, FlexItem } from "playbook-ui";
import Context from "Context";
import StepInput from "components/StepInput";
import { useFormContext } from "react-hook-form";

export default function ProductConfigurator() {
  const { register } = useFormContext();
  const { product, configs, models, options, styles, types, values } = useContext(Context);

  return (
    <FlexItem grow maxWidth="md">
      <Card>
        <input type="hidden" ref={register} name="product" value={product.id} />
        <StepInput label="Model" name="model" options={models} />
        <StepInput label="Styles" name="style" options={styles} />
        <StepInput label="Type" name="type" options={types} />
        <StepInput label="Config" name="config" options={configs} />
        {configs.length > 0 &&
          options?.map((option) => (
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
