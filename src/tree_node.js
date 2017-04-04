export default class LeafNode {
  constructor(data, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }

  getData() {
    return this.data
  }

  getLeft() {
    return this.left || null
  }

  getRight() {
    return this.right || null
  }

  setLeft(lessNode = null) {
    this.left = lessNode
    return this
  }

  setRight(moreNode = null) {
    thisright = moreNode
    return this
  }
}
