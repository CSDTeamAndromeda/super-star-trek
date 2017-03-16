const _ = require('lodash')
const Shields = require('./subsystems/Shields')

module.exports = class Player {
    constructor(input) {
        this.subsystems = {
            shields: new Shields()
        }

        this.input = input
        this.energy = 20000
    }

    takeTurn() {
        let command = this.input('Enter command: ')
        switch (command) {
            case 'raise': {
                this.raiseShields()
                break
            }
            case 'transfer': {
                let energyAmount = parseInt(this.input('Enter amount to transfer: '))
                this.transferShields(energyAmount)
                break
            }
        }
    }

    damage(damageAmount) {
        let shields = this.subsystems.shields

        if (shields.isActive && !shields.isDamaged) {
            let damageToInflict = _.min([shields.energy, damageAmount])
            shields.energy -= damageToInflict
            damageAmount -= damageToInflict
        }

        if (damageAmount > 0) {
            let randomSubsystem = _.sample(this.subsystems)
            randomSubsystem.isDamaged = true
        }
    }

    raiseShields() {
        let shields = this.subsystems.shields
        if (!shields.isDamaged) {
            shields.isActive = true
        }
    }

    transferShields(energyAmount) {
        let shields = this.subsystems.shields
        let energyToTransfer = _.min([shields.maxEnergy - shields.energy, energyAmount])
        shields.energy += energyToTransfer
        this.energy -= energyToTransfer
    }
}
