import manhattanDistance from './Heuristic.js'
import InformedSearch from './InformedSearch.js';
const AStar = function (initial, goal, empty,maxItration) {
  InformedSearch.call(this, initial, goal, empty,maxItration);
}
AStar.prototype = Object.create(InformedSearch.prototype)

AStar.prototype.getValue = (node) => {
  return node.depth * 2 + manhattanDistance(node);
}
export default AStar;