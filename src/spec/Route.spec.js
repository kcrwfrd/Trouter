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

    describe('Defined on Controller:', () => {
      let deferred, route;

      class Controller {
        static resolve(routeParams) {}
      }

      beforeEach(() => {
        deferred = defer()

        spyOn(Controller, 'resolve').and.returnValue(deferred.promise)

        route = new Route({
          name: 'foo',
          controller: Controller,
          path: []
        })
      })

      it("Should call a controller's static resolve method if defined.", () => {
        route.enter()

        expect(Controller.resolve).toHaveBeenCalled()
      })

      it("Should call a controller's static resolve method with route params.", () => {
        route.enter({ fooId: '1' })

        expect(Controller.resolve).toHaveBeenCalledWith(
          jasmine.objectContaining({ fooId: '1' })
        )
      })

      it('Should throw an error if resolve defined on both controller and route.', () => {
        expect(() => {
          new Route({
            name: 'foo',
            controller: Controller,
            resolve: (() => deferred.promise),
            path: []
          })
        }).toThrow(
          new Error('Resolve cannot be defined on both controller and route.')
        )
      })
    })

  })

  describe('href(params):', () => {
    let route;

    beforeEach(() => {
      route = new Route({
        name: 'foo',
        url: '/foo/:fooId',
        controller: () => {},
        path: []
      })
    })

    it('Should return the URL for route with param.', () => {
      expect(route.href({ fooId: 1})).toBe('/foo/1')
    })

    it('Should return the URL for complex route with params.', () => {
      route.url = '/foo/:fooId/bar/baz/:bazId'

      let href = route.href({ fooId: 1, bazId: 2})

      expect(href).toBe('/foo/1/bar/baz/2')
    })

    it('Should throw an error if required param is missing.', () => {
      expect(() => route.href()).toThrow(
        new Error("Missing required param 'fooId'")
      )
    })
  })
})
