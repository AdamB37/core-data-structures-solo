import LeafNode from './tree_node.js'

export default class BinaryTree {
  constructor() {
    this.root = null
    this.size = 0
  }

  insert(value) {
    let leafNode = new TreeNode({data: value})
    BinaryTree.insertTraverse(leafNode, this.root)
    this.size += 1
  }

  search(value) {
    BinaryTree.searchTraverse(value, this.root)
  }

  remove(value) {
    if(this.root.getData === value && noChildren(this.root)) {
        this.root = null
    }
    else {
      BinaryTree.removeTraverse(value, this.root)
    }
    this.size -= 1
  }

  traverse(callback) {
    BinaryTree.inOrderTraverse(this.root, callback)
  }

  count() {
    return this.size
  }
}

// ****** helper functions ***** //
BinaryTree.searchTraverse = (value, currentNode) => {
  if(currentNode.getData() === value || !currentNode) {
    return currentNode
  }
  searchTraverse(value, currentNode.getLeft())
  searchTraverse(value, currentNode.getRight())
}

BinaryTree.insertTraverse = (leafNode, currentNode) => {

  if(leafNode.getData() < currentNode.getData()) {

    if(currentNode.getLeft()) {
      insertTraverse(leafNode, currentNode.getLeft())
    }
    else{
      currentNode.setLeft(leafNode)
    }

  }

  if(leafNode.getData() >= currentNode.getData()) {

    if(currentNode.getRight()) {
      insertTraverse(leafNode, currentNode.getLeft())
    }
    else{
      currentNode.setRight(leafNode)
    }

  }
}
BinaryTree.inOrderTraverse = (leafNode, callback) => {
  if(noChildren(leafNode)){
    callback(leafNode)
    return
  }

  if(leafNode.getLeft()) {
    BinaryTree.inOrderTraverse(leafNode.getLeft(), callback)
  }

  if(leafNode.getLeft() && leafNode.getRight()) {
    callback(leafNode)
    BinaryTree.inOrderTraverse(leafNode.getRight(), callback)
    return
  }

  if(leafNode.getRight()) {
    BinaryTree.inOrderTraverse(leafNode.getRight(), callback)
  }

  callback(leafNode)
}

BinaryTree.removeTraverse = (value, currentNode) => {
  if(currentNode.getRight().getData() === value) {
    if(noChildren(currentNode.getRight())) {
      currentNode.setRight()
    }
    let replaceNode = BinaryTree.replaceTraverse(currentNode)
    BinaryTree.replaceData(currentNode, replaceNode)
  }
  else if(currentNode.getLeft().getData() === value) {
    if(noChildren(currentNode.getLeft())) {
      currentNode.setLeft()
    }
    let replaceNode = BinaryTree.replaceTraverse(currentNode)
    BinaryTree.replaceData(currentNode, replaceNode)
  }
  else {
    if(value < currentNode.getData() && currentNode.getLeft()) {
      removeTraverse(value, currentNode.getLeft())
    }
    if(value >= currentNode.getData() && currentNode.getRight()) {
      removeTraverse(value, currentNode.getRight())
    }
  }
}

BinaryTree.replaceTraverse = (currentNode) => {
  while(!noChildren(currentNode)) {
    while(currentNode.getLeft()) {
      currentNode = currentNode.getLeft()
    }
    if(currentNode.getRight()) {
      currentNode = currentNode.getRight()
    }
  }
  return currentNode
}

BinaryTree.replaceData = (leafNodeOne, leafNodeTwo) => {
  leafNodeOne.storage.data = leafNodeTwo.storage.data
}

BinaryTree.inOrder = (leafNode, callback) => {
  if(noChildren(leafNode)){
    callback(leafNode)
    return
  }

  if(leafNode.getLeft()) {
    BinaryTree.inOrderTraverse(leafNode.getLeft(), callback)
  }

  if(leafNode.getLeft() && leafNode.getRight()) {
    callback(leafNode)
    BinaryTree.inOrderTraverse(leafNode.getRight(), callback)
    return
  }

  if(leafNode.getRight()) {
    BinaryTree.inOrderTraverse(leafNode.getRight(), callback)
  }

  callback(leafNode)
}

let noChildren = (leafNode) => {
  return !leafNode.getLeft() && !leafNode.getRight()
}
