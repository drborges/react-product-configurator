import Context from "Context";
import classnames from "classnames";
import { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Card, Button, Title } from "playbook-ui";

import CardInput from "components/CardInput";
import { NestedStepInput } from "./NestedStepInput";
import { validateFormula } from "helpers/validation";
import { useSelectionReconciler } from "hooks/useSelectionReconciler";

import styles from "./styles.module.scss";
import Alert from "components/Alert";

export default function StepInput({ label, name, nestable = false, options = [] }) {
  const { lookup } = useContext(Context);
  const { getValues, errors, register } = useFormContext();
  const parentFieldName = `${name}_parent_id`;
  const { disabled, invalid, expanded, select, toggleExpanded, value } = useSelectionReconciler({
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

  const validate = (id) => {
    const config = lookup(id);
    const { error, notice } = validateFormula(config, getValues()?.dimensions);
    return error || notice;
  };

  const css = classnames(styles.StepInput, {
    [styles.DisabledInput]: disabled,
    [styles.InvalidInput]: invalid
  });

  console.log("Rendering", label);

  return (
    <>
      <Card className={css} margin="xs" padding="xs">
        {/*
          React hook form will clear the form state when fields are unmounted, this is
          an expected behavior that helps keeping the form state in sync with what's
          presented to the user. Howevere, in HomeTour, we need to hide/collapse fields when
          selecting options, which causes the form state to lose the user's input.
          To workaround this expected behavior, we can rely on hidden fields to keep
          track of the field state. The benefit is that we still get that form state cleanup
          behavior when the actual StepInput gets unmounted (when it is not available for a
          parent selection).
        */}
        {options.length > 0 && (
          <>
            <input type="hidden" ref={register({ required: true, validate })} name={name} />
            <input type="hidden" ref={register} name={parentFieldName} />
          </>
        )}

        <Button
          fullWidth
          padding="none"
          className={disabled ? "disabled" : null}
          variant="link"
          onClick={toggleExpanded}
        >
          {label}
        </Button>

        {errors[name] && <Alert>{errors[name].message}</Alert>}

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
