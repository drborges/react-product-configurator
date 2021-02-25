The following code generates the decision tree data structure required by Home Tour v2:

```rb
def lookup_attributes
  [ "id", "name", "display_name", "restriction_formula", "parent_id" ]
end

def resolve_type(config, children)
  return "group" if config.option_level == "products"
  return "group" if config.name == "Options"
  return "followup" if config.option_level == "types" && children.first&.name != "Configs"
  return "leaf" if children.empty?
  return "question" if config.option_level == "options"
  return "question" if ["Models", "Styles", "Types", "Configs"].include?(config.name)

  "node"
end

def traverse(config, territory_id, role_id, collected = {}, type = nil)
  children = config.subtrees.active.for_territory(territory_id).for_role(role_id)
  child_type = type
  child_type ||= config.option_level == "options" ? "followup" : nil
  attributes = config.attributes.slice(*lookup_attributes)
  attributes = attributes.merge("children_ids" => children.map(&:id))
  attributes = attributes.merge("type" => type || resolve_type(config, children))
  attributes = attributes.merge("level" => config.option_level)
  attributes = attributes.deep_transform_keys { |k| k.camelize(:lower) }
  attributes["restrictionFormula"] = RubyToJs.new(attributes["restrictionFormula"]).to_js
  collected.merge!(attributes["id"] => attributes)
  children.each { |c| traverse(c, territory_id, role_id, collected, child_type) }
  collected
end

def generate_decision_tree(territory_id, product_id, role_id)
  config = Product.find(product_id).product_config
  configs = traverse(config, territory_id, role_id)
  configs.merge("rootId" => config.id)
end
```
