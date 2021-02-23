import { Card, Flex } from "playbook-ui";
import classnames from "classnames";

import styles from "./styles.module.scss";

export default function Alert({ children, level = "error" }) {
  const css = classnames({
    [styles[level]]: level
  });

  return (
    <Card className={css}>
      <Flex justify="center">{children}</Flex>
    </Card>
  );
}
