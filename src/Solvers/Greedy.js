import manhattanDistance from './Heuristic.js'
import InformedSearch from './InformedSearch.js';
const Greedy = function (initial, goal, empty,maxItration) {
  InformedSearch.call(this, initial, goal, empty,maxItration);
};
Greedy.prototype = Object.create(InformedSearch.prototype)

Greedy.prototype.getValue = (node) => {
  return manhattanDistance(node);
}
export default Greedy;