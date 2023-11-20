export class Graph {
	static zeros(size: number): Graph {
		const data = new Array(size);

		for (let i = 0; i < size; i++) {
			data[i] = new Array(size).fill(0);
		}

		return new Graph(size, data);
	}

	constructor(
		readonly size: number,
		readonly data: number[][],
	) {}

	clone(): Graph {
		return new Graph(this.size, structuredClone(this.data));
	}
}
