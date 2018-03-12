const assert = require('assert')

class ItemPrice {
  constructor(price) {
    assert(typeof price !== 'undefined', 'ItemPrice must not be undefined')
    assert(price !== null, 'ItemPrice must not be null')
    assert(typeof price === 'number', 'ItemPrice must be numeric')
    assert(price >= 0, 'ItemPrice must be positive')

    this._price = Math.floor(price * 100)
  }

  get value () {
    return this._price / 100
  }
}

module.exports = {
  ItemPrice,
  
  create (arguments) {
    return Object.freeze(new ItemPrice(arguments))
  }
}
