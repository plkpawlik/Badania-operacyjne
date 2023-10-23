import { Head, Node, Tail, Task } from "./node.ts";

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
				this.backwards();
				break;
		}

		return this.tasks.map(({ es, ef, ls, lf }) => `${es} ${ef} ${ls} ${lf}`).join("\n");
	}

	private evalNext(node: Head | Tail | Task, acc: number): void {
		if (Tail.isTail(node)) return;

		for (const task of node.next) {
			if (Task.isTask(task)) {
				task.es = Math.max(task.es, acc);
				task.ef = Math.max(task.ef, acc + task.dt);

				this.evalNext(task, task.ef);
			}
		}
	}

	private evalPrev(node: Head | Tail | Task, acc: number): void {
		if (Head.isHead(node)) return;

		for (const task of node.prev) {
			if (Task.isTask(task)) {
				task.lf = Math.min(task.lf, acc);
				task.ls = Math.min(task.ls, acc - task.dt);

				this.evalPrev(task, task.ls);
			}
		}
	}

	private backwards(): void {
		let queue = this.tasks.length;

		while (queue) {
			for (const task of this.tasks) {
				if (!Number.isNaN(task.ls)) continue;
				if (!Number.isNaN(task.lf)) continue;

				if (task.next.every((node) => Tail.isTail(node))) {
					task.ls = this.cpmTotalTime - task.dt;
					task.lf = this.cpmTotalTime;
					queue--;
					continue;
				}

				if (
					task.next.some((node) =>
						!Task.isTask(node) || Number.isNaN(node.ls) || Number.isNaN(node.lf)
					)
				) continue;

				let lf = +Infinity;

				for (const node of task.next) {
					if (Task.isTask(node)) lf = Math.min(lf, node.ls);
				}

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

				if (
					task.prev.some((node) =>
						!Task.isTask(node) || Number.isNaN(node.es) || Number.isNaN(node.ef)
					)
				) continue;

				let ef = -Infinity;

				for (const node of task.prev) {
					if (Task.isTask(node)) ef = Math.max(ef, node.ef);
				}

				task.es = ef;
				task.ef = ef + task.dt;
				queue--;
			}
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

	private get cpmTotalTime(): number {
		let totalTime = -Infinity;

		for (const task of this.tail.prev) {
			if (Task.isTask(task)) totalTime = Math.max(totalTime, task.ef);
		}

		return totalTime;
	}
}
