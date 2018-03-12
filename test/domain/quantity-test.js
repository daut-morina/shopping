const { expect } = require('chai')

const Quantity = require('../../src/domain/quantity')

describe('Quantity', function () {
  describe('#new', function () {
    const valid = [
      5
    ]

    const invalid = [
      null,
      0,
      -1
    ]

    it('should accept valid Quantities', function () {
      valid.map((value) => {
        const quantity = Quantity.create(value)
        expect(quantity.value).to.equal(value)
      })
    })

    it('should not accept invalid Quantities', function () {
      invalid.map((value) => {
        expect(() => Quantity.create(value)).to.throw(Error, 'Quantity')
      })
    })

    it('should set a default of 1 when Quantity is undefined', function () {
      const quantity = Quantity.create()
      expect(quantity.value).to.equal(1)
    })

    it('should floor Quantity when it is decimal', function () {
      const value = 4.23
      const quantity = Quantity.create(value)
      expect(quantity.value).to.equal(4)
    })
  })
})
