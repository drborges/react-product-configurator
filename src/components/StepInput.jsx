import { useAutoSelect } from "hooks/useAutoSelect";
import { useSmartChange } from "hooks/useSmartChange";
import { useSelectionReconciler } from "hooks/useSelectionReconciler";

export function StepInput({ label, name, options = [], value, onChange = () => {} }) {
  const change = useSmartChange(options, onChange);
  useAutoSelect(name, value, options, change);
  useSelectionReconciler(name, value, options, change);

  return (
    <div className="FieldGroup">
      <label>{label}</label>
      <select name={name} value={value?.id} onChange={(e) => change(name, e.target.value)}>
        <option value={null}>Select a {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
