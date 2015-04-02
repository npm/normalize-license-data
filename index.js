var clone = require('lodash.clone')
var is = require('is_js')
var schemeless = require('schemeless')
var nameToUrl = require('oss-license-name-to-url')

module.exports = function normalizeLicense (license) {
  if (is.falsy(license)) return null
  if (is.empty(license)) return null

  // Prevent modification of the source object
  license = clone(license)

  // Legacy, I presume
  if (is.array(license)) license = license[0]

  // Convert `type` to `name`
  if (is.object(license)) {
    if (license.type) {
      license.name = license.type
      delete license.type
    }
    // Honor URL if present, otherwise guess
    license.url = license.url || nameToUrl(license.name)
    return license
  }

  if (is.url(license)) {
    return {name: schemeless(license), url: license}
  }

  if (is.string(license)) {
    license = {name: license, url: nameToUrl(license)}
    if (!license.url) delete license.url
    return license
  }
}
