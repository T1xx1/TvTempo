import { query } from '$app/server';
import { assert } from '@t1xx1/tsfix';
import { z } from 'zod';

import { traktClient } from '~/data/trakt.server';
import { mediaTypes } from '~/params/mediaType';

export const getMedia = query(
	z.object({
		mediaType: z.enum(mediaTypes),
		slug: z.string(),
	}),
	async ({ mediaType, slug }) => {
		switch (mediaType) {
			case 'show': {
				return {
					...(await traktClient.shows.getShowFull({
						id: slug,
					})),
					type: 'show',
				};
			}
			case 'movie': {
				return {
					...(await traktClient.movies.getMovieFull({
						id: slug,
					})),
					type: 'movie',
				};
			}
			default: {
				assert<never>(mediaType);
			}
		}
	},
);
