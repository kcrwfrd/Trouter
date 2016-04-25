import Router from '../Router'

describe('Router:', () => {
  let router, homeCtrl, childCtrl, siblingCtrl, grandChildCtrl, fooCtrl;

  beforeEach(() => {
    router = new Router()

    homeCtrl = jasmine.createSpy()
    childCtrl = jasmine.createSpy()
    siblingCtrl = jasmine.createSpy()
    grandChildCtrl = jasmine.createSpy()

    router.route('home', { controller: homeCtrl })
      .route('home.child', { controller: childCtrl })
      .route('home.sibling', { controller: siblingCtrl })
      .route('home.child.grandChild', { controller: grandChildCtrl })
      .route('foo', { controller: fooCtrl })
  })

  describe('go(name):', () => {
    it('Should invoke the controller bound to the route.', () => {
      router.go('home')

      expect(homeCtrl).toHaveBeenCalled()
    })

    it('Should invoke a parent controller when a child is navigated to', () => {
      router.go('home.child')

      expect(homeCtrl).toHaveBeenCalled()
      expect(childCtrl).toHaveBeenCalled()
    })

    it('Should not invoke parent controller a second time when navigating to child.', () => {
      router.go('home')

      expect(homeCtrl).toHaveBeenCalled()

      router.go('home.child')

      expect(childCtrl).toHaveBeenCalled()
      expect(homeCtrl.calls.count()).toBe(1)
    })

    it('Should not invoke parent controller a second time when navigating to sibling.', () => {
      router.go('home.child')

      router.go('home.sibling')

      expect(homeCtrl.calls.count()).toBe(1)
      expect(childCtrl.calls.count()).toBe(1)
      expect(siblingCtrl.calls.count()).toBe(1)
    })

    it('Should exit and enter the correct paths.', () => {
      router.go('home.child.grandChild')

      // @TODO: expect exit handlers to be called
      router.go('foo')
    })

    it('Should throw an error when route not found.', () => {
      expect(() => router.go('wat')).toThrow(new Error("Route 'wat' not found."))
    })
  })
})
