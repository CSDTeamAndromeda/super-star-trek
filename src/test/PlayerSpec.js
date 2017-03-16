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

        input.should.have.been.calledOnce
        shield.isActive.should.be.true
    })

    it('should take input and transfer shield', () => {
        player.energy = 2000
        shield.energy = 0
        input.withArgs('Enter command: ').returns('transfer')
        input.withArgs('Enter amount to transfer: ').returns('1000')

        player.takeTurn()

        input.should.have.been.calledTwice
        player.energy.should.equal(1000)
        shield.energy.should.equal(1000)
    })

    it('should take input and dock', () => {
        input.withArgs('Enter command: ').returns('dock')

        player.dock = sinon.stub()

        player.takeTurn()

        input.should.have.been.calledOnce
        player.dock.should.have.been.called
    })

    it('should damage a random subsystem', () => {
        let damageAmount = 9001
        shield.energy = 9000

        shield.isActive = true

        player.damage(damageAmount)

        
        _.some(player.subsystems, subsystem => subsystem.isDamaged()).should.be.true
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
        shield.damageAmount = 1

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

    it('should dock', () => {
        player.dock()

        player.energy.should.equal(player.maxEnergy)
        player.isDocked.should.be.true
    })

    it('should rest repair a damage subsystem', () => {
        shield = {} 
        shield.repair = sinon.stub()
        player.subsystems.shield = shield

        player.rest()

        shield.repair.should.have.been.called
    })

    it('should skip subsequent turns when resting', () => {
        input.withArgs('Enter command: ').returns('rest')
        input.withArgs('Enter amount of stardates: ').returns('1')

        player.rest = sinon.stub()

        // A turn is .1 stardates, so this passes 10 stardates
        player.takeTurn()
        player.takeTurn()
        player.takeTurn()
        player.takeTurn()
        player.takeTurn()
        player.takeTurn()
        player.takeTurn()
        player.takeTurn()
        player.takeTurn()
        player.takeTurn()

        input.should.have.been.calledTwice
        player.rest.should.have.callCount(10)

        // After we finish resting, the next call should prompt for input
        player.takeTurn()

        input.should.have.callCount(4)
    })

    it('should repair three times faster while docked', () => {
        shield.damageAmount = 3
        shield.repair = sinon.stub()
        player.isDocked = true

        player.rest()

        shield.repair.should.have.been.calledThrice
    })
})
