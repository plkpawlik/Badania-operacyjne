import { Graph } from "./graph.ts";

export function BFSi(graph: Graph, input: number, output: number, prev: number[]): boolean {
	const mark = new Array<boolean>(graph.size).fill(false);
	const path = [input];

	mark[input] = true;
	prev[input] = NaN;

	while (path.length > 0) {
		const u = path.shift()!;

		for (let v = 0; v < graph.size; v++) {
			if (mark[v] || !graph.data[u][v]) continue;

			mark[v] = true;
			prev[v] = u;
			path.push(v);
		}
	}

	return mark[output];
}

export function BFSr(graph: Graph, input: number, output: number, prev: number[]): boolean {
	const mark = new Array<boolean>(graph.size).fill(false);
	const path = [input];

	mark[input] = true;
	prev[input] = NaN;

	(function next(): void {
		if (path.length === 0) return;

		const u = path.shift()!;

		for (let v = 0; v < graph.size; v++) {
			if (mark[v] || !graph.data[u][v]) continue;

			mark[v] = true;
			prev[v] = u;
			path.push(v);
		}

		next();
	})();

	return mark[output];
}
