import HashSet from 'hashset'; 
import Queue from 'queue-fifo'
// HashSet = require('hashset');
// Queue = require('queue-fifo');
// log = console.log;
class BFS {
  constructor(initial, goal, empty) {
    this.initial = initial;
    this.goal = goal;
    this.empty = empty;
    this.visited = new HashSet();
    this.fringe = new Queue(); // TODO: add fringe
    this.fringe.enqueue(initial);
  }
  execute() {
    // Add current state to visited list
    //   log(this.fringe.length);
    this.visited.add(this.initial.strRepresentation);
    console.log(this.fringe.size());
    while (this.fringe.size() > 0) {
      var current = this.fringe.dequeue();
      // log(current)
      if (current.strRepresentation == this.goal.strRepresentation)
        return current;
      this.expandNode(current);
    }
  }
  expandNode(node) {
    // log(node)
    var temp = '';
    var newState = '';
    var col = node.emptyCol;
    var row = node.emptyRow;
    var newNode = '';
    // Up
    if (row > 0) {
      newState = node.state.clone();
      temp = newState[row - 1][col];
      newState[row - 1][col] = this.empty;
      newState[row][col] = temp;
      newNode = new Node(0, newState, row - 1, col, node.depth + 1);
      if (!this.visited.contains(newNode.strRepresentation)) {
        newNode.value = newNode.depth;
        newNode.path = node.path + 'd';
        this.fringe.enqueue(newNode);
        this.visited.add(newNode.strRepresentation);
      }
    }
    // Down
    if (row < node.size - 1) {
      newState = node.state.clone();
      temp = newState[row + 1][col];
      newState[row + 1][col] = this.empty;
      newState[row][col] = temp;
      newNode = new Node(0, newState, row + 1, col, node.depth + 1);
      if (!this.visited.contains(newNode.strRepresentation)) {
        newNode.value = newNode.depth;
        newNode.path = node.path + 'u';
        this.fringe.enqueue(newNode);
        this.visited.add(newNode.strRepresentation);
      }
    }
    // Left
    if (col > 0) {
      newState = node.state.clone();
      temp = newState[row][col - 1];
      newState[row][col - 1] = this.empty;
      newState[row][col] = temp;
      newNode = new Node(0, newState, row, col - 1, node.depth + 1);
      if (!this.visited.contains(newNode.strRepresentation)) {
        newNode.value = newNode.depth;
        newNode.path = node.path + 'r';
        this.fringe.enqueue(newNode);
        this.visited.add(newNode.strRepresentation);
      }
    }
    // Right
    if (col < node.size - 1) {
      newState = node.state.clone();
      temp = newState[row][col + 1];
      newState[row][col + 1] = this.empty;
      newState[row][col] = temp;
      newNode = new Node(0, newState, row, col + 1, node.depth + 1);
      if (!this.visited.contains(newNode.strRepresentation)) {
        newNode.value = newNode.depth;
        newNode.path = node.path + 'l';
        this.fringe.enqueue(newNode);
        this.visited.add(newNode.strRepresentation);
      }
    }
  }
}

class Node {
  constructor(value, state, emptyRow, emptyCol, depth) {
    this.value = value;
    this.state = state;
    this.emptyCol = emptyCol;
    this.emptyRow = emptyRow;
    this.depth = depth;
    this.strRepresentation = '';
    this.path = '';
    // String representation of the state in CSV format
    for (var i = 0; i < state.length; i++) {
      // We assume the state is a square
      if (state[i].length != state.length) {
        console.log('Number of rows differs from number of columns');
        return false;
      }
      for (var j = 0; j < state[i].length; j++)
        this.strRepresentation += state[i][j] + ',';
    }
    this.size = this.state.length;
  }
}


Array.prototype.clone = function() {
  return JSON.parse(JSON.stringify(this));
};
function createGoalState(n) {
  let array = [];
  let array2D = [];
  for (let i = 1; i < n * n; i++) {
    array.push(i);
  }
  array.push(0);
  while (array.length) array2D.push(array.splice(0, n));
  return new Node(0, array2D, n, n, 0);
}

function convertState(array, n) {
  // Node(value, state, emptyRow, emptyCol, depth)

  let array2D = [],
    emptyRow,
    emptyCol,
    i,
    k;
  for (i = 0, k = -1; i < array.length; i++) {
    if (i % n === 0) {
      // add new row
      k++;
      array2D[k] = [];
    }
    // push column
    if (array[i] == 0) {
      emptyRow = k;
      emptyCol = i % n;
    }
    array2D[k].push(array[i]);
  }
  // let ourState = [0, array2D, emptyRow, emptyCol, 0];
  return new Node(0, array2D, emptyRow, emptyCol, 0);
}
export default BFS