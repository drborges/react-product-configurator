import { useForm, FormProvider } from "react-hook-form";

import "playbook-ui/dist/playbook.css";
import "playbook-ui/dist/fonts/regular-min";
import "playbook-ui/dist/fonts/fontawesome-min";

import windowsConfig from "data/windows.configs.json";
import Form from "components/ProductConfiguratorForm";

export default function App() {
  const api = useForm({
    mode: "all",
    reValidateMode: "onChange"
  });

  return (
    <FormProvider {...api}>
      <Form decisionTree={windowsConfig} />
    </FormProvider>
  );
}
