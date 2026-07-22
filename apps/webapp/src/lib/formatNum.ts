export const formatNum = (n: number): string => {
	if (n < 1_000) {
		return n.toString();
	} else if (n < 1_000_000) {
		return `${n.toString().slice(0, -3)}K`;
	} else if (n < 1_000_000_000) {
		return `${n.toString().slice(0, -6)}Mln`;
	} else {
		return `${n.toString().slice(0, -9)}Mld`;
	}
};
