const _ = require('lodash')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')
const proxyquire = require('proxyquire')

//make globals for easy testing
global._ = _
global.should = chai.should()
global.chai = chai
global.sinon = sinon
global.proxyquire = proxyquire

//settings/plugins
chai.use(sinonChai)
chai.use(chaiAsPromised)
proxyquire.noCallThru()
require('sinon-as-promised')
