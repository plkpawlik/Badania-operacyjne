import { EOL } from "https://deno.land/std@0.212.0/fs/eol.ts";

export function read(path: string): { cost: number; gain: number }[][] {
	const data = Deno.readTextFileSync(path).split("data:");
	const buff = new Array<{ cost: number; gain: number }[]>(data.length - 1);

	for (let i = 1; i < data.length; i++) {
		const lines = data[i].split(EOL);
		const size = lines[0].split(" ");

		buff[i] = lines.slice(1, 1 + Number.parseInt(size[1])).map((line) => {
			const cost = Number.parseInt(line.substring(0, 2));
			const gain = Number.parseInt(line.substring(3, 5));

			return ({ cost, gain });
		});
	}

	return buff.slice(1);
}
