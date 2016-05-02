import Queue from '../Queue'
import {defer} from '../common'

describe('Queue:', () => {
  let queue, getFoo, foo, getBar, bar;

  beforeEach(() => {
    foo = defer()
    bar = defer()

    getFoo = jasmine.createSpy('getFoo').and.returnValue(foo.promise)
    getBar = jasmine.createSpy('getBar').and.returnValue(bar.promise)

    let promisors = [getFoo, getBar]

    queue = new Queue(promisors)
  })

  describe('flush():', () => {
    it('Should return a promise.', () => {
      expect(queue.flush() instanceof Promise).toBe(true)
    })

    it('Should return a combined promise resolved on success of all its promisors.', () => {
      let onSuccess = jasmine.createSpy()

      foo.resolve('Foo')
      bar.resolve('Bar')

      return queue.flush().then(onSuccess)
        .then(() => {
          expect(getFoo).toHaveBeenCalled()
          expect(getBar).toHaveBeenCalled()
          expect(onSuccess).toHaveBeenCalled()
        })
    })

    it('Should not invoke next promisor until current one resolves.', () => {
      queue.flush()

      expect(getFoo).toHaveBeenCalled()
      expect(getBar).not.toHaveBeenCalled()

      foo.resolve('foo')

      return foo.promise.then(() => {
        expect(getBar).toHaveBeenCalled()
      })
    })

    it('Should return a rejected promise on first rejection.', () => {
      let onSuccess = jasmine.createSpy('onSuccess')
      let onError = jasmine.createSpy('onError')

      let promise = queue.flush()

      promise.then(onSuccess, onError)

      foo.reject('foo')

      return promise.catch(() => {
        expect(onSuccess).not.toHaveBeenCalled()
        expect(onError).toHaveBeenCalled()
        expect(getBar).not.toHaveBeenCalled
      })
    })
  })
})
