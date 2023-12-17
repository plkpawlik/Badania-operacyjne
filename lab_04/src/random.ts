export function* LCG(state: number, a = 134775813, c = 12345, m = 2147483648) {
	while (true) {
		state = (a * state + c) % m;
		yield state / m;
	}
}
