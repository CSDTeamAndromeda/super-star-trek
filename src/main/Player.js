const _ = require('lodash')
const Shields = require('./subsystems/Shields')

module.exports = class Player {
    constructor() {
        this.subsystems = {
            shields: new Shields()
        }

        this.energy = 20000
    }

    damage(damageAmount) {
        let shields = this.subsystems.shields

        if (shields.isActive && !shields.isDamaged) {
            let damageToInflict = _.min([shields.maxEnergy - shields.energy, damageAmount])
            if (damageAmount > shields.energy) {

            }
            shields.energy -= damageToInflict
        }

        let randomSubsystem = _.sample(this.subsystems)
        randomSubsystem.isDamaged = true
    }

    raiseShields() {
        this.subsystems.shields.isActive = true
    }

    transferShields(energyAmount) {
        let shields = this.subsystems.shields
        let energyToTransfer = _.min([shields.maxEnergy - shields.energy, energyAmount])
        shields.energy += energyToTransfer
        this.energy -= energyToTransfer
    }
}