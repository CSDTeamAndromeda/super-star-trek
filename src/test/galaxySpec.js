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

    it('should setup a galaxy', () => {
        let secs = [
            {}, {}
        ]
        let quads = [
            {
                getEntities: sinon.stub().returns([]),
                flattenedSectors: secs
            }
        ]

        let setup = [
            {
                name: 'klingons',
                count: 1
            },
            {
                name: 'romulans',
                count: 0
            },
            {
                name: 'starbase',
                count: 1
            }
        ]

        _.shuffle = sinon.stub()
        _.shuffle.withArgs(galaxy.flattenedQuadrants).returns(quads)
        _.shuffle.withArgs(quads[0].flattenedSectors).returns(secs)
        _.sample = sinon.stub()
        _.sample.withArgs(setup).onCall(0).returns(setup[0])
        _.sample.withArgs(setup).onCall(1).returns(setup[2])

        galaxy.setupGalaxy(setup)
        setup[0].count.should.equal(0)
        setup[2].count.should.equal(0)
        secs[0].entity.should.equal(setup[0].name)
        secs[1].entity.should.equal(setup[2].name)
        _.shuffle.reset()
        _.sample.reset()
    })
})
