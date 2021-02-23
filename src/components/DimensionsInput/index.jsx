import classnames from "classnames";
import { useFormContext } from "react-hook-form";
import { Card, Button, Flex, FlexItem, Title, TextInput } from "playbook-ui";

import { useToggler } from "hooks/useToggler";

import styles from "./styles.module.scss";
import { useCallback, useEffect, useState } from "react";

export default function DimensionsInput({ label, name, value = { width: "", height: "" } }) {
  const [expanded, toggleExpanded] = useToggler();
  const [dimensions, setDimensions] = useState(value);
  const { register, getValues, setValue, errors } = useFormContext();
  const setField = useCallback((name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true
    });
  }, []);

  const handleChange = useCallback(
    (e) => {
      setField(`${name}.${e.target.name}`, e.target.value);
      setDimensions((current) => ({
        ...current,
        [e.target.name]: e.target.value
      }));
    },
    [setField]
  );

  const css = classnames(styles.DimensionsInput, {
    [styles.InvalidInput]: errors[name]
  });

  useEffect(() => {
    if (!expanded && !dimensions.width) {
      setField("dimensions.width", "");
    }
    if (!expanded && !dimensions.height) {
      setField("dimensions.height", "");
    }
  }, [setField, dimensions]);

  if (!expanded && errors[name]) {
    toggleExpanded();
  }

  return (
    <Card className={css} margin="xs" padding="xs">
      <input
        type="hidden"
        ref={register({ required: true })}
        name={`${name}.width`}
        defaultValue={dimensions.width}
      />
      <input
        type="hidden"
        ref={register({ required: true })}
        name={`${name}.height`}
        defaultValue={dimensions.height}
      />

      <Button fullWidth padding="none" variant="link" onClick={toggleExpanded}>
        {label}
      </Button>

      {!expanded && (
        <Flex justify="center">
          <Title>Width: {dimensions?.width}</Title>
          <Title>﹒</Title>
          <Title>Height: {dimensions?.height}</Title>
        </Flex>
      )}

      {expanded && (
        <Flex>
          <FlexItem grow>
            <TextInput
              name="width"
              label="Width"
              margin="xs"
              error={errors[name]?.width && "Required"}
              value={dimensions.width}
              onChange={handleChange}
            />
          </FlexItem>
          <FlexItem grow>
            <TextInput
              name="height"
              label="Height"
              margin="xs"
              error={errors[name]?.height && "Required"}
              value={dimensions.height}
              onChange={handleChange}
            />
          </FlexItem>
        </Flex>
      )}
    </Card>
  );
}
