/**
 * Collects all product configs visited by the
 * provided visitor, starting from the provided
 * config root id.
 */
export function collect(visitor, rootId) {
  const collected = [];

  for (const config of visitor(rootId)) {
    collected.push(config);
  }

  return collected;
}

/**
 * Recursively visits each node in the product tree, only visiting configs
 * matching the provided predicate.
 */
export function* visit(configs, configId, predicate) {
  if (!configId) return;

  const config = configs[configId];

  if (predicate(config)) {
    yield config;
    return;
  }

  for (const id of config.childrenIds) {
    yield* visit(configs, id, predicate);
  }
}

/**
 * Implements the visitor pattern providing a simpler
 * way to traverse the product config tree.
 */
export function createCollector(configs) {
  const rootId = configs.rootId;
  const visitModels = (id) => visit(configs, id, (c) => c.optionLevel === "models");
  const visitStyles = (id) => visit(configs, id, (c) => c.optionLevel === "styles");
  const visitTypes = (id) => visit(configs, id, (c) => c.optionLevel === "types");
  const visitConfigs = (id) => visit(configs, id, (c) => c.optionLevel === "configs");
  const visitOptions = (id) => visit(configs, id, (c) => c.optionLevel === "options");
  const visitChildren = (id) => visit(configs, id, (c) => c.parentId === id);

  return {
    visitBy: (id, predicate) => visit(configs, id, predicate),
    collectModels: () => collect(visitModels, rootId),
    collectStyles: (id) => collect(visitStyles, id),
    collectTypes: (id) => collect(visitTypes, id),
    collectConfigs: (id) => collect(visitConfigs, id),
    collectOptions: (id) => collect(visitOptions, id),
    collectChildren: (id) => collect(visitChildren, id)
  };
}
