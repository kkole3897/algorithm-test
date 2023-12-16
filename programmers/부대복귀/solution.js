function solution(n, roads, sources, destination) {
  const graph = initGraph(n);
  connect(graph, roads);
  
  const costs = new Array(n + 1).fill(-1);
  costs[destination] = 0;
  const queue = [destination]
  
  while (queue.length > 0) {
    const cur = queue.shift();
    
    const connections = graph.get(cur);
    
    for (const conn of connections) {
      if (costs[conn] !== -1) continue;
      
      costs[conn] = costs[cur] + 1;
      queue.push(conn);
    }
  }
  
  const answer = sources.map((s) => costs[s]);
  
  return answer;
}

function initGraph(n) {
  const arr = new Array(n).fill(0).map((_, index) => {
    return [index + 1, []];
  });
  const graph = new Map(arr);
  
  return graph;
}

function connect(graph, roads) {
  for (const [v1, v2] of roads) {
    const connections1 = graph.get(v1);
    const connections2 = graph.get(v2);
    
    graph.set(v1, [...connections1, v2]);
    graph.set(v2, [...connections2, v1]);
  }
}
