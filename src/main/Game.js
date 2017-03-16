const Player = require('./Player')

module.exports = class Game {
    constructor(print, input) {
        this.input = input
        this.players = [
            new Player(input)
        ]
        this.print = print
    }

    start() {
        this.print('Welcome')
        // while (condition) {
        this.players.forEach(player => {
            player.takeTurn()
        })
        // }
    }
}
