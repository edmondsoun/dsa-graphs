/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    //we need to remove point A
    for (let neighbor of vertex.adjacent) {
      this.removeEdge(neighbor, vertex);
    }

    this.nodes.delete(vertex);

  }

  /** traverse graph with DFS and returns array of Node values */
  // depthFirstSearch(start, seen = new Set([start]), nodeValues = [start.value]) {
  //   for (let neighbor of start.adjacent) {
  //     if (!seen.has(neighbor)) {
  //       seen.add(neighbor);
  //       nodeValues.push(neighbor.value);
  //       return this.depthFirstSearch(neighbor, seen, nodeValues);
  //     }
  //   }
  //   return nodeValues;
  // }

  //with a while loop
  //with a stack
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let result = [];
    let seen = new Set(toVisitStack);

    seen.add(start)

    while (toVisitStack.length > 0) {
      let currPerson = toVisitStack.pop();
      result.push(currPerson.value)

      for (let neighbor of currPerson.adjacent) {
        if(!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }

    return result;

  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let result = [start.value];

    while (toVisitStack.length > 0) {
      let currPerson = toVisitStack.pop();


      for (let neighbor of currPerson.adjacent) {
        if(!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
          result.push(neighbor.value)
        }
      }
    }

    return result;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  // graph is unweighted and undirected

  // 
  distanceOfShortestPath(start, end) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let counter = 0;

    if (start.value === undefined || end.value === undefined) return undefined;

    while (!toVisitStack.includes(end)) {
      let currPerson = toVisitStack.pop();
      console.log("currPerson:",currPerson)

      for (let neighbor of currPerson.adjacent) {
        if(!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
      counter++;
    }

    return counter;
  }
}

module.exports = { Graph, Node };


// let graph = new Graph()

// let r = new Node("R");
// let i = new Node("I");
// let t = new Node("T");
// let h = new Node("H");
// let m = new Node("M");

// graph.addVertices([r, i, t, h, m])

// graph.addEdge(r, i)
// graph.addEdge(r, t)
// graph.addEdge(r, h)
// graph.addEdge(i, t)
// graph.addEdge(t, h)
// graph.addEdge(h, m)

// graph.distanceOfShortestPath(r, m) // 2