const _ = require('lodash')
const Quadrant = require('./galaxyComponents/Quadrant')

class Galaxy {
    constructor() {
        this.quadrants = _.map(_.range(8), col => _.map(_.range(8), row => new Quadrant(col, row)))

        this.flattenedQuadrants = _.flatten(this.quadrants)
    }

    getQuadrantAt(index) {
        return this.flattenedQuadrants[index]
    }
}

module.exports = new Galaxy()
