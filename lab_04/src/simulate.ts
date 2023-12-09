import { tRequest } from "./requests.ts";

export function simulate(
	getNextArrivalTime: () => number,
	getNextServiceTime: () => number,
	numRequests: number,
) {
	let nextArrivalTime: number;
	let nextServiceTime: number;
	let sumDelays = 0;
	let numDelays = 0;

	let curr: tRequest;
	let prev: tRequest = {
		arrivalTime: 0,
		serviceTime: 0,
		removalTime: 0,
	};

	/*   *   *   *   *   *   *   *   */
	/*   *   *   *   *   *   *   *   */

	for (let n = 0; n < numRequests; n++) {
		// calc next request properties
		nextArrivalTime = getNextArrivalTime();
		nextServiceTime = getNextServiceTime();

		curr = {
			arrivalTime: nextArrivalTime + prev.arrivalTime,
			serviceTime: nextServiceTime,
			removalTime: Infinity,
		};

		// calc next request delay
		const accumulatedDelayTime = Math.min(0, curr.arrivalTime - prev.removalTime);
		const expectedRemovalTime = curr.arrivalTime + curr.serviceTime;

		curr.removalTime = expectedRemovalTime - accumulatedDelayTime;
		numDelays += curr.removalTime - expectedRemovalTime > 0 ? 1 : 0;
		sumDelays += curr.removalTime - expectedRemovalTime;

		// prepare for next iter
		prev = curr;
	}

	/*   *   *   *   *   *   *   *   */
	/*   *   *   *   *   *   *   *   */

	return ({
		" Num delays [n] ": numDelays,
		" Sum delays [s] ": sumDelays,
		"Mean delay  [s] ": sumDelays / numRequests,
	});
}
