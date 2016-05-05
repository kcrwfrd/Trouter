import _ from 'lodash'
import {isObject, defer} from './common'

/**
 * @class Route
 * @description
 * A fully-built route.
 */

class Route {
  constructor(definition) {
    let {
      abstract, controller, name,
      parent, path, resolve, url
    } = definition

    // Prepend URL with parent's URL
    url = (parent && parent.url) ? parent.url + url : url;

    // Only 1 resolve definition allowed
    if (controller && controller.resolve && resolve) {
      throw new Error('Resolve cannot be defined on both controller and route.')
    }

    this.Controller = controller // Controller definition
    this.controller = null // Controller instance
    this.name = name
    this.navigable = !!url && !abstract
    this.parent = parent || null
    this.path = path.concat(this)
    this.resolve = resolve || (controller && controller.resolve) || {}
    this.url = url
  }

  getFqn() {
    if (!this.parent) {
      return this.name
    }

    let name = this.parent.getFqn()

    return name ? name + '.' + this.name : this.name
  }

  /**
   * @method getRoot
   * @description
   * Returns the root node of this route's tree
   */

  getRoot() {
    return this.parent && this.parent.getRoot() || this
  }

  /**
   * @method enter
   * @description
   * Route becomes active, instantiating its controller
   * if one is defined.
   */

  enter(params = {}) {
    let promise = getResolve(this.resolve, params)

    promise.then((resolve) => {
      if (this.Controller) {
        this.controller = new this.Controller(params, resolve)
      }
    }).catch((error) => {
      // @TODO: handle errors
    })

    return promise
  }

  exit() {
    let promise = Promise.resolve(this.controller.onExit())

    promise.then(() => this.controller = null)

    return promise
  }
}

/**
 * @method getResolve
 * @private
 * @description
 * Invokes/normalizes resolve functions and values into promises.
 *
 * @param {*} value
 *
 * @returns {Promise}
 */

function getResolve(value, params) {
  if (value instanceof Promise) {
    return value
  }

  if (typeof value === 'function') {
    return Promise.resolve(value(params))
  }

  if (_.isPlainObject(value)) {
    return resolveObject(value, params)
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => {
      return (typeof item === 'function') ? item(params) : item
    }))
  }

  return Promise.resolve(value)
}

function resolveObject(obj, params) {
  let keys = Object.keys(obj)

  // First invoke resolves and combine into single promise
  let combinedPromise = Promise.all(keys.map((key) => {
    let value = obj[key]

    return (typeof value === 'function') ? value(params) : value
  }))

  // Then assign resolved values to their keys
  return combinedPromise.then((values) => {
    return values.reduce((memo, value, index) => {
      let key = keys[index]

      memo[key] = value

      return memo
    }, {})
  })
}

export default Route
