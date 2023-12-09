import { simulate } from "./src/simulate.ts";
import {
	nextArrivalTimeA,
	nextServiceTimeA,
	nextServiceTimeB,
	nextServiceTimeC,
} from "./src/functions.ts";

const N = 1_000_000;

console.log("Own implementation");
console.log(simulate(nextArrivalTimeA, nextServiceTimeA, N));
console.log(simulate(nextArrivalTimeA, nextServiceTimeB, N));
console.log(simulate(nextArrivalTimeA, nextServiceTimeC, N));
console.log(simulate(nextArrivalTimeA, nextServiceTimeA, N));
