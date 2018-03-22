const { expect } = require('chai')

const Item = require('../../src/domain/item')
const ItemName = require('../../src/domain/item-name')
const ItemPrice = require('../../src/domain/item-price')
const LineItem = require('../../src/domain/line-item')
const Quantity = require('../../src/domain/quantity')
const ShoppingBasket = require('../../src/domain/shopping-basket')

describe('ShoppingBasket', function () {
  describe('#new', function () {
    it('should create a new ShoppingBasket', function () {
      const shoppingBasket = ShoppingBasket.create()
      expect(shoppingBasket.items.length).to.equal(0)

      const total = ShoppingBasket.calculateTotal(shoppingBasket)
      expect(total).to.equal(0)
    })
  })

  describe('#addItem', function () {
    it('should add an Item', function () {
      const item = Item.create({ 
        name: ItemName.create('Banana'), 
        price: ItemPrice.create(0.15)
      })      
      const quantity = Quantity.create(2)
      const lineItem = LineItem.create({ item, quantity })
      let shoppingBasket
      shoppingBasket = ShoppingBasket.create()      
      shoppingBasket = ShoppingBasket.addItem(shoppingBasket, lineItem)

      expect(shoppingBasket.items.length).to.equal(1)

      const total = ShoppingBasket.calculateTotal(shoppingBasket)
      expect(total).to.equal(0.3)
    })

    it('should add the to the same Item', function () {
      const item = Item.create({ 
        name: ItemName.create('Banana'), 
        price: ItemPrice.create(0.15)
      })
      
      let lineItem, quantity, shoppingBasket

      shoppingBasket = ShoppingBasket.create()
      
      quantity = Quantity.create(5)
      lineItem = LineItem.create({ item, quantity })
      shoppingBasket = ShoppingBasket.addItem(shoppingBasket, lineItem)
      
      quantity = Quantity.create(2)
      lineItem = LineItem.create({ item, quantity })
      shoppingBasket = ShoppingBasket.addItem(shoppingBasket, lineItem)

      expect(shoppingBasket.items.length).to.equal(1)

      const total = ShoppingBasket.calculateTotal(shoppingBasket)
      expect(total).to.equal(1.05)
    })

    it('should consider discount items', function () {
      const item = Item.create({ 
        name: ItemName.create('Papaya'), 
        price: ItemPrice.create(0.50), 
        discount: (quantity) => {
          const multiplier = Math.floor(quantity.value / 3)
          return multiplier * 0.50
        } 
      })

      const quantity = Quantity.create(3)
      const lineItem = LineItem.create({ item, quantity })
      let shoppingBasket 

      shoppingBasket = ShoppingBasket.create()      
      shoppingBasket = ShoppingBasket.addItem(shoppingBasket, lineItem)

      expect(shoppingBasket.items.length).to.equal(1)

      const total = ShoppingBasket.calculateTotal(shoppingBasket)

      expect(total).to.equal(1)
    })
  })

  describe('#printReceipt', function () {
    const expectedReceipt = 'ITEM   QTY X PRICE TOTAL\nBanana 10  x 0.15  1.5  \nPapaya 5   x 0.5   2    \nTOTAL              3.5  '
    
    it('should print the receipt to console', function () {
      const banana = Item.create({ 
        name: ItemName.create('Banana'), 
        price: ItemPrice.create(0.15)
      })

      const quantity10 = Quantity.create(10)

      const papaya = Item.create({ 
        name: ItemName.create('Papaya'), 
        price: ItemPrice.create(0.50), 
        discount: (quantity) => {
          const multiplier = Math.floor(quantity.value / 3)
          return multiplier * 0.50
        } 
      })

      const quantity5 = Quantity.create(5)

      const bananas = LineItem.create({ item: banana, quantity: quantity10 })
      const papayas = LineItem.create({ item: papaya, quantity: quantity5 })
      
      let shoppingBasket

      shoppingBasket = ShoppingBasket.create()   
      shoppingBasket = ShoppingBasket.addItem(shoppingBasket, bananas)   
      shoppingBasket = ShoppingBasket.addItem(shoppingBasket, papayas)

      const receipt = ShoppingBasket.printReceipt(shoppingBasket)
      expect(receipt).to.equal(expectedReceipt)
    })
  })
})
