describe('Quadrant', () => {
    let Quadrant
    let quadrant

    beforeEach(() => {
        Quadrant = require('../../main/galaxyComponents/Quadrant')

        quadrant = new Quadrant(0, 0)
    })

    it('should get sector at index', () => {
        let index = 0
        let sector = quadrant.getSectorAt(index)

        sector.should.deep.equal(quadrant.flattenedSectors[index])
    })

    it('should get adjacent sectors to given sector', () => {
        let sector = {
            x: 4,
            y: 4
        }

        let x = sector.x
        let y = sector.y

        let topLeft     = quadrant.sectors[x - 1] && quadrant.sectors[x - 1][y - 1]
        let top         = quadrant.sectors[x] && quadrant.sectors[x][y - 1]
        let topRight    = quadrant.sectors[x + 1] && quadrant.sectors[x + 1][y - 1]

        let left        = quadrant.sectors[x - 1] && quadrant.sectors[x - 1][y]
        let right       = quadrant.sectors[x + 1] && quadrant.sectors[x + 1][y]

        let bottomLeft  = quadrant.sectors[x - 1] && quadrant.sectors[x - 1][y + 1]
        let bottom      = quadrant.sectors[x] && quadrant.sectors[x][y + 1]
        let bottomRight = quadrant.sectors[x + 1] && quadrant.sectors[x + 1][y + 1]

        let adjacentSectors = quadrant.getAdjacentSectorsTo(sector)

        adjacentSectors.should.deep.equal([topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight])
    })

    it('should get entities', () => {
        let sectors = [
            {
                entity: 'starbase'
            },
            {
                entity: 'klingon'
            }
        ]
        quadrant.flattenedSectors = sectors

        quadrant.getEntities().should.deep.equal(['starbase', 'klingon'])
    })

    it('should get all entities count', () => {
        let sectors = [
            {
                entity: 'starbase'
            },
            {
                entity: 'klingon'
            }
        ]

        quadrant.flattenedSectors = sectors
        quadrant.getAllEntitiesCount().should.deep.equal({
            starbase: 1,
            klingon: 1
        })
    })
})
