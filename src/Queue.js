/**
 * @name Queue
 * @description
 * A promise queue. Sequentially invokes a queue of functions that
 * each return a promise. The next function is called on successful
 * resolution of the current function's promise.
 */

class Queue {
  constructor(queue = []) {
    this.queue = queue
  }

  flush() {
    let first = this.queue.shift()

    return this.queue.reduce((current, next) => {
      return current.then(() => next())
    }, first())
  }
}

export default Queue
