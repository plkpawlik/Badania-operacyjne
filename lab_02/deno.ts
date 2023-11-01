import { data5 } from "./mock.ts";
import { Graph } from "./src/graph.ts";
import { BellmanFord } from "./src/solve.BellmanFord.ts";
import { Dijkstra } from "./src/solve.Dijkstra.ts";

const graph = new Graph(data5.size, data5.data);

console.log(new BellmanFord(graph).solve());
console.log(new Dijkstra(graph).solve());
