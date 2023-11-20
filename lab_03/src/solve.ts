import { Graph } from "./graph.ts";

export type Solution = [maxFlow: number, flow: Graph];
export type Strategy = (graph: Graph, input: number, output: number, prev: number[]) => boolean;

export function solve(graph: Graph, input: number, output: number, next: Strategy): Solution {
	const flowClone = graph.clone();
	const flowFinal = Graph.zeros(graph.size);
	const prev = new Array<number>(graph.size).fill(NaN);

	let maxFlow = 0;

	while (next(flowClone, input, output, prev)) {
		let pathFlow = Infinity;

		for (let v = output; v !== input; v = prev[v]) {
			pathFlow = Math.min(pathFlow, flowClone.data[prev[v]][v]);
		}

		for (let v = output; v !== input; v = prev[v]) {
			flowClone.data[prev[v]][v] -= pathFlow;
			flowClone.data[v][prev[v]] += pathFlow;

			flowFinal.data[prev[v]][v] = flowClone.data[prev[v]][v];
			flowFinal.data[v][prev[v]] = flowClone.data[v][prev[v]];
		}

		maxFlow += pathFlow;
	}

	return [maxFlow, flowFinal];
}
