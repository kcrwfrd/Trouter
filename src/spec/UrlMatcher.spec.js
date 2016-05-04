import UrlMatcher from '../UrlMatcher'

describe('UrlMatcher:', () => {
  let urlMatcher, foo;

  describe('Plain Routes:', () => {
    beforeEach(() => {
      urlMatcher = new UrlMatcher('/foo')
    })

    it('Should match a plain route.', () => {
      expect(urlMatcher.exec('/foo')).toEqual({})
    })

    it('Should not match the wrong route.', () => {
      expect(urlMatcher.exec('/bar')).toBe(null)
    })

    it('Should match the entire route.', () => {
      expect(urlMatcher.exec('/foo/bar')).toBe(null)
    })
  })

  describe('Routes with Params:', () => {
    beforeEach(() => {
      urlMatcher = new UrlMatcher('/foo/:fooId')
    })

    it('Should match the correct route.', () => {
      expect(urlMatcher.exec('/foo/1')).toEqual({ fooId: '1'})
    })

    it('Should not match route with missing param.', () => {
      expect(urlMatcher.exec('/foo/')).toBe(null)
      expect(urlMatcher.exec('/foo')).toBe(null)
    })

    it('Should not match a child route.', () => {
      expect(urlMatcher.exec('/foo/1/bar')).toBe(null)
    })

    it('Should match a route with multiple params.', () => {
      urlMatcher = new UrlMatcher('/foo/:fooId/bar/:barId')

      expect(urlMatcher.exec('/foo/1/bar/2')).toEqual({
        fooId: '1',
        barId: '2',
      })
    })
  })
})
