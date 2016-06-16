import _ from 'lodash'
import Queue from '../Queue'

/**
 * @name Transition
 * @description
 * Manages route transitions
 */

class Transition {

  /**
   * @param {Transitions} transitions
   * @param {Route} current
   * @param {Route} target
   * @param {Object} [currentParams]
   * @param {Object} [toParams]
   */

  constructor(transitions, current, target, currentParams = {}, toParams = {}) {
    let nearestCommonAncestor =
      _.findLast(current.path, (ancestor) => {
        return target.path.indexOf(ancestor) > -1
      })

    this.exitPath = (target === current) ? [target] :
      current.path
        .slice(current.path.indexOf(nearestCommonAncestor) + 1)
        .reverse()

    this.enterPath = (target === current) ? [target] :
      target.path.slice(target.path.indexOf(nearestCommonAncestor) + 1)

    this.onStartQueue = new Queue(transitions.onStartHandlers.map((handler) => {
      return handler.bind(handler, target)
    }))

    this.exitQueue = new Queue(this.exitPath.map((route) => {
      return route.exit.bind(route)
    }))

    this.enterQueue = new Queue(this.enterPath.map((route) => {
      return route.enter.bind(route, toParams)
    }))
  }

  run() {
    return this.onStartQueue.flush()
      .then(() => this.exitQueue.flush())
      .then(() => this.enterQueue.flush())
  }
}

export default Transition
