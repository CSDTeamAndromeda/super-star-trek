describe('Player', () => {
    let Player

    let input
    let player
    let shield

    beforeEach(() => {
        input = sinon.stub()

        Player = require('../main/Player')
        player = new Player(input)

        shield = player.subsystems.shield
    })

    it('should take input and raise shield', () => {
        input.withArgs('Enter command: ').returns('raise')

        player.takeTurn()

        input.should.have.been.called.once
        shield.isActive.should.be.true
    })

    it('should take input and transfer shield', () => {
        player.energy = 2000
        shield.energy = 0
        input.withArgs('Enter command: ').returns('transfer')
        input.withArgs('Enter amount to transfer: ').returns('1000')

        player.takeTurn()

        input.should.have.been.called.twice
        player.energy.should.equal(1000)
        shield.energy.should.equal(1000)
    })

    it('should damage a random subsystem', () => {
        let damageAmount = 9001
        shield.energy = 9000

        shield.isActive = true

        player.damage(damageAmount)

        _.some(player.subsystems, {isDamaged: true}).should.be.true
    })

    it('should damage shield but not deplete them', () => {
        let damageAmount = 9000
        shield.energy = 9001

        shield.isActive = true

        player.damage(damageAmount)

        _.some(player.subsystems, {isDamaged: true}).should.be.false
    })

    it('should deplete shield without damaging subsystems', () => {
        let damageAmount = 9000
        shield.energy = 9000

        shield.isActive = true

        player.damage(damageAmount)

        _.some(player.subsystems, {isDamaged: true}).should.be.false
    })

    it('should raise shield if they are not damaged', () => {
        player.raiseShield()

        shield.isActive.should.be.true
    })

    it('should not raise shield if they are damaged', () => {
        shield.isDamaged = true

        player.raiseShield()

        shield.isActive.should.be.false
    })

    it('should only transfer enough energy to max out shield', () => {
        player.energy = 3000
        shield.energy = 8000

        player.transferShield(3000)

        player.energy.should.equal(1000)
        shield.energy.should.equal(10000)
    })

    it('should transfer an exact amount of energy', () => {
        player.energy = 1000

        player.transferShield(1000)

        player.energy.should.equal(0)
        shield.energy.should.equal(1000)
    })
})
