import Queue from './Queue'

/**
 * @name Transition
 * @description
 * Manages route transitions
 */

class Transition {
  constructor(exitPath, enterPath, params) {
    this.exitQueue = new Queue(exitPath.map((route) => {
      return route.exit.bind(route)
    }))

    this.enterQueue = new Queue(enterPath.map((route) => {
      return route.enter.bind(route, params)
    }))
  }

  run() {
    return this.exitQueue.flush().then(() => this.enterQueue.flush())
  }
}

export default Transition
