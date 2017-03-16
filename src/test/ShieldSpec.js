describe('Shield', () => {
    let Shield
    let shield

    beforeEach(() => {
        Shield = require('../main/subsystems/Shield')
        shield = new Shield()
    })

    it('Should repair shields', () => {
        shield.damageAmount = .3

        shield.repair()
        shield.damageAmount.should.be.closeTo(.2, .0001)
        shield.isDamaged().should.be.true

        shield.repair()
        shield.damageAmount.should.be.closeTo(.1, .0001)
        shield.isDamaged().should.be.true

        shield.repair()
        shield.damageAmount.should.be.closeTo(0, .0001)
        shield.isDamaged().should.be.false
    })
})
