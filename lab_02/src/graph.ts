export class Graph {
	private distance!: number[];
	private prevoius!: number[];

	constructor(
		readonly size: number,
		readonly data: number[],
	) {}

	BellmanFord(node: number = 0): [number, number[]][] {
		this.distance = new Array(this.size).fill(Infinity);
		this.prevoius = new Array(this.size).fill(NaN);

		// first node
		this.distance[node] = 0;

		for (let k = 0; k < this.size - 1; k++) {
			for (let u = 0; u < this.size; u++) {
				for (let v = 0; v < this.size; v++) {
					if (this.isBetter(u, v)) {
						this.distance[v] = this.distance[u] + this.getWeight(u, v);
						this.prevoius[v] = u;
					}
				}
			}
		}

		return this.distance.map((distance, index) => [
			distance,
			this.getRoute(index),
		]);
	}

	private getRoute(node: number): number[] {
		if (this.distance[node] === Infinity) return [];

		const route = [node];

		while (Number.isInteger(this.prevoius[node])) {
			node = this.prevoius[node];
			route.push(node);
		}

		return route.reverse();
	}

	private getWeight(u: number, v: number): number {
		return this.data[this.size * u + v];
	}

	private isBetter(u: number, v: number): boolean {
		return this.getWeight(u, v) !== 0 &&
			this.distance[v] > this.distance[u] + this.getWeight(u, v);
	}
}
