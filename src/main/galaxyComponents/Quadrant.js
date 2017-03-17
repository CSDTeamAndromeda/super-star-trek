const _ = require('lodash')
const Sector = require('./Sector')

module.exports = class Quadrant {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.sectors = _.map(_.range(10), col => _.map(_.range(10), row => new Sector(col, row)))

        this.flattenedSectors = _.flatten(this.sectors)
    }

    getSectorAt(index) {
        return this.flattenedSectors[index]
    }

    getAdjacentSectorsTo(sector) {
        let x = sector.x
        let y = sector.y

        let topLeft     = this.sectors[x - 1] && this.sectors[x - 1][y - 1]
        let top         = this.sectors[x] && this.sectors[x][y - 1]
        let topRight    = this.sectors[x + 1] && this.sectors[x + 1][y - 1]

        let left        = this.sectors[x - 1] && this.sectors[x - 1][y]
        let right       = this.sectors[x + 1] && this.sectors[x + 1][y]

        let bottomLeft  = this.sectors[x - 1] && this.sectors[x - 1][y + 1]
        let bottom      = this.sectors[x] && this.sectors[x][y + 1]
        let bottomRight = this.sectors[x + 1] && this.sectors[x + 1][y + 1]

        return [topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight]
    }

    getEntities() {
        return _.filter(_.map(this.flattenedSectors, 'entity'))
    }

    getAllEntitiesCount() {
        return _.countBy(this.getEntities())
    }
}
