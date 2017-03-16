const _ = require('lodash')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')

//make globals for easy testing
global._ = _
global.should = chai.should()
global.chai = chai
global.sinon = sinon

//settings/plugins
chai.use(sinonChai)
chai.use(chaiAsPromised)
require('sinon-as-promised')
