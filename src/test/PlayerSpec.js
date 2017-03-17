describe('Player', () => {
    let Player

    let input
    let player
    let shield

    beforeEach(() => {
        input = sinon.stub()

        Player = require('../main/Player')
        player = new Player(input)

        shield = {
            damageAmount: 0,
            isDamaged: sinon.stub(),
            raise: sinon.stub(),
            lower: sinon.stub(),
            takeEnergy: sinon.stub(),
            addEnergyAndReturnExtra: sinon.stub(),
            absorbAttackAndReturnDamage: sinon.stub(),
            repair: sinon.stub()
        }
        player.subsystems = { shield }
    })

    it('should take input and raise shield', () => {
        input.withArgs('Enter command: ').returns('raise')

        player.takeTurn()

        input.should.have.been.calledOnce
        shield.raise.should.have.been.called
    })

    it('should take input and lower shield', () => {
        input.withArgs('Enter command: ').returns('lower')

        player.takeTurn()

        input.should.have.been.calledOnce
        shield.lower.should.have.been.called
    })

    describe('transfer command', () => {
        it('should transfer player energy to shield', () => {
            player.energy = 2000
            input.withArgs('Enter command: ').returns('transfer')
            input.withArgs('Enter amount to transfer: ').returns('1000')
            shield.addEnergyAndReturnExtra.withArgs(1000).returns(500)

            player.takeTurn()

            input.should.have.been.calledTwice
            player.energy.should.equal(1500)
        })

        it('should transfer shield energy to player', () => {
            player.energy = 0
            input.withArgs('Enter command: ').returns('transfer')
            input.withArgs('Enter amount to transfer: ').returns('-1000')
            shield.takeEnergy.returns(500)

            player.takeTurn()

            input.should.have.been.calledTwice
            player.energy.should.equal(500)
            shield.takeEnergy.should.have.been.calledWith(1000)
        })
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
        shield.absorbAttackAndReturnDamage.returns(1)

        player.damage(damageAmount)

        shield.absorbAttackAndReturnDamage(9001)
        _.some(player.subsystems, subsystem => subsystem.damageAmount > 0).should.be.true
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

    describe('transfer command', () => {
        it('should only transfer enough energy to max out shield', () => {
            player.energy = 3000
            shield.addEnergyAndReturnExtra.returns(1000)

            player.transferEnergyToShield(3000)

            player.energy.should.equal(1000)
        })

        it('should transfer an exact amount of energy to shield', () => {
            player.energy = 1000
            shield.addEnergyAndReturnExtra.returns(0)

            player.transferEnergyToShield(1000)

            player.energy.should.equal(0)
        })

        it('should transfer energy from shield to player', () => {
            player.energy = 1000
            shield.takeEnergy.withArgs(200).returns(100)

            player.transferEnergyFromShield(200)

            player.energy.should.equal(1100)
        })
    })

    it('should dock at an adjacent starbase', () => {
        player.currentQuadrant = {
            getAdjacentSectorsTo: sinon.stub().returns([
                {
                    hasStarbase: true
                }
            ])
        }

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

    it('should take input and warp', () => {
        input.withArgs('Enter command: ').returns('warp')
        input.withArgs('Warp factor: ').returns('1')
        input.withArgs('Destination quadrant: ').returns('2')
        input.withArgs('Destination sector: ').returns('3')

        player.warp = sinon.stub()

        player.takeTurn()

        player.warp.should.have.been.calledWith('1', '2', '3')
        input.should.have.callCount(4)
    })

    it('should not dock if there is no adjacent starbase', () => {
        player.dock()

        player.energy.should.equal(player.energy)
        player.isDocked.should.be.false
    })
})
