export function TSP(dist: number[][]): number {
	// step 1 :: init
	const size = dist.length;
	const memo = new Array(1 << size);

	// step 2 :: fill
	for (let i = 0; i < (1 << size); i++) {
		memo[i] = new Array(size).fill(-1);
	}

	// step 3 :: exec
	return (function solve(cost: number, mask: number, node: number): number {
		// case 1 :: all nodes visited
		if (mask === ((1 << size) - 1)) {
			return dist[node][0];
		}

		// case 2 :: path already computedd
		if (memo[mask][node] !== -1) {
			return memo[mask][node];
		}

		// case 3 :: compute paths resurse
		for (let nextNode = 0; nextNode < size; nextNode++) {
			if ((mask & (1 << nextNode)) !== 0) continue;

			const nextMask = mask | (1 << nextNode);
			const nestCost = dist[node][nextNode] + solve(cost, nextMask, nextNode);

			cost = Math.min(cost, nestCost);
		}

		return memo[mask][node] = cost;
	})(Infinity, 1, 0);
}
