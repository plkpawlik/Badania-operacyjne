import * as ext from "./src/functions.ext.ts";
import * as std from "./src/functions.std.ts";
import { simulate } from "./src/simulate.ts";

const N = 100_000_000;

// Test EXT
console.log("Ext implementation");
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeA, N));
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeB, N));
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeC, N));
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeA, N));

// Test LCG
console.log("Lcg implementation");
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeA, N));
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeB, N));
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeC, N));
console.log(simulate(ext.nextArrivalTimeA, ext.nextServiceTimeA, N));

// Test STD
console.log("Std implementation");
console.log(simulate(std.nextArrivalTimeA, std.nextServiceTimeA, N));
console.log(simulate(std.nextArrivalTimeA, std.nextServiceTimeB, N));
console.log(simulate(std.nextArrivalTimeA, std.nextServiceTimeC, N));
console.log(simulate(std.nextArrivalTimeA, std.nextServiceTimeA, N));
