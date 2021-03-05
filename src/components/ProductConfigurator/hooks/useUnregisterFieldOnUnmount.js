import { useFormContext } from "react-hook-form"
import { useEffect } from "react"

export function useUnregisterFieldOnUnmount(step) {
  const { unregister } = useFormContext()

  // Unregisters the form field when the component gets unmounted.
  useEffect(() => {
    return () => unregister(step.name)
  }, [step.name, unregister])
}
