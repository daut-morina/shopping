const assert = require('assert')
const { format } = require('util')

const columnify = require('columnify')

const Item = require('./item')
const LineItem = require('./line-item')
const Quantity = require('./quantity')

class ShoppingBasket {
  constructor ({ items = [] } = {}) {
    this._items = items
  }

  get items () {
    return this._items.slice()
  }
}

module.exports = {
  assertType (shoppingBasket) {
    assert(shoppingBasket instanceof ShoppingBasket)
  },

  addItem (shoppingBasket, lineItem) {
    this.assertType(shoppingBasket)
    LineItem.assertType(lineItem)

    let { items } = shoppingBasket
    const lineItemInBasket = items.find((lineItemInBasket) => LineItem.equals(lineItemInBasket, lineItem))

    if (!lineItemInBasket) {
      items.push(lineItem)
    } else {
      items = items.map((lineItemInBasket) => {
        if (LineItem.equals(lineItemInBasket, lineItem)) {
          return LineItem.add(lineItemInBasket, lineItem.quantity) 
        }

        return lineItemInBasket
      })
    }

    return new ShoppingBasket({ items }) 
  },

  calculateTotal (shoppingBasket) {
    assert(shoppingBasket instanceof ShoppingBasket)

    const { items } = shoppingBasket

    return items.reduce((previous, current) => {
      const { item, quantity } = current
      const { price } = item

      return previous + quantity.value * price.value - item.discount(quantity)
    }, 0)
  },

  create () {
    return Object.freeze(new ShoppingBasket())
  }, 

  printReceipt (shoppingBasket) {
    assert(shoppingBasket instanceof ShoppingBasket)

    const { items } = shoppingBasket

    const receipt = items.map((current) => {
      const { item, quantity } = current
      const { name, price } = item

      return {
        item: name.value,
        qty: quantity.value,
        x: 'x',
        price: price.value,
        total: quantity.value * price.value - item.discount(quantity)
      }
    })

    receipt.push({
      item: 'TOTAL',
      total: receipt.reduce((previous, current) => previous + current.total, 0)
    })

    return columnify(receipt)
  }
}
