import { nextArrivalTimeA, nextServiceTimeA } from "./src/functions.ts";

const N = 10_000_000;

let nextArrivalTime: number;
let nextServiceTime: number;
let simulationTime = 0;
let totalDelayTime = 0;

const queue: {
	arrivalTime: number;
	serviceTime: number;
	removalTime: number;
}[] = [];

/*   *   *   *   *   *   *   *   *   *   */
/*   *   *   *   *   *   *   *   *   *   */

for (let n = 0; n < N; n++) {
	nextArrivalTime = nextArrivalTimeA();
	nextServiceTime = nextServiceTimeA();

	queue.push({
		arrivalTime: nextArrivalTime + simulationTime,
		serviceTime: nextServiceTime,
		removalTime: Infinity,
	});

	simulationTime += nextArrivalTime;

	if (n === 0) continue;
}

queue[0].removalTime = queue[0].arrivalTime + queue[0].serviceTime;

for (let n = 1; n < N; n++) {
	const accumulatedDelayTime = Math.max(0, queue[n - 1].removalTime - queue[n].arrivalTime);
	const expectedRemovalTime = queue[n].arrivalTime + queue[n].serviceTime;

	queue[n].removalTime = expectedRemovalTime + accumulatedDelayTime;

	totalDelayTime += queue[n].removalTime - expectedRemovalTime;
}

/*   *   *   *   *   *   *   *   *   *   */
/*   *   *   *   *   *   *   *   *   *   */

console.log(queue);
console.log(
	queue.reduce(
		(prev, curr) => prev + (curr.removalTime - (curr.arrivalTime - curr.serviceTime)),
		0,
	),
);
console.log(
	queue.reduce(
		(prev, curr) => prev + (curr.removalTime - (curr.arrivalTime - curr.serviceTime)),
		0,
	) / N,
);
