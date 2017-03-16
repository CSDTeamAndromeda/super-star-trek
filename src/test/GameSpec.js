describe('Game', () => {

    let Game = require('../main/Game')

    let game
    let players
    let print

    beforeEach(() => {
        print = sinon.stub()
        game = new Game(print, players)
    })

    it('should initialize', () => {
        game.players.should.exist
        game.players.should.not.be.empty
    })

    it('should process turns for each player', () => {
        game.players = [{
            takeTurn: sinon.stub()
        }]

        game.start()

        print.should.have.been.calledWith('Welcome')
        game.players[0].takeTurn.should.have.been.called
    })

})