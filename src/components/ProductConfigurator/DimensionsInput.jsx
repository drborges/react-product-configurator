import classnames from "classnames"
import { useCallback, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Card, Button, Flex, FlexItem, Title, TextInput } from "playbook-ui"

import { useExpandable } from "./hooks/useExpandable"

import styles from "./DimensionsInput.module.scss"

export default function DimensionsInput({ defaultValue = {}, label, name }) {
  const { expanded, expand, toggle } = useExpandable()
  const { getValues, register, setValue, errors } = useFormContext()
  const { width, height } = getValues(["width", "height"])
  const widthValue = width != null ? width : defaultValue.width
  const heightValue = height != null ? height : defaultValue.height
  const hasErrors = errors["width"] || errors["height"]

  const setField = useCallback((name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true
    })
  }, [setValue])

  const handleChange = useCallback((e) => {
    setField(e.target.name, e.target.value)
  }, [setField])

  useEffect(() => {
    if (!expanded && !widthValue) setField("width", "")
    if (!expanded && !heightValue) setField("height", "")
  }, [setField, expanded, widthValue, heightValue])

  if (!expanded && hasErrors) {
    expand()
  }

  const css = classnames(styles.DimensionsInput, {
    [styles.InvalidInput]: hasErrors
  })

  return (
    <Card className={css} margin="xs" padding="xs">
      <input
        type="hidden"
        ref={register({ required: true })}
        name="width"
        defaultValue={widthValue}
      />
      <input
        type="hidden"
        ref={register({ required: true })}
        name="height"
        defaultValue={heightValue}
      />

      <Button fullWidth padding="none" variant="link" onClick={toggle}>
        {label}
      </Button>

      {!expanded && (
        <Flex justify="center">
          <Title>Width: {widthValue}</Title>
          <Title>﹒</Title>
          <Title>Height: {heightValue}</Title>
        </Flex>
      )}

      {expanded && (
        <Flex>
          <FlexItem grow>
            <TextInput
              name="width"
              label="Width"
              margin="xs"
              error={errors["width"] && "Required"}
              value={widthValue}
              onChange={handleChange}
            />
          </FlexItem>
          <FlexItem grow>
            <TextInput
              name="height"
              label="Height"
              margin="xs"
              error={errors["height"] && "Required"}
              value={heightValue}
              onChange={handleChange}
            />
          </FlexItem>
        </Flex>
      )}
    </Card>
  )
}
