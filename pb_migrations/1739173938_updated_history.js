/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3068727201")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select1204651003",
    "maxSelect": 1,
    "name": "priority",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "High",
      "Medium",
      "Low"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3068727201")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select1204651003",
    "maxSelect": 1,
    "name": "priotity",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "high",
      "medium",
      "low"
    ]
  }))

  return app.save(collection)
})
