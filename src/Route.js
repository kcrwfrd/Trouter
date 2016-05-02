import _ from 'lodash'
import {isObject, defer} from './common'

/**
 * @class Route
 * @description
 * A fully-built route.
 */

class Route {
  constructor(definition) {
    let {name, url, controller, parent, path, resolve} = definition

    this.name = name
    this.url = url
    this.Controller = controller // Controller definition
    this.controller = null // Controller instance
    this.parent = parent || null
    this.path = path.concat(this)
    this.resolve = resolve || {}
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

  enter() {
    let promise = resolve(this.resolve)

    promise.then((value) => {
      if (this.Controller) {
        this.controller = new this.Controller(value)
      }
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
 * @method resolve
 * @private
 * @description
 * Invokes/normalizes resolve functions and values into promises.
 *
 * @param {*} value
 *
 * @returns {Promise}
 */

function resolve(value) {
  if (value instanceof Promise) {
    return value
  }

  if (typeof value === 'function') {
    return Promise.resolve(value())
  }

  if (_.isPlainObject(value)) {
    return resolveObject(value)
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => {
      return (typeof item === 'function') ? item() : item
    }))
  }

  return Promise.resolve(value)
}

function resolveObject(obj) {
  let keys = Object.keys(obj)

  // First invoke resolves and combine into single promise
  let combinedPromise = Promise.all(keys.map((key) => {
    let value = obj[key]

    return (typeof value === 'function') ? value() : value
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
