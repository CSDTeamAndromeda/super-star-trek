describe('Game', () => {

    let Game

    let input
    let game
    let print

    beforeEach(() => {
        print = sinon.stub()
        input = sinon.stub()

        Game = require('../main/Game')
        game = new Game(print, input)
    })

    it('should initialize', () => {
        game.input.should.exist
        game.players.should.exist
        game.players.should.not.be.empty
        game.print.should.exist
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
