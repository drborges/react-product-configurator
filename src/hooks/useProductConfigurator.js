import { useCallback, useMemo, useState } from "react";
import { createCollector } from "helpers/collector";

const isConfig = (c) => c.name === "Configs";
const isNotConfig = (c) => c.name !== "Configs";

export function useProductConfigurator(productConfigs = {}) {
  const [selection, setSelection] = useState({});
  const collector = useMemo(() => createCollector(productConfigs), [productConfigs]);
  const models = useMemo(() => collector.collectModels(), [collector]);

  const styles = useMemo(() => collector.collectStyles(selection.model?.id), [
    collector,
    selection.model
  ]);

  const types = useMemo(() => collector.collectTypes(selection.style?.id), [
    collector,
    selection.style
  ]);

  const configs = useMemo(() => collector.collectConfigs(selection.type?.id), [
    collector,
    selection.type
  ]);

  const configOptions = useMemo(() => collector.collectOptions(selection.config?.id), [
    collector,
    selection.config
  ]);

  const typeOptions = useMemo(
    () => collector.collectChildren(selection.type?.id).filter(isNotConfig),
    [collector, selection.type]
  );

  const values = useCallback((config) => collector.collectChildren(config?.id) || [], [collector]);

  const lookup = useCallback((id) => productConfigs[id], [productConfigs]);

  const select = useCallback((name, value) => {
    setSelection((selection) => ({
      ...selection,
      [name]: value
    }));
  }, []);

  const showConfigOptions = useMemo(() => typeOptions.length === 0 && configs.length > 0, [
    typeOptions,
    configs
  ]);

  const showTypeOptions = useMemo(() => typeOptions.length > 0, [typeOptions]);

  return {
    selection,
    select,
    lookup,
    models,
    styles,
    types,
    typeOptions,
    configs,
    configOptions,
    values,
    showConfigOptions,
    showTypeOptions,
    rootNode: productConfigs[productConfigs.rootId]
  };
}
