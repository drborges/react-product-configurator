import { noop } from "lodash"
import { LoadingInline } from "playbook-ui"
import { useForm, FormProvider } from "react-hook-form"

import { Form } from "./Form"
import Context from "./Context"
import { useDecisionTree } from "./hooks/useDecisionTree"

export default function ProductConfigurator({
  defaultValues = {},
  decisionTree = {},
  loading = false,
  onChange = noop,
}) {
  const tree = useDecisionTree(decisionTree, { defaultValues })
  const form = useForm({ mode: "all", reValidateMode: "onChange" })

  if (loading) return <LoadingInline align="center" />

  return (
    <FormProvider {...form}>
      <Context.Provider value={tree}>
        <Form onChange={onChange} />
      </Context.Provider>
    </FormProvider>
  )
}
