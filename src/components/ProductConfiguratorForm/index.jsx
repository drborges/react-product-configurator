import { Flex } from "playbook-ui"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"

import Navbar from "components/Navbar"
import ProductConfigurator from "components/ProductConfigurator"


export default function Form() {
  const { handleSubmit } = useFormContext()
  const [decisionTree, setDecisionTree] = useState()
  const [filters, setFilter] = useState({ territory: 1, product: 1 })
  const updateFilters = useCallback((name, value) => setFilter(current => ({
    ...current,
    [name]: value
  })), [])

  const handleError = useCallback(error => {
    alert(`An error occurred when fetching decision tree for Territory ${filters.territory} and Product ${filters.product}`)
  }, [filters])

  const handleFilterChange = useCallback(e => {
    updateFilters(e.target.name, e.target.value)
  }, [updateFilters])

  const onSubmit = useCallback((values) => {
    console.log("Product Config Ids:", values)
  }, [])

  useEffect(() => {
    const configPath = `/configs/${filters.territory}-${filters.product}-decision-tree.json`
    fetch(configPath)
      .then(resp => resp.json())
      .then(tree => setDecisionTree(tree))
      .catch(handleError)
  }, [filters, handleError])

  const defaultValues = useMemo(() => ({
    "Color": "734292",
    "Config": "734272",
    "Grid Pattern Options": "738077",
    "Model": "732251",
    "Removal": "734587",
    "Special Option": "2915",
    "Style": "732257",
    "Type": "734122",
    "White / White Options": "734307",
    "dimensions": {
      "height": "11",
      "width": "22",
    }
  }), [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="center">
        <Navbar filters={filters} onChangeFilter={handleFilterChange} />
        <ProductConfigurator
          loading={ !decisionTree }
          decisionTree={ decisionTree }
          defaultValues={defaultValues}
        />
      </Flex>
    </form>
  )
}
