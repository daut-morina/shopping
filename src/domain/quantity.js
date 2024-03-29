const assert = require('assert')

class Quantity {
  constructor (quantity = 1) {
    // TODO: What about upper boundaries?
    assert(quantity, 'Quantity must not be undefined, null or 0')
    assert(quantity >= 1, 'Quantity must be a positive value')

    this._quantity = Math.floor(quantity)
  }

  get value () {
    return this._quantity
  }
}

module.exports = {  
  assertType (quantity) {
    assert(quantity instanceof Quantity)
  },

  add (quantityA, quantityB) {
    this.assertType(quantityA)
    this.assertType(quantityB)

    const newValue = quantityA.value + quantityB.value

    return this.create(newValue)
  },
  
  create (arguments) {
    return Object.freeze(new Quantity(arguments))
  }
}
