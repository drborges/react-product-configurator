import { Button, Card, Select } from "playbook-ui";
import { useFormContext } from "react-hook-form";
import UserSelections from "components/UserSelections";
import territories from "./territories.json"
import products from "./products.json"
import styles from "./styles.module.scss";

const isEmpty = value =>
  value === null ||
  value === undefined ||
  value === "" ||
  typeof value === "object" && Object.keys(value).length === 0 ||
  Array.isArray(value) && value.lenght === 0

export default function Navbar({ filters = {}, onChangeFilter }) {
  const { errors } = useFormContext();

  return (
    <Card marginRight="xs" className={ styles.Navbar }>
      <Select label="Territory" name="territory" options={territories} onChange={onChangeFilter} value={filters.territory} />
      <Select label="Product" name="product" options={products} onChange={onChangeFilter} value={filters.product} />

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
