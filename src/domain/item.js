const assert = require('assert')

const ItemName = require('./item-name')
const ItemPrice = require('./item-price')

class Item {
  constructor ({ name, price, discount = () => 0 } = {}) {
    ItemName.assertType(name)
    this.name = name

    ItemPrice.assertType(price)
    this.price = price

    assert(typeof discount === 'function', 'applyDiscount must be a function')
    this.discount = discount
  }
}

module.exports = {  
  assertType (item) {
    assert(item instanceof Item)
  },
  
  create (arguments) {
    return Object.freeze(new Item(arguments))
  }
}
