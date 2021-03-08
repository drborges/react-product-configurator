import { isObject } from "lodash"
import { Caption, Flex, Title } from "playbook-ui"

export default function UserSelections({ formState }) {
  const data = formState.values || {}
  const errors = formState.errors || {}

  return (
    <Flex orientation="column">
      <Flex orientation="column">
        <Title marginY="md">User Selections</Title>
        {Object.entries(data).map(([key, data]) => (
          <Caption key={key} size="xs">
            {key}: <strong>{isObject(data) ? `${data.name} - ${data?.id}` : data}</strong>
          </Caption>
        ))}
      </Flex>

      <Flex orientation="column">
        <Title marginY="md">Form Errors</Title>
        { Object.entries(errors).map(([field, error]) => (
          <Caption key={field} size="xs">
            {field}: <strong>{error.type}</strong>
          </Caption>
        ))}
      </Flex>
    </Flex>
  )
}
