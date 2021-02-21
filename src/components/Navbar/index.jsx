import { useContext } from "react";
import { Button, Card } from "playbook-ui";
import ConfiguratorContext from "Context";

import styles from "./styles.module.scss";

export default function Navbar() {
  const { build } = useContext(ConfiguratorContext);

  return (
    <Card marginRight="xs" className={styles.Navbar}>
      <Button fullWidth onClick={() => console.log(build())}>
        Save
      </Button>
      <Button fullWidth variant="link">
        Cancel
      </Button>
    </Card>
  );
}
