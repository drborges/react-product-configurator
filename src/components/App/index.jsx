import Context from "Context";
import { Flex } from "playbook-ui";
import windowsConfig from "data/windows.configs.json";
import { useProductConfigurator } from "hooks/useProductConfigurator";

import "playbook-ui/dist/playbook.css";
import "playbook-ui/dist/fonts/regular-min";
import "playbook-ui/dist/fonts/fontawesome-min";

import Navbar from "components/Navbar";
import ProductConfigurator from "components/ProductConfigurator";

export default function App() {
  const configurator = useProductConfigurator(windowsConfig);

  return (
    <Context.Provider value={configurator}>
      <Flex justify="center">
        <Navbar />
        <ProductConfigurator />
      </Flex>
    </Context.Provider>
  );
}
