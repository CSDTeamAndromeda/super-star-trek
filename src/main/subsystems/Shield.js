const Subsystem = require('../Subsystem')

module.exports = class Shields extends Subsystem {
    constructor() {
        super()
        this.isActive = false
        this.minEnergy = 0
        this.maxEnergy = 10000
        this.energy = this.minEnergy
    }

    repair() {
        if (this.damageAmount > 0) {
            this.damageAmount -= .1
        }
        this.damageAmount = Math.max(this.damageAmount, 0)
    }
}
