import { Flex } from "playbook-ui";
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form";

import Navbar from "components/Navbar";
import { useDecisionTree } from "hooks/useDecisionTree"
import ProductConfigurator from "components/ProductConfigurator";

export default function Form() {
  const { handleSubmit } = useFormContext();
  const [decisionTree, setDecisionTree] = useState()
  const [filters, setFilter] = useState({ territory: 1, product: 1 })
  const updateFilters = (name, value) => setFilter(current => ({
    ...current,
    [name]: value
  }))

  const handleFilterChange = e => {
    updateFilters(e.target.name, e.target.value)
  }

  const onSubmit = (values) => {
    console.log("Product Config Ids:", values);
  };

  useEffect(async () => {
    try {
      const response = await fetch(`/configs/${filters.territory}-${filters.product}-decision-tree.json`)
      const tree = await response.json()
      setDecisionTree(tree)
    } catch {
      alert(`An error occurred when fetching decision tree for Territory ${filters.territory} and Product ${filters.product}`)
    }
  }, [filters])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="center">
        <Navbar filters={filters} onChangeFilter={handleFilterChange} />
        <ProductConfigurator loading={!decisionTree} decisionTree={decisionTree} />
      </Flex>
    </form>
  );
}
