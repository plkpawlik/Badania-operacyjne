import { data10 } from "./mock.ts";
import { Heap } from "./src/heap.ts";
import { Head, Tail, Task } from "./src/node.ts";

const tasks = new Array<Task>(data10.N);

for (let i = 0; i < data10.N; i++) {
	tasks[i] = new Task(i + 1, data10.nTimes[i]);
}

for (let i = 0; i < data10.M; i++) {
	const prevID = data10.mTasks[i][1];
	const nextID = data10.mTasks[i][0];

	const prevTask = tasks.find((task) => task.id === prevID);
	const nextTask = tasks.find((task) => task.id === nextID);

	if (!prevTask) throw `Task id::${prevID} is undefined`!;
	if (!nextTask) throw `Task id::${nextID} is undefined`!;

	prevTask.prev.push(nextTask);
	nextTask.next.push(prevTask);
}

const heap = new Heap(tasks).CPM();

console.log(tasks.map((task) => `${task.es} ${task.ef} ${task.ls} ${task.lf}`).join("\n"));
