export function findOptionById(step, id) {
  return step.options.find(o => o.id === parseInt(id))
}

export function findOptionByName(step, name) {
  return step.options.find((o) => o.name === name)
}

export function findDefaultOption(step) {
  return step.options.find(o => o.id === step.defaultValue)
}

export function defaultValueForStep(defaults, step) {
  const id = defaults[step.name]
  return step.options.find(o => o.id.toString() === id?.toString())
}
