import { read } from "./src/read.ts";
import { time } from "./src/time.ts";
import { TSP as TSPdynamic } from "./src/tsp.dynamic.ts";
import { TSP as TSPrecurse } from "./src/tsp.recurse.ts";

// Read
const data = read(Deno.args[0]);

// Test
console.log("Testing: ", Deno.args[0]);
console.log("Recurse: ", time(() => TSPrecurse(data)).toFixed(3).padStart(9, " "), "ms");
console.log("Dynamic: ", time(() => TSPdynamic(data)).toFixed(3).padStart(9, " "), "ms");
