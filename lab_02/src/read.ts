export type Data = {
	size: number;
	data: number[];
};

export function readData(path: string): Data {
	const lines = Deno.readTextFileSync(path).split("\r\n");

	const size = Number.parseInt(lines[0]);
	const data = lines.slice(1, size + 1).flatMap((line) => {
		return line.split(" ").filter((char) => char.length > 0).map((char) => {
			return Number.parseInt(char);
		});
	});

	return ({
		size,
		data,
	});
}
