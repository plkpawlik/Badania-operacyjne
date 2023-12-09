import jStat from "npm:jstat@latest";

export const BASE_ARRIVAL_TIME = 120;
export const BASE_SERVICE_TIME = 60;
export const BASE_STD_DEV = 20;

// exponential distribution: E(120)
export const nextArrivalTimeA = (): number => {
	return jStat.exponential.sample(1 / BASE_ARRIVAL_TIME);
};

// constant distribution: C(60)
export const nextServiceTimeA = (): number => {
	return BASE_SERVICE_TIME;
};

// uniform distribution: U(0, 120)
export const nextServiceTimeB = (): number => {
	return jStat.uniform.sample(0, BASE_SERVICE_TIME * 2);
};

// exponential distribution: E(60)
export const nextServiceTimeC = (): number => {
	return jStat.exponential.sample(1 / BASE_SERVICE_TIME);
};

// normal distribution: N(60, 20)
export const nextServiceTimeD = (): number => {
	return jStat.normal.sample(BASE_SERVICE_TIME, BASE_STD_DEV);
};
