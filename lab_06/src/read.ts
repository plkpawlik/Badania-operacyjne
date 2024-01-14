import { EOL } from "https://deno.land/std@0.212.0/fs/eol.ts";

export function read(path: string): number[][] {
	const lines = Deno.readTextFileSync(path).split(EOL);

	const size = Number.parseInt(lines[0].split("data:")[1]);
	const data = lines.slice(1, size + 1).map((line) => {
		return line.split(" ").filter((char) => char.length).map((char) => {
			return Number.parseInt(char);
		});
	});

	return data;
}
