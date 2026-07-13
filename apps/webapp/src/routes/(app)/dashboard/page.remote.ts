import { query, getRequestEvent } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getWatching = query(async () => {
	const { locals } = getRequestEvent();

	return [];
});

export const getWatchlist = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.getWatchlist({
		token: locals.token!,
		type: 'movie,show',
		sortBy: 'title',
	});
});
