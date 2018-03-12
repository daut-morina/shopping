const ItemName = require('../domain/item-name')
const ItemPrice = require('../domain/item-price')
const Item = require('../domain/item')
const Quantity = require('../domain/quantity')
const ShoppingBasket = require('../domain/shopping-basket')

const items = [{
  name: 'Apple',
  price: 0.25
}, {
  name: 'Banana',
  price: 0.15
}, {
  name: 'Orange',
  price: 0.30
}, {
  name: 'Papaya',
  price: 0.50,
  discount (quantity) {
    const multiplier = Math.floor(quantity.value / 3)
    return multiplier * this.price.value
  }
}]

module.exports = {
  addItemToBasket (shoppingBasket, item, quantity) {
    if (!shoppingBasket) shoppingBasket = ShoppingBasket.create()
    quantity = Quantity.create(quantity)
    return ShoppingBasket.addItem(shoppingBasket, { item, quantity })
  },

  findItemByName (name) {
    const data = items.find((item) => name === item.name)

    if (!data) throw new Error(`There is no Item '${name}'`)

    return Item.create({
      name: ItemName.create(data.name),
      price: ItemPrice.create(data.price),
      discount: data.discount
    })
  },

  pay (shoppingBasket) {
    console.log(ShoppingBasket.printReceipt(shoppingBasket))
  }
}
