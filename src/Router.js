import _ from 'lodash'
import {isObject} from './common'
import Registry from './Registry'
import Transition from './Transition'
import UrlRouter from './UrlRouter'

class Router {
  constructor({prefix} = {}) {
    this.prefix = prefix
    this.urlRouter = new UrlRouter(prefix)
    this.registry = new Registry(this, this.urlRouter)

    this.current = this.registry.root
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
   * @method go
   * @description
   * Navigate to a route by name.
   */

  go(name) {
    let destination = this.registry.get(name)

    if (!destination) {
      throw new Error(`Route '${name}' not found.`)
    }

    return this.transitionTo(destination)
  }

  /**
   * @method transitionTo
   * @description
   * Lower-level method for transitioning to a route.
   *
   * @param {Route} route
   * @param {Object} params
   */

  transitionTo(route, params) {
    let nearestCommonAncestor =
      _.findLast(this.current.path, (ancestor) => {
        return route.path.indexOf(ancestor) > -1
      })

    let exitPath = this.current.path
      .slice(this.current.path.indexOf(nearestCommonAncestor) + 1)
      .reverse()

    let enterPath = route.path
      .slice(route.path.indexOf(nearestCommonAncestor) + 1)

    // @TODO: traverse exit path to call onExit handlers

    let transition = new Transition(exitPath, enterPath, params)

    let promise = transition.run()

    // @TODO: do transitions need to be queued as well? See test
    // 'Router: go(name): Should not invoke parent controller a
    // second time when go is called synchronously.'

    promise.then(() => {
      this.current = route
    }).catch((error) => {
      // @TODO: handle errors
      let url = (
        window.location.origin + window.location.pathname +
        this.prefix + this.current.url
      )

      window.history.pushState({}, this.current.title, url)
    })

    return promise
  }

}

export default Router
