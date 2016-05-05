import Route from '../Route'
import {defer} from '../common'

describe('Route:', () => {
  it('Should properly instantiate.', () => {
    let route = new Route({
      name: 'foo',
      url: '/foo',
      controller: () => {},
      path: []
    })

    expect(route).toBeDefined()
    expect(route.getRoot()).toBe(route)
    expect(route.getFqn()).toBe('foo')
  })

  describe('Resolve:', () => {
    let controller, deferred, route, resolve;

    beforeEach(() => {
      controller = jasmine.createSpy('controller')
      deferred = defer()
      resolve = jasmine.createSpy('resolve').and.returnValue(deferred.promise)

      route = new Route({
        name: 'foo',
        controller: controller,
        resolve: resolve,
        path: []
      })

      route.enter({ fooId: '1' })
    })

    it('Should resolve promises before controller instantiation.', () => {
      expect(controller).not.toHaveBeenCalled()

      deferred.resolve('bar')

      return deferred.promise.then(() => {
        expect(controller).toHaveBeenCalled()
      })
    })

    it('Should instantiate the controller with resolved values as arguments.', () => {
      deferred.resolve('bar')

      return deferred.promise.then(() => {
        expect(controller).toHaveBeenCalledWith(
          jasmine.objectContaining({ fooId: '1' }),
          'bar'
        )
      })
    })

    it('Should call resolve with route params.', () => {
      expect(resolve).toHaveBeenCalledWith(
        jasmine.objectContaining({ fooId: '1' })
      )
    })

    it('Should instantiate the controller with named resolves.', () => {
      let foo = defer()
      let bar = defer()

      let route = new Route({
        name: 'foo',
        controller: controller,
        resolve: {
          foo: (() => foo.promise),
          bar: (() => bar.promise)
        },
        path: [],
      })

      foo.resolve('Foo')
      bar.resolve('Bar')

      return route.enter().then(() => {
        let [params, resolve] = controller.calls.mostRecent().args

        expect(params).toEqual({})

        expect(resolve).toEqual({
          foo: 'Foo',
          bar: 'Bar',
        })
      })
    })
  })
})
