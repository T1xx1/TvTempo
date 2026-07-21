import type { ParamMatcher } from '@sveltejs/kit';

export const medias = ['shows', 'movies'] as const satisfies string[];
export type Media = (typeof medias)[number];

export const match = ((param): param is Media => {
	return medias.includes(param);
}) satisfies ParamMatcher;
