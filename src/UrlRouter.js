import UrlMatcher from './UrlMatcher'
import _ from 'lodash'

class UrlRouter {
  constructor(router) {
    this.router = router
    this.prefix = router.prefix || '#!'
    this.rules = []
    this.default = null
  }

  /**
   * @name onChange
   * @description
   * Searches registered route URL patterns for a matching route,
   * and transitions to it if found.
   *
   * @param {String} hash - e.g. `#!/path/to/route`
   * @param {Object} options - transitionTo options
   */

  onChange(hash, options = {}) {
    let path = hash.replace(this.prefix, '')

    for (let rule of this.rules) {
      let result = rule(path)

      if (result) {
        this.router.transitionTo(result.route, result.params, options)

        return true
      }
    }

    console.warn(`No route handler found for '${path}'`)

    if (this.default && path !== this.default) {
      let url = this.prefix + this.default

      this.replaceState({}, '', url)
      this.onChange(url)
    }
  }

  listen(options = {}) {
    // IE11 supports popstate, but the event doesn't fire when
    // a normal hash link is clicked or user manually changes hash.
    // So we just listen for both events with a debounced handler.
    let onChange =
      _.debounce(() => this.onChange(window.location.hash), 1, {
        leading: true,
        trailing: false,
      })

    window.addEventListener('popstate', onChange)
    window.addEventListener('hashchange', onChange)

    if (options.click) {
      let clickEvent =
        document && document.ontouchstart ? 'touchstart' : 'click';
      console.log('click registration')
      window.addEventListener(clickEvent, (event) => {
        console.log('click', event)
        if (
          event.which != 1 // not left click
          || event.metaKey || event.ctrlKey || event.shiftKey // or meta keys
          || event.defaultPrevented // or default prevented
        ) return

        const RE_ORIGIN = /^.+?\/\/+[^\/]+/ // @TODO: improve
        let loc = window && (window.history.location || window.location)

        let el = event.target

        while (el && el.nodeName !== 'A') {
          el = el.parentNode
        }

        if (
          !el || el.nodeName !== 'A' // not A tag
          || el.hasAttribute('download') // has download attr
          || !el.hasAttribute('href') // has no href attr
          || el.target && el.target != '_self' // another window or frame
          || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) == -1 // cross origin
        ) return

        if (el.href !== loc.href) {
          // @TODO
          console.log('click', el.href)
          debugger
          // if (
          //   el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
          //   || base != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
          //   || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
          // ) return
        }

        event.preventDefault()
      })
    }

    // Handle the current hash
    this.onChange(window.location.hash)
  }

  /**
   * @method pushState
   * @description
   * Wraps window.history.pushState.
   *
   * @param {Object} state
   * @param {String} title
   * @param {String} url
   */

  pushState(state = {}, title, url) {
    if (window && window.history && window.history.pushState) {
      window.history.pushState(state, title, url)
    }
  }

  /**
   * @method replaceState
   * @description
   * Wraps window.history.replaceState.
   *
   * @param {Object} state
   * @param {String} title
   * @param {String} url
   */

  replaceState(state = {}, title, url) {
    if (window && window.history && window.history.replaceState) {
      window.history.replaceState(state, title, url)
    }
  }

  when(route) {
    let matcher = new UrlMatcher(route.url)

    this.rules.push((path) => {
      let params = matcher.exec(path)

      if (params) {
        return { route, params }
      } else {
        return null
      }
    })
  }

  // when(url, handler) {
  //   let matcher = new UrlMatcher(url)

  //   this.rules.push((path) => {
  //     let result = matcher.exec(path)

  //     if (!result) {
  //       return false
  //     }

  //     handler(result)

  //     return true
  //   })
  // }

  otherwise(url) {
    this.default = url
  }
}

export default UrlRouter
