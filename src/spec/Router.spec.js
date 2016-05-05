import Router from '../Router'
import {defer} from '../common'

describe('Router:', () => {
  let router, homeCtrl, childCtrl, siblingCtrl,
  grandChildCtrl, fooCtrl, barCtrl, bazCtrl, bazDeferred;

  beforeEach(() => {
    router = new Router()

    homeCtrl = jasmine.createSpy()
    childCtrl = jasmine.createSpy()
    siblingCtrl = jasmine.createSpy()
    grandChildCtrl = jasmine.createSpy()
    fooCtrl = jasmine.createSpy()
    barCtrl = jasmine.createSpy()
    bazCtrl = jasmine.createSpy()

    bazDeferred = defer()

    router.route('home', {
        controller: homeCtrl,
        url: '/home'
      })
      .route('home.child', {
        controller: childCtrl,
        url: '/child'
      })
      .route('home.sibling', {
        controller: siblingCtrl,
        url: '/sibling'
      })
      .route('home.child.grandChild', {
        controller: grandChildCtrl,
        url: '/grandChild'
      })
      .route('foo', {
        controller: fooCtrl,
        url: '/foo/:fooId'
      })
      .route('foo.bar', {
        controller: barCtrl,
        url: '/bar'
      })
      .route('foo.baz', {
        controller: bazCtrl,
        url: '/baz/:bazId',
        resolve: () => bazDeferred.promise
      })
  })

  describe('go(name):', () => {
    it('Should invoke the controller bound to the route.', () => {
      return router.go('home').then(() => {
        expect(homeCtrl).toHaveBeenCalled()
      })
    })

    it('Should invoke a parent controller when a child is navigated to', () => {
      return router.go('home.child').then(() => {
        expect(homeCtrl).toHaveBeenCalled()
        expect(childCtrl).toHaveBeenCalled()
      })
    })

    it('Should not invoke parent controller a second time when navigating to child.', () => {
      return router.go('home')
        .then(() => router.go('home.child'))
        .then(() => {
          expect(childCtrl).toHaveBeenCalled()
          expect(homeCtrl.calls.count()).toBe(1)
        })
    })

    it('Should not invoke parent controller a second time when navigating to sibling.', () => {
      return router.go('home.child')
        .then(() => router.go('home.sibling'))
        .then(() => {
          expect(homeCtrl.calls.count()).toBe(1)
          expect(childCtrl.calls.count()).toBe(1)
          expect(siblingCtrl.calls.count()).toBe(1)
        })
    })

    // @TODO
    xit('Should not invoke parent controller a second time when go is called synchronously.', () => {
      router.go('home')

      return router.go('home.child')
        .then(() => {
          expect(homeCtrl.calls.count()).toBe(1)
          expect(childCtrl.calls.count()).toBe(1)
        })
    })

    it('Should invoke parent controller a second time', () => {
      return router.go('home.child')
        .then(() => router.go('foo'))
        .then(() => router.go('home.child.grandChild'))
        .then(() => {
          expect(fooCtrl.calls.count()).toBe(1)
          expect(homeCtrl.calls.count()).toBe(2)
          expect(childCtrl.calls.count()).toBe(2)
          expect(grandChildCtrl.calls.count()).toBe(1)
        })
    })

    it('Should exit and enter the correct paths.', () => {
      router.go('home.child.grandChild')

      // @TODO: expect exit handlers to be called
      router.go('foo')
    })

    it('Should throw an error when route not found.', () => {
      expect(() => router.go('wat')).toThrow(new Error("Route 'wat' not found."))
    })

    describe('With resolve:', () => {
      let controller, deferred, router;

      beforeEach(() => {
        controller = jasmine.createSpy('controller')
        deferred = defer()
        router = new Router()

        router.route('foo', {
          controller: controller,
          resolve: () => {
            return deferred.promise
          }
        })
      })

      it('Should invoke the controller after promise resolution.', () => {
        router.go('foo')

        expect(controller).not.toHaveBeenCalled()

        deferred.resolve('bar')

        return deferred.promise.then(() => {
          expect(controller).toHaveBeenCalled()
        })
      })

      it('Should not invoke the controller after promise rejection.', () => {
        // @TODO: emit error event
        // let onError = jasmine.createSpy('onError')
        // router.on('error', onError)

        router.go('foo')

        deferred.reject('bar')

        return deferred.promise.catch(() => {
          expect(controller).not.toHaveBeenCalled()
          // expect(onError).toHaveBeenCalled()
        })
      })

      it('Should not invoke a child route if parent resolve was rejected.', () => {
        let controller = jasmine.createSpy('controller')

        router.route('foo.bar', {
          parent: 'foo',
          controller: controller
        })

        router.go('foo.bar')

        deferred.reject('rejected')

        return deferred.promise.catch(() => {
          expect(controller).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('transitionTo(route, params):', () => {
    it('Should instantiate controller with params.', () => {
      let foo = router.registry.get('foo')

      return router.transitionTo(foo, { 'fooId': 1}).then(() => {
        let [params, resolve] = fooCtrl.calls.mostRecent().args

        expect(params).toEqual({
          'fooId': 1
        })

        expect(resolve).toEqual({})
      })
    })

    it('Should instantiate controller with params and resolve.', () => {
      let baz = router.registry.get('foo.baz')

      bazDeferred.resolve('Baz')

      return router.transitionTo(baz, { 'fooId': 1}).then(() => {
        let [params, resolve] = bazCtrl.calls.mostRecent().args

        expect(params).toEqual({
          'fooId': 1
        })

        expect(resolve).toEqual('Baz')
      })
    })
  })

  describe('on hash change:', () => {
    beforeEach(() => {
      spyOn(router, 'transitionTo').and.callThrough()
    })

    it('Should go to the correct route.', () => {
      router.urlRouter.onChange('#!/home')

      expect(router.transitionTo).toHaveBeenCalledWith(
        router.registry.get('home'),
        jasmine.any(Object)
      )
    })

    it('Should go to the correct child route.', () => {
      router.urlRouter.onChange('#!/home/child')

      expect(router.transitionTo).toHaveBeenCalledWith(
        router.registry.get('home.child'),
        jasmine.any(Object)
      )
    })

    it('Should go to the correct grand child route.', () => {
      router.urlRouter.onChange('#!/home/child/grandChild')

      expect(router.transitionTo).toHaveBeenCalledWith(
        router.registry.get('home.child.grandChild'),
        jasmine.any(Object)
      )
    })

    it('Should go to the correct route with param.', () => {
      router.urlRouter.onChange('#!/foo/1')

      expect(router.transitionTo).toHaveBeenCalledWith(
        router.registry.get('foo'),
        jasmine.objectContaining({
          fooId: '1',
        })
      )

      expect(router.transitionTo.calls.mostRecent().args[1]).toEqual({
        fooId: '1'
      })
    })

    it('Should go to the correct child route with parent param.', () => {
      router.urlRouter.onChange('#!/foo/1/bar')

      expect(router.transitionTo).toHaveBeenCalledWith(
        router.registry.get('foo.bar'),
        jasmine.objectContaining({
          fooId: '1',
        })
      )

      expect(router.transitionTo.calls.mostRecent().args[1]).toEqual({
        fooId: '1'
      })
    })

    it('Should go to the correct child route with param, parent param, and resolve.', () => {
      router.urlRouter.onChange('#!/foo/1/baz/2')

      expect(router.transitionTo).toHaveBeenCalledWith(
        router.registry.get('foo.baz'),
        jasmine.objectContaining({
          fooId: '1',
          bazId: '2',
        })
      )
    })

    it('Should throw an error if param is missing.', () => {
      expect(() => router.urlRouter.onChange('#!/foo/')).toThrow(
        new Error("No route handler found for '/foo/'")
      )
    })
  })
})
