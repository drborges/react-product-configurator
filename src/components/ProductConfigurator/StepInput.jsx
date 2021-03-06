import classnames from "classnames"
import { Button, Card, Icon, Title } from "playbook-ui"
import { memo } from "react"

import Alert from "../Alert"
import CardInput from "../CardInput"
import { useStepInput } from "./hooks/useStepInput"

import styles from "./StepInput.module.scss"

function StepInput({ step = {} }) {
  const {
    error,
    expanded,
    name,
    nextSteps,
    notice,
    select,
    toggleExpanded,
    ref,
    value,
  } = useStepInput(step)

  const css = classnames(styles.StepInput, {
    [styles.Invalid]: error
  })

  return (
    <>
      <Card className={css} margin="xs" padding="xs">
        <input type="hidden" ref={ref} name={name} defaultValue={value?.id} />

        <Button
          fullWidth
          onClick={toggleExpanded}
          padding="none"
          variant="link"
        >
          {error && <span><Icon fixedWidth icon="exclamation-circle" /></span>}
          {!error && notice && <span><Icon fixedWidth icon="exclamation-circle" /></span>}
          { step.name }
        </Button>

        {expanded && error && error.message && <Alert>{error.message}</Alert>}
        {expanded && !error && notice && <Alert level="warning">{notice}</Alert>}

        {!expanded && <Title>{value?.name}</Title>}

        {expanded &&
          step.options.map((option) => (
            <CardInput
              key={option.id}
              name={`${step.name}-card-input`}
              option={option}
              value={value}
              onChange={select}
            />
          ))}
      </Card>

      {nextSteps.map(nextStep => <StepInput key={nextStep.id} step={nextStep} />)}
    </>
  )
}

export default memo(StepInput)
