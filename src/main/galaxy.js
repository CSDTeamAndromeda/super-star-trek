const _ = require('lodash')
const Quadrant = require('./galaxyComponents/Quadrant')

class Galaxy {
    constructor() {
        this.quadrants = _.map(_.range(8), col => _.map(_.range(8), row => new Quadrant(col, row)))

        this.flattenedQuadrants = _.flatten(this.quadrants)
    }

    setupGalaxy(entities) {
        let quads = _.shuffle(this.flattenedQuadrants)
        _.forEach(quads, quad => {
            let secs = _.shuffle(quad.flattenedSectors)
            _.forEach(secs, sec => {
                if (quad.getEntities().length < 10) {
                    let entity = _.sample(entities)
                    if (entity.count > 0) {
                        sec.entity = entity.name
                        entity.count--
                    }
                }
                return true
            })
        })
    }

    getQuadrantAt(index) {
        return this.flattenedQuadrants[index]
    }
}

module.exports = new Galaxy()
