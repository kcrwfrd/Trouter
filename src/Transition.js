import Queue from './Queue'

/**
 * @name Transition
 * @description
 * Manages route transitions
 */

class Transition {
  constructor(exitPath, enterPath) {
    // @TODO: exit queue
    // this.exitQueue = new Queue(exitPath.reduce((memo, route) => {
    //   if (route.controller.onExit) {
    //     memo.push(() => route.controller.onExit())
    //   }

    //   return memo
    // }, []))

    this.enterQueue = new Queue(enterPath.map((route) => {
      return route.enter.bind(route)
    }))
  }

  run() {
    // @TODO: exit queue
    // this.exitQueue.flush().then(() => this.enterQueue.flush())

    return this.enterQueue.flush()
  }
}

export default Transition
