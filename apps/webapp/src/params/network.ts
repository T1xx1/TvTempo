import type { ParamMatcher } from '@sveltejs/kit';

export const networks = ['following', 'followers', 'friends'] as const satisfies string[];
export type Network = (typeof networks)[number];

export const match = ((param): param is Network => {
	return networks.includes(param);
}) satisfies ParamMatcher;
