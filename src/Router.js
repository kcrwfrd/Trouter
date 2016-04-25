import _ from 'lodash'
import {isObject} from './common'
import Registry from './Registry'

class Router {
  constructor() {
    this.registry = new Registry()

    this.current = this.registry.root
  }

  /**
   * @method route
   * @description
   * Registers a route.
   *
   * @param {String} [name]
   * @param {Object} definition
   * @param {String} definition.url
   * @param {String} definition.name
   * @param {Function} definition.controller
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
    // @TODO: normalize popstate/hashchange
    window.addEventListener('hashchange', (event) => {
      let path = this.getPath(window.location.hash)

      let destination = this.registry.urlMatcher.get(path)

      this.go(destination)
    })
  }

  /**
   * @method go
   * @description
   * Navigate to a route by name.
   *
   * @TODO return promise
   */

  go(name) {
    let destination = this.registry.get(name)

    if (!destination) {
      throw new Error(`Route '${name}' not found.`)
    }

    let nearestCommonAncestor =
      _.findLast(this.current.path, (ancestor) => {
        return destination.path.indexOf(ancestor) > -1
      })

    let exitPath = this.current.path
      .slice(this.current.path.indexOf(nearestCommonAncestor) + 1)
      .reverse()

    let enterPath = destination.path
      .slice(destination.path.indexOf(nearestCommonAncestor) + 1)

    // @TODO: traverse exit path to call onExit handlers

    // @TODO: traverse enterPath with a promise queue
    for (let route of enterPath) {
      if (route.controller) {
        route.controller()
      }
    }

    this.current = destination
  }

}

export default Router
