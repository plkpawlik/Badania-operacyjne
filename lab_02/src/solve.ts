import { Graph } from "./graph.ts";

export abstract class Solve {
	protected costs!: number[];
	protected prevs!: number[];

	constructor(
		readonly graph: Graph,
	) {}

	abstract solve(startNode: number): [number, number[]][];

	protected getRoute(node: number): number[] {
		if (this.costs[node] === Infinity) return [];

		const route = [node];

		while (!Number.isNaN(this.prevs[node])) {
			route.push(node = this.prevs[node]);
		}

		return route.reverse();
	}
}
