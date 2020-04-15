import manhattanDistance from './Heuristic.js'
import InformedSearch from './InformedSearch.js';
const BFS = function (initial, goal, empty,maxItration) {
  InformedSearch.call(this, initial, goal, empty,maxItration);
}
BFS.prototype = Object.create(InformedSearch.prototype)

BFS.prototype.getValue = (node) => {
  return 0;
}
export default BFS;