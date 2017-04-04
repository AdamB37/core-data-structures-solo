import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import BinaryTree from '../src/binary_tree'

let bt
describe('BinaryTree()', () => {
  beforeEach(() => {
    bt = new BinaryTree()
  })

  it('exists', () => {
    expect(BinaryTree).to.be.a('function')
  })

  it('insert()', () => {
    expect(() =>
    bt.insert({data: 'asuh', left: null, right: null}))
    .to.alter(() => bt.count(), {from: 0, to:1})
  })
})
