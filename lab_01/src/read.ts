export type Data = {
	/** Liczba połączeń */
	M: number;
	/** Liczba zadań */
	N: number;
	/** Czasy trwania */
	nTimes: number[];
	/** Zależności */
	mTasks: [number, number][];
};

export function readData(path: string): Data {
	const lines = Deno.readTextFileSync(path).split("\r\n");

	const [N, M] = lines[0].split(" ").map((v) => Number.parseInt(v));
	const nTimes = lines[1].split(" ").map((v) => Number.parseInt(v));
	const mTasks = lines[2].split("  ").map((v) => {
		return v.split(" ").map((v) => Number.parseInt(v)) as [number, number];
	});

	return ({
		M,
		N,
		mTasks,
		nTimes,
	});
}
