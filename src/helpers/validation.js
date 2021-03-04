/* eslint-disable no-eval */
/* eslint-disable no-unused-vars */

export function validateFormula(option, { width = 0, height = 0 } = {}) {
  let error = null,
      notice = null,
      marketing_territory_id = "",
      united_inches = "",
      leg = ""

  eval(option?.restrictionFormula)

  return { error, notice }
}
