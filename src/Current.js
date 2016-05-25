/**
 * @name Current
 * @description
 * Maintains current router state (i.e. current route, URL, and params).
 */

class Current {

  /**
   * @param {Router} router
   * @param {Route} current
   */

  constructor(router, current) {
    this.router = router

    this.params = {}
    this.route = null

    this.put(current)
  }

  /**
   * @method put
   * @description
   * Updates current route.
   *
   * @param {Route} route
   * @param {Object} [params]
   */

  put(route, params = {}) {
    this.params = params
    this.route = route
  }

  /**
   * @method path
   * @description
   * Returns path to current route.
   *
   * @returns {Array.<Route>}
   */

  path() {
    return this.route.path
  }

  /**
   * @method url
   * @description
   * Returns current URL
   *
   * @returns {String}
   *
   * @example
   * this.url()
   * -> /#!/foo/1/bar
   */

  url() {
    return this.router.href(this.route, this.params)
  }
}

export default Current
