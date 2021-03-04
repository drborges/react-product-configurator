import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

export function useRevalidateOnDimensionsChange() {
  const { watch, trigger } = useFormContext()
  const width = watch("dimensions.width")
  const height = watch("dimensions.height")

  useEffect(() => {
    // Revalidates all fields in the next event loop tick
    // to make sure the form state is up-to-date.
    //
    // This will make sure restriction formulas get revalidated.
    setTimeout(trigger, 0)
  }, [width, height, trigger])
}
