import { nextArrivalTimeA, nextServiceTimeA } from "./src/functions.ts";
import { tRequest } from "./src/requests.ts";

const N = 10_000_000;

let nextArrivalTime: number;
let nextServiceTime: number;
let simulationTime = 0;
let totalDelayTime = 0;

const queue: tRequest[] = [];

/*   *   *   *   *   *   *   *   *   *   */
/*   *   *   *   *   *   *   *   *   *   */

let next: tRequest;
let prev: tRequest = {
	arrivalTime: NaN,
	serviceTime: NaN,
	removalTime: 0,
};

for (let n = 0; n < N; n++) {
	nextArrivalTime = nextArrivalTimeA();
	nextServiceTime = nextServiceTimeA();

	queue.push({
		arrivalTime: nextArrivalTime + simulationTime,
		serviceTime: nextServiceTime,
		removalTime: Infinity,
	});

	simulationTime += nextArrivalTime;

	/*   *   *   *   *   *   *   *   */

	const accumulatedDelayTime = Math.min(0, queue[0].arrivalTime - prev.removalTime);
	const expectedRemovalTime = queue[0].arrivalTime + queue[0].serviceTime;

	queue[0].removalTime = expectedRemovalTime - accumulatedDelayTime;
	totalDelayTime += queue[0].removalTime - expectedRemovalTime;

	prev = queue.shift()!;
}

console.log(totalDelayTime / N);
