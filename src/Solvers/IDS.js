import DFS from './DFS';
import DFSCustomVisilList from './DFSCustom';
function IDS(initial, goal, empty, delta, hasVisitList, maxItration) {
  this.initial = initial;
  this.goal = goal;
  this.empty = empty;
  this.delta = delta;
  this.hasVisitList = hasVisitList;
  this.maxItration = maxItration;
}

IDS.prototype.execute = function () {
  let i = 0;
  /*
  path: current.path,
                depth: current.depth,
                maxSize,
                visitedSize: this.visited.length,
                maxQueueSize,
                numberOfExpandedNodes: this.numberOfExpandedNodes,
                numberOfNodesDroppedByVisit: this.numberOfNodesDroppedByVisit,
                numberOfGoalTests,
                totalTime: Date.now() - timeStart,
  */
  let timeStart = Date.now();
  let result;
  while (true) {

    let dfs;
    if (!this.hasVisitList)
      dfs = new DFS(this.initial, this.goal, this.empty, i, this.maxItration - (result && result.numberOfGoalTests ? result.numberOfGoalTests : 0));
    else
      dfs = new DFSCustomVisilList(this.initial, this.goal, this.empty, i, this.maxItration - (result && result.numberOfGoalTests ? result.numberOfGoalTests : 0))
    i += this.delta;
    let res = dfs.execute();
    if (!result)
      result = res;
    else {
      result.path = res.path;
      result.depth = res.depth;
      result.maxSize = Math.max(res.maxSize, result.maxSize);
      result.visitedSize = Math.max(res.visitedSize, result.visitedSize);
      result.maxQueueSize = Math.max(res.maxQueueSize, result.maxQueueSize);
      result.numberOfExpandedNodes += res.numberOfExpandedNodes;
      result.numberOfNodesDroppedByVisit += res.numberOfNodesDroppedByVisit;
      result.numberOfGoalTests += res.numberOfGoalTests;
      result.totalTime = Date.now() - timeStart;
      if (result.numberOfGoalTests >= this.maxItration)
        return result;
    }
    // console.log(res.path);

    if (res.path)
      return res;
  }
}

export default IDS
