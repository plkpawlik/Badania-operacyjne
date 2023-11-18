import { Graph } from "./graph.ts";

export function solveFordFulkerson(graph: Graph, input: number, output: number): number {
	const flow = graph.clone();
	const prev = new Array<number>(graph.size).fill(NaN);

	let maxFlow = 0;

	while (bfs(flow, input, output, prev)) {
		let pathFlow = Infinity;

		for (let v = output; v !== input; v = prev[v]) {
			pathFlow = Math.min(pathFlow, flow.data[prev[v]][v]);
		}

		for (let v = output; v !== input; v = prev[v]) {
			flow.data[prev[v]][v] -= pathFlow;
			flow.data[v][prev[v]] += pathFlow;
		}

		maxFlow += pathFlow;
	}

	return maxFlow;
}

function bfs(graph: Graph, input: number, output: number, prev: number[]): boolean {
	const mark = new Array<boolean>(graph.size).fill(false);
	const list = [input];

	mark[input] = true;
	prev[input] = NaN;

	while (list.length > 0) {
		const u = list.shift()!;

		for (let v = 0; v < graph.size; v++) {
			if (mark[v] || !graph.data[u][v]) continue;

			mark[v] = true;
			prev[v] = u;
			list.push(v);
		}
	}

	return mark[output];
}
