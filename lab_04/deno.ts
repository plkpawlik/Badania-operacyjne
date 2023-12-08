import { nextArrivalTimeA, nextServiceTimeA } from "./src/functions.ts";
import { tRequest } from "./src/requests.ts";

const N = 100_000_000;

/*   *   *   *   *   *   *   *   *   *   */
/*   *   *   *   *   *   *   *   *   *   */

let nextArrivalTime: number;
let nextServiceTime: number;
let totalDelayTime = 0;

let curr: tRequest;
let prev: tRequest = {
	arrivalTime: 0,
	serviceTime: 0,
	removalTime: 0,
};

/*   *   *   *   *   *   *   *   *   *   */
/*   *   *   *   *   *   *   *   *   *   */

for (let n = 0; n < N; n++) {
	nextArrivalTime = nextArrivalTimeA();
	nextServiceTime = nextServiceTimeA();

	curr = {
		arrivalTime: nextArrivalTime + prev.arrivalTime,
		serviceTime: nextServiceTime,
		removalTime: Infinity,
	};

	/*   *   *   *   *   *   *   *   */

	const accumulatedDelayTime = Math.min(0, curr.arrivalTime - prev.removalTime);
	const expectedRemovalTime = curr.arrivalTime + curr.serviceTime;

	curr.removalTime = expectedRemovalTime - accumulatedDelayTime;
	totalDelayTime += curr.removalTime - expectedRemovalTime;

	prev = curr;
}

console.log(totalDelayTime / N);
