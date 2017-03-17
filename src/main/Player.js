const _ = require('lodash')
const Shield = require('./subsystems/Shield')
const galaxy = require('./galaxy')

module.exports = class Player {
    constructor(input) {
        this.subsystems = {
            shield: new Shield()
        }

        this.input = input
        this.maxEnergy = 20000
        this.energy = this.maxEnergy
        this.isDocked = false
        this.skipTurns = 0
        this.currentQuadrant = galaxy.getQuadrantAt(0)
        this.currentSector = this.currentQuadrant.getSectorAt(0)
    }

    takeTurn() {
        if (this.skipTurns > 0) {
            this.skipTurns--
            this.rest()
            return
        }

        let command = this.input('Enter command: ')
        switch (command) {
            case 'raise': {
                this.raiseShield()
                break
            }
            case 'transfer': {
                let energyAmount = parseInt(this.input('Enter amount to transfer: '))
                this.transferShield(energyAmount)
                break
            }
            case 'dock': {
                this.dock()
                break
            }
            case 'rest': {
                this.skipTurns = parseInt(this.input('Enter amount of stardates: ')) * 10 - 1
                break
            }
            case 'warp': {
                let warp = this.input('Warp factor: ')
                let quadrant = this.input('Destination quadrant: ')
                let sector = this.input('Destination sector: ')
                this.warp(warp, quadrant, sector)
                break
            }
        }

        this.rest()
    }

    damage(damageAmount) {
        let shield = this.subsystems.shield

        if (shield.isActive && !shield.isDamaged()) {
            let damageToInflict = _.min([shield.energy, damageAmount])
            shield.energy -= damageToInflict
            damageAmount -= damageToInflict
        }

        if (damageAmount > 0) {
            let randomSubsystem = _.sample(this.subsystems)
            randomSubsystem.damageAmount++
        }
    }

    dock() {
        if (_.find(this.currentQuadrant.getAdjacentSectorsTo(this.currentSector), {hasStarbase: true})) {
            this.energy = this.maxEnergy
            this.isDocked = true
        }
    }

    raiseShield() {
        let shield = this.subsystems.shield
        if (!shield.isDamaged()) {
            shield.isActive = true
        }
    }

    transferShield(energyAmount) {
        let shield = this.subsystems.shield
        let energyToTransfer = _.min([shield.maxEnergy - shield.energy, energyAmount])
        shield.energy += energyToTransfer
        this.energy -= energyToTransfer
    }

    rest() {
        if (this.isDocked) {
            this.subsystems.shield.repair()
            this.subsystems.shield.repair()    
        }
        this.subsystems.shield.repair()
    }

    warp(factor, quadrant, sector) {
        factor
        quadrant
        sector
    }
}
