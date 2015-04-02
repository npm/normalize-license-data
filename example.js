var normalize = require('./')

normalize(null)
// => null

normalize('')
// => null

normalize('MIT')
// => {name: 'MIT', url: 'http://opensource.org/licenses/MIT'}

normalize('BSD')
// => {name: 'BSD', url: 'http://opensource.org/licenses/BSD-2-Clause'}

normalize('unfamiliar')
// => {name: 'unfamiliar'}

normalize({name: 'wtfpl', url: 'https:///wtfpl.net'})
// => {name: 'wtfpl', url: 'https:///wtfpl.net'}

normalize({type: 'wtfpl', url: 'https:///wtfpl.net'})
// => {name: 'wtfpl', url: 'https:///wtfpl.net'}

normalize('https://custom-license.com')
// => {name: 'custom-license.com', url: 'https:///custom-license.com'}
