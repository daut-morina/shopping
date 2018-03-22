const assert = require('assert')

class ItemName {
  constructor (itemName) {
    assert(itemName, 'ItemName must not be undefined, null nor empty')
    assert(typeof itemName === 'string', 'ItemName must be a string')

    this.value = itemName
  }
}

module.exports = {  
  assertType (itemName) {
    assert(itemName instanceof ItemName)
  },

  create (value) {
    return Object.freeze(new ItemName(value))
  }
}
