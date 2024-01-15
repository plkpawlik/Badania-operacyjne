export function TSP(dist: number[][]): number {
	// step 1 :: init
	const size = dist.length;

	// step 2 :: exec
	return (function solve(cost: number, mask: number, node: number): number {
		// case 1 :: all nodes visited
		if (mask === ((1 << size) - 1)) {
			return dist[node][0];
		}

		// case 2 :: compute paths resurse
		for (let nextNode = 0; nextNode < size; nextNode++) {
			if ((mask & (1 << nextNode)) !== 0) continue;

			const nextMask = mask | (1 << nextNode);
			const nestCost = dist[node][nextNode] + solve(cost, nextMask, nextNode);

			cost = Math.min(cost, nestCost);
		}

		return cost;
	})(Infinity, 1, 0);
}
