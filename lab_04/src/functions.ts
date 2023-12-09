export const BASE_ARRIVAL_TIME = 120;
export const BASE_SERVICE_TIME = 60;
export const BASE_STD_DEV = 20;

// exponential distribution: E(120)
export const nextArrivalTimeA = (): number => {
	return -BASE_ARRIVAL_TIME * Math.log(1 - Math.random());
};

// constant distribution: C(60)
export const nextServiceTimeA = (): number => {
	return BASE_SERVICE_TIME;
};

// uniform distribution: U(0, 120)
export const nextServiceTimeB = (): number => {
	return Math.round(2 * BASE_SERVICE_TIME * Math.random());
};

// exponential distribution: E(60)
export const nextServiceTimeC = (): number => {
	return -BASE_SERVICE_TIME * Math.log(1 - Math.random());
};

// normal distribution: N(60, 20)
export const nextServiceTimeD = (): number => {
	const u = 1 - Math.random();
	const v = Math.random();
	const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);

	return Math.max(0, z * BASE_STD_DEV + BASE_SERVICE_TIME);
};
