import { Button, Card } from "playbook-ui";
import { useFormContext } from "react-hook-form";
import UserSelections from "components/UserSelections";

import styles from "./styles.module.scss";

const isEmpty = value =>
  value === null ||
  value === undefined ||
  value === "" ||
  typeof value === "object" && Object.keys(value).length === 0 ||
  Array.isArray(value) && value.lenght === 0

export default function Navbar() {
  const { errors } = useFormContext();

  return (
    <Card marginRight="xs" className={styles.Navbar}>
      <Button disabled={!isEmpty(errors)} fullWidth htmlType="submit">
        Save
      </Button>
      <Button fullWidth variant="link">
        Cancel
      </Button>
      <UserSelections />
    </Card>
  );
}
