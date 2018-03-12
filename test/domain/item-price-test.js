const { expect } = require('chai')

const ItemPrice = require('../../src/domain/item-price')

describe('ItemPrice', function () {
  describe('#new', function () {
    const valid = [
      0.25,
      0.30,
      0.15,
      0.50
    ]

    const invalid = [
      undefined,
      null,
      '0.25',
      -1
    ]

    it('should accept valid Item Prices', function () {
      valid.map((value) => {
        const itemPrice = ItemPrice.create(value)
        expect(itemPrice.value).to.equal(value)
      })
    })

    it('should not accept invalid Item Prices', function () {
      invalid.map((value) => {
        expect(() => ItemPrice.create(value)).to.throw(Error, 'ItemPrice')
      })
    })

    it('should keep prices', function () {
      const value = 0.2345
      const itemPrice = ItemPrice.create(value)
      expect(itemPrice.value).to.equal(0.23)
    })
  })
})
