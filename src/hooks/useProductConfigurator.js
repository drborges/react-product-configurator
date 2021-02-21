import { useCallback, useMemo, useState } from "react";
import { createCollector } from "helpers/collector";

const isOptionConfig = (c) => c.optionLevel === "options";

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

  const collectConfigPathId = useCallback(
    (ids, config) => {
      const option = selection[config.name];
      if (option) {
        ids.push(option.id);
        collectConfigPathId(ids, option);
      }
    },
    [selection]
  );

  const build = useCallback(() => {
    const ids = [];
    const optionConfigId = selection.config.childrenIds[0];
    const optionConfigs = productConfigs[optionConfigId].childrenIds.map(
      (id) => productConfigs[id]
    );

    ids.push(selection.model.id);
    ids.push(selection.style.id);
    ids.push(selection.type.id);
    ids.push(selection.config.id);

    optionConfigs.forEach((c) => {
      const configValue = selection[c.name];
      ids.push(configValue.id);
      collectConfigPathId(ids, configValue);
    });

    return ids;
  }, [selection, productConfigs, collectConfigPathId]);

  return {
    build,
    selection,
    select,
    models,
    styles,
    types,
    configs,
    options,
    values
  };
}
