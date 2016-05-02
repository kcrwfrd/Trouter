import Router from '../Router'
import {defer} from '../common'

describe('Router:', () => {
  let router, homeCtrl, childCtrl, siblingCtrl, grandChildCtrl, fooCtrl;

  beforeEach(() => {
    router = new Router()

    homeCtrl = jasmine.createSpy()
    childCtrl = jasmine.createSpy()
    siblingCtrl = jasmine.createSpy()
    grandChildCtrl = jasmine.createSpy()
    fooCtrl = jasmine.createSpy()

    router.route('home', { controller: homeCtrl })
      .route('home.child', { controller: childCtrl })
      .route('home.sibling', { controller: siblingCtrl })
      .route('home.child.grandChild', { controller: grandChildCtrl })
      .route('foo', { controller: fooCtrl })
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

    it('Should not invoke parent controller a second time when go is called synchronously.', () => {
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
})
