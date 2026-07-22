import type { ParamMatcher } from '@sveltejs/kit';

export const mediaTypes = ['show', 'movie'] as const satisfies string[];
export type MediaType = (typeof mediaTypes)[number];

export const match = ((param): param is MediaType => {
	return mediaTypes.includes(param);
}) satisfies ParamMatcher;
