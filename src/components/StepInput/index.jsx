import classnames from "classnames";
import { useCallback, useContext } from "react";
import { Button, SelectableCard, Title } from "playbook-ui";

import Context from "Context";
import { useSelectionReconciler } from "hooks/useSelectionReconciler";

import styles from "./styles.module.scss";

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

export default function StepInput({
  label,
  name,
  nestable = false,
  options = [],
  value,
  onChange = () => {}
}) {
  const { disabled, expanded, invalid, toggleExpanded } = useSelectionReconciler(
    name,
    value,
    options
  );

  const handleChange = useCallback(
    (option) => () => {
      toggleExpanded();
      onChange(name, option);
    },
    [name, onChange, toggleExpanded]
  );

  const css = classnames(styles.StepInput, {
    [styles.DisabledInput]: disabled,
    [styles.InvalidInput]: invalid
  });

  return (
    <>
      <div className={css}>
        <Button
          fullWidth
          padding="none"
          className={disabled ? "disabled" : null}
          variant="link"
          onClick={toggleExpanded}
        >
          {label}
        </Button>
        {!expanded && <Title>{value?.name}</Title>}
        {expanded &&
          options.map((option) => (
            <SelectableCard
              key={option.id}
              checked={value?.id === option.id}
              icon
              inputId={option.id}
              name={name}
              multi={false}
              onClick={handleChange(option)}
              value={option.id}
            >
              <Title dark size={4}>
                {option.name}
              </Title>
            </SelectableCard>
          ))}
      </div>

      {nestable && value && <NestedStepInput parent={value} />}
    </>
  );
}
