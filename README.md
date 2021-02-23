The following code generates the decision tree data structure required by Home Tour v2:

```rb
def lookup_attributes
  [ "id", "name", "display_name", "restriction_formula", "parent_id" ]
end

def traverse(config, territory_id, role_id, collected = {})
  children = config.subtrees.active.for_territory(territory_id).for_role(role_id)
  attributes = config.attributes.slice(*lookup_attributes)
  attributes = attributes.merge("children_ids" => children.map(&:id))
  attributes = attributes.deep_transform_keys { |k| k.camelize(:lower) }
  attributes["restrictionFormula"] = RubyToJs.new(attributes["restrictionFormula"]).to_js
  collected.merge!(attributes["id"]] => attributes)
  children.each { |c| traverse(c, territory_id, role_id, collected) }
  collected
end

def generate_decision_tree(territory_id, product_id, role_id)
  config = Product.find(product_id).product_config
  configs = traverse(config, territory_id, role_id)
  configs.merge("rootId" => config.id)
end
```
