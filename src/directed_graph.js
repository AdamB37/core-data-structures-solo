class Node {
  constructor(edges = {}){
    this.edges = edges
  }

}

function recursiveVisit(vertex, callback, graph) {
  if(Object.keys(graph[vertex].edges).length > 0) {
      for (let key in graph[vertex].edges) {
        recursiveVisit(key, callback, graph)
      }
  }
  return callback(graph[vertex])


}

function recursiveShortestPath(vertexA, vertexB, graph, travelled = [], paths = [] ,distance = 0) {
  console.log('vertexA ', vertexA,'vertexB ',vertexB, 'edges of A ');
  if(vertexB in graph[vertexA].edges) {
    travelled.push(vertexB)
    distance += graph[vertexA].edges[vertexB]
    return {travelled: travelled, distance: distance}
  } else {
    let tempDistance = 0
    for (let key in graph[vertexA].edges) {
      if(Object.keys(graph[key].edges).length > 0){
      travelled.push(key)
      tempDistance = distance + graph[vertexA].edges[key]
      console.log(graph[vertexA].edges,vertexB)
        paths.push(recursiveShortestPath(key, vertexB, graph, travelled, paths, tempDistance ))
      }
    }
  }
  return paths
}

class DirectedGraph {
  constructor(graph = {}){
    this.graph = graph
  }
  addVertex(vertex) {
    this.graph[vertex] = new Node()
  }

  hasVertex(vertex) {
    return this.graph.hasOwnProperty(vertex)
  }

  addDirection(vertexA, vertexB, weight = 0) {
    this.graph[vertexA].edges[vertexB] = weight
  }

  hasDirection(vertexA, vertexB) {
    return this.graph[vertexA].edges[vertexB] > 0 // assumption: zero is no weight
  }

  getDirectionWeight(vertexA, vertexB) {
    return this.graph[vertexA].edges[vertexB]
  }

  visit(vertex, callback) {
    if(this.graph[vertex]){
      recursiveVisit(vertex, callback, this.graph)
    }
  }

  findShortestPath(vertexA, vertexB) {
    let paths
    if(this.graph[vertexA] && this.graph[vertexB]) {
      paths = recursiveShortestPath(vertexA, vertexB, this.graph)
    }
    let shortestDistance = Infinity
    for (let obj of paths) {
      if(obj && obj.distance < shortestDistance){
        shortestDistance = obj.distance
      }
    }
    return shortestDistance
  }

  removeDirection(vertexA, vertexB) {
    delete this.graph[vertexA].edges[vertexB]
  }

  getSeperatedVertices() {
    let seperated = []
    for (let key in this.graph) {
      if(Object.keys(this.graph[key].edges).length === 0) {
        seperated.push(key)
      }
    }
    return seperated
  }

  removeVertex(vertex) {
    for (let key in this.graph) {
      delete this.graph[key].edges[vertex]
    }
    delete this.graph[vertex]
  }

  count() {
    return Object.keys(this.graph).length
  }
}
export default DirectedGraph
