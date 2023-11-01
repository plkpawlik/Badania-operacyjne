import { Solve } from "./solve.ts";

export class BellmanFord extends Solve {
	solve(startNode: number = 0): [number, number[]][] {
		// init nodes
		this.costs = new Array(this.graph.size).fill(Infinity);
		this.prevs = new Array(this.graph.size).fill(NaN);

		// first node
		this.costs[startNode] = 0;

		// algorithm
		for (let i = 0; i < this.graph.size - 1; i++) {
			for (let u = 0; u < this.graph.size; u++) {
				for (let v = 0; v < this.graph.size; v++) {
					if (this.isBetterNode(u, v)) {
						this.costs[v] = this.costs[u] + this.graph.getCost(u, v);
						this.prevs[v] = u;
					}
				}
			}
		}

		// return solution
		return this.costs.map((cost, node) => [
			cost,
			this.getRoute(node),
		]);
	}

	private isBetterNode(u: number, v: number): boolean {
		const currCost = this.graph.getCost(u, v);
		const prevCost = this.costs[u] + currCost;

		return currCost > 0 && prevCost < this.costs[v];
	}
}
