import * as ext from "./src/functions.ext.ts";
import * as own from "./src/functions.own.ts";
import { simulate } from "./src/simulate.ts";

const N = 1_000_000;

// Test 1
console.log("Ext implementation");
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeA, N));
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeB, N));
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeC, N));
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeA, N));

// Test 2
console.log("Own implementation");
console.log(simulate(own.nextArrivalTimeA, own.nextServiceTimeA, N));
console.log(simulate(own.nextArrivalTimeA, own.nextServiceTimeB, N));
console.log(simulate(own.nextArrivalTimeA, own.nextServiceTimeC, N));
console.log(simulate(own.nextArrivalTimeA, own.nextServiceTimeA, N));
