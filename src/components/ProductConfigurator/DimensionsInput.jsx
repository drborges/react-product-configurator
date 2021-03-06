import classnames from "classnames"
import { useCallback, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { Card, Button, Flex, FlexItem, Title, TextInput } from "playbook-ui"

import { useExpandable } from "./hooks/useExpandable"

import styles from "./DimensionsInput.module.scss"

export default function DimensionsInput({ defaultValue = {}, label, name }) {
  const { expanded, expand, toggle } = useExpandable()
  const { getValues, register, setValue, errors } = useFormContext()
  const dimensions = getValues()?.dimensions
  const widthValue = dimensions?.width != null ? dimensions?.width : defaultValue.width
  const heightValue = dimensions?.height != null ? dimensions?.height : defaultValue.height

  const setField = useCallback((name, value) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true
    })
  }, [setValue])

  const handleChange = useCallback((e) => {
    setField(`${name}.${e.target.name}`, e.target.value)
  }, [setField, name])

  useEffect(() => {
    if (!expanded && !widthValue) setField("dimensions.width", "")
    if (!expanded && !heightValue) setField("dimensions.height", "")
  }, [setField, expanded, widthValue, heightValue])

  if (!expanded && errors[name]) {
    expand()
  }

  const css = classnames(styles.DimensionsInput, {
    [styles.InvalidInput]: errors[name]
  })

  return (
    <Card className={css} margin="xs" padding="xs">
      <input
        type="hidden"
        ref={register({ required: true })}
        name={`${name}.width`}
        defaultValue={widthValue}
      />
      <input
        type="hidden"
        ref={register({ required: true })}
        name={`${name}.height`}
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
              error={errors[name]?.width && "Required"}
              value={widthValue}
              onChange={handleChange}
            />
          </FlexItem>
          <FlexItem grow>
            <TextInput
              name="height"
              label="Height"
              margin="xs"
              error={errors[name]?.height && "Required"}
              value={heightValue}
              onChange={handleChange}
            />
          </FlexItem>
        </Flex>
      )}
    </Card>
  )
}
