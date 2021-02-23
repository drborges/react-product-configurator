import classnames from "classnames";
import { useCallback, useContext } from "react";
import { Card, Button, Title } from "playbook-ui";

import Context from "Context";
import CardInput from "components/CardInput";
import { useSelectionReconciler } from "hooks/useSelectionReconciler";

import styles from "./styles.module.scss";
import { useForm, useFormContext } from "react-hook-form";

function NestedStepInput({ parent }) {
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

export default function StepInput({ label, name, nestable = false, options = [] }) {
  const { register } = useFormContext();
  const parentFieldName = `${name}_parent_id`;
  const { disabled, expanded, invalid, select, toggleExpanded, value } = useSelectionReconciler({
    name,
    parentFieldName,
    options
  });

  const handleChange = useCallback(
    (option) => {
      toggleExpanded();
      select(name, option);
    },
    [name, select, toggleExpanded]
  );

  const css = classnames(styles.StepInput, {
    [styles.DisabledInput]: disabled,
    [styles.InvalidInput]: invalid
  });

  return (
    <>
      <Card className={css} margin="xs" padding="xs">
        <input type="hidden" ref={register} name={parentFieldName} />
        <input type="hidden" ref={register} name={name} />

        <Button
          fullWidth
          padding="none"
          className={disabled ? "disabled" : null}
          variant="link"
          onClick={toggleExpanded}
        >
          {label}
        </Button>

        {!expanded && options.length > 0 && <Title>{value?.name}</Title>}

        {expanded &&
          options.map((option) => (
            <CardInput
              key={option.id}
              name={name}
              option={option}
              value={value}
              onChange={handleChange}
            />
          ))}
      </Card>

      {nestable && value && <NestedStepInput parent={value} />}
    </>
  );
}
