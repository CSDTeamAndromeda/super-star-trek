const Subsystem = require('../Subsystem')

module.exports = class Shield extends Subsystem {
    constructor() {
        super()
        this.isActive = false
        this.minEnergy = 0
        this.maxEnergy = 10000
        this.energy = this.minEnergy
    }

    raise() {
        this.isActive = this.energy > 0 && !this.isDamaged()
    }

    lower() {
        this.isActive = false
    }

    takeEnergy(energy) {
        let taken = Math.min(this.energy, energy)
        this.energy -= taken
        if (this.energy === 0) {
            this.lower()
        }
        return taken
    }

    addEnergyAndReturnExtra(energy) {
        let initialEnergy = this.energy
        this.energy = Math.min(this.maxEnergy, this.energy + energy)
        return energy - this.energy + initialEnergy
    }

    absorbAttackAndReturnDamage(attackEnergy) {
        if (this.isActive) {
            let taken = this.takeEnergy(attackEnergy)
            return taken < attackEnergy ? attackEnergy - taken : 0
        }
        return attackEnergy
    }

    repair() {
        this.damageAmount = Math.max(this.damageAmount - .1, 0)
    }
}
