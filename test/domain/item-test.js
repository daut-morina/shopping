const { expect } = require('chai')

const Item = require('../../src/domain/item')
const ItemName = require('../../src/domain/item-name')
const ItemPrice = require('../../src/domain/item-price')

describe('Item', function () {
  describe('new', function () {

    const valid = [{
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
        const multiplier = Math.floor(quantity / 3)
        return multiplier * this.price
      }
    }].map((item) => {      
      const itemName = ItemName.create(item.name)
      const itemPrice = ItemPrice.create(item.price)
  
      return { name: itemName, price: itemPrice, discount: item.discount }
    })

    it('should create a valid Item', function () {
      valid.map(({ name, price, discount }) => {
        const item = Item.create({ name, price, discount })
        expect(item.name).to.equal(name)
        expect(item.price).to.equal(price)
        expect(item.discount).to.be.a('Function')
      })
    })
  })
}) 
