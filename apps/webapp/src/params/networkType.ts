import type { ParamMatcher } from '@sveltejs/kit';

export const networkTypes = ['following', 'followers', 'friends'] as const satisfies string[];
export type NetworkType = (typeof networkTypes)[number];

export const match = ((param): param is NetworkType => {
	return networkTypes.includes(param);
}) satisfies ParamMatcher;
