describe('galaxy', () => {
    let galaxy

    beforeEach(() => {
        galaxy = require('../main/galaxy')
    })

    it('should get quadrant at index', () => {
        let index = 0

        let quadrant = galaxy.getQuadrantAt(index)

        quadrant.should.deep.equal(galaxy.flattenedQuadrants[index])
    })
})
