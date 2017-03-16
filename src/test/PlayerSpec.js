describe('Player', () => {
    let Player

    let player
    let shields

    beforeEach(() => {
        Player = require('../main/Player')

        player = new Player()

        shields = player.subsystems.shields
    })

    it('should raise shields', () => {
        shields.isActive = false

        player.raiseShields()

        shields.isActive.should.be.true
    })

    it('should transfer energy to shields', () => {

        player.energy = 3000
        shields.energy = 8000

        player.transferShields(3000)

        player.energy.should.equal(1000)
        shields.energy.should.equal(10000)
    })
})