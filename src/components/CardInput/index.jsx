import { useCallback } from "react";
import { SelectableCard, Title } from "playbook-ui";

export default function CardInput({ name, option, value, onChange }) {
  const handleChange = useCallback(() => {
    onChange(option);
  }, [option, onChange]);

  return (
    <SelectableCard
      checked={value?.id === option.id}
      icon
      inputId={option.id}
      name={name}
      multi={false}
      onClick={handleChange}
      value={option.id}
    >
      <Title dark size={4}>
        {option.name}
      </Title>
    </SelectableCard>
  );
}
