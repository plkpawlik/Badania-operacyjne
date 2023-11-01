export class Graph {
	constructor(
		readonly size: number,
		readonly data: number[],
	) {}

	getCost(u: number, v: number): number {
		return this.data[this.size * u + v];
	}
}
