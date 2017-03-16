describe('Player', () => {
    let Player

    let input
    let player
    let shields

    beforeEach(() => {
        input = sinon.stub()

        Player = require('../main/Player')
        player = new Player(input)

        shields = player.subsystems.shields
    })

    it('should take input and raise shields', () => {
        input.withArgs('Enter command: ').returns('raise')

        player.takeTurn()

        input.should.have.been.called.once
        shields.isActive = true
    })

    it('should take input and transfer shields', () => {
        player.energy = 2000
        shields.energy = 0
        input.withArgs('Enter command: ').returns('transfer')
        input.withArgs('Enter amount to transfer: ').returns('1000')

        player.takeTurn()

        input.should.have.been.called.twice
        player.energy.should.equal(1000)
        shields.energy.should.equal(1000)
    })

    it('should damage a random subsystem', () => {
        let damageAmount = 9001
        shields.energy = 9000

        shields.isActive = true

        player.damage(damageAmount)

        _.some(player.subsystems, {isDamaged: true}).should.be.true
    })

    it('should damage shields but not deplete them', () => {
        let damageAmount = 9000
        shields.energy = 9001

        shields.isActive = true

        player.damage(damageAmount)

        _.some(player.subsystems, {isDamaged: true}).should.be.false
    })

    it('should deplete shields without damaging subsystems', () => {
        let damageAmount = 9000
        shields.energy = 9000

        shields.isActive = true

        player.damage(damageAmount)

        _.some(player.subsystems, {isDamaged: true}).should.be.false
    })

    it('should raise shields if they are not damaged', () => {
        player.raiseShields()

        shields.isActive.should.be.true
    })

    it('should not raise shields if they are damaged', () => {
        shields.isDamaged = true

        player.raiseShields()

        shields.isActive.should.be.false
    })

    it('should only transfer enough energy to max out shields', () => {
        player.energy = 3000
        shields.energy = 8000

        player.transferShields(3000)

        player.energy.should.equal(1000)
        shields.energy.should.equal(10000)
    })

    it('should transfer an exact amount of energy', () => {
        player.energy = 1000

        player.transferShields(1000)

        player.energy.should.equal(0)
        shields.energy.should.equal(1000)
    })
})
