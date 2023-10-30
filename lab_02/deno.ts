import { data5 } from "./mock.ts";
import { Graph } from "./src/graph.ts";

const graph = new Graph(data5.size, data5.data);

console.log(graph.BellmanFord());
