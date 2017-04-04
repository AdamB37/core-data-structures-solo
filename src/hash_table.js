class HashEntry {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
  }
}
export default class HashTable {

  constructor() {
    this.currentSize = 0
    this.storageMax = 128
    this.storage = []
  }

  put(key, value) {
    let hash = HashTable.hash(key) % this.storageMax

    if(this.storage[hash]) {
      this.storage[hash].insertNode(key, value)
    } else {
      this.storage[hash] = new Bucket(new HashEntry(key, value))
    }

    this.currentSize += 1

    if(this.currentSize / this.storageMax >= 0.75) {
        this.storageMax *= 2
        this.resize()
    }
  }

  get(key) {
    let hash = HashTable.hash(key) % this.storageMax
    let value = this.storage[hash]? this.storage[hash].getNode(key) : undefined
    return value
  }

  contains(key) {
    let hash = HashTable.hash(key) % this.storageMax
    return this.storage[hash]? this.storage[hash].getNode(key) !== null : false
  }

  iterate(callback) {
    this.storage.forEach(linkedList => linkedList.map(callback))
  }

  remove(key) {
    let hash = HashTable.hash(key) % this.storageMax

    if(this.storage[hash]) {
      this.storage[hash].removeNode(key)
      this.currentSize -= 1

      if (this.currentSize / this.storageMax <= 0.25) {
        this.storageMax /= 2
        this.resize()
      }
    }
  }

  size() {
    return this.currentSize
  }

  resize() {
      let oldStorage = this.storage.slice()
      this.storage = []

      oldStorage.forEach(bucket => {
        if(bucket) {
          let hash =  HashTable.hash(bucket.getHeadNode().key)
          this.storage[hash] = bucket
        }
      })
  }

}

HashTable.hash = (string) => {
    let hash = 0
    let char = ''
    let charArray = string.split('')

    if (string.length === 0) {
        return hash
    }

    charArray.forEach((element) => {
        char = element.charCodeAt(0)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    })

    return hash
}


class Bucket {
  constructor(node = null) {
    this.root = node
  }

  getHeadNode() {
    return this.root
  }

  setHeadNode(node) {
    node.next = this.root
    this.root = node
  }

  getNode(key) {
    let matchedNode = findNode(key, this.getHeadNode())
    return matchedNode ? matchedNode.value : null
  }

  insertNode(key, value) {
    this.setHeadNode(new HashEntry(key,value))
  }

  removeNode(key) {
    let matchedNode = findPreNode(key, this.getHeadNode())
    if(matchedNode) {
      matchedNode.next = matchedNode.next? matchedNode.next.next : null
    }
  }

  getSize() {
    let size = 0
    let currentNode = this.getHeadNode()

    while(currentNode) {
      size += 1
      currentNode = currentNode.next
    }

    return size
  }

  map(callback) {
    let currentNode = this.getHeadNode()

    while(currentNode) {
      callback(currentNode.key, currentNode.value)
      currentNode = currentNode.next
    }

  }

}


//****** helper functions ******//
let findNode = (key, startNode) => {
  let currentNode = startNode

  while(currentNode && currentNode.key !== key) {
    currentNode = currentNode.next
  }

  return currentNode
}

let findPreNode = (key, startNode) => {
  let currentNode = startNode

  while(currentNode.next && currentNode.next.key !== key) {
    currentNode = currentNode.next
  }
  
  return currentNode
}
