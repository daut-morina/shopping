const assert = require('assert')

const Item = require('./item')
const Quantity = require('./quantity')

class LineItem {
  constructor ({ item, quantity }) {
    Item.assertType(item)
    this.item = item

    Quantity.assertType(quantity)
    this.quantity = quantity
  }
}

module.exports = {
  assertType (lineItem) {
    assert(lineItem instanceof LineItem)
  },

  add (lineItem, addedQuantity) {
    this.assertType(lineItem)
    Quantity.assertType(addedQuantity)

    const { item, quantity } = lineItem
    const newQuantity = Quantity.add(quantity, addedQuantity)
    
    return this.create({ item, quantity: newQuantity })
  },

  create (arguments) {
    return Object.freeze(new LineItem(arguments))
  },

  equals (lineItemA, lineItemB) {
    this.assertType(lineItemA)
    this.assertType(lineItemB)

    return lineItemA.item.name.value === lineItemB.item.name.value
  }
}
