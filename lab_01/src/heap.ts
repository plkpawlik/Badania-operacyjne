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

	CPM() {
		this.evalNext(this.head, 0);
		this.evalPrev(this.tail, this.calcCPM());
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

	private calcCPM(): number {
		let cpm = -Infinity;

		for (const task of this.tail.prev) {
			if (Task.isTask(task)) cpm = Math.max(cpm, task.ef);
		}

		return cpm;
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
}
