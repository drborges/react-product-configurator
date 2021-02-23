import { Button, Card } from "playbook-ui";

import styles from "./styles.module.scss";

export default function Navbar() {
  return (
    <Card marginRight="xs" className={styles.Navbar}>
      <Button fullWidth htmlType="submit">
        Save
      </Button>
      <Button fullWidth variant="link">
        Cancel
      </Button>
    </Card>
  );
}
