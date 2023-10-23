export type tData = {
	/** Liczba połączeń */
	M: number;
	/** Liczba zadań */
	N: number;
	/** Czasy trwania */
	nTimes: number[];
	/** Zależności */
	mTasks: [number, number][];
};

export const data10: tData = {
	M: 10,
	N: 10,
	nTimes: [93, 14, 53, 1, 5, 68, 22, 68, 75, 46],
	mTasks: [
		[3, 5],
		[3, 8],
		[4, 5],
		[4, 6],
		[4, 7],
		[4, 10],
		[7, 1],
		[7, 6],
		[8, 1],
		[10, 7],
	],
};
