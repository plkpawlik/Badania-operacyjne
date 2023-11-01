import { Graph } from "./src/graph.ts";
import { readData } from "./src/read.ts";
import { BellmanFord } from "./src/solve.BellmanFord.ts";
import { Dijkstra } from "./src/solve.Dijkstra.ts";
import { benchmark } from "./src/time.ts";

const data = readData(Deno.args[0]);
const graph = new Graph(data.size, data.data);

benchmark(() => new BellmanFord(graph).solve());
benchmark(() => new Dijkstra(graph).solve());

// calculate solutions
const solution1 = new BellmanFord(graph).solve();
const solution2 = new BellmanFord(graph).solve();

// compare solutions
console.log(JSON.stringify(solution1) === JSON.stringify(solution2));

// print solutions
console.log("BellmanFord ::", solution1);
console.log("   Dijkstra ::", solution2);
