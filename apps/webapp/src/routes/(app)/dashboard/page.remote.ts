import { query, getRequestEvent } from '$app/server';

import { traktClient } from '~/data/trakt.server';

export const getWatching = query(async () => {
	const { locals } = getRequestEvent();

	return [];
});
export const getWatchlist = query(async () => {
	const { locals } = getRequestEvent();

	return await traktClient.users.getWatchlistFull({
		token: locals.token!,
		userId: 'me',
	});
});
