const { expect } = require('chai')

const ItemName = require('../../src/domain/item-name')

describe('ItemName', function () {
  describe('#create', function () {
    const valid = [
      'Apple',
      'Banana',
      'Orange',
      'Papaya'
    ]

    const invalid = [
      undefined,
      null,
      '',
      0
    ]

    it('should accept valid Item Names', function () {
      valid.map((value) => {
        const itemName = ItemName.create(value)
        expect(itemName.value).to.equal(value)
      })
    })

    it('should not accept invalid Item Names', function () {
      invalid.map((value) => {
        expect(() => ItemName.create(value)).to.throw(Error, 'ItemName')
      })
    })
  })
})
