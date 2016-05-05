import UrlMatcher from './UrlMatcher'

class UrlRouter {
  constructor(prefix) {
    this.prefix = prefix || '#!'
    this.rules = []
  }

  onChange(hash) {
    let path = hash.replace(this.prefix, '')

    for (let rule of this.rules) {
      if (rule(path)) {
        return true
      }
    }

    console.warn(`No route handler found for '${path}'`)
  }

  listen() {
    // @TODO: normalize popstate/hashchange
    window.addEventListener('hashchange', (event) => {
      this.onChange(window.location.hash)
    })

    // Handle the current hash
    this.onChange(window.location.hash)
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
}

export default UrlRouter
