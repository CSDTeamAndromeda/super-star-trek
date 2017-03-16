module.exports = class Subsystem {
    constructor() {
        this.damageAmount = 0
    }

    isDamaged() {
        return this.damageAmount > 0
    }
}
