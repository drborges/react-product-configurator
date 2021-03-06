import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

export function useRevalidateOnDimensionsChange() {
  const { getValues, trigger } = useFormContext()
  const width = getValues("width")
  const height = getValues("height")

  useEffect(() => {
    // Revalidates all fields in the next event loop tick
    // to make sure the form state is up-to-date.
    //
    // This will make sure restriction formulas get revalidated.
    setTimeout(trigger, 0)
  }, [width, height, trigger])
}
