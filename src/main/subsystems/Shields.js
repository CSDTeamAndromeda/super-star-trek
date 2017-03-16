const Subsystem = require('../Subsystem')

module.exports = class Shields extends Subsystem {
    constructor() {
        super()
        this.isActive = false
        this.minEnergy = 0
        this.maxEnergy = 10000
        this.energy = this.minEnergy
    }
}