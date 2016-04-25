/**
 * @class Route
 * @description
 * A fully-built route.
**/

class Route {
  constructor(definition) {
    let {name, url, controller, parent, path} = definition

    this.name = name
    this.url = url
    this.controller = controller
    this.parent = parent || null
    this.path = path.concat(this)
  }

  getFqn() {
    if (!this.parent) {
      return this.name
    }

    let name = this.parent.getFqn()

    return name ? name + '.' + this.name : this.name
  }

  /**
   * @method getRoot
   * @description
   * Returns the root node of this route's tree
   */

  getRoot() {
    return this.parent && this.parent.getRoot() || this
  }
}

export default Route
