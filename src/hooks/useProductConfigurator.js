import { useCallback, useMemo, useState } from "react";
import { createCollector } from "helpers/collector";

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

  const options = useMemo(() => collector.collectOptions(selection.config?.id), [
    collector,
    selection.config
  ]);

  const values = useCallback((config) => collector.collectChildren(config?.id) || [], [collector]);

  const select = useCallback((name, value) => {
    setSelection((selection) => ({
      ...selection,
      [name]: value
    }));
  }, []);

  return {
    selection,
    select,
    models,
    styles,
    types,
    configs,
    options,
    values,
    product: productConfigs[productConfigs.rootId]
  };
}
