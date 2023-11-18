export function benchmark(callback: () => void, nIter = 1000): void {
	let dt = 0;
	let t0 = NaN;
	let t1 = NaN;

	for (let i = 0; i < nIter; i++) {
		t0 = performance.now();

		callback();

		t1 = performance.now();

		dt = dt + (t1 - t0);
	}

	console.log(`Avg. time :: ${(dt / nIter).toFixed(9)}`);
}
