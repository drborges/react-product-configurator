import { Caption, Flex } from "playbook-ui";
import { useFormContext } from "react-hook-form";

export default function UserSelections() {
  const { formState, getValues } = useFormContext();
  const data = getValues();

  return (
    <Flex orientation="column">
      {Object.entries(data).map(([key, data]) =>
        key === "dimensions" ? (
          <>
            <Caption size="xs">
              Width: <strong>{data.width}</strong>
            </Caption>
            <Caption size="xs">
              Height: <strong>{data.height}</strong>
            </Caption>
          </>
        ) : (
          <Caption size="xs">
            {key}: <strong>{data}</strong>
          </Caption>
        )
      )}
    </Flex>
  );
}
