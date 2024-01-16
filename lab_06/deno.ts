import { knapsack as kanpsnack_i } from "./src/knapsack.iterative.ts";
import { knapsack as kanpsnack_r } from "./src/knapsack.recursive.ts";
import { read } from "./src/read.ts";
import { time } from "./src/time.ts";

const data = read(Deno.args[0]);

console.log("size\titerative\trecursive");

for (const list of data) {
	const size = list.length;
	const t1 = time(() => kanpsnack_i(list, size)).toFixed(3);
	const t2 = time(() => kanpsnack_r(list, size)).toFixed(3);

	console.log(`${size}\t${t1}\t${t2}`);
}
