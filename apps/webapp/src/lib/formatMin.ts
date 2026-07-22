export const formatMin = (min: number): string => {
	if (min < 60) {
		return `${min}min`;
	}

	let h = Math.floor(min / 60);
	min = min % 60;

	if (h < 24) {
		return `${h}h ${min}min`;
	}

	let d = Math.floor(h / 24);
	h = h % 24;

	if (d < 31) {
		return `${d}d ${h}h ${min}min`;
	}

	let m = Math.floor(d / 31);
	d = d % 31;

	return `${m}m ${d}d ${h}h ${min}min`;
};
