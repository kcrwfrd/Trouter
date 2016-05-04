import UrlRouter from '../UrlRouter'

describe('UrlRouter:', () => {
  let urlRouter, foo, bar;

  beforeEach(() => {
    urlRouter = new UrlRouter()
    foo = jasmine.createSpy()
    bar = jasmine.createSpy()

    urlRouter.when('/foo/:fooId', foo)
    urlRouter.when('/foo/:fooId/bar/:barId', bar)
  })

  describe('onChange(hash):', () => {
    it('Should call handler when match is found.', () => {
      urlRouter.onChange('#!/foo/1')

      expect(foo).toHaveBeenCalled()
      expect(foo.calls.mostRecent().args[0]).toEqual({
        fooId: '1'
      })
    })

    it('Should call correct handler when child match is found.', () => {
      urlRouter.onChange('#!/foo/1/bar/2')

      expect(foo).not.toHaveBeenCalled()
      expect(bar).toHaveBeenCalled()
      expect(bar.calls.mostRecent().args[0]).toEqual({
        fooId: '1',
        barId: '2'
      })
    })

    it('Should throw an error if no match found.', () => {
      expect(() => urlRouter.onChange('#!/foo/1/bar')).toThrow(
        new Error("No route handler found for '/foo/1/bar'")
      )
    })
  })
})
