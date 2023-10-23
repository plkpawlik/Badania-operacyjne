export const enum NodeType {
	HEAD,
	TAIL,
	TASK,
}

export abstract class Node {
	constructor(readonly type: NodeType) {}
}

export class Head extends Node {
	static isHead(node: Node): node is Head {
		return node.type === NodeType.HEAD;
	}

	readonly next: (Tail | Task)[];

	constructor() {
		super(NodeType.HEAD);
		this.next = [];
	}
}

export class Tail extends Node {
	static isTail(node: Node): node is Tail {
		return node.type === NodeType.TAIL;
	}

	readonly prev: (Head | Task)[];

	constructor() {
		super(NodeType.TAIL);
		this.prev = [];
	}
}

export class Task extends Node {
	static isTask(node: Node): node is Task {
		return node.type === NodeType.TASK;
	}

	readonly prev: (Head | Task)[];
	readonly next: (Tail | Task)[];

	es: number;
	ef: number;
	ls: number;
	lf: number;

	constructor(
		readonly id: number, // task ID
		readonly dt: number, // task duration time
	) {
		super(NodeType.TASK);
		this.next = [];
		this.prev = [];

		this.es = NaN;
		this.ef = NaN;
		this.ls = NaN;
		this.lf = NaN;
	}
}
