import { Heap } from "./src/heap.ts";
import { Task } from "./src/node.ts";
import { readData } from "./src/read.ts";

const data = readData(Deno.args[0]);
const tasks = new Array<Task>(data.N);

for (let i = 0; i < data.N; i++) {
	tasks[i] = new Task(i + 1, data.nTimes[i]);
}

for (let i = 0; i < data.M; i++) {
	const prevID = data.mTasks[i][1];
	const nextID = data.mTasks[i][0];

	const prevTask = tasks.find((task) => task.id === prevID);
	const nextTask = tasks.find((task) => task.id === nextID);

	if (!prevTask) throw `Task id::${prevID} is undefined`!;
	if (!nextTask) throw `Task id::${nextID} is undefined`!;

	prevTask.prev.push(nextTask);
	nextTask.next.push(prevTask);
}

const heap = new Heap(tasks);

const res_recursive = heap.CPM("recursive");
const res_repeated = heap.CPM("repeated");

console.log(res_repeated);
console.log(res_recursive === res_repeated);
