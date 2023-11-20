import { Graph } from "./src/graph.ts";
import { readData } from "./src/read.ts";
import { BFSi, BFSr } from "./src/solve.bfs.ts";
import { DFSi, DFSr } from "./src/solve.dfs.ts";
import { solve } from "./src/solve.ts";
import { benchmark } from "./src/time.ts";
import { $ } from "./src/util.ts";

const data = readData(Deno.args[0]);
const graph = new Graph(data.size, data.data);

benchmark(() => solve(graph, 0, graph.size - 1, BFSi), 1e3);
benchmark(() => solve(graph, 0, graph.size - 1, BFSr), 1e3);
benchmark(() => solve(graph, 0, graph.size - 1, DFSi), 1e3);
benchmark(() => solve(graph, 0, graph.size - 1, DFSr), 1e3);

// calculate solutions
const flow1 = solve(graph, 0, graph.size - 1, BFSi);
const flow2 = solve(graph, 0, graph.size - 1, BFSr);
const flow3 = solve(graph, 0, graph.size - 1, DFSi);
const flow4 = solve(graph, 0, graph.size - 1, DFSr);

// print solutions
console.log("BFS (iterative) ::", flow1[0], $(flow1[1].data));
console.log("BFS (recursive) ::", flow2[0], $(flow2[1].data));
console.log("DFS (iterative) ::", flow3[0], $(flow3[1].data));
console.log("DFS (recursive) ::", flow4[0], $(flow4[1].data));
