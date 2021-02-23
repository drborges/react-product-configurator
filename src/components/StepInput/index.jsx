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
  const parentFieldName = `${name}_parent_id`;
  const { select, selection } = useContext(Context);
  const { setValue, register } = useFormContext();
  const value = selection[name];
  const handleSelect = useCallback(
    (name, value) => {
      // Track user selections outside the form state,
      // this will allow us to initialize new fields with
      // previously selected values as users change options
      // higher in the tree, e.g., changing the style or model
      // we'd be able to keep the state of previouslly selected
      // options, such as "Color", "Grid Pattern", etc...
      select(name, value);
      setValue(name, value?.id);
      // Make sure we track the parent config as well
      // this will make it easier to extract all config
      // ids we need to build the product upon clicking "Save"
      setValue(parentFieldName, value?.parentId);
    },
    [parentFieldName, select, setValue]
  );

  const { disabled, expanded, invalid, toggleExpanded } = useSelectionReconciler({
    name,
    value,
    options,
    onSelect: handleSelect
  });

  const handleChange = useCallback(
    (option) => {
      toggleExpanded();
      handleSelect(name, option);
    },
    [name, handleSelect, toggleExpanded]
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
