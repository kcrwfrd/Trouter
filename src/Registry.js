import Route from './Route'
import {isString} from './common'

class Registry {
  constructor(router, urlRouter) {
    this.router = router
    this.urlRouter = urlRouter

    this.routes = {}

    this.root = this.register({
      name: '',
      url: '',
      abstract: true
    })
  }

  buildRoute(definition) {
    let parentName = this.getParentName(definition)
    let parent = (isRoot(definition)) ? null : this.get(parentName)

    // There's a parent, but it hasn't been built yet
    if (parentName && !parent) {
      return null
    }

    // The route's ancestors
    let path = (parent) ? parent.path : []

    let route = new Route(Object.assign({}, definition, { parent, path }))

    return route
  }

  register(definition) {
    if (this.routes.hasOwnProperty(definition.name)) {
      throw new Error(`Route '${definition.name}' is already defined`);
    }

    let route = this.buildRoute(definition)

    if (route) {
      this.routes[route.name] = route
    }

    if (route && route.navigable) {
      this.urlRouter.when(route.url, (params) => {
        return this.router.transitionTo(route, params)
      })
    }

    return route
  }

  getParentName(route) {
    let name = route.name || ""

    if (name.indexOf('.') > -1) {
      return name.substring(0, name.lastIndexOf('.'))
    }

    if (!route.parent) return ""

    return isString(route.parent) ? route.parent : route.parent.name
  }

  /**
   * @method getName
   * @description
   * Returns a route's fully qualified name.
   *
   * @example
   * let route = { name: 'child', parent: 'parent' }
   * getName(route) -> 'parent.child'
   */

  getName(route) {
    let name = route.name

    if (name.indexOf('.') !== -1 || !route.parent) {
      return name
    }

    let parentName = isString(route.parent) ?
      route.parent : route.parent.name

    return (parentName) ? parentName + '.' + name : name
  }

  /**
   * @method get
   * @description
   * Returns a registered route.
   */

  get(name) {
    return this.routes[name] || null
  }
}

function isRoot(route) { return route.name === "" }

export default Registry
