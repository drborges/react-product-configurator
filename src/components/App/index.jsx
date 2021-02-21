import { useMemo } from "react";
import Context from "Context";
import windowsConfig from "data/windows.configs.json";
import { useProductConfigurator } from "hooks/useProductConfigurator";

import "playbook-ui/dist/playbook.css";
import "playbook-ui/dist/fonts/regular-min";
import "playbook-ui/dist/fonts/fontawesome-min";
import ProductConfigurator from "components/ProductConfigurator";

export default function App() {
  const configurator = useProductConfigurator(windowsConfig);
  const context = useMemo(() => configurator, [configurator]);

  return (
    <div className="App">
      <Context.Provider value={context}>
        <ProductConfigurator />
      </Context.Provider>
    </div>
  );
}
