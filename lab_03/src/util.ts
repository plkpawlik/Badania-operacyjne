export function $(matrix: number[][]): string {
	const ENDL = "\n";

	let string;
	string = matrix.map((row) => row.map((num) => String(num).padStart(3, " ")));
	string = JSON.stringify(string).replaceAll("],", "],\n ").replaceAll('"', "");

	return ENDL.repeat(2) + string + ENDL.repeat(1);
}
