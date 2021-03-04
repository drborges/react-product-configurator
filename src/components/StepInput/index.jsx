import classnames from "classnames";
import { Button, Card, Icon, Title } from "playbook-ui";

import Alert from "components/Alert";
import CardInput from "components/CardInput";
import { useStepInput } from "hooks/useStepInput";

import styles from "./styles.module.scss";

export default function StepInput({ step = {} }) {
  const {
    error,
    expanded,
    name,
    next,
    notice,
    select,
    toggleExpanded,
    ref,
    value,
  } = useStepInput(step);

  const nextSteps = next(value)
  const css = classnames(styles.StepInput, {
    [styles.Invalid]: error
  });

  return (
    <>
      <Card className={css} margin="xs" padding="xs">
        <input type="hidden" ref={ ref } name={ name } defaultValue={value?.id} />

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
  );
}
