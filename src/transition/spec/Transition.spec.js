import Router from '../../Router'
import Transition from '../Transition'

const transitionsMock = {
  onStartHandlers: []
}

describe('Transition:', () => {
  let router;

  beforeEach(() => {
    router = new Router()

    let routeNames = [
      'foo', 'foo.bar', 'foo.bar.bat',
      'biz', 'biz.bar', 'biz.bar.bat'
    ]

    for (let route of routeNames) {
      router.route(route)
    }
  })

  it('Should have the correct exit path and an enter path.', () => {
    let current = router.registry.get('foo.bar.bat')
    let target = router.registry.get('biz.bar.bat')

    let transition = new Transition(transitionsMock, current, target)

    let exitPath = transition.exitPath.map((route) => route.name)
    let enterPath = transition.enterPath.map((route) => route.name)

    expect(exitPath).toEqual(['foo.bar.bat', 'foo.bar', 'foo'])
    expect(enterPath).toEqual(['biz', 'biz.bar', 'biz.bar.bat'])
  })
})
