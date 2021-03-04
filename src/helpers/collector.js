function collectNextQuestionValues(configs, configId) {
  const config = configs[configId]
  const nextQuestion = configs[config?.childrenIds[0]]
  return nextQuestion?.childrenIds?.map((id) => configs[id]) || []
}

function collectValues(configs, configId) {
  const config = configs[configId]
  return config?.childrenIds?.map((id) => configs[id]) || []
}

export function createCollector(configs) {
  const rootId = configs.rootId

  return {
    collectModels: () => collectNextQuestionValues(configs, rootId),
    collectStyles: (id) => collectNextQuestionValues(configs, id),
    collectTypes: (id) => collectNextQuestionValues(configs, id),
    collectConfigs: (id) => collectNextQuestionValues(configs, id),
    collectOptions: (id) => collectNextQuestionValues(configs, id),
    collectChildren: (id) => collectValues(configs, id)
  }
}
