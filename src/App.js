import { useMemo } from "react";
import Context from "./Context";
import StepInput from "components/StepInput";
import windowsConfig from "data/windows.configs.json";
import { useProductConfigurator } from "hooks/useProductConfigurator";

import "./styles.css";
import "playbook-ui/dist/playbook.css";
import "playbook-ui/dist/fonts/regular-min";
import "playbook-ui/dist/fonts/fontawesome-min";

export default function App() {
  const {
    models,
    styles,
    types,
    configs,
    options,
    values,
    select,
    selection
  } = useProductConfigurator(windowsConfig);

  const context = useMemo(() => ({ onChange: select, selection, values }), [
    select,
    selection,
    values
  ]);

  return (
    <div className="App">
      <Context.Provider value={context}>
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
      </Context.Provider>
    </div>
  );
}
