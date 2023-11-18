import { Graph } from "./src/graph.ts";
import { readData } from "./src/read.ts";
import { solveFordFulkerson } from "./src/solve.FordFulkerson.ts";

const data = readData(Deno.args[0]);
const graph = new Graph(data.size, data.data);

const flow1 = solveFordFulkerson(graph, 0, graph.size - 1);
const flow2 = solveFordFulkerson(graph, 0, graph.size - 1);

console.log(flow1 === flow2, flow1, flow2);
