import { Flex } from "playbook-ui";
import { useFormContext } from "react-hook-form";

import Navbar from "components/Navbar";
import ProductConfigurator from "components/ProductConfigurator";
import DecisionTreeContext from "DecisionTreeContext";
import { useDecisionTree } from "hooks/useDecisionTree"

export default function Form({ decisionTree = {} }) {
  const { handleSubmit } = useFormContext();
  const engine = useDecisionTree(decisionTree);
  const onSubmit = (values) => {
    console.log("Product Config Ids:", Object.values(values));
  };

  return (
    <DecisionTreeContext.Provider value={engine}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="center">
          <Navbar />
          <ProductConfigurator />
        </Flex>
      </form>
    </DecisionTreeContext.Provider>
  );
}
