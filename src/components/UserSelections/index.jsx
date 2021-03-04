import { Caption, Flex, Title } from "playbook-ui"
import { useFormContext } from "react-hook-form"

const errorType = error => {
  if (!error) return

  return error.type === "validate" ? "Restriction Formula" : error.type
}

export default function UserSelections() {
  const { watch, errors } = useFormContext()
  const data = watch()

  return (
    <Flex orientation="column">
      <Flex orientation="column">
        <Title marginY="md">User Selections</Title>
        {Object.entries(data).map(([key, data]) => {
          return key === "dimensions" ? (
            <div key={key}>
              <Caption size="xs">
                Width: <strong>{data.width}</strong>
              </Caption>
              <Caption size="xs">
                Height: <strong>{data.height}</strong>
              </Caption>
            </div>
          ) : (
            <Caption key={key} size="xs">
              {key}: <strong>{data}</strong>
            </Caption>
          )
        })}
      </Flex>

      <Flex orientation="column">
        <Title marginY="md">Form Errors</Title>
        { Object.entries(errors).map(([field, error]) => {
          return field === "dimensions" ? (
            <div key={ field }>
              {error.width && (
                <Caption size="xs">
                  Width: <strong>{errorType(error.width)}</strong>
                </Caption>
              )}
              {error.height && (
                <Caption size="xs">
                  Height: <strong>{errorType(error.height)}</strong>
                </Caption>
              )}
            </div>
          ) : (
            <Caption key={field} size="xs">
              {field}: <strong>{ errorType(error) }</strong>
            </Caption>
          )
        })}
      </Flex>
    </Flex>
  )
}
