import { Button, SelectableCard, Title } from "playbook-ui";
import { useAutoSelect } from "hooks/useAutoSelect";
import { useSelectionReconciler } from "hooks/useSelectionReconciler";
import { useCallback, useState } from "react";

function useToggler(initialState = false) {
  const [value, setValue] = useState(initialState);

  return [
    value,
    useCallback(() => {
      console.log(">>>>>>", value);
      setValue((current) => !current);
    }, [])
  ];
}

export function StepInput({ label, name, options = [], value, onChange = () => {} }) {
  const [expanded, toggleExpanded] = useToggler(false);
  useAutoSelect(name, value, options, onChange);
  useSelectionReconciler(name, value, options, onChange);

  const disabled = options.length === 0;
  const handleChange = (option) => () => {
    toggleExpanded();
    onChange(name, option);
  };

  return (
    <div className="FieldGroup">
      <Button className={disabled ? "disabled" : null} variant="link" onClick={toggleExpanded}>
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
  );
}
