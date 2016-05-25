import Router from '../Router'
import {defer} from '../common'

describe('Router:', () => {
  let router, homeCtrl, childCtrl, siblingCtrl,
  grandChildCtrl, fooCtrl, barCtrl, bazCtrl, bazDeferred, bizCtrl;

  beforeEach(() => {
    router = new Router()

    homeCtrl = jasmine.createSpy()
    childCtrl = jasmine.createSpy()
    siblingCtrl = jasmine.createSpy()
    grandChildCtrl = jasmine.createSpy()
    fooCtrl = jasmine.createSpy()
    barCtrl = jasmine.createSpy()
    bazCtrl = jasmine.createSpy()
    bizCtrl = jasmine.createSpy()

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
        title: 'Bar',
        url: '/bar/:barId'
      })
      .route('foo.baz', {
        controller: bazCtrl,
        title: 'Baz',
        url: '/baz/:bazId',
        resolve: () => bazDeferred.promise
      })
      .route('foo.biz', {
        controller: bizCtrl,
        title: 'Biz',
        url: '/biz?bizId'
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
        .then(() => router.go('foo', { fooId: 1 }))
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
      router.go('foo', { fooId: 1 })
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
        let promise = router.go('foo')

        expect(controller).not.toHaveBeenCalled()

        deferred.resolve('bar')

        return promise.then(() => {
          expect(controller).toHaveBeenCalled()
        })
      })

      it('Should not invoke the controller after promise rejection.', () => {
        // @TODO: emit error event
        // let onError = jasmine.createSpy('onError')
        // router.on('error', onError)

        spyOn(console, 'error')

        deferred.reject('bar')

        return router.go('foo').catch(() => {
          expect(controller).not.toHaveBeenCalled()
          expect(console.error).toHaveBeenCalledWith('bar')
        })
      })

      it('Should not invoke a child route if parent resolve was rejected.', () => {
        let controller = jasmine.createSpy('controller')
        spyOn(console, 'error')

        router.route('foo.bar', {
          parent: 'foo',
          controller: controller
        })

        deferred.reject('rejected')

        return router.go('foo.bar').catch(() => {
          expect(controller).not.toHaveBeenCalled()
          expect(console.error).toHaveBeenCalledWith('rejected')
        })
      })
    })
  })

  describe('href(name, params):', () => {
    it('Should return the URL for a route with params.', () => {
      let href = router.href('foo', { fooId: 1 })

      expect(href).toBe('#!/foo/1')
    })

    it('Should inherit current params.', () => {
      return router.go('foo', { fooId: 1}).then(() => {
        let href = router.href('foo.baz', { bazId: 2 })

        expect(href).toBe('#!/foo/1/baz/2')
      })
    })

    it('Should return the correct URL for a child route with no URL.', () => {
      router.route('biz', {
        parent: 'foo'
      })

      let href = router.href('biz', { fooId: 1 })

      expect(href).toBe('#!/foo/1')
    })
  })

  describe('transitionTo(route, params):', () => {
    let foo, bar;

    beforeEach(() => {
      foo = router.registry.get('foo')
      bar = router.registry.get('foo.bar')
    })

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

    it('Should update current with params.', () => {
      spyOn(router.current, 'put')

      return router.transitionTo(foo, { 'fooId': 1}).then(() => {
        expect(router.current.put).toHaveBeenCalledWith(foo,
          jasmine.objectContaining({ fooId: 1 }))
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

    it('Should update URL with correct params.', () => {
      spyOn(router, 'pushState')

      return router.transitionTo(bar, { fooId: 1, barId: 2}, {
        location: true
      }).then(() => {
        expect(router.pushState).toHaveBeenCalled()

        expect(router.pushState).toHaveBeenCalledWith(
          jasmine.any(Object),
          'Bar',
          '#!/foo/1/bar/2'
        )
      })
    })

    it('Should update URL without query arg when arg is null.', () => {
      spyOn(router, 'pushState')

      return router.go('foo.biz', { fooId: 2 }).then(() => {
        expect(router.pushState).toHaveBeenCalledWith(
          jasmine.any(Object),
          'Biz',
          '#!/foo/2/biz'
        )
      })
    })

    it('Should update URL with query arg when arg is defined.', () => {
      spyOn(router, 'pushState')

      return router.go('foo.biz', { fooId: 2, bizId: 3 }).then(() => {
        expect(router.pushState).toHaveBeenCalledWith(
          jasmine.any(Object),
          'Biz',
          '#!/foo/2/biz?bizId=3'
        )
      })
    })

    it('Should inherit params.', () => {
      spyOn(router, 'pushState')

      return router.transitionTo(foo, { fooId: 1 })
        .then(() => router.transitionTo(bar, { barId: 2 }, { location: true }))
        .then(() => {
          expect(router.pushState).toHaveBeenCalledWith(
            jasmine.any(Object),
            'Bar',
            '#!/foo/1/bar/2'
          )
        })
    })

    it('Should exit and re-enter if route is the same.', () => {
      spyOn(foo, 'exit').and.callThrough()

      return router.transitionTo(foo, { fooId: 1 })
        .then(() => router.transitionTo(foo))
        .then(() => {
          expect(foo.exit).toHaveBeenCalled()
          expect(fooCtrl.calls.count()).toBe(2)
        })
    })

    describe('With Exit Handlers:', () => {
      let deferred, onExit;

      class Controller {
        onExit() {}
      }

      beforeEach(() => {
        deferred = defer()

        onExit = spyOn(Controller.prototype, 'onExit').and.returnValue(deferred.promise)

        router.route('gizmo', {
          controller: Controller
        })
      })

      it("Should call controller's exit handler when exiting a route.", () => {
        return router.go('gizmo')
          .then(() => {
            router.go('home')

            expect(onExit).toHaveBeenCalled()
          })
      })

      it('Should continue to its destination when exit handler resolves.', () => {
        deferred.resolve('onExit')

        return router.go('gizmo')
          .then(() => router.go('home'))
          .then(() => {
            expect(onExit).toHaveBeenCalled()
            expect(homeCtrl).toHaveBeenCalled()
          })
      })

      it('Should not change routes when exit handler is rejected.', () => {
        spyOn(console, 'error')

        deferred.reject('onExit')

        return router.go('gizmo')
          .then(() => router.go('home'), () => {})
          .catch(() => {
            expect(onExit).toHaveBeenCalled()
            expect(console.error).toHaveBeenCalledWith('onExit')
            expect(homeCtrl).not.toHaveBeenCalled()
          })
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
      router.urlRouter.onChange('#!/foo/1/bar/2')

      expect(router.transitionTo).toHaveBeenCalledWith(
        router.registry.get('foo.bar'),
        jasmine.objectContaining({
          fooId: '1',
          barId: '2',
        })
      )

      expect(router.transitionTo.calls.mostRecent().args[1]).toEqual({
        fooId: '1',
        barId: '2',
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

    it('Should log a warning if param is missing.', () => {
      spyOn(console, 'warn')

      router.urlRouter.onChange('#!/foo/')

      expect(console.warn).toHaveBeenCalledWith(
        "No route handler found for '/foo/'"
      )
    })
  })
})
