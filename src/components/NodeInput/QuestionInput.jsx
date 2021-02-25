import classnames from "classnames";
import { Button, Card, Title } from "playbook-ui";
import Alert from "components/Alert";
import CardInput from "components/CardInput";
import { useNodeInput } from "hooks/useNodeInput";
import styles from "./styles.module.scss";
import NodeInput from "./index";

export function QuestionInput({ node = {}, label = node.name, type }) {
  const {
    disabled,
    error,
    expanded,
    name,
    notice,
    options = [],
    select,
    toggleExpanded,
    register,
    validations,
    value
  } = useNodeInput(node);
  const css = classnames(styles.NodeInput, {
    [styles.Disabled]: disabled,
    [styles.Invalid]: error
  });

  return (
    <>
      <Card className={css} margin="xs" padding="xs">
        <input type="hidden" ref={register(validations)} name={name} defaultValue={node.id} />

        <Button
          fullWidth
          padding="none"
          className={disabled ? "disabled" : null}
          variant="link"
          onClick={toggleExpanded}
        >
          {label}
        </Button>

        {error && error.message && <Alert>{error.message}</Alert>}
        {!error && notice && <Alert level="warning">{notice}</Alert>}

        {!expanded && options.length > 0 && <Title>{value?.name}</Title>}

        {expanded &&
          options.map((option) => (
            <CardInput
              key={option.id}
              name={name}
              option={option}
              value={value}
              onChange={select}
            />
          ))}
      </Card>
      {value && <NodeInput node={value} type={type} />}
    </>
  );
}
