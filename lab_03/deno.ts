import { data5 } from "./mock.ts";
import { Graph } from "./src/graph.ts";
import { solveFordFulkerson } from "./src/solve.FordFulkerson.ts";

const graph = new Graph(data5.size, data5.data);

console.log(solveFordFulkerson(graph, 0, graph.size - 1));
