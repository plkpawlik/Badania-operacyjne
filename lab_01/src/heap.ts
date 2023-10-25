import { Head, Tail, Task } from "./node.ts";

export class Heap {
	readonly head: Head;
	readonly tail: Tail;

	constructor(
		readonly tasks: Task[],
	) {
		this.head = new Head();
		this.tail = new Tail();

		this.mapHead();
		this.mapTail();
	}

	CPM(mode: "recursive" | "repeated") {
		switch (mode) {
			case "recursive":
				this.initRecursive();
				this.evalNext(this.head, 0);
				this.evalPrev(this.tail, this.cpmTotalTime);
				break;
			case "repeated":
				this.initRepeated();
				this.forwards();
				this.backwards(this.cpmTotalTime);
				break;
		}
	}

	private evalNext(node: Head | Tail | Task, acc: number): void {
		if (Tail.isTail(node)) return;

		for (const task of node.next) {
			if (Task.isTask(task) && task.es < acc) {
				task.es = acc;
				task.ef = acc + task.dt;

				this.evalNext(task, task.ef);
			}
		}
	}

	private evalPrev(node: Head | Tail | Task, acc: number): void {
		if (Head.isHead(node)) return;

		for (const task of node.prev) {
			if (Task.isTask(task) && task.lf > acc) {
				task.lf = acc;
				task.ls = acc - task.dt;

				this.evalPrev(task, task.ls);
			}
		}
	}

	private backwards(cpm: number): void {
		let queue = this.tasks.length;

		while (queue) {
			for (const task of this.tasks) {
				if (!Number.isNaN(task.ls)) continue;
				if (!Number.isNaN(task.lf)) continue;

				if (task.next.every((node) => Tail.isTail(node))) {
					task.ls = cpm - task.dt;
					task.lf = cpm;
					queue--;
					continue;
				}

				if (this.isNextInvalid(task)) continue;

				const lf = this.calcLF(task);

				task.ls = lf - task.dt;
				task.lf = lf;
				queue--;
			}
		}
	}

	private forwards(): void {
		let queue = this.tasks.length;

		while (queue) {
			for (const task of this.tasks) {
				if (!Number.isNaN(task.es)) continue;
				if (!Number.isNaN(task.ef)) continue;

				if (task.prev.every((node) => Head.isHead(node))) {
					task.es = 0;
					task.ef = task.dt;
					queue--;
					continue;
				}

				if (this.isPrevInvalid(task)) continue;

				const ef = this.calcEF(task);

				task.es = ef;
				task.ef = ef + task.dt;
				queue--;
			}
		}
	}

	private calcEF(task: Task): number {
		let ef = -Infinity;

		for (const node of task.prev) {
			if (Task.isTask(node)) ef = Math.max(ef, node.ef);
		}

		return ef;
	}

	private calcLF(task: Task): number {
		let lf = +Infinity;

		for (const node of task.next) {
			if (Task.isTask(node)) lf = Math.min(lf, node.ls);
		}

		return lf;
	}

	private isNextInvalid(task: Task): boolean {
		return task.next.some((node) =>
			!Task.isTask(node) || Number.isNaN(node.ls) || Number.isNaN(node.lf)
		);
	}

	private isPrevInvalid(task: Task): boolean {
		return task.prev.some((node) =>
			!Task.isTask(node) || Number.isNaN(node.es) || Number.isNaN(node.ef)
		);
	}

	private initRecursive(): void {
		for (const task of this.tasks) {
			task.es = -Infinity;
			task.ef = -Infinity;
			task.ls = +Infinity;
			task.lf = +Infinity;
		}
	}

	private initRepeated(): void {
		for (const task of this.tasks) {
			task.es = NaN;
			task.ef = NaN;
			task.ls = NaN;
			task.lf = NaN;
		}
	}

	private mapHead(): void {
		for (const task of this.tasks) {
			if (task.prev.length === 0) {
				task.prev.push(this.head);
				this.head.next.push(task);
			}
		}
	}

	private mapTail(): void {
		for (const task of this.tasks) {
			if (task.next.length === 0) {
				task.next.push(this.tail);
				this.tail.prev.push(task);
			}
		}
	}

	private get cpmTotalTime(): number {
		let totalTime = -Infinity;

		for (const task of this.tail.prev) {
			if (Task.isTask(task)) totalTime = Math.max(totalTime, task.ef);
		}

		return totalTime;
	}
}
