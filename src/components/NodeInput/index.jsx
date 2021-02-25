import classnames from "classnames";
import { Button, Card, Title } from "playbook-ui";
import Alert from "components/Alert";
import CardInput from "components/CardInput";
import { useNodeInput } from "hooks/useNodeInput";

import styles from "./styles.module.scss";

function QuestionInput({ node = {}, label, type }) {
  const {
    disabled,
    error,
    expanded,
    name,
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
        <input type="hidden" ref={register(validations)} name={name} defaultValue={value?.id} />

        <Button
          fullWidth
          padding="none"
          className={disabled ? "disabled" : null}
          variant="link"
          onClick={toggleExpanded}
        >
          {label || name}
        </Button>

        {error && <Alert>{error}</Alert>}

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
      {value && value.type !== "leaf" && <NodeInput node={value} type={type} />}
    </>
  );
}

function FollowupInput({ node, type }) {
  return <QuestionInput node={node} label={`${node.name} Options`} type={type} />;
}

function GroupInput({ node, type }) {
  const { name, options = [], register } = useNodeInput(node);

  return (
    <>
      <input type="hidden" ref={register} name={name} defaultValue={node.id} />
      {options.map((option) => (
        <NodeInput key={option.id} node={option} type={type} />
      ))}
    </>
  );
}

const mapping = {
  question: QuestionInput,
  followup: FollowupInput,
  option: QuestionInput,
  node: GroupInput,
  group: GroupInput
};

export default function NodeInput({ node = {}, type }) {
  if (node.childrenIds.length === 0) return null;
  if (node.name === "Additional Details") type = "followup";
  if (node.name === "Special Options (ie. Full Screen, Obscure Glass, etc)") type = "group";

  const Input = mapping[type || node.type];

  return <Input node={node} />;
}
