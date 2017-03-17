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

    describe('raising and lowering shields', () => {
        it('should raise shields', () => {
            shield.isActive = false
            shield.energy = 1

            shield.raise()

            shield.isActive.should.be.true
        })

        it('should not raise shields without energy', () => {
            shield.isActive = false
            shield.energy = 0

            shield.raise()

            shield.isActive.should.be.false
        })

        it('should lower shields', () => {
            shield.isActive = true

            shield.lower()

            shield.isActive.should.be.false
        })
    })

    it('should lower shields when transferring all energy from shields to ship', () => {
        shield.isActive = true
        shield.energy = 500

        let took = shield.takeEnergy(1000)

        shield.isActive.should.be.false
        shield.energy.should.equal(0)
        took.should.equal(500)
    })

    it('should add energy', () => {
        shield.energy = 500
        shield.maxEnergy = 2000

        let remaining = shield.addEnergyAndReturnExtra(1000)

        shield.energy.should.equal(1500)
        remaining.should.equal(0)
    })

    it('should not add energy past max', () => {
        shield.energy = 500
        shield.maxEnergy = 600

        let remaining = shield.addEnergyAndReturnExtra(1000)

        shield.energy.should.equal(600)
        remaining.should.equal(900)
    })

    describe('absorb attack and deal damage', () => {
        it('should absorb all damage', () => {
            shield.isActive = true
            shield.energy = 250

            let damage = shield.absorbAttackAndReturnDamage(50)

            shield.isActive.should.be.true
            shield.energy.should.equal(200)
            damage.should.equal(0)
        })

        it('should lower shields and return damage when damage consumes all energy', () => {
            shield.isActive = true
            shield.energy = 250

            let damage = shield.absorbAttackAndReturnDamage(750)

            shield.isActive.should.be.false
            shield.energy.should.be.zero
            damage.should.equal(500)
        })

        it('should return damage when shields lowered', () => {
            shield.isActive = false
            shield.energy = 250

            let damage = shield.absorbAttackAndReturnDamage(750)

            damage.should.equal(750)
            shield.energy.should.equal(250)
        })
    })
})
