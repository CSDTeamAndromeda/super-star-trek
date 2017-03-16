const Player = require('./Player')

module.exports = class Game {
    constructor(print, input) {
        this.input = input
        this.players = [
            new Player(input)
        ]
        this.print = print
        this.stardates = 30
    }

    start() {
        this.print('Welcome')
        while (this.stardates > 0) {
            this.players.forEach(player => {
                player.takeTurn()
            })

            this.stardates--
        }
    }
}
