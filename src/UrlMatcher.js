class UrlMatcher {
  /**
   * @constructor
   * @description
   * Takes a URL pattern with optional params denoted by ':'
   *
   * @param {String} urlPattern - e.g. /foo/:fooId/bar
   */

  constructor(urlPattern) {
    this.params = []

    // We'll build up the regex string
    // as we iterate through the path.
    let pattern = ''

    for (let item of urlPattern.split('/')) {
      if (item === '') continue

      let isParam = item.startsWith(':')

      if (isParam) {
        let paramName = item.slice(1)

        this.params.push(paramName)

        pattern += '\/([A-Za-z0-9_-]+)'
      } else {
        pattern += '\/' + item
      }
    }

    this.pattern = new RegExp(`^${pattern}$`)
  }

  /**
   * @method exec
   * @description
   * Tests a path, providing route params if match found.
   * Returns null if not a match.
   *
   * @param {String} path
   *
   * @returns {Object|null}
   *
   * @example
   * new UrlMatcher('/foo/:id').exec('/foo/1') -> { id: '1'}
   */

  exec(path) {
    let result = this.pattern.exec(path)

    if (!result) {
      return null
    }

    let params = result.slice(1)

    return this.params.reduce((memo, paramName, index) => {
      memo[paramName] = params[index]

      return memo
    }, {})
  }
}

export default UrlMatcher
