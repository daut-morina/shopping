const assert = require('assert')

const { ItemName } = require('./item-name')
const { ItemPrice } = require('./item-price')

class Item {
  constructor ({ name, price, discount = () => 0 } = {}) {
    assert(name instanceof ItemName, 'Name must be an ItemName')
    this.name = name

    assert(price instanceof ItemPrice, 'Price must an ItemPrice')
    this.price = price

    assert(typeof discount === 'function', 'applyDiscount must be a function')
    this.discount = discount
  }
}

module.exports = {  
  Item,
  
  create (arguments) {
    return Object.freeze(new Item(arguments))
  }
}
