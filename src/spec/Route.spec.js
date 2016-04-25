import Route from '../Route'

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
})
