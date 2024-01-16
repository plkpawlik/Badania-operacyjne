export function knapsack(items: { cost: number; gain: number }[], capacity: number): number {
	// step 1 :: init
	const memo = new Array(items.length + 1);

	// step 2 :: fill
	for (let i = 0; i < items.length + 1; i++) {
		memo[i] = new Array(capacity + 1).fill(NaN);
	}

	// step 3 :: exec
	return (function solve(n: number, b: number): number {
		// case 1 :: capacity limit
		if (b < 0) return Number.MIN_SAFE_INTEGER;

		// case 2 :: no items left
		if (b === 0 || n <= 0) return 0;

		// case 3 :: not in memo
		if (Number.isNaN(memo[n][b])) {
			const include = solve(n - 1, b - items[n - 1].cost) + items[n - 1].gain;
			const exclude = solve(n - 1, b);

			// save in memo
			memo[n][b] = Math.max(include, exclude);
		}

		// solution
		return memo[n][b];
	})(items.length, capacity);
}
