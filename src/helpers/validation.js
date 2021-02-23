export function validateFormula(config, { width = 0, height = 0 } = {}) {
  let error = null,
    notice = null,
    marketing_territory_id = "",
    united_inches = "",
    leg = "";

  eval(config.restrictionFormula);

  return { error, notice };
}
