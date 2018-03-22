const { expect } = require('chai')

const { Quantity } = require('../../src/domain')

describe('Quantity', function () {
  describe('#create', function () {
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

  describe('#add', function () {
    it('should raise the quantity', function () {
      let quantityA, quantityB, quantityC

      quantityA = Quantity.create(1)
      quantityB = Quantity.create(2)
      quantityC = Quantity.add(quantityA, quantityB)

      expect(quantityC.value).to.equal(3)
    })
  })
})
