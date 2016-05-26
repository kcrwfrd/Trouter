import _ from 'lodash'
import {isObject, isString} from './common'
import Current from './Current'
import Registry from './Registry'
import Transition from './Transition'
import Transitions from './Transitions'
import UrlRouter from './UrlRouter'

class Router {
  constructor({prefix} = {}) {
    this.prefix = prefix || '#!'

    this.urlRouter = new UrlRouter(prefix)
    this.registry = new Registry(this, this.urlRouter)
    this.transitions = new Transitions()

    this.current = new Current(this, this.registry.root)
  }

  /**
   * @method route
   * @description
   * Registers a route.
   *
   * @param {[String]} name
   * @param {Object} definition
   * @param {Boolean} definition.abstract
   * @param {String} definition.url
   * @param {String} definition.name
   * @param {String} definition.label - For page title, breadcrumbs, etc.
   * @param {String} definition.parent
   * @param {Function} definition.controller
   * @param {Object|Array|*} definition.resolve
   */

  route(name, definition = {}) {
    if (isObject(name)) {
      definition = name
    } else {
      definition.name = name
    }

    this.registry.register(definition)

    return this
  }

  /**
   * @method listen
   * @description
   * Starts listening for hash changes to route to.
   */

  listen() {
    this.urlRouter.listen()
  }

  /**
   * @method href
   * @description
   * Returns the URL for a given route with given params.
   * Params inherit defaults from current params.
   *
   * @param {String|Route} route - Route name or instance
   * @param {Object} [params]
   *
   * @returns {String}
   */

  href(route, params = {}) {
    let destination = (isString(route)) ? this.registry.get(route) : route

    if (!destination) {
      console.error(`No match found for route '${route}'`)

      return this.prefix
    }

    params = Object.assign({}, this.current.params, params)

    return this.prefix + destination.href(params)
  }

  /**
   * @method go
   * @description
   * Programmatically navigate to a route by name, updating URL.
   */

  go(name, params = {}) {
    let destination = this.registry.get(name)

    if (!destination) {
      throw new Error(`Route '${name}' not found.`)
    }

    return this.transitionTo(destination, params, { location: true })
  }

  /**
   * @method pushState
   * @description
   * Wraps window.history.pushState.
   *
   * @param {Object} state
   * @param {String} title
   * @param {String} url
   */

  pushState(state = {}, title, url) {
    if (window && window.history && window.history.pushState) {
      window.history.pushState(state, title, url)
    }
  }

  /**
   * @name reload
   * @description
   * Reloads current route with new params, optionally with
   * a hard browser refresh.
   *
   * @param {Object} params
   * @param {Boolean} hardRefresh
   */

  reload(params = {}, hardRefresh) {
    let route = this.current.route

    if (hardRefresh) {
      this.pushState({}, route.title, this.href(route, params))

      window.location.reload()

      return
    }

    return this.transitionTo(route, params, { location: true })
  }

  /**
   * @method transitionTo
   * @description
   * Lower-level method for transitioning to a route.
   *
   * @param {Route} route
   * @param {Object} params
   */

  transitionTo(route, params = {}, options = {}) {
    // @TODO: refactor into transition manager
    let nearestCommonAncestor =
      _.findLast(this.current.path(), (ancestor) => {
        return route.path.indexOf(ancestor) > -1
      })

    let exitPath = (route === this.current.route) ? [route] :
      this.current.path()
        .slice(this.current.path().indexOf(nearestCommonAncestor) + 1)
        .reverse()

    let enterPath = (route === this.current.route) ? [route] :
      route.path.slice(route.path.indexOf(nearestCommonAncestor) + 1)

    // Default params to current
    params = Object.assign({}, this.current.params, params)

    let transition = this.transitions.create(exitPath, enterPath, params)

    if (options.location) {
      this.pushState({}, route.title, this.href(route, params))
    }

    let previous = this.current.route

    // @TODO: should current only be set after successful route change?
    this.current.put(route, params)

    let promise = transition.run()

    // @TODO: do transitions need to be queued as well? See test
    // 'Router: go(name): Should not invoke parent controller a
    // second time when go is called synchronously.'

    promise.then(() => {
      // this.current.put(route, params)
    }).catch((error) => {
      // @TODO: handle errors
      console.error(error)

      this.current.put(previous)
      this.pushState({}, this.current.route.title, this.current.url())
    })

    return promise
  }

}

export default Router
