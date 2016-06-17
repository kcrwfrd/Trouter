import Transition from './Transition'

/**
 * @name Transitions
 * @description
 * Registers global transition hooks.
 *
 * @TODO
 * - Implement additional transition lifecycle hooks
 * - Support handlers returning Boolean
 * - Write tests
 */

class Transitions {
  constructor(){
    this.onErrorHandlers = []
    this.onStartHandlers = []
    this.onSuccessHandlers = []
  }

  onError(handler) {
    if (typeof handler !== 'function') {
      throw new Error(`Handler must be a function, was '${typeof handler}' instead`)
    }

    this.onErrorHandlers.push(handler)
  }

  /**
   * @method onStart
   * @description
   * Registers a callback handler called on transition start.
   * Handler may return a promise to cancel route transition.
   *
   * @TODO support returning Boolean to cancel or continue transition.
   *
   * @param {Function} handler
   *
   * @callback handler
   * @param {Route} destination
   */

  onStart(handler) {
    if (typeof handler !== 'function') {
      throw new Error(`Handler must be a function, was '${typeof handler}' instead`)
    }

    this.onStartHandlers.push(handler)
  }

  onSuccess(handler) {
    if (typeof handler !== 'function') {
      throw new Error(`Handler must be a function, was '${typeof handler}' instead`)
    }

    this.onSuccessHandlers.push(handler)
  }

  create(...args) {
    return new Transition(this, ...args)
  }
}

export default Transitions
