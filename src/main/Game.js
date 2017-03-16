const Player = require('./Player')

module.exports = class Game {
    constructor(print) {
        this.players = [
            new Player()
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
