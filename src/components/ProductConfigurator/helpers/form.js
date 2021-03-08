export function extractSelectedIds(form) {
  const ids = new Set()

  Object.values(form).forEach(field => {
    field?.pathIds?.forEach(id => ids.add(id))
  })

  return ids
}
