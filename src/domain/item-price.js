const assert = require('assert')

class ItemPrice {
  constructor(itemPrice) {
    assert(typeof itemPrice !== 'undefined', 'ItemPrice must not be undefined')
    assert(itemPrice !== null, 'ItemPrice must not be null')
    assert(typeof itemPrice === 'number', 'ItemPrice must be numeric')
    assert(itemPrice >= 0, 'ItemPrice must be positive')

    this._price = Math.floor(itemPrice * 100)
  }

  get value () {
    return this._price / 100
  }
}

module.exports = {
  assertType (itemPrice) {
    assert(itemPrice instanceof ItemPrice)
  },
  
  create (arguments) {
    return Object.freeze(new ItemPrice(arguments))
  }
}
