const { expect } = require('chai')

const { ItemName, ItemPrice, Item, LineItem, Quantity } = require('../../src/domain')

describe('LineItem', function () {
  describe('#create', function () {
    it('should create valid LineItem', function () {
      const item = Item.create({
        name: ItemName.create('Banana'),
        price: ItemPrice.create(0.15)
      })
      const quantity = Quantity.create(2)
      const lineItem = LineItem.create({ item, quantity })

      expect(lineItem.item).to.equal(item)
      expect(lineItem.quantity).to.equal(quantity)
    })
  })

  describe('#add', function () {
    it('should raise quantity of the LineItem', function () {
      const item = Item.create({
        name: ItemName.create('Banana'),
        price: ItemPrice.create(0.15)
      })
      const quantity = Quantity.create(2)
      
      let lineItem
      lineItem = LineItem.create({ item, quantity })
      lineItem = LineItem.add(lineItem, quantity)

      expect(lineItem.quantity.value).to.equal(4)
    })
  })

  describe('#equals', function () {
    it('should compare lineItems', function () {
      const item = Item.create({
        name: ItemName.create('Banana'),
        price: ItemPrice.create(0.15)
      })
      const quantity = Quantity.create(2)
      
      let lineItemA, lineItemB
      lineItemA = LineItem.create({ item, quantity })
      lineItemB = LineItem.create({ item, quantity })

      expect(LineItem.equals(lineItemA, lineItemB)).to.be.true
    })
  })
})
