const assert = require('assert')

class ItemName {
  constructor (itemName) {
    assert(itemName, 'ItemName must not be undefined, null nor empty')
    assert(typeof itemName === 'string', 'ItemName must be a string')

    this.value = itemName
  }
}

module.exports = {
  ItemName,
  
  create (arguments) {
    return Object.freeze(new ItemName(arguments))
  }
}
