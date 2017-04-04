import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import DirectedGraph from '../src/directed_graph'

chai.use(chaiChange)
  let dg

describe('DirectedGraph', () => {
  beforeEach(() => {
    dg = new DirectedGraph()
  })

  it('exists', () => {
    expect(DirectedGraph).to.be.a('function')
  })

  context('addVertex()', () => {
    it('adds vertex to graph', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addVertex('v3')
      expect(dg.count()).to.deep.equal(3)
    })
  })

  context('hasVertex()', () => {
    it('checks if vertex exists in graph', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addVertex('v3')
      expect(dg.hasVertex('v3')).to.deep.equal(true)
    })
  })

  context('addDirection(vertexA, vertexB, weight)', () => {
    it('gives direction and weight from vertexA to vertexB', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addDirection('v1','v2',5)
      expect(dg.graph['v1'].edges['v2']).to.deep.equal(5)
    })
  })

  context('hasDirection(vertexA, vertexB)', () => {
    it('returns true there is direction from vertexA to vertexB', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addDirection('v1','v2',5)
      expect(dg.hasDirection('v1','v2')).to.deep.equal(true)
    })
  })

  context('getDirectionWeight(vertexA, vertexB)', () => {
    it('returns weight of direction from vertexA to vertexB', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addDirection('v1','v2',5)
      expect(dg.getDirectionWeight('v1','v2')).to.deep.equal(5)
    })
  })

  context('visit(vertex, callback)', () => {
    it('returns weight of direction from vertexA to vertexB', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addVertex('v3')
      dg.addDirection('v1','v2',5)
      dg.addDirection('v2','v3',5)
      dg.addVertex('v4')
      dg.visit('v1',(element) => {element.edges['v4']=1})
      expect(dg.graph['v1'].edges['v4']).to.deep.equal(1)
      expect(dg.graph['v2'].edges['v4']).to.deep.equal(1)
      expect(dg.graph['v3'].edges['v4']).to.deep.equal(1)
    })
  })

  context('findShortestPath(vertexA, vertexB)', () => {
    it('returns array of shortest path from vertexA to vertexB', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addVertex('v3')
      dg.addVertex('v4')
      dg.addVertex('v5')
      dg.addVertex('v6')
      dg.addVertex('v7')
      dg.addDirection('v1','v2',5)
      dg.addDirection('v2','v7',7)
      dg.addDirection('v1','v3',1)
      dg.addDirection('v3','v4',1)
      dg.addDirection('v4','v5',1)
      dg.addDirection('v5','v6',1)
      dg.addDirection('v6','v7',1)
      expect(dg.findShortestPath('v1','v7')).to.deep.equal(5)
    })
  })

  it('findShortestPath(vertexA, vertexB)', () => {
    let vertices = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r']
    let directions = [{vertex1:'a', vertex2:'b', weight:1},{vertex1:'a', vertex2:'c', weight:3},{vertex1:'a', vertex2:'d', weight:2},
    {vertex1:'b', vertex2:'e', weight:2},{vertex1:'b', vertex2:'f', weight:3},
    {vertex1:'b', vertex2:'g', weight:1},{vertex1:'b', vertex2:'l', weight:2},
    {vertex1:'c', vertex2:'i', weight:3},{vertex1:'d', vertex2:'j', weight:2},
    {vertex1:'d', vertex2:'d', weight:3},{vertex1:'e', vertex2:'m', weight:2},
    {vertex1:'f', vertex2:'n', weight:3},{vertex1:'g', vertex2:'m', weight:1},
    {vertex1:'g', vertex2:'o', weight:1},{vertex1:'h', vertex2:'m', weight:2},
    {vertex1:'h', vertex2:'p', weight:2},{vertex1:'h', vertex2:'q', weight:1},
    {vertex1:'i', vertex2:'r', weight:2},{vertex1:'j', vertex2:'k', weight:3}]
    vertices.forEach(element => {dg.addVertex(element)})
    directions.forEach(element => {
      dg.addDirection(element.vertex1,element.vertex2,element.weight)
    })
    expect(dg.findShortestPath('a','e')).to.deep.equal(3)
  })



  context('removeDirection(vertexA, vertexB)', () => {
    it('removes weight of direction from vertexA to vertexB', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addVertex('v3')
      dg.addDirection('v1','v2',5)
      dg.addDirection('v2','v3',5)
      dg.removeDirection('v1','v2')
      expect(dg.graph['v1'].edges.hasOwnProperty('v2')).to.deep.equal(false)
    })
  })

  context('getSeperatedVertices()', () => {
    it('returns an array of seperated vertices', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addVertex('v3')
      expect(dg.getSeperatedVertices()).to.deep.equal(['v1','v2','v3'])
    })
  })

  context('removeVertex()', () => {
    it('removes vertex from graph', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addVertex('v3')
      dg.removeVertex('v3')
      expect(dg.graph.hasOwnProperty('v3')).to.deep.equal(false)
    })
  })

  context('count()', () => {
    it('returns count of vertices in the graph', () => {
      dg.addVertex('v1')
      dg.addVertex('v2')
      dg.addVertex('v3')
      expect(dg.count()).to.deep.equal(3)
    })
  })
})
