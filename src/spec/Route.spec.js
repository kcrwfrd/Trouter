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
    let controller, deferred, route;

    beforeEach(() => {
      controller = jasmine.createSpy('controller')
      deferred = defer()

      route = new Route({
        name: 'foo',
        controller: controller,
        resolve: (() => deferred.promise),
        path: []
      })

      route.enter()
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
          jasmine.any(Object), 'bar'
        )

        expect(controller.calls.mostRecent().args[0]).toEqual({})
      })
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
