import UrlMatcher from './UrlMatcher'
import _ from 'lodash'

class UrlRouter {
  constructor(prefix) {
    this.prefix = prefix || '#!'
    this.rules = []
    this.default = null
  }

  onChange(hash) {
    let path = hash.replace(this.prefix, '')

    for (let rule of this.rules) {
      if (rule(path)) {
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

  listen() {
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

  when(url, handler) {
    let matcher = new UrlMatcher(url)

    this.rules.push((path) => {
      let result = matcher.exec(path)

      if (!result) {
        return false
      }

      handler(result)

      return true
    })
  }

  otherwise(url) {
    this.default = url
  }
}

export default UrlRouter
