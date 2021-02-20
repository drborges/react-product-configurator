import productConfigs from "data/configs.json";
import { useProductConfigurator } from "hooks/useProductConfigurator";
import { StepInput } from "components/StepInput";

import "./styles.css";
import "playbook-ui/dist/playbook.css";
import "playbook-ui/dist/fonts/regular-min";
import "playbook-ui/dist/fonts/fontawesome-min";

export default function App() {
  const { models, styles, types, configs, options, select, selection } = useProductConfigurator(
    productConfigs
  );

  return (
    <div className="App">
      <form>
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
        <StepInput
          label="Options"
          name="option"
          options={options}
          value={selection.option}
          onChange={select}
        />
      </form>
    </div>
  );
}
