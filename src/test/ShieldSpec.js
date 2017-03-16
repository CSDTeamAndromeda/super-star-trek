describe('Shield', () => {
    let Shield
    let shield

    beforeEach(() => {
        Shield = require('../main/subsystems/Shield')
        shield = new Shield()
    })

    it('Should repair shields', () => {
        shield.damageAmount = 3

        shield.repair()
        shield.damageAmount.should.equal(2)
        shield.isDamaged().should.be.true

        shield.repair()
        shield.damageAmount.should.equal(1)
        shield.isDamaged().should.be.true

        shield.repair()
        shield.damageAmount.should.equal(0)
        shield.isDamaged().should.be.false
    })
})
