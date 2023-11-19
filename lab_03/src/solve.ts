import { Graph } from "./graph.ts";

export type Strategy = (graph: Graph, input: number, output: number, prev: number[]) => boolean;

export function solve(graph: Graph, input: number, output: number, strategy: Strategy): number {
	const flow = graph.clone();
	const prev = new Array<number>(graph.size).fill(NaN);

	let maxFlow = 0;

	while (strategy(flow, input, output, prev)) {
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
