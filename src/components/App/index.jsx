import Context from "Context";
import { Flex } from "playbook-ui";
import windowsConfig from "data/windows.configs.json";
import { useProductConfigurator } from "hooks/useProductConfigurator";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import "playbook-ui/dist/playbook.css";
import "playbook-ui/dist/fonts/regular-min";
import "playbook-ui/dist/fonts/fontawesome-min";

import Navbar from "components/Navbar";
import ProductConfigurator from "components/ProductConfigurator";

function Form() {
  const { handleSubmit } = useFormContext();
  const onSubmit = (values) => {
    console.log("Product Config Ids:", Object.values(values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="center">
        <Navbar />
        <ProductConfigurator />
      </Flex>
    </form>
  );
}

export default function App() {
  const api = useForm();
  const configurator = useProductConfigurator(windowsConfig);

  return (
    <FormProvider {...api}>
      <Context.Provider value={configurator}>
        <Form />
      </Context.Provider>
    </FormProvider>
  );
}
