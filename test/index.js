/* global describe, it */

var normalize = require('..')
var expect = require('code').expect

describe('normalize-license-data', function () {
  it('returns null for null values', function () {
    expect(normalize(null)).to.equal(null)
  })

  it('returns null for undefined values', function () {
    expect(normalize(null)).to.equal(null)
  })

  it('returns null for empty strings', function () {
    expect(normalize('')).to.equal(null)
  })

  it('creates opensource.org-based license.url for valid string license names', function () {
    var license = normalize('MIT')
    expect(license.name).to.equal('MIT')
    expect(license.url).to.equal('http://opensource.org/licenses/MIT')
  })

  it('does not create license.url for unrecognized license names', function () {
    var license = normalize('something-crazy')
    expect(license.name).to.equal('something-crazy')
    expect(license.url).to.not.exist()
  })

  it('converts license.type to license.name', function () {
    var license = normalize({
      type: 'MIT',
      url: 'https://github.com/isaacs/abbrev-js/raw/master/LICENSE'
    })
    expect(license.name).to.equal('MIT')
    expect(license.type).to.not.exist()
    expect(license.url).to.equal('https://github.com/isaacs/abbrev-js/raw/master/LICENSE')
  })

  it('leaves license.url untouched if it exists', function () {
    var license = normalize({
      type: 'MIT',
      url: 'https://github.com/isaacs/abbrev-js/raw/master/LICENSE'
    })
    expect(license.name).to.equal('MIT')
    expect(license.url).to.equal('https://github.com/isaacs/abbrev-js/raw/master/LICENSE')
  })

  it('accepts URL strings, using a schemeless value for name', function () {
    var license = normalize('https://example.com')
    expect(license.name).to.equal('example.com')
    expect(license.url).to.equal('https://example.com')
  })

  it('does not mutate the source object', function () {
    var original = {
      type: 'MIT',
      url: 'https://github.com/isaacs/abbrev-js/raw/master/LICENSE'
    }
    var normalized = normalize(original)

    expect(original.type).to.equal('MIT')
    expect(original.name).to.not.exist()
    expect(normalized.type).to.not.exist()
    expect(normalized.name).to.equal('MIT')
  })

})
