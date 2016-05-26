import {last} from './common'
import Queue from './Queue'

/**
 * @name Transition
 * @description
 * Manages route transitions
 */

class Transition {

  /**
   * @param {Array.<Route>} exitPath
   * @param {Array.<Route>} enterPath
   * @param {Object} params
   * @param {Transitions} transitions
   */

  constructor(exitPath, enterPath, params, transitions) {
    let destination = last(enterPath)

    this.onStartQueue = new Queue(transitions.onStartHandlers.map((handler) => {
      return handler.bind(handler, destination)
    }))

    this.exitQueue = new Queue(exitPath.map((route) => {
      return route.exit.bind(route)
    }))

    this.enterQueue = new Queue(enterPath.map((route) => {
      return route.enter.bind(route, params)
    }))
  }

  run() {
    return this.onStartQueue.flush()
      .then(() => this.exitQueue.flush())
      .then(() => this.enterQueue.flush())
  }
}

export default Transition
