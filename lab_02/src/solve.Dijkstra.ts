import { Solve } from "./solve.ts";

export class Dijkstra extends Solve {
	private visitedNodes!: boolean[];

	solve(startNode: number = 0): [number, number[]][] {
		this.visitedNodes = new Array(this.graph.size).fill(false);

		// init nodes
		this.costs = new Array(this.graph.size).fill(Infinity);
		this.prevs = new Array(this.graph.size).fill(NaN);

		// first node
		this.costs[startNode] = 0;

		// algorithm
		for (let i = 0; i < this.graph.size; i++) {
			const u = this.findNextNode();

			if (Number.isNaN(u)) continue;

			this.visitedNodes[u] = true;

			for (let v = 0; v < this.graph.size; v++) {
				if (this.isBetterNode(u, v)) {
					this.costs[v] = this.costs[u] + this.graph.getCost(u, v);
					this.prevs[v] = u;
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
		if (this.visitedNodes[v]) return false;

		const currCost = this.graph.getCost(u, v);
		const prevCost = this.costs[u] + currCost;

		return currCost > 0 && prevCost < this.costs[v];
	}

	private findNextNode(): number {
		let value = Infinity;
		let index = NaN;

		for (let i = 0; i < this.graph.size; i++) {
			if (!this.visitedNodes[i] && this.costs[i] < value) {
				value = this.costs[i];
				index = i;
			}
		}

		return index;
	}
}
