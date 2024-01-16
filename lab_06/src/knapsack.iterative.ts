export function knapsack(items: { cost: number; gain: number }[], capacity: number): number {
	// step 1 :: init
	const memo = new Array(items.length + 1);

	// step 2 :: fill
	for (let i = 0; i < items.length + 1; i++) {
		memo[i] = new Array(capacity + 1).fill(0);
	}

	// step 3 :: calc
	for (let i = 1; i <= items.length; i++) {
		for (let j = 0; j <= capacity; j++) {
			if (items[i - 1].cost > j) {
				memo[i][j] = memo[i - 1][j];
			} else {
				const include = memo[i - 1][j - items[i - 1].cost] + items[i - 1].gain;
				const exclude = memo[i - 1][j];

				// save in memo
				memo[i][j] = Math.max(include, exclude);
			}
		}
	}

	// solution
	return memo[items.length][capacity];
}
