const _ = require('lodash')
const Player = require('./Player')
const galaxy = require('./galaxy')

module.exports = class Game {
    constructor(print, input) {
        this.input = input
        this.players = [
            new Player(input)
        ]
        this.print = print
        this.currentGalaxy = galaxy
        this.stardates = _.random(50, 70)
    }

    start() {
        this.print('Welcome')
        let entities = [
            {
                name: 'klingons',
                count: _.random(1, 20)
            },
            {
                name: 'romulans',
                count: _.random(1, 5)
            },
            {
                name: 'starbase',
                count: _.random(1, 5)
            }
        ]
        this.currentGalaxy.setupGalaxy(entities)
        while (this.stardates > 0) {
            this.players.forEach(player => {
                player.takeTurn()
            })

            this.stardates--
        }
    }
}
