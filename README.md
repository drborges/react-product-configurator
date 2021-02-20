```js
def lookup_attributes
  [ "id", "name", "option_level", "parent_id" ]
end

def traverse(config, collected = {})
  children = ProductConfig.active.where(parent_id: config.id)
  attributes = config.attributes.slice(*lookup_attributes).deep_transform_keys { |k| k.camelize(:lower) }.merge(childrenIds: children.pluck(:id), type: resolve_type(config, children))
  collected[attributes["id"]] = attributes
  children.each { |c| traverse(c, collected) }
  collected
end

def aggregate_tree_ids(config_id)
  config = ProductConfig.active.find(config_id)
  children_ids = ProductConfig.active.select(:id).where(parent_id: config_id).pluck(:id)
  subtree_ids = children_ids.flat_map(&method(:aggregate_tree_ids))
  [config_id].concat(subtree_ids)
end



query Cofigs{
  windowConfigs: productConfigs(territoryId: 1, productId: 1) {
    id
    name
    type
    parentId
    childrenIds
    optionsIdPath
  }

  doorConfigs: productConfigs(territoryId: 1, productId: 1) {
    id
    name
    type
    parentId
    childrenIds
  }
}

=> {
  windowConfigs: [
    {
      id: 10,
      name: "Options",
      type: "container",
      parentId: 9,
      childrenIds: [11, 12]
      path: [
        { name: "windows", id: 1 },
        { name: "models", id: 2 },
        { name: "sl 2700", id: 3 },
        { name: "styles", id: 4 },
        { name: "double hung", id: 5 },
        { name: "types", id: 6 },
        { name: "none", id: 7 },
        { name: "configs", id: 8 },
        { name: "none", id: 9 },
        { name: "options", id: 10 },
      ]
    },
    {
      id: 11,
      name: "Color",
      type: "field",
      parentId: 10,
      childrenIds: [13, 14, 15]
      path: [
        { name: "windows", id: 1 },
        { name: "models", id: 2 },
        { name: "sl 2700", id: 3 },
        { name: "styles", id: 4 },
        { name: "double hung", id: 5 },
        { name: "types", id: 6 },
        { name: "none", id: 7 },
        { name: "configs", id: 8 },
        { name: "none", id: 9 },
        { name: "options", id: 10 },
        { name: "color", id: 11 },
      ]
    },
    {
      id: 13,
      name: "White / White",
      type: "field",
      parentId: 11,
      childrenIds: [16]
      path: [
        { name: "windows", id: 1 },
        { name: "models", id: 2 },
        { name: "sl 2700", id: 3 },
        { name: "styles", id: 4 },
        { name: "double hung", id: 5 },
        { name: "types", id: 6 },
        { name: "none", id: 7 },
        { name: "configs", id: 8 },
        { name: "none", id: 9 },
        { name: "options", id: 10 },
        { name: "color", id: 11 },
        { name: "white / white", id: 13 },
      ]
    },
    {
      id: 14,
      name: "Almond / Almond",
      type: "field",
      parentId: 11,
      childrenIds: [17]
      path: [
        { name: "windows", id: 1 },
        { name: "models", id: 2 },
        { name: "sl 2700", id: 3 },
        { name: "styles", id: 4 },
        { name: "double hung", id: 5 },
        { name: "types", id: 6 },
        { name: "none", id: 7 },
        { name: "configs", id: 8 },
        { name: "none", id: 9 },
        { name: "options", id: 10 },
        { name: "color", id: 11 },
        { name: "almond / almond", id: 14 },
      ]
    },
    {
      id: 15,
      name: "Cocoa / White",
      type: "field",
      parentId: 11,
      childrenIds: [18]
      path: [
        { name: "windows", id: 1 },
        { name: "models", id: 2 },
        { name: "sl 2700", id: 3 },
        { name: "styles", id: 4 },
        { name: "double hung", id: 5 },
        { name: "types", id: 6 },
        { name: "none", id: 7 },
        { name: "configs", id: 8 },
        { name: "none", id: 9 },
        { name: "options", id: 10 },
        { name: "color", id: 11 },
        { name: "cocoa / white", id: 15 },
      ]
    },
    {
      id: 16,
      name: "Grid Pattern",
      type: "field",
      parentId: 13,
      childrenIds: []
      path: [
        { name: "windows", id: 1 },
        { name: "models", id: 2 },
        { name: "sl 2700", id: 3 },
        { name: "styles", id: 4 },
        { name: "double hung", id: 5 },
        { name: "types", id: 6 },
        { name: "none", id: 7 },
        { name: "configs", id: 8 },
        { name: "none", id: 9 },
        { name: "options", id: 10 },
        { name: "color", id: 11 },
        { name: "white / white", id: 13 },
        { name: "grid pattern", id: 16 },
      ]
    },
    {
      id: 17,
      name: "Grid Pattern",
      type: "field",
      parentId: 14,
      childrenIds: []
      path: [
        { name: "windows", id: 1 },
        { name: "models", id: 2 },
        { name: "sl 2700", id: 3 },
        { name: "styles", id: 4 },
        { name: "double hung", id: 5 },
        { name: "types", id: 6 },
        { name: "none", id: 7 },
        { name: "configs", id: 8 },
        { name: "none", id: 9 },
        { name: "options", id: 10 },
        { name: "color", id: 11 },
        { name: "almond / almond", id: 14 },
        { name: "grid pattern", id: 17 },
      ]
    },
  ]
}

1. Form fields until options, will use the product config id as their value


options = {
  "color": "almond / almond",
  "grid pattern": "top sash only",
  "top sash only": "queen ann",
  "queen ann": "pewter",
}

windows.models.sl 2700.styles.double hung.types.none.configs.none.options.color.almond / almond.grid pattern.top sash only.queen ann.pewter
windows.models.sl 2700.styles.double hung.types.none.configs.none.options.color.almond / almond.grid pattern.top sash only.colonial.pewter


const reconcileSelectionTree  = (config, currentOptions) => {

}
```

```jsx

function ProductConfigurator({ product }) {
  const {
    steps,
    selections,
    optionsFor,
  } = useProductConfigurator(configs[product.id])

  const styles = optionsFor(selections.model)
  const types = optionsFor(selections.style)
  const configs = optionsFor(selections.type)
  const options = optionsFor(selections.config)

  return (
    ...
  )
}

// survey item is a question if it has choice ids to pick from
// survey item is an answer if it has a parent question id
// survey item is a subquestion if it has both, choice ids and parent question id

// {
//   "survey": {
//     "product": "Windows",
//     "steps": {
//       "model": {
//         "question": "Model",
//       },
//       "style": {
//         "question": "Style",
//         "dependsOn": "model"
//       },
//       "type": {
//         "question": "Type",
//         "dependsOn": "style"
//       },
//       "config": {
//         "question": "Config",
//         "dependsOn": "type"
//       },
//       "options": {
//         "question": "Options",
//         "type": "group",
//         "dependsOn": "config"
//       },
//     ]
//   }
// }

// Try use config name as value

{
  "selections": {
    "model": { ... },
    "style": { ... },
    "type": { ... },
    "config": { ... },
    "color": { name: "White / White" },
    "grid pattern": { name: "Colonial" },
    "colonial": { name: "Contour" }
  }
}

{
  "rootConfigId": 2,
  "configs": {
    "2": {
      "id": 2,
      "name": "Models",
      "optionLevel": "windows",
      "parentId": 1,l
      "childrenIds": [231, 232]
    },
    "3": {
      "id": 3,
      "name": "Styles",
      "optionLevel": "models",
      "parentId": 231,
      "childrenIds": [331, 332]
    },
    "4": {
      "id": 4,
      "name": "Types",
      "optionLevel": "styles",
      "parentId": 331,
      "childrenIds": [431]
    },
    "5": {
      "id": 5,
      "name": "Configs",
      "optionLevel": "types",
      "parentId": 431,
      "childrenIds": [531, 532]
    },
    "6": {
      "id": 6,
      "name": "Color",
      "optionLevel": "options",
      "parentId": 12345,
      "childrenIds": [631, 632, 633]
    },
    "7": {
      "id": 7,
      "name": "Grid Pattern",
      "optionLevel": "white / white",
      "parentId": 631,
      "childrenIds": [731, 732, 733],
    },
    "731": {
      "id": 731,
      "name": "Colonial",
      "optionLevel": "grid pattern",
      "parentId": 7,
      "childrenIds": [831, 832, 833],
    },
    "8": {
      "id": 8,
      "name": "White / White",
      "optionLevel": "color",
      "parentId": 6
    },
  }
}
```
