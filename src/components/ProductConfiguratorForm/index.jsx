import { Flex } from "playbook-ui";
import { useFormContext } from "react-hook-form";
import Navbar from "components/Navbar";
import ProductConfigurator from "components/ProductConfigurator";
import { useProductConfigurator } from "hooks/useProductConfigurator";
import Context from "Context";

export default function Form({ decisionTree = {} }) {
  const { handleSubmit } = useFormContext();
  const configurator = useProductConfigurator(decisionTree);
  const onSubmit = (values) => {
    console.log("Product Config Ids:", Object.values(values));
  };

  return (
    <Context.Provider value={configurator}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="center">
          <Navbar />
          <ProductConfigurator />
        </Flex>
      </form>
    </Context.Provider>
  );
}
