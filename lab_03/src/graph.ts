export class Graph {
	constructor(
		readonly size: number,
		readonly data: number[][],
	) {}

	clone(): Graph {
		return new Graph(this.size, structuredClone(this.data));
	}
}
