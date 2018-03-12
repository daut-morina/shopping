const assert = require('assert')
const { format } = require('util')

const columnify = require('columnify')

const { Item } = require('./item')
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
  addItem (shoppingBasket, { item, quantity } = {}) {
    assert(shoppingBasket instanceof ShoppingBasket, 'shoppingBasket must be ShoppingBasket')
    assert(item instanceof Item, `${item} must be an Item`)
    assert(quantity instanceof Quantity.Quantity)

    let { items } = shoppingBasket
    const itemInBasket = items.find((itemInBasket) => itemInBasket.item.name.value === item.name.value)
    if (!itemInBasket) {
      items.push({ item, quantity })
    } else {
      items = items.map((itemInBasket) => {
        if (itemInBasket.item.name.value === item.name.value) {
          return { item, quantity: Quantity.create(itemInBasket.quantity.value + quantity.value) }
        }

        return itemInBasket
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
    return new ShoppingBasket()
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
