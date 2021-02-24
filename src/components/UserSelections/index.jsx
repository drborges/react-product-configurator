import { Caption, Flex, Title } from "playbook-ui";
import { useFormContext } from "react-hook-form";

export default function UserSelections() {
  const { getValues } = useFormContext();
  const data = getValues();

  return (
    <Flex orientation="column">
      <Title marginY="md">User Selections</Title>
      {Object.entries(data).map(([key, data]) =>
        key === "dimensions" ? (
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
      )}
    </Flex>
  );
}
