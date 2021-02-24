import { Button, Card } from "playbook-ui";
import { useFormContext } from "react-hook-form";
import UserSelections from "components/UserSelections";

import styles from "./styles.module.scss";

export default function Navbar() {
  const { formState } = useFormContext();

  return (
    <Card marginRight="xs" className={styles.Navbar}>
      <Button disabled={!formState.isValid} fullWidth htmlType="submit">
        Save
      </Button>
      <Button fullWidth variant="link">
        Cancel
      </Button>
      <UserSelections />
    </Card>
  );
}
